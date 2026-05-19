import React from 'react';
import { CartProvider } from './context/CartContext';
import CustomCursor from './components/CustomCursor';
import FloatingNav from './components/FloatingNav';
import AudioController from './components/AudioController';
import CartDrawer from './components/CartDrawer';

// Sections
import HeroSection from './sections/HeroSection';
import Manifesto from './sections/Manifesto';
import TechSpec from './sections/TechSpec';
import ProductShowcase from './sections/ProductShowcase';
import DropCountdown from './sections/DropCountdown';

import { MapPin, Globe, Cpu } from 'lucide-react';

export default function App() {
  return (
    <CartProvider>
      {/* Cinematic Custom Cursors */}
      <CustomCursor />

      {/* Floating Interactive Controls */}
      <FloatingNav />
      <AudioController />
      <CartDrawer />

      {/* Chapter 1 to 5 Story Scroll Sequence */}
      <main className="relative w-full flex flex-col items-center">
        
        {/* Horizontal grid guide line overlays that slice down the page */}
        <div className="absolute top-0 bottom-0 left-[10vw] w-[1px] bg-neutral-900/40 pointer-events-none z-0" />
        <div className="absolute top-0 bottom-0 right-[10vw] w-[1px] bg-neutral-900/40 pointer-events-none z-0" />

        <HeroSection />
        <Manifesto />
        <TechSpec />
        <ProductShowcase />
        <DropCountdown />
      </main>

      {/* Sleek, raw street-culture footer */}
      <footer className="relative w-full bg-matte-black border-t border-neutral-900 py-16 px-6 md:px-12 overflow-hidden z-10 font-mono grain-overlay">
        {/* Glowing border accents */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {/* Logo Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-display font-black text-2xl text-neutral-100 tracking-wider">
              RO<span className="text-brand-yellow">10</span>
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Designed dynamically for high-fidelity street exploration and heavy-duty urban concrete movement. Inspired by athletic legends and engineered by sneaker heads in Algiers.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-brand-yellow" /> El Mouradia, Algiers</span>
            </div>
          </div>

          {/* Social Coordinates */}
          <div className="space-y-4">
            <span className="text-[10px] text-brand-yellow tracking-widest font-black uppercase">
              // CONNECT COORDS
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com/ronaldinho_store10"
                target="_blank"
                rel="noreferrer"
                className="interactive-hover text-xs text-neutral-400 hover:text-brand-yellow transition-colors flex items-center gap-2 group w-fit"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-6 transition-transform"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                @ronaldinho_store10
              </a>
              <a
                href="https://instagram.com/sneakersinho"
                target="_blank"
                rel="noreferrer"
                className="interactive-hover text-xs text-neutral-400 hover:text-brand-yellow transition-colors flex items-center gap-2 group w-fit"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-6 transition-transform"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                @sneakersinho
              </a>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="space-y-4">
            <span className="text-[10px] text-neutral-400 tracking-widest font-black uppercase">
              // SYS_METRIC
            </span>
            <div className="text-[10px] text-neutral-500 space-y-1">
              <div className="flex justify-between"><span>ENGINE:</span><span className="text-neutral-300 font-bold">VITE + TAILWIND V4</span></div>
              <div className="flex justify-between"><span>MOTION:</span><span className="text-neutral-300 font-bold">FRAMER MOTION</span></div>
              <div className="flex justify-between"><span>AUD_SYNTH:</span><span className="text-neutral-300 font-bold">WEB AUDIO API</span></div>
              <div className="flex justify-between"><span>STATUS:</span><span className="text-brand-yellow font-bold animate-pulse">ONLINE // READY</span></div>
            </div>
          </div>
        </div>

        {/* Bounded credits */}
        <div className="max-w-6xl mx-auto border-t border-neutral-900/60 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-neutral-600 gap-4 relative z-10">
          <span>&copy; {new Date().getFullYear()} RO10 CREATIVE DEPT. ALL ASSETS PROTECTED BY BRAND LIMITS.</span>
          <span className="flex items-center gap-1"><Cpu size={10} className="text-brand-yellow" /> BUILT OUT OF THE BOX WITH AI ASSIST // ANTIGRAVITY</span>
        </div>
      </footer>
    </CartProvider>
  );
}
