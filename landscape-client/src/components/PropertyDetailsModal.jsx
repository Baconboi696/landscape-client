import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InterestFormModal from './InterestFormModal';

const PropertyDetailsModal = ({ property, onClose }) => {
  const [showInterest, setShowInterest] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleInterestSubmit = async (form) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:5000/api/properties/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, propertyId: property._id || property.id }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError('Failed to send interest.');
      }
    } catch {
      setError('Failed to send interest.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!property) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] border border-black/5 shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-10 p-4 bg-white/80 backdrop-blur-md rounded-full border border-black/5 hover:bg-black hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="h-[400px] md:h-full bg-zinc-50">
              <img
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                alt={property.name}
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <div className="p-12 space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {property.type}
                  </span>
                  <span className="text-black/20 text-xs italic uppercase tracking-widest">{property.category}</span>
                </div>
                <h2 className="text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">{property.name}</h2>
                <p className="text-sm font-bold text-black/40 uppercase tracking-[0.2em]">{property.location}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-black/30 tracking-[0.3em]">Intelligence</h3>
                <p className="text-sm text-black/60 leading-relaxed font-medium">{property.description}</p>
              </div>
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-4">
                  <span className="font-semibold text-gray-800">Amenities:</span>
                  <ul className="list-disc ml-6 text-gray-600">
                    {property.amenities.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* If there are multiple images, show a simple carousel */}
              {property.images && property.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Property ${idx}`} className="h-20 w-32 object-cover rounded" />
                  ))}
                </div>
              )}
              {/* Google Maps iframe */}
              <div className="mt-4">
                <iframe
                  title="map"
                  width="100%"
                  height="180"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                />
              </div>
              <button
                className="mt-8 w-full py-5 bg-black text-white font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-3 rounded-2xl shadow-xl shadow-black/10"
                onClick={() => setShowInterest(true)}
              >
                Acquire Interest
              </button>
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
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;
