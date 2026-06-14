import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  title: string;
  subCategory: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

export interface WishlistItem {
  id: number;
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
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const defaultCartItems: CartItem[] = [
  {
    id: 1,
    title: "Gulmohar Silk Lehenga",
    subCategory: "Lehenga",
    price: 45999,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80",
    quantity: 1,
    size: "M",
  },
  {
    id: 4,
    title: "Regal Gold Sherwani",
    subCategory: "Sherwani",
    price: 65000,
    image: "https://images.unsplash.com/photo-1559582798-678dfc71cee4?auto=format&fit=crop&w=200&q=80",
    quantity: 1,
    size: "L",
  },
];

const defaultWishlist: WishlistItem[] = [
  {
    id: 11,
    title: "Champagne Tissue Lehenga",
    subCategory: "Lehenga",
    price: 58000,
    originalPrice: 68000,
    image: "https://images.unsplash.com/photo-1609803384069-19f3f09571c4?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 9,
    title: "Crimson Banarasi Saree",
    subCategory: "Saree",
    price: 34500,
    originalPrice: 40000,
    image: "https://images.unsplash.com/photo-1617627143233-1b3e0f13f68b?auto=format&fit=crop&w=400&q=80",
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultCartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(defaultWishlist);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item?: Partial<CartItem>) => {
    if (!item || !item.id) {
      setCartItems(prev => {
        const existing = prev.find(i => i.id === 99);
        if (existing) return prev.map(i => i.id === 99 ? { ...i, quantity: i.quantity + 1 } : i);
        return [...prev, { id: 99, title: "New Item", subCategory: "Ethnic Wear", price: 12999, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80", quantity: 1 }];
      });
      return;
    }
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...(item as CartItem), quantity: item.quantity ?? 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) { removeFromCart(id); return; }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(i => i.id !== id));
  };

  const isInWishlist = (id: number) => wishlistItems.some(i => i.id === id);

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
