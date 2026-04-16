import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        body: JSON.stringify(form),
      });
      if (res.ok) {
        navigate('/admin/dashboard');
      } else {
        setError('Login failed');
      }
    } catch {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50/50">
      <form onSubmit={handleSubmit} className="bg-white border border-black/5 p-16 w-full max-w-lg flex flex-col gap-10 rounded-[3.5rem] shadow-2xl shadow-black/5">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20 animate-pulse">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">System Access</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest leading-none">Security Protocol Active</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Identity</label>
            <input name="email" type="email" required placeholder="EMAIL" value={form.email} onChange={handleChange} className="w-full px-6 py-5 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs placeholder:opacity-20" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Secret Key</label>
            <input name="password" type="password" required placeholder="PASSWORD" value={form.password} onChange={handleChange} className="w-full px-6 py-5 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs placeholder:opacity-20" />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 py-6 bg-black text-white font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95 disabled:bg-zinc-300 rounded-2xl shadow-xl shadow-black/10 text-xs"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Enter System'}
        </button>
        {error && <div className="p-4 bg-zinc-50 border border-black/5 text-black text-[9px] font-bold uppercase tracking-widest text-center rounded-xl">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
