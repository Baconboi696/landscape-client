import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/properties', {
          credentials: 'include',
        });
        if (res.ok) {
          navigate('/admin/dashboard', { replace: true });
        }
      } catch {}
    };
    checkAuth();
  }, [navigate]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (res.ok) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Invalid credentials. Please verify your access.');
      }
    } catch {
      setError('Connection securely interrupted. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans text-white px-4">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-10 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Border Glow */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-12 h-12 border border-gold/50 rounded flex items-center justify-center mx-auto mb-6"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <h1 className="text-3xl font-extralight tracking-widest text-white uppercase mb-2">Portal</h1>
            <p className="text-xs font-light tracking-[0.2em] text-white/40 uppercase">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Digital Address</label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="Enter email"
                value={form.email} 
                onChange={handleChange} 
                className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white tracking-wider" 
              />
            </div>
            
            <div className="space-y-3 relative">
              <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Access Key</label>
              <div className="relative">
                <input 
                  name="password" 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  placeholder="Enter password"
                  value={form.password} 
                  onChange={handleChange} 
                  className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white tracking-wider pr-10" 
                />
                <button 
                  type="button" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group relative">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={form.rememberMe}
                    onChange={handleChange}
                    className="w-3 h-3 border border-white/30 rounded-sm appearance-none cursor-pointer checked:bg-gold checked:border-gold transition-colors peer"
                  />
                  <svg className="w-2 h-2 absolute text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-[10px] font-light uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">Remember Identity</span>
              </label>
              
              <button type="button" className="text-[10px] font-light uppercase tracking-wider text-white/40 hover:text-gold transition-colors">
                Recover Access
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-4 border border-white/20 bg-transparent text-white font-light uppercase tracking-[0.3em] hover:border-gold hover:text-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs relative overflow-hidden group"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gold w-0 group-hover:w-full transition-all duration-700 ease-out z-0 opacity-10" />
              <span className="relative z-10">{loading ? 'Verifying Credentials...' : 'Authenticate'}</span>
            </button>
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="p-4 border border-red-500/50 text-red-500 text-[10px] font-light uppercase tracking-widest text-center bg-red-500/5 overflow-hidden"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
