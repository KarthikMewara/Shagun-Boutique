import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useScrollY } from "../hooks/use-scroll-y";
import { useCart } from "../context/CartContext";
import { megaMenuCategories } from "../data/categories";

export default function Navbar() {
  const scrollY = useScrollY();
  const isScrolled = scrollY > 20;
  const { cartCount } = useCart();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <a href="#" className={`font-serif text-2xl md:text-3xl tracking-wide ${isScrolled ? "text-foreground" : "text-white"}`}>
              Shagun Boutique
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-8 ${isScrolled ? "text-foreground" : "text-white/90"}`}>
            <a href="#" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">Home</a>
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <a href="#" className="text-sm font-medium tracking-wide hover:text-primary transition-colors pb-2">Collections</a>
              
              {/* Mega Menu */}
              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-4xl bg-[#FAF8F5] text-foreground shadow-xl border border-gray-100 p-8 flex justify-around rounded-b-sm cursor-default"
                  >
                    {megaMenuCategories.map((category) => (
                      <div key={category.name} className="flex flex-col">
                        <h3 className="font-serif text-lg mb-4 text-primary">{category.name}</h3>
                        <ul className="space-y-3">
                          {category.items.map((item) => (
                            <li key={item}>
                              <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">{item}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a href="#" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">About</a>
            <a href="#" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Icons */}
          <div className={`flex items-center gap-4 md:gap-6 ${isScrolled ? "text-foreground" : "text-white"}`}>
            <button className="hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden md:block hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="relative hover:text-primary transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-[#FAF8F5] z-[70] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-2xl text-foreground">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-primary">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6">
                <a href="#" className="text-lg font-medium border-b border-gray-200 pb-2">Home</a>
                
                <div className="flex flex-col gap-4">
                  <span className="text-lg font-medium text-primary">Collections</span>
                  <div className="pl-4 flex flex-col gap-6">
                    {megaMenuCategories.map((category) => (
                      <div key={category.name} className="flex flex-col gap-2">
                        <span className="font-serif text-md text-foreground">{category.name}</span>
                        <ul className="space-y-2 pl-2 border-l border-gray-200">
                          {category.items.map((item) => (
                            <li key={item}>
                              <a href="#" className="text-sm text-gray-600 hover:text-primary">{item}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <a href="#" className="text-lg font-medium border-b border-gray-200 pb-2">About</a>
                <a href="#" className="text-lg font-medium border-b border-gray-200 pb-2">Contact</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
