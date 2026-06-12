import express from 'express';
const router = express.Router();

import {
  getProducts,
  scrapeProducts,
} from '../controllers/product.controller.js';

router.get('/', getProducts);
router.post('/scrape', scrapeProducts);

export default router;
