import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import featuredProperties from './data/featuredProperties';
import PropertyList from './components/PropertyList';
import Login from './admin/Login';
import AdminApp from './admin/AdminApp';

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <section className="px-4 pb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Properties</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {featuredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    className="px-6 py-3 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition"
                    onClick={() => navigate('/properties')}
                  >
                    View All Properties
                  </button>
                </div>
              </section>
            </>
          }
        />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
