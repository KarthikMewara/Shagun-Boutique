import { fetchAPI } from '../lib/api';

export const orderService = {
  // Place a new order with items, total amount, and delivery address details
  placeOrder: async (orderData: { items: any[]; amount: number; address: any }) => {
    return await fetchAPI('/api/order/place', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Retrieve the order history of the logged-in user (token automatically attached)
  getUserOrders: async () => {
    return await fetchAPI('/api/order/userorders', {
      method: 'POST',
    });
  }
};