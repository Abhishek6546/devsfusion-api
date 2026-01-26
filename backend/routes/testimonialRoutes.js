import express from 'express';
const router = express.Router();
import {
    getAllTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonial);

// Protected routes (Admin only)
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;
