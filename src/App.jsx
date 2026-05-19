
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Navbar         from './components/FloatingNav';
import CartDrawer     from './components/CartDrawer';

// Pages
import HomePage  from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShopPage  from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />

      <Routes>
        <Route path="/"      element={<HomePage  />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop"  element={<ShopPage  />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </CartProvider>
  );
}
