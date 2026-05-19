import  { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Stop synthesizer on unmount
  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  const initSynth = () => {
    if (isInitializedRef.current) return;
    
    // Create Audio Context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtxRef.current = new AudioContext();
    isInitializedRef.current = true;
  };

  const playBeat = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Set BPM & rhythm variables
    const bpm = 88;
    const beatDuration = 60 / bpm; // duration of one beat in seconds
    let beatCount = 0;

    // We'll run a scheduling interval
    const scheduler = () => {
      const time = ctx.currentTime;
      
      // Warm Sub Bass Groove (on beats 1 and 3)
      if (beatCount % 4 === 0 || beatCount % 4 === 2) {
        const bassFreq = beatCount % 8 === 0 ? 55 : 48.99; // A1 or G1
        playSubBass(ctx, bassFreq, time, beatDuration * 1.5);
      }

      // Soft Street Kick drum (beat 1 and 3)
      if (beatCount % 4 === 0 || beatCount % 4 === 2) {
        playKick(ctx, time);
      }

      // Soft Hi-Hat (off-beats)
      if (beatCount % 2 === 1) {
        playHiHat(ctx, time);
      }

      // Late-night Ambient Chord Pad (moves every 8 beats)
      if (beatCount % 8 === 0) {
        const chordIndex = (beatCount / 8) % 2;
        const chords = [
          [196, 233.08, 293.66, 392], // G Minor (G3, Bb3, D4, G4)
          [174.61, 220, 261.63, 349.23] // F Major (F3, A3, C4, F4)
        ];
        playAmbientPad(ctx, chords[chordIndex], time, beatDuration * 7.5);
      }

      beatCount++;
    };

    // Trigger first beat immediately
    scheduler();
    
    // Start loop interval
    synthIntervalRef.current = setInterval(scheduler, beatDuration * 1000);
  };

  // Sub Bass synth
  const playSubBass = (ctx, freq, startTime, duration) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.35, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  // Smooth synthesizer ambient pads
  const playAmbientPad = (ctx, freqs, startTime, duration) => {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.exponentialRampToValueAtTime(1400, startTime + duration / 2);
    filter.frequency.exponentialRampToValueAtTime(800, startTime + duration);
    filter.Q.setValueAtTime(1.5, startTime);

    filter.connect(ctx.destination);

    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      
      // Slight detune for analog warm richness
      osc.detune.setValueAtTime(Math.random() * 8 - 4, startTime);

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.06, startTime + 1.2);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gainNode);
      gainNode.connect(filter);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  };

  // Physical modeling kick drum
  const playKick = (ctx, startTime) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.frequency.setValueAtTime(120, startTime);
    osc.frequency.exponentialRampToValueAtTime(45, startTime + 0.15);

    gainNode.gain.setValueAtTime(0.5, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.25);
  };

  // High-hat simulated street crackle
  const playHiHat = (ctx, startTime) => {
    const bufferSize = ctx.sampleRate * 0.05; // very short duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Fill buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(8000, startTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.015, startTime); // very subtle
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.04);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start(startTime);
    noiseNode.stop(startTime + 0.05);
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const togglePlayback = () => {
    initSynth();
    
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      playBeat();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed top-6 right-24 z-40 flex items-center gap-3">
      {/* Visual audio bars */}
      {isPlaying && (
        <div className="flex items-end gap-[3px] h-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-[2px] bg-brand-yellow rounded-full"
              animate={{
                height: [6, 16, 4, 14, 6],
              }}
              transition={{
                duration: 0.8 + i * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
      
      {/* Sleek toggle button */}
      <button
        onClick={togglePlayback}
        className="interactive-hover p-2.5 rounded-full border border-neutral-800 bg-black/60 backdrop-blur-md text-neutral-400 hover:text-brand-yellow hover:border-brand-yellow/50 transition-colors flex items-center justify-center"
        aria-label={isPlaying ? 'Disable street music' : 'Enable street music'}
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </div>
  );
}
