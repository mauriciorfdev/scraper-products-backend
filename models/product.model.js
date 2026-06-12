import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  sourceUrl: {
    type: String,
  },
  scrapedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model('Product', ProductSchema);

export { ProductModel };
