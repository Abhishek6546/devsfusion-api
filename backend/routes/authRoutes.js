import express from 'express';
const router = express.Router();
import { register, login, getMe, updatePassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);

export default router;
