import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InterestFormModal from './InterestFormModal';

const PropertyDetailsModal = ({ property, onClose }) => {
  const [showInterest, setShowInterest] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('images');

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleInterestSubmit = async (form) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/properties/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, propertyId: property._id || property.id }),
      });
      if (res.ok) setSuccess(true);
      else setError('Failed to send enquiry.');
    } catch {
      setError('Failed to send enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!property) return null;

  const locationDisplay = property.city && property.state
    ? `${property.city}, ${property.state}`
    : property.location || '';

  const hasCoordinates = property.coordinates?.lat && property.coordinates?.lng;
  const mapSrc = hasCoordinates
    ? `https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(locationDisplay)}&output=embed`;

  const images = property.images?.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'];
  const videos = property.videos || [];
  const hasVideos = videos.length > 0;
  const mediaList = activeTab === 'images' ? images : videos;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full sm:max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
          style={{ maxHeight: '95vh' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Gold top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent z-10" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 text-white/60 group-hover:text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="overflow-y-auto" style={{ maxHeight: '95vh' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* ── LEFT: Media Panel ── */}
              <div className="flex flex-col bg-[#080808] border-r border-white/5">

                {/* Main Media */}
                <div className="relative overflow-hidden bg-[#050505]" style={{ aspectRatio: '4/3' }}>
                  {activeTab === 'images' ? (
                    <motion.img
                      key={`img-${activeImage}`}
                      src={images[activeImage]}
                      alt={property.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <video
                      key={`vid-${activeImage}`}
                      src={videos[activeImage]}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Counter badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm border border-white/10 text-[#c9a84c] text-[10px] font-light uppercase tracking-[0.25em] rounded-full">
                    {activeTab === 'images'
                      ? `${activeImage + 1} / ${images.length}`
                      : `Video ${activeImage + 1} / ${videos.length}`}
                  </div>

                  {/* Nav arrows */}
                  {mediaList.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImage(i => (i - 1 + mediaList.length) % mediaList.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-white/10 hover:border-[#c9a84c]/50 text-white/70 hover:text-[#c9a84c] transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button
                        onClick={() => setActiveImage(i => (i + 1) % mediaList.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-white/10 hover:border-[#c9a84c]/50 text-white/70 hover:text-[#c9a84c] transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Tab switcher */}
                {hasVideos && (
                  <div className="flex gap-2 px-4 pt-4 pb-1">
                    {['images', 'videos'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setActiveImage(0); }}
                        className={`px-5 py-2 text-[10px] font-light uppercase tracking-[0.2em] rounded-full border transition-all duration-300 ${
                          activeTab === tab
                            ? 'bg-[#c9a84c] border-[#c9a84c] text-black'
                            : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                )}

                {/* Thumbnails */}
                <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide">
                  {mediaList.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        activeImage === idx
                          ? 'border-[#c9a84c] opacity-100 scale-105'
                          : 'border-white/5 opacity-40 hover:opacity-70 hover:border-white/20'
                      }`}
                    >
                      {activeTab === 'images' ? (
                        <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#111] flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#c9a84c]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Map */}
                <div className="px-4 pb-4">
                  <p className="text-[9px] font-light text-white/30 uppercase tracking-[0.3em] mb-2 ml-1 flex items-center gap-2">
                    <svg className="w-3 h-3 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Location
                  </p>
                  <div className="overflow-hidden rounded-xl border border-white/5">
                    <iframe
                      title="property-map"
                      width="100%"
                      height="180"
                      style={{ border: 0, display: 'block', filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                      loading="lazy"
                      allowFullScreen
                      src={mapSrc}
                    />
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Details Panel ── */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6 overflow-y-auto bg-[#0a0a0a]">

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap pt-6 lg:pt-0">
                  {property.type && (
                    <span className="px-4 py-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[10px] font-light uppercase tracking-[0.2em] rounded-full">
                      {property.type}
                    </span>
                  )}
                  {property.category && (
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/40 text-[10px] font-light uppercase tracking-[0.2em] rounded-full">
                      {property.category}
                    </span>
                  )}
                </div>

                {/* Title & Location */}
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extralight text-white leading-tight tracking-tight mb-3">
                    {property.name}
                  </h2>
                  {locationDisplay && (
                    <div className="flex items-center gap-2 text-white/40 text-xs font-light uppercase tracking-[0.2em]">
                      <span className="w-4 h-[1px] bg-[#c9a84c]" />
                      {locationDisplay}
                    </div>
                  )}
                </div>

                {/* Price */}
                {property.price && (
                  <div className="py-4 border-y border-white/5">
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mb-1">Price</p>
                    <p className="text-2xl font-extralight text-[#c9a84c]">
                      ₹{Number(property.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                )}

                {/* Description */}
                {property.description && (
                  <div>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                      <span className="w-3 h-[1px] bg-[#c9a84c]" /> About
                    </p>
                    <p className="text-sm text-white/60 leading-relaxed font-light">
                      {property.description}
                    </p>
                  </div>
                )}

                {/* Amenities */}
                {property.amenities?.length > 0 && (
                  <div>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                      <span className="w-3 h-[1px] bg-[#c9a84c]" /> Amenities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/50 text-[10px] font-light uppercase tracking-wider rounded-lg hover:border-[#c9a84c]/30 hover:text-white/80 transition-all"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Details */}
                {(property.city || property.state) && (
                  <div className="grid grid-cols-2 gap-3">
                    {property.city && (
                      <div className="p-4 bg-white/3 border border-white/5 rounded-xl hover:border-white/10 transition-all">
                        <p className="text-[8px] text-white/30 uppercase tracking-widest mb-1">City</p>
                        <p className="text-sm font-light text-white">{property.city}</p>
                      </div>
                    )}
                    {property.state && (
                      <div className="p-4 bg-white/3 border border-white/5 rounded-xl hover:border-white/10 transition-all">
                        <p className="text-[8px] text-white/30 uppercase tracking-widest mb-1">State</p>
                        <p className="text-sm font-light text-white">{property.state}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Spacer */}
                <div className="flex-1" />

                {/* CTA */}
                <div className="pt-4">
                  {success ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl text-center"
                    >
                      <p className="text-[#c9a84c] text-xs font-light uppercase tracking-[0.2em] mb-1">Enquiry Sent</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest">Our team will contact you shortly.</p>
                    </motion.div>
                  ) : (
                    <button
                      id={`enquiry-btn-${property._id}`}
                      onClick={() => setShowInterest(true)}
                      className="group w-full py-4 relative overflow-hidden border border-[#c9a84c]/50 text-[#c9a84c] font-light uppercase tracking-[0.25em] text-xs rounded-xl transition-all duration-500 hover:border-[#c9a84c]"
                    >
                      <span className="absolute inset-0 bg-[#c9a84c] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      <span className="relative z-10 group-hover:text-black transition-colors duration-500 flex items-center justify-center gap-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Enquire About This Property
                      </span>
                    </button>
                  )}
                  {error && (
                    <p className="mt-3 text-center text-[10px] text-red-400/70 uppercase tracking-widest">{error}</p>
                  )}
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interest Form Modal */}
      {showInterest && (
        <InterestFormModal
          property={property}
          onClose={() => { setShowInterest(false); setSuccess(false); setError(null); }}
          onSubmit={handleInterestSubmit}
          submitting={submitting}
          success={success}
          error={error}
        />
      )}
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;
