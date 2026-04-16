import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropertyDetailsModal from './PropertyDetailsModal';

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);

  // Prefer separate city/state, fall back to legacy location string
  const locationDisplay = property.city && property.state
    ? `${property.city}, ${property.state}`
    : property.location || '';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="group relative bg-white border border-black/5 rounded-[3rem] overflow-hidden hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] transition-all duration-700"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
            alt={property.name}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />

          <div className="absolute top-8 left-8 flex gap-2">
            <span className="px-5 py-2.5 bg-white/80 backdrop-blur-xl text-[9px] font-black text-black uppercase tracking-[0.2em] rounded-full border border-black/5 shadow-xl shadow-black/5">
              {property.type}
            </span>
            <span className="px-5 py-2.5 bg-white/80 backdrop-blur-xl text-[9px] font-black text-black/50 uppercase tracking-[0.2em] rounded-full border border-black/5 shadow-xl shadow-black/5">
              {property.category}
            </span>
          </div>
        </div>

        <div className="p-10 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">
                {property.name}
              </h3>
              <div className="w-1.5 h-1.5 bg-black/10 rounded-full group-hover:bg-black transition-colors duration-500" />
            </div>
            <p className="text-[9px] font-bold text-black/30 uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-black/5" />
              {locationDisplay}
            </p>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-black/5">
            <span className="text-[9px] font-bold text-black/30 uppercase tracking-widest">Contact for details</span>
            <button
              id={`details-btn-${property._id || property.id}`}
              className="px-6 py-3 bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-black/10"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
            >
              Details
            </button>
          </div>
        </div>
      </motion.div>
      {showModal && (
        <PropertyDetailsModal property={property} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default PropertyCard;
