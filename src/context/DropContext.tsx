import React, { createContext, useContext, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface DropContextType {
  isUnlocked: boolean;
  unlock: (email: string, password: string) => Promise<boolean>;
  lock: () => void;
  openStore: () => void;
  toggleDrop: () => void;
}

const DropContext = createContext<DropContextType | undefined>(undefined);

export const DropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    const saved = localStorage.getItem('im_unlocked');
    return saved === 'true';
  });

  const unlock = async (email: string, password: string) => {
    const cleanKey = password.trim();
    if (cleanKey === 'IM_3VRYTH1NG//IW2B::NOL1M1TS') {
      setIsUnlocked(true);
      localStorage.setItem('im_unlocked', 'true');
      return true;
    }
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const docRef = doc(db, 'waitlist', normalizedEmail);
      const docSnap = await getDoc(docRef);
      
      // If user is verified on waitlist and entered the key
      if (docSnap.exists() && cleanKey === 'IM_3VRYTH1NG//IW2B::NOL1M1TS') {
        setIsUnlocked(true);
        localStorage.setItem('im_unlocked', 'true');
        return true;
      }
      return false;
    } catch (error) {
      console.error("Unlock error:", error);
      return false;
    }
  };

  const lock = () => {
    setIsUnlocked(false);
    localStorage.setItem('im_unlocked', 'false');
  };

  const openStore = () => {
    setIsUnlocked(true);
    localStorage.setItem('im_unlocked', 'true');
  };

  const toggleDrop = () => {
    setIsUnlocked((prev) => {
      const next = !prev;
      localStorage.setItem('im_unlocked', String(next));
      return next;
    });
  };

  return (
    <DropContext.Provider value={{ isUnlocked, unlock, lock, openStore, toggleDrop }}>
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
