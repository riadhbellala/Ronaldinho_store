import  { useState, useEffect } from 'react';
import {  Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X} from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.svg';
import Magnetic from './Magnetic';

const LINKS = [
  { label: 'Home',       href: '/'          },
  { label: 'Collection', href: '/shop'      },
  { label: 'Latest',     href: '/#latest'   },
  { label: 'About',      href: '/about'     },
];

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  // Add a subtle background once user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  const handleAnchor = (e, href) => {
    if (href === '/') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (!href.startsWith('/#')) return;
    e.preventDefault();
    const id = href.replace('/#', '');
    if (location.pathname !== '/') {
      window.location.assign(href);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10, 10, 10, 0.4)' : 'transparent',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <div className="flex-1 flex items-center">
            <Magnetic strength={0.3}>
              <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
                <img
                  src={logo}
                  alt="RO10"
                  className="w-8 h-8 group-hover:scale-105 transition-transform duration-300"
                />
                <span className="font-display font-black text-xl tracking-widest uppercase text-white">
                  RO<span className="text-brand-yellow">10</span>
                </span>
              </Link>
            </Magnetic>
          </div>

          {/* Desktop nav - Centered */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
            {LINKS.map(({ label, href }) => (
              <Magnetic key={label} strength={0.2}>
                <a
                  href={href}
                  onClick={(e) => handleAnchor(e, href)}
                  className="text-[11px] font-sans font-bold uppercase tracking-[0.1em]
                             text-neutral-300 hover:text-white hover:underline transition-all duration-200"
                >
                  {label}
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* Right: cart + mobile menu */}
          <div className="flex-1 flex items-center justify-end gap-6">

            <Magnetic strength={0.3}>
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Cart"
                className="relative flex items-center gap-2 text-neutral-300 hover:text-white transition-colors duration-200"
              >
                <div className="relative flex items-center justify-center">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-yellow text-black text-[9px] font-black flex items-center justify-center leading-none">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="font-display font-bold text-xs tracking-wider uppercase hidden sm:block">
                  0 DA
                </span>
              </button>
            </Magnetic>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-neutral-300 hover:text-white transition-colors ml-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-matte-black/98 flex flex-col items-center justify-center gap-10 md:hidden">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => { handleAnchor(e, href); setMenuOpen(false); }}
              className="font-display font-black text-3xl uppercase text-white
                         hover:text-brand-yellow transition-colors tracking-tighter"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
