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
      const res = await fetch('http://localhost:5000/api/interest', {
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
          className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-purple-600 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          <img src={property.image} alt={property.name} className="w-full h-56 object-cover rounded mb-4" />
          <h2 className="text-2xl font-bold text-purple-700 mb-2">{property.name}</h2>
          <p className="text-pink-500 font-medium mb-1">{property.category ? property.category.charAt(0).toUpperCase() + property.category.slice(1) : ''}</p>
          <p className="text-gray-600 mb-2">Location: {property.location}</p>
          <p className="text-xl font-bold text-gray-900 mb-3">Price: {property.price}</p>
          <p className="font-semibold text-gray-800 mb-1">Description:</p>
          <p className="text-gray-700 mb-4">{property.description}</p>
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
            className="mt-6 w-full py-2 rounded bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition"
            onClick={() => setShowInterest(true)}
          >
            I am Interested
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;
