import React from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import NewArrivals from "./components/NewArrivals";
import BrandStrip from "./components/BrandStrip";
import Footer from "./components/Footer";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <Hero />
        <FeaturedCategories />
        <NewArrivals />
        <BrandStrip />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
