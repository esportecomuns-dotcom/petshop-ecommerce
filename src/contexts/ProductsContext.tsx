import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products as initialProducts } from "@/data/products";

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("petshop-all-products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem("petshop-all-products", JSON.stringify(products));
  }, [products]);

  const addProduct = (p: Omit<Product, "id">) => {
    const newProduct = { ...p, id: Math.random().toString(36).substr(2, 9) };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, p: Partial<Product>) => {
    setProducts(prev => prev.map(item => item.id === id ? { ...item, ...p } : item));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
};
