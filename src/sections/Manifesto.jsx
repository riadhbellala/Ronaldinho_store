import  { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Manifesto() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dual asymmetric parallax: left slides up, right slides down
  const leftY = useTransform(scrollYProgress, [0, 1], ['50px', '-150px']);
  const rightY = useTransform(scrollYProgress, [0, 1], ['-150px', '50px']);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.3, 1, 1, 0.3]);
  const centerScale = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.95, 1, 0.95]);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative min-h-screen w-full bg-matte-black py-24 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden z-10"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[50vw] h-[50vw] rounded-full ambient-glow-yellow opacity-10 pointer-events-none" />



      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Parallax Column (Asphalt/Street Textures) */}
        <motion.div
          style={{ y: leftY }}
          className="hidden lg:flex lg:col-span-3 flex-col gap-6"
        >
          {/* Card 1 */}
          <div className="group relative w-full h-80 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.15),transparent)] z-0" />
            
            {/* Abstract pavement graphic in CSS */}
            <div className="absolute inset-0 opacity-10 font-mono text-[9px] text-neutral-500 overflow-hidden leading-none tracking-tighter uppercase p-2 select-none select-none z-0">
              {Array(30).fill("STREET-IDENTITY CREW RO10 ").join(" ")}
            </div>
            
            <div className="relative z-20">
              <span className="font-mono text-[9px] text-brand-yellow tracking-widest uppercase">LOC: EL MOURADIA</span>
              <h4 className="font-display font-extrabold text-lg uppercase mt-1 leading-tight text-neutral-100">
                WET PAVEMENT
              </h4>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative w-full h-64 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
            {/* Concrete wall crack outline using SVG in CSS */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#1f1f1f_25%,transparent_25%),linear-gradient(225deg,#1f1f1f_25%,transparent_25%)] bg-[size:10px_10px] opacity-15" />
            
            <div className="relative z-20">
              <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase font-mono">01 // ASPHALT</span>
              <h4 className="font-display font-extrabold text-lg uppercase mt-1 leading-tight text-brand-yellow">
                RAW CONCRETE
              </h4>
            </div>
          </div>
        </motion.div>

        {/* Center Story Manifest Panel */}
        <motion.div
          style={{ opacity: centerOpacity, scale: centerScale }}
          className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center text-center px-4 py-8 lg:py-0"
        >
          <div className="glass-panel-yellow p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.8)] border border-brand-yellow/30 max-w-xl">
            {/* Glowing Top Dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1.5px] bg-brand-yellow" />
            
            {/* Vector crosshairs for high-tech aesthetic */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-600 select-none">
              + 36.7538° N, 3.0588° E
            </div>

            <span className="font-mono text-[10px] text-brand-yellow tracking-[0.35em] uppercase font-bold">
              THE RO10 BRAND MANIFEST
            </span>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tighter mt-4 leading-none text-neutral-100">
              WE DO NOT SELL <br />
              <span className="text-outline-yellow">SNEAKERS.</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-light mt-6 leading-relaxed text-center">
              We distribute street credentials. Every seam, every millimeter of rubber, and every golden thread is engineered to withstand the friction of urban movement.
            </p>

            <blockquote className="border-l-2 border-brand-yellow pl-4 text-left italic font-sans font-light text-neutral-400 text-xs sm:text-sm mt-8 space-y-1">
              <p>"Own your speed. Own your block. The streets are watching, make sure they get a cinematic view."</p>
              <cite className="block font-mono text-[9px] text-brand-yellow tracking-widest uppercase not-italic mt-2">
                — RO10 CREATIVE LABS
              </cite>
            </blockquote>
          </div>
        </motion.div>

        {/* Right Parallax Column (Graffiti/Details) */}
        <motion.div
          style={{ y: rightY }}
          className="hidden lg:flex lg:col-span-3 flex-col gap-6"
        >
          {/* Card 3 */}
          <div className="group relative w-full h-64 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
            
            {/* Simulated spray tag grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#FFD700_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            <div className="relative z-20">
              <span className="font-mono text-[9px] text-brand-yellow tracking-widest uppercase">02 // ENERGY</span>
              <h4 className="font-display font-extrabold text-lg uppercase mt-1 leading-tight text-neutral-100">
                GRAFFITI DUST
              </h4>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative w-full h-80 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
            {/* Glowing neon stroke element */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-50" />
            
            <div className="relative z-20">
              <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">LOC: DISTRICT 10</span>
              <h4 className="font-display font-extrabold text-lg uppercase mt-1 leading-tight text-brand-yellow">
                NIGHT ENERGY
              </h4>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
