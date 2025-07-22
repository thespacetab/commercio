import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/ProductCard';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';
import { Product } from '../types';
import { Product as ApiProduct } from '../types/api';
import './Home.css';

const categories = [
  { id: 1, name: 'Электроника', icon: '/assets/icons/products.png' },
  { id: 2, name: 'Одежда', icon: '/assets/icons/user.png' },
  { id: 3, name: 'Продукты', icon: '/assets/icons/grocery-store.png' },
  { id: 4, name: 'Дом', icon: '/assets/icons/home.png' },
  { id: 5, name: 'Другое', icon: '/assets/icons/like.png' },
];

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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

  const filteredProducts = products.filter(product => {
    const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory ? product.shop_id === selectedCategory : true;
    return matchSearch && matchCategory;
  });

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
      <div className="main-banner">
        <img
          src="/shop/commercio-home.png"
          alt="Главный баннер"
          className="main-banner-img"
        />
        <div className="main-banner-content">
          <h1>Добро пожаловать в Commercio!</h1>
          <p>Лучшие товары и выгодные предложения для вас</p>
        </div>
      </div>

      <div className="search-row">
        <input
          type="text"
          className="search-input"
          placeholder={t('search-placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="categories-row">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn${selectedCategory === cat.id ? ' selected' : ''}`}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
          >
            <img src={cat.icon} alt={cat.name} />
            <span>{cat.name}</span>
          </button>
        ))}
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