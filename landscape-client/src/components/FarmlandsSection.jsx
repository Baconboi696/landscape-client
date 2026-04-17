import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FarmlandsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden border-y border-white/5">
      {/* Background with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2689&auto=format&fit=crop')] bg-cover bg-center"
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.1 }}
        transition={{ duration: 30, ease: "linear" }}
        viewport={{ once: true }}
      />
      
      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-transparent opacity-80" />
      <div className="absolute inset-0 z-10 bg-[#050505]/30" />
      
      {/* Content Container */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4 mb-10"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight leading-[1.1]">
            <span className="block mb-2">Timeless Landscapes</span>
            <span className="block font-serif italic text-gold">Rooted in</span>
            <span className="block uppercase tracking-[0.3em] text-4xl md:text-5xl lg:text-6xl mt-8">Nature</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="w-16 h-[1px] bg-gold/50 mx-auto mb-10" />
          <p className="text-white/60 font-light text-xs md:text-sm tracking-[0.2em] leading-loose mb-12 uppercase">
            Experience expansive farmlands where tranquility, open skies, and authentic living come together in perfect harmony.
          </p>
          
          <button
            onClick={() => navigate('/properties?category=farmland')}
            className="group relative px-12 py-5 bg-transparent border border-white/20 text-white font-light uppercase tracking-[0.2em] overflow-hidden transition-all hover:border-gold"
          >
            <div className="absolute inset-0 w-0 bg-gold transition-all duration-700 ease-out group-hover:w-full z-0 opacity-10" />
            <span className="relative z-10 group-hover:text-gold transition-colors duration-700">Explore Farmlands</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FarmlandsSection;
