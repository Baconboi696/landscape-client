import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    type: 'video',
    src: 'https://cdn.coverr.co/videos/coverr-a-beautiful-modern-home-5079/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    line1: 'Unrivaled Luxury',
    line2: 'Redefining',
    line3: 'Elegance',
    subtext: 'Experience the pinnacle of architectural mastery and bespoke living.',
    cta: 'Explore Estates',
    link: '/properties'
  },
  {
    id: 2,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2689&auto=format&fit=crop',
    line1: 'Timeless Landscapes',
    line2: 'Rooted in',
    line3: 'Nature',
    subtext: 'Experience expansive farmlands where tranquility, open skies, and authentic living come together in perfect harmony.',
    cta: 'Explore Farmlands',
    link: '/properties?category=farmland'
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {slide.type === 'video' ? (
            <motion.video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60"
              poster={slide.poster}
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 10, ease: "linear" }}
            >
              <source src={slide.src} type="video/mp4" />
            </motion.video>
          ) : (
            <motion.div
              className="w-full h-full bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url(${slide.src})` }}
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 10, ease: "linear" }}
            />
          )}
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 opacity-90" />
          <div className="absolute inset-0 bg-[#050505]/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-20 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center pointer-events-auto"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight leading-[1.1] mb-8 drop-shadow-2xl">
              <span className="block mb-2">{slide.line1}</span>
              <span className="block font-serif italic text-gold">{slide.line2}</span>
              <span className="block uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xl sm:text-4xl md:text-5xl lg:text-6xl mt-6">{slide.line3}</span>
            </h1>

            <div className="w-16 h-[1px] bg-gold/50 mx-auto mb-8" />
            
            <p className="text-white/70 font-light text-xs md:text-sm tracking-[0.1em] sm:tracking-[0.2em] leading-loose max-w-2xl uppercase mb-10 drop-shadow-lg">
              {slide.subtext}
            </p>

            <button
              onClick={() => navigate(slide.link)}
              className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-transparent border border-white/20 text-white font-light uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs overflow-hidden transition-all hover:border-gold"
            >
              <div className="absolute inset-0 w-0 bg-gold transition-all duration-700 ease-out group-hover:w-full z-0 opacity-10" />
              <span className="relative z-10 group-hover:text-gold transition-colors duration-700">{slide.cta}</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-500 ease-out ${current === index ? 'w-10 h-1 bg-gold' : 'w-4 h-1 bg-white/20 hover:bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
