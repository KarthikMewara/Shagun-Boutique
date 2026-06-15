import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { cartService } from "../services/cartService";

export interface CartItem {
  id: number | string;
  title: string;
  subCategory: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

export interface WishlistItem {
  id: number | string;
  title: string;
  subCategory: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  isCartOpen: boolean;
  wishlistItems: WishlistItem[];
  addToCart: (item?: Partial<CartItem>) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number | string) => void;
  isInWishlist: (id: number | string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Start empty, fetch from DB
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // 1. Fetch user's cart from backend on load (if logged in)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await cartService.getUserCart();
          if (response.success) {
            // Note: You may need to map your backend's cart data structure 
            // to match the frontend CartItem interface here based on your DB schema
            setCartItems(response.cartData || []); 
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 2. Sync Add to Cart with Backend
  const addToCart = async (item?: Partial<CartItem>) => {
    if (!item || !item.id) return;
    
    // Optimistic UI Update (Updates instantly for the user)
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...(item as CartItem), quantity: item.quantity ?? 1 }];
    });

    // API Call to database
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await cartService.addToCart(item.id.toString(), item.size || "M");
      }
    } catch (error) {
      console.error("Failed to add to backend cart:", error);
    }
  };

  // 3. Sync Remove from Cart with Backend
  const removeFromCart = async (id: number | string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // In your backend, updating quantity to 0 removes it
        await cartService.updateCart(id.toString(), "M", 0); 
      }
    } catch (error) {
      console.error("Failed to remove from backend cart:", error);
    }
  };

  // 4. Sync Update Quantity with Backend
  const updateQuantity = async (id: number | string, quantity: number) => {
    if (quantity < 1) { 
      removeFromCart(id); 
      return; 
    }
    
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const item = cartItems.find(i => i.id === id);
        await cartService.updateCart(id.toString(), item?.size || "M", quantity);
      }
    } catch (error) {
      console.error("Failed to update backend cart quantity:", error);
    }
  };

  // Wishlist functions remain local state for now unless you have a wishlist backend route
  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number | string) => {
    setWishlistItems(prev => prev.filter(i => i.id !== id));
  };

  const isInWishlist = (id: number | string) => wishlistItems.some(i => i.id === id);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ cartCount, cartItems, isCartOpen, wishlistItems, addToCart, removeFromCart, updateQuantity, openCart, closeCart, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within a CartProvider");
  return context;
}