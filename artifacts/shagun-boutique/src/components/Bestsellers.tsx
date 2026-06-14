import React from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { bestsellers } from "../data/products";
import { useCart } from "../context/CartContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Bestsellers() {
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 pb-6 border-b border-gray-100">
          <span className="text-primary text-[10px] tracking-[0.3em] uppercase font-semibold mb-3 block">
            Handpicked For You
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-2">Curated For You</h2>
          <p className="text-gray-500 font-light">Pieces our community keeps coming back for.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
        >
          {bestsellers.map((product, index) => {
            const isLarge = index === 0 || index === 4;
            return (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: index % 2 === 0 ? 30 : 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                }}
                style={{ marginTop: index % 2 !== 0 ? "2.5rem" : "0" }}
                className="group flex flex-col"
              >
                <div className={`relative overflow-hidden rounded-sm bg-gray-100 mb-3 ${isLarge ? "aspect-[3/5]" : "aspect-[3/4]"}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-foreground text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={() => isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist({ id: product.id, title: product.title, subCategory: product.subCategory, price: product.price, originalPrice: product.originalPrice, image: product.image })
                    }
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-500 hover:text-red-500 transition-all duration-200 shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </button>

                  {/* Add to Cart */}
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => addToCart({ id: product.id, title: product.title, subCategory: product.subCategory, price: product.price, image: product.image })}
                      className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-2.5 text-[10px] uppercase tracking-widest font-semibold hover:bg-primary hover:text-[#1A1A1A] transition-colors duration-300 shadow-lg"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{product.subCategory}</span>
                  <h3 className="font-serif text-sm md:text-base text-foreground leading-snug mb-2 line-clamp-2">{product.title}</h3>
                  <div className="mt-auto flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
