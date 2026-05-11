import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function MidPageVideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.coverr.co/videos/coverr-a-woman-in-a-colorful-sari-walking-3249/1080p.mp4"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-xl"
        >
          <span className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-4 block">
            Est. 2018 · Bengaluru
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
            The Shagun <br />
            <span className="italic text-white/80">Heritage</span>
          </h2>
          <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed mb-8">
            Every garment at Shagun Boutique carries the weight of a story — of artisans who have spent decades perfecting their craft, of brides who walked into our studio nervous and left radiant, of families who return to us generation after generation. Our story is still being written, one heirloom at a time.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-3 text-primary text-sm uppercase tracking-widest font-semibold border-b border-primary/40 hover:border-primary pb-1 transition-all duration-300"
          >
            Read Our Story
            <span className="text-base">→</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="hidden md:flex flex-col items-end gap-6 ml-auto"
        >
          {[
            { number: "6+", label: "Years of Excellence" },
            { number: "10K+", label: "Happy Families" },
            { number: "500+", label: "Unique Designs" },
          ].map((stat) => (
            <div key={stat.label} className="text-right">
              <div className="text-4xl font-serif text-primary font-semibold">{stat.number}</div>
              <div className="text-gray-400 text-sm uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
