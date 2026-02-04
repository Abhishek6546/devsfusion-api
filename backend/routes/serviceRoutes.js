import express from 'express';
import {
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:id', getService);

// Protected routes (Admin only)
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

export default router;
