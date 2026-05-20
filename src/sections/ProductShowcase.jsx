import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function ProductShowcase() {
  const containerRef = useRef(null);
  const { addToCart } = useCart();

  // Horizontal scroll linked to vertical scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Translate x based on scroll progress
  // Adjust the percentage based on how many cards we have
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section 
      id="showcase" 
      ref={containerRef} 
      className="relative bg-matte-black border-y border-neutral-900"
      style={{ height: '300vh' }} // Make the section very tall to allow scrolling
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col pt-24 md:pt-32 pb-12">
        
        {/* Header (Static flow, never overlaps) */}
        <div className="px-6 sm:px-10 z-20 shrink-0">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500 mb-2">
            Curated Selection
          </p>
          <div className="flex justify-between items-end">
            <h2 className="font-display font-black uppercase text-white leading-none tracking-tighter"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Best Sellers
            </h2>
            <Link 
              to="/shop"
              className="hidden md:flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors pb-2"
            >
              View Full Collection <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="flex-1 flex items-center mt-8 md:mt-12">
          <motion.div 
            style={{ x }}
            className="flex items-center gap-6 md:gap-12 px-6 sm:px-10"
          >
          {/* We duplicate the products to make the track look fuller */}
          {[...PRODUCTS, ...PRODUCTS].map((product, idx) => (
            <div 
              key={`${product.id}-${idx}`}
              className="relative shrink-0 w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] max-w-[400px] max-h-[65vh] md:max-h-[75vh] aspect-[4/5] md:aspect-[3/4] bg-neutral-900/40 border border-neutral-800 rounded-3xl overflow-hidden group flex flex-col justify-between p-6 md:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              
              <Link to={`/product/${product.id}`} className="absolute inset-0 flex items-center justify-center p-8 md:p-12 cursor-pointer z-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-700 ease-out mix-blend-lighten"
                />
              </Link>

              {/* Top Info */}
              <div className="relative z-20 flex justify-between items-start pointer-events-none drop-shadow-md">
                <div>
                  <p className="font-sans text-[10px] text-brand-yellow uppercase tracking-widest mb-1">
                    {product.brand}
                  </p>
                  <h3 className="font-display font-black uppercase text-2xl text-white tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {product.name}
                  </h3>
                </div>
                <p className="font-display font-bold text-white text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {product.price.toLocaleString()} DA
                </p>
              </div>

              {/* Bottom Quick Add (Hover Reveal) */}
              <div className="relative z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col gap-3 mt-auto pt-8">
                <div className="flex flex-wrap gap-2">
                  {product.sizes.slice(0, 4).map(size => (
                    <button
                      key={size}
                      onClick={() => addToCart({...product, name: `${product.brand} ${product.name}`}, size)}
                      className="w-10 h-10 rounded-full bg-black/60 border border-neutral-700 font-mono text-[11px] text-neutral-300 hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center shrink-0"
                    >
                      {size}
                    </button>
                  ))}
                  <Link 
                    to="/shop"
                    className="h-10 px-4 rounded-full bg-black/60 border border-neutral-700 font-mono text-[11px] text-neutral-300 hover:bg-brand-yellow hover:text-black hover:border-brand-yellow transition-all flex items-center justify-center shrink-0 ml-auto"
                  >
                    More
                  </Link>
                </div>
              </div>

            </div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
