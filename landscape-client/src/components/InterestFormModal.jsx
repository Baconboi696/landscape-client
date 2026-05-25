import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InterestFormModal = ({ property, onClose, onSubmit, submitting, success, error }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-[3rem] p-12 border border-black/5 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-4 bg-zinc-50 rounded-full border border-black/5 hover:bg-black hover:text-white transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="mb-10">
          <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">Enquiry</h2>
          <p className="text-black/30 text-[10px] font-bold uppercase tracking-widest">Connect with our concierge regarding {property.name}.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Identity</label>
            <input name="name" type="text" required placeholder="FULL NAME" value={form.name} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs text-black" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Communication</label>
            <input name="email" type="email" required placeholder="EMAIL ADDRESS" value={form.email} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs text-black" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Contact</label>
            <input name="phone" type="tel" required placeholder="PHONE" value={form.phone} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs text-black" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Narrative</label>
            <textarea name="message" required placeholder="YOUR MESSAGE" value={form.message} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs text-black min-h-[120px]" />
          </div>
          <button
            type="submit"
            className="w-full py-5 bg-black text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 disabled:bg-zinc-300 shadow-xl shadow-black/10"
            disabled={submitting}
          >
            {submitting ? 'Transmitting...' : 'Dispatch Request'}
          </button>
        </form>
        {success && <div className="mt-6 p-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest text-center rounded-xl animate-bounce">SUCCESS. Message received.</div>}
        {error && <div className="mt-6 p-4 border border-black text-black text-[10px] font-bold uppercase tracking-widest text-center rounded-xl">{error}</div>}
      </motion.div>
    </div>
  );
};

export default InterestFormModal;
