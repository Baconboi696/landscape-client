import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'Properties', path: '/admin/properties', icon: '🏠' },
    { label: 'Add Property', path: '/admin/add-property', icon: '➕' },
    { label: 'Messages', path: '/admin/messages', icon: '📩' },
  ];

  return (
    <aside className="w-80 h-screen fixed top-0 left-0 bg-white text-black p-10 flex flex-col z-50 border-r border-black/5">
      <div className="mb-16 flex items-center gap-4 px-4 cursor-pointer group" onClick={() => navigate('/')}>
        <div className="relative w-10 h-10 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black rounded-xl shadow-xl shadow-black/10 transition-all duration-500 group-hover:rotate-45"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="relative z-10 text-white group-hover:scale-110 transition-transform duration-500"
          >
            <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 21V12H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-xl font-black tracking-tighter text-black uppercase leading-none">
            LandScape
          </span>
          <span className="text-[6px] font-bold tracking-[0.4em] text-black/20 uppercase">
            Admin Portal
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold uppercase tracking-widest text-[10px] ${location.pathname === item.path
              ? 'bg-black text-white shadow-lg shadow-black/10'
              : 'text-black/40 hover:bg-zinc-50 hover:text-black'
              }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="pt-10 border-t border-black/5">
        <button
          className="w-full flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-all"
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
            navigate('/admin/login');
          }}
        >
          <span className="text-xl">🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
