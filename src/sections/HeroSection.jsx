import  { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import adidasShoe from '../assets/heropics/adidas.webp';
import nikeShoe   from '../assets/heropics/nike.webp';
import pumaShoe   from '../assets/heropics/puma.webp';

/* ─────────────────────────── data ─────────────────────────── */
const CAMPAIGNS = [
  {
    id:          'adidas-f50',
    name:        'Adidas F50 Hyperfast',
    price:       22000,
    attribute:   'SPEED',
    description: 'Explosive acceleration. High-frequency mesh upper built on the swift, unpredictable movement of the legend.',
    glow:        '132,204,22',
    image:       adidasShoe,
  },
  {
    id:          'nike-vapor',
    name:        'Nike Street Vapor R10',
    price:       24000,
    attribute:   'CONTROL',
    description: 'Mastered for spatial command. High-grip gum-outsole pods fused with bulletproof canvas skin.',
    glow:        '255,215,0',
    image:       nikeShoe,
  },
  {
    id:          'puma-active',
    name:        'Puma District Active',
    price:       19000,
    attribute:   'STYLE',
    description: 'Premium mid-top concrete cruiser. Elastic lace containment straps and raw canvas overlay panels.',
    glow:        '251,191,36',
    image:       pumaShoe,
  },
];

const fmt = (n) =>
  n.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD', maximumFractionDigits: 0 }).replace('DZD', 'DA');

/* ─────────── cinematic carousel variants ─────────── */
const SLIDE = {
  // Enters from the side: large + blurred, spring-snaps to place with overshoot
  enter: (dir) => ({
    x:      dir * 420,
    opacity: 0,
    scale:  1.18,
    filter: 'blur(18px)',
    rotate: dir * 12,
  }),
  center: {
    x:      0,
    opacity: 1,
    scale:  1,
    filter: 'blur(0px)',
    rotate: 0,
    transition: {
      x:       { type: 'spring', mass: 0.65, stiffness: 100, damping: 18 },
      opacity: { duration: 0.22 },
      scale:   { type: 'spring', mass: 0.65, stiffness: 100, damping: 18 },
      filter:  { duration: 0.32, ease: 'easeOut' },
      rotate:  { type: 'spring', stiffness: 90,  damping: 16 },
    },
  },
  // Exits to opposite side: shrinks + blurs + tilts away hard
  exit: (dir) => ({
    x:      -dir * 420,
    opacity: 0,
    scale:  0.72,
    filter: 'blur(22px)',
    rotate: -dir * 18,
    transition: {
      duration: 0.32,
      ease: [0.55, 0, 1, 0.45],
    },
  }),
};

/* ════════════════════ COMPONENT ════════════════════ */
export default function HeroSection() {
  const [idx, setIdx]       = useState(0);
  const [dir, setDir]       = useState(1);
  const campaign            = CAMPAIGNS[idx];

  /* ── transition flash ── */
  const [flash, setFlash]   = useState(false);
  const timerRef            = useRef(null);

  /* ── spring-smoothed mouse tilt (no state batching lag) ── */
  const rawX   = useMotionValue(0);
  const rawY   = useMotionValue(0);
  const tiltX  = useSpring(rawX, { stiffness: 80, damping: 20 });
  const tiltY  = useSpring(rawY, { stiffness: 80, damping: 20 });
  const stageRef = useRef(null);

  /* ── navigation helpers ── */
  const navigate = useCallback((step) => {
    // Fire the glow flash burst at transition midpoint
    setFlash(true);
    setTimeout(() => setFlash(false), 280);

    setDir(step);
    setIdx((p) => (p + step + CAMPAIGNS.length) % CAMPAIGNS.length);
  }, []);

  /* ── auto-cycle with reset on manual nav ── */
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => navigate(1), 5000);
  }, [navigate]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handleNav = (step) => { navigate(step); resetTimer(); };

  /* ── mouse tilt on the stage ── */
  const onMouseMove = (e) => {
    if (!stageRef.current) return;
    const { left, top, width, height } = stageRef.current.getBoundingClientRect();
    rawX.set(((e.clientY - top)  / height - 0.5) * -22);
    rawY.set(((e.clientX - left) / width  - 0.5) *  22);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  const scrollDown = () =>
    document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' });

  /* ════════ render ════════ */
  return (
    <section
      id="hook"
      className="relative w-full h-[100dvh] bg-matte-black overflow-hidden flex items-center justify-center"
    >
      {/* ── background video ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-[0.18] scale-[1.04] z-0"
        autoPlay loop muted playsInline preload="auto"
      >
        <source src="/assets/ronadlinho.mp4" type="video/mp4" />
      </video>

      {/* ── vignette layer ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-matte-black/80 via-transparent to-matte-black/90" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-matte-black/70 via-transparent to-matte-black/70" />

      {/* ── grain texture ── */}
      <div className="absolute inset-0 z-[2] grain-overlay opacity-[0.12] pointer-events-none" />

      {/* ── GLOW FLASH: fires at transition midpoint ── */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="absolute inset-0 z-[9] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, rgba(${campaign.glow},0.22) 0%, transparent 68%)`,
            }}
          />
        )}
      </AnimatePresence>



      {/* ── BIG depth word behind shoe (above vignette, below shoe) ── */}
      <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={campaign.id + '-word'}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1,  scale: 1    }}
            exit={{    opacity: 0,  scale: 0.94 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="font-display font-black uppercase tracking-[0.04em] leading-none select-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(3rem, 15vw, 14rem)',
              color: `rgba(${campaign.glow}, 0.07)`,
              textShadow: `0 0 120px rgba(${campaign.glow}, 0.08)`,
              WebkitTextStroke: `1px rgba(${campaign.glow}, 0.1)`,
            }}
          >
            RONALDINHO
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── ambient glow spot ── */}
      <AnimatePresence>
        <motion.div
          key={campaign.id + '-glow'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute z-[3] rounded-full pointer-events-none"
          style={{
            width: '480px',
            height: '480px',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, rgba(${campaign.glow},0.14) 0%, transparent 70%)`,
            filter: 'blur(0px)',
          }}
        />
      </AnimatePresence>

      {/* ════════ CENTERSTAGE: shoe ════════ */}
      <div
        ref={stageRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="absolute inset-0 z-[10] flex items-center justify-center select-none"
        style={{ perspective: 1400 }}
      >
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={campaign.id}
            custom={dir}
            variants={SLIDE}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ rotateX: tiltX, rotateY: tiltY }}
            className="relative flex items-center justify-center pointer-events-none"
          >
            {/* floating sine-wave wrapper */}
            <motion.div
              animate={{ y: [0, -16, 0], rotate: [-10, -8, -10] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[75vw] sm:w-[60vw] max-w-[520px]"
            >
              <img
                src={campaign.image}
                alt={campaign.name}
                draggable={false}
                className="w-full h-auto object-contain"
                style={{ filter: 'drop-shadow(0 28px 48px rgba(0,0,0,0.9))' }}
              />
              {/* physical contact shadow */}
              <motion.div
                animate={{ scaleX: [1, 0.88, 1], opacity: [0.45, 0.3, 0.45] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                style={{
                  width: '68%', height: '18px',
                  background: 'rgba(0,0,0,0.7)',
                  filter: 'blur(12px)',
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ════════ HUGE CIRCULAR NAV ARROWS ════════ */}
      {[-1, 1].map((step) => (
        <button
          key={step}
          onClick={() => handleNav(step)}
          aria-label={step === 1 ? 'Next' : 'Previous'}
          className="absolute top-1/2 -translate-y-1/2 z-[30] hidden md:flex items-center justify-center
                     rounded-full border border-neutral-400/30 text-white
                     hover:border-white hover:scale-105
                     transition-all duration-300"
          style={{
            [step === 1 ? 'right' : 'left']: 'clamp(1rem, 4vw, 4rem)',
            width:  '160px',
            height: '160px',
            transform: `translateY(-50%) ${step === -1 ? 'translateX(-30%)' : 'translateX(30%)'}`,
          }}
        >
          {step === -1
            ? <ArrowLeft  size={32} strokeWidth={1} />
            : <ArrowRight size={32} strokeWidth={1} />}
        </button>
      ))}

      {/* ════════ TOP-LEFT: brand stamp ════════ */}
      <div className="absolute top-[6.5rem] left-[clamp(1.5rem,4vw,4rem)] z-[20] select-none pointer-events-none">
        <p className="font-mono text-[10px] text-brand-yellow tracking-[0.3em] uppercase mb-1">
          Inspired by a Legend
        </p>
        <h1 className="font-display font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap text-3xl md:text-4xl lg:text-5xl">
          RO<span className="text-brand-yellow">10</span>{' '}
          <span className="text-neutral-400 font-light hidden sm:inline">Streetwear</span>
        </h1>
      </div>

      {/* ════════ BOTTOM BAR (Info + CTA) ════════ */}
      <div className="absolute bottom-16 md:bottom-20 w-full px-[clamp(1.5rem,4vw,4rem)] z-[20] flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 pointer-events-none">
        
        {/* Sneaker Info */}
        <div className="pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={campaign.id + '-info'}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1,  y: 0  }}
              exit={{    opacity: 0,  y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <span className="block font-mono text-[9px] text-brand-yellow uppercase tracking-[0.28em] mb-1">
                {campaign.attribute} · High Qualité
              </span>
              <h2 className="font-display font-extrabold uppercase text-white tracking-tight leading-tight text-3xl md:text-3xl lg:text-4xl">
                {campaign.name}
              </h2>
              <p className="font-sans text-[11px] text-neutral-400 font-light mt-1.5 leading-relaxed hidden sm:block max-w-[280px]">
                {campaign.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pointer-events-auto mt-4 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={campaign.id + '-price'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-mono font-black text-brand-yellow leading-none select-none text-xl md:text-2xl"
            >
              {fmt(campaign.price)}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollDown}
              className="glow-btn-yellow flex items-center gap-2 bg-brand-yellow text-black font-display font-black
                         uppercase tracking-wider rounded-lg transition-all whitespace-nowrap
                         hover:bg-white hover:shadow-[0_0_24px_rgba(255,215,0,0.4)]"
              style={{ fontSize: '11px', padding: '12px 24px' }}
            >
              Explore <span className="hidden sm:inline">Collection</span> <ArrowRight size={13} />
            </button>
          </div>
        </div>
        
        {/* mobile slide dots */}
        <div className="flex md:hidden gap-3 w-full justify-center mt-2 pointer-events-auto">
          {CAMPAIGNS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); resetTimer(); }}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === idx ? '8px' : '6px',
                height: i === idx ? '8px' : '6px',
                background: i === idx ? '#fff' : 'rgba(255,255,255,0.3)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
