import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import PropertyList from './components/PropertyList';
import Login from './admin/Login';
import AdminApp from './admin/AdminApp';
import ProtectedRoute from './admin/ProtectedRoute';
import ContactPage from './components/ContactPage';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setFeatured(Array.isArray(data) ? data.slice(0, 3) : []);
      })
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <HeroSection />

      {/* Cinematic Stats Section */}
      <section className="py-16 md:py-32 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }}>
            <h3 className="text-4xl sm:text-5xl md:text-8xl font-extralight text-gold mb-4">Curated </h3>
            <p className="text-xs text-white/50 uppercase tracking-[0.3em]">Handpicked Homes</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}>
            <h3 className="text-4xl sm:text-5xl md:text-8xl font-extralight text-gold mb-4">Verified </h3>
            <p className="text-xs text-white/50 uppercase tracking-[0.3em]">Trusted Listing </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}>
            <h3 className="text-4xl sm:text-5xl md:text-8xl font-extralight text-gold mb-4">Seamless</h3>
            <p className="text-xs text-white/50 uppercase tracking-[0.3em]">Effortless search</p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-24"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">The Collection</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extralight text-white mb-6 tracking-tight">Curated <span className="font-serif italic text-gold">Masterpieces</span></h2>
          <div className="w-12 h-[1px] bg-gold mx-auto" />
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gold">
            <div className="w-12 h-12 border border-t-gold border-white/10 rounded-full animate-spin mb-4" />
            <p className="text-xs font-light uppercase tracking-[0.2em]">Curating Properties...</p>
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-20 text-white/50 text-lg font-light tracking-wide">
            Property currently unavailable.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featured.map(property => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center mt-12 md:mt-24"
        >
          <button
            className="group relative px-12 py-5 bg-transparent border border-white/20 text-white font-light uppercase tracking-[0.2em] overflow-hidden transition-all hover:border-gold"
            onClick={() => navigate('/properties')}
          >
            <div className="absolute inset-0 w-0 bg-gold transition-all duration-700 ease-out group-hover:w-full z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-700">View More</span>
          </button>
        </motion.div>
      </section>
    </>
  );
}

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        navigate('/admin/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-sans selection:bg-gold selection:text-black">
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route path="/properties" element={<PageTransition><PropertyList /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/admin/login" element={<PageTransition><Login /></PageTransition>} />
          <Route
            path="/admin/*"
            element={
              <PageTransition>
                <ProtectedRoute>
                  <AdminApp />
                </ProtectedRoute>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;