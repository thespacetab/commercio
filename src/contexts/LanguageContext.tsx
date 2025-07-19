import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations } from '../types';

const translations: Translations = {
  ru: {
    'page-title': 'Магазин — Главная',
    'catalog-title': 'Каталог — Commercio',
    'cart-title': 'Корзина — Commercio',
    'profile-title': 'Настройки — Commercio',
    'shop-title': 'Commercio',
    'search-placeholder': 'Найти в Commercio',
    'catalog-search-placeholder': 'Поиск по категориям',
    'banner-title': 'Летние скидки до 70%!',
    'banner-desc': 'Успей купить выгодно',
    'products-title': 'Рекомендуем',
    'add-to-cart': 'В корзину',
    'categories-title': 'Категории',
    'cat-smartphones': 'Смартфоны',
    'cat-laptops': 'Ноутбуки',
    'cat-tech': 'Техника',
    'cat-clothes': 'Одежда',
    'cat-shoes': 'Обувь',
    'cat-home': 'Для дома',
    'cat-accessories': 'Аксессуары',
    'nav-home': 'Главная',
    'nav-catalog': 'Каталог',
    'nav-cart': 'Корзина',
    'nav-profile': 'Настройки',
    'product-iphone': 'iPhone 16',
    'product-acer': 'Acer Nitro A55',
    'product-huawei': 'Huawei Laptop',
    'product-samsung': 'Samsung Powerpro',
    'product-vacuum': 'Пылесос Samsung VC18M21A0SB',
    'cart-empty': 'Ваша корзина пуста',
    'cart-total-label': 'Итого',
    'checkout': 'Оформить заказ',
    'remove': 'Удалить',
    'settings-title': 'Настройки',
    'privacy': 'Политика конфиденциальности',
    'terms': 'Условия пользования',
    'about': 'О нас',
    'contacts': 'Контакты',
  },
  en: {
    'page-title': 'Shop — Home',
    'catalog-title': 'Catalog — Commercio',
    'cart-title': 'Cart — Commercio',
    'profile-title': 'Settings — Commercio',
    'shop-title': 'Commercio',
    'search-placeholder': 'Search in Commercio',
    'catalog-search-placeholder': 'Search by categories',
    'banner-title': 'Summer discounts up to 70%!',
    'banner-desc': 'Hurry up for a great deal',
    'products-title': 'Recommended',
    'add-to-cart': 'Add to cart',
    'categories-title': 'Categories',
    'cat-smartphones': 'Smartphones',
    'cat-laptops': 'Laptops',
    'cat-tech': 'Electronics',
    'cat-clothes': 'Clothes',
    'cat-shoes': 'Shoes',
    'cat-home': 'For home',
    'cat-accessories': 'Accessories',
    'nav-home': 'Home',
    'nav-catalog': 'Catalog',
    'nav-cart': 'Cart',
    'nav-profile': 'Profile',
    'product-iphone': 'iPhone 16',
    'product-acer': 'Acer Nitro A55',
    'product-huawei': 'Huawei Laptop',
    'product-samsung': 'Samsung Powerpro',
    'product-vacuum': 'Samsung VC18M21A0SB Vacuum',
    'cart-empty': 'Your cart is empty',
    'cart-total-label': 'Total',
    'checkout': 'Checkout',
    'remove': 'Remove',
    'settings-title': 'Settings',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Use',
    'about': 'About Us',
    'contacts': 'Contacts',
  },
  uz: {
    'page-title': 'Do\'kon — Bosh sahifa',
    'catalog-title': 'Katalog — Commercio',
    'cart-title': 'Savat — Commercio',
    'profile-title': 'Sozlamalar — Commercio',
    'shop-title': 'Commercio',
    'search-placeholder': 'Commercio bo\'yicha qidirish',
    'catalog-search-placeholder': 'Kategoriyalar bo\'yicha qidirish',
    'banner-title': 'Yozgi chegirmalar 70% gacha!',
    'banner-desc': 'Foydali xaridga shoshiling',
    'products-title': 'Tavsiya qilamiz',
    'add-to-cart': 'Savatga',
    'categories-title': 'Kategoriyalar',
    'cat-smartphones': 'Smartfonlar',
    'cat-laptops': 'Noutbuklar',
    'cat-tech': 'Texnika',
    'cat-clothes': 'Kiyimlar',
    'cat-shoes': 'Oyoq kiyimlar',
    'cat-home': 'Uy uchun',
    'cat-accessories': 'Aksessuarlar',
    'nav-home': 'Bosh sahifa',
    'nav-catalog': 'Katalog',
    'nav-cart': 'Savat',
    'nav-profile': 'Sozlamalar',
    'product-iphone': 'iPhone 16',
    'product-acer': 'Acer Nitro A55',
    'product-huawei': 'Huawei Laptop',
    'product-samsung': 'Samsung Powerpro',
    'product-vacuum': 'Samsung VC18M21A0SB Changyutgich',
    'cart-empty': 'Savat bo\'sh',
    'cart-total-label': 'Jami',
    'checkout': 'Buyurtma berish',
    'remove': 'O\'chirish',
    'settings-title': 'Sozlamalar',
    'privacy': 'Maxfiylik siyosati',
    'terms': 'Foydalanish shartlari',
    'about': 'Biz haqimizda',
    'contacts': 'Kontaktlar',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang && ['ru', 'en', 'uz'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 