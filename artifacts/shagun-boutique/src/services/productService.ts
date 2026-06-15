import { fetchAPI } from '../lib/api';

export const productService = {
  // Fetch the entire catalog of products
  getAllProducts: async () => {
    return await fetchAPI('/api/product/list', {
      method: 'GET',
    });
  },

  // Fetch a single product's details by its ID
  getProductById: async (productId: string) => {
    return await fetchAPI(`/api/product/single?id=${productId}`, {
      method: 'GET',
    });
  }
};