import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Heart } from 'lucide-react';

interface ImpactCalculatorProps {
  className?: string;
}

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({ className = '' }) => {
  const { formatPrice } = useCurrency();
  const [purchaseAmount, setPurchaseAmount] = useState<number>(50);

  // 10% direct allocation
  const donationAmount = purchaseAmount * 0.10;
  const therapyHours = Math.max(1, Math.round(donationAmount / 10));

  const presets = [
    { label: 'Tank', amount: 40 },
    { label: 'Tee', amount: 50 },
    { label: 'Long Sleeve', amount: 60 },
    { label: 'All 3', amount: 150 },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto bg-[#070707] border border-white/10 px-6 py-5 md:px-8 md:py-6 shadow-2xl ${className}`}>
      {/* Top Header: Ultra-clean & minimal */}
      <div className="flex flex-col gap-2.5 pb-4 border-b border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 flex-shrink-0" />
            <span className="text-[11px] md:text-xs font-mono font-bold tracking-[0.25em] uppercase text-white">
              10% Direct Donation To Disabled Children
            </span>
          </div>

          {/* Live dynamic impact tag */}
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            Funds <span className="text-white font-bold">{therapyHours} {therapyHours === 1 ? 'Hour' : 'Hours'}</span> of Care
          </div>
        </div>

        <div className="border-l-2 border-white pl-3 py-0.5 mt-1">
          <p className="text-xs md:text-sm text-white font-sans tracking-wide leading-relaxed">
            “Some children would give everything they have for the ability you woke up with this morning: <strong className="font-bold underline decoration-white/50 underline-offset-4">to walk, to run, to train.</strong>”
          </p>
        </div>
      </div>

      {/* Main Interactive Row: Ultra-sleek single-tier layout */}
      <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Quick Select Pieces & Minimal Slider */}
        <div className="md:col-span-7 flex flex-col gap-3.5">
          {/* Minimalist Piece Selectors */}
          <div className="flex flex-wrap items-center gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset.amount}
                type="button"
                onClick={() => setPurchaseAmount(preset.amount)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                  purchaseAmount === preset.amount
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {preset.label} <span className="opacity-70">{formatPrice(preset.amount)}</span>
              </button>
            ))}
          </div>

          {/* Hairline Slider */}
          <div className="w-full pt-1">
            <input
              type="range"
              min="40"
              max="250"
              step="5"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(Number(e.target.value))}
              className="w-full h-1 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-white hover:bg-neutral-700 transition-all"
              aria-label="Order amount slider"
            />
            <div className="flex justify-between items-center text-[9px] font-mono text-neutral-600 uppercase tracking-widest mt-1.5">
              <span>{formatPrice(40)}</span>
              <span className="text-neutral-500 tracking-[0.2em]">Slide to adjust</span>
              <span>{formatPrice(250)}</span>
            </div>
          </div>
        </div>

        {/* Right: Big, Crisp, Elegant Readout */}
        <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-5 md:border-l md:border-white/5 md:pl-6">
          <div className="text-left md:text-right">
            <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              Order Total
            </div>
            <div className="text-2xl md:text-3xl font-black font-mono text-white tracking-tight">
              {formatPrice(purchaseAmount)}
            </div>
          </div>

          <div className="text-neutral-700 font-mono text-xl">→</div>

          <div className="text-right">
            <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">
              Direct Aid (10%)
            </div>
            <div className="text-2xl md:text-3xl font-black font-mono text-emerald-400 tracking-tight">
              +{formatPrice(donationAmount)}
            </div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-bold mt-1">
              Every purchase counts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
