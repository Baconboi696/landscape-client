import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropertyDetailsModal from './PropertyDetailsModal';

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        whileHover={{ scale: 1.05 }}
      >
        <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">{property.name}</h3>
          <p className="text-sm font-medium text-pink-500 mb-1">{property.category ? property.category.charAt(0).toUpperCase() + property.category.slice(1) : ''}</p>
          <p className="text-gray-600 mb-1">{property.location}</p>
          <p className="text-xl font-bold text-gray-900 mb-3">{property.price}</p>
          <button
            className="w-full py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition"
            onClick={() => setShowModal(true)}
          >
            View Details
          </button>
        </div>
      </motion.div>
      {showModal && (
        <PropertyDetailsModal property={property} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default PropertyCard;
