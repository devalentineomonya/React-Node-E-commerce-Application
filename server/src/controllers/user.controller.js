const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const { sendVerificationEmail } = require("./mail.controller")


const generateCode = () => {
    let code;
    do {
        code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (/^(\d)\1{5}$/.test(code));
    return code;
};


const generateToken = (verificationCode) => {
    return crypto.createHash('sha512').update(verificationCode).digest('hex');
};


/*=======================
REGISTER USER CONTROLLER
=========================*/

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const checkUser = await userModel.findOne({ email });
        if (checkUser) return res.status(400).json({ success: false, message: "User with the same email address already exists" });

        const hashedPassword = await bcrypt.hash(password, 15);
        const verificationCode = generateCode();
        const verificationToken = generateToken(verificationCode);
        const user = new userModel({
            firstName,
            lastName,
            email,
            primaryPhoneNumber: "0948947447",
            password: hashedPassword,
            verificationCode,
            verificationCodeExpires: Date.now() + 3 * 24 * 60 * 60 * 1000
        });

        await user.save();

        const userObject = user.toObject()

        const payload = {
            id: userObject._id,
            email: userObject.email,
            isActive: userObject.isActive,
        };


        const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

        delete userObject.password
        delete userObject.verificationCode
        delete userObject.verificationCodeExpires
        await sendVerificationEmail(email, user._id, verificationCode, token, "verify");

        res.status(201).json({ success: true, message: "User registered successfully. Please check your email to verify your account.", token, data: userObject, verificationToken });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred during registration.", error: error.message });
    }
};


/*=======================
GET USER CONTROLLER
=========================*/

const getUser = async (req, res) => {
    const userId = req.params.userId
    if (!userId) return res.status(400).json({ success: false, message: "UserId is required" })
    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(400).json({ success: false, message: "User with specified id was not found" })
        const userObject = user.toObject()

        delete userObject.password
        delete userObject.verificationCode
        delete userObject.verificationCodeExpires
        delete userObject.passwordResetCode;
        delete userObject.passwordResetCodeExpires
        res.status(200).json({ success: true, message: "User queried successfully", data: userObject })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while querying user data.", error: error.message });
    }



}





module.exports = { registerUser, getUser, generateToken, generateCode };
