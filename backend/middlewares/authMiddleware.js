// authMiddleware.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    // Get token from request header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ 
            message: '⚠️ :: No token, authorization denied!',
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        // Add user to request object
        req.user = decoded.user;
        // Move to the next middleware or route handler
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ 
            message: '⚠️ :: Invalid token!' 
        });
    }
};

module.exports = authMiddleware;
