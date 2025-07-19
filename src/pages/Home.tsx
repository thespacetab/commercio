import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/ProductCard';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';
import { Product } from '../types';
import { Product as ApiProduct } from '../types/api';
import './Home.css';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Загружаем товары с бэкенда
  const { data: apiProducts, loading, error, refetch } = useApi(
    () => apiService.getAllProducts(),
    []
  );

  // Преобразуем API товары в формат для фронтенда
  const products: Product[] = apiProducts?.map((product: ApiProduct) => ({
    id: product.id,
    title: product.name || 'Товар',
    name: product.name,
    img: product.photo_file_id 
      ? apiService.getPhotoUrl(product.photo_file_id)
      : '/assets/images/iPhone 16 All Colors PNG-Photoroom.png', // fallback
    price: product.price,
    description: product.description,
    shop_id: product.shop_id,
    photo_file_id: product.photo_file_id
  })) || [];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading">Загрузка товаров...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error">
          Ошибка загрузки товаров: {error}
          <button onClick={refetch} className="retry-btn">Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="search-row">
        <input
          type="text"
          className="search-input"
          placeholder={t('search-placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="banner">
        <img
          src="/assets/images/Online shopping for social media post _ Premium Vector.jpg"
          alt="Баннер"
          className="banner-img"
        />
        <div className="banner-content">
          <div className="banner-title">{t('banner-title')}</div>
          <div className="banner-desc">{t('banner-desc')}</div>
        </div>
      </div>

      <section className="products">
        <div className="products-title">{t('products-title')}</div>
        {filteredProducts.length > 0 ? (
          <div className="products-list">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            {searchQuery ? 'Товары не найдены' : 'Товары отсутствуют'}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home; 