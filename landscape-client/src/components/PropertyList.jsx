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
    <section className="px-6 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-black/5 pb-10">
        <div>
          <h2 className="text-5xl font-black text-black tracking-tighter uppercase">Collection</h2>
          <p className="text-black/40 font-bold mt-2 uppercase tracking-widest text-[9px]">Elite selection of modern sanctuaries.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-black/20 uppercase tracking-[0.3em]">{sorted.length} Units available</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mb-24 p-12 bg-zinc-50 rounded-[3rem] items-end border border-black/5 shadow-sm">
        <div className="flex-1 min-w-[200px] space-y-3">
          <label className="text-[9px] font-black text-black/20 uppercase tracking-[0.3em] ml-2">Classification</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-6 py-5 bg-white border border-black/5 rounded-2xl focus:border-black outline-none transition-all font-bold uppercase tracking-widest cursor-pointer text-[10px] appearance-none shadow-sm">
            {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>

        <div className="flex-1 min-w-[200px] space-y-3">
          <label className="text-[9px] font-black text-black/20 uppercase tracking-[0.3em] ml-2">Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full px-6 py-5 bg-white border border-black/5 rounded-2xl focus:border-black outline-none transition-all font-bold uppercase tracking-widest cursor-pointer text-[10px] appearance-none shadow-sm">
            {types.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>

        <div className="flex-[1.5] min-w-[250px] space-y-3">
          <label className="text-[9px] font-black text-black/20 uppercase tracking-[0.3em] ml-2">Search</label>
          <input
            type="text"
            placeholder="CITY / STATE / NAME"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-6 py-5 bg-white border border-black/5 rounded-2xl focus:border-black outline-none transition-all font-bold uppercase tracking-widest placeholder:text-black/10 text-[10px] shadow-sm"
          />
        </div>

        <div className="flex-1 min-w-[200px] space-y-3">
          <label className="text-[9px] font-black text-black/20 uppercase tracking-[0.3em] ml-2">Sequence</label>
          <select value={sort} onChange={e => setSort(e.target.value)} className="w-full px-6 py-5 bg-white border border-black/5 rounded-2xl focus:border-black outline-none transition-all font-bold uppercase tracking-widest cursor-pointer text-[10px] appearance-none shadow-sm">
            <option value="default">Newest First</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 text-black/10">
          <div className="w-12 h-12 border-2 border-t-black border-black/5 rounded-full animate-spin mb-6" />
          <p className="text-[9px] font-bold uppercase tracking-[0.5em] animate-pulse">Syncing Portfolio...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-black font-black uppercase border border-black/5 rounded-[3rem] p-8">{error}</div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-40 text-black/10 font-black uppercase tracking-[0.5em]">Zero matches found.</div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12"
        >
          {sorted.map(property => (
            <PropertyCard key={property._id || property.id} property={property} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default PropertyList;
