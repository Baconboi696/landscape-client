import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropertyDetailsModal from './PropertyDetailsModal';

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);

  const locationDisplay = property.city && property.state
    ? `${property.city}, ${property.state}`
    : property.location || '';

  const price = property.price
    ? `₹${Number(property.price).toLocaleString('en-IN')}`
    : 'Price on Request';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        whileHover={{ y: -4 }}
        className="group relative bg-[#0a0a0a] overflow-hidden flex flex-col cursor-pointer h-full border border-white/5 hover:border-[#c9a84c]/30 rounded-2xl transition-all duration-700 shadow-xl shadow-black/40"
        onClick={() => setShowModal(true)}
        role="button"
        aria-label={`View details for ${property.name}`}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setShowModal(true)}
      >
        {/* Image */}
        <div className="relative h-56 md:h-72 overflow-hidden bg-[#111] rounded-t-2xl">
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-700 z-10" />

          {/* Gold shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%)' }}
          />

          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />

          {/* Top badge */}
          <div className="absolute top-4 left-4 z-20 flex gap-2 flex-wrap">
            {property.type && (
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-white/80 text-[9px] font-light tracking-[0.2em] uppercase rounded-full">
                {property.type}
              </span>
            )}
            {property.category && (
              <span className="px-3 py-1 bg-[#c9a84c]/20 backdrop-blur-md border border-[#c9a84c]/30 text-[#c9a84c] text-[9px] font-light tracking-[0.2em] uppercase rounded-full">
                {property.category}
              </span>
            )}
          </div>

          {/* View label on hover */}
          <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span className="px-4 py-2 bg-[#c9a84c] text-black text-[9px] font-medium uppercase tracking-[0.2em] rounded-full">
              View Details →
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 gap-4">
          {/* Title & Location */}
          <div>
            <h3 className="text-xl font-extralight text-white leading-snug tracking-tight mb-2 group-hover:text-white transition-colors">
              {property.name}
            </h3>
            {locationDisplay && (
              <p className="text-white/35 text-[10px] font-light tracking-[0.2em] uppercase flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c9a84c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {locationDisplay}
              </p>
            )}
          </div>

          {/* Description snippet */}
          {property.description && (
            <p className="text-white/25 text-xs font-light leading-relaxed line-clamp-2">
              {property.description}
            </p>
          )}

          {/* Amenities preview */}
          {property.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {property.amenities.slice(0, 3).map((a, i) => (
                <span key={i} className="px-2.5 py-1 bg-white/4 border border-white/6 text-white/35 text-[9px] font-light uppercase tracking-wider rounded-lg">
                  {a}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="px-2.5 py-1 bg-white/4 border border-white/6 text-white/25 text-[9px] font-light uppercase tracking-wider rounded-lg">
                  +{property.amenities.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-lg font-extralight text-[#c9a84c]">{price}</span>
            <span className="flex items-center gap-1.5 text-[10px] font-light text-white/30 uppercase tracking-[0.15em] group-hover:text-[#c9a84c] transition-colors duration-500">
              Discover
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
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
