import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InterestFormModal = ({ property, onClose, onSubmit, submitting, success, error }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); onSubmit(form); };

  const fields = [
    { name: 'name',    type: 'text',  placeholder: 'Full Name',      label: 'Name',    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'email',   type: 'email', placeholder: 'Email Address',   label: 'Email',   icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'phone',   type: 'tel',   placeholder: 'Phone Number',    label: 'Phone',   icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full sm:max-w-lg bg-[#0a0a0a] border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Gold accent top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300 group"
        >
          <svg className="w-4 h-4 text-white/50 group-hover:text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-7 pt-8 pb-8">
          {/* Header */}
          <div className="mb-8 pr-8">
            <span className="text-[10px] font-light text-[#c9a84c] uppercase tracking-[0.3em] block mb-2">Property Enquiry</span>
            <h2 className="text-2xl font-extralight text-white tracking-tight leading-snug">
              {property?.name || 'Property'}
            </h2>
            <div className="w-8 h-[1px] bg-[#c9a84c]/50 mt-3" />
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-14 h-14 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-extralight text-lg mb-2">Enquiry Sent</p>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-light">Our team will reach out to you shortly</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(({ name, type, placeholder, label, icon }) => (
                <div key={name} className="group relative">
                  <label className="block text-[9px] font-light text-white/30 uppercase tracking-[0.25em] mb-1.5 ml-1">
                    {label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c9a84c] transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon} />
                      </svg>
                    </span>
                    <input
                      name={name}
                      type={type}
                      required
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-white/3 border border-white/8 rounded-xl text-sm text-white/80 placeholder-white/20 font-light outline-none focus:border-[#c9a84c]/50 focus:bg-white/5 transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    />
                  </div>
                </div>
              ))}

              {/* Message */}
              <div className="group">
                <label className="block text-[9px] font-light text-white/30 uppercase tracking-[0.25em] mb-1.5 ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell us about your requirements..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3.5 bg-white/3 border border-white/8 rounded-xl text-sm text-white/80 placeholder-white/20 font-light outline-none focus:border-[#c9a84c]/50 focus:bg-white/5 transition-all duration-300 resize-none"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                />
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400/70 text-[10px] uppercase tracking-widest text-center font-light"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group w-full py-4 relative overflow-hidden border border-[#c9a84c]/50 text-[#c9a84c] font-light uppercase tracking-[0.25em] text-xs rounded-xl transition-all duration-500 hover:border-[#c9a84c] disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                <span className="absolute inset-0 bg-[#c9a84c] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out group-disabled:hidden" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-500 flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Enquiry
                    </>
                  )}
                </span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InterestFormModal;
