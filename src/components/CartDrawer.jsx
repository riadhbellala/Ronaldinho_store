import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    // Smooth scroll to countdown checkout gate
    const checkoutSec = document.getElementById('countdown');
    if (checkoutSec) {
      setTimeout(() => {
        checkoutSec.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 pointer-events-auto"
          />

          {/* Sliding Side Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-charcoal border-l border-neutral-800 z-50 shadow-2xl flex flex-col pointer-events-auto grain-overlay"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-800">
              <div>
                <h3 className="font-display font-extrabold text-xl uppercase tracking-wider">
                  STREET <span className="text-brand-yellow">BAG</span>
                </h3>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono mt-0.5">
                  RO10 // OWN THE STREETS DEPT
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="interactive-hover p-2 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-brand-yellow hover:border-brand-yellow/30 transition-all duration-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border border-dashed border-neutral-800 flex items-center justify-center text-neutral-600">
                    📭
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase text-neutral-400">Your Bag is Empty</h4>
                    <p className="text-xs text-neutral-500 max-w-[240px] mx-auto mt-1">
                      Explore the drops and secure your street credentials.
                    </p>
                  </div>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-brand-yellow/20 transition-colors"
                  >
                    {/* Sneaker Thumbnail */}
                    <div className="w-24 h-20 rounded-lg bg-black/60 flex items-center justify-center p-2 border border-neutral-800 relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain transform -rotate-12 scale-110 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-display font-extrabold text-sm uppercase tracking-wide">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-neutral-500 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">
                          SIZE: <span className="text-brand-yellow font-bold">{item.size}</span>
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border border-neutral-800 rounded-md px-1.5 py-0.5 bg-black/40">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, -1)}
                            className="text-neutral-400 hover:text-brand-yellow transition-colors p-1"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-mono w-4 text-center font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, 1)}
                            className="text-neutral-400 hover:text-brand-yellow transition-colors p-1"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-black text-brand-yellow">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-800 bg-neutral-900/40 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-widest font-mono">
                    <span>Subtotal</span>
                    <span className="font-bold text-neutral-200">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-widest font-mono">
                    <span>Shipping</span>
                    <span className="font-bold text-brand-yellow">FREE</span>
                  </div>
                  <div className="border-t border-dashed border-neutral-800 my-2 pt-2 flex items-center justify-between">
                    <span className="font-display font-extrabold text-sm uppercase tracking-wider text-neutral-200">
                      Total Collect
                    </span>
                    <span className="font-mono text-xl font-black text-brand-yellow drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="interactive-hover w-full glow-btn-yellow py-4 rounded-xl bg-brand-yellow text-black font-display font-black text-sm uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,215,0,0.25)]"
                >
                  Process Collect <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
