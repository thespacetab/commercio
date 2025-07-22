import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { apiService } from '../services/api';
import { Product as ApiProduct } from '../types/api';
import './Product.css';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiService.getProductById(Number(id))
      .then(res => {
        if (res.success && res.data) setProduct(res.data);
        else setError(res.error || 'Ошибка загрузки товара');
      })
      .catch(() => setError('Ошибка загрузки товара'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="product-page"><div className="loading">Загрузка...</div></div>;
  if (error || !product) return <div className="product-page"><div className="error">{error || 'Товар не найден'}</div></div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.name,
      name: product.name,
      img: product.photo_file_id ? apiService.getPhotoUrl(product.photo_file_id) : '/assets/images/iPhone 16 All Colors PNG-Photoroom.png',
      price: product.price,
      description: product.description,
      shop_id: product.shop_id,
      photo_file_id: product.photo_file_id
    });
    alert('Товар добавлен в корзину!');
  };

  return (
    <div className="product-page">
      <div className="product-gallery">
        <img src={product.photo_file_id ? apiService.getPhotoUrl(product.photo_file_id) : '/assets/images/iPhone 16 All Colors PNG-Photoroom.png'} alt={product.name} className="product-main-img" />
        {/* Здесь можно добавить мини-галерею, если есть несколько фото */}
      </div>
      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <div className="product-price">{product.price.toLocaleString()} ₽</div>
        <div className="product-description">{product.description}</div>
        <button className="add-cart-btn" onClick={handleAddToCart}>{t('add-to-cart')}</button>
      </div>
    </div>
  );
};

export default Product; 