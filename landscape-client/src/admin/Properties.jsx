import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="p-10 space-y-10">
      <div className="flex justify-between items-end border-b border-black/5 pb-10">
        <div>
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Inventory</h1>
          <p className="text-black/30 font-bold mt-1 uppercase tracking-widest text-[10px]">Management of prestigious assets.</p>
        </div>
        <button
          className="px-8 py-3 bg-black text-white font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 rounded-full text-xs shadow-lg shadow-black/10"
          onClick={() => navigate('/admin/add-property')}
        >
          Add Asset
        </button>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-black/20">
          <div className="w-8 h-8 border-2 border-t-black border-zinc-100 rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-bold uppercase tracking-widest animate-pulse">Scanning Inventory...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-black font-bold uppercase border border-black/5 p-8 rounded-3xl">{error}</div>
      ) : (
        <div className="overflow-hidden border border-black/5 bg-white rounded-[2.5rem] shadow-sm">
          <table className="min-w-full">
            <thead className="bg-zinc-50 border-b border-black/5 text-black/30 uppercase text-[8px] font-bold tracking-[0.3em]">
              <tr>
                <th className="px-6 py-5 text-left">Internal Name</th>
                <th className="px-6 py-5 text-left">Location</th>
                <th className="px-6 py-5 text-left">Type</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black font-bold uppercase text-[9px] tracking-widest divide-y divide-black/5">
              {properties.map(property => (
                <tr key={property._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-8 py-6">{property.name}</td>
                  <td className="px-8 py-6 text-black/40">{property.location}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-black/5 rounded-full">{property.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-3">
                      <button className="px-4 py-2 border border-black/10 rounded-xl font-bold hover:bg-black hover:text-white transition-all" onClick={() => navigate(`/admin/edit-property/${property._id}`)}>Edit</button>
                      <button className="px-4 py-2 bg-black text-white rounded-xl font-bold hover:bg-zinc-800 transition-all" onClick={() => handleDelete(property._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Properties;
