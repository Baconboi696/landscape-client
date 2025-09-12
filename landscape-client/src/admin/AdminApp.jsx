import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Properties from './Properties';
import AddProperty from './AddProperty';
import Messages from './Messages';
import AdminNotFound from './AdminNotFound';
import ProtectedRoute from './ProtectedRoute';

const AdminApp = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 ml-64">
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
        <Route path="/add-property" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="*" element={<AdminNotFound />} />
      </Routes>
    </div>
  </div>
);

export default AdminApp;
