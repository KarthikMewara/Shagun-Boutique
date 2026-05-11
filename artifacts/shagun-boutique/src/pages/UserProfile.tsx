import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Heart, MapPin, User, ChevronRight, CheckCircle2 } from "lucide-react";

const tabs = [
  { id: "orders", label: "Order History", icon: Package },
  { id: "wishlist", label: "My Wishlist", icon: Heart },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "account", label: "Account Details", icon: User },
];

const dummyOrders = [
  {
    id: "SB-2024-0892",
    date: "May 10, 2025",
    status: "Delivered",
    items: [
      {
        title: "Gulmohar Silk Lehenga",
        subCategory: "Lehenga",
        price: 45999,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80",
      },
    ],
    total: 45999,
  },
  {
    id: "SB-2025-0134",
    date: "April 2, 2025",
    status: "Delivered",
    items: [
      {
        title: "Midnight Blue Velvet Saree",
        subCategory: "Saree",
        price: 28999,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80",
      },
    ],
    total: 28999,
  },
];

const wishlistItems = [
  {
    id: 4,
    title: "Regal Gold Sherwani",
    subCategory: "Sherwani",
    price: 65000,
    image: "https://images.unsplash.com/photo-1559582798-678dfc71cee4?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 11,
    title: "Champagne Tissue Lehenga",
    subCategory: "Lehenga",
    price: 58000,
    image: "https://images.unsplash.com/photo-1609803384069-19f3f09571c4?auto=format&fit=crop&w=200&q=80",
  },
];

function OrderHistory() {
  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-serif text-2xl text-foreground mb-2">Order History</h2>
      {dummyOrders.map((order) => (
        <div key={order.id} className="border border-neutral-200 rounded-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 bg-neutral-50 border-b border-neutral-200">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Order #{order.id}</p>
              <p className="text-sm font-medium text-foreground">{order.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">{order.status}</span>
            </div>
          </div>
          {order.items.map((item) => (
            <div key={item.title} className="flex items-center gap-4 px-5 py-4">
              <div className="w-16 h-20 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{item.subCategory}</p>
                <p className="font-serif text-base text-foreground">{item.title}</p>
                <p className="text-sm font-medium text-foreground mt-1">{formatPrice(item.price)}</p>
              </div>
              <button className="text-xs uppercase tracking-widest text-gray-400 hover:text-primary border border-gray-200 hover:border-primary px-3 py-2 transition-colors">
                Reorder
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center px-5 py-3 border-t border-neutral-200 bg-neutral-50">
            <span className="text-xs text-gray-400 uppercase tracking-widest">Order Total</span>
            <span className="font-medium text-sm text-foreground">{formatPrice(order.total)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function WishlistTab() {
  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);

  return (
    <div>
      <h2 className="font-serif text-2xl text-foreground mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {wishlistItems.map((item) => (
          <div key={item.id} className="flex gap-4 border border-neutral-200 p-4 rounded-sm group hover:border-primary/30 transition-colors">
            <div className="w-20 h-24 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{item.subCategory}</p>
                <p className="font-serif text-base text-foreground leading-snug">{item.title}</p>
                <p className="text-sm font-medium text-foreground mt-1">{formatPrice(item.price)}</p>
              </div>
              <button className="self-start mt-2 text-xs uppercase tracking-widest bg-foreground text-white px-4 py-2 hover:bg-primary hover:text-[#1A1A1A] transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesTab() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-foreground mb-6">Saved Addresses</h2>
      <div className="border border-neutral-200 rounded-sm p-6 max-w-sm">
        <div className="flex items-start justify-between mb-3">
          <span className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 font-semibold">Default</span>
          <button className="text-xs text-gray-400 hover:text-primary transition-colors">Edit</button>
        </div>
        <p className="font-serif text-base text-foreground mb-1">Priya Venkatesh</p>
        <p className="text-sm text-gray-500 font-light leading-relaxed">
          14, Jayanagar 4th Block<br />
          Bengaluru, Karnataka 560041<br />
          India
        </p>
        <p className="text-sm text-gray-500 mt-2 font-light">+91 98765 43210</p>
      </div>
      <button className="mt-4 text-xs uppercase tracking-widest text-gray-400 border border-dashed border-gray-300 px-5 py-3 hover:border-primary hover:text-primary transition-colors">
        + Add New Address
      </button>
    </div>
  );
}

function AccountTab() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-foreground mb-6">Account Details</h2>
      <div className="max-w-md flex flex-col gap-5">
        {[
          { label: "Full Name", value: "Priya Venkatesh" },
          { label: "Email Address", value: "priya@example.com" },
          { label: "Phone Number", value: "+91 98765 43210" },
          { label: "Date of Birth", value: "March 15, 1992" },
        ].map((field) => (
          <div key={field.label} className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">{field.label}</label>
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <span className="text-sm text-foreground font-light">{field.value}</span>
              <button className="text-xs text-gray-400 hover:text-primary transition-colors">Edit</button>
            </div>
          </div>
        ))}
        <button className="self-start mt-2 bg-foreground text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-primary hover:text-[#1A1A1A] transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("orders");

  const renderContent = () => {
    switch (activeTab) {
      case "orders": return <OrderHistory />;
      case "wishlist": return <WishlistTab />;
      case "addresses": return <AddressesTab />;
      case "account": return <AccountTab />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">My Account</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Sidebar */}
          <aside className="md:w-56 flex-shrink-0">
            <div className="flex flex-col gap-1 md:sticky md:top-28">
              <div className="mb-6 hidden md:block">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-lg text-foreground">Priya Venkatesh</p>
                <p className="text-xs text-gray-400 font-light mt-0.5">Member since 2022</p>
              </div>

              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-sm text-sm font-medium text-left transition-all duration-200 group ${
                      activeTab === tab.id
                        ? "bg-foreground text-white"
                        : "text-gray-600 hover:bg-white hover:text-foreground border border-transparent hover:border-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                      {tab.label}
                    </div>
                    <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === tab.id ? "opacity-100" : ""}`} />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
