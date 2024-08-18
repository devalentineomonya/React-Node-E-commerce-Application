const generateToken = (verificationCode) => {
    return crypto.createHash('sha512').update(verificationCode).digest('hex');
};
module.exports = {generateToken}