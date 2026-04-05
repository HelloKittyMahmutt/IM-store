import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromBasket, totalPrice } = useBasket();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white text-black z-[160] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-black uppercase tracking-widest">Your Basket</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-gray-500 font-mono uppercase tracking-widest text-sm">Your basket is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <Link 
                    to={`/product/${item.product.id}`} 
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 aspect-[3/4] relative flex-shrink-0 bg-gray-100"
                  >
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="absolute inset-0 w-full h-full object-contain grayscale"
                    />
                  </Link>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link 
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-black uppercase tracking-tight text-sm hover:text-[#888888] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button 
                          onClick={() => removeFromBasket(item.product.id, item.size)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Size: {item.size}</p>
                      <p className="text-sm font-mono mt-1">{formatPrice(item.product.price)}</p>
                    </div>

                    <div className="flex items-center border border-gray-300 rounded overflow-hidden w-max mt-2">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-mono text-xs">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold uppercase tracking-widest">Subtotal</span>
              <span className="text-xl font-mono font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-6">
              Shipping calculated at checkout
            </p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
