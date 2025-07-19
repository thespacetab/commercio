export interface Product {
  id: string | number;
  title: string;
  name?: string; // для API
  img: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  description?: string; // для API
  shop_id?: number; // для API
  photo_file_id?: string; // для API
}

export interface CartItem extends Product {
  qty: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  key: string;
}

export type Language = 'ru' | 'en' | 'uz';

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
} 