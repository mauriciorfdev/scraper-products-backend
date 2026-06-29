import express from 'express';
import { getUsers } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);

/* router.get('/profile', authMiddleware, getProfile); */

export default router;
