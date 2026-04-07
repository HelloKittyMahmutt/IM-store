import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useBasket } from '../context/BasketContext';

export const PaymentSuccess: React.FC = () => {
  const { clearBasket } = useBasket();
  const clearedRef = useRef(false);

  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: 'STRIPE_SUCCESS' }, '*');
      setTimeout(() => window.close(), 1000);
    } else {
      if (!clearedRef.current) {
        clearBasket();
        clearedRef.current = true;
      }
    }
  }, [clearBasket]);

  if (window.opener) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <p className="font-mono uppercase tracking-widest text-sm">Payment successful. Returning to store...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-40 pb-32 flex flex-col items-center justify-center">
      <div className="max-w-md w-full px-6 text-center">
        <CheckCircle2 className="w-16 h-16 mx-auto mb-8" />
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
          Order Confirmed
        </h1>
        <p className="text-gray-600 leading-relaxed mb-12">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="border border-gray-200 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:border-black transition-colors"
          >
            Back to Home
          </Link>
          <Link 
            to="/#collection" 
            className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
