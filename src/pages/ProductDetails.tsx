import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';
import { useDrop } from '../context/DropContext';
import { ArrowLeft, Check, X } from 'lucide-react';
import { SwissFlag } from '../components/SwissBadge';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToBasket } = useBasket();
  const { formatPrice } = useCurrency();
  const { isUnlocked } = useDrop();
  
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showSizeError, setShowSizeError] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<'cm' | 'in'>('cm');

  const sizeChartData = {
    cm: [
      { size: 'XS', chest: '84–88', waist: '70–76', length: '68' },
      { size: 'S', chest: '88–94', waist: '76–82', length: '70' },
      { size: 'M', chest: '94–100', waist: '82–88', length: '72' },
      { size: 'L', chest: '100–106', waist: '88–94', length: '74' },
      { size: 'XL', chest: '106–112', waist: '94–100', length: '76' },
    ],
    in: [
      { size: 'XS', chest: '33–35', waist: '27.5–30', length: '26.8' },
      { size: 'S', chest: '35–37', waist: '30–32', length: '27.5' },
      { size: 'M', chest: '37–39', waist: '32–34.5', length: '28.3' },
      { size: 'L', chest: '39–42', waist: '34.5–37', length: '29.1' },
      { size: 'XL', chest: '42–44', waist: '37–39.5', length: '29.9' },
    ],
  };

  useEffect(() => {
    if (!isUnlocked) {
      navigate('/#collection', { replace: true });
    }
  }, [isUnlocked, navigate]);

  useEffect(() => {
    // Scroll handled by PageTransition
  }, [id]);

  if (!isUnlocked) return null;

  // Prevent scrolling when modal is open and handle Escape key
  useEffect(() => {
    if (isSizeGuideOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsSizeGuideOpen(false);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
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
            
            <div className="w-full h-px bg-gray-200 mb-4"></div>

            {product.quote && (
              <div className="mb-3 py-2 border-l-2 border-black pl-4">
                <p className="text-sm font-medium italic tracking-tight">
                  "{product.quote}"
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <SwissFlag size={14} />
              <span className="text-[11px] font-sans font-semibold tracking-[0.16em] uppercase text-neutral-800">
                Engineered and prototyped in Switzerland
              </span>
            </div>

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

      {/* Size Guide Modal - Single compact rectangle without internal scroll */}
      {isSizeGuideOpen && createPortal(
        <div 
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-150"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-lg p-6 sm:p-7 relative shadow-2xl border border-black/10 my-auto animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            {/* Top Right Cross Only */}
            <button 
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-5 right-5 text-black hover:opacity-60 transition-opacity p-1 cursor-pointer"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5 stroke-[2.25]" />
            </button>
            
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b-2 border-black pb-4 pr-8">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-black">Size Guide</h3>
                <p className="text-[11px] font-sans font-bold tracking-[0.16em] uppercase text-black mt-0.5">
                  Athletic Taper Silhouette
                </p>
              </div>

              {/* Unit Toggle */}
              <div className="inline-flex self-start sm:self-auto border-2 border-black p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setSizeUnit('cm')}
                  className={`px-3 py-1 font-bold transition-colors cursor-pointer ${
                    sizeUnit === 'cm' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
                  }`}
                >
                  CM
                </button>
                <button
                  type="button"
                  onClick={() => setSizeUnit('in')}
                  className={`px-3 py-1 font-bold transition-colors cursor-pointer ${
                    sizeUnit === 'in' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
                  }`}
                >
                  INCHES
                </button>
              </div>
            </div>
            
            {/* Content Container (No scrollbar - fits naturally) */}
            <div className="space-y-5">
              {/* Measurement Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b-2 border-black font-mono uppercase text-[11px] tracking-wider text-black">
                      <th className="pb-2 font-black">Size</th>
                      <th className="pb-2 font-black">Chest (Fitted)</th>
                      <th className="pb-2 font-black">Waist (Loose)</th>
                      <th className="pb-2 font-black">Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 font-sans text-xs">
                    {sizeChartData[sizeUnit].map((row) => {
                      const isSelected = selectedSize === row.size;
                      return (
                        <tr 
                          key={row.size}
                          className={`transition-colors ${isSelected ? 'bg-neutral-100' : 'hover:bg-neutral-50'}`}
                        >
                          <td className="py-2.5">
                            <span className="inline-flex items-center justify-center px-2.5 py-0.5 bg-black text-white font-mono text-xs font-bold">
                              {row.size}
                            </span>
                          </td>
                          <td className="py-2.5 text-black font-semibold">{row.chest} {sizeUnit}</td>
                          <td className="py-2.5 text-black font-semibold">{row.waist} {sizeUnit}</td>
                          <td className="py-2.5 text-black font-semibold">{row.length} {sizeUnit}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Fit & Model Notes */}
              <div className="border-t-2 border-black/10 pt-4 space-y-2 text-xs text-black">
                <p className="flex items-start gap-2.5">
                  <span className="block w-1.5 h-1.5 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="text-black font-medium leading-relaxed">
                    <strong className="text-black font-bold">Athletic Taper:</strong> Form-fitting across the shoulders and chest with a free, relaxed drape at the waist.
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="block w-1.5 h-1.5 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="text-black font-medium leading-relaxed">
                    <strong className="text-black font-bold">4-Way Stretch:</strong> Shape-memory fabric. Take true size for an athletic silhouette, or size up for a relaxed drape.
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="block w-1.5 h-1.5 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="text-black font-medium leading-relaxed">
                    <strong className="text-black font-bold">Model Specs:</strong> {sizeUnit === 'cm' ? '190 cm, 90 kg wearing size L.' : "6'3\", 198 lbs wearing size L."}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
