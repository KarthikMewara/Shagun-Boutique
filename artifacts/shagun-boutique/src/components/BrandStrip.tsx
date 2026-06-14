import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Truck, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Craftsmanship",
    description: "Authentic materials and hand-embroidery"
  },
  {
    icon: Users,
    title: "10,000+ Happy Customers",
    description: "Trusted by brides and families worldwide"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders above ₹2,999 within India"
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy"
  }
];

export default function BrandStrip() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center px-4 pt-8 md:pt-0 first:pt-0"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center mb-4 text-primary">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-lg text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-500 font-light">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
