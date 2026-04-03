import { AnnouncementBar } from './components/AnnouncementBar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
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
import { PageTransition } from './components/PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence 
      mode="wait" 
      onExitComplete={() => {
        if (!window.location.hash) {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' } as any);
        }
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/payment-success" element={<PageTransition><PaymentSuccess /></PageTransition>} />
        <Route path="/returns" element={<PageTransition><Returns /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BasketProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-white selection:text-black">
          <Navbar />
          <NewsletterPopup />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </BasketProvider>
  );
}

export default App;
