import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const ease = [0.16, 1, 0.3, 1];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } },
});

const VALUES = [
  {
    title:  'Authenticity',
    body:   'Every product we carry is 100% original. No replicas. No compromises. Your trust is the foundation we build on.',
  },
  {
    title:  'Community',
    body:   'Born in El Mouradia, built for all of Algeria. We ship to 69 Wilayas and stand behind every order, every step of the way.',
  },
  {
    title:  'Passion',
    body:   'We are sneakerheads first, a store second. That obsession for footwear culture is what makes the difference in how we curate and serve.',
  },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-matte-black pt-[72px]">

      {/* ════ HERO ════ */}
      <section className="relative w-full min-h-[60vh] flex items-end px-6 sm:px-10 pb-20 overflow-hidden">
        {/* background text */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <span
            className="font-display font-black uppercase tracking-tighter leading-none"
            style={{
              fontSize: 'clamp(8rem, 22vw, 20rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            }}
          >
            ABOUT
          </span>
        </div>

        <div className="relative z-10 max-w-2xl">
          <motion.p {...fade(0)} className="font-sans text-[11px] text-brand-yellow uppercase tracking-[0.28em] mb-4">
            Our Story
          </motion.p>
          <motion.h1
            {...fade(0.08)}
            className="font-display font-black uppercase text-white leading-none tracking-tighter"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
          >
            Inspired by a<br />
            <span className="text-brand-yellow">Legend.</span>
          </motion.h1>
        </div>
      </section>

      {/* ── rule ── */}
      <div className="w-full h-px bg-neutral-900" />

      {/* ════ BRAND STORY ════ */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2
            className="font-display font-black uppercase text-white leading-none tracking-tighter"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            From Algiers<br />to the world.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="space-y-6 text-neutral-400 font-sans text-sm leading-relaxed"
        >
          <p>
            Ronaldinho Store was born out of a simple idea: Algeria deserves access to the same quality footwear that the rest of the world gets. Founded in El Mouradia, Algiers, we started as sneaker enthusiasts and grew into one of the most trusted streetwear destinations in the country.
          </p>
          <p>
            We named ourselves after the greatest of all time — not just in football, but in style, in creativity, in the way he made everything look effortless. That same philosophy drives every product we select and every customer we serve.
          </p>
          <p>
            Today we ship Cash on Delivery to all 69 Wilayas. No credit card required. No barriers. Just premium footwear, delivered to your door.
          </p>
        </motion.div>
      </section>

      {/* ── rule ── */}
      <div className="w-full h-px bg-neutral-900" />

      {/* ════ VALUES ════ */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="font-sans text-[11px] text-neutral-500 uppercase tracking-[0.28em] mb-16"
        >
          What we stand for
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-900">
          {VALUES.map(({ title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease, delay: i * 0.1 }}
              className="bg-matte-black p-10 flex flex-col gap-4"
            >
              <span className="font-sans text-[10px] text-neutral-600 uppercase tracking-widest">
                0{i + 1}
              </span>
              <h3 className="font-display font-black text-white uppercase tracking-tight text-xl">
                {title}
              </h3>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── rule ── */}
      <div className="w-full h-px bg-neutral-900" />

      {/* ════ LOCATION + SOCIALS ════ */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-24 flex flex-col md:flex-row items-start justify-between gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="space-y-4"
        >
          <p className="font-sans text-[11px] text-neutral-500 uppercase tracking-[0.28em]">Find us</p>
          <div className="flex items-center gap-2 text-white">
            <MapPin size={14} className="text-brand-yellow shrink-0" />
            <span className="font-sans text-sm">El Mouradia, Algiers, Algeria</span>
          </div>
          <p className="font-sans text-sm text-neutral-500">C.O.D · Shipping to all 69 Wilayas</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.1 }}
          className="space-y-4"
        >
          <p className="font-sans text-[11px] text-neutral-500 uppercase tracking-[0.28em]">Follow</p>
          {['ronaldinho_store10', 'sneakersinho'].map((handle) => (
            <a
              key={handle}
              href={`https://instagram.com/${handle}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-sans text-sm"
            >
              <InstaIcon />
              @{handle}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.2 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 bg-white text-black font-sans font-semibold
                       text-[12px] uppercase tracking-[0.15em] px-8 py-4 rounded-full
                       hover:bg-brand-yellow transition-colors duration-300"
          >
            Shop the Collection <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
