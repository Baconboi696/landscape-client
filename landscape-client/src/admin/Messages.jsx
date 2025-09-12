import React, { useEffect, useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/inquiries', {
          credentials: 'include',
        });
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const markResponded = async id => {
    await fetch(`http://localhost:5000/api/admin/inquiries/${id}/responded`, {
      method: 'PUT',
      credentials: 'include',
    });
    setMessages(messages.map(m => m._id === id ? { ...m, responded: true } : m));
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this message?')) return;
    await fetch(`http://localhost:5000/api/admin/inquiries/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setMessages(messages.filter(m => m._id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Client Messages</h1>
      {loading ? (
        <div className="text-center py-10 animate-pulse">Loading messages...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Property</th>
                <th className="px-4 py-2">Responded</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg._id} className="border-t">
                  <td className="px-4 py-2">{msg.name}</td>
                  <td className="px-4 py-2">{msg.email}</td>
                  <td className="px-4 py-2">{msg.phone}</td>
                  <td className="px-4 py-2">{msg.message}</td>
                  <td className="px-4 py-2">{msg.property?.name}</td>
                  <td className="px-4 py-2">{msg.responded ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {!msg.responded && <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => markResponded(msg._id)}>Mark Responded</button>}
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(msg._id)}>Delete</button>
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

export default Messages;
