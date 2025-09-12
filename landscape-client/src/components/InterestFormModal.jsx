import React, { useState } from 'react';

const InterestFormModal = ({ property, onClose, onSubmit, submitting, success, error }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-purple-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-purple-700 mb-4">Express Interest in {property.name}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="name" type="text" required placeholder="Name" value={form.name} onChange={handleChange} className="px-3 py-2 rounded border" />
          <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="px-3 py-2 rounded border" />
          <input name="phone" type="tel" required placeholder="Phone" value={form.phone} onChange={handleChange} className="px-3 py-2 rounded border" />
          <textarea name="message" required placeholder="Message" value={form.message} onChange={handleChange} className="px-3 py-2 rounded border" />
          <button type="submit" className="py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send'}
          </button>
        </form>
        {success && <div className="mt-3 text-green-600">Interest sent successfully!</div>}
        {error && <div className="mt-3 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default InterestFormModal;
