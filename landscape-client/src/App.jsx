import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import PropertyList from './components/PropertyList';
import Login from './admin/Login';
import AdminApp from './admin/AdminApp';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
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
        // Show the 3 most recent properties as featured
        setFeatured(Array.isArray(data) ? data.slice(0, 3) : []);
      })
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <HeroSection />
      <section className="px-8 pb-32 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-black/5 pb-10">
          <div>
            <h2 className="text-5xl font-black text-black tracking-tighter uppercase">Featured</h2>
            <p className="text-black/40 font-bold mt-2 uppercase tracking-widest text-[10px]">Hand-picked elite sanctuaries from our collection.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-black/10">
            <div className="w-10 h-10 border-2 border-t-black border-black/5 rounded-full animate-spin mb-4" />
            <p className="text-[9px] font-bold uppercase tracking-[0.5em] animate-pulse">Loading...</p>
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-20 text-black/10 font-black uppercase tracking-[0.3em] text-sm">
            No properties listed yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featured.map(property => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-20">
          <button
            className="px-16 py-6 bg-black text-white font-bold uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all active:scale-95 rounded-2xl shadow-xl shadow-black/10 text-xs"
            onClick={() => navigate('/properties')}
          >
            View All Properties
          </button>
        </div>
      </section>
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Alt + A to access admin
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        navigate('/admin/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col grain-overlay">
      <Navbar />
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
          <Route path="/admin/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/admin/*" element={<PageTransition><AdminApp /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;