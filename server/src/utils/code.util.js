const generateCode = () => {
    let code;
    do {
        code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (/^(\d)\1{5}$/.test(code));
    return code;
};

module.exports = {generateCode}