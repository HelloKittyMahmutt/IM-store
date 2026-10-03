import React, { useState } from 'react';
import { useCart } from './CartContext';
import { X, Check, Shield, Truck, RefreshCw } from 'lucide-react';

export const ProductQuickView: React.FC = () => {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const currentSize = selectedSize || product.sizes[0];
  const images = [product.image, product.secondaryImage];

  const handleAddToCart = () => {
    addToCart(product, currentSize);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      setSelectedProductForModal(null);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6 text-white font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => setSelectedProductForModal(null)}
      />

      <div className="relative w-full max-w-4xl bg-im-black border border-white/20 shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-black/50 border border-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Images */}
          <div className="relative bg-neutral-950 flex flex-col justify-between">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/75 px-3 py-1 text-[10px] font-mono uppercase tracking-widest border border-white/20">
                {product.category}
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="p-3 bg-black/80 flex space-x-2 border-t border-white/10">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-16 border overflow-hidden transition-all ${
                    activeImageIndex === idx ? 'border-white opacity-100' : 'border-white/20 opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover filter grayscale" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-im-light-gray mb-1">
                LIMITED RUN // ARCHIVE EDITION
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-2">
                {product.name}
              </h3>
              <div className="flex items-baseline space-x-4 mb-4">
                <span className="text-xl font-mono font-bold text-white">${product.price} USD</span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  {product.tagline}
                </span>
              </div>

              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-light mb-6 border-b border-white/10 pb-6">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider">
                  <span className="text-neutral-400">SELECT SIZE</span>
                  <span className="text-neutral-500">FIT: {product.fit.split('.')[0]}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border transition-all ${
                        currentSize === sz
                          ? 'border-white bg-white text-black'
                          : 'border-white/20 text-neutral-300 hover:border-white/60 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  TECHNICAL SPECIFICATIONS
                </span>
                <ul className="space-y-1 text-xs text-neutral-300 font-light">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-neutral-500">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center space-x-2"
              >
                {addedNotice ? (
                  <>
                    <Check size={16} />
                    <span>ADDED TO ARCHIVE</span>
                  </>
                ) : (
                  <span>ACQUIRE ITEM — ${product.price}</span>
                )}
              </button>

              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-neutral-400 text-center uppercase tracking-wider">
                <div className="flex items-center justify-center space-x-1">
                  <Truck size={12} />
                  <span>Free Express $250+</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Shield size={12} />
                  <span>Lifetime Guarantee</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <RefreshCw size={12} />
                  <span>14-Day Exchanges</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
