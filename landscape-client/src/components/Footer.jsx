import React from 'react';

const Footer = () => (
  <footer id="footer" className="w-full py-24 px-6 bg-[#050505] border-t border-white/10 text-white/70">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-white/10 pb-20">
      <div className="md:col-span-2 space-y-8">
        <div className="flex items-center gap-4 cursor-pointer group w-max" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* <div className="w-12 h-12 border border-gold rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 21H21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div> */}
          <span className="text-2xl font-extralight text-white tracking-[0.2em] uppercase">
            shivshaktiproperty
          </span>
        </div>
        <p className="text-sm leading-relaxed max-w-sm text-white/50 font-light tracking-wide">
          We are committed to providing an abundance of beautiful starter homes and exclusive properties.
        </p>
      </div>

      <div className="space-y-8">
        <h4 className="text-gold font-light text-xs tracking-[0.3em] uppercase">Company</h4>
        <div className="flex flex-col gap-4 text-xs font-light tracking-[0.1em] text-white/50">
          <a href="/about" className="hover:text-gold transition-colors w-max">About Us</a>
          <a href="#" className="hover:text-gold transition-colors w-max"></a>
          <a href="#" className="hover:text-gold transition-colors w-max"></a>
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-gold font-light text-xs tracking-[0.3em] uppercase">Contact</h4>
        <div className="flex flex-col gap-4 text-xs font-light tracking-[0.1em] text-white/50">
          <p className="hover:text-gold transition-colors cursor-pointer w-max">
            jitendranpatil1980@gmail.com
          </p>
          <p className="hover:text-gold transition-colors cursor-pointer w-max">
            7875194555
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-white/30 font-light tracking-[0.2em] uppercase">
      <p>&copy; {new Date().getFullYear()} shivshaktiproperty. All rights reserved.</p>
      <div className="flex gap-10">
        <a href="#" className="hover:text-gold transition-colors">Privacy</a>
        <a href="#" className="hover:text-gold transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;
