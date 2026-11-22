import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Saved products for the signed-in shopper. Guests get an empty list and
 * writes are ignored, so the heart button stays safe to render anywhere.
 */
export const useWishlist = () => {
  const { user } = useAuth();
  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setIds([]);
      return;
    }

    let active = true;
    setLoading(true);

    Promise.resolve(
      supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", user.id),
    )
      .then(({ data, error }) => {
        if (!active || error) return;
        setIds((data ?? []).map((row) => row.product_id));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  const toggle = useCallback(
    async (productId: string) => {
      if (!user) return false;

      const alreadySaved = ids.includes(productId);

      if (alreadySaved) {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
        if (error) return false;
        setIds((prev) => prev.filter((id) => id !== productId));
        return false;
      }

      const { error } = await supabase
        .from("wishlist")
        .insert({ user_id: user.id, product_id: productId });
      if (error) return false;
      setIds((prev) => [...prev, productId]);
      return true;
    },
    [ids, user],
  );

  const isSaved = useCallback((productId: string) => ids.includes(productId), [ids]);

  return { ids, loading, toggle, isSaved };
};
