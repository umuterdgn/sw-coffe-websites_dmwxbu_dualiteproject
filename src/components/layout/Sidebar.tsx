import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../types';
import { Coffee, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 left-0 z-50 h-full w-72 bg-[#021E73] text-white shadow-2xl lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2 font-bold text-2xl">
                <Coffee className="text-[#335AA6]" />
                <span>SW CAFE</span>
              </div>
              <button onClick={onClose} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
              <div>
                <h3 className="px-4 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Menü
                </h3>
                <div className="space-y-1">
                  <NavLink
                    to="/"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl transition-colors ${
                        isActive ? 'bg-[#335AA6] text-white' : 'text-gray-300 hover:bg-white/5'
                      }`
                    }
                  >
                    Ana Sayfa
                  </NavLink>
                  <NavLink
                    to="/menu"
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl transition-colors ${
                        isActive ? 'bg-[#335AA6] text-white' : 'text-gray-300 hover:bg-white/5'
                      }`
                    }
                  >
                    Tüm Ürünler
                  </NavLink>
                  <NavLink
                    to="/about"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl transition-colors ${
                        isActive ? 'bg-[#335AA6] text-white' : 'text-gray-300 hover:bg-white/5'
                      }`
                    }
                  >
                    Hakkımızda
                  </NavLink>
                  <NavLink
                    to="/contact"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl transition-colors ${
                        isActive ? 'bg-[#335AA6] text-white' : 'text-gray-300 hover:bg-white/5'
                      }`
                    }
                  >
                    İletişim
                  </NavLink>
                </div>
              </div>

              <div>
                <h3 className="px-4 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Kategoriler
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.map((category) => (
                    <NavLink
                      key={category}
                      to={`/menu?category=${encodeURIComponent(category)}`}
                      onClick={onClose}
                      className={({ isActive }) => {
                        const currentParams = new URLSearchParams(location.search);
                        const isCatActive = currentParams.get('category') === category;
                        return `block px-4 py-2.5 rounded-xl text-sm transition-colors ${
                          isCatActive ? 'bg-[#335AA6]/50 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`
                      }}
                    >
                      {category}
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>

            <div className="p-4 border-t border-white/10">
               <NavLink
                to="/admin"
                onClick={onClose}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                Yönetici Girişi
              </NavLink>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
