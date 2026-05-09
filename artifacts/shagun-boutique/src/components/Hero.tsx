import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax feel */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80')",
            backgroundPosition: "50% 30%",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 }
            }
          }}
          className="max-w-3xl flex flex-col items-center"
        >
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-primary tracking-[0.2em] text-xs md:text-sm uppercase font-semibold mb-6"
          >
            New Collection 2025
          </motion.span>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight"
          >
            Elegance <br/> <span className="italic text-white/90">Redefined</span>
          </motion.h1>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-gray-200 text-base md:text-lg max-w-xl mb-10 font-light"
          >
            Discover our curated collection of premium Indian ethnic wear. Crafted with heritage, designed for the modern heirloom.
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 uppercase text-xs tracking-widest font-semibold transition-all duration-300 transform hover:-translate-y-1">
              Shop the Collection
            </button>
            <a href="#" className="text-white hover:text-primary transition-colors text-sm uppercase tracking-widest border-b border-white/30 hover:border-primary pb-1">
              Explore Lookbook
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
