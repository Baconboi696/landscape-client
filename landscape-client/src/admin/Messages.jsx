import React, { useEffect, useState } from 'react';

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
    if (!window.confirm('Delete this message?')) return;
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setMessages(messages.filter(m => m._id !== id));
  };

  return (
    <div className="p-10 space-y-10">
      <div className="border-b border-black/5 pb-10">
        <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Signals</h1>
        <p className="text-black/30 font-bold mt-1 uppercase tracking-widest text-[10px]">Direct inquiries from elite clientele.</p>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-black/20">
          <div className="w-8 h-8 border-2 border-t-black border-zinc-100 rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-bold uppercase tracking-widest animate-pulse">Scanning Signals...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-black font-bold uppercase border border-black/5 p-8 rounded-3xl">{error}</div>
      ) : (
        <div className="overflow-hidden border border-black/5 bg-white rounded-[2.5rem] shadow-sm">
          <table className="min-w-full">
            <thead className="bg-zinc-50 border-b border-black/5 text-black/30 uppercase text-[8px] font-bold tracking-[0.3em]">
              <tr>
                <th className="px-6 py-5 text-left">Identity</th>
                <th className="px-6 py-5 text-left">Digital Address</th>
                <th className="px-6 py-5 text-left">Message</th>
                <th className="px-6 py-5 text-left">Target</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black font-bold uppercase text-[9px] tracking-widest divide-y divide-black/5">
              {messages.map(msg => (
                <tr key={msg._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-8 py-6">{msg.name}</td>
                  <td className="px-8 py-6 text-black/40">{msg.email}</td>
                  <td className="px-8 py-6 max-w-xs truncate text-[8px] lowercase opacity-60">{msg.message}</td>
                  <td className="px-8 py-6 italic text-black/40">{msg.property?.name}</td>
                  <td className="px-8 py-6 text-center">
                    {msg.responded
                      ? <span className="px-3 py-1 bg-zinc-100 text-black/40 rounded-full">RESOLVED</span>
                      : <span className="px-3 py-1 bg-black text-white rounded-full">NEW</span>}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-3">
                      {!msg.responded && (
                        <button className="px-4 py-2 border border-black/10 rounded-xl font-bold hover:bg-black hover:text-white transition-all" onClick={() => markResponded(msg._id)}>Resolve</button>
                      )}
                      <button className="px-4 py-2 bg-black text-white rounded-xl font-bold hover:bg-zinc-800 transition-all" onClick={() => handleDelete(msg._id)}>Purge</button>
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

export default Messages;
