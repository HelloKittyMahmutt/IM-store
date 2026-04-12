import React, { createContext, useContext, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface DropContextType {
  isUnlocked: boolean;
  unlock: (email: string, password: string) => Promise<boolean>;
  lock: () => void;
}

const DropContext = createContext<DropContextType | undefined>(undefined);

export const DropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('im_unlocked') === 'true';
  });

  const unlock = async (email: string, password: string) => {
    if (password === 'IM_3VRYTH1NG//IW2B::NOL1M1TS') {
      try {
        // Check if email exists in Firebase Vault
        const normalizedEmail = email.toLowerCase().trim();
        const docRef = doc(db, 'waitlist', normalizedEmail);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setIsUnlocked(true);
          localStorage.setItem('im_unlocked', 'true');
          return true;
        }
        return false;
      } catch (error) {
        console.error("Unlock error:", error);
        return false;
      }
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
