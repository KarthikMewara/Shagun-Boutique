import React from "react";
import { motion } from "framer-motion";
import { PlayCircle, Tv2, Star } from "lucide-react";

const pressItems = [
  { channel: "Suvarna TV", desc: "Featured as a leading boutique for bridal ethnic wear in Bengaluru" },
  { channel: "Kasturi TV", desc: "Spotlight segment on authentic handcrafted lehengas and designer sarees" },
  { channel: "Zee Kannada", desc: "Brand feature during the festive fashion special showcase" },
];

export default function PressMedia() {
  return (
    <section className="py-24 md:py-32 bg-[#0D0B08] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-4 block">
            As seen on television
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">In The Spotlight</h2>
          <p className="text-gray-400 font-light max-w-xl mx-auto">
            As featured on leading Kannada news channels — a testament to the trust Shagun Boutique has earned across Karnataka.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            {pressItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-5 border border-white/10 rounded-sm hover:border-primary/40 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Tv2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-white mb-1">{item.channel}</h4>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-sm overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-md"
                >
                  <PlayCircle className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </motion.div>
                <div className="text-center">
                  <p className="text-white font-serif text-xl mb-1">Watch Feature</p>
                  <p className="text-gray-400 text-sm font-light">News footage coming soon</p>
                </div>
              </div>

              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-xs uppercase tracking-wider">Live Coverage</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-gray-400 text-xs uppercase tracking-widest">Kannada News Special</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.01)_2px,rgba(255,255,255,0.01)_4px)] pointer-events-none" />
            </div>

            <p className="text-center text-gray-500 text-xs uppercase tracking-widest mt-4 font-light">
              Edited footage will be embedded here
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
