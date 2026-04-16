import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="p-10 space-y-10">
      <div className="border-b border-black/5 pb-10">
        <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Register</h1>
        <p className="text-black/30 font-bold mt-1 uppercase tracking-widest text-[10px]">Entry of prestigious assets.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-black/5 p-12 w-full max-w-3xl flex flex-col gap-10 rounded-[3rem] shadow-sm">

        {/* Name */}
        <div className="space-y-2">
          <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Property Name</label>
          <input name="name" type="text" required placeholder="ASSET NAME" value={form.name} onChange={handleChange}
            className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs" />
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">City</label>
            <input name="city" type="text" required placeholder="CITY" value={form.city} onChange={handleChange}
              className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">State</label>
            <input name="state" type="text" required placeholder="STATE" value={form.state} onChange={handleChange}
              className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs" />
          </div>
        </div>

        {/* Coordinates */}
        <div className="space-y-3">
          <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">
            GPS Coordinates <span className="normal-case font-normal text-black/20">(optional — for precise map pin)</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input name="lat" type="number" step="any" placeholder="LATITUDE (e.g. 28.6139)" value={form.lat} onChange={handleChange}
              className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold tracking-widest text-xs" />
            <input name="lng" type="number" step="any" placeholder="LONGITUDE (e.g. 77.2090)" value={form.lng} onChange={handleChange}
              className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold tracking-widest text-xs" />
          </div>
          <p className="text-[9px] text-black/20 ml-2">Find coordinates: right-click on Google Maps → "What's here?"</p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">About the Property</label>
          <textarea name="description" required placeholder="DESCRIBE THE PROPERTY..." value={form.description} onChange={handleChange}
            className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all text-xs min-h-[140px] leading-relaxed" />
        </div>

        {/* Type, Category, Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Type</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs appearance-none cursor-pointer">
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Category</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs appearance-none cursor-pointer">
              <option value="bungalow">Bungalow</option>
              <option value="plainplot">Plain Plot</option>
              <option value="farmland">Farmland</option>
            </select>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2">
          <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Amenities</label>
          <input name="amenities" type="text" placeholder="POOL, GYM, GARDEN, BORE WELL... (comma separated)" value={form.amenities} onChange={handleChange}
            className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs" />
        </div>

        {/* Images */}
        <div className="space-y-2">
          <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Photos</label>
          <input name="images" type="file" multiple accept="image/*" onChange={handleImageChange}
            className="w-full px-6 py-6 bg-zinc-50 border border-black/5 border-dashed rounded-2xl hover:bg-black hover:text-white transition-all font-bold uppercase tracking-widest cursor-pointer text-[10px]" />
          {form.images.length > 0 && (
            <p className="text-[9px] text-black/30 ml-2">{form.images.length} photo(s) selected</p>
          )}
        </div>

        {/* Videos */}
        <div className="space-y-2">
          <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">
            Videos <span className="normal-case font-normal text-black/20">optional</span>
          </label>
          <input name="videos" type="file" multiple accept="video/*" onChange={handleVideoChange}
            className="w-full px-6 py-6 bg-zinc-50 border border-black/5 border-dashed rounded-2xl hover:bg-black hover:text-white transition-all font-bold uppercase tracking-widest cursor-pointer text-[10px]" />
          {form.videos.length > 0 && (
            <p className="text-[9px] text-black/30 ml-2">{form.videos.length} video(s) selected</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 py-6 bg-black text-white font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95 disabled:bg-zinc-300 rounded-2xl shadow-xl shadow-black/10 text-xs"
          disabled={loading}
        >
          {loading ? 'Uploading & Saving...' : 'Save Property'}
        </button>

        {success && <div className="p-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest text-center rounded-xl">Property Saved. Redirecting...</div>}
        {error && <div className="p-4 border border-black text-black text-[10px] font-bold uppercase tracking-widest text-center rounded-xl">{error}</div>}
      </form>
    </div>
  );
};

export default AddProperty;
