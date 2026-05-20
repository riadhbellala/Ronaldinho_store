import  { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import frame1 from '../assets/latest/frame1.webp';
import frame2 from '../assets/latest/frame2.webp';
import frame3 from '../assets/latest/frame3.webp';

export default function LatestSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // useScroll gives us the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"]
  });

  // Scroll-linked fan out animations
  // x, y, rotation, and opacity change as you scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ['10%', '-38%']);
  const y1 = useTransform(scrollYProgress, [0, 1], ['15%', '-24%']);
  const r1 = useTransform(scrollYProgress, [0, 1], [-5, -16]);
  const s1 = useTransform(scrollYProgress, [0, 0.8], [0.5, 1]);
  const op1 = useTransform(scrollYProgress, [0, 0.3], [0, 0.9]);

  const x3 = useTransform(scrollYProgress, [0, 1], ['-10%', '38%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['-15%', '24%']);
  const r3 = useTransform(scrollYProgress, [0, 1], [-5, 6]);
  const s3 = useTransform(scrollYProgress, [0, 0.8], [0.5, 1]);
  const op3 = useTransform(scrollYProgress, [0, 0.3], [0, 0.85]);

  const centerScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.05]);

  return (
    <section id="latest" ref={ref} className="w-full bg-matte-black py-32 overflow-hidden flex flex-col items-center">
      
      {/* ── thin top rule ── */}
      <div className="w-full h-px bg-neutral-900 absolute top-0" />

      {/* ════ EDITORIAL HEADER ════ */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-40 mb-10 px-6"
      >
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4">
          Latest Drop
        </p>
        <h2 className="font-display font-black uppercase text-white leading-none tracking-tighter"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
          Adidas F50
        </h2>
      </motion.div>

      {/* ════ INTERACTIVE FAN-OUT STAGE ════ */}
      <div className="relative w-full max-w-5xl h-[450px] sm:h-[600px] flex items-center justify-center z-20">
        
        {/* Glow behind the center shoe */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-[#84cc16]/10 rounded-full blur-[80px] pointer-events-none z-0" />

        {/* ── Frame 1 (Top Left - Spreads out behind) ── */}
        <motion.img
          src={frame1}
          alt="F50 Top Angle"
          className="absolute w-[65%] sm:w-[45%] object-contain select-none z-10 md:drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          style={{ 
            x: x1, y: y1, rotate: r1, opacity: op1, scale: s1,
            willChange: 'transform, opacity',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />

        {/* ── Frame 3 (Bottom Right - Spreads out behind) ── */}
        <motion.img
          src={frame3}
          alt="F50 Low Angle"
          className="absolute w-[65%] sm:w-[45%] object-contain select-none z-10 md:drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          style={{ 
            x: x3, y: y3, rotate: r3, opacity: op3, scale: s3,
            willChange: 'transform, opacity',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />

        {/* ── Frame 2 (Center - Front) ── */}
        <motion.div
          className="absolute w-[75%] sm:w-[55%] z-30 flex items-center justify-center"
          style={{ scale: centerScale }}
        >
          {/* Continuous floating loop wrapped inside the scroll-scaling container */}
          <motion.img
            src={frame2}
            alt="F50 Side Profile"
            className="w-full object-contain select-none md:drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)] md:drop-shadow-[0_0_30px_rgba(132,204,22,0.15)]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ 
              rotate: -5,
              willChange: 'transform',
              WebkitBackfaceVisibility: 'hidden'
            }}
          />
        </motion.div>

      </div>

      {/* ════ EDITORIAL FOOTER & CTA ════ */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="flex flex-col items-center text-center mt-12 px-6 z-40"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full" style={{ background: '#84cc16', boxShadow: '0 0 8px rgba(132,204,22,0.7)' }} />
          <span className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest">
            Solar Lime · Infrared · Carbon Black
          </span>
        </div>

        <p className="font-sans text-sm text-neutral-400 max-w-md leading-relaxed mb-8">
          Thermochromic solar-lime finish. Carbon-reinforced speed frame. 
          Designed for explosive output on every surface.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <p className="font-display font-black text-white text-3xl tracking-tighter">
            22 000 DA
          </p>
          <a
            href="/shop"
            className="flex items-center gap-2 bg-white text-black
                       font-sans font-semibold text-[12px] uppercase tracking-[0.15em]
                       px-8 py-4 rounded-full
                       hover:bg-brand-yellow hover:scale-105 transition-all duration-300"
          >
            Shop Now <ArrowRight size={14} />
          </a>
        </div>
      </motion.div>

    </section>
  );
}
