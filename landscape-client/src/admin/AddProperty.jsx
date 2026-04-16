import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [form, setForm] = useState({
    name: '', description: '', price: '', location: '', type: 'sale', category: 'bungalow', amenities: '', images: []
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

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('location', form.location);
      formData.append('type', form.type);
      formData.append('category', form.category);
      formData.append('amenities', form.amenities);
      for (const file of form.images) {
        formData.append('images', file);
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
        setError('Failed to add property');
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Identity</label>
            <input name="name" type="text" required placeholder="ASSET NAME" value={form.name} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Territory</label>
            <input name="location" type="text" required placeholder="CITY / REGION" value={form.location} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Intelligence</label>
          <textarea name="description" required placeholder="NARRATIVE" value={form.description} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs min-h-[140px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Valuation</label>
            <input name="price" type="number" required placeholder="AMOUNT" value={form.price} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Modality</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs appearance-none cursor-pointer">
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Classification</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs appearance-none cursor-pointer">
              <option value="bungalow">Bungalow</option>
              <option value="plainplot">Plainplot</option>
              <option value="farmland">Farmland</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Amenities</label>
          <input name="amenities" type="text" placeholder="POOL, GYM, HELIPAD..." value={form.amenities} onChange={handleChange} className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold uppercase tracking-widest text-xs" />
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Visuals</label>
          <input name="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full px-6 py-6 bg-zinc-50 border border-black/5 border-dashed rounded-2xl hover:bg-black hover:text-white transition-all font-bold uppercase tracking-widest cursor-pointer text-[10px]" />
        </div>

        <button
          type="submit"
          className="mt-6 py-6 bg-black text-white font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95 disabled:bg-zinc-300 rounded-2xl shadow-xl shadow-black/10 text-xs"
          disabled={loading}
        >
          {loading ? 'Transmitting...' : 'Confirm Asset'}
        </button>
        {success && <div className="p-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest text-center rounded-xl animate-bounce">Asset Registered.</div>}
        {error && <div className="p-4 border border-black text-black text-[10px] font-bold uppercase tracking-widest text-center rounded-xl">{error}</div>}
      </form>
    </div>
  );
};

export default AddProperty;
