import React from 'react';

export const SwissFlag: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 16 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-label="Swiss Flag"
    >
      {/* Swiss Red Square Background */}
      <rect width="32" height="32" rx="3" fill="#D52B1E" />
      {/* Swiss White Cross (standard 1:1 proportional arms) */}
      <rect x="13" y="6" width="6" height="20" rx="0.5" fill="#FFFFFF" />
      <rect x="6" y="13" width="20" height="6" rx="0.5" fill="#FFFFFF" />
    </svg>
  );
};

interface SwissBadgeProps {
  variant?: 'minimal' | 'tag' | 'hallmark';
  darkTheme?: boolean;
  className?: string;
}

export const SwissBadge: React.FC<SwissBadgeProps> = ({ 
  variant = 'tag', 
  darkTheme = false, 
  className = '' 
}) => {
  if (variant === 'minimal') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase ${darkTheme ? 'text-[#aaaaaa]' : 'text-neutral-500'} ${className}`}>
        <SwissFlag size={14} />
        <span>Designed in Switzerland</span>
      </span>
    );
  }

  if (variant === 'hallmark') {
    return (
      <div className={`p-4 border ${darkTheme ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-neutral-50 border-neutral-200 text-black'} ${className}`}>
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <SwissFlag size={18} />
            <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase">
              Swiss Design Standard
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-[#888888] uppercase">
            CH // SPEC
          </span>
        </div>
        <p className={`text-xs ${darkTheme ? 'text-[#888888]' : 'text-neutral-600'} leading-relaxed font-sans`}>
          Swiss designed, engineered, and prototyped in Switzerland.
        </p>
      </div>
    );
  }

  // Default 'tag'
  return (
    <div className={`inline-flex items-center gap-2 px-2.5 py-1 border transition-colors ${
      darkTheme 
        ? 'bg-white/5 border-white/15 text-white/90 hover:border-white/30' 
        : 'bg-black/5 border-black/10 text-black/90 hover:border-black/25'
    } ${className}`}>
      <SwissFlag size={14} />
      <span className="font-mono text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
        Designed in Switzerland
      </span>
    </div>
  );
};
