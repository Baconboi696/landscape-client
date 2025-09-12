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
      const res = await fetch('http://localhost:5000/api/admin/properties', {
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
    <div className="p-8">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Add Property</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col gap-4">
        <input name="name" type="text" required placeholder="Title" value={form.name} onChange={handleChange} className="px-3 py-2 rounded border" />
        <textarea name="description" required placeholder="Description" value={form.description} onChange={handleChange} className="px-3 py-2 rounded border" />
        <input name="price" type="number" required placeholder="Price" value={form.price} onChange={handleChange} className="px-3 py-2 rounded border" />
        <input name="location" type="text" required placeholder="Location" value={form.location} onChange={handleChange} className="px-3 py-2 rounded border" />
        <select name="type" value={form.type} onChange={handleChange} className="px-3 py-2 rounded border">
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <select name="category" value={form.category} onChange={handleChange} className="px-3 py-2 rounded border">
          <option value="bungalow">Bungalow</option>
          <option value="plainplot">Plainplot</option>
          <option value="farmland">Farmland</option>
        </select>
        <input name="amenities" type="text" placeholder="Amenities (comma separated)" value={form.amenities} onChange={handleChange} className="px-3 py-2 rounded border" />
        <input name="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="px-3 py-2 rounded border" />
        <button type="submit" className="py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition" disabled={loading}>
          {loading ? 'Adding...' : 'Add Property'}
        </button>
        {success && <div className="text-green-600 text-center">Property added!</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default AddProperty;
