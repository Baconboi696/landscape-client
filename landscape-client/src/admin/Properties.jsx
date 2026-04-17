import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/admin/properties', {
          credentials: 'include',
        });
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this property?')) return;
    await fetch(`/api/admin/properties/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setProperties(properties.filter(p => p._id !== id));
  };

  return (
    <div className="p-8 md:p-12 space-y-10 max-w-7xl mx-auto">
      <header className="flex justify-between items-end border-b border-white/10 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-extralight text-white tracking-wide">Property Management</h1>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-4">Curate Portfolio Listings</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="px-8 py-3 bg-white/5 border border-white/10 text-white hover:text-gold hover:border-gold/50 transition-all text-xs font-light tracking-[0.2em] uppercase"
          onClick={() => navigate('/admin/add-property')}
        >
          Add Listing
        </motion.button>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gold">
          <div className="w-8 h-8 border border-t-gold border-white/10 rounded-full animate-spin mb-4" />
          <p className="text-xs font-light tracking-[0.2em] uppercase">Syncing Portfolio...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500 font-light tracking-[0.1em] uppercase border border-red-500/20 p-8 bg-red-500/5">{error}</div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
          className="overflow-x-auto border border-white/5 bg-[#0a0a0a]"
        >
          <table className="min-w-full">
            <thead className="border-b border-white/10 text-white/30 uppercase text-[10px] font-semibold tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6 text-left">Listing Name</th>
                <th className="px-8 py-6 text-left">Location</th>
                <th className="px-8 py-6 text-left">Type</th>
                <th className="px-8 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white font-light text-[11px] tracking-widest divide-y divide-white/5">
              {properties.map(property => (
                <tr key={property._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">{property.name}</td>
                  <td className="px-8 py-6 text-white/40">{property.location}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 uppercase text-[9px]">{property.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-4">
                      <button className="text-white/40 hover:text-gold transition-colors" onClick={() => navigate(`/admin/edit-property/${property._id}`)}>EDIT</button>
                      <button className="text-white/40 hover:text-red-400 transition-colors" onClick={() => handleDelete(property._id)}>DELETE</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default Properties;
