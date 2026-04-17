import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
        >
          <source src="https://cdn.coverr.co/videos/coverr-a-beautiful-modern-home-5079/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#050505]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-20"
      >
        <motion.span
          initial={{ opacity: 0, tracking: '0px' }}
          animate={{ opacity: 1, tracking: '10px' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-gold text-sm md:text-base font-semibold uppercase tracking-[10px] mb-6 block"
        >
          Unrivaled Luxury
        </motion.span>

        <h1 className="text-6xl md:text-8xl font-extralight text-white mb-8 leading-tight tracking-tight">
          Redefining <br /> <span className="font-serif italic text-gold">Elegance</span>
        </h1>

        <p className="text-lg md:text-2xl text-white/70 mb-12 max-w-2xl font-light">
          Experience the pinnacle of architectural mastery and bespoke living.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <button
            className="group relative px-10 py-4 bg-transparent border border-white/30 text-white font-light uppercase tracking-widest overflow-hidden transition-all hover:border-gold"
            onClick={() => navigate('/properties')}
          >
            <div className="absolute inset-0 w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Explore Properties</span>
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-white/50 uppercase tracking-widest">Scroll to discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
