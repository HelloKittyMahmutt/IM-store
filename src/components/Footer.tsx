import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-24 px-6 border-t border-white/10 text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[40vh]">
        
        <div className="mb-12">
          <img src="/logo.png" alt="IM Logo" className="h-32 md:h-48 w-auto brightness-0 invert" />
        </div>
        
        <div>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white mb-6">
            Life Aligns
          </h2>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-[#333333] mb-12">
            When You Do.
          </h2>
        </div>

        <div className="mb-24">
          <p className="text-sm font-mono tracking-[0.3em] text-white uppercase">
            IM — A Lifestyle, Not a Label.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-24 text-xs font-bold uppercase tracking-widest text-[#888888]">
          <a href="https://www.instagram.com/im.alignedofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Instagram</a>
          <a href="mailto:contact@yourbrand.com" className="hover:text-white transition-colors cursor-pointer">Contact</a>
          <Link to="/terms" className="hover:text-white transition-colors cursor-pointer">Terms</Link>
          <Link to="/returns" className="hover:text-white transition-colors cursor-pointer">Returns</Link>
        </div>
        
        <div className="mt-24 text-[10px] text-[#333333] uppercase tracking-widest">
          © {new Date().getFullYear()} IM BRAND. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
