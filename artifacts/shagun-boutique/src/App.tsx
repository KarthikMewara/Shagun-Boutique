import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ShopProvider } from "./context/ShopContext"; // 1. Added the import

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
import CollectionsPage from "./pages/CollectionsPage";
import UserProfile from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
    /* 2. Wrapped the entire application in ShopProvider */
    <ShopProvider> 
      <CartProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <CustomCursor />
          <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />
            <CartDrawer />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/collections/:categoryId" element={<CategoryPage />} />
                <Route path="/collections/:categoryId/:subcategoryId" element={<SubcategoryPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ShopProvider>
  );
}

export default App;