import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InterestFormModal from './InterestFormModal';

const PropertyDetailsModal = ({ property, onClose }) => {
  const [showInterest, setShowInterest] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('images'); // 'images' | 'videos'

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
      if (res.ok) {
        setSuccess(true);
      } else {
        setError('Failed to send enquiry.');
      }
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

  const images = property.images?.length > 0 ? property.images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'];
  const videos = property.videos || [];
  const hasVideos = videos.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="bg-white w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-[3rem] border border-black/5 shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-20 p-4 bg-white/80 backdrop-blur-md rounded-full border border-black/5 hover:bg-black hover:text-white transition-all shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* ── Left: Media Panel ── */}
            <div className="flex flex-col bg-zinc-50 rounded-tl-[3rem] rounded-bl-[3rem] overflow-hidden">
              {/* Main media display */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {activeTab === 'images' ? (
                  <motion.img
                    key={activeImage}
                    src={images[activeImage]}
                    alt={property.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <video
                    key={activeImage}
                    src={videos[activeImage]}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                  />
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                  {activeTab === 'images'
                    ? `${activeImage + 1} / ${images.length}`
                    : `Video ${activeImage + 1} / ${videos.length}`}
                </div>
              </div>

              {/* Tab switcher — only show if there are videos */}
              {hasVideos && (
                <div className="flex gap-2 px-4 pt-4">
                  <button
                    onClick={() => { setActiveTab('images'); setActiveImage(0); }}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'images' ? 'bg-black text-white' : 'bg-white border border-black/10 text-black/40'}`}
                  >
                    Photos
                  </button>
                  <button
                    onClick={() => { setActiveTab('videos'); setActiveImage(0); }}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'videos' ? 'bg-black text-white' : 'bg-white border border-black/10 text-black/40'}`}
                  >
                    Videos
                  </button>
                </div>
              )}

              {/* Thumbnail strip */}
              <div className="flex gap-2 p-4 overflow-x-auto">
                {(activeTab === 'images' ? images : videos).map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-black scale-105' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    {activeTab === 'images' ? (
                      <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Google Map */}
              <div className="px-4 pb-4">
                <p className="text-[8px] font-black text-black/20 uppercase tracking-[0.3em] mb-2 ml-1">Location</p>
                <iframe
                  title="property-map"
                  width="100%"
                  height="180"
                  style={{ border: 0, borderRadius: '1rem' }}
                  loading="lazy"
                  allowFullScreen
                  src={mapSrc}
                />
              </div>
            </div>

            {/* ── Right: Details Panel ── */}
            <div className="p-10 lg:p-12 space-y-8 overflow-y-auto">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="px-4 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {property.type}
                  </span>
                  <span className="px-4 py-1.5 border border-black/10 text-black/40 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {property.category}
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-3">
                  {property.name}
                </h2>
                <div className="flex items-center gap-2 text-sm font-bold text-black/40 uppercase tracking-[0.2em]">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {locationDisplay}
                </div>
              </div>

              {/* Contact banner */}
              <div className="p-5 bg-zinc-50 rounded-2xl border border-black/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-black text-black uppercase tracking-widest">Contact the seller for more info</p>
                  <p className="text-[9px] text-black/40 font-bold uppercase tracking-wider mt-0.5">Use the enquiry button below to get in touch</p>
                </div>
              </div>

              {/* About */}
              {property.description && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-black/30 tracking-[0.3em] border-b border-black/5 pb-3">About This Property</h3>
                  <p className="text-sm text-black/60 leading-relaxed">{property.description}</p>
                </div>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-black/30 tracking-[0.3em] border-b border-black/5 pb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-zinc-50 border border-black/5 rounded-xl text-[10px] font-bold text-black uppercase tracking-wider"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* City / State detail */}
              {(property.city || property.state) && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-black/30 tracking-[0.3em] border-b border-black/5 pb-3">Location Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {property.city && (
                      <div className="p-4 bg-zinc-50 rounded-xl border border-black/5">
                        <p className="text-[8px] font-black text-black/30 uppercase tracking-widest mb-1">City</p>
                        <p className="text-sm font-black text-black uppercase">{property.city}</p>
                      </div>
                    )}
                    {property.state && (
                      <div className="p-4 bg-zinc-50 rounded-xl border border-black/5">
                        <p className="text-[8px] font-black text-black/30 uppercase tracking-widest mb-1">State</p>
                        <p className="text-sm font-black text-black uppercase">{property.state}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Enquiry Button */}
              {success ? (
                <div className="p-6 bg-black text-white rounded-2xl text-center">
                  <p className="text-sm font-black uppercase tracking-widest mb-1">Enquiry Sent!</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest">Our team will contact you shortly.</p>
                </div>
              ) : (
                <button
                  id={`enquiry-btn-${property._id}`}
                  className="w-full py-5 bg-black text-white font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-3 rounded-2xl shadow-xl shadow-black/10 text-xs"
                  onClick={() => setShowInterest(true)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Enquire About This Property
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

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
