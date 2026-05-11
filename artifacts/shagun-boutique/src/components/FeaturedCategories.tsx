import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    title: "Bridal Lehengas",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac062?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 2,
    title: "Men's Sherwanis",
    image: "https://images.unsplash.com/photo-1614660309652-3ebf50125e19?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "Festival Sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 4,
    title: "Kids Partywear",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80",
    link: "#"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function FeaturedCategories() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Shop by Category</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-light">Explore our handpicked selections tailored for every celebration.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id} 
              variants={itemVariants}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer"
            >
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center">
                <h3 className="text-white font-serif text-2xl mb-3">{category.title}</h3>
                <span className="text-primary text-sm uppercase tracking-widest font-medium border-b border-primary/0 group-hover:border-primary pb-1 transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
