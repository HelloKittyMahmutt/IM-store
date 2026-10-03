import React, { useState } from 'react';
import { FadeIn } from '../components/FadeIn';
import { useCart } from '../components/CartContext';
import { PRODUCTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const Campaign: React.FC = () => {
  const { setSelectedProductForModal } = useCart();
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);

  const campaignLooks = [
    {
      id: 1,
      title: 'DROP 01 // ARCHITECTURAL MINIMALISM',
      modelText: 'ALIGNMENT HOODIE & FOUNDATION CARGO',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      quote: '“We did not design clothing to be noticed. We designed it to command presence without saying a word.”',
      productIds: [1, 4]
    },
    {
      id: 2,
      title: 'DROP 02 // WEATHER THE STORM',
      modelText: 'MONOLITH SHELL & BALISTIC DUFFLE',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      quote: '“External chaos is irrelevant when internal discipline is immutable.”',
      productIds: [3, 6]
    }
  ];

  return (
    <section id="campaign" className="py-28 md:py-40 bg-im-black border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400 block mb-3">
              EDITORIAL // CAMPAIGN 01
            </span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              SILENT <br />
              <span className="text-neutral-500">POWER.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-xs md:text-sm font-mono tracking-wider text-neutral-400 uppercase leading-relaxed border-l border-white/20 pl-4">
              Stripped of ornamentation. Built exclusively in grayscale. Engineered for those who understand that true confidence whispers.
            </p>
          </div>
        </div>

        {/* Campaign Visuals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {campaignLooks.map((look) => (
            <FadeIn key={look.id} delay={look.id * 150}>
              <div 
                className="group relative overflow-hidden bg-neutral-900 border border-white/10 flex flex-col"
                onMouseEnter={() => setHoveredSlide(look.id)}
                onMouseLeave={() => setHoveredSlide(null)}
              >
                {/* Visual */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                      {look.title}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2 py-1 border border-white/10">
                      0{look.id} // 02
                    </span>
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-6 left-6 right-6 space-y-4">
                    <p className="text-xs md:text-sm font-light italic text-neutral-200 leading-relaxed max-w-md">
                      {look.quote}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {look.productIds.map((pid) => {
                        const prod = PRODUCTS.find((p) => p.id === pid);
                        if (!prod) return null;
                        return (
                          <button
                            key={pid}
                            onClick={() => setSelectedProductForModal(prod)}
                            className="bg-white/10 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-white transition-all flex items-center space-x-1"
                          >
                            <span>Inspect {prod.name}</span>
                            <ArrowUpRight size={12} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
