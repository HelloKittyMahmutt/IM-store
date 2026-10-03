import React, { useState } from 'react';
import { useCart } from './CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const freeShippingThreshold = 250;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'IAMFIRST' || clean === 'ALIGN' || clean === 'DISCIPLINE') {
      const discount = Math.round(subtotal * 0.15);
      setAppliedDiscount(discount);
      setPromoSuccess(`15% Inner Circle Privilege Applied (-$${discount})`);
    } else {
      setPromoError('Code unverified or expired.');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1200);
  };

  const handleResetOrder = () => {
    setOrderComplete(false);
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-white font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-im-black border-l border-white/10 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-mono tracking-widest uppercase text-im-light-gray">
                BAG //
              </span>
              <span className="text-sm font-bold uppercase tracking-wider">
                {cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-im-light-gray hover:text-white transition-colors p-1"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {orderComplete ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 size={48} className="mx-auto text-white" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Order Confirmed</h3>
                <p className="text-xs font-mono tracking-widest text-im-light-gray uppercase">
                  Order #IM-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p className="text-sm text-im-light-gray max-w-xs mx-auto leading-relaxed pt-2">
                  Thank you for aligning with IM. Your dispatch confirmation and 25% charitable allocation receipt have been queued.
                </p>
                <button
                  onClick={handleResetOrder}
                  className="mt-6 w-full py-4 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  Return to Archive
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-20 space-y-6">
                <p className="text-xs font-mono uppercase tracking-widest text-im-light-gray">
                  Your archive is currently empty.
                </p>
                <p className="text-sm font-light text-neutral-400 max-w-xs mx-auto">
                  Only acquire what aligns with your purpose.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 border border-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                {/* Shipping Progress */}
                <div className="bg-white/5 border border-white/10 p-4 space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-neutral-300">
                    <span>
                      {remainingForFreeShipping === 0 
                        ? 'Complimentary Express Unlocked' 
                        : `$${remainingForFreeShipping} away from Express Worldwide`}
                    </span>
                    <span>{Math.round(progressToFreeShipping)}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-500 ease-out"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.size}`}
                      className="flex space-x-4 p-3 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="w-20 h-24 bg-neutral-900 flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover filter grayscale contrast-125"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-black uppercase tracking-tight text-white line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.size)}
                              className="text-im-light-gray hover:text-white transition-colors"
                              aria-label="Remove"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="mt-1 flex items-center space-x-3 text-[11px] font-mono text-im-light-gray uppercase">
                            <span>Size: {item.size}</span>
                            <span>•</span>
                            <span>${item.product.price}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center border border-white/20">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="px-2 py-1 text-xs hover:bg-white/10 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-3 text-xs font-mono">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="px-2 py-1 text-xs hover:bg-white/10 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="text-xs font-mono font-bold text-white">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="PRIVILEGE CODE (TRY: ALIGN)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-xs font-mono uppercase tracking-widest text-white placeholder:text-neutral-500 focus:outline-none focus:border-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 border border-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoSuccess && <p className="text-[11px] font-mono text-neutral-300 mt-1">{promoSuccess}</p>}
                  {promoError && <p className="text-[11px] font-mono text-neutral-400 mt-1">{promoError}</p>}
                </form>
              </>
            )}

          </div>

          {/* Footer */}
          {!orderComplete && cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/60 backdrop-blur-md space-y-4">
              <div className="space-y-2 text-xs font-mono uppercase">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-white font-bold">
                    <span>Inner Circle Privilege</span>
                    <span>-${appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Standard Shipping</span>
                  <span>{remainingForFreeShipping === 0 ? 'COMPLIMENTARY' : '$15'}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>25% Youth Impact Allocation</span>
                  <span>${Math.round(finalTotal * 0.25)} included</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Total</span>
                  <span>${remainingForFreeShipping === 0 ? finalTotal : finalTotal + 15}</span>
                </div>
              </div>

              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isCheckingOut ? 'DISPATCHING ARCHIVE...' : 'PROCEED TO CHECKOUT'}</span>
                <ArrowRight size={14} />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-im-light-gray uppercase tracking-widest">
                <ShieldCheck size={12} />
                <span>Encrypted 256-bit checkout • Global Express</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
