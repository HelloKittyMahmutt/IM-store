import React from 'react';
import { MANIFESTO_STATEMENTS } from '../constants';

export const Marquee: React.FC = () => {
  const repeated = [...MANIFESTO_STATEMENTS, ...MANIFESTO_STATEMENTS];

  return (
    <div className="border-y border-white/10 bg-black overflow-hidden py-4 select-none relative z-20">
      <div className="flex w-max animate-marquee space-x-8 items-center">
        {repeated.map((text, idx) => (
          <div key={idx} className="flex items-center space-x-8">
            <span className="text-xs md:text-sm font-mono tracking-[0.25em] uppercase text-white font-semibold">
              {text}
            </span>
            <span className="text-neutral-600 text-xs font-mono">✦</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
