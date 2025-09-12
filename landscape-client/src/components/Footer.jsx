import React from 'react';

const Footer = () => (
  <footer className="mt-auto w-full py-6 bg-white shadow-inner text-center text-gray-500 sticky bottom-0">
    &copy; {new Date().getFullYear()} LandScape. All rights reserved.
  </footer>
);

export default Footer;
