const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// @desc    Register a new admin
// @route   POST /api/auth/register
// @access  Public (should be disabled in production or protected)
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                status: 'error',
                message: 'Admin with this email already exists'
            });
        }
        console.log("Admin created successfully");
        // Create admin
        const admin = await Admin.create({ name, email, password });

        // Generate token
        const token = generateToken(admin._id);
        console.log("token", token)
        res.status(201).json({
            status: 'success',
            message: 'Admin registered successfully',
            data: {
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide email and password'
            });
        }

        // Find admin and include password
        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(admin._id);

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            data: {
                admin: {
                    id: req.admin._id,
                    name: req.admin.name,
                    email: req.admin.email
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Get admin with password
        const admin = await Admin.findById(req.admin._id).select('+password');

        // Check current password
        const isMatch = await admin.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Current password is incorrect'
            });
        }

        // Update password
        admin.password = newPassword;
        await admin.save();

        // Generate new token
        const token = generateToken(admin._id);

        res.status(200).json({
            status: 'success',
            message: 'Password updated successfully',
            data: { token }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
