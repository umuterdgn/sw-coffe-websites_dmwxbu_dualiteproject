import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Coffee, LogOut, ClipboardList } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout, orders } = useCafe();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Bekleyen sipariş sayısı
  const pendingOrdersCount = orders.filter(o => o.status === 'hazırlanıyor').length;

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Admin Sidebar - Semantic HTML */}
      <aside className="w-64 bg-[#021E73] text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">SW Admin</h2>
          <p className="text-xs text-gray-400 mt-1">İskenderun Şubesi</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-[#335AA6] text-white' : 'text-gray-300 hover:bg-white/10'
                  }`
                }
              >
                <LayoutDashboard size={20} />
                İstatistikler
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-[#335AA6] text-white' : 'text-gray-300 hover:bg-white/10'
                  }`
                }
              >
                <Coffee size={20} />
                Ürün Yönetimi
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors justify-between ${
                    isActive ? 'bg-[#335AA6] text-white' : 'text-gray-300 hover:bg-white/10'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                    <ClipboardList size={20} />
                    Siparişler
                </div>
                {pendingOrdersCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {pendingOrdersCount}
                    </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg hover:bg-red-600/20 hover:text-red-200 transition-colors text-gray-300"
          >
            <LogOut size={20} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm p-4 md:hidden flex justify-between items-center">
             <h2 className="text-xl font-bold text-[#021E73]">SW Admin</h2>
             <button onClick={handleLogout} className="text-gray-500"><LogOut size={20}/></button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
