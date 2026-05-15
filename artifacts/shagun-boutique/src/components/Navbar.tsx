import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { megaMenuCategories } from "../data/categories";

export default function Navbar() {
  const { cartCount, openCart } = useCart();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#F8C456] shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -ml-2 text-[#1A1A1A] hover:text-[#1A1A1A]/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link to="/" className="inline-block">
              <img
                src="/shagun-logo.png"
                alt="Shagun Boutique"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[#1A1A1A]">
            <Link
              to="/"
              className="text-sm font-semibold tracking-wide hover:text-white transition-colors"
            >
              Home
            </Link>

            <div
              className="relative py-2"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Link
                to="/collections/women"
                className="text-sm font-semibold tracking-wide hover:text-white transition-colors pb-2"
              >
                Collections
              </Link>

              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-3xl bg-[#FAF8F5] text-foreground shadow-xl border border-gray-100 p-8 flex justify-around rounded-b-sm"
                  >
                    {megaMenuCategories.map((category) => (
                      <div key={category.name} className="flex flex-col">
                        <Link
                          to={`/collections/${category.slug}`}
                          className="font-serif text-lg mb-4 text-primary hover:text-primary/70 transition-colors"
                          onClick={() => setIsMegaMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                        <ul className="space-y-3">
                          {category.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                to={`/collections/${category.slug}/${item.slug}`}
                                onClick={() => setIsMegaMenuOpen(false)}
                                className="text-sm text-gray-600 hover:text-primary transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/"
              className="text-sm font-semibold tracking-wide hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/"
              className="text-sm font-semibold tracking-wide hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6 text-[#1A1A1A]">
            <button className="hover:text-white transition-colors">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link
              to="/profile"
              className="hidden md:block hover:text-white transition-colors"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <button
              onClick={openCart}
              className="relative hover:text-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#1A1A1A] text-[#F8C456] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-[#F8C456] z-[70] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <img src="/shagun-logo.png" alt="Shagun Boutique" className="h-9 w-auto" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#1A1A1A] hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-2 hover:text-white transition-colors"
                >
                  Home
                </Link>

                <div className="flex flex-col gap-4">
                  <span className="text-lg font-semibold text-[#1A1A1A]">Collections</span>
                  <div className="pl-4 flex flex-col gap-6">
                    {megaMenuCategories.map((category) => (
                      <div key={category.name} className="flex flex-col gap-2">
                        <Link
                          to={`/collections/${category.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="font-serif text-md text-[#1A1A1A] font-semibold hover:text-white transition-colors"
                        >
                          {category.name}
                        </Link>
                        <ul className="space-y-2 pl-2 border-l border-[#1A1A1A]/30">
                          {category.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                to={`/collections/${category.slug}/${item.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm text-[#1A1A1A]/80 hover:text-white transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-2 hover:text-white transition-colors"
                >
                  My Account
                </Link>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-2 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
