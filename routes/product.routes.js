import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

import {
  getProducts,
  scrapeProducts,
} from '../controllers/product.controller.js';

router.get('/', getProducts);
router.post('/scrape', authMiddleware, adminMiddleware, scrapeProducts);

export default router;
