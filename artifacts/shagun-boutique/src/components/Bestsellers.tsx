import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { bestsellers } from "../data/products";
import { useCart } from "../context/CartContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Bestsellers() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  const toggleWishlist = (id: number) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-gray-100 pb-6">
          <div>
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-3 block">
              Handpicked For You
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-2">Curated For You</h2>
            <p className="text-gray-500 font-light">Pieces our community keeps coming back for.</p>
          </div>
          <a
            href="#"
            className="mt-4 md:mt-0 text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1 self-start md:self-auto"
          >
            View All
          </a>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16"
        >
          {bestsellers.map((product, index) => {
            const isLarge = index === 0 || index === 4;
            return (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: index % 2 === 0 ? 30 : 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                style={{ marginTop: index % 2 !== 0 ? "2.5rem" : "0" }}
                data-cursor-hover
                className="group flex flex-col"
              >
                <div
                  className={`relative overflow-hidden rounded-sm bg-gray-100 mb-4 ${
                    isLarge ? "aspect-[3/5]" : "aspect-[3/4]"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-foreground text-white text-[10px] uppercase tracking-widest font-semibold px-3 py-1">
                      {product.badge}
                    </div>
                  )}

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        wishlist[product.id] ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </button>

                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <button
                      onClick={() => addToCart()}
                      className="w-full bg-foreground text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {product.subCategory}
                  </span>
                  <h3 className="font-serif text-lg text-foreground leading-snug mb-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-3">
                    <span className="font-medium text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
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
