import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddProperty = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    city: '',
    state: '',
    lat: '',
    lng: '',
    type: 'sale',
    category: 'bungalow',
    amenities: '',
    images: [],
    videos: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  const handleVideoChange = e => {
    setForm({ ...form, videos: Array.from(e.target.files) });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('city', form.city);
      formData.append('state', form.state);
      if (form.lat) formData.append('lat', form.lat);
      if (form.lng) formData.append('lng', form.lng);
      formData.append('type', form.type);
      formData.append('category', form.category);
      formData.append('amenities', form.amenities);

      for (const file of form.images) {
        formData.append('images', file);
      }
      for (const file of form.videos) {
        formData.append('videos', file);
      }

      const res = await fetch('/api/admin/properties', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/admin/properties'), 1200);
      } else {
        const data = await res.json();
        setError(data.details || 'Failed to add property');
      }
    } catch {
      setError('Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-12 space-y-10 max-w-7xl mx-auto">
      <header className="border-b border-white/10 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-extralight text-white tracking-wide">Register Asset</h1>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-4">Add new prestigious properties</p>
        </motion.div>
      </header>

      <motion.form
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 w-full max-w-3xl flex flex-col gap-10"
      >
        {/* Name */}
        <div className="space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Listing Name</label>
          <input name="name" type="text" required placeholder="Enter asset name..." value={form.name} onChange={handleChange}
            className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white uppercase tracking-widest" />
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">City</label>
            <input name="city" type="text" required placeholder="City" value={form.city} onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white uppercase tracking-widest" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">State</label>
            <input name="state" type="text" required placeholder="State" value={form.state} onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white uppercase tracking-widest" />
          </div>
        </div>

        {/* Coordinates */}
        <div className="space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] flex justify-between">
            <span>GPS Coordinates</span>
            <span className="text-white/20 font-light lowercase tracking-wider">(Optional)</span>
          </label>
          <div className="grid grid-cols-2 gap-8">
            <input name="lat" type="number" step="any" placeholder="Latitude" value={form.lat} onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white uppercase tracking-widest" />
            <input name="lng" type="number" step="any" placeholder="Longitude" value={form.lng} onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white uppercase tracking-widest" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">About the Property</label>
          <textarea name="description" required placeholder="Describe the property details, architecture, and significance..." value={form.description} onChange={handleChange}
            className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white uppercase tracking-widest min-h-[140px] resize-y" />
        </div>

        {/* Type, Category, Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Listing Type</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all text-sm font-light text-white uppercase tracking-widest appearance-none cursor-pointer">
              <option value="sale" className="bg-[#0a0a0a]">Sale</option>
              <option value="rent" className="bg-[#0a0a0a]">Rent</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Category</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all text-sm font-light text-white uppercase tracking-widest appearance-none cursor-pointer">
              <option value="bungalow" className="bg-[#0a0a0a]">Bungalow</option>
              <option value="plainplot" className="bg-[#0a0a0a]">Plain Plot</option>
              <option value="farmland" className="bg-[#0a0a0a]">Farmland</option>
            </select>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Amenities</label>
          <input name="amenities" type="text" placeholder="Pool, Gym, Smart Home... (comma separated)" value={form.amenities} onChange={handleChange}
            className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm font-light text-white uppercase tracking-widest" />
        </div>

        {/* Images */}
        <div className="space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Photography</label>
          <div className="relative group">
            <input name="images" type="file" multiple accept="image/*" onChange={handleImageChange}
              className="w-full px-6 py-8 bg-transparent border border-white/10 border-dashed hover:border-gold hover:bg-gold/5 transition-all text-white/40 cursor-pointer text-xs uppercase tracking-widest file:hidden"
              title="Click to select images" />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-white/40 tracking-[0.1em] uppercase group-hover:text-gold transition-colors">
              {form.images.length > 0 ? `${form.images.length} Media Files Selected` : 'Click to Upload High-Res Images'}
            </div>
          </div>
        </div>

        {/* Videos */}
        <div className="space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Cinematography</label>
          <div className="relative group">
            <input name="videos" type="file" multiple accept="video/*" onChange={handleVideoChange}
              className="w-full px-6 py-8 bg-transparent border border-white/10 border-dashed hover:border-gold hover:bg-gold/5 transition-all text-white/40 cursor-pointer text-xs uppercase tracking-widest file:hidden"
              title="Click to select videos" />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-white/40 tracking-[0.1em] uppercase group-hover:text-gold transition-colors">
              {form.videos.length > 0 ? `${form.videos.length} Media Files Selected` : 'Click to Upload Cinematic Videos'}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 py-5 border border-white/20 bg-transparent text-white font-light uppercase tracking-[0.3em] hover:border-gold hover:text-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs relative overflow-hidden group"
          disabled={loading}
        >
          <div className="absolute inset-0 bg-gold w-0 group-hover:w-full transition-all duration-700 ease-out z-0 opacity-10" />
          <span className="relative z-10">{loading ? 'Uploading Data...' : 'Submit Property Listing'}</span>
        </button>

        {success && <div className="p-4 border border-gold text-gold text-[10px] font-light uppercase tracking-widest text-center bg-gold/5">Asset Recorded. Synchronizing...</div>}
        {error && <div className="p-4 border border-red-500/50 text-red-500 text-[10px] font-light uppercase tracking-widest text-center bg-red-500/5">{error}</div>}
      </motion.form>
    </div>
  );
};

export default AddProperty;
