import { useCallback } from "react";

export default function useWishlist() {
  const loadWishes = useCallback(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  }, []);

  const addWish = useCallback((wish) => {
    const existing = loadWishes();
    const exists = existing.some((item) => item.id === wish.id);
    if (!exists) {
      const updated = [...existing, wish];
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
  }, [loadWishes]);

  const removeWish = useCallback((id) => {
    const existing = loadWishes();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }, [loadWishes]);

  const exists = useCallback((wish) => {
    return loadWishes().some((item) => item.id === wish.id);
  }, [loadWishes]);

  return { addWish, removeWish, loadWishes, exists };
}
