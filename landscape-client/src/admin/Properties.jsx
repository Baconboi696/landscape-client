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
        const res = await fetch('http://localhost:5000/api/admin/properties', {
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
    await fetch(`http://localhost:5000/api/admin/properties/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setProperties(properties.filter(p => p._id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Properties</h1>
      <button className="mb-4 px-4 py-2 bg-purple-500 text-white rounded" onClick={() => navigate('/admin/add-property')}>Add Property</button>
      {loading ? (
        <div className="text-center py-10 animate-pulse">Loading properties...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(property => (
                <tr key={property._id} className="border-t">
                  <td className="px-4 py-2">{property.name}</td>
                  <td className="px-4 py-2">{property.location}</td>
                  <td className="px-4 py-2">{property.type}</td>
                  <td className="px-4 py-2">{property.category}</td>
                  <td className="px-4 py-2">{property.price}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => navigate(`/admin/edit-property/${property._id}`)}>Edit</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(property._id)}>Delete</button>
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
