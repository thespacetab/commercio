import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import ApiStatus from './components/ApiStatus';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <ApiStatus />
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
            <BottomNavigation />
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
