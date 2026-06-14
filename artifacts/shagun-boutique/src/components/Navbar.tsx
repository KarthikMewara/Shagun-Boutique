import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollY } from "../hooks/use-scroll-y";
import { useCart } from "../context/CartContext";
import { megaMenuCategories } from "../data/categories";

export default function Navbar() {
  const scrollY = useScrollY();
  const isScrolled = scrollY > 20;
  const { cartCount, openCart } = useCart();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-1.5"
            : "bg-transparent py-1.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 -ml-2 transition-colors ${
              isScrolled ? "text-foreground hover:text-primary" : "text-white hover:text-primary"
            }`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo — swaps src based on scroll */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link to="/" className="inline-block">
              <img
                src={isScrolled ? "/shagun-logo.png" : "/shagun-transparent.png"}
                alt="Shagun Boutique"
                className="h-14 w-auto object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav
            className={`hidden md:flex items-center gap-8 transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            <Link
              to="/"
              className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
            >
              Home
            </Link>

            <div
              className="relative flex items-center py-4"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Link
                to="/collections"
                className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
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
              className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/"
              className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div
            className={`flex items-center gap-4 md:gap-6 transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            <button className="hover:text-primary transition-colors">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link
              to="/profile"
              className="hidden md:block hover:text-primary transition-colors"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <button onClick={openCart} className="relative hover:text-primary transition-colors">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-[#1A1A1A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
                <img
                  src="/shagun-logo.png"
                  alt="Shagun Boutique"
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground border-b border-gray-200 pb-2 hover:text-primary transition-colors"
                >
                  Home
                </Link>

                <div className="flex flex-col gap-4">
                  <span className="text-lg font-medium text-primary">Collections</span>
                  <div className="pl-4 flex flex-col gap-6">
                    {megaMenuCategories.map((category) => (
                      <div key={category.name} className="flex flex-col gap-2">
                        <Link
                          to={`/collections/${category.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="font-serif text-md text-foreground hover:text-primary transition-colors"
                        >
                          {category.name}
                        </Link>
                        <ul className="space-y-2 pl-2 border-l border-gray-200">
                          {category.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                to={`/collections/${category.slug}/${item.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm text-gray-600 hover:text-primary transition-colors"
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
                  className="text-lg font-medium text-foreground border-b border-gray-200 pb-2 hover:text-primary transition-colors"
                >
                  My Account
                </Link>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground border-b border-gray-200 pb-2 hover:text-primary transition-colors"
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
