const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');
const config = require('../config/config');
const AdminModel = require('../models/admin.model')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user
        const userId = user.id
        const isValidId = isValidObjectId(userId);
        if (!isValidId) return res.status(404).json({ success: false, message: "User is not valid" })
        const adminUser = await AdminModel.findById(userId)
        if (!adminUser) return res.status(403).json({ success: false, message: "User is not Allowed to perform this operation" })
        next()


    } catch (error) {
        return res.status(403).json({ success: false, message: 'User has no permissions to access this operation' });
    }
}

module.exports = { authMiddleware, isAdmin };
