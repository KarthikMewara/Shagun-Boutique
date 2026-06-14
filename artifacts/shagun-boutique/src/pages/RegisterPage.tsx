import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Please fill in all required fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    navigate("/profile");
  };

  const field = (label: string, key: keyof typeof form, type = "text", icon: React.ReactNode, placeholder: string, required = true) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          type={type}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3.5 border border-gray-200 bg-white text-sm text-foreground placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex">
      {/* Left image panel */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85"
          alt="Shagun Boutique"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1514]/70 via-[#1A1514]/40 to-transparent" />
        <div className="absolute bottom-16 left-12">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-semibold mb-4">
            Shagun Boutique
          </p>
          <h2 className="text-4xl font-serif text-white leading-tight mb-3">
            Join Our World
          </h2>
          <p className="text-white/60 font-light text-sm max-w-xs">
            Become a member for early access to new collections, exclusive offers, and personalised styling.
          </p>
          <ul className="mt-6 flex flex-col gap-2">
            {["Early access to new arrivals", "Exclusive member discounts", "Free alterations on first order"].map(b => (
              <li key={b} className="flex items-center gap-2 text-white/70 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-block mb-10">
            <img src="/shagun-logo.png" alt="Shagun Boutique" className="h-12 w-auto object-contain" />
          </Link>

          <h1 className="font-serif text-3xl text-foreground mb-1">Create Account</h1>
          <p className="text-gray-400 font-light text-sm mb-8">
            Already a member?{" "}
            <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-sm">
                {error}
              </div>
            )}

            {field("Full Name", "name", "text", <User className="w-4 h-4" strokeWidth={1.5} />, "Priya Venkatesh")}
            {field("Email Address", "email", "email", <Mail className="w-4 h-4" strokeWidth={1.5} />, "you@example.com")}
            {field("Phone Number", "phone", "tel", <Phone className="w-4 h-4" strokeWidth={1.5} />, "+91 98765 43210", false)}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                Password<span className="text-primary ml-0.5">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-12 py-3.5 border border-gray-200 bg-white text-sm text-foreground placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                />
                <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                Confirm Password<span className="text-primary ml-0.5">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.confirm}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-200 bg-white text-sm text-foreground placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <p className="text-[10px] text-gray-400 font-light leading-relaxed -mt-1">
              By creating an account you agree to our{" "}
              <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              className="mt-1 w-full bg-foreground text-white text-xs tracking-widest uppercase font-semibold py-4 hover:bg-primary hover:text-[#1A1A1A] transition-all duration-300"
            >
              Create Account
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
