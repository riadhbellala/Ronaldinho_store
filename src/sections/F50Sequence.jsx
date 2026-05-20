import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';

const FRAME_COUNT = 37;
const FRAME_PATH = '/assets/f50/f';

// Preload all frames into Image objects for instant canvas drawing
function usePreloadFrames() {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const imgs = [];
    let count = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}${i}.webp`;
      img.onload = () => {
        count++;
        if (count === FRAME_COUNT && mounted) {
          setImages(imgs);
          setLoaded(true);
        }
      };
      img.onerror = () => {
        count++;
        if (count === FRAME_COUNT && mounted) {
          setImages(imgs);
          setLoaded(true);
        }
      };
      imgs.push(img);
    }

    return () => { mounted = false; };
  }, []);

  return { images, loaded };
}

export default function F50Sequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { images, loaded } = usePreloadFrames();
  const currentFrameRef = useRef(0);
  const dprRef = useRef(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Text animations tied to scroll phases
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.25, 0.35], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);
  
  const specOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.75], [0, 1, 1, 0]);
  const specY = useTransform(scrollYProgress, [0.35, 0.45], [30, 0]);
  
  const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.75, 0.85], [30, 0]);

  // Draw frame on canvas — all math uses physical pixels (canvas.width/height)
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas || !images.length) return;
    
    const ctx = canvas.getContext('2d');
    const clampedIdx = Math.min(Math.max(Math.round(index), 0), images.length - 1);
    const img = images[clampedIdx];
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Clear entire canvas
    ctx.clearRect(0, 0, cw, ch);

    // Object-contain: fit image centered at 70% of canvas size
    const scale = 0.7;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let dw, dh;

    if (imgRatio > canvasRatio) {
      dw = cw * scale;
      dh = dw / imgRatio;
    } else {
      dh = ch * scale;
      dw = dh * imgRatio;
    }

    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
  }, [images]);

  // Listen for scroll-driven frame changes
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const idx = Math.round(latest);
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      drawFrame(idx);
    }
  });

  // Set canvas dimensions using physical pixels (no ctx.scale — draw directly in physical coords)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      // NO ctx.scale — we draw in physical pixels directly
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawFrame]);

  // Draw first frame once loaded
  useEffect(() => {
    if (loaded && images.length) {
      // Small delay to ensure canvas is sized
      requestAnimationFrame(() => drawFrame(0));
    }
  }, [loaded, images, drawFrame]);

  return (
    <section
      ref={containerRef}
      className="relative bg-matte-black"
      style={{ height: '350vh' }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#84cc16]/8 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Canvas for the frame sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        />

        {/* ── Phase 1: Title overlay ── */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-[12%] left-0 w-full text-center z-20 px-6"
        >
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-3">
            360° Experience
          </p>
          <h2
            className="font-display font-black uppercase text-white leading-none tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Adidas F50
          </h2>
          <p className="font-sans text-sm text-neutral-500 mt-3 tracking-wide">
            Scroll to explore every angle
          </p>
        </motion.div>

        {/* ── Phase 2: Spec callouts ── */}
        <motion.div
          style={{ opacity: specOpacity, y: specY }}
          className="absolute bottom-[12%] left-0 w-full z-20 px-6"
        >
          <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <p className="font-display font-black text-white text-xl md:text-3xl tracking-tight">230g</p>
              <p className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Ultra-Light</p>
            </div>
            <div className="text-center">
              <p className="font-display font-black text-xl md:text-3xl tracking-tight" style={{ color: '#84cc16' }}>FG/AG</p>
              <p className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Multi-Ground</p>
            </div>
            <div className="text-center">
              <p className="font-display font-black text-white text-xl md:text-3xl tracking-tight">Carbon</p>
              <p className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Speed Frame</p>
            </div>
          </div>
        </motion.div>

        {/* ── Phase 3: CTA ── */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute bottom-[8%] left-0 w-full text-center z-20 px-6"
        >
          <a
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#84cc16] text-black
                       font-sans font-bold text-[12px] uppercase tracking-[0.15em]
                       px-8 py-4 rounded-full
                       hover:bg-white hover:scale-105 transition-all duration-300"
          >
            Shop F50 Collection
          </a>
        </motion.div>

        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-matte-black">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-neutral-700 border-t-[#84cc16] rounded-full animate-spin" />
              <p className="font-sans text-[11px] text-neutral-500 uppercase tracking-widest">Loading 360°</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
