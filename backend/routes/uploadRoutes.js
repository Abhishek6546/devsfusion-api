import express from 'express';
import { uploadProject, uploadService, uploadTestimonial, uploadGeneral, deleteImage } from '../config/cloudinary.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Upload project image
// @route   POST /api/upload/project
// @access  Private (Admin only)
router.post('/project', protect, uploadProject.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No image file provided'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Image uploaded successfully',
            data: {
                url: req.file.path,
                publicId: req.file.filename
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @desc    Upload service image
// @route   POST /api/upload/service
// @access  Private (Admin only)
router.post('/service', protect, uploadService.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No image file provided'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Image uploaded successfully',
            data: {
                url: req.file.path,
                publicId: req.file.filename
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @desc    Upload testimonial avatar
// @route   POST /api/upload/testimonial
// @access  Private (Admin only)
router.post('/testimonial', protect, uploadTestimonial.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No image file provided'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Image uploaded successfully',
            data: {
                url: req.file.path,
                publicId: req.file.filename
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @desc    Upload general image
// @route   POST /api/upload/general
// @access  Private (Admin only)
router.post('/general', protect, uploadGeneral.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No image file provided'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Image uploaded successfully',
            data: {
                url: req.file.path,
                publicId: req.file.filename
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload
// @access  Private (Admin only)
router.delete('/', protect, async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({
                status: 'error',
                message: 'Image URL is required'
            });
        }

        const result = await deleteImage(imageUrl);

        if (result.success) {
            res.status(200).json({
                status: 'success',
                message: 'Image deleted successfully'
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: result.message || 'Failed to delete image'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
