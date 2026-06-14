import React from "react";
import { motion } from "framer-motion";

const stats = [
  { number: "6+", label: "Years of Excellence" },
  { number: "10K+", label: "Happy Families" },
  { number: "500+", label: "Unique Designs" },
];

export default function MidPageVideoBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1617627143233-1b3e0f13f68b?auto=format&fit=crop&w=2400&q=85"
          alt="Heritage background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1514]/85 via-[#1A1514]/75 to-[#1A1514]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-[10px] tracking-[0.4em] uppercase font-semibold block mb-5">
            Est. 2018 · Bengaluru
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6">
            The Shagun <em className="not-italic text-primary">Heritage</em>
          </h2>
          <div className="w-12 h-px bg-primary mx-auto mb-8" />
          <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Every garment at Shagun Boutique carries the weight of a story — of artisans who have spent
            decades perfecting their craft, of brides who walked into our studio nervous and left radiant,
            of families who return to us generation after generation. Our story is still being written,
            one heirloom at a time.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-3 mt-10 text-primary text-xs uppercase tracking-[0.25em] font-semibold border-b border-primary/40 hover:border-primary pb-1 transition-all duration-300"
          >
            Read Our Story <span className="text-sm">→</span>
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="grid grid-cols-3 divide-x divide-white/10 border border-white/10 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <div className="text-3xl md:text-4xl font-serif text-primary font-semibold mb-1">
                {stat.number}
              </div>
              <div className="text-gray-400 text-[10px] uppercase tracking-widest leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
