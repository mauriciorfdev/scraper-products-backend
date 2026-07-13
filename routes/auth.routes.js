import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from '../controllers/auth.controller.js';
import { validateMiddleware } from '../middleware/validate.middlware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', validateMiddleware(registerSchema), registerUser);

router.post('/login', validateMiddleware(loginSchema), loginUser);

router.post('/logout', logoutUser);

router.get('/me', authMiddleware, getCurrentUser);

export default router;
