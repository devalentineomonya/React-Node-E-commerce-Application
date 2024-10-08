const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const UserModel = require("../models/user.model");
const config = require("../config/config");
const { sendVerificationEmail } = require("./mail.controller");
const { clientUrl } = require("../utils/url.util");
const { generateToken, verifyToken, encryptMessage } = require("../utils/token.util");
const { generateCode } = require("../utils/code.util");
const { isValidObjectId } = require("mongoose");


/*=============================
LOGIN WITH PASSWORD CONTROLLER
=================================*/

const loginWithPassword = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                success: false,
                message: info ? info.message : 'Login failed',
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'An error occurred while logging in user', error: error.message });
            }

            const userObject = user.toObject();
            delete userObject.password;
            delete userObject.verificationCode;
            delete userObject.passwordResetCode;
            delete userObject.verificationCodeExpires;
            delete userObject.passwordResetCodeExpires;

            const payload = {
                id: user._id,
                email: user.email,
                isVerified: user.isVerified,
                isActive: user.isActive,
            };

            const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

            return res.status(200).json({
                success: true,
                message: 'Logged in successfully',
                token,
                data: userObject,
            });
        });
    })(req, res, next);
};

/*=============================
GOOGLE CALLBACK CONTROLLER
=================================*/
const googleCallback = (req, res) => {
    passport.authenticate('google', { session: true }, async (err, user, info) => {
      let redirectUrl;
  
      if (err) {
        console.error("Error in Google Callback:", err);
        const message = "An error occurred while logging in. Kindly try again.";
        const encryptedMessage = encryptMessage(message, config.messageSecret);
        redirectUrl = `${clientUrl}/auth/callback?msg_id=${encryptedMessage}`;
        return res.redirect(redirectUrl);
      }
  
      if (!user) {
        let message;
        if (info && info.hasPassword) {
          message = info.message || "Account already exists. Please use your password to login.";
        } else {
          message = "No user found.";
        }
        const encryptedMessage = encryptMessage(message, config.messageSecret);
        redirectUrl = `${clientUrl}/auth/callback?msg_id=${encryptedMessage}`;
        return res.redirect(redirectUrl);
      }
  
      try {
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject.verificationCode;
        delete userObject.verificationCodeExpires;
        delete userObject.passwordResetCode;
        delete userObject.passwordResetCodeExpires;
  
        const payload = {
          id: user._id,
          email: user.email,
          isVerified: user.isVerified,
          isActive: user.isActive,
        };
  
        const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
  
        redirectUrl = `${clientUrl}/auth/callback?token=${token}&id=${user._id}`;
  
        res.redirect(redirectUrl);
      } catch (error) {
        console.error("Error processing user data:", error);
        const message = "Error processing user data. Please try again.";
        const encryptedMessage = encryptMessage(message, config.messageSecret);
        redirectUrl = `${clientUrl}/auth/callback?msg_id=${encryptedMessage}`;
        res.redirect(redirectUrl);
      }
    })(req, res);
  };
  



/*=============================
VERIFY USER CONTROLLER
=================================*/

const verifyUser = async (req, res) => {

    if (req?.method === "GET") {
        const { userId, token } = req.query
        try {
            const isValidId = isValidObjectId(userId)

            if (!isValidId) return res.status(404).json({ success: false, message: "User with the specified id does not exist" })
            if (userId && token) {
                const result = await verifyToken(userId, token)
                if (result.success) {
                    await UserModel.findByIdAndUpdate(userId, { isVerified: true, verificationCode: null, verificationCodeExpires: null });
                    res.redirect(`${clientUrl}/msg_id=${result.message}`)
                } else {
                    res.redirect(`${clientUrl}/auth/verify?msg_id=${result.message}`)
                }
            } else {
                res.redirect(`${clientUrl}/auth/verify?msg_id=${result.message}`)
            }
        } catch (error) {
            res.redirect(`${clientUrl}/auth/verify?msg_id=${encryptMessage("Internal server error occurred while verifying user", config.messageSecret)}`)
        }
    } else if (req?.method == "POST") {
        const { verificationCode } = req.body
        const userId = req.user.id
        try {
            const isValidId = isValidObjectId(userId)

            if (!isValidId) return res.status(404).json({ success: false, message: "User with the specified id does not exist" })
            const user = await UserModel.findById(userId)

            if (!user) return res.status(404).json({ success: false, message: "User With Specified Id was not found" })

            if (user.isVerified) return res.status(400).json({ success: false, message: "Account is already verified" })

            if (Date.now() > user.verificationCodeExpires) return res.status(400).json({ success: false, message: "Verification code has expired.Request a resend for the code" })


            if (user.verificationCode === verificationCode) {
                await UserModel.findByIdAndUpdate(userId, { isVerified: true, verificationCode: null, verificationCodeExpires: null });
                return (
                    res.status(200).json({ success: true, message: "User Verified successfully" })
                )
            }

            res.status(400).json({ success: false, message: "Invalid verification code" })
        } catch (error) {
            res.status(500).json({ success: false, message: "An error occurred while verifying user", error: error.message })
        }


    }
}



/*=======================================
REGENERATE VERIFICATION CODE CONTROLLER
=======================================*/
const regenerateVerificationCode = async (req, res) => {
    const userId = req.user.id

    try {
        const isValidId = isValidObjectId(userId)

        if (!isValidId) return res.status(404).json({ success: false, message: "User with the specified id does not exist" })

        if (!userId) return res.status(400).json({ success: false, message: "UserId is required" })
        const user = await UserModel.findById(userId)
        if (!user) return res.status(404).json({ success: false, message: "No user with specified id was found" })
        if (user.isVerified) return res.status(400).json({ success: false, message: "User account has already been verified" })

        const newVerificationCode = generateCode()

        const newToken = generateToken(newVerificationCode)

        await UserModel.findByIdAndUpdate(userId, { isVerified: false, verificationCode: newVerificationCode, verificationCodeExpires: Date.now() + 3 * 24 * 60 * 60 * 1000 });
        await sendVerificationEmail(user.email, user._id, newVerificationCode, newToken, "verify");
        res.status(200).json({ success: true, message: "Verification Code has been sent to your email" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while regenerating code", error: error.message })
    }
}


/*=======================================
REQUEST PASSWORD RESET CODE CONTROLLER
=======================================*/

const requestPasswordReset = async (req, res) => {
    const { email } = req.body

    if (!email) return res.status(400).json({ success: false, message: "User email is required" })
    try {

        const user = await UserModel.findOne({ email })
        if (!user) return res.status(404).json({ success: false, message: "No user with specified email was found" })
        if (user.googleId) return res.status(400).json({ success: false, message: "Password login in not allowed for this user" })

        const resetCode = generateCode()
        const resetToken = generateToken(resetCode)
        await UserModel.findByIdAndUpdate(user._id, { passwordResetCode: resetCode, passwordResetCodeExpires: Date.now() + 3 * 24 * 60 * 60 * 1000 });
        await sendVerificationEmail(user.email, user._id, null, resetToken, "reset");
        res.status(200).json({ success: true, message: "Your password reset code has been sent to your email" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error has occurred while sending password reset code", error: error.message })
    }
}



const resetPassword = async (req, res) => {
    try {
        const { token, userId, email, newPassword, confirmPassword } = req.body;

        const isValidId = isValidObjectId(userId)

        if (!isValidId) return res.status(404).json({ success: false, message: "User with the specified id does not exist" })

        if (!token || !userId || !email || !newPassword || !confirmPassword) return res.status(400).json({ success: false, message: 'All fields are required.' });

        if (newPassword !== confirmPassword) return res.status(400).json({ success: false, message: 'Passwords do not match.' });


        const user = await UserModel.findById(userId);

        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        if (user.email !== email) return res.status(400).json({ success: false, message: 'Invalid email address.' });

        const isMatch = await bcrypt.compare(newPassword, user.password)

        if (isMatch) return res.status(400).json({ success: false, message: "New password can not be same as old password" })

        const currentTime = new Date();
        if (user.passwordResetCodeExpires < currentTime) return res.status(400).json({ success: false, message: 'Token has expired.' });

        const hashedToken = generateToken(user.passwordResetCode)
        if (hashedToken !== token) return res.status(400).json({ message: 'Invalid or expired token.' });

        const hashedPassword = await bcrypt.hash(newPassword, 15);

        user.password = hashedPassword;
        user.passwordResetCode = null;
        user.passwordResetCodeExpires = null;

        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successful.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred while resetting password', error: error.message });
    }
}

function logout(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        const decoded = jwt.decode(token);
        blacklistToken(token, decoded.exp);
        res.status(200).json({ message: 'Logged out successfully' });
    } else {
        res.status(400).json({ message: 'No token provided' });
    }
}

const changePassword = async (req, res) => {
    const { userId } = req.params;
    const isValidId = isValidObjectId(userId)

    if (!isValidId) return res.status(404).json({ success: false, message: "User with the specified id does not exist" })
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });


        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Incorrect current password' });

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) return res.status(400).json({ success: false, message: 'New password must be different from the current password' });


        const hashedPassword = await bcrypt.hash(newPassword, 15);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};


module.exports = {
    regenerateVerificationCode,
    requestPasswordReset,
    loginWithPassword,
    changePassword,
    googleCallback,
    resetPassword,
    verifyUser
};
