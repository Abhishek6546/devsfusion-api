const express = require('express');
const router = express.Router();
const {
    submitContact,
    getAllContacts,
    getContact,
    updateContactStatus,
    deleteContact,
    getContactStats
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

// Public route - Submit contact form
router.post('/', submitContact);

// Protected routes (Admin only)
router.get('/', protect, getAllContacts);
router.get('/stats', protect, getContactStats);
router.get('/:id', protect, getContact);
router.patch('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;
