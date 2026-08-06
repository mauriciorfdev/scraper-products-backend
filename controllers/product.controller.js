import { ProductModel } from '../models/product.model.js';
import { scrapeService } from '../services/test-scraper.service.js';
import { mapProduct } from '../utils/product.mapper.js';
import * as productService from '../services/product.service.js';

async function getProducts(req, res) {
  const products = await ProductModel.find();
  const cleanProducts = products.map((product) => mapProduct(product));
  return res.status(200).json(cleanProducts);
}

async function scrapeProducts(req, res) {
  //const results = await scrapeService();
  //console.log('controller results: ', results);
  //await ProductModel.insertMany(results);
  //return res.status(201).json({ success: true, inserted: results.length });
  const results = { name: 'nameEx', brand: 'brandEx', ingredients: 'ingEx' };
  return res
    .status(201)
    .json({ success: true, results, msg: 'Bot-bypass testing pending' });
}

async function analyzeProduct(req, res) {
  const { id } = req.params;
  const analyzedProduct = await productService.analyzeProduct(id);
  return res.status(200).json(mapProduct(analyzedProduct));
}

export { getProducts, scrapeProducts, analyzeProduct };
