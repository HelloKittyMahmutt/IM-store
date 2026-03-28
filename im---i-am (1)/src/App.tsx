import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { Returns } from './pages/Returns';
import { Terms } from './pages/Terms';
import { BasketProvider } from './context/BasketContext';
import { NewsletterPopup } from './components/NewsletterPopup';

function App() {
  return (
    <BasketProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-white selection:text-black">
          <Navbar />
          <NewsletterPopup />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BasketProvider>
  );
}

export default App;
