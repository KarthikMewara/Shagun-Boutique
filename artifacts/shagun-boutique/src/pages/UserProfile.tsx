import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package, Heart, MapPin, User, ChevronRight,
  CheckCircle2, Truck, Clock, X, Minus, Plus,
  ShoppingBag, Edit2, Save, LogOut
} from "lucide-react";
import { useCart } from "../context/CartContext";

const tabs = [
  { id: "orders", label: "Order History", icon: Package },
  { id: "wishlist", label: "My Wishlist", icon: Heart },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "account", label: "Account Details", icon: User },
];

const fmt = (p: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);

const mockOrders = [
  {
    id: "SB-2025-0892",
    date: "May 10, 2025",
    deliveredDate: "May 14, 2025",
    status: "Delivered" as const,
    tracking: "DTDC1234567890",
    items: [
      { title: "Gulmohar Silk Lehenga", subCategory: "Lehenga", price: 45999, quantity: 1, size: "M", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80" },
    ],
    total: 45999,
    address: "14, Jayanagar 4th Block, Bengaluru",
  },
  {
    id: "SB-2025-0134",
    date: "April 2, 2025",
    deliveredDate: "April 7, 2025",
    status: "Delivered" as const,
    tracking: "DTDC9876543210",
    items: [
      { title: "Midnight Blue Velvet Saree", subCategory: "Saree", price: 28999, quantity: 1, size: "Free Size", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80" },
      { title: "Ivory Pearl Blouse", subCategory: "Blouse", price: 9500, quantity: 1, size: "S", image: "https://images.unsplash.com/photo-1619510563919-82d67f44ce49?auto=format&fit=crop&w=200&q=80" },
    ],
    total: 38499,
    address: "14, Jayanagar 4th Block, Bengaluru",
  },
  {
    id: "SB-2025-0301",
    date: "June 1, 2025",
    deliveredDate: null,
    status: "Shipped" as const,
    tracking: "DTDC4455667788",
    items: [
      { title: "Crimson Banarasi Saree", subCategory: "Saree", price: 34500, quantity: 2, size: "Free Size", image: "https://images.unsplash.com/photo-1617627143233-1b3e0f13f68b?auto=format&fit=crop&w=200&q=80" },
    ],
    total: 69000,
    address: "14, Jayanagar 4th Block, Bengaluru",
  },
];

const statusConfig = {
  Delivered: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 border-green-200", label: "Delivered" },
  Shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-50 border-blue-200", label: "In Transit" },
  Processing: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50 border-amber-200", label: "Processing" },
};

function OrderHistory() {
  const [expanded, setExpanded] = useState<string | null>("SB-2025-0301");

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-serif text-2xl text-foreground">Order History</h2>
      <p className="text-sm text-gray-400 font-light -mt-3">{mockOrders.length} orders placed</p>

      {mockOrders.map((order) => {
        const cfg = statusConfig[order.status];
        const Icon = cfg.icon;
        const isOpen = expanded === order.id;

        return (
          <div key={order.id} className="border border-neutral-200 rounded-sm overflow-hidden bg-white">
            {/* Header */}
            <button
              onClick={() => setExpanded(isOpen ? null : order.id)}
              className="w-full flex items-center justify-between px-5 py-4 bg-neutral-50 border-b border-neutral-200 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-6 text-left">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Order</p>
                  <p className="text-sm font-semibold text-foreground">#{order.id}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Placed</p>
                  <p className="text-sm text-foreground">{order.date}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Total</p>
                  <p className="text-sm font-semibold text-foreground">{fmt(order.total)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${cfg.bg} ${cfg.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {cfg.label}
                </span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
              </div>
            </button>

            {/* Expanded detail */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-4 flex flex-col gap-4">
                    {/* Items */}
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                        <div className="w-16 h-20 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">{item.subCategory}</p>
                          <p className="font-serif text-sm text-foreground leading-snug">{item.title}</p>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="text-[10px] text-gray-500 border border-gray-200 px-2 py-0.5 rounded-sm">
                              Size: {item.size}
                            </span>
                            <span className="text-[10px] text-gray-500 border border-gray-200 px-2 py-0.5 rounded-sm">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm font-semibold text-foreground">{fmt(item.price * item.quantity)}</span>
                          </div>
                        </div>
                        <button className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-primary border border-gray-200 hover:border-primary px-3 py-2 transition-colors flex-shrink-0">
                          Reorder
                        </button>
                      </div>
                    ))}

                    {/* Tracking + Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-4">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Tracking</p>
                        <p className="text-xs font-medium text-foreground mb-1">{order.tracking}</p>
                        {order.deliveredDate ? (
                          <p className="text-xs text-green-600">Delivered on {order.deliveredDate}</p>
                        ) : (
                          <p className="text-xs text-blue-600">Expected in 2–3 days</p>
                        )}
                        <button className="mt-2 text-[10px] text-primary uppercase tracking-widest hover:underline">
                          Track Package →
                        </button>
                      </div>
                      <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-4">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Delivered To</p>
                        <p className="text-xs text-foreground leading-relaxed">{order.address}</p>
                      </div>
                    </div>

                    {/* Total row */}
                    <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                      <span className="text-xs text-gray-400 uppercase tracking-widest">Order Total</span>
                      <span className="font-semibold text-sm text-foreground">{fmt(order.total)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function WishlistTab() {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center gap-4">
        <Heart className="w-12 h-12 text-gray-200" strokeWidth={1} />
        <h2 className="font-serif text-2xl text-foreground">Your Wishlist is Empty</h2>
        <p className="text-gray-400 font-light text-sm">Save pieces you love and find them here.</p>
        <Link to="/collections" className="mt-2 text-xs uppercase tracking-widest text-primary border-b border-primary/40 hover:border-primary pb-0.5 transition-colors">
          Browse Collections →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-serif text-2xl text-foreground">My Wishlist</h2>
        <span className="text-xs text-gray-400">{wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {wishlistItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex gap-4 border border-neutral-200 p-4 rounded-sm group hover:border-primary/30 transition-colors bg-white"
          >
            <Link to="/collections" className="w-24 h-28 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </Link>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">{item.subCategory}</p>
                    <p className="font-serif text-sm text-foreground leading-snug line-clamp-2">{item.title}</p>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex-shrink-0 p-1 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-sm font-semibold text-foreground">{fmt(item.price)}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">{fmt(item.originalPrice)}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart({ id: item.id, title: item.title, subCategory: item.subCategory, price: item.price, image: item.image });
                  removeFromWishlist(item.id);
                }}
                className="self-start mt-2 text-[10px] uppercase tracking-widest bg-foreground text-white px-4 py-2 hover:bg-primary hover:text-[#1A1A1A] transition-colors"
              >
                Move to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AddressesTab() {
  const [adding, setAdding] = useState(false);
  const [addresses] = useState([
    { id: 1, name: "Priya Venkatesh", line1: "14, Jayanagar 4th Block", line2: "Bengaluru, Karnataka 560041", country: "India", phone: "+91 98765 43210", isDefault: true },
  ]);

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-serif text-2xl text-foreground">Saved Addresses</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="border border-neutral-200 rounded-sm p-5 bg-white relative">
            {addr.isDefault && (
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 font-semibold">
                Default
              </span>
            )}
            <p className="font-serif text-base text-foreground mb-1">{addr.name}</p>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              {addr.line1}<br />{addr.line2}<br />{addr.country}
            </p>
            <p className="text-sm text-gray-500 mt-2 font-light">{addr.phone}</p>
            <button className="mt-4 text-xs text-gray-400 hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5">
              Edit Address
            </button>
          </div>
        ))}

        <button
          onClick={() => setAdding(true)}
          className="border-2 border-dashed border-gray-200 rounded-sm p-5 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-colors min-h-[140px]"
        >
          <MapPin className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs uppercase tracking-widest font-semibold">Add New Address</span>
        </button>
      </div>

      {adding && (
        <div className="mt-6 border border-neutral-200 rounded-sm p-6 bg-white">
          <h3 className="font-serif text-lg text-foreground mb-4">New Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Full Name", "Phone", "Address Line 1", "Address Line 2", "City", "PIN Code", "State", "Country"].map((label) => (
              <div key={label} className={`flex flex-col gap-1.5 ${label.includes("Address Line 1") ? "sm:col-span-2" : ""}`}>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">{label}</label>
                <input className="w-full px-4 py-3 border border-gray-200 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <button className="bg-foreground text-white text-xs tracking-widest uppercase font-semibold px-6 py-3 hover:bg-primary hover:text-[#1A1A1A] transition-colors">
              Save Address
            </button>
            <button onClick={() => setAdding(false)} className="border border-gray-200 text-gray-500 text-xs tracking-widest uppercase px-6 py-3 hover:border-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AccountTab() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Priya Venkatesh",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    dob: "March 15, 1992",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-serif text-2xl text-foreground">Account Details</h2>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors">
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
        ) : (
          <button onClick={handleSave} className="flex items-center gap-1.5 text-xs text-primary font-semibold">
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        )}
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-4 bg-green-50 border border-green-200 text-green-600 text-xs px-4 py-3 rounded-sm flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> Changes saved successfully.
        </motion.div>
      )}

      <div className="max-w-md flex flex-col gap-5 bg-white border border-neutral-200 rounded-sm p-6">
        {(Object.entries({ "Full Name": "name", "Email Address": "email", "Phone Number": "phone", "Date of Birth": "dob" }) as [string, keyof typeof form][]).map(([label, key]) => (
          <div key={label} className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">{label}</label>
            {editing ? (
              <input
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            ) : (
              <div className="border-b border-neutral-100 pb-2">
                <span className="text-sm text-foreground font-light">{form[key]}</span>
              </div>
            )}
          </div>
        ))}

        {editing && (
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="bg-foreground text-white text-xs tracking-widest uppercase font-semibold px-6 py-3 hover:bg-primary hover:text-[#1A1A1A] transition-colors">
              Save Changes
            </button>
            <button onClick={() => setEditing(false)} className="border border-gray-200 text-gray-500 text-xs tracking-widest uppercase px-6 py-3 hover:border-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-neutral-200">
        <h3 className="font-serif text-lg text-foreground mb-4">Danger Zone</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/" className="inline-flex items-center gap-2 border border-gray-200 text-gray-500 text-xs tracking-widest uppercase px-5 py-3 hover:border-gray-400 transition-colors">
            <LogOut className="w-4 h-4" strokeWidth={1.5} /> Sign Out
          </Link>
          <button className="inline-flex items-center gap-2 border border-red-200 text-red-400 text-xs tracking-widest uppercase px-5 py-3 hover:border-red-400 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("orders");
  const { cartItems, updateQuantity, removeFromCart, wishlistItems } = useCart();

  const renderContent = () => {
    switch (activeTab) {
      case "orders": return <OrderHistory />;
      case "wishlist": return <WishlistTab />;
      case "addresses": return <AddressesTab />;
      case "account": return <AccountTab />;
      case "cart": return <CartTab cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />;
      default: return null;
    }
  };

  const tabsWithCart = [
    { id: "orders", label: "Order History", icon: Package, badge: undefined },
    { id: "wishlist", label: "My Wishlist", icon: Heart, badge: wishlistItems.length || undefined },
    { id: "cart", label: "My Cart", icon: ShoppingBag, badge: cartItems.length || undefined },
    { id: "addresses", label: "Saved Addresses", icon: MapPin, badge: undefined },
    { id: "account", label: "Account Details", icon: User, badge: undefined },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">My Account</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Sidebar */}
          <aside className="md:w-60 flex-shrink-0">
            <div className="flex flex-col gap-1 md:sticky md:top-28">
              <div className="mb-6 hidden md:block bg-white border border-neutral-200 rounded-sm p-5">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-lg text-foreground">Priya Venkatesh</p>
                <p className="text-xs text-gray-400 font-light mt-0.5">Member since 2022</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 font-semibold">
                    Gold Member
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {tabsWithCart.map((tab) => {
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
                      <div className="flex items-center gap-2">
                        {tab.badge !== undefined && (
                          <span className={`text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                            {tab.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === tab.id ? "opacity-100" : ""}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

function CartTab({ cartItems, updateQuantity, removeFromCart }: {
  cartItems: import("../context/CartContext").CartItem[];
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
}) {
  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center gap-4">
        <ShoppingBag className="w-12 h-12 text-gray-200" strokeWidth={1} />
        <h2 className="font-serif text-2xl text-foreground">Your Cart is Empty</h2>
        <p className="text-gray-400 font-light text-sm">Add items from our collections to get started.</p>
        <Link to="/collections" className="mt-2 text-xs uppercase tracking-widest text-primary border-b border-primary/40 hover:border-primary pb-0.5 transition-colors">
          Browse Collections →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-serif text-2xl text-foreground">My Cart</h2>
        <span className="text-xs text-gray-400">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-4 border border-neutral-200 rounded-sm p-4 bg-white"
          >
            <div className="w-20 h-24 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">{item.subCategory}</p>
                  <p className="font-serif text-sm text-foreground leading-snug">{item.title}</p>
                  {item.size && (
                    <span className="inline-block mt-1 text-[10px] text-gray-500 border border-gray-200 px-2 py-0.5">
                      Size: {item.size}
                    </span>
                  )}
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center border border-gray-200 rounded-sm">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-gray-400 hover:text-foreground transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1.5 text-sm font-medium text-foreground border-x border-gray-200 min-w-[36px] text-center">
                    {item.quantity}
                  </span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-gray-400 hover:text-foreground transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-semibold text-sm text-foreground">{fmt(item.price * item.quantity)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 border border-neutral-200 rounded-sm p-5 bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 font-light">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span className="font-semibold text-foreground">{fmt(total)}</span>
        </div>
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-100">
          <span className="text-sm text-gray-500 font-light">Shipping</span>
          <span className="text-sm text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between items-center mb-5">
          <span className="text-sm font-semibold text-foreground">Total</span>
          <span className="text-lg font-bold text-foreground">{fmt(total)}</span>
        </div>
        <button className="w-full bg-foreground text-white text-xs tracking-widest uppercase font-semibold py-4 hover:bg-primary hover:text-[#1A1A1A] transition-all duration-300">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
