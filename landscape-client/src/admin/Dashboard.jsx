import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

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
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-10 min-h-screen">
      <header className="flex justify-between items-end border-b border-white/10 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-extralight text-white tracking-wide">Overview Dashboard</h1>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-4">Platform Performance Metrics</p>
        </motion.div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gold">
          <div className="w-8 h-8 border border-t-gold border-white/10 rounded-full animate-spin mb-4" />
          <p className="text-xs font-light tracking-[0.2em] uppercase">Syncing Data...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0a0a0a] p-8 border border-white/5 flex flex-col justify-between hover:border-gold/30 transition-colors">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-4">Total Listings</p>
              <p className="text-4xl font-extralight text-white">{analytics.totalProperties || 0}</p>
            </div>
            <div className="bg-[#0a0a0a] p-8 border border-white/5 flex flex-col justify-between hover:border-gold/30 transition-colors">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-4">Inquiries</p>
              <p className="text-4xl font-extralight text-white">{analytics.totalInquiries || 0}</p>
            </div>
            <div className="bg-[#0a0a0a] p-8 border border-white/5 flex flex-col justify-between hover:border-gold/30 transition-colors">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-4">Pending Follow-up</p>
              <p className="text-4xl font-extralight text-white">{analytics.pendingInquiries || 0}</p>
            </div>
            <div className="bg-gradient-to-br from-gold/10 to-transparent p-8 border border-gold/20 flex flex-col justify-between">
              <p className="text-[10px] font-semibold text-gold uppercase tracking-[0.2em] mb-4">Conversion Health</p>
              <p className="text-4xl font-extralight text-gold">
                {analytics.totalInquiries > 0
                  ? Math.round(((analytics.totalInquiries - analytics.pendingInquiries) / analytics.totalInquiries) * 100)
                  : 0}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#0a0a0a] p-8 border border-white/5">
              <h3 className="text-xs font-light text-white tracking-[0.2em] uppercase mb-8">Inquiry Volume</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.monthly}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#ffffff50', textTransform: 'uppercase' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#ffffff50' }} dx={-10} />
                  <Tooltip
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '0', fontSize: '12px' }}
                    itemStyle={{ color: '#d4af37' }}
                  />
                  <Bar dataKey="count" fill="#d4af37" radius={[2, 2, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#0a0a0a] p-8 border border-white/5">
              <h3 className="text-xs font-light text-white tracking-[0.2em] uppercase mb-8">Property Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.types}
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {analytics.types.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#d4af37' : '#ffffff20'} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '0', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;