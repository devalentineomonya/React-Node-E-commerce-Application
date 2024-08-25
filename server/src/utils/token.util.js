const crypto = require("crypto");
const CryptoJS = require('crypto-js'); 
const { isValidObjectId } = require('mongoose');
const UserModel = require('../models/user.model');
const config = require("../config/config");

const generateToken = (verificationCode) => {
    return crypto.createHash('sha512').update(verificationCode).digest('hex');
};





 const encryptMessage = (message, secretKey) => {
    const encrypted = CryptoJS.AES.encrypt(message, secretKey);
    let base64Encrypted = encrypted.toString();
    base64Encrypted = base64Encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '~');
    return base64Encrypted;
};



const verifyToken = async (userId, token) => {
    const secretKey = config.messageSecret;
    try {
        const isValidId = isValidObjectId(userId);

        if (!isValidId) {
            const message = "User with the specified id does not exist";
            return { success: false, message: encryptMessage(message, secretKey) };
        }

        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            const message = "User with the specified id does not exist";
            return { success: false, message: encryptMessage(message, secretKey) };
        }

        if (user.isVerified) {
            const message = "Account is already verified";
            return { success: true, message: encryptMessage(message, secretKey) };
        }

        const hashedCode = generateToken(user.verificationCode);

        if (Date.now() > user.verificationCodeExpires) {
            const message = "Verification code has expired. Request a resend for the code";
            return { success: false, message: encryptMessage(message, secretKey) };
        }

        if (hashedCode === token) {
            const message = "Account Verified Successfully";
            return { success: true, message: encryptMessage(message, secretKey) };
        }

        const message = "Invalid Verification Token";
        return { success: false, message: encryptMessage(message, secretKey) };

    } catch (error) {
        return { success: false, message: encryptMessage(error.message, secretKey) };
    }
};
module.exports = { generateToken, verifyToken, encryptMessage }