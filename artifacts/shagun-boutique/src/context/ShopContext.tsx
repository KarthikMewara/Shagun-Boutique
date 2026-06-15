import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { productService } from "../services/productService";

export interface Product {
  _id: string; // MongoDB uses _id
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  bestseller: boolean;
  date: number;
}

interface ShopContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  currency: string;
  delivery_fee: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Set your store defaults here
  const currency = '₹';
  const delivery_fee = 100;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAllProducts();
        
        if (response.success) {
          setProducts(response.products || []);
        } else {
          setError(response.message || "Failed to fetch products");
        }
      } catch (err: any) {
        console.error("Error loading products:", err);
        setError("Could not connect to the database.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    error,
    currency,
    delivery_fee
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}