import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.svg';

export default function FloatingNav() {
  const { totalItems, setIsCartOpen } = useCart();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full h-20 border-b border-neutral-900/60 bg-matte-black/90 backdrop-blur-md transition-all duration-300 flex items-center justify-between px-6 md:px-16">
      
      {/* Brand Logo Link - Docked Left */}
      <a href="#hook" onClick={(e) => handleNavClick(e, 'hook')} className="interactive-hover flex items-center gap-2.5 group">
        <img
          src={logo}
          alt="RO10 Logo"
          className="w-8.5 h-8.5 group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300"
        />
        <span className="font-display font-black text-lg tracking-widest uppercase text-neutral-100 hidden sm:block">
          RO<span className="text-brand-yellow">10</span>
        </span>
      </a>

      {/* Brutalist Wide-Spaced Navigation - Centered */}
      <nav className="hidden md:flex items-center gap-10">
        {[
          { label: '01 / Hook', id: 'hook' },
          { label: '02 / Identity', id: 'manifesto' },
          { label: '03 / Tech Spec', id: 'spec' },
          { label: '04 / Showcase', id: 'showcase' },
          { label: '05 / Drop', id: 'countdown' },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className="interactive-hover text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 hover:text-brand-yellow transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Shopping Bag Trigger - Docked Right */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="interactive-hover relative p-2.5 rounded-lg border border-neutral-900 bg-neutral-950 text-neutral-300 hover:text-brand-yellow hover:border-brand-yellow/30 transition-all duration-300 flex items-center justify-center"
        aria-label="Open Shopping Bag"
      >
        <ShoppingBag size={15} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-brand-yellow text-black text-[9px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(255,215,0,0.5)]">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
}
