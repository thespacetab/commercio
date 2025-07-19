export const API_CONFIG = {
  BASE_URL: 'https://d7f085e45077.ngrok-free.app/api',
  ENDPOINTS: {
    SHOPS: '/shops',
    PRODUCTS: '/products',
    ORDERS: '/orders',
    CHECKOUT: '/checkout',
    PHOTO_TELEGRAM: '/photo_telegram'
  }
};

export const getApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`; 