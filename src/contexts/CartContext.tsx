import React, { createContext, useContext, useState, useCallback } from "react";
import { Product, CartItem } from "@/data/products";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, area: number, includeInstallation: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, area: number) => void;
  toggleInstallation: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, area: number, includeInstallation: boolean) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, area: i.area + area } : i
        );
      }
      return [...prev, { product, quantity: 1, area, includeInstallation }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, area: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, area } : i))
    );
  }, []);

  const toggleInstallation = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, includeInstallation: !i.includeInstallation } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => {
    const installCost = item.includeInstallation ? item.area * 25 : 0;
    return sum + item.product.pricePerSqft * item.area + installCost;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, toggleInstallation, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
