import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-700 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-12 border border-gold/50 rounded-full flex items-center justify-center text-gold group-hover:border-gold transition-all duration-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 21H21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-extralight text-white tracking-[0.2em] uppercase group-hover:text-gold transition-colors duration-500">
            shivshaktiproperty
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-12">
          <button
            className="text-xs font-light text-white/70 hover:text-gold transition-colors tracking-[0.15em] uppercase relative group"
            onClick={() => navigate('/')}
          >
            Home
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            className="text-xs font-light text-white/70 hover:text-gold transition-colors tracking-[0.15em] uppercase relative group"
            onClick={() => navigate('/properties')}
          >
            Properties
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            className="px-8 py-3 bg-white text-black text-xs font-medium uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </button>
        </div>

        <button
          className="md:hidden p-2 text-white/70 hover:text-gold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}></path></svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden flex flex-col items-center justify-center space-y-8"
          >
            <button className="text-2xl font-extralight text-white tracking-[0.2em] uppercase hover:text-gold transition-colors" onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</button>
            <button className="text-2xl font-extralight text-white tracking-[0.2em] uppercase hover:text-gold transition-colors" onClick={() => { navigate('/properties'); setMenuOpen(false); }}>Properties</button>
            <button className="mt-8 px-10 py-4 border border-gold text-gold font-light tracking-[0.2em] uppercase hover:bg-gold hover:text-black transition-all" onClick={() => { navigate('/contact'); setMenuOpen(false); }}>Contact Us</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
