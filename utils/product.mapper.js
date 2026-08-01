export function mapProduct(product) {
  return {
    id: product._id.toString(),
    name: product.name,
    brand: product.brand,
    ingredients: product.ingredients,
    aiAnalysis: product.aiAnalysis ? product.aiAnalysis : null,
  };
}
