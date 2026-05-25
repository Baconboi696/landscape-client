import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    existingImages: [],
    images: [],
    videos: [],
  });

  const [removedImages, setRemovedImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const objectUrls = form.images.map(file => URL.createObjectURL(file));
    setNewImagePreviews(objectUrls);

    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [form.images]);

  useEffect(() => {
    if (!id) {
      navigate('/admin/properties', { replace: true });
      return;
    }

    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setForm({
          name: data.name || '',
          description: data.description || '',
          city: data.city || '',
          state: data.state || '',
          lat: data.location?.coordinates?.[1] || '', // Assuming GeoJSON [lng, lat]
          lng: data.location?.coordinates?.[0] || '',
          type: data.type || 'sale',
          category: data.category || 'bungalow',
          amenities: Array.isArray(data.amenities) ? data.amenities.join(', ') : data.amenities || '',
          existingImages: data.images || [],
          images: [],
          videos: [],
        });
        setRemovedImages([]);
      } catch (err) {
        setNotFound(true);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProperty();
  }, [id, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
    e.target.value = null; // allow selecting the same file again
  };

  const handleRemoveExistingImage = imgUrl => {
    if (window.confirm('Are you sure you want to remove this image? It will be deleted permanently when you save.')) {
      setForm(prev => ({
        ...prev,
        existingImages: prev.existingImages.filter(url => url !== imgUrl),
      }));
      setRemovedImages(prev => [...prev, imgUrl]);
    }
  };

  const handleRemoveNewImage = index => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
      formData.append('removedImages', JSON.stringify(removedImages));

      for (const file of form.images) {
        formData.append('images', file);
      }
      for (const file of form.videos) {
        formData.append('videos', file);
      }

      const res = await fetch(`/api/admin/properties/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/admin/properties'), 1200);
      } else {
        const data = await res.json();
        setError(data.details || 'Failed to update property');
      }
    } catch {
      setError('Failed to update property');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gold">
        <div className="w-8 h-8 border border-t-gold border-white/10 rounded-full animate-spin mb-4" />
        <p className="text-xs font-light tracking-[0.2em] uppercase">Loading Asset Data...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <div className="text-center p-12 border border-white/10 bg-[#0a0a0a] max-w-lg w-full">
          <svg className="w-16 h-16 text-white/20 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-extralight text-white uppercase tracking-widest mb-2">Asset Not Found</h2>
          <p className="text-xs text-white/40 tracking-wider mb-8">The requested property does not exist or has been removed.</p>
          <button
            onClick={() => navigate('/admin/properties')}
            className="px-8 py-3 border border-white/20 text-white text-xs font-light tracking-[0.2em] uppercase hover:text-gold hover:border-gold transition-colors"
          >
            Return to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 space-y-10 max-w-7xl mx-auto">
      <header className="border-b border-white/10 pb-8 flex items-end justify-between">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-extralight text-white tracking-wide">Edit Asset</h1>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-4">Modify Properties Listing: <span className="text-gold">{form.name}</span></p>
        </motion.div>
        <button
          onClick={() => navigate('/admin/properties')}
          className="px-6 py-2 border border-white/10 text-white/40 text-[10px] font-light tracking-[0.2em] uppercase hover:text-white transition-colors"
        >
          Cancel
        </button>
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
        <div className="space-y-4">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] flex justify-between">
            <span>Property Images</span>
            <span className="text-white/20 font-light lowercase tracking-wider">(Current & New)</span>
          </label>
          
          {/* Existing Images Gallery */}
          {form.existingImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              {form.existingImages.map((img, index) => (
                <div key={index} className="relative group overflow-hidden rounded border border-white/10 aspect-[4/3]">
                  <img src={img} alt={`Existing Property ${index}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(img)}
                      className="px-3 py-1.5 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white text-[10px] uppercase tracking-widest rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New Images Preview */}
          {newImagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              {newImagePreviews.map((preview, index) => (
                <div key={index} className="relative group overflow-hidden rounded border border-gold/30 aspect-[4/3]">
                  <div className="absolute top-2 left-2 z-10 bg-gold text-[#0a0a0a] text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">New</div>
                  <img src={preview} alt={`New Property ${index}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="px-3 py-1.5 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white text-[10px] uppercase tracking-widest rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Area */}
          <div className="relative group">
            <input name="images" type="file" multiple accept="image/*" onChange={handleImageChange}
              className="w-full px-6 py-8 bg-transparent border border-white/10 border-dashed hover:border-gold hover:bg-gold/5 transition-all text-white/40 cursor-pointer text-xs uppercase tracking-widest file:hidden"
              title="Click to select images" />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-white/40 tracking-[0.1em] uppercase group-hover:text-gold transition-colors">
              Click or Drag to Upload New Images
            </div>
          </div>
        </div>

        {/* Videos */}
        <div className="space-y-3">
          <label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] flex justify-between">
            <span>Update Cinematography</span>
            <span className="text-white/20 font-light lowercase tracking-wider">(Leave blank to keep existing)</span>
          </label>
          <div className="relative group">
            <input name="videos" type="file" multiple accept="video/*" onChange={handleVideoChange}
              className="w-full px-6 py-8 bg-transparent border border-white/10 border-dashed hover:border-gold hover:bg-gold/5 transition-all text-white/40 cursor-pointer text-xs uppercase tracking-widest file:hidden"
              title="Click to select videos" />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-white/40 tracking-[0.1em] uppercase group-hover:text-gold transition-colors">
              {form.videos.length > 0 ? `${form.videos.length} New Media Files Selected` : 'Click to Upload Replacement Videos'}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 py-5 border border-white/20 bg-transparent text-white font-light uppercase tracking-[0.3em] hover:border-gold hover:text-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs relative overflow-hidden group"
          disabled={loading}
        >
          <div className="absolute inset-0 bg-gold w-0 group-hover:w-full transition-all duration-700 ease-out z-0 opacity-10" />
          <span className="relative z-10">{loading ? 'Uploading Data...' : 'Update Properties Listing'}</span>
        </button>

        {success && <div className="p-4 border border-gold text-gold text-[10px] font-light uppercase tracking-widest text-center bg-gold/5">Asset Updated. Synchronizing...</div>}
        {error && <div className="p-4 border border-red-500/50 text-red-500 text-[10px] font-light uppercase tracking-widest text-center bg-red-500/5">{error}</div>}
      </motion.form>
    </div>
  );
};

export default EditProperty;
