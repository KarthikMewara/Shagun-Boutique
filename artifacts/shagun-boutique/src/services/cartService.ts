import { fetchAPI } from '../lib/api';

export const cartService = {
  // Retrieve the current user's cart (requires token in localStorage)
  getUserCart: async () => {
    return await fetchAPI('/api/cart/get', {
      method: 'POST', 
    });
  },

  // Add a specific item and size to the cart
  addToCart: async (itemId: string, size: string) => {
    return await fetchAPI('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({ itemId, size }),
    });
  },

  // Update the quantity of a specific item and size in the cart
  updateCart: async (itemId: string, size: string, quantity: number) => {
    return await fetchAPI('/api/cart/update', {
      method: 'POST',
      body: JSON.stringify({ itemId, size, quantity }),
    });
  }
};