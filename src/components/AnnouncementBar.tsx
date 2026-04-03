import React from 'react';

export const AnnouncementBar: React.FC = () => {
  const text = "· FREE WORLDWIDE SHIPPING ON ORDERS OVER €100 · LIMITED DROPS ONLY NO RESTOCKS! ";
  
  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-[#050505] text-[#f5f5f5] z-[110] flex items-center overflow-hidden border-b border-white/10">
      <div className="animate-marquee whitespace-nowrap flex">
        {/* Duplicate the text multiple times to ensure a seamless loop */}
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase px-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
