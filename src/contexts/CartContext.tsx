import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Product, CartItem, products } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const hydrated = useRef(false);

  // Restore the shopper's saved basket once they are known.
  useEffect(() => {
    hydrated.current = false;

    if (!user) {
      setItems([]);
      return;
    }

    let active = true;

    supabase
      .from("cart_items")
      .select("product_id, area, installation")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (!active || error) return;

        const restored = (data ?? [])
          .map((row) => {
            const product = products.find((p) => p.id === row.product_id);
            if (!product) return null;
            return {
              product,
              quantity: 1,
              area: Number(row.area),
              includeInstallation: row.installation,
            } as CartItem;
          })
          .filter((item): item is CartItem => item !== null);

        setItems(restored);
        hydrated.current = true;
      });

    return () => {
      active = false;
    };
  }, [user]);

  // Keep the saved basket in step with what the shopper just did.
  useEffect(() => {
    if (!user || !hydrated.current) return;

    const rows = items.map((item) => ({
      user_id: user.id,
      product_id: item.product.id,
      area: item.area,
      installation: item.includeInstallation,
    }));

    void (async () => {
      await supabase.from("cart_items").delete().eq("user_id", user.id);
      if (rows.length > 0) {
        await supabase.from("cart_items").insert(rows);
      }
    })();
  }, [items, user]);

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
      prev.map((i) => (i.product.id === productId ? { ...i, includeInstallation: !i.includeInstallation } : i))
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
