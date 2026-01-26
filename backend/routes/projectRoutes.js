import express from 'express';
const router = express.Router();
import {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProject);

// Protected routes (Admin only)
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
