import React, { useState, useCallback, useContext, createContext, ReactNode, useEffect } from 'react';
import { Product, QuoteItem } from './types';

interface QuoteContextType {
  quoteItems: QuoteItem[];
  addToQuote: (product: Product, quantity: number, wantsAdvisory: boolean) => void;
  removeFromQuote: (productId: string) => void;
  updateQuoteItemQuantity: (productId: string, newQuantity: number) => void;
  clearQuote: () => void;
  quoteItemCount: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const localData = window.localStorage.getItem('quoteItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error al leer desde localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('quoteItems', JSON.stringify(quoteItems));
    } catch (error) {
      console.error("Error al guardar en localStorage", error);
    }
  }, [quoteItems]);

  const addToQuote = useCallback((product: Product, quantity: number, wantsAdvisory: boolean) => {
      setQuoteItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
          if (existingItemIndex > -1) {
              const updatedItems = [...prevItems];
              const currentItem = updatedItems[existingItemIndex];
              updatedItems[existingItemIndex] = {
                  ...currentItem,
                  quantity: currentItem.quantity + quantity,
                  wantsAdvisory: wantsAdvisory || currentItem.wantsAdvisory,
              };
              return updatedItems;
          } else {
              return [...prevItems, { ...product, quantity, wantsAdvisory }];
          }
      });
  }, []);

  const removeFromQuote = useCallback((productId: string) => {
      setQuoteItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuoteItemQuantity = useCallback((productId: string, newQuantity: number) => {
      setQuoteItems(prevItems =>
          prevItems.map(item =>
              item.id === productId ? { ...item, quantity: newQuantity } : item
          )
      );
  }, []);

  const clearQuote = useCallback(() => setQuoteItems([]), []);

  const quoteItemCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  const value = { quoteItems, addToQuote, removeFromQuote, updateQuoteItemQuantity, clearQuote, quoteItemCount };

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
};

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
      throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};