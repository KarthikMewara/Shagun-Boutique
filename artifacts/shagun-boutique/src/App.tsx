import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import NewArrivals from "./components/NewArrivals";
import MidPageVideoBanner from "./components/MidPageVideoBanner";
import Bestsellers from "./components/Bestsellers";
import PressMedia from "./components/PressMedia";
import Testimonials from "./components/Testimonials";
import BrandStrip from "./components/BrandStrip";

import CategoryPage from "./pages/CategoryPage";
import SubcategoryPage from "./pages/SubcategoryPage";
import UserProfile from "./pages/UserProfile";

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <NewArrivals />
      <MidPageVideoBanner />
      <Bestsellers />
      <PressMedia />
      <Testimonials />
      <BrandStrip />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
        <CustomCursor />
        <div className="min-h-screen bg-background text-foreground font-sans">
          <Navbar />
          <CartDrawer />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/women" element={<CategoryPage />} />
              <Route path="/women/salwar-kameez" element={<SubcategoryPage />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
