import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Venkatesh",
    location: "Bengaluru",
    role: "Bride, December 2024",
    review:
      "The Gulmohar Lehenga I ordered for my wedding was absolutely breathtaking. The quality of the embroidery, the weight of the fabric — I felt like royalty. Shagun Boutique didn't just sell me a lehenga, they gave me a memory I will carry forever.",
    product: "Gulmohar Silk Lehenga",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Deepa & Rajan Shetty",
    location: "Mysuru",
    role: "Wedding Family, November 2024",
    review:
      "We dressed the entire groom's family at Shagun Boutique for our son's wedding. The Sherwanis were tailored to perfection and the coordination on delivery was flawless. The team's attention to every detail made our family look like we stepped off a magazine cover.",
    product: "Regal Gold Sherwani",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Ananya Krishnaswamy",
    location: "Hassan",
    role: "Regular Customer",
    review:
      "I've been shopping at Shagun Boutique for every festival for three years now. The consistency in quality and the warmth of the team is unmatched. My Midnight Blue Velvet Saree got compliments from everyone at Diwali. Will never shop anywhere else.",
    product: "Midnight Blue Velvet Saree",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-4 block">
            Real Stories, Real Joy
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Client Diaries</h2>
          <p className="text-gray-500 font-light max-w-xl mx-auto">
            Words from the women, men, and families who trusted us with their most precious moments.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              data-cursor-hover
              className="bg-white border border-gray-100 p-8 flex flex-col gap-6 group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 rounded-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" strokeWidth={1.5} />
              </div>

              <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base flex-1">
                "{t.review}"
              </p>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div>
                  <p className="font-serif text-foreground text-base">{t.name}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{t.role} · {t.location}</p>
                  <p className="text-xs text-primary mt-0.5 font-light italic">{t.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
