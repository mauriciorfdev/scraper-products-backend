import { ProductModel } from '../models/product.model.js';
import { analyzeIngredients } from './ia.service.js';

async function analyzeProduct(id) {
  const product = await ProductModel.findById(id);

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  const analysis = await analyzeIngredients(product.ingredients);
  const aiMetadata = { model: process.env.AI_MODEL };
  product.aiAnalysis = { ...analysis, ...aiMetadata };

  await product.save();

  return product;
}

export { analyzeProduct };
