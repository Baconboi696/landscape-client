import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { label: 'Listings', path: '/admin/properties', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { label: 'Add Listing', path: '/admin/add-property', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
    { label: 'Inquiries', path: '/admin/messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  const handleNav = (path) => {
    navigate(path);
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <aside className={`w-64 h-screen fixed top-0 left-0 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-20 flex items-center justify-between px-8 border-b border-white/5">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 border border-gold/50 rounded flex items-center justify-center mr-4">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gold">
                <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
          </div>
          <span className="text-sm font-light tracking-[0.2em] text-white uppercase">Portal</span>
        </div>
        <button 
          className="lg:hidden text-white/50 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-none text-xs font-light tracking-[0.1em] uppercase transition-all duration-300 ${
                isActive
                  ? 'bg-white/5 text-gold border-l-2 border-gold'
                  : 'text-white/40 border-l-2 border-transparent hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
              </svg>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button
          className="w-full flex items-center gap-4 px-4 py-3 text-xs font-light tracking-[0.1em] uppercase text-white/40 hover:text-gold transition-colors"
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
            navigate('/admin/login');
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
