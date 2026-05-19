import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Zap, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen w-full bg-matte-black flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <h1 className="font-display font-black text-white text-4xl mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-brand-yellow hover:text-white transition-colors uppercase font-sans text-xs tracking-widest">
            ← Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    addToCart({
      id: product.id,
      name: `${product.brand} ${product.name}`,
      price: product.price,
      image: product.image
    }, selectedSize);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    setShowBuyModal(true);
  };

  return (
    <main className="w-full min-h-screen bg-matte-black pt-[72px]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-sans text-[11px] uppercase tracking-widest mb-10"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* ════ LEFT: IMAGE SHOWCASE ════ */}
          <div className="lg:col-span-7 relative bg-neutral-900/30 border border-neutral-800 rounded-[2rem] p-8 md:p-16 flex items-center justify-center min-h-[50vh]">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand-yellow/10 blur-[80px] rounded-full pointer-events-none" />
            
            <motion.img 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={product.image} 
              alt={product.name}
              className="w-full max-w-[500px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] relative z-10"
            />
          </div>

          {/* ════ RIGHT: PRODUCT INFO ════ */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="font-sans text-[11px] text-brand-yellow uppercase tracking-[0.25em] mb-2">
                {product.brand}
              </p>
              <h1 className="font-display font-black uppercase text-white tracking-tighter leading-none mb-6" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}>
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-display font-bold text-3xl text-white">
                  {product.price.toLocaleString()} DA
                </span>
                <span className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest">
                  Shipping Included
                </span>
              </div>
              
              <p className="font-sans text-sm text-neutral-400 leading-relaxed mb-10">
                {product.description}
              </p>
            </motion.div>

            {/* Size Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-[11px] text-white uppercase tracking-widest">Select Size (EU)</span>
                <span className="font-sans text-[10px] text-neutral-500 uppercase">Size Guide</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3.5 rounded-xl font-mono text-sm transition-all border ${
                      selectedSize === size
                        ? "bg-brand-yellow border-brand-yellow text-black font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                        : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-500 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              {/* Buy Now - Primary Action */}
              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-sans font-bold text-xs uppercase tracking-widest py-5 rounded-xl hover:bg-neutral-200 transition-colors shadow-lg"
              >
                <Zap size={16} className="fill-black" /> Buy Now
              </button>
              
              {/* Add to Cart - Secondary Action */}
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-white font-sans font-bold text-xs uppercase tracking-widest py-5 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
            </motion.div>

            {/* Delivery Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 pt-6 border-t border-neutral-900 grid grid-cols-2 gap-4"
            >
              <div>
                <p className="font-sans text-[10px] text-neutral-300 uppercase tracking-widest mb-1">Delivery</p>
                <p className="font-sans text-[11px] text-neutral-500">Cash on Delivery across 69 Wilayas.</p>
              </div>
              <div>
                <p className="font-sans text-[10px] text-neutral-300 uppercase tracking-widest mb-1">Authenticity</p>
                <p className="font-sans text-[11px] text-neutral-500">100% Guaranteed Original.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ════ QUICK BUY MODAL ════ */}
      <AnimatePresence>
        {showBuyModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowBuyModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 overflow-hidden"
            >
              <button 
                onClick={() => setShowBuyModal(false)}
                className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight mb-6">
                Express Checkout
              </h2>

              {/* Order Summary */}
              <div className="flex gap-4 items-center bg-black/50 p-4 rounded-xl border border-neutral-800 mb-6">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-contain drop-shadow-lg" />
                <div>
                  <p className="font-display font-bold text-white uppercase text-sm leading-none mb-1">{product.brand} {product.name}</p>
                  <p className="font-sans text-[11px] text-neutral-400">Size {selectedSize}</p>
                  <p className="font-sans text-brand-yellow font-bold text-xs mt-1">{product.price.toLocaleString()} DA</p>
                </div>
              </div>

              {/* Checkout Form */}
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Order placed successfully! We will contact you soon."); setShowBuyModal(false); }}>
                <div>
                  <label className="block font-sans text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                  <input required type="text" className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="Riadh Bellala" />
                </div>
                <div>
                  <label className="block font-sans text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                  <input required type="tel" className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="05 55 55 55 55" />
                </div>
                <div>
                  <label className="block font-sans text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5 ml-1">Wilaya</label>
                  <select required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors appearance-none">
                    <option value="">Select Wilaya</option>
                    <option value="16">16 - Alger</option>
                    <option value="31">31 - Oran</option>
                    <option value="25">25 - Constantine</option>
                    <option value="05">05 - Batna</option>
                    {/* Simplified for demo */}
                  </select>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-brand-yellow text-black font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors">
                    Confirm Order (C.O.D)
                  </button>
                  <p className="text-center font-sans text-[10px] text-neutral-500 mt-3">
                    You will pay when you receive the product.
                  </p>
                </div>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
