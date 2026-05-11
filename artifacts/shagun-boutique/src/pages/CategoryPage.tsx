import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const subcategories = [
  {
    title: "Sarees",
    subtitle: "Timeless drapes for every occasion",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    href: "/women/sarees",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Lehengas",
    subtitle: "Bridal & festive glory",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    href: "/women/lehengas",
    span: "",
  },
  {
    title: "Salwar Kameez",
    subtitle: "Everyday elegance",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac062?auto=format&fit=crop&w=800&q=80",
    href: "/women/salwar-kameez",
    span: "",
  },
  {
    title: "Gowns",
    subtitle: "Modern silhouettes, ancient craft",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    href: "/women/gowns",
    span: "",
  },
  {
    title: "Blouses",
    subtitle: "The perfect complement",
    image: "https://images.unsplash.com/photo-1619510563919-82d67f44ce49?auto=format&fit=crop&w=800&q=80",
    href: "/women/blouses",
    span: "",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Banner */}
      <div
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1617627143233-1b3e0f13f68b?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <span className="text-primary text-xs tracking-[0.3em] uppercase font-semibold block mb-4">
            Shagun Boutique
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Women's Collection
          </h1>
          <p className="text-gray-300 font-light mt-4 text-base md:text-lg max-w-lg mx-auto">
            Curated for the modern Indian woman — from bridal grandeur to effortless daily elegance.
          </p>
        </motion.div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Women</span>
        </nav>
      </div>

      {/* Subcategory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">Shop by Category</h2>
          <p className="text-gray-500 font-light">Choose your style and explore our curated selections.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 grid-rows-auto lg:grid-rows-2 gap-4 md:gap-6"
          style={{ gridAutoRows: "280px" }}
        >
          {subcategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              className={`relative overflow-hidden group rounded-sm ${cat.span}`}
            >
              <Link to={cat.href}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col">
                  <h3 className="text-white font-serif text-2xl mb-1">{cat.title}</h3>
                  <p className="text-gray-300 text-sm font-light opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {cat.subtitle}
                  </p>
                  <span className="text-primary text-xs uppercase tracking-widest font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
