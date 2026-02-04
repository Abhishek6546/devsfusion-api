import express from 'express';
const router = express.Router();
import {
    submitContact,
    getAllContacts,
    getContact,
    updateContactStatus,
    deleteContact,
    getContactStats
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

// Public route - Submit contact form
router.post('/', submitContact);

// Protected routes (Admin only)
router.get('/', protect, getAllContacts);
router.get('/stats', protect, getContactStats);
router.get('/:id', protect, getContact);
router.patch('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

export default router;
