import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { categories } from '../utils/data';
import './Catalog.css';

const Catalog: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(category =>
    t(category.key).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryName: string) => {
    alert(`Категория "${categoryName}" в разработке!`);
  };

  return (
    <div className="catalog-page">
      <div className="search-row">
        <input
          type="text"
          className="search-input"
          placeholder={t('catalog-search-placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <section className="categories-page">
        <div className="categories-title">{t('categories-title')}</div>
        <div className="categories-grid">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              className="category-tile"
              onClick={() => handleCategoryClick(t(category.key))}
            >
              <img src={category.icon} alt={t(category.key)} className="category-icon" />
              <span>{t(category.key)}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Catalog; 