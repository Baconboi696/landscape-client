import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropertyDetailsModal from './PropertyDetailsModal';

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);

  const locationDisplay = property.city && property.state
    ? `${property.city}, ${property.state}`
    : property.location || '';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="group bg-[#0a0a0a] overflow-hidden flex flex-col cursor-pointer h-full border border-white/5 hover:border-gold/30 transition-all duration-700"
        onClick={() => setShowModal(true)}
      >
        <div className="relative h-80 overflow-hidden bg-[#111]">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700 z-10" />
          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute top-6 left-6 z-20 flex gap-3">
            <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-light tracking-[0.2em] uppercase">
              {property.type}
            </span>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1 bg-[#0a0a0a] group-hover:bg-[#111] transition-colors duration-700">
          <div className="mb-6">
            <h3 className="text-2xl font-extralight text-white leading-tight mb-3">
              {property.name}
            </h3>
            <p className="text-white/40 text-xs tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-[1px] bg-gold" />
              {locationDisplay}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-xl font-light text-gold">
              {property.price ? `$${property.price.toLocaleString()}` : 'Price on Request'}
            </span>
            <span className="text-xs font-light text-white/50 uppercase tracking-[0.2em] group-hover:text-white transition-colors flex items-center gap-2">
              Discover <span className="group-hover:translate-x-2 transition-transform duration-500">&rarr;</span>
            </span>
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
