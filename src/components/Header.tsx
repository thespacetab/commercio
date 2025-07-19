import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Header.css';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLangChange = (lang: 'ru' | 'en' | 'uz') => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <img src="/assets/images/logotip.png" alt="Логотип" className="logo" />
        <div className="shop-title">{t('shop-title')}</div>
      </div>
      <div className="topbar-right">
        <div className="lang-switcher" ref={langDropdownRef}>
          <button 
            className="lang-btn" 
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          >
            {language.toUpperCase()} ▼
          </button>
          {isLangDropdownOpen && (
            <div className="lang-dropdown">
              <div 
                className="lang-option" 
                onClick={() => handleLangChange('ru')}
              >
                RU
              </div>
              <div 
                className="lang-option" 
                onClick={() => handleLangChange('en')}
              >
                EN
              </div>
              <div 
                className="lang-option" 
                onClick={() => handleLangChange('uz')}
              >
                UZ
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 