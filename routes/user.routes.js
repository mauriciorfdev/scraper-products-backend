import express from 'express';
import { getUsers, getProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/profile', authMiddleware, getProfile);

export default router;
