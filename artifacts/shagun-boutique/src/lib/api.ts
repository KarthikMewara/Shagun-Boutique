export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  // Retrieve token from local storage for authenticated routes
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { token } : {}), 
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

export default fetchAPI;