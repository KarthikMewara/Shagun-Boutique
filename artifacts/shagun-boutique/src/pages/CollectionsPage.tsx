import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    slug: "women",
    label: "Shagun Boutique — Women",
    title: "The Women's",
    italic: "Edit",
    tagline: "Timeless silhouettes for every celebration.",
    cta: "Explore Women's",
    hero: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["Sarees", "Lehengas", "Salwar Kameez", "Sharara Sets", "Gowns"],
    accent: "from-black/60 via-black/30 to-transparent",
  },
  {
    slug: "men",
    label: "Shagun Boutique — Men",
    title: "The Men's",
    italic: "Edit",
    tagline: "Tailored to command every room.",
    cta: "Explore Men's",
    hero: "https://images.unsplash.com/photo-1559582798-678dfc71cee4?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["Kurta Sets", "Sherwanis", "Nehru Jackets"],
    accent: "from-black/60 via-black/30 to-transparent",
  },
  {
    slug: "kids",
    label: "Shagun Boutique — Kids",
    title: "The Little",
    italic: "Royals",
    tagline: "Where heritage meets childhood wonder.",
    cta: "Explore Kids'",
    hero: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["Boys Partywear", "Girls Lehengas"],
    accent: "from-black/60 via-black/30 to-transparent",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: i * 0.15 },
  }),
};

export default function CollectionsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* ── HERO ── */}
      <div ref={heroRef} className="relative h-[55vh] overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1583391733958-d25e07fac062?auto=format&fit=crop&w=2400&q=85')",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

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
            Shagun Boutique — All Collections
          </motion.span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] mb-5">
            Our Collections
          </h1>
          <p className="text-white/70 font-light text-base md:text-lg max-w-md mx-auto tracking-wide">
            Premium Indian ethnic wear for women, men, and children — woven with heritage, designed for today.
          </p>
          <div className="mt-8 w-px h-10 bg-white/30 mx-auto" />
        </motion.div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-gray-100">
        <nav className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Collections</span>
        </nav>
      </div>

      {/* ── CATEGORY CARDS — full editorial panels ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <p className="text-[10px] text-primary tracking-[0.3em] uppercase font-semibold mb-3">Browse By</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">Shop Our World</h2>
          <p className="text-gray-400 font-light text-sm mt-4 max-w-md mx-auto">
            Each collection is a universe of craft, colour, and occasion — explore yours.
          </p>
        </div>

        <div className="flex flex-col gap-0">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative group overflow-hidden"
            >
              {/* Full-bleed image panel */}
              <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
                <img
                  src={cat.hero}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${cat.accent}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16 lg:p-20">
                  <div className="max-w-xl">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                      className="text-primary text-[10px] tracking-[0.4em] uppercase font-semibold block mb-4"
                    >
                      {cat.label}
                    </motion.span>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.05] mb-4"
                    >
                      {cat.title} <em className="not-italic text-primary">{cat.italic}</em>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.4 }}
                      className="text-white/65 font-light text-base mb-6"
                    >
                      {cat.tagline}
                    </motion.p>

                    {/* Sub-tags */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.5 }}
                      className="flex flex-wrap gap-2 mb-8"
                    >
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="text-[10px] text-white/60 tracking-widest uppercase border border-white/20 px-3 py-1"
                        >
                          {sub}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.55 }}
                      className="flex gap-4"
                    >
                      <Link
                        to={`/collections/${cat.slug}`}
                        className="inline-flex items-center gap-2 bg-primary text-[#1A1A1A] text-xs tracking-widest uppercase font-bold px-8 py-4 hover:bg-primary/90 transition-colors duration-300"
                      >
                        {cat.cta} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Number label */}
                <div className="absolute top-10 right-10 md:right-16 lg:right-20 text-right">
                  <span className="font-serif text-[80px] leading-none text-white/10 select-none">
                    0{i + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA STRIP ── */}
      <section className="bg-[#1A1514] py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-semibold mb-5">
            Shagun Boutique
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-5">
            Need Help Choosing?
          </h2>
          <p className="text-white/50 font-light text-sm max-w-md mx-auto mb-10">
            Our style consultants are available in-store and online — let us curate a look for your occasion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-[#1A1A1A] text-xs tracking-widest uppercase font-bold px-8 py-4 hover:bg-primary/90 transition-colors duration-300"
            >
              Book a Consultation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-white/30 text-white text-xs tracking-widest uppercase font-semibold px-8 py-4 hover:border-primary hover:text-primary transition-colors duration-300"
            >
              View New Arrivals
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
