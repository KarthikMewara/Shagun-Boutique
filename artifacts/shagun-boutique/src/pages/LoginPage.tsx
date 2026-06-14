import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex">
      {/* Left panel — image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
          alt="Shagun Boutique"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1514]/70 via-[#1A1514]/40 to-transparent" />
        <div className="absolute bottom-16 left-12">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-semibold mb-4">
            Shagun Boutique
          </p>
          <h2 className="text-4xl font-serif text-white leading-tight mb-3">
            Welcome Back
          </h2>
          <p className="text-white/60 font-light text-sm max-w-xs">
            Sign in to access your wishlist, orders, and exclusive member offers.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-block mb-10">
            <img src="/shagun-logo.png" alt="Shagun Boutique" className="h-12 w-auto object-contain" />
          </Link>

          <h1 className="font-serif text-3xl text-foreground mb-1">Sign In</h1>
          <p className="text-gray-400 font-light text-sm mb-8">
            New here?{" "}
            <Link to="/register" className="text-primary hover:text-primary/80 transition-colors">
              Create an account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-200 bg-white text-sm text-foreground placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                  Password
                </label>
                <button type="button" className="text-xs text-primary hover:text-primary/70 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3.5 border border-gray-200 bg-white text-sm text-foreground placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-foreground text-white text-xs tracking-widest uppercase font-semibold py-4 hover:bg-primary hover:text-[#1A1A1A] transition-all duration-300"
            >
              Sign In
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              type="button"
              className="w-full border border-gray-200 bg-white text-foreground text-xs tracking-widest uppercase font-semibold py-4 hover:border-primary transition-colors"
            >
              Continue as Guest
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
