import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import './BottomNavigation.css';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { getTotalItems } = useCart();

  const navItems = [
    { path: '/', icon: '/assets/icons/home.png', label: 'nav-home' },
    { path: '/catalog', icon: '/assets/icons/products.png', label: 'nav-catalog' },
    { path: '/cart', icon: '/assets/icons/grocery-store.png', label: 'nav-cart' },
    { path: '/profile', icon: '/assets/icons/user.png', label: 'nav-profile' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`bottom-nav-link ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <div className="nav-icon-container">
            <img src={item.icon} alt={t(item.label)} className="nav-icon" />
            {item.path === '/cart' && getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </div>
          <span>{t(item.label)}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation; 