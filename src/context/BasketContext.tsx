import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface BasketItem {
  product: Product;
  quantity: number;
  size: string;
}

interface BasketContextType {
  items: BasketItem[];
  addToBasket: (product: Product, quantity: number, size: string) => void;
  removeFromBasket: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearBasket: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState<BasketItem[]>(() => {
    const saved = localStorage.getItem('im_basket');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('im_basket', JSON.stringify(items));
  }, [items]);

  const addToBasket = (product: Product, quantity: number, size: string) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, size }];
    });
    setIsCartOpen(true);
  };

  const removeFromBasket = (productId: string, size: string) => {
    setItems(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(productId, size);
      return;
    }
    setItems(prev => prev.map(item => 
      item.product.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearBasket = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <BasketContext.Provider value={{ items, addToBasket, removeFromBasket, updateQuantity, clearBasket, totalItems, totalPrice, isCartOpen, setIsCartOpen }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};
