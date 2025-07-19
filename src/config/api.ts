// Обновлено для теста git push
export const API_CONFIG = {
  BASE_URL: 'https://950cd42148ae.ngrok-free.app/api',
  ENDPOINTS: {
    SHOPS: '/shops',
    PRODUCTS: '/products',
    ORDERS: '/orders',
    CHECKOUT: '/checkout',
    PHOTO_TELEGRAM: '/photo_telegram'
  }
};

export const getApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`; 
