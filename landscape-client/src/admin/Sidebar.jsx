import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside className="h-full bg-white shadow-lg flex flex-col py-6 px-2 w-64 min-w-[64px] fixed md:relative z-30">
    <div className="mb-8 text-center">
      <span className="text-2xl font-bold text-purple-600">Admin</span>
    </div>
    <nav className="flex flex-col gap-4">
      <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'font-semibold text-purple-600' : 'text-gray-700'}>Dashboard</NavLink>
      <NavLink to="/admin/properties" className={({ isActive }) => isActive ? 'font-semibold text-purple-600' : 'text-gray-700'}>Properties</NavLink>
      <NavLink to="/admin/add-property" className={({ isActive }) => isActive ? 'font-semibold text-purple-600' : 'text-gray-700'}>Add Property</NavLink>
      <NavLink to="/admin/messages" className={({ isActive }) => isActive ? 'font-semibold text-purple-600' : 'text-gray-700'}>Messages</NavLink>
    </nav>
  </aside>
);

export default Sidebar;
