import { useCurrency } from '../context/CurrencyContext';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useBasket } from '../context/BasketContext';
import { ArrowLeft, Check, X } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToBasket } = useBasket();
  const { formatPrice } = useCurrency();
  
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showSizeError, setShowSizeError] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    // Scroll handled by PageTransition
  }, [id]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isSizeGuideOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSizeGuideOpen]);

  if (!product) {
    return (
      <div className="min-h-screen pt-40 px-6 flex flex-col items-center justify-center bg-white text-black">
        <h1 className="text-4xl font-black uppercase mb-4">Product Not Found</h1>
        <Link to="/#collection" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1">
          Return to Collection
        </Link>
      </div>
    );
  }

  const handleAddToBasket = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    addToBasket(product, 1, selectedSize);
    setAdded(true);
    setShowSizeError(false);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    addToBasket(product, 1, selectedSize);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white text-black pt-36 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-2">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#888888] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-36">
            <div className="relative w-full h-[50vh] lg:h-[65vh]">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-contain grayscale"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square relative border transition-colors ${activeImage === index ? 'border-black' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="absolute inset-0 w-full h-full object-contain grayscale"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-1">
              {product.name}
            </h1>
            <p className="text-lg font-mono mb-3">{formatPrice(product.price)}</p>
            
            <div className="w-full h-px bg-gray-200 mb-3"></div>
            
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {product.description}
            </p>

            {product.quote && (
              <div className="mb-3 py-2 border-l-2 border-black pl-4">
                <p className="text-sm font-medium italic tracking-tight">
                  "{product.quote}"
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 mb-4">
              {product.details && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Details</h4>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {product.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="block w-1 h-1 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.fit && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Fit</h4>
                  <p className="text-xs text-gray-600">{product.fit}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Select Size</span>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black underline underline-offset-4 transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                {showSizeError && (
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Please select a size</span>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowSizeError(false);
                    }}
                    className={`py-2 text-[10px] font-mono uppercase transition-colors border ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto flex gap-2 mb-4">
              <button 
                onClick={handleAddToBasket}
                disabled={added}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  added 
                    ? 'bg-green-600 text-white border border-green-600' 
                    : 'bg-black text-white hover:bg-gray-900 border border-black'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-3 h-3" /> Added
                  </>
                ) : (
                  'Add to Basket'
                )}
              </button>
              
              <button 
                onClick={handleCheckout}
                className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-center border border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                Checkout
              </button>
            </div>
            
            <div className="space-y-2 text-[10px] font-mono uppercase tracking-widest text-gray-500">
              <p className="flex justify-between border-b border-gray-200 pb-1.5">
                <span>Shipping</span>
                <span>{product.delivery || 'Worldwide'}</span>
              </p>
              <p className="flex justify-between border-b border-gray-200 pb-1.5">
                <span>Returns</span>
                <span>14 Days</span>
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-md p-8 relative shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Size Guide</h3>
            
            <div className="space-y-8 text-sm">
              <div>
                <h4 className="font-bold uppercase tracking-widest mb-4">Measurements</h4>
                <div className="border-y border-gray-200 py-4 font-mono text-sm space-y-3">
                  <div className="flex justify-between">
                    <span className="font-bold">XS</span>
                    <span className="text-gray-600">Chest: 84–88 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">S</span>
                    <span className="text-gray-600">Chest: 88–94 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">M</span>
                    <span className="text-gray-600">Chest: 94–100 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">L</span>
                    <span className="text-gray-600">Chest: 100–106 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">XL</span>
                    <span className="text-gray-600">Chest: 106–112 cm</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-gray-600">
                <p className="flex items-start gap-3">
                  <span className="block w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Fits true to size.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="block w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Size up for a looser fit.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="block w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Model is 180 cm wearing size M.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
