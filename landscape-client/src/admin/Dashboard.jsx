import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({ total: 0, sold: 0, rented: 0, monthly: [], types: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data from backend (mocked for now)
    setTimeout(() => {
      setAnalytics({
        total: 12,
        sold: 5,
        rented: 3,
        monthly: [
          { month: 'Jan', count: 2 },
          { month: 'Feb', count: 3 },
          { month: 'Mar', count: 1 },
        ],
        types: [
          { name: 'Bungalow', value: 6 },
          { name: 'Plainplot', value: 3 },
          { name: 'Farmland', value: 3 },
        ],
      });
      setLoading(false);
    }, 800);
  }, []);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Dashboard</h1>
      {loading ? (
        <div className="text-center py-10 animate-pulse">Loading analytics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Properties Added Per Month</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analytics.monthly}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Property Types</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={analytics.types} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                  {analytics.types.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      <div className="flex gap-8 mt-8">
        <div className="bg-white rounded-xl shadow p-6 flex-1 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Properties</h3>
          <div className="text-3xl font-bold text-purple-600">{analytics.total}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex-1 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Sold</h3>
          <div className="text-3xl font-bold text-green-600">{analytics.sold}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex-1 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Rented</h3>
          <div className="text-3xl font-bold text-blue-600">{analytics.rented}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
