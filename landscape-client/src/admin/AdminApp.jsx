import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Properties from './Properties';
import AddProperty from './AddProperty';
import EditProperty from './EditProperty';
import Messages from './Messages';
import AdminNotFound from './AdminNotFound';

const AdminApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505] font-sans text-white relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen w-full transition-all duration-300">
        {/* Admin Top Navbar */}
        <header className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-64 md:w-80">
              <svg className="w-4 h-4 text-white/40 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search portfolio..." 
                className="bg-transparent border-none outline-none text-xs font-light tracking-widest text-white placeholder:text-white/30 w-full uppercase"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-white/50 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-gold rounded-full" />
            </button>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gold/5 border border-gold/30 flex items-center justify-center text-gold text-xs font-light uppercase group-hover:bg-gold group-hover:text-black transition-all">
                A
              </div>
              <span className="text-xs font-light tracking-widest uppercase hidden md:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/edit-property/:id" element={<EditProperty />} />
            <Route path="/edit-property" element={<Navigate to="/admin/properties" replace />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="*" element={<AdminNotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminApp;
