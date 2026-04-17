import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/properties', {
          credentials: 'include',
        });
        setAuth(res.ok);
      } catch {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border border-t-gold border-white/10 rounded-full animate-spin mb-4" />
        <p className="text-xs font-light tracking-[0.2em] text-gold uppercase animate-pulse">Verifying Credentials...</p>
      </div>
    </div>
  );
  
  if (!auth) return <Navigate to="/admin/login" replace />;
  
  return children;
};

export default ProtectedRoute;
