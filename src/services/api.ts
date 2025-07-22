import { API_CONFIG, getApiUrl } from '../config/api';
import { 
  Shop, 
  Product, 
  OrderWithItems, 
  CheckoutRequest, 
  CheckoutResponse,
  ApiResponse 
} from '../types/api';

class ApiService {
  private async request<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.error || `HTTP error! status: ${response.status}`,
          success: false
        };
      }

      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        success: false
      };
    }
  }

  // Shops API
  async getShops(): Promise<ApiResponse<Shop[]>> {
    return this.request<Shop[]>(getApiUrl(API_CONFIG.ENDPOINTS.SHOPS));
  }

  async createShop(ownerTelegramId: number, name: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(getApiUrl(API_CONFIG.ENDPOINTS.SHOPS), {
      method: 'POST',
      body: JSON.stringify({ owner_telegram_id: ownerTelegramId, name }),
    });
  }

  // Products API
  async getProducts(shopId?: number): Promise<ApiResponse<Product[]>> {
    const url = shopId 
      ? getApiUrl(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${shopId}`)
      : getApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS);
    return this.request<Product[]>(url);
  }

  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>(getApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS));
  }

  async createProduct(product: {
    shop_id: number;
    name: string;
    price: number;
    description: string;
    photo_file_id?: string;
  }): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(getApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS), {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async getProductById(productId: number): Promise<ApiResponse<Product>> {
    return this.request<Product>(getApiUrl(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${productId}`));
  }

  // Orders API
  async getOrdersByBuyer(buyerId: number): Promise<ApiResponse<OrderWithItems[]>> {
    return this.request<OrderWithItems[]>(getApiUrl(`${API_CONFIG.ENDPOINTS.ORDERS}/${buyerId}`));
  }

  async getOrdersByShop(shopId: number): Promise<ApiResponse<OrderWithItems[]>> {
    return this.request<OrderWithItems[]>(getApiUrl(`/shop_orders/${shopId}`));
  }

  async updateOrderStatus(orderId: number, status: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(getApiUrl(`${API_CONFIG.ENDPOINTS.ORDERS}/${orderId}/status`), {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Checkout API
  async checkout(checkoutData: CheckoutRequest): Promise<ApiResponse<CheckoutResponse>> {
    return this.request<CheckoutResponse>(getApiUrl(API_CONFIG.ENDPOINTS.CHECKOUT), {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    });
  }

  // Photo API
  getPhotoUrl(fileId: string): string {
    return getApiUrl(`${API_CONFIG.ENDPOINTS.PHOTO_TELEGRAM}/${fileId}`);
  }
}

export const apiService = new ApiService(); 