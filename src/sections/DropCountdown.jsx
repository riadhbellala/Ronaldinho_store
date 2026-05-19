import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, CheckCircle, Smartphone, Truck, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ALGERIA_WILAYAS = [
  "16 - Alger",
  "31 - Oran",
  "25 - Constantine",
  "09 - Blida",
  "35 - Boumerdes",
  "15 - Tizi Ouzou",
  "05 - Batna",
  "19 - Sétif",
  "30 - Ouargla",
  "47 - Ghardaïa"
];

export default function DropCountdown() {
  const { cart, totalPrice, clearCart } = useCart();
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', wilaya: '16 - Alger', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderDetails, setConfirmedOrderDetails] = useState(null);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // reset loop
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your streetwear bag is empty. Collect a sneaker drop first!");
      return;
    }
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please complete all shipping label fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury blockchain transaction/order processing
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrderDetails({
        orderId: `RO10-TX-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        price: totalPrice,
        customer: { ...formData },
        timestamp: new Date().toLocaleString(),
      });
      setOrderConfirmed(true);
      clearCart();
    }, 2000);
  };

  return (
    <section
      id="countdown"
      className="relative min-h-screen w-full bg-matte-black py-28 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden z-10"
    >
      {/* Background grids */}
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
      <div className="absolute left-[5%] bottom-[5%] w-[45vw] h-[45vw] rounded-full ambient-glow-yellow opacity-10 pointer-events-none" />

      {/* Chapter Typo Indicator */}
      <div className="absolute top-12 left-12 font-mono text-[10px] text-brand-yellow tracking-[0.4em] uppercase z-10 flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full" />
        CHAPTER 05 // THE DROP
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Countdown Timer & Teaser */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-center text-left">
          <span className="font-mono text-[9px] text-brand-yellow tracking-[0.35em] uppercase font-bold">
            LIMITED EDITION RELEASE // DROP 01
          </span>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tighter mt-2 text-neutral-100 leading-none">
            OWN BEFORE <br />
            <span className="text-outline-yellow">DISPERSION.</span>
          </h2>

          <p className="text-sm text-neutral-400 font-light mt-4 leading-relaxed">
            The counter represents the active chemical stability of the current limited batch. Once the digital clock reaches zero, remaining inventory is immediately burned to protect brand rarity.
          </p>

          {/* Large Retro Digital Clock */}
          <div className="flex items-center gap-3 mt-8 font-mono select-none">
            {[
              { label: 'HR', val: timeLeft.hours },
              { label: 'MIN', val: timeLeft.minutes },
              { label: 'SEC', val: timeLeft.seconds }
            ].map((unit, idx) => (
              <React.Fragment key={unit.label}>
                {idx > 0 && <span className="text-3xl font-black text-brand-yellow/60 -mt-5 animate-pulse">:</span>}
                <div className="flex flex-col items-center">
                  <div className="w-20 py-4 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center text-3xl font-black text-brand-yellow shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                    {unit.val.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[8px] text-neutral-500 tracking-widest mt-1.5 font-bold uppercase">{unit.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Quick local delivery statements */}
          <div className="grid grid-cols-2 gap-4 border-t border-neutral-800/80 mt-8 pt-6">
            <div className="flex gap-2">
              <Truck size={16} className="text-brand-yellow shrink-0 mt-0.5" />
              <div>
                <span className="font-display font-bold text-xs uppercase text-neutral-200 block">69 Wilayas Delivery</span>
                <span className="text-[10px] text-neutral-500 block leading-tight mt-0.5">Rapid home dispatch or stop desk collection.</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Smartphone size={16} className="text-brand-yellow shrink-0 mt-0.5" />
              <div>
                <span className="font-display font-bold text-xs uppercase text-neutral-200 block">Cash on Delivery</span>
                <span className="text-[10px] text-neutral-500 block leading-tight mt-0.5">Pay safely inside Algeria only after opening parcel.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Streetwear Shipping Label Checkout Card */}
        <div className="col-span-1 lg:col-span-7 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[500px] bg-[#f4f4f5] text-black border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-2xl relative flex flex-col justify-between font-mono"
            style={{ backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)', bgSize: '16px 16px' }}
          >
            {/* Design elements mimicking thermal parcel labels */}
            <div className="absolute top-2 left-6 right-6 flex items-center justify-between border-b-2 border-black pb-2 opacity-80">
              <span className="text-[9px] font-black tracking-widest">RO10 // EXPRESS DELIVERY</span>
              <span className="text-[9px] font-black">WILAYA GATEWAY</span>
            </div>

            {/* Barcode section */}
            <div className="flex flex-col items-center mt-6 mb-4 select-none opacity-95">
              {/* Fake vector barcode */}
              <div className="flex items-center gap-[1px] h-12 w-full max-w-[320px] bg-black p-1 rounded-sm">
                {[...Array(65)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i % 7 === 0 ? '6px' : i % 5 === 0 ? '4px' : i % 3 === 0 ? '1px' : '2px',
                      backgroundColor: i % 11 === 0 ? 'transparent' : 'white'
                    }}
                    className="h-full"
                  />
                ))}
              </div>
              <span className="text-[8px] font-bold tracking-[0.25em] text-neutral-600 mt-1">
                *RO10-STREET-COLLECT-01*
              </span>
            </div>

            {/* Sub-form */}
            <div className="space-y-4 flex-1">
              <div>
                <label className="text-[9px] font-black uppercase tracking-wider block">01 // RECIPIENT FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Riadh Belkacem"
                  className="w-full bg-transparent border-b-2 border-black py-1 text-sm font-bold placeholder-neutral-400 focus:outline-none focus:border-brand-yellow-dark transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider block">02 // PHONE NUMBER</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0699 XX XX XX"
                    className="w-full bg-transparent border-b-2 border-black py-1 text-sm font-bold placeholder-neutral-400 focus:outline-none focus:border-brand-yellow-dark transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider block">03 // DELIV. WILAYA</label>
                  <select
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-black py-1 text-sm font-bold focus:outline-none focus:border-brand-yellow-dark transition-colors"
                  >
                    {ALGERIA_WILAYAS.map((wilaya) => (
                      <option key={wilaya} value={wilaya} className="font-bold bg-white text-black">
                        {wilaya}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-wider block">04 // STREET ADDRESS</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. Rue de la Colonne, El Mouradia"
                  className="w-full bg-transparent border-b-2 border-black py-1 text-sm font-bold placeholder-neutral-400 focus:outline-none focus:border-brand-yellow-dark transition-colors"
                  required
                />
              </div>
            </div>

            {/* Dynamic details listing total */}
            <div className="border-t-2 border-black mt-6 pt-4 flex flex-col gap-1.5 opacity-90">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span>COLLECT CONTENT:</span>
                <span className="font-black">
                  {cart.length > 0 ? `${cart.reduce((a, b) => a + b.quantity, 0)} PAIRS SECURED` : "0 ITEMS SECURED"}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-black border-t border-dashed border-black/40 pt-1.5">
                <span>TOTAL COLLECT PAYABLE (C.O.D):</span>
                <span className="text-sm font-black">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Order Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="interactive-hover w-full py-4 bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed rounded-xl font-display font-black uppercase text-sm tracking-widest mt-6 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>PROCESSING TRANSACTION...</>
              ) : cart.length === 0 ? (
                <>Secure Drop First <ShieldAlert size={16} /></>
              ) : (
                <>Deploy Collect Order <Sparkles size={16} /></>
              )}
            </button>
          </form>
        </div>

      </div>

      {/* High-Fidelity Streetwear Barcode Receipt Modal */}
      <AnimatePresence>
        {orderConfirmed && confirmedOrderDetails && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-[480px] bg-[#f4f4f5] text-black border-[4px] border-black rounded-3xl p-6 sm:p-8 font-mono shadow-2xl relative flex flex-col gap-6"
              style={{ backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)', bgSize: '16px 16px' }}
            >
              {/* Confirmed stamp badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black text-[#FFD700] px-3 py-1 rounded-full text-[9px] font-black tracking-widest">
                <CheckCircle size={10} /> SECURED
              </div>

              {/* Thermal receipt title */}
              <div className="border-b-2 border-black pb-4 text-center mt-4">
                <h3 className="font-display font-black text-xl tracking-tighter uppercase leading-none">
                  RO10 // TRANSACTION TICKET
                </h3>
                <p className="text-[8px] text-neutral-500 tracking-widest uppercase mt-1">
                  OFFICIAL DISTRIBUTION TERMINAL // ALGIERS
                </p>
              </div>

              {/* Metadata */}
              <div className="text-[10px] space-y-1 font-bold">
                <div className="flex justify-between">
                  <span>TX_ID:</span>
                  <span className="font-black">{confirmedOrderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>TIMESTAMP:</span>
                  <span>{confirmedOrderDetails.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span>GATEWAY:</span>
                  <span>CASH ON DELIVERY (C.O.D)</span>
                </div>
              </div>

              {/* Items Block */}
              <div className="border-t border-b border-dashed border-black/40 py-4 my-2">
                <span className="text-[8px] text-neutral-500 font-bold tracking-widest block mb-2">SECURED CARGO CONTENTS:</span>
                <div className="space-y-2">
                  {confirmedOrderDetails.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-start text-xs font-bold">
                      <div className="max-w-[70%]">
                        <span>{item.name}</span>
                        <span className="block text-[9px] text-neutral-500 mt-0.5">SIZE: {item.size} // QTY: {item.quantity}</span>
                      </div>
                      <span>${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address summary */}
              <div className="text-[10px] space-y-1 font-bold">
                <span className="text-[8px] text-neutral-500 tracking-widest block mb-1">SHIPPING METADATA:</span>
                <div className="flex justify-between">
                  <span>RECIPIENT:</span>
                  <span>{confirmedOrderDetails.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>PHONE:</span>
                  <span>{confirmedOrderDetails.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>DESTINATION:</span>
                  <span>{confirmedOrderDetails.customer.wilaya}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span>ADDRESS:</span>
                  <span className="max-w-[70%] text-right leading-tight">{confirmedOrderDetails.customer.address}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="border-t-2 border-black pt-4 flex justify-between items-center">
                <span className="text-xs font-black">TOTAL SETTLEMENT:</span>
                <span className="text-xl font-black">${confirmedOrderDetails.price.toLocaleString()}</span>
              </div>

              {/* Barcode representation */}
              <div className="flex flex-col items-center select-none mt-2 opacity-95">
                <div className="flex items-center gap-[1px] h-10 w-full max-w-[280px] bg-black p-1 rounded-sm">
                  {[...Array(60)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i % 8 === 0 ? '5px' : i % 6 === 0 ? '3px' : i % 2 === 0 ? '1px' : '2px',
                        backgroundColor: i % 7 === 0 ? 'transparent' : 'white'
                      }}
                      className="h-full"
                    />
                  ))}
                </div>
                <span className="text-[8px] font-bold tracking-[0.2em] text-neutral-600 mt-1">
                  *{confirmedOrderDetails.orderId}*
                </span>
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => setOrderConfirmed(false)}
                className="w-full py-3 bg-black text-white hover:bg-neutral-800 rounded-xl font-display font-black uppercase text-xs tracking-widest mt-2 transition-colors"
              >
                Close & Clear Record
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
