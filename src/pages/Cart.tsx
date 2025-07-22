import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useApiMutation } from '../hooks/useApi';
import { apiService } from '../services/api';
import { CheckoutRequest } from '../types/api';
import './Cart.css';

const Cart: React.FC = () => {
  const { t } = useLanguage();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  // Мутация для оформления заказа
  const { mutate: checkout, loading: checkoutLoading, error: checkoutError } = useApiMutation<
    CheckoutRequest,
    any
  >(apiService.checkout);

  const handleCheckout = async () => {
    const checkoutItems = cart.map(item => ({
      product_id: typeof item.id === 'string' ? parseInt(item.id) : item.id,
      qty: item.qty
    }));

    const checkoutData: CheckoutRequest = {
      buyer_id: 1,
      items: checkoutItems
    };

    const result = await checkout(checkoutData);
    
    if (result.success) {
      clearCart();
      alert('Спасибо за заказ! Заказ успешно оформлен.');
    } else {
      alert(`Ошибка оформления заказа: ${result.error}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <img src="/shop/commercio-cart.png" alt="Пусто" className="cart-empty-banner" />
          <div className="cart-empty-text">{t('cart-empty')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-banner">
        <img src="/shop/commercio-cart.png" alt="Корзина баннер" className="cart-banner-img" />
        <div className="cart-banner-content">
          <h2>Ваша корзина</h2>
          <p>Проверьте товары и оформите заказ</p>
        </div>
      </div>
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
              <div className="cart-item-title">{item.title}</div>
              <div className="cart-item-meta">
                <span className="cart-item-price">{item.price.toLocaleString()} ₽</span>
                {item.oldPrice && (
                  <span className="cart-item-old-price">{item.oldPrice.toLocaleString()} ₽</span>
                )}
                {item.discount && (
                  <span className="cart-item-discount">{item.discount}</span>
                )}
              </div>
              <div className="cart-item-qty">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id.toString(), item.qty - 1)}
                >
                  -
                </button>
                <span className="qty-value">{item.qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id.toString(), item.qty + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart-item-total">
              {(item.price * item.qty).toLocaleString()} ₽
            </div>
            <button
              className="cart-item-remove"
              onClick={() => removeFromCart(item.id.toString())}
              title={t('remove')}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {checkoutError && (
        <div className="checkout-error">
          Ошибка: {checkoutError}
        </div>
      )}

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>{t('cart-total-label')}:</span>
          <span className="cart-summary-total">{getTotalPrice().toLocaleString()} ₽</span>
        </div>
        <button 
          className="cart-checkout-btn" 
          onClick={handleCheckout}
          disabled={checkoutLoading}
        >
          {checkoutLoading ? 'Оформление...' : t('checkout')}
        </button>
      </div>
    </div>
  );
};

export default Cart; 