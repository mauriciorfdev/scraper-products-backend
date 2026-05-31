import express from 'express';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { notFoundMiddleware } from './middleware/notFound.middleware.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { authMiddleware } from './middleware/auth.middleware.js';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export { app };
