import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { products, bestsellers } from "../data/products";
import { useCart } from "../context/CartContext";

const subcategories = [
  {
    title: "Sarees",
    subtitle: "Timeless drapes",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    href: "/women/sarees",
  },
  {
    title: "Lehengas",
    subtitle: "Bridal grandeur",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    href: "/women/lehengas",
  },
  {
    title: "Salwar Kameez",
    subtitle: "Everyday elegance",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac062?auto=format&fit=crop&w=600&q=80",
    href: "/women/salwar-kameez",
  },
  {
    title: "Sharara Sets",
    subtitle: "Festive layers",
    image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=600&q=80",
    href: "/women/sharara-sets",
  },
  {
    title: "Gowns",
    subtitle: "Modern silhouettes",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=80",
    href: "/women/gowns",
  },
  {
    title: "Designer Blouses",
    subtitle: "Artful accents",
    image: "https://images.unsplash.com/photo-1619510563919-82d67f44ce49?auto=format&fit=crop&w=600&q=80",
    href: "/women/blouses",
  },
];

const lookbookItems = [
  {
    image: "https://images.unsplash.com/photo-1617627143233-1b3e0f13f68b?auto=format&fit=crop&w=700&q=80",
    title: "The Festive Edit",
    tall: true,
  },
  {
    image: "https://images.unsplash.com/photo-1609803384069-19f3f09571c4?auto=format&fit=crop&w=700&q=80",
    title: "Golden Hour",
    tall: false,
  },
  {
    image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=700&q=80",
    title: "Blush & Bloom",
    tall: false,
  },
];

const womenProducts = [
  ...products.filter((p) => p.category === "Women"),
  ...bestsellers.filter((p) => p.category === "Women"),
].slice(0, 4);

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.1 },
  }),
};

function ProductCard({ product }: { product: (typeof womenProducts)[0] }) {
  const { addToCart } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative"
      data-cursor-hover
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 rounded-sm">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-[#1A1A1A] text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase rounded-sm">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <button
            onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 })}
            className="flex items-center gap-2 bg-white text-[#1A1A1A] text-xs font-semibold tracking-wider uppercase px-4 py-2.5 hover:bg-primary transition-colors duration-300"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
          <button className="bg-white p-2.5 hover:bg-primary transition-colors duration-300">
            <Heart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{product.subCategory}</p>
        <h3 className="text-sm font-medium text-foreground leading-snug">{product.title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CategoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* ── 1. CATEGORY HERO ── */}
      <div ref={heroRef} className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 scale-110"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80')",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-primary text-[10px] tracking-[0.35em] uppercase font-semibold block mb-5"
          >
            Shagun Boutique — Women
          </motion.span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] mb-5">
            The Women's Edit
          </h1>
          <p className="text-white/70 font-light text-base md:text-lg max-w-md mx-auto tracking-wide">
            Discover our curation of timeless silhouettes.
          </p>
          <div className="mt-8 w-px h-10 bg-white/30 mx-auto" />
        </motion.div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-gray-100">
        <nav className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Women</span>
        </nav>
      </div>

      {/* ── 2. SUBCATEGORY CAROUSEL ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-primary tracking-[0.3em] uppercase font-semibold mb-2">Browse</p>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">Shop by Style</h2>
            </div>
            <Link
              to="/women"
              className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors tracking-widest uppercase"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div
          className="flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maxWidth: "100vw",
          }}
        >
          {subcategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex-none w-[200px] md:w-[240px]"
            >
              <Link to={cat.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-5">
                    <h3 className="text-white font-serif text-xl leading-tight">{cat.title}</h3>
                    <p className="text-white/60 text-xs mt-1 font-light">{cat.subtitle}</p>
                    <span className="inline-block mt-3 text-primary text-[10px] tracking-[0.25em] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. TRENDING NOW ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] text-primary tracking-[0.3em] uppercase font-semibold mb-2">What's Hot</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">Trending in Women's</h2>
            <p className="text-gray-400 font-light text-sm max-w-sm mx-auto">
              Our most-loved styles, curated by our fashion editors this season.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {womenProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/women/all"
              className="inline-flex items-center gap-2 border border-foreground text-foreground text-xs tracking-widest uppercase font-semibold px-8 py-3.5 hover:bg-foreground hover:text-white transition-all duration-300"
            >
              View Full Collection <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. BRIDAL SPOTLIGHT ── */}
      <section className="w-full bg-[#1A1514]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">
          {/* Left — Image */}
          <div className="relative overflow-hidden h-[380px] lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85"
              alt="Bridal Collection"
              className="w-full h-full object-cover object-top scale-[1.02] hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1514]/40 to-transparent lg:bg-gradient-to-r" />
          </div>

          {/* Right — Copy */}
          <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <span className="text-primary text-[10px] tracking-[0.4em] uppercase font-semibold block mb-6">
                Bridal Spotlight
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
                The Bridal<br />
                <em className="text-primary not-italic">Trousseau</em>
              </h2>
              <div className="w-12 h-px bg-primary mb-8" />
              <p className="text-white/60 font-light text-sm md:text-base leading-relaxed max-w-sm mb-10">
                Handcrafted for your most beautiful day. Each piece is a labour of love — woven, embroidered, and finished by master artisans across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/women/lehengas"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-[#1A1A1A] text-xs tracking-widest uppercase font-bold px-8 py-4 hover:bg-primary/90 transition-colors duration-300"
                >
                  Explore Bridal <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/women"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-xs tracking-widest uppercase font-semibold px-8 py-4 hover:border-primary hover:text-primary transition-colors duration-300"
                >
                  Book a Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. EDITORIAL LOOKBOOK ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] text-primary tracking-[0.3em] uppercase font-semibold mb-2">Editorial</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">Style Notes</h2>
            <p className="text-gray-400 font-light text-sm">
              A visual diary of beauty, craft, and modern Indian femininity.
            </p>
          </div>

          {/* Staggered Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

            {/* Column 1 — tall */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group overflow-hidden rounded-sm"
            >
              <div className="aspect-[3/4] md:aspect-auto md:h-[580px] overflow-hidden">
                <img
                  src={lookbookItems[0].image}
                  alt={lookbookItems[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <p className="text-white/60 text-[10px] tracking-widest uppercase mb-1">Look 01</p>
                <h3 className="text-white font-serif text-2xl mb-3">{lookbookItems[0].title}</h3>
                <button className="text-primary text-[10px] tracking-[0.2em] uppercase font-semibold border-b border-primary/40 pb-0.5 hover:border-primary transition-colors">
                  Shop the Look →
                </button>
              </div>
            </motion.div>

            {/* Column 2 — two stacked cards */}
            <div className="flex flex-col gap-5 md:pt-14">
              {lookbookItems.slice(1).map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: (i + 1) * 0.15 }}
                  className="relative group overflow-hidden rounded-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-5">
                    <p className="text-white/60 text-[10px] tracking-widest uppercase mb-1">Look 0{i + 2}</p>
                    <h3 className="text-white font-serif text-xl mb-2">{item.title}</h3>
                    <button className="text-primary text-[10px] tracking-[0.2em] uppercase font-semibold border-b border-primary/40 pb-0.5 hover:border-primary transition-colors">
                      Shop the Look →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Column 3 — editorial text block + image */}
            <div className="flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="bg-[#1A1514] text-white p-10 flex flex-col justify-center"
              >
                <span className="text-primary text-[10px] tracking-[0.3em] uppercase font-semibold block mb-4">
                  This Season
                </span>
                <h3 className="font-serif text-3xl leading-tight mb-4">
                  Heritage<br />Reimagined
                </h3>
                <p className="text-white/50 text-sm font-light leading-relaxed mb-6">
                  Ancient weaves meet contemporary silhouettes. This season, we celebrate the tension between tradition and modernity.
                </p>
                <Link
                  to="/women"
                  className="inline-flex items-center gap-2 text-primary text-[10px] tracking-[0.25em] uppercase font-semibold hover:gap-3 transition-all duration-300"
                >
                  Read the Edit <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
                className="relative group overflow-hidden rounded-sm"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1583391733958-d25e07fac062?auto=format&fit=crop&w=700&q=80"
                    alt="Look 04"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-5">
                  <p className="text-white/60 text-[10px] tracking-widest uppercase mb-1">Look 04</p>
                  <h3 className="text-white font-serif text-xl mb-2">The Classic Revival</h3>
                  <button className="text-primary text-[10px] tracking-[0.2em] uppercase font-semibold border-b border-primary/40 pb-0.5 hover:border-primary transition-colors">
                    Shop the Look →
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
