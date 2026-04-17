import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';

const categories = ['all', 'bungalow', 'plainplot', 'farmland'];
const types = ['all', 'rent', 'sale'];

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/properties');
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

  const filtered = properties.filter(p => {
    const matchCategory = category === 'all' || p.category === category;
    const matchType = type === 'all' || p.type === type;
    const locationStr = [p.city, p.state, p.location].filter(Boolean).join(' ').toLowerCase();
    const matchSearch = search === '' || locationStr.includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchType && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'priceLowHigh') return (a.price || 0) - (b.price || 0);
    if (sort === 'priceHighLow') return (b.price || 0) - (a.price || 0);
    return 0;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="px-6 py-32 max-w-7xl mx-auto w-full pt-48">
      <div className="mb-16 border-b border-white/10 pb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Our Portfolio</span>
          <h2 className="text-5xl md:text-7xl font-extralight text-white tracking-tight">The <span className="font-serif italic text-gold">Collection</span></h2>
        </div>
        <div className="text-xs font-light uppercase tracking-[0.2em] text-white/50">
          {sorted.length} {sorted.length === 1 ? 'Estate' : 'Estates'} Available
        </div>
      </div>

      <div className="bg-[#0a0a0a] p-8 border border-white/5 mb-16 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Classification</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all text-sm font-light text-white uppercase tracking-widest cursor-pointer">
            {categories.map(c => <option key={c} value={c} className="bg-[#0a0a0a]">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>

        <div className="flex-1 space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all text-sm font-light text-white uppercase tracking-widest cursor-pointer">
            {types.map(t => <option key={t} value={t} className="bg-[#0a0a0a]">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>

        <div className="flex-[1.5] space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Location</label>
          <input
            type="text"
            placeholder="Search Estates..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white uppercase tracking-widest"
          />
        </div>

        <div className="flex-1 space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Sort</label>
          <select value={sort} onChange={e => setSort(e.target.value)} className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all text-sm font-light text-white uppercase tracking-widest cursor-pointer">
            <option value="default" className="bg-[#0a0a0a]">Newest First</option>
            <option value="priceLowHigh" className="bg-[#0a0a0a]">Price: Low to High</option>
            <option value="priceHighLow" className="bg-[#0a0a0a]">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gold">
          <div className="w-12 h-12 border border-t-gold border-white/10 rounded-full animate-spin mb-4" />
          <p className="text-xs font-light uppercase tracking-[0.2em]">Loading Portfolio...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 border border-red-500/20 bg-red-500/5 font-light uppercase tracking-widest">{error}</div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-32 text-white/50 text-lg font-light tracking-widest">No estates match your criteria.</div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {sorted.map(property => (
            <motion.div key={property._id || property.id} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default PropertyList;
