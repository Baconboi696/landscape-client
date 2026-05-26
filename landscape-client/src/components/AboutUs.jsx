import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => (
  <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
    {/* Background pattern */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
    <div className="absolute -top-[30%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />
    <div className="max-w-5xl mx-auto relative z-10 pt-32 pb-24 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extralight text-center tracking-tight mb-8"
      >
        About <span className="font-serif italic text-gold">Shiv Shakti Property</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
      >
        Founded on the principle of timeless luxury, Shiv Shakti Property curates a collection of premium residences that blend architectural excellence with meticulous craftsmanship. Our mission is to provide discerning clients with an unparalleled home‑buying experience, where every detail reflects elegance, exclusivity, and a deep respect for heritage.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
      >
        <div className="border border-white/10 p-6 rounded-2xl hover:border-gold/30 transition-all">
          <h3 className="text-xl font-light text-gold mb-2">Vision</h3>
          <p className="text-sm text-white/60">To set the benchmark for luxury real‑estate, redefining standards of quality and service.</p>
        </div>
        <div className="border border-white/10 p-6 rounded-2xl hover:border-gold/30 transition-all">
          <h3 className="text-xl font-light text-gold mb-2">Mission</h3>
          <p className="text-sm text-white/60">Deliver curated, high‑end properties that resonate with the aspirations of elite clientele.</p>
        </div>
        <div className="border border-white/10 p-6 rounded-2xl hover:border-gold/30 transition-all">
          <h3 className="text-xl font-light text-gold mb-2">Values</h3>
          <p className="text-sm text-white/60">Excellence, integrity, and unwavering commitment to client satisfaction.</p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default AboutUs;
