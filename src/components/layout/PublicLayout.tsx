import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { CartDrawer } from '../ui/CartDrawer';

export const PublicLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navbar for Desktop (and Mobile Trigger) */}
      <Navbar onMobileMenuToggle={() => setIsSidebarOpen(true)} />

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Cart Drawer */}
      <CartDrawer />

      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="bg-[#021E73] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
                <h4 className="font-bold text-lg mb-4">SW CAFE</h4>
                <p className="text-gray-300 text-sm">
                    İskenderun'un en taze kahvesi ve en lezzetli tatlıları.
                    Sıcak bir atmosferde unutulmaz anlar için sizi bekliyoruz.
                </p>
            </div>
            <div>
                <h4 className="font-bold text-lg mb-4">Hızlı Erişim</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                    <li><a href="/menu" className="hover:text-white">Menüler</a></li>
                    <li><a href="/about" className="hover:text-white">Hakkımızda</a></li>
                    <li><a href="/contact" className="hover:text-white">İletişim</a></li>
                    <li><a href="/admin" className="hover:text-white">Yönetici Girişi</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-lg mb-4">İletişim</h4>
                <p className="text-gray-300 text-sm">
                    Karağaaç konarlı mh Uğurmumcu 9, Cadde No:337/B, 31290 Arsuz/Hatay<br/>
                    +90 533 615 85 86
                </p>
            </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SW Cafe. Tüm hakları saklıdır. X NEXİUM
        </div>
      </footer>
    </div>
  );
};
