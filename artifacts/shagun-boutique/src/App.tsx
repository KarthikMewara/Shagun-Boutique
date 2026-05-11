import React from "react";
import { CartProvider } from "./context/CartContext";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import NewArrivals from "./components/NewArrivals";
import MidPageVideoBanner from "./components/MidPageVideoBanner";
import Bestsellers from "./components/Bestsellers";
import PressMedia from "./components/PressMedia";
import Testimonials from "./components/Testimonials";
import BrandStrip from "./components/BrandStrip";
import Footer from "./components/Footer";

function App() {
  return (
    <CartProvider>
      <CustomCursor />
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <Hero />
        <FeaturedCategories />
        <NewArrivals />
        <MidPageVideoBanner />
        <Bestsellers />
        <PressMedia />
        <Testimonials />
        <BrandStrip />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
