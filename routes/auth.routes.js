import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { validateMiddleware } from '../middleware/validate.middlware.js';
import { registerSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/register', validateMiddleware(registerSchema), registerUser);

router.post('/login', loginUser);

export default router;
