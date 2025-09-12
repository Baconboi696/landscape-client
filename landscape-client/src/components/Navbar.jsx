import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full py-4 px-6 bg-white shadow-md flex justify-between items-center sticky top-0 z-40">
      <span className="text-2xl font-bold text-purple-600 cursor-pointer" onClick={() => navigate('/')}>LandScape</span>
      <div className="hidden md:flex space-x-4">
        <button className="text-gray-700 hover:text-purple-600" onClick={() => navigate('/')}>Home</button>
        <button className="text-gray-700 hover:text-purple-600" onClick={() => navigate('/properties')}>Properties</button>
      </div>
      <button className="md:hidden text-purple-600 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </button>
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden">
          <button className="text-gray-700 hover:text-purple-600 mb-2" onClick={() => {navigate('/'); setMenuOpen(false);}}>Home</button>
          <button className="text-gray-700 hover:text-purple-600" onClick={() => {navigate('/properties'); setMenuOpen(false);}}>Properties</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
