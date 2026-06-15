import { fetchAPI } from '../lib/api';

export const authService = {
  registerUser: async (userData: { name: string; email: string; password: string }) => {
    return await fetchAPI('/api/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  loginUser: async (userData: { email: string; password: string }) => {
    return await fetchAPI('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
};