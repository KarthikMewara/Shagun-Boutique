import React from "react";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <span className="font-serif text-3xl mb-6 text-[#FAF8F5]">Shagun Boutique</span>
            <p className="text-gray-400 font-light leading-relaxed mb-8 max-w-sm">
              Elevating Indian ethnic wear with timeless designs, premium fabrics, and master craftsmanship. Your destination for heirloom pieces.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                <FaPinterestP className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg mb-6 text-primary">Collections</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Women's Wear</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Men's Ethnic</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Kids Partywear</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Bridal Edit</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Accessories</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg mb-6 text-primary">Information</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Size Guide</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-lg mb-6 text-primary">Newsletter</h4>
            <p className="text-gray-400 font-light mb-6 text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-primary text-primary-foreground font-semibold uppercase tracking-widest text-xs py-4 hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2025 Shagun Boutique. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
