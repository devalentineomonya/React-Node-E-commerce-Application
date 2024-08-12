const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userModel = require("../models/user.model");
const config = require("../config/config");
const { generateToken, generateCode } = require("./user.controller");
const { sendVerificationEmail } = require("./mail.controller");


/*=============================
LOGIN WITH PASSWORD CONTROLLER
=================================*/ 

const loginWithPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        if (user.googleId) return res.status(400).json({ success: false, message: "Password Authentication is not allowed for this account. Try logging in with google" })
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
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
            isActive: user.isActive,
        };


        const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: `Bearer ${token}`,
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
                isActive: user.isActive
            };

            const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

            res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
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

        const user = await userModel.findOne({ _id: userId })


        if (!user) return { success: false, message: "User not found" }
        if (user.isActive) return { success: false, message: "Account is already verified" }

        const hashedCode = generateToken(user.verificationCode)

        if (Date.now() > user.verificationCodeExpires) {
            return { success: false, message: "Verification code has expired." };
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
    try {

        if (req?.method === "GET") {
            const { userId, token } = req.query

            if (userId && token) {
                const result = await verifyToken(userId, token)
                if (result.success) {
                    await userModel.findByIdAndUpdate(userId, { isActive: true, verificationCode: null, verificationCodeExpires: null });
                    res.status(200).json({ success: true, message: "Account verified successfully." });
                } else {
                    res.status(400).json(result);
                }
            } else {
                res.status(400).json({ success: false, message: "Invalid userId or verification token" })
            }

        } else if (req?.method == "POST") {
            const { verificationCode } = req.body
            const userId = req.user.id
            const user = await userModel.findById(userId)

            if (!user) return res.status(404).json({ success: false, message: "User With Specified Id was not found" })

            if (user.isActive) return res.status(400).json({ success: false, message: "Account is already verified" })

            if (Date.now() > user.verificationCodeExpires) return res.status(400).json({ success: false, message: "Verification code has expired.Request a resend for the code" })


            if (user.verificationCode === verificationCode) {
                await userModel.findByIdAndUpdate(userId, { isActive: true, verificationCode: null, verificationCodeExpires: null });
                return (
                    res.status(200).json({ success: true, message: "User Verified successfully" })
                )
            }

            res.status(400).json({ success: false, message: "Invalid verification code" })


        }
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while verifying user", error: error.message })
    }

};

/*=======================================
REGENERATE VERIFICATION CODE CONTROLLER
=======================================*/ 
const regenerateVerificationCode = async (req, res) => {
    const userId = req.user.id
    try {

        if (!userId) return res.status(400).json({ success: false, message: "UserId is required" })
        const user = await userModel.findById(userId)
        if (!user) return res.status(404).json({ success: false, message: "No user with specified id was found" })
        if (user.isActive) return res.status(400).json({ success: false, message: "User account has already been verified" })

        const newVerificationCode = generateCode()

        const newToken = generateToken(newVerificationCode)

        await userModel.findByIdAndUpdate(userId, { isActive: false, verificationCode: newVerificationCode, verificationCodeExpires: Date.now() + 3 * 24 * 60 * 60 * 1000 });
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

        const user = await userModel.findOne({ email })
        if (!user) return res.status(404).json({ success: false, message: "No user with specified email was found" })
        if (user.googleId) return res.status(400).json({ success: false, message: "Password login in not allowed for this user" })

        const resetCode = generateCode()
        const resetToken = generateToken(resetCode)
        await userModel.findByIdAndUpdate(user._id, { passwordResetCode: resetCode, passwordResetCodeExpires: Date.now() + 3 * 24 * 60 * 60 * 1000 });
        await sendVerificationEmail(user.email, user._id, null, resetToken, "reset");
        res.status(200).json({ success: true, message: "Your password reset code has been sent to your email" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error has occurred while sending password reset code", error: error.message })
    }
}



const resetPassword = async (req, res) => {
    try {

        const { token, userId } = req.query
        const { newPassword } = req.body
        if (token && userId) {
            if (!newPassword) return res.status(400).json({ success: false, message: "New password is required" })

            const user = await userModel.findById(userId)
            if (!user) return res.status(400).json({ success: false, message: "User with specified id does not exist" })

            if (!user.passwordResetCode) return res.status(400).json({ success: false, message: "Not password reset for this account" })

            const hashedResetCode = generateToken(user.passwordResetCode)
            if (token === hashedResetCode) {
                const isMatch = await bcrypt.compare(newPassword, user.password)

                if (isMatch) return res.status(400).json({ success: false, message: "New password should not be same as current password" })

                const newHashedPassword = await bcrypt.hash(newPassword, 15)

                await userModel.findByIdAndUpdate(user._id, { password: newHashedPassword, passwordResetCode: null, passwordResetCodeExpires: null });
                return res.status(200).json({ success: false, message: 'Password updated successfully' })

            } else {
                return res.status(400).json({ success: false, message: "Invalid password reset token" })
            }

        } else {
            res.status(400).json({ success: false, message: "Reset token and userId are required" })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while resetting password", error: error.message })
    }

}


module.exports = {
    regenerateVerificationCode,
    requestPasswordReset,
    loginWithPassword,
    googleCallback,
    resetPassword,
    verifyUser
};
