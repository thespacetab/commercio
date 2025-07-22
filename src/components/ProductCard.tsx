import React from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    alert('Товар добавлен в корзину!');
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
      <img src={product.img} alt={product.title} className="product-img" />
      <div className="product-info" onClick={e => e.stopPropagation()}>
        <div className="product-title">{product.title}</div>
        <div className="product-meta">
          <span className="product-price">{product.price.toLocaleString()} ₽</span>
          {product.oldPrice && (
            <span className="product-old-price">{product.oldPrice.toLocaleString()} ₽</span>
          )}
          {product.discount && (
            <span className="product-discount">{product.discount}</span>
          )}
        </div>
        <button className="add-cart-btn" onClick={handleAddToCart}>
          <img src="/assets/icons/cart.svg" alt="В корзину" />
          <span>{t('add-to-cart')}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 