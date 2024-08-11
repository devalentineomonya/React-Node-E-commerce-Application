const nodemailer = require('nodemailer');
const emailPage = require("../utils/mailPage.util")
const config = require("../config/config")

const sendVerificationEmail = async (email,userId, verificationCode, token) => {
    const title = "Verify Your Account"
    const message = "Your Verification code is:"
    const description = "Use this code to verify your DevalShopping Cart account. The code is valid for 3 day."

    const emailHTML = emailPage(title, message, description, verificationCode, token,userId)
    console.log(emailHTML)

    const transporter = nodemailer.createTransport({
        service: config.email.service,
        host:config.email.host,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    });

    const mailOptions = {
        from: 'DevalShoppingCart|',
        to: email,
        subject: `DevalShoppingCart | Account Verification - ${verificationCode}` ,
        html: emailHTML
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {sendVerificationEmail}