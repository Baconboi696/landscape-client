import React from 'react';

const Footer = () => (
  <footer id="footer" className="w-full py-24 px-8 bg-black text-white">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 border-b border-white/10 pb-24">
      <div className="space-y-8">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl shadow-white/5 transition-all duration-500 group-hover:rotate-45" />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="relative z-10 text-black group-hover:scale-110 transition-transform duration-500"
            >
              <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 21V12H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">
              LandScape
            </span>
            <span className="text-[8px] font-bold tracking-[0.4em] text-white/20 uppercase">
              Elite Real Estate
            </span>
          </div>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-loose opacity-40 max-w-xs">
          Crafting elite living experiences with the most prestigious properties in the global market.
        </p>
      </div>

      <div className="space-y-8">
        <h4 className="text-white/20 font-black uppercase text-[10px] tracking-[0.4em]">Network</h4>
        <div className="flex flex-col gap-5 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-white transition-all opacity-40 hover:opacity-100 flex items-center gap-3">
            <span className="w-4 h-[1px] bg-white/20"></span> Instagram
          </a>
          <a href="#" className="hover:text-white transition-all opacity-40 hover:opacity-100 flex items-center gap-3">
            <span className="w-4 h-[1px] bg-white/20"></span> LinkedIn
          </a>
          <a href="#" className="hover:text-white transition-all opacity-40 hover:opacity-100 flex items-center gap-3">
            <span className="w-4 h-[1px] bg-white/20"></span> Twitter
          </a>
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-white/20 font-black uppercase text-[10px] tracking-[0.4em]">Direct</h4>
        <div className="flex flex-col gap-5 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p className="opacity-40 hover:opacity-100 transition-opacity flex items-center gap-3 cursor-pointer">
            <span className="w-4 h-[1px] bg-white/20"></span> contact@landscape.com
          </p>
          <p className="opacity-40 hover:opacity-100 transition-opacity flex items-center gap-3 cursor-pointer">
            <span className="w-4 h-[1px] bg-white/20"></span> +1 (555) ELITE-01
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-[0.4em]">
      <p className="opacity-20">&copy; {new Date().getFullYear()} LandScape. Built for Excellence.</p>
      <div className="flex gap-12">
        <a href="/admin/login" className="hover:text-white opacity-20 transition-all">System</a>
        <a href="#" className="hover:text-white opacity-20 transition-all">Privacy Policy</a>
        <a href="#" className="hover:text-white opacity-20 transition-all">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
