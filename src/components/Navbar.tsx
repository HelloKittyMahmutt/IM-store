import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useBasket } from '../context/BasketContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useBasket();
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
          <div className="flex items-center relative z-[20] gap-4">
            <Link to="/checkout" className="text-white hover:text-[#888888] transition-colors relative p-2">
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
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
          
          <Link to="/#collection" onClick={closeMenu} className="text-sm font-bold border border-white px-12 py-4 uppercase tracking-[0.25em] text-white hover:bg-white hover:text-black transition-all cursor-pointer">
            Shop Collection
          </Link>
        </div>
      </div>
    </>
  );
};
