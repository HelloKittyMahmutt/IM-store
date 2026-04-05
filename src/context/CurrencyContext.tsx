import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'EUR' | 'USD' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'INR' | 'MXN' | 'BRL' | 'CHF' | 'SEK' | 'NZD' | 'NOK' | 'DKK' | 'PLN' | 'CZK' | 'SGD' | 'HKD' | 'KRW' | 'ZAR' | 'TRY' | 'THB' | 'PHP' | 'MYR';

export const CURRENCIES: Currency[] = [
  'EUR', 'USD', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'MXN', 'BRL', 'CHF', 
  'SEK', 'NZD', 'NOK', 'DKK', 'PLN', 'CZK', 'SGD', 'HKD', 'KRW', 'ZAR', 
  'TRY', 'THB', 'PHP', 'MYR'
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInEur: number) => string;
}

const rates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  CAD: 1.47,
  AUD: 1.65,
  JPY: 163.0,
  INR: 90.0,
  MXN: 18.0,
  BRL: 5.4,
  CHF: 0.98,
  SEK: 11.5,
  NZD: 1.78,
  NOK: 11.6,
  DKK: 7.45,
  PLN: 4.3,
  CZK: 25.3,
  SGD: 1.45,
  HKD: 8.45,
  KRW: 1450.0,
  ZAR: 20.5,
  TRY: 34.5,
  THB: 39.0,
  PHP: 60.5,
  MYR: 5.1,
};

const symbols: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
  INR: '₹',
  MXN: 'Mex$',
  BRL: 'R$',
  CHF: 'CHF ',
  SEK: 'kr ',
  NZD: 'NZ$',
  NOK: 'kr ',
  DKK: 'kr. ',
  PLN: 'zł ',
  CZK: 'Kč ',
  SGD: 'S$',
  HKD: 'HK$',
  KRW: '₩',
  ZAR: 'R ',
  TRY: '₺',
  THB: '฿',
  PHP: '₱',
  MYR: 'RM ',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('currency');
    return (saved as Currency) || 'EUR';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const formatPrice = (priceInEur: number) => {
    const converted = priceInEur * rates[currency];
    return `${symbols[currency]}${Math.round(converted)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
