import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Coffee, Menu as MenuIcon, ShoppingBag } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { toggleCart, cart } = useCafe();
  
  const isHome = location.pathname === '/';
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackgroundClass = (scrolled || !isHome) 
    ? 'bg-[#021E73]/95 backdrop-blur-md shadow-lg py-3' 
    : 'bg-transparent py-5';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBackgroundClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white group">
          <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
            <Coffee size={24} />
          </div>
          <span className="font-bold text-xl tracking-wider">SW CAFE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink 
            to="/" 
            className={({isActive}) => `text-sm font-medium transition-colors hover:text-[#335AA6] ${isActive ? 'text-white border-b-2 border-[#335AA6]' : 'text-gray-200'}`}
          >
            ANA SAYFA
          </NavLink>
          
          <NavLink 
            to="/menu" 
            className={({isActive}) => `text-sm font-medium transition-colors hover:text-[#335AA6] ${isActive ? 'text-white border-b-2 border-[#335AA6]' : 'text-gray-200'}`}
          >
            MENÜLER
          </NavLink>

          <NavLink 
            to="/about" 
            className={({isActive}) => `text-sm font-medium transition-colors hover:text-[#335AA6] ${isActive ? 'text-white border-b-2 border-[#335AA6]' : 'text-gray-200'}`}
          >
            HAKKIMIZDA
          </NavLink>

          <NavLink 
            to="/contact" 
            className={({isActive}) => `text-sm font-medium transition-colors hover:text-[#335AA6] ${isActive ? 'text-white border-b-2 border-[#335AA6]' : 'text-gray-200'}`}
          >
            İLETİŞİM
          </NavLink>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button 
                onClick={toggleCart}
                className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors group"
            >
                <ShoppingBag size={24} />
                {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-[#021E73] group-hover:border-transparent transition-colors">
                        {cartItemCount}
                    </span>
                )}
            </button>

            {/* Mobile Menu Button */}
            <button 
            onClick={onMobileMenuToggle}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
            <MenuIcon size={24} />
            </button>
        </div>
      </div>
    </nav>
  );
};
