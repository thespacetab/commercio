import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Profile.css';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Вы вышли из аккаунта!');
  };

  const handleOrdersClick = () => {
    navigate('/orders');
  };

  const menuItems = [
    { key: 'orders', label: 'Мои заказы', onClick: handleOrdersClick },
    { key: 'privacy', label: t('privacy'), onClick: () => alert('Политика конфиденциальности') },
    { key: 'terms', label: t('terms'), onClick: () => alert('Условия пользования') },
    { key: 'about', label: t('about'), onClick: () => alert('О нас') },
    { key: 'contacts', label: t('contacts'), onClick: () => alert('Контакты') }
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="/assets/icons/user.png" alt="Профиль" />
        </div>
        <div className="profile-info">
          <div className="profile-name">Пользователь</div>
          <div className="profile-email">user@example.com</div>
        </div>
      </div>

      <div className="profile-menu">
        {menuItems.map((item) => (
          <button key={item.key} className="profile-menu-item" onClick={item.onClick}>
            <span>{item.label}</span>
            <span className="menu-arrow">›</span>
          </button>
        ))}
      </div>

      <div className="profile-actions">
        <button className="profile-logout" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Profile; 