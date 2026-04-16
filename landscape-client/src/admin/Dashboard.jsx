import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalProperties: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    monthly: [],
    types: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/admin/analytics', {
          credentials: 'include',
        });
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error('Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="p-10 space-y-12 max-w-7xl mx-auto">
      <header className="flex justify-between items-end border-b border-black/5 pb-10">
        <div>
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Dashboard</h1>
          <p className="text-black/30 font-bold mt-1 uppercase tracking-widest text-[10px]">System performance overview.</p>
        </div>
        <div className="px-5 py-2 bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full">
          Live Sync
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-black">
          <div className="w-10 h-10 border-2 border-t-black border-zinc-100 rounded-full animate-spin mb-4" />
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/20 animate-pulse">Synchronizing Portfolio...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-2">
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Properties</p>
              <p className="text-4xl font-black text-black">{analytics.totalProperties || 0}</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-2">
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Inquiries</p>
              <p className="text-4xl font-black text-black">{analytics.totalInquiries || 0}</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-2">
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Pending</p>
              <p className="text-4xl font-black text-black">{analytics.pendingInquiries || 0}</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-black/10 shadow-sm space-y-2 bg-black !text-white">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Efficiency</p>
              <p className="text-4xl font-black">
                {analytics.totalInquiries > 0
                  ? Math.round(((analytics.totalInquiries - analytics.pendingInquiries) / analytics.totalInquiries) * 100)
                  : 0}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm">
              <h3 className="text-[10px] font-black text-black uppercase tracking-widest mb-10 border-b border-black/5 pb-4">Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.monthly}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <Tooltip cursor={{ fill: '#f8f8f8' }} contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="count" fill="#000" radius={[10, 10, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm">
              <h3 className="text-[10px] font-black text-black uppercase tracking-widest mb-10 border-b border-black/5 pb-4">Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.types}
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analytics.types.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#000' : '#e0e0e0'} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 