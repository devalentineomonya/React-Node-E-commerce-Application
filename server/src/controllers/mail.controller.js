const nodemailer = require('nodemailer');
const emailPage = require("../utils/mailPage.util")
const config = require("../config/config")

const sendVerificationEmail = async (email,userId, verificationCode, token,action) => {
    let title 
    let message 
    let description
    switch (action) {
        case "verify":
            title = "Verify Your Account"
            message = "Your Verification code is:"
            description = "Use this code to verify your DevalShopping Cart account. The code is valid for 3 day."
            break;
    case "reset":
        title = "Reset Your Password"
      
        description = "Use this code to reset your DevalShopping Cart account password. The code is valid for 3 day."
        default:
            break;
    }

    const emailHTML = emailPage(title, message, description, verificationCode, token,userId, action)
   
  

    const transporter = nodemailer.createTransport({
        service: config.email.service,
        host:config.email.host,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    });

    const mailOptions = {
        from: '"DevalShoppingCart" <contact@devalshoppingcart.vercel.app>',
        to: email,
        subject: `DevalShoppingCart | Account Verification - ${verificationCode}` ,
        html: emailHTML
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {sendVerificationEmail}