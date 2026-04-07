import React, { createContext, useContext, useState } from 'react';

interface DropContextType {
  isUnlocked: boolean;
  unlock: (password: string) => boolean;
  lock: () => void;
}

const DropContext = createContext<DropContextType | undefined>(undefined);

export const DropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('im_unlocked') === 'true';
  });

  const unlock = (password: string) => {
    if (password === 'IM_3VRYTH1NG//IW2B::NOL1M1TS') {
      setIsUnlocked(true);
      localStorage.setItem('im_unlocked', 'true');
      return true;
    }
    return false;
  };

  const lock = () => {
    setIsUnlocked(false);
    localStorage.removeItem('im_unlocked');
  };

  return (
    <DropContext.Provider value={{ isUnlocked, unlock, lock }}>
      {children}
    </DropContext.Provider>
  );
};

export const useDrop = () => {
  const context = useContext(DropContext);
  if (context === undefined) {
    throw new Error('useDrop must be used within a DropProvider');
  }
  return context;
};
