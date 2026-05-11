import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Heart, SlidersHorizontal, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const subProducts = [
  { id: 101, title: "Emerald Silk Salwar Kameez", price: 16500, originalPrice: 19000, image: "https://images.unsplash.com/photo-1583391733958-d25e07fac062?auto=format&fit=crop&w=600&q=80", badge: "New Arrival" },
  { id: 102, title: "Ivory Organza Suit Set", price: 22000, image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=600&q=80", badge: "Bestseller" },
  { id: 103, title: "Dusty Rose Cotton Kurta", price: 8999, originalPrice: 11000, image: "https://images.unsplash.com/photo-1617627143233-1b3e0f13f68b?auto=format&fit=crop&w=600&q=80" },
  { id: 104, title: "Royal Blue Georgette Set", price: 18500, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80", badge: "New Arrival" },
  { id: 105, title: "Burgundy Banarasi Kurta", price: 14000, originalPrice: 17000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" },
  { id: 106, title: "Marigold Chanderi Suit", price: 12500, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=80", badge: "Bestseller" },
];

const filters = [
  {
    label: "Price Range",
    options: ["Under ₹10,000", "₹10,000 – ₹20,000", "₹20,000 – ₹40,000", "Above ₹40,000"],
  },
  {
    label: "Color",
    options: ["Ivory / White", "Emerald Green", "Burgundy / Wine", "Royal Blue", "Rose / Pink", "Marigold"],
  },
  {
    label: "Fabric",
    options: ["Silk", "Cotton", "Georgette", "Chanderi", "Organza", "Crepe"],
  },
];

function AccordionFilter({ label, options }: { label: string; options: string[] }) {
  const [open, setOpen] = useState(label === "Price Range");
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left group"
      >
        <span className="text-sm font-medium text-foreground tracking-wide">{label}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3 flex flex-col gap-2">
              {options.map((opt) => (
                <label key={opt} className="flex items-center gap-3 group/opt">
                  <input
                    type="checkbox"
                    checked={selected.includes(opt)}
                    onChange={() =>
                      setSelected(prev =>
                        prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
                      )
                    }
                    className="w-4 h-4 border border-gray-300 rounded-sm accent-primary"
                  />
                  <span className="text-sm text-gray-500 group-hover/opt:text-foreground transition-colors font-light">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SubcategoryPage() {
  const { addToCart, openCart } = useCart();
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleWishlist = (id: number) => setWishlist(prev => ({ ...prev, [id]: !prev[id] }));

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  const handleAddToCart = (product: typeof subProducts[number]) => {
    addToCart({ id: product.id, title: product.title, subCategory: "Salwar Kameez", price: product.price, image: product.image });
    openCart();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb + Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/women" className="hover:text-primary transition-colors">Women</Link>
            <span>/</span>
            <span className="text-foreground">Salwar Kameez</span>
          </nav>
          <div className="flex items-end justify-between border-b border-gray-200 pb-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-foreground">Salwar Kameez</h1>
              <p className="text-gray-400 font-light mt-1 text-sm">{subProducts.length} styles available</p>
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 text-sm text-foreground border border-gray-200 px-4 py-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-10 pb-24">
          {/* Sidebar Filters — Desktop */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 pb-3 border-b border-gray-100">
                Filter By
              </h3>
              {filters.map(f => (
                <AccordionFilter key={f.label} label={f.label} options={f.options} />
              ))}
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 z-[70]"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed top-0 left-0 h-full w-72 bg-white z-[80] p-6 overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-xl">Filters</h3>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  {filters.map(f => (
                    <AccordionFilter key={f.label} label={f.label} options={f.options} />
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 content-start"
          >
            {subProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group flex flex-col"
                data-cursor-hover
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-white/90 text-foreground text-[10px] uppercase tracking-widest font-semibold px-3 py-1">
                      {product.badge}
                    </div>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wishlist[product.id] ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                  <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-foreground text-white py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-primary hover:text-[#1A1A1A] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Salwar Kameez</span>
                <h3 className="font-serif text-base text-foreground leading-snug mb-1 line-clamp-1">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
