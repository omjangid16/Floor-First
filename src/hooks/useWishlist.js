import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Saved products for the signed-in shopper. Guests get an empty list and
 * writes are ignored, so the heart button stays safe to render anywhere.
 */
export const useWishlist = () => {
  const { user } = useAuth();
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setIds([]);
      return;
    }
    let active = true;
    setLoading(true);

    api
      .get("/wishlist")
      .then((data) => {
        if (!active) return;
        setIds(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!active) return;
        setIds([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  const toggle = useCallback(
    async (productId) => {
      if (!user) return false;
      try {
        const data = await api.post("/wishlist/toggle", { productId });
        if (Array.isArray(data?.ids)) {
          setIds(data.ids);
        }
        return Boolean(data?.isSaved);
      } catch {
        return false;
      }
    },
    [user]
  );

  const isSaved = useCallback((productId) => ids.includes(productId), [ids]);

  return {
    ids,
    loading,
    toggle,
    isSaved,
  };
};
