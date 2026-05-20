import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

const IMG_PADDING = 12;

const BRAND_SECTIONS = [
  { id: 'nike', name: 'Nike', subheading: '01 // CONTROL', heading: 'Concrete Mastery', image: 'https://images.unsplash.com/photo-1655111438936-54d0e77b9293?w=900&auto=format&fit=crop&q=60' },
  { id: 'adidas', name: 'Adidas', subheading: '02 // SPEED', heading: 'Explosive Pace', image: 'https://images.unsplash.com/photo-1658087252613-a4d09bf7a64c?q=80&w=2070&auto=format&fit=crop' },
  { id: 'puma', name: 'Puma', subheading: '03 // HERITAGE', heading: 'Timeless Design', image: 'https://images.unsplash.com/photo-1776483083339-93f09152e0bf?w=900&auto=format&fit=crop&q=60' },
];

export default function ProductShowcase() {
  return (
    <div className="bg-matte-black w-full relative z-10 pb-24">
      {BRAND_SECTIONS.map(brand => (
        <TextParallaxContent
          key={brand.id}
          imgUrl={brand.image}
          subheading={brand.subheading}
          heading={brand.heading}
        >
          <BrandProducts brandName={brand.name} />
        </TextParallaxContent>
      ))}
    </div>
  );
}

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-[2rem] bg-neutral-950 border border-neutral-800"
    >
      {/* Scroll-away darkening overlay */}
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{ opacity }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white z-30 pointer-events-none px-4"
    >
      <p className="mb-2 text-center font-sans text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-brand-yellow drop-shadow-md">
        {subheading}
      </p>
      <p className="text-center font-display font-black uppercase text-5xl md:text-8xl tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
        {heading}
      </p>
    </motion.div>
  );
};

const BrandProducts = ({ brandName }) => {
  const { addToCart } = useCart();
  const brandProducts = PRODUCTS.filter(p => p.brand === brandName).slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 pb-32 pt-12 relative z-40">
      <div className="flex justify-between items-end mb-8 md:mb-12">
        <h2 className="font-display font-black uppercase text-3xl md:text-5xl text-white tracking-tighter">
          Top <span className="text-brand-yellow">{brandName}</span> Picks
        </h2>
        <Link 
          to="/shop"
          className="hidden md:inline-block font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
        >
          View Full Collection →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {brandProducts.map(product => (
          <div 
            key={product.id}
            className="relative w-full aspect-[4/5] md:aspect-square bg-neutral-900/40 border border-neutral-800 rounded-3xl overflow-hidden group flex flex-col justify-between p-6 md:p-10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            
            <Link to={`/product/${product.id}`} className="absolute inset-0 flex items-center justify-center p-8 md:p-16 cursor-pointer z-0">
              <img 
                src={product.image || 'https://via.placeholder.com/400'} 
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-700 ease-out mix-blend-lighten"
              />
            </Link>

            {/* Top Info */}
            <div className="relative z-20 flex justify-between items-start pointer-events-none drop-shadow-md">
              <div>
                <p className="font-sans text-[10px] md:text-xs text-brand-yellow uppercase tracking-widest mb-1 md:mb-2">
                  {product.tag || product.brand}
                </p>
                <h3 className="font-display font-black uppercase text-2xl md:text-4xl text-white tracking-tight leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-[200px] md:max-w-[300px]">
                  {product.name}
                </h3>
              </div>
              <p className="font-display font-bold text-white text-xl md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {product.price.toLocaleString()} DA
              </p>
            </div>

            {/* Bottom Quick Add */}
            <div className="relative z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col gap-4 mt-auto">
              <p className="font-sans text-xs text-neutral-400 line-clamp-2 hidden md:block max-w-sm">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.slice(0, 4).map(size => (
                  <button
                    key={size}
                    onClick={() => addToCart({...product, name: `${product.brand} ${product.name}`}, size)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 border border-neutral-700 font-mono text-[11px] md:text-sm text-neutral-300 hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center shrink-0"
                  >
                    {size}
                  </button>
                ))}
                <Link 
                  to={`/product/${product.id}`}
                  className="h-10 md:h-12 px-6 rounded-full bg-black/60 border border-neutral-700 font-mono text-[11px] md:text-sm text-neutral-300 hover:bg-brand-yellow hover:text-black hover:border-brand-yellow transition-all flex items-center justify-center shrink-0 ml-auto"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <Link 
          to="/shop"
          className="inline-block font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors border border-neutral-800 rounded-full px-6 py-3"
        >
          View Full Collection
        </Link>
      </div>
    </div>
  );
};
