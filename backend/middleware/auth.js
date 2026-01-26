import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Access denied. No token provided.'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find admin and attach to request
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({
                status: 'error',
                message: 'Admin not found. Token is invalid.'
            });
        }

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token.'
        });
    }
};
