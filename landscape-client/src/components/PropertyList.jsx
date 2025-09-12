import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';

const categories = ['all', 'bungalow', 'plainplot', 'farmland'];
const types = ['all', 'rent', 'sale'];

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/properties');
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

  // Filtering logic
  const filtered = properties.filter(p => {
    const matchCategory = category === 'all' || p.category === category;
    const matchType = type === 'all' || p.type === type;
    const matchLocation = location === '' || p.location.toLowerCase().includes(location.toLowerCase());
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchCategory && matchType && matchLocation && matchPrice;
  });

  // Sorting logic
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'priceLowHigh') return a.price - b.price;
    if (sort === 'priceHighLow') return b.price - a.price;
    return 0;
  });

  return (
    <section className="px-4 pb-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Properties</h2>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 rounded border">
          {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} className="px-3 py-2 rounded border">
          {types.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="px-3 py-2 rounded border"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={priceRange[0]}
          onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
          className="px-3 py-2 rounded border w-24"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="px-3 py-2 rounded border w-24"
        />
        <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 rounded border">
          <option value="default">Sort</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>
      {/* Loading, error, empty state */}
      {loading && <div className="text-center py-10 animate-pulse">Loading properties...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}
      {!loading && sorted.length === 0 && <div className="text-center py-10 text-gray-500">No properties found.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sorted.map(property => (
          <PropertyCard key={property._id || property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default PropertyList;
