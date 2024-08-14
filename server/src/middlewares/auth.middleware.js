const jwt = require('jsonwebtoken');
const config = require('../config/config');
const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];

    // Check if the token is blacklisted
    client.get(token, (err, reply) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        if (reply === 'blacklisted') {
            return res.status(401).json({ success: false, message: 'Token has been invalidated' });
        }

        // If the token is not blacklisted, verify it
        try {
            const decoded = jwt.verify(token, config.jwt.secret);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }
    });
};

module.exports = authMiddleware;
