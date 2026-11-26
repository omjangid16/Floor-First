import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { products } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const hydrated = useRef(false);

  // Restore the shopper's saved basket once user is logged in
  useEffect(() => {
    hydrated.current = false;
    if (!user) {
      setItems([]);
      return;
    }

    let active = true;
    api
      .get("/cart")
      .then((data) => {
        if (!active) return;
        const restored = (data ?? [])
          .map((row) => {
            const product = products.find((p) => p.id === row.product_id);
            if (!product) return null;
            return {
              product,
              quantity: 1,
              area: Number(row.area) || 0,
              includeInstallation: Boolean(row.installation),
            };
          })
          .filter((item) => item !== null);

        setItems(restored);
        hydrated.current = true;
      })
      .catch(() => {
        if (active) hydrated.current = true;
      });

    return () => {
      active = false;
    };
  }, [user]);

  // Keep the saved basket in MongoDB in step with what the shopper changes
  useEffect(() => {
    if (!user || !hydrated.current) return;

    const payload = items.map((item) => ({
      product_id: item.product.id,
      area: item.area,
      installation: item.includeInstallation,
    }));

    api.put("/cart", { items: payload }).catch(() => {});
  }, [items, user]);

  const addToCart = useCallback((product, area, includeInstallation) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? {
                ...i,
                area: i.area + area,
              }
            : i
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          area,
          includeInstallation,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, area) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId
          ? {
              ...i,
              area,
            }
          : i
      )
    );
  }, []);

  const toggleInstallation = useCallback((productId) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId
          ? {
              ...i,
              includeInstallation: !i.includeInstallation,
            }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    if (user) {
      api.delete("/cart").catch(() => {});
    }
  }, [user]);

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => {
    const installCost = item.includeInstallation ? item.area * 25 : 0;
    return sum + item.product.pricePerSqft * item.area + installCost;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleInstallation,
        clearCart,
        totalItems,
        totalPrice,
      }}
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
