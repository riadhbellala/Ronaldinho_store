import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

const HOTSPOTS = [
  {
    id: 1,
    title: "VAMP // AERODYNAMIC MEMBRANE",
    desc: "Engineered ultra-light micro-weave mesh that vents heat dynamically during high-speed runs. Coated with anti-abrasion skin for durability against rough street asphalt.",
    x: "65%", // Coordinates on the shoe SVG
    y: "35%",
    icon: <Cpu size={14} />,
    stat: "98% HEAT DISPERSION"
  },
  {
    id: 2,
    title: "HEEL // MATTE CARBON CHASSIS",
    desc: "Pre-preg aerospace grade carbon fiber heel cup. Locks the foot into perfect vertical alignment during sharp cuts, providing maximum energy response with zero heel slip.",
    x: "20%",
    y: "40%",
    icon: <ShieldCheck size={14} />,
    stat: "1.2mm REINFORCED WALL"
  },
  {
    id: 3,
    title: "OUTSOLE // HYPER-RESPONSIVE TRACTION",
    desc: "Custom computational stud geometry optimized for wet and dusty urban asphalt. High-density rubber provides a bulletproof grip with instantaneous launch capabilities.",
    x: "45%",
    y: "80%",
    icon: <Zap size={14} />,
    stat: "0.22 FRICTION COEFFICIENT"
  }
];

export default function TechSpec() {
  const [activeSpot, setActiveSpot] = useState(HOTSPOTS[0]);

  return (
    <section
      id="spec"
      className="relative min-h-screen w-full bg-matte-black py-24 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden z-10"
    >
      {/* Background visual detail */}
      <div className="absolute inset-0 grain-overlay opacity-25 pointer-events-none" />
      <div className="absolute left-[10%] top-[10%] w-[40vw] h-[40vw] rounded-full ambient-glow-white opacity-5 pointer-events-none" />
      
      {/* Dynamic tech grid overlay in background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Chapter Typo Indicator */}
      <div className="absolute top-12 left-12 font-mono text-[10px] text-brand-yellow tracking-[0.4em] uppercase z-10 flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-pulse" />
        CHAPTER 03 // TECH SPEC
      </div>

      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 items-center justify-between relative z-10">
        
        {/* Left Side: Interactive Sneaker Blueprint SVG */}
        <div className="w-full lg:w-3/5 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] max-w-[600px] border border-neutral-800/80 rounded-3xl bg-neutral-900/20 backdrop-blur-md p-8 flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Tech Blueprint border frame details */}
            <div className="absolute top-3 left-4 font-mono text-[8px] text-neutral-500">SYS_CHECK: ACTIVE</div>
            <div className="absolute top-3 right-4 font-mono text-[8px] text-neutral-500">SCALE: 1:1 ORTHO</div>
            <div className="absolute bottom-3 left-4 font-mono text-[8px] text-neutral-500">SPECIFICATION MODEL: F50_EVO</div>
            <div className="absolute bottom-3 right-4 font-mono text-[8px] text-neutral-500">RO10 // OWN THE STREETS</div>

            {/* Glowing yellow bounding borders */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-yellow/30" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand-yellow/30" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand-yellow/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-yellow/30" />

            {/* High-Fidelity Vector Sneaker blueprint */}
            <svg viewBox="0 0 500 300" className="w-full h-full fill-none stroke-neutral-700 stroke-[1] pointer-events-none select-none filter drop-shadow-2xl">
              {/* Dynamic outline */}
              <path
                d="M 50 180 C 80 140, 180 80, 320 80 C 380 80, 420 120, 440 150 C 460 170, 470 200, 430 220 C 400 230, 330 225, 280 230 C 220 235, 120 250, 70 220 C 45 205, 40 190, 50 180 Z"
                strokeWidth="1.5"
                className="stroke-neutral-500"
              />
              {/* Inner engineering lines */}
              <path d="M 80 160 C 130 140, 200 120, 280 125 C 330 128, 380 140, 410 160" strokeDasharray="3 3" opacity="0.4" />
              <path d="M 120 180 C 180 190, 260 195, 340 185" strokeDasharray="4 4" opacity="0.3" />
              <path d="M 330 85 C 320 100, 310 130, 315 160" opacity="0.4" />
              
              {/* Carbon sole plate highlight */}
              <path d="M 70 218 C 110 225, 180 228, 250 226 C 320 224, 380 220, 432 216" stroke="#FFD700" strokeWidth="2.5" opacity="0.75" />
              
              {/* Adidas F50 athletic stripe grids */}
              <path d="M 220 90 L 160 210 M 240 90 L 180 215 M 260 90 L 200 220" strokeWidth="3.5" stroke="rgba(255,255,255,0.15)" />
              
              {/* Stud engineering elements */}
              <path d="M 72 215 L 80 232 M 102 225 L 105 242 M 142 228 L 145 245 M 282 230 L 285 247 M 342 224 L 345 241" strokeWidth="2" stroke="#FFD700" opacity="0.8" />
            </svg>

            {/* Glowing Hotspots Placed Above SVG */}
            {HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveSpot(spot)}
                style={{ left: spot.x, top: spot.y }}
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group interactive-hover focus:outline-none"
              >
                {/* Outer concentric pulsing rings */}
                <span className={`absolute w-full h-full rounded-full border bg-brand-yellow/10 transition-transform duration-300 ${
                  activeSpot.id === spot.id 
                    ? "border-brand-yellow scale-125 animate-ping" 
                    : "border-neutral-500 scale-75 group-hover:scale-100 group-hover:border-brand-yellow"
                }`} />
                <span className={`absolute w-6 h-6 rounded-full border transition-all duration-300 ${
                  activeSpot.id === spot.id 
                    ? "border-brand-yellow bg-brand-yellow/20" 
                    : "border-neutral-600 bg-black/80 group-hover:border-brand-yellow"
                }`} />
                
                {/* Core inner active dot */}
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSpot.id === spot.id ? "bg-brand-yellow scale-125" : "bg-neutral-500 group-hover:bg-brand-yellow"
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Specs Display Card */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpot.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-8 rounded-3xl border border-neutral-800 shadow-2xl relative overflow-hidden"
            >
              {/* Ambient micro yellow light inside card */}
              <div className="absolute right-0 top-0 w-24 h-24 rounded-full ambient-glow-yellow opacity-40 pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow">
                  {activeSpot.icon}
                </div>
                <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
                  X-RAY SPECIFICATION [{activeSpot.id.toString().padStart(2, '0')}]
                </span>
              </div>

              <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-neutral-100 mt-4 leading-tight">
                {activeSpot.title}
              </h3>

              <p className="text-sm text-neutral-400 font-light mt-4 leading-relaxed">
                {activeSpot.desc}
              </p>

              {/* Data readouts */}
              <div className="border-t border-neutral-800 my-6 pt-6 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">TELEMETRY</span>
                  <span className="font-mono text-xs font-black text-brand-yellow uppercase mt-0.5 block">{activeSpot.stat}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">INTEGRITY</span>
                  <span className="font-mono text-xs font-black text-neutral-200 uppercase mt-0.5 block">100% NOMINAL</span>
                </div>
              </div>

              {/* Hotspot select pill indicators */}
              <div className="flex items-center gap-2 mt-2">
                {HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setActiveSpot(spot)}
                    className={`interactive-hover px-3 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase transition-all duration-300 ${
                      activeSpot.id === spot.id
                        ? "bg-brand-yellow text-black border border-brand-yellow"
                        : "bg-neutral-900 text-neutral-500 border border-neutral-800 hover:text-neutral-300 hover:border-neutral-700"
                    }`}
                  >
                    SPEC {spot.id.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
