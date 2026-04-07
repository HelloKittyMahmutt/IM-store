import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';
import { useDrop } from '../context/DropContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { PaymentOptions } from '../components/PaymentOptions';

export const Checkout: React.FC = () => {
  const { items, updateQuantity, removeFromBasket, totalPrice } = useBasket();
  const { formatPrice } = useCurrency();
  const { isUnlocked } = useDrop();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUnlocked) {
      navigate('/#collection', { replace: true });
    }
  }, [isUnlocked, navigate]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('canceled') === 'true') {
      if (window.opener) {
        window.opener.postMessage({ type: 'STRIPE_CANCEL' }, '*');
        setTimeout(() => {
          window.close();
        }, 1000);
      } else {
        setPaymentCancelled(true);
        window.history.replaceState({}, '', '/checkout');
      }
    }
  }, []);

  const handlePaymentSuccess = () => {
    navigate('/payment-success');
  };

  const handlePaymentCancel = () => {
    setPaymentCancelled(true);
  };

  if (!isUnlocked) return null;

  return (
    <div className="min-h-screen bg-white text-black pt-40 pb-32">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="mb-12">
          <Link to="/#collection" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#888888] transition-colors w-max">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
          Your Basket
        </h1>

        {paymentCancelled && (
          <div className="mb-12 p-4 bg-gray-50 border border-gray-200 text-sm font-mono text-gray-600 text-center">
            Payment was cancelled. Your basket is safe and you can try again.
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-24 border-y border-gray-200">
            <p className="text-xl font-mono uppercase tracking-widest text-gray-500 mb-8">
              Your basket is empty.
            </p>
            <Link to="/#collection" className="inline-block border border-black px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Shop Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            <div className="lg:col-span-2 space-y-8">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex flex-col sm:flex-row gap-6 border-b border-gray-200 pb-8">
                  <Link to={`/product/${item.product.id}`} className="w-full sm:w-32 aspect-[3/4] relative flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="absolute inset-0 w-full h-full object-contain grayscale"
                    />
                  </Link>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="text-xl font-black uppercase tracking-tight hover:text-[#888888] transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="font-mono text-lg">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                    
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Size: {item.size}
                    </p>

                    <p className="text-sm text-gray-500 mb-6 max-w-sm">
                      {item.product.shortDescription}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-mono text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromBasket(item.product.id, item.size)}
                        className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl h-fit sticky top-32">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Order Summary</h2>
              
              <div className="space-y-4 text-sm font-mono uppercase tracking-widest text-gray-600 mb-8 border-b border-gray-200 pb-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-black">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-black">Calculated at next step</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                <span className="text-3xl font-mono font-bold">{formatPrice(totalPrice)}</span>
              </div>
              
              {!isCheckingOut ? (
                <button 
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-black text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <PaymentOptions amount={totalPrice} items={items} onSuccess={handlePaymentSuccess} onCancel={handlePaymentCancel} />
              )}
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};
