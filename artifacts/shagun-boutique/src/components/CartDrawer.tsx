import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, cartCount } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 2999 ? 0 : 299;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[90] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                <span className="font-serif text-xl text-foreground">Your Cart</span>
                {cartCount > 0 && (
                  <span className="bg-primary text-[#1A1A1A] text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-200" strokeWidth={1} />
                  <p className="font-serif text-xl text-gray-400">Your cart is empty</p>
                  <p className="text-sm text-gray-400 font-light">Discover our curated collections</p>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-6 py-3 bg-foreground text-white text-xs uppercase tracking-widest hover:bg-primary hover:text-[#1A1A1A] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 py-5"
                    >
                      <div className="w-20 h-24 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{item.subCategory}</p>
                          <h4 className="font-serif text-base text-foreground leading-snug line-clamp-2">{item.title}</h4>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-sm text-foreground">{formatPrice(item.price * item.quantity)}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-300 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-6 flex flex-col gap-4 bg-white">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span className="font-light">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span className="font-light">Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[11px] text-gray-400 font-light">
                      Add {formatPrice(2999 - subtotal > 0 ? 2999 - subtotal : 0)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between font-medium text-base text-foreground border-t border-gray-100 pt-3 mt-1">
                    <span className="font-serif">Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button className="w-full bg-primary text-[#1A1A1A] py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-3">
                  Secure Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-xs text-gray-400 uppercase tracking-widest hover:text-foreground transition-colors py-1"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
