import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistContextType {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("petshop-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("petshop-wishlist", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <WishlistContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
