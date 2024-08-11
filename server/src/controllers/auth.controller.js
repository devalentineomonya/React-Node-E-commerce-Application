const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport'); // Import Passport
const userModel = require("../models/user.model");
const crypto = require('crypto');

// Login with Password
const loginWithPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        // Convert Mongoose document to plain JavaScript object
        const userObject = user.toObject();

        // Remove sensitive fields
        delete userObject.password;
        delete userObject.verificationCode;
        delete userObject.verificationCodeExpires;

        const payload = {
            id: user._id,
            email: user.email,
            isActive: user.isActive,
        };

        // Sign token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: `Bearer ${token}`,
            user: userObject
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};


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

            const payload = {
                id: user._id,
                email: user.email,
                isActive: user.isActive
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

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



const verifyToken = async (email, userProvidedCode) => {
    const hashedCode = crypto.createHash('sha512').update(userProvidedCode).digest('hex');
    const user = await userModel.findOne({ email });

    if (!user) {
        return { success: false, message: "User not found." };
    }

    if (Date.now() > user.verificationCodeExpires) {
        return { success: false, message: "Verification code has expired." };
    }

    if (hashedCode === user.verificationCode) {
        return { success: true, message: "Verification successful." };
    } else {
        return { success: false, message: "Invalid verification code." };
    }
};

const verifyUser = async (req, res) => {
    const { email, verificationCode } = req.body;
    const result = await verifyToken(email, verificationCode);

    if (result.success) {
        await userModel.updateOne({ email }, { isActive: true, verificationCode: null, verificationCodeExpires: null });
        res.status(200).json({ success: true, message: "Account verified successfully." });
    } else {
        res.status(400).json(result);
    }
};

const regenerateVerificationCode = (req, res)=>{
    

}
module.exports = {
    loginWithPassword,
    googleCallback,
    verifyUser
};
