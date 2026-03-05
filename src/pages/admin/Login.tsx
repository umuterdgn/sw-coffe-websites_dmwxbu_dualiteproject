import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCafe } from '../../context/CafeContext';
import { Coffee, Lock, User, ArrowLeft } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useCafe();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Geçersiz e-posta veya şifre.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#021E73] transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        Ana Sayfaya Dön
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#021E73] rounded-full flex items-center justify-center text-white mx-auto mb-4">
            <Coffee size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[#021E73]">Yönetici Girişi</h1>
          <p className="text-gray-500 text-sm mt-2">Lütfen devam etmek için giriş yapın.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={20} className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-[#021E73] focus:border-[#021E73]"
                placeholder="admin@swcafe.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-[#021E73] focus:border-[#021E73]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#021E73] text-white font-bold rounded-xl hover:bg-[#335AA6] transition-colors shadow-lg"
          >
            Giriş Yap
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-400">
            <p>NEXİUM</p>
        </div>
      </div>
    </div>
  );
};
