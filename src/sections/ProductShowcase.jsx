import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Import photographic sneaker assets directly
import adidasShoe from '../assets/heropics/adidas.webp';
import nikeShoe from '../assets/heropics/nike.webp';
import pumaShoe from '../assets/heropics/puma.webp';

const PRODUCTS = [
  {
    id: "adidas-f50",
    name: "Adidas F50 Hyperfast Neon",
    price: 220,
    tag: "SPEED // EXCLUSIVE",
    description: "The next generation soccer-street hybrid. Built with high-frequency aerodynamic weave and translucent carbon fiber base. Finished in signature neon lime and high-voltage gold.",
    sizes: [40, 41, 42, 43, 44, 45],
    color: "from-lime-400 to-emerald-600",
    glowColor: "rgba(132, 204, 22, 0.4)",
    image: adidasShoe
  },
  {
    id: "nike-vapor",
    name: "Nike Street Vapor R10",
    price: 240,
    tag: "CONTROL // COUTURE",
    description: "An aggressive lifestyle predator forged for concrete survival. Coated in heavy-duty matte charcoal armor with a mechanical carbon-cage stabilizing suspension.",
    sizes: [40, 41, 42, 43, 44, 45],
    color: "from-neutral-700 to-neutral-900",
    glowColor: "rgba(255, 215, 0, 0.35)",
    image: nikeShoe
  },
  {
    id: "puma-active",
    name: "Puma District Active",
    price: 190,
    tag: "URBAN // MID-TOP",
    description: "Raw athletic mid-top celebrating the energy of Algiers' District 10. Wraps high around the ankle with heavy duty elastic support, raw canvas paneling, and utility yellow cords.",
    sizes: [40, 41, 42, 43, 44, 45],
    color: "from-yellow-400 to-amber-600",
    glowColor: "rgba(251, 191, 36, 0.4)",
    image: pumaShoe
  }
];

export default function ProductShowcase() {
  const { addToCart } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const currentProduct = PRODUCTS[activeIdx];

  // Mouse Coordinates State for 3D Perspective Rotation
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate coordinates from center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    // Set rotation limits
    setRotateX(-mouseY * 20);
    setRotateY(mouseX * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleNext = () => {
    setSelectedSize(null);
    setActiveIdx((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    setSelectedSize(null);
    setActiveIdx((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const handleCollect = () => {
    if (!selectedSize) {
      alert("Please select a street sneaker size to collect.");
      return;
    }
    
    const cartProduct = {
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image // Directly feed Vite optimized PNG path
    };

    addToCart(cartProduct, selectedSize);
  };

  return (
    <section
      id="showcase"
      className="relative min-h-screen w-full bg-matte-black py-28 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden z-10 border-b border-neutral-900"
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
      <div className="absolute right-[5%] top-[15%] w-[45vw] h-[45vw] rounded-full ambient-glow-yellow opacity-10 pointer-events-none animate-glow" />

      {/* Chapter Typo Indicator */}
      <div className="absolute top-12 left-12 font-mono text-[10px] text-brand-yellow tracking-[0.4em] uppercase z-10 flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full" />
        CHAPTER 04 // THE SHOWCASE
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Interactive 3D Perspective Sneaker Slider Panel */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-center">
          
          {/* Main 3D Card Area */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[4/3] max-w-[580px] bg-neutral-900/30 border border-neutral-800/80 rounded-3xl p-8 flex items-center justify-center overflow-visible group"
            style={{ perspective: 1000 }}
          >
            {/* Background glowing halo matching the active shoe */}
            <div
              style={{ backgroundColor: currentProduct.glowColor }}
              className="absolute w-64 h-64 rounded-full blur-[70px] pointer-events-none transition-colors duration-500 z-0 opacity-40 group-hover:opacity-60"
            />

            {/* Giant Background Typographic Outline of active sneaker index */}
            <div className="absolute inset-0 flex items-center justify-center font-display font-black text-[22vw] sm:text-[15vw] select-none pointer-events-none z-0 overflow-hidden leading-none">
              <span className="text-outline-white opacity-10 uppercase tracking-tighter">
                {`0${activeIdx + 1}`}
              </span>
            </div>

            {/* Slide Animations on Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, scale: 0.8, x: 80, rotate: -15 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  rotate: -10, // constant base tilt of sneaker
                  rotateX: rotateX,
                  rotateY: rotateY,
                }}
                exit={{ opacity: 0, scale: 0.8, x: -80, rotate: 15 }}
                transition={{
                  type: 'spring',
                  damping: 18,
                  stiffness: 150,
                }}
                className="w-[85%] h-[85%] z-10 flex items-center justify-center relative drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)] animate-float"
              >
                {/* Real High-Resolution Photographic Sneaker */}
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-contain select-none pointer-events-none"
                  style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))' }}
                />

                {/* Soft physical drop shadow beneath the sneaker */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-4 bg-black rounded-full blur-[8px] pointer-events-none z-0" />
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Arrows (Placed on left/right margins) */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 interactive-hover w-10 h-10 rounded-full border border-neutral-800 bg-black/60 text-neutral-400 hover:text-brand-yellow hover:border-brand-yellow/30 transition-all flex items-center justify-center z-20"
              aria-label="Previous Drop"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 interactive-hover w-10 h-10 rounded-full border border-neutral-800 bg-black/60 text-neutral-400 hover:text-brand-yellow hover:border-brand-yellow/30 transition-all flex items-center justify-center z-20"
              aria-label="Next Drop"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Info and Add-to-Cart Panel */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-center">
          <span className="font-mono text-[9px] text-brand-yellow tracking-[0.3em] uppercase font-bold">
            {currentProduct.tag}
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tighter mt-2 text-neutral-100 leading-none">
            {currentProduct.name}
          </h2>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="font-mono text-2xl font-black text-brand-yellow tracking-tighter">
              ${currentProduct.price.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
              VAT EXCLUDED / INCL. SHIPPING
            </span>
          </div>

          <p className="text-sm text-neutral-400 font-light mt-4 leading-relaxed">
            {currentProduct.description}
          </p>

          {/* Dynamic Interactive Size Selector */}
          <div className="border-t border-neutral-800 my-6 pt-6">
            <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-widest font-mono">
              <span>Select Size (EU)</span>
              {selectedSize && (
                <span className="text-brand-yellow font-bold">
                  SELECTED: {selectedSize}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-6 gap-2 mt-3">
              {currentProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`interactive-hover py-2.5 rounded-lg font-mono text-xs font-bold transition-all border ${
                    selectedSize === size
                      ? "bg-brand-yellow border-brand-yellow text-black shadow-[0_0_12px_rgba(255,215,0,0.4)]"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Big Neon Yellow Add to Cart CTA */}
          <button
            onClick={handleCollect}
            className="interactive-hover glow-btn-yellow w-full py-4 rounded-xl bg-brand-yellow text-black font-display font-black text-sm uppercase tracking-wider hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,215,0,0.3)] mt-2"
          >
            <ShoppingBag size={16} /> Collect Drop
          </button>
        </div>

      </div>
    </section>
  );
}
