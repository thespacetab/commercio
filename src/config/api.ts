export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api',
  ENDPOINTS: {
    SHOPS: '/shops',
    PRODUCTS: '/products',
    ORDERS: '/orders',
    CHECKOUT: '/checkout',
    PHOTO_TELEGRAM: '/photo_telegram'
  }
};

export const getApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`; 