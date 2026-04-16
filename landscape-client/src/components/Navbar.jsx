import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full py-4 px-8 glass-morphism sticky top-0 z-50 flex justify-between items-center transition-all duration-300">
      <div
        className="flex items-center gap-4 cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black rounded-2xl shadow-2xl shadow-black/10 transition-all duration-500 group-hover:rotate-45"
          />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="relative z-10 text-white group-hover:scale-110 transition-transform duration-500"
          >
            <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 21V12H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-2xl font-black tracking-tighter text-black uppercase leading-none">
            LandScape
          </span>
          <span className="text-[8px] font-bold tracking-[0.4em] text-black/20 uppercase">
            Elite Real Estate
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-10">
        <button
          className="text-xs font-black uppercase tracking-[0.2em] text-black hover:opacity-50 transition-all relative group"
          onClick={() => navigate('/')}
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-black transition-all group-hover:w-full" />
        </button>
        <button
          className="text-xs font-black uppercase tracking-[0.2em] text-black hover:opacity-50 transition-all relative group"
          onClick={() => navigate('/properties')}
        >
          Properties
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-black transition-all group-hover:w-full" />
        </button>
        <button
          className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-95 rounded-full"
          onClick={() => navigate('/properties')}
        >
          Explore
        </button>
      </div>

      <button
        className="md:hidden p-4 border border-black/5 bg-zinc-50 rounded-full hover:bg-black hover:text-white group transition-all"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="w-5 h-0.5 bg-black group-hover:bg-white mb-1.5 rounded-full" />
        <div className="w-5 h-0.5 bg-black group-hover:bg-white mb-1.5 rounded-full" />
        <div className="w-5 h-0.5 bg-black group-hover:bg-white rounded-full" />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-6 right-6 bg-white border border-black/5 p-8 md:hidden flex flex-col space-y-6 rounded-[2.5rem] shadow-2xl z-[60]"
          >
            <button className="text-2xl font-black uppercase text-black text-left tracking-tighter" onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</button>
            <button className="text-2xl font-black uppercase text-black text-left tracking-tighter" onClick={() => { navigate('/properties'); setMenuOpen(false); }}>Properties</button>
            <button className="w-full py-5 bg-black text-white font-bold uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-black/10" onClick={() => { navigate('/properties'); setMenuOpen(false); }}>Explore</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
