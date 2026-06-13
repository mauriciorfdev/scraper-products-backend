import { ProductModel } from '../models/product.model.js';
import { scrapeService } from '../services/scrape.service.js';

async function getProducts(req, res) {
  const products = await ProductModel.find().select({
    name: 1,
    brand: 1,
    ingredients: 1,
    _id: 0,
  });
  return res.status(200).json(products);
}

async function scrapeProducts(req, res) {
  const results = await scrapeService();
  console.log('controller results: ', results);
  await ProductModel.insertMany(results);
  return res.status(201).json({ success: true, inserted: results.length });
}

export { getProducts, scrapeProducts };
