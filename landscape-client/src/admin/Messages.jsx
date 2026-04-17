import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/admin/inquiries', {
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
    await fetch(`/api/admin/inquiries/${id}/responded`, {
      method: 'PUT',
      credentials: 'include',
    });
    setMessages(messages.map(m => m._id === id ? { ...m, responded: true } : m));
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this inquiry?')) return;
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setMessages(messages.filter(m => m._id !== id));
  };

  return (
    <div className="p-8 md:p-12 space-y-10 max-w-7xl mx-auto">
      <header className="border-b border-white/10 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-extralight text-white tracking-wide">Inquiry Management</h1>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-4">Client Communications & Requests</p>
        </motion.div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gold">
          <div className="w-8 h-8 border border-t-gold border-white/10 rounded-full animate-spin mb-4" />
          <p className="text-xs font-light tracking-[0.2em] uppercase">Syncing Inquiries...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500 font-light tracking-[0.1em] uppercase border border-red-500/20 p-8 bg-red-500/5">{error}</div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
          className="overflow-x-auto border border-white/5 bg-[#0a0a0a]"
        >
          <table className="min-w-full">
            <thead className="border-b border-white/10 text-white/30 uppercase text-[10px] font-semibold tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6 text-left">Client Name</th>
                <th className="px-8 py-6 text-left">Contact Info</th>
                <th className="px-8 py-6 text-left">Message</th>
                <th className="px-8 py-6 text-left">Property Ref</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white font-light text-[11px] tracking-widest divide-y divide-white/5">
              {messages.map(msg => (
                <tr key={msg._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">{msg.name}</td>
                  <td className="px-8 py-6 text-white/40">{msg.email}</td>
                  <td className="px-8 py-6 max-w-xs truncate opacity-60 normal-case">{msg.message}</td>
                  <td className="px-8 py-6 text-gold">{msg.property?.name || 'General Inquiry'}</td>
                  <td className="px-8 py-6 text-center">
                    {msg.responded
                      ? <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 uppercase text-[9px]">Closed</span>
                      : <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold uppercase text-[9px]">New</span>}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-4">
                      {!msg.responded && (
                        <button className="text-gold/60 hover:text-gold transition-colors" onClick={() => markResponded(msg._id)}>RESOLVE</button>
                      )}
                      <button className="text-white/40 hover:text-red-400 transition-colors" onClick={() => handleDelete(msg._id)}>DELETE</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default Messages;
