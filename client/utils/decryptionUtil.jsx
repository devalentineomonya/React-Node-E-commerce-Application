import CryptoJS from "crypto-js"; 

export const decryptMessage = (encryptedMessage) => {
    const secretKey = import.meta.env.VITE_MSG_SECRETE; 
    try {
        const base64Message = encryptedMessage.replace(/-/g, '+').replace(/_/g, '/').replace(/~$/, '=');
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(base64Message), secretKey);
        const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedMessage;
    } catch (error) {
        console.error("Decryption error:", error.message);
        return null;
    }
};
