import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

import {
  getProducts,
  scrapeProducts,
  analyzeProduct,
} from '../controllers/product.controller.js';

router.get('/', getProducts);
router.post('/scrape', authMiddleware, adminMiddleware, scrapeProducts);
router.post('/:id/analysis', authMiddleware, adminMiddleware, analyzeProduct);

export default router;
