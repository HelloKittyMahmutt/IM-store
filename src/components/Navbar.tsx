import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useBasket } from '../context/BasketContext';
import { useCurrency, CURRENCIES, Currency } from '../context/CurrencyContext';

const CurrencyDropdown = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('.currency-dropdown')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`relative currency-dropdown ${isMobile ? 'flex justify-center' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-white hover:text-[#888888] transition-colors font-bold uppercase tracking-widest ${isMobile ? 'text-sm' : 'text-xs'}`}
      >
        {currency}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden ${isMobile ? 'bottom-full mb-4 left-1/2 -translate-x-1/2' : 'top-full mt-6 right-0'} w-24 rounded-sm`}>
          <div className="max-h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CURRENCIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCurrency(c);
                  setIsOpen(false);
                }}
                className={`w-full text-center px-4 py-3 text-xs font-bold tracking-widest hover:bg-white/10 transition-colors ${currency === c ? 'text-white bg-white/5' : 'text-[#888888]'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useBasket();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header className={`fixed top-8 left-0 w-full h-24 z-[100] transition-colors duration-300 border-b ${isScrolled || !isHome ? 'bg-[#050505]/98 backdrop-blur-md shadow-2xl border-white/10' : 'border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
          
          {/* Mobile Toggle & Desktop Nav */}
          <div className="flex items-center gap-8 relative z-[20]">
            <button onClick={toggleMenu} className="lg:hidden p-2 -ml-2 text-white hover:text-[#888888] transition-colors focus:outline-none cursor-pointer" aria-label="Toggle Menu">
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>

            <nav className="hidden lg:flex space-x-12">
              <Link to="/#mindset" className="nav-link text-xs font-bold tracking-[0.2em] transition-colors uppercase py-3 cursor-pointer text-white hover:text-[#888888]">MINDSET</Link>
              <Link to="/#story" className="nav-link text-xs font-bold tracking-[0.2em] transition-colors uppercase py-3 cursor-pointer text-white hover:text-[#888888]">STORY</Link>
              <Link to="/#collection" className="nav-link text-xs font-bold tracking-[0.2em] transition-colors uppercase py-3 cursor-pointer text-white hover:text-[#888888]">COLLECTION</Link>
              <Link to="/#impact" className="nav-link text-xs font-bold tracking-[0.2em] transition-colors uppercase py-3 cursor-pointer text-white hover:text-[#888888]">IMPACT</Link>
            </nav>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[10]">
            <Link to="/" onClick={closeMenu} className="block group transition-opacity hover:opacity-80" aria-label="Home">
              <img src="/logo.png" alt="IM Logo" className="h-16 md:h-24 w-auto brightness-0 invert" />
            </Link>
          </div>

          {/* Shop Button / Basket */}
          <div className="flex items-center relative z-[20] gap-3 md:gap-4">
            <div className="block">
              <CurrencyDropdown />
            </div>
            
            {/* Dev Lock Button - Only visible in development */}
            {process.env.NODE_ENV === 'development' && (
              <button 
                onClick={() => {
                  localStorage.removeItem('im_unlocked');
                  window.location.reload();
                }}
                className="hidden lg:block text-[10px] font-mono border border-red-500/50 text-red-500 px-3 py-1 uppercase tracking-widest hover:bg-red-500/10 transition-colors"
                title="Lock Vault (Dev Only)"
              >
                Lock
              </button>
            )}

            <button 
              onClick={() => setIsCartOpen(true)} 
              className="text-white hover:text-[#888888] transition-colors relative p-2 cursor-pointer"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/#collection" className="hidden lg:block text-xs font-bold border border-white px-8 py-3 uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all cursor-pointer">
              Shop
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505] z-[90] transform transition-transform duration-300 flex flex-col items-center justify-center pt-24 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col space-y-10 text-center">
          <Link to="/#mindset" onClick={closeMenu} className="text-3xl font-black tracking-widest text-white hover:text-[#888888] uppercase transition-colors cursor-pointer">MINDSET</Link>
          <Link to="/#story" onClick={closeMenu} className="text-3xl font-black tracking-widest text-white hover:text-[#888888] uppercase transition-colors cursor-pointer">STORY</Link>
          <Link to="/#collection" onClick={closeMenu} className="text-3xl font-black tracking-widest text-white hover:text-[#888888] uppercase transition-colors cursor-pointer">COLLECTION</Link>
          <Link to="/#impact" onClick={closeMenu} className="text-3xl font-black tracking-widest text-white hover:text-[#888888] uppercase transition-colors cursor-pointer">IMPACT</Link>
          
          <div className="w-16 h-px bg-white/20 mx-auto my-4"></div>
          
          <div className="mb-4">
            <CurrencyDropdown isMobile={true} />
          </div>

          <Link to="/#collection" onClick={closeMenu} className="text-sm font-bold border border-white px-12 py-4 uppercase tracking-[0.25em] text-white hover:bg-white hover:text-black transition-all cursor-pointer">
            Shop Collection
          </Link>
        </div>
      </div>
    </>
  );
};
