import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';
import { OrderWithItems } from '../types/api';
import './Orders.css';

const Orders: React.FC = () => {
  const { t } = useLanguage();

  // Загружаем заказы пользователя
  const { data: orders, loading, error, refetch } = useApi(
    () => apiService.getOrdersByBuyer(1), // Временный ID пользователя
    []
  );

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading">Загрузка заказов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="error">
          Ошибка загрузки заказов: {error}
          <button onClick={refetch} className="retry-btn">Повторить</button>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="no-orders">
          <img src="/assets/icons/grocery-store.png" alt="Нет заказов" className="no-orders-icon" />
          <div className="no-orders-text">У вас пока нет заказов</div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-title">Мои заказы</div>
      <div className="orders-list">
        {orders.map((orderData) => (
          <div key={orderData.order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <div className="order-number">Заказ #{orderData.order.id}</div>
                <div className="order-date">
                  {new Date(orderData.order.created_at).toLocaleDateString('ru-RU')}
                </div>
                <div className={`order-status order-status-${orderData.order.status}`}>
                  {orderData.order.status}
                </div>
              </div>
            </div>
            <div className="order-items">
              {orderData.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img 
                    src={item.photo_file_id ? apiService.getPhotoUrl(item.photo_file_id) : '/assets/images/iPhone 16 All Colors PNG-Photoroom.png'} 
                    alt={item.name || 'Товар'} 
                    className="order-item-img" 
                  />
                  <div className="order-item-info">
                    <div className="order-item-name">{item.name || 'Товар'}</div>
                    <div className="order-item-meta">
                      <span className="order-item-qty">{item.qty} шт.</span>
                      <span className="order-item-price">{item.price_snapshot.toLocaleString()} ₽</span>
                    </div>
                  </div>
                  <div className="order-item-total">
                    {(item.qty * item.price_snapshot).toLocaleString()} ₽
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Итого:</span>
              <span className="order-total-price">
                {orderData.items.reduce((sum, item) => sum + (item.qty * item.price_snapshot), 0).toLocaleString()} ₽
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders; 