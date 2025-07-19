export interface Shop {
  id: number;
  owner_telegram_id: number;
  name: string;
}

export interface Product {
  id: number;
  shop_id: number;
  name: string;
  price: number;
  description: string;
  photo_file_id?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  price_snapshot: number;
  name?: string;
  photo_file_id?: string;
}

export interface Order {
  id: number;
  buyer_id: number;
  shop_id: number;
  status: string;
  created_at: string;
}

export interface OrderWithItems {
  order: Order;
  items: OrderItem[];
}

export interface CheckoutItem {
  product_id: number;
  qty: number;
}

export interface CheckoutRequest {
  buyer_id: number;
  items: CheckoutItem[];
}

export interface CheckoutResponse {
  success: boolean;
  orders: Array<{
    order_id: number;
    shop_id: number;
    shop_name: string;
    total: number;
  }>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success?: boolean;
} 