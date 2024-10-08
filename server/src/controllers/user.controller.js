const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const { sendVerificationEmail } = require("./mail.controller")
const { generateToken } = require("../utils/token.util");
const { generateCode } = require("../utils/code.util");
const { isValidObjectId } = require("mongoose");




/*=======================
REGISTER USER CONTROLLER
=========================*/

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const checkUser = await UserModel.findOne({ email });
        if (checkUser) return res.status(400).json({ success: false, message: "User with the same email address already exists" });

        const hashedPassword = await bcrypt.hash(password, 15);
        const verificationCode = generateCode();
        const verificationToken = generateToken(verificationCode);
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            verificationCode,
            verificationCodeExpires: Date.now() + 3 * 24 * 60 * 60 * 1000
        });

        await user.save();

        const userObject = user.toObject()

        const payload = {
            id: userObject._id,
            email: userObject.email,
            isVerified: userObject.isVerified,
            isActive: userObject.isActive
        };


        const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });


        delete userObject.password
        delete userObject.verificationCode
        delete userObject.verificationCodeExpires
        delete userObject.passwordResetCode;
        delete userObject.passwordResetCodeExpires
        await sendVerificationEmail(email, user._id, verificationCode, verificationToken, "verify");

        res.status(201).json({ success: true, message: "User registered successfully. Please check your email to verify your account.", token, data: userObject });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred during registration.", error: error.message });
    }
};


/*=======================
GET SINGLE USER CONTROLLER
=========================*/

const getUser = async (req, res) => {
    const userId = req.params.userId
    if (!userId) return res.status(400).json({ success: false, message: "UserId is required" })
    try {
        const isValidId = isValidObjectId(userId)

        if (!isValidId) return res.status(404).json({ success: false, message: "Product with the specified id does not exist" })
        const user = await UserModel.findById(userId);
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

/*=======================
UPDATE USER CONTROLLER
=========================*/
const updateUser = async (req, res) => {
    const { userId } = req.params
    const { firstName, lastName, middleName, email, gender, dateOfBirth, phoneNumber: primaryPhoneNumber, secondaryPhoneNumber } = req.body

    if (!userId) return res.status(400).json({ success: false, message: "User id is required" })
    try {
        const isValidId = isValidObjectId(userId)

        if (!isValidId) return res.status(404).json({ success: false, message: "User with the specified id does not exist" })
        const user = await UserModel.findById(userId)
        if (!user) return res.status(404).json({ success: false, message: "User with the specified id was not found" })
        const isDuplicate = await UserModel.findOne({ email, _id: { $ne: userId } })
        if (isDuplicate) return res.status(400).json({ success: false, message: "User with the specified email already exists." })
        const newUser = await UserModel.findByIdAndUpdate(userId, { firstName, lastName, middleName, gender, dateOfBirth, primaryPhoneNumber, secondaryPhoneNumber }, { new: true })

        const userObject = newUser.toObject()

        delete userObject.password
        delete userObject.verificationCode
        delete userObject.verificationCodeExpires
        delete userObject.passwordResetCode;

        res.status(200).json({ success: true, message: "User updated successfully", data: userObject })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while querying user data.", error: error.message });
    }



}



module.exports = { registerUser, getUser, updateUser };
