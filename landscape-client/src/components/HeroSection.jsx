import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-24 md:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-white -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center space-y-10"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2 text-black/40 text-[9px] font-bold uppercase tracking-[0.4em] border border-black/5 rounded-full bg-zinc-50 shadow-sm">
          <span className="w-1 h-1 bg-black rounded-full animate-pulse"></span>
          Elite Portfolio
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-7xl md:text-[10rem] font-black text-black leading-[0.85] tracking-tighter uppercase">
          Elite <br />
          Living.
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xs md:text-sm text-black/40 font-bold max-w-sm mx-auto leading-relaxed uppercase tracking-[0.2em] pt-4">
          Curating prestigious properties for those who demand excellence in every detail.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-12">
          <button
            className="w-full sm:w-auto px-14 py-6 bg-black text-white font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95 rounded-2xl shadow-xl shadow-black/10 text-[10px]"
            onClick={() => navigate('/properties')}
          >
            Collection
          </button>
          <button
            className="w-full sm:w-auto px-14 py-6 bg-white text-black border border-black/10 font-bold uppercase tracking-[0.3em] hover:bg-zinc-50 transition-all active:scale-95 rounded-2xl text-[10px]"
            onClick={() => {
              document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Inquire
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
