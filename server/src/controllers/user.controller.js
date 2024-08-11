const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendVerificationEmail } = require("./mail.controller")


const generateVerificationCode = () => {
    let code;
    do {
        code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (/^(\d)\1{5}$/.test(code));  
    return code;
};


const generateToken = (verificationCode) => {
    return crypto.createHash('sha512').update(verificationCode).digest('hex');
};

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const checkUser = await userModel.findOne({ email });
        if (checkUser) return res.status(400).json({ success: false, message: "User with the same email address already exists" });

        const hashedPassword = await bcrypt.hash(password, 15);


        const verificationCode = generateVerificationCode();
        const token = generateToken(verificationCode);

    
        const user = new userModel({
            firstName,
            lastName,
            email,
            primaryPhoneNumber:"0948947447",
            password: hashedPassword,
            verificationCode,
            verificationCodeExpires: Date.now() + 3 * 24 * 60 * 60 * 1000 
        });

        await user.save();

        await sendVerificationEmail(email,user._id ,verificationCode, token);

        res.status(201).json({ success: true, message: "User registered successfully. Please check your email to verify your account." });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred during registration.", error: error.message });
    }
};







module.exports = { registerUser };
