import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const InstaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

import HeroSection      from '../sections/HeroSection';
import LatestSection    from '../sections/LatestSection';
import F50Sequence      from '../sections/F50Sequence';
import ProductShowcase  from '../sections/ProductShowcase';

export default function HomePage() {
  return (
    <>
      <main className="w-full pt-[72px]">
        <HeroSection />
        <LatestSection />
        <F50Sequence />
        <ProductShowcase />
      </main>

      {/* ────────────────── FOOTER ────────────────── */}
      <footer className="w-full bg-matte-black border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
          
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-neutral-900">
            
            {/* Brand */}
            <div className="space-y-4">
              <p className="font-display font-black text-xl text-white uppercase tracking-widest">
                RO<span className="text-brand-yellow">10</span>
              </p>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed max-w-xs">
                Premium streetwear and sneakers. Inspired by a legend, built for Algeria.
              </p>
              <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-sans">
                <MapPin size={11} className="text-brand-yellow shrink-0" />
                El Mouradia, Algiers
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <p className="font-sans text-[10px] text-neutral-600 uppercase tracking-[0.25em]">Navigation</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Collection', href: '/#showcase' },
                  { label: 'Latest Drop', href: '/#latest' },
                  { label: 'About',      to: '/about' },
                ].map(({ label, href, to }) =>
                  to ? (
                    <Link key={label} to={to}
                      className="font-sans text-sm text-neutral-400 hover:text-white transition-colors w-fit">
                      {label}
                    </Link>
                  ) : (
                    <a key={label} href={href}
                      className="font-sans text-sm text-neutral-400 hover:text-white transition-colors w-fit"
                      onClick={(e) => {
                        e.preventDefault();
                        const id = href.replace('/#', '');
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }}>
                      {label}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <p className="font-sans text-[10px] text-neutral-600 uppercase tracking-[0.25em]">Follow</p>
              <div className="flex flex-col gap-3">
                {['ronaldinho_store10', 'sneakersinho'].map((h) => (
                  <a key={h} href={`https://instagram.com/${h}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 font-sans text-sm text-neutral-400 hover:text-white transition-colors w-fit">
                    <InstaIcon />
                    @{h}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-sans text-[11px] text-neutral-700">
              © {new Date().getFullYear()} RO10 Streetwear. All rights reserved.
            </p>
            <p className="font-sans text-[11px] text-neutral-700">
              Cash on Delivery · Shipping to 69 Wilayas
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
