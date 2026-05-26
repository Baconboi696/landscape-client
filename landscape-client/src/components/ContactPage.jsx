import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Contact Us | Shiv Shakti Property';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/properties/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form), // No propertyId, signifying a general inquiry
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to dispatch request. Please try again.');
      }
    } catch (err) {
      setError('A connection issue occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Get In Touch</span>
          <h1 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
            Connect With <span className="font-serif italic text-gold">Shiv Shakti</span>
          </h1>
          <div className="w-12 h-[1px] bg-gold mx-auto" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-light text-white tracking-wide mb-3">Our Concierge Desk</h2>
              <p className="text-white/40 text-xs font-light tracking-[0.15em] leading-relaxed uppercase">
                Reach out to our specialists directly or submit an enquiry form. We are here to guide you home.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {/* Phone Card */}
              <div className="bg-[#0a0a0a] p-8 border border-white/5 rounded-2xl hover:border-gold/30 transition-all duration-500 group flex items-start gap-5">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">Direct Call</h4>
                  <a href="tel:+917875194555" className="text-sm font-light text-white/80 hover:text-gold transition-colors tracking-widest">
                    +91 78751 94555
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-[#0a0a0a] p-8 border border-white/5 rounded-2xl hover:border-gold/30 transition-all duration-500 group flex items-start gap-5">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">Email Correspondence</h4>
                  <a href="mailto:jitendranpatil1980@gmail.com" className="text-sm font-light text-white/80 hover:text-gold transition-colors tracking-wide block truncate">
                    jitendranpatil1980@gmail.com
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-[#0a0a0a] p-8 border border-white/5 rounded-2xl hover:border-gold/30 transition-all duration-500 group flex items-start gap-5">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">Corporate HQ</h4>
                  <p className="text-sm font-light text-white/80 tracking-wide">
                    Pen, Raigad, Maharashtra
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Integration Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/917875194555?text=Hi%20Shiv%20Shakti%20Property%20concierge,%20I%20would%20like%20to%20enquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] font-bold uppercase tracking-[0.2em] hover:bg-[#25d366] hover:text-black transition-all duration-500 flex items-center justify-center gap-3 rounded-2xl shadow-xl hover:shadow-[#25d366]/10 text-xs"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.505 0 9.989-4.478 9.99-9.985A9.983 9.983 0 0 0 12.012 2zm4.957 14.128c-.272.763-1.39 1.488-1.921 1.58-.466.082-.924.32-3.033-.512-2.544-1.002-4.148-3.578-4.275-3.748-.125-.17-1.082-1.439-1.082-2.744 0-1.306.685-1.946.928-2.201.244-.255.53-.32.707-.32.177 0 .354.002.508.01.16.007.377-.06.589.453.218.528.747 1.821.81 1.954.065.132.109.287.022.462-.087.177-.13.287-.26.44-.13.153-.272.34-.39.456-.13.13-.267.271-.115.533.152.26.674 1.112 1.442 1.797.989.88 1.822 1.152 2.08 1.282.26.13.411.109.564-.067.153-.177.658-.763.832-1.023.175-.26.347-.218.585-.13.24.088 1.517.714 1.777.844.262.13.435.196.497.306.062.11.062.639-.21 1.402z" />
                </svg>
                Instant WhatsApp Concierge
              </a>
            </div>
          </motion.div>

          {/* Right Column: Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-7 bg-[#0a0a0a] p-8 md:p-12 border border-white/5 rounded-3xl"
          >
            <div className="mb-10">
              <h3 className="text-2xl font-light text-white tracking-wide mb-2">Request Information</h3>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                Our concierge service will process your request within 24 hours.
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 border border-gold/30 bg-gold/5 rounded-2xl text-center space-y-4"
              >
                <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center text-gold mx-auto animate-pulse">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-light text-white tracking-wider uppercase">Enquiry Dispatched</h4>
                <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                  Thank you. Your message has been saved and routed to our team. An agent will contact you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] ml-1">Identity</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="FULL NAME"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:bg-black focus:border-gold outline-none transition-all font-light uppercase tracking-widest text-xs text-white placeholder:text-white/20"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] ml-1">Contact Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="PHONE NUMBER"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:bg-black focus:border-gold outline-none transition-all font-light uppercase tracking-widest text-xs text-white placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] ml-1">Communication Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="EMAIL ADDRESS"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:bg-black focus:border-gold outline-none transition-all font-light uppercase tracking-widest text-xs text-white placeholder:text-white/20"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] ml-1">Narrative Requirements</label>
                  <textarea
                    name="message"
                    required
                    placeholder="HOW CAN WE ASSIST YOU?"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:bg-black focus:border-gold outline-none transition-all font-light uppercase tracking-widest text-xs text-white placeholder:text-white/20 resize-none min-h-[140px]"
                  />
                </div>

                {error && (
                  <div className="p-4 border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-light tracking-wide rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.3em] rounded-2xl hover:bg-gold hover:text-black transition-all duration-500 disabled:bg-white/20 disabled:text-white/40 shadow-xl shadow-black/20 text-xs"
                >
                  {submitting ? 'Transmitting Request...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 border border-white/5 rounded-3xl overflow-hidden bg-[#0a0a0a]"
        >
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Office Location Map</h3>
            <span className="text-[10px] text-gold tracking-widest uppercase">Pune, Maharashtra</span>
          </div>
          <div className="relative w-full h-[400px] grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-90 transition-all duration-1000">
            <iframe
              title="office-location-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360341774!2d73.79292679234851!3d18.5248706173003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
