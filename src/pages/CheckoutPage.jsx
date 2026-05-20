import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen w-full bg-matte-black pt-[72px] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-neutral-900 border border-neutral-800 rounded-4xl p-10 max-w-md w-full text-center flex flex-col items-center"
        >
          <CheckCircle size={64} className="text-brand-yellow mb-6" />
          <h1 className="font-display font-black text-3xl text-white uppercase tracking-tighter mb-4">
            Order Confirmed
          </h1>
          <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-8">
            Thank you for your order! We will contact you shortly to confirm delivery details. Payment will be collected on delivery.
          </p>
          <Link 
            to="/shop" 
            className="w-full bg-brand-yellow text-black font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors block"
          >
            Return to Shop
          </Link>
        </motion.div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen w-full bg-matte-black pt-[72px] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full border border-dashed border-neutral-800 flex items-center justify-center text-neutral-600 text-3xl mb-6">
          📭
        </div>
        <h1 className="font-display font-black text-3xl text-white uppercase tracking-tighter mb-4">
          Your Bag is Empty
        </h1>
        <p className="font-sans text-neutral-500 mb-8 max-w-sm">
          You need to add some products to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-white text-black font-sans font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-brand-yellow transition-colors"
        >
          Explore Collection
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-matte-black pt-[72px]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-sans text-[11px] uppercase tracking-widest mb-10"
        >
          <ArrowLeft size={14} /> Back to Bag
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* ════ LEFT: CHECKOUT FORM ════ */}
          <div className="lg:col-span-7">
            <h1 className="font-display font-black text-4xl text-white uppercase tracking-tighter mb-8">
              Express Checkout
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="font-display font-bold text-lg text-white uppercase tracking-wide border-b border-neutral-800 pb-4">
                  Delivery Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-sans text-[10px] text-neutral-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input required type="text" className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="Riadh Bellala" />
                  </div>
                  
                  <div>
                    <label className="block font-sans text-[10px] text-neutral-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                    <input required type="tel" className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="05 55 55 55 55" />
                  </div>
                  
                  <div>
                    <label className="block font-sans text-[10px] text-neutral-400 uppercase tracking-widest mb-2 ml-1">Wilaya</label>
                    <select required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors appearance-none">
                      <option value="">Select Wilaya</option>
                      <option value="16">16 - Alger</option>
                      <option value="31">31 - Oran</option>
                      <option value="25">25 - Constantine</option>
                      <option value="05">05 - Batna</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block font-sans text-[10px] text-neutral-400 uppercase tracking-widest mb-2 ml-1">Exact Address</label>
                    <input required type="text" className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="Street name, building, apartment number" />
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8">
                <h2 className="font-display font-bold text-lg text-white uppercase tracking-wide border-b border-neutral-800 pb-4 mb-6">
                  Payment Method
                </h2>
                
                <div className="flex items-center gap-4 p-4 border border-brand-yellow/50 bg-brand-yellow/10 rounded-xl">
                  <div className="w-5 h-5 rounded-full border-4 border-brand-yellow flex-shrink-0" />
                  <div>
                    <p className="font-sans font-bold text-white text-sm">Cash on Delivery (COD)</p>
                    <p className="font-sans text-xs text-neutral-400 mt-1">Pay when the courier delivers your package.</p>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-brand-yellow text-black font-display font-black text-base uppercase tracking-wider py-5 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                Confirm Order
              </button>

            </form>
          </div>

          {/* ════ RIGHT: ORDER SUMMARY ════ */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-3xl p-6 md:p-8 sticky top-24">
              <h2 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center p-2 border border-neutral-800 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display font-bold text-white text-xs uppercase leading-tight mb-1">{item.name}</p>
                      <p className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest">Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                    <p className="font-mono text-sm font-bold text-brand-yellow">
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-neutral-800">
                <div className="flex justify-between text-sm text-neutral-400 font-sans">
                  <span>Subtotal</span>
                  <span>{totalPrice.toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-400 font-sans">
                  <span>Shipping</span>
                  <span className="text-white">Free</span>
                </div>
                <div className="flex justify-between text-xl text-white font-display font-black pt-4 border-t border-neutral-800">
                  <span className="uppercase">Total</span>
                  <span className="text-brand-yellow">{totalPrice.toLocaleString()} DA</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
