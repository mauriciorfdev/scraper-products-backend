import { ProductModel } from '../models/product.model.js';
import { scrapeService } from '../services/test-scraper.service.js';
import { mapProduct } from '../utils/product.mapper.js';

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

async function updateProduct(req, res) {
  console.log(req.body);
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    req.params.id,
    { aiAnalysis: req.body },
    { returnDocument: 'after' },
  );
  return res.status(200).json(updatedProduct);
  //return res.status(200).json({ msg: 'updateProduct !', identificador: id });
}

export { getProducts, scrapeProducts, updateProduct };
