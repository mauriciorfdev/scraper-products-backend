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
  aiAnalysis: {
    type: {
      novaClassification: Number,
      novaJustification: String,
      summary: String,
      sugars: [String],
      allergens: [String],
      diets: [{ name: String, compatible: Boolean, reasons: [String] }],
      additives: [{ name: String, code: String, purpose: String }],
    },
    default: undefined,
  },
});

const ProductModel = mongoose.model('Product', ProductSchema);

export { ProductModel };
