import { ProductModel } from '../models/product.model.js';

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
  return res.status(200).json({ message: 'scrape products...' });
}

export { getProducts, scrapeProducts };
