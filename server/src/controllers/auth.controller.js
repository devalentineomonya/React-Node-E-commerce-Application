const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const UserModel = require("../models/user.model");
const config = require("../config/config");
const { sendVerificationEmail } = require("./mail.controller");
const { clientUrl } = require("../utils/url.util");
const { generateToken } = require("../utils/mailToken.util");
const { generateCode } = require("../utils/mailCode.util");
const { isValidObjectId } = require("mongoose");


/*=============================
LOGIN WITH PASSWORD CONTROLLER
=================================*/

const loginWithPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Wrong username or password" });
        }
        if (user.googleId) return res.status(400).json({ success: false, message: "Password Authentication is not allowed for this account. Try logging in with google" })
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Wrong username or password" });
        }
        const userObject = user.toObject();

        delete userObject.password;
        delete userObject.verificationCode;
        delete userObject.passwordResetCode;
        delete userObject.verificationCodeExpires;
        delete userObject.passwordResetCodeExpires

        const payload = {
            id: user._id,
            email: user.email,
            isVerified: user?.isVerified,
            isActive: user?.isActive
        };


        const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            data: userObject
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};

/*=============================
GOOGLE CALLBACK CONTROLLER
=================================*/
const googleCallback = (req, res) => {
    passport.authenticate('google', { session: false }, async (err, user, info) => {
        if (err) {
            console.error("Error in Google Callback:", err);
            return res.status(500).json({ success: false, message: "Authentication failed.", error: err.message });
        }

        if (!user) {
            console.error("No user found:", info);
            return res.status(400).json({ success: false, message: "No user found.", error: info.message });
        }

        try {
            const userObject = user.toObject();
            delete userObject.password;
            delete userObject.verificationCode;
            delete userObject.verificationCodeExpires;
            delete userObject.passwordResetCode;
            delete userObject.passwordResetCodeExpires

            const payload = {
                id: user._id,
                email: user.email,
                isVerified: user.isVerified,
                isActive: user.isActive
            };

            const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

            res.status(200).json({
                success: true,
                token,
                user: userObject
            });
        } catch (error) {
            console.error("Error processing user data:", error);
            res.status(500).json({ success: false, message: "Error processing user data.", error: error.message });
        }
    })(req, res);
};

/*=============================
VERIFY TOKEN FUNCTION
=================================*/
const verifyToken = async (userId, token) => {
    try {
        const isValidId = isValidObjectId(userId)
    
        if(!isValidId) return {success:false, message:"User with the specified id does not exist"}
        const user = await UserModel.findOne({ _id: userId })


        if (!user) return { success: false, message: "User with the specified id does not exist" }
        if (user.isVerified) return { success: true, message: "Account is already verified" }

        const hashedCode = generateToken(user.verificationCode)

        if (Date.now() > user.verificationCodeExpires) {
            return { success: false, message: "Verification code has expired.Request a resend for the code" }
        }
        if (hashedCode === token) return ({ success: true, message: "Account Verified Successfully" })
        return { success: false, message: "Invalid Verification Token" }

    } catch (error) {
        return { success: false, message: error.message }

    }

}

/*=============================
VERIFY USER CONTROLLER
=================================*/

const verifyUser = async (req, res) => {

    if (req?.method === "GET") {
        const { userId, token } = req.query
        try {
            const isValidId = isValidObjectId(userId)
    
            if(!isValidId) return res.status(404).json({success:false, message:"User with the specified id does not exist"})
            if (userId && token) {
                const result = await verifyToken(userId, token)
                if (result.success) {
                    await UserModel.findByIdAndUpdate(userId, { isVerified: true, verificationCode: null, verificationCodeExpires: null });
                    res.redirect(`${clientUrl}/message=${result.message}`)
                } else {
                    res.redirect(`${clientUrl}/auth/verify?message=${result.message}`)
                }
            } else {
                res.redirect(`${clientUrl}/auth/verify?message=${result.message}`)
            }
        } catch (error) {
            res.redirect(`${clientUrl}/auth/verify?message=Internal server error occurred while verifying user`)
        }
    } else if (req?.method == "POST") {
        const { verificationCode } = req.body
        const userId = req.user.id
        try {
            const isValidId = isValidObjectId(userId)
    
            if(!isValidId) return res.status(404).json({success:false, message:"User with the specified id does not exist"})
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
    
        if(!isValidId) return res.status(404).json({success:false, message:"User with the specified id does not exist"})

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
    
        if(!isValidId) return res.status(404).json({success:false, message:"User with the specified id does not exist"})

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

// On user logout
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
    
    if(!isValidId) return res.status(404).json({success:false, message:"User with the specified id does not exist"})
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
