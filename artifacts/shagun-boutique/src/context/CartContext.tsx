import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  title: string;
  subCategory: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (item?: Partial<CartItem>) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
}

const defaultItems: CartItem[] = [
  {
    id: 1,
    title: "Gulmohar Silk Lehenga",
    subCategory: "Lehenga",
    price: 45999,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80",
    quantity: 1,
  },
  {
    id: 4,
    title: "Regal Gold Sherwani",
    subCategory: "Sherwani",
    price: 65000,
    image: "https://images.unsplash.com/photo-1559582798-678dfc71cee4?auto=format&fit=crop&w=200&q=80",
    quantity: 1,
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultItems);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item?: Partial<CartItem>) => {
    if (!item || !item.id) {
      setCartItems(prev => {
        const existing = prev.find(i => i.id === 99);
        if (existing) {
          return prev.map(i => i.id === 99 ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...prev, {
          id: 99,
          title: "New Item",
          subCategory: "Ethnic Wear",
          price: 12999,
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80",
          quantity: 1,
        }];
      });
      return;
    }
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...(item as CartItem), quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ cartCount, cartItems, isCartOpen, addToCart, removeFromCart, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
