import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Plus, Minus } from 'lucide-react';
import { Product, ExtraOption } from '../../types';
import { useCafe } from '../../context/CafeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  product?: Product | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCafe();
  
  useEffect(() => {
    if (isOpen) {
        setSelectedExtras([]);
        setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const toggleExtra = (extra: ExtraOption) => {
    if (selectedExtras.find(e => e.name === extra.name)) {
        setSelectedExtras(prev => prev.filter(e => e.name !== extra.name));
    } else {
        setSelectedExtras(prev => [...prev, extra]);
    }
  };

  const basePrice = product.price + selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const totalPrice = basePrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedExtras);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
          >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white text-gray-800 transition-colors"
            >
                <X size={24} />
            </button>

            {/* Image Section */}
            <div className="md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
                <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:hidden">
                    <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col">
                <div className="hidden md:block mb-4">
                    <h3 className="text-3xl font-bold text-[#021E73]">{product.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-gray-600 leading-relaxed mb-6">
                        {product.description}
                    </p>

                    {product.story && (
                         <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <p className="text-[#021E73] italic text-sm">"{product.story}"</p>
                        </div>
                    )}

                    {product.allergens.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Alerjenler</h4>
                            <div className="flex flex-wrap gap-2">
                                {product.allergens.map(a => (
                                    <span key={a} className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.extras.length > 0 && (
                        <div className="mb-8">
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Ekstralar</h4>
                            <div className="space-y-2">
                                {product.extras.map((extra, idx) => {
                                    const isSelected = !!selectedExtras.find(e => e.name === extra.name);
                                    return (
                                        <div 
                                            key={idx}
                                            onClick={() => toggleExtra(extra)}
                                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                                isSelected 
                                                ? 'border-[#335AA6] bg-[#335AA6]/5' 
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-[#335AA6] border-[#335AA6]' : 'border-gray-400'}`}>
                                                    {isSelected && <Check size={14} className="text-white" />}
                                                </div>
                                                <span className={`text-sm ${isSelected ? 'font-semibold text-[#021E73]' : 'text-gray-700'}`}>{extra.name}</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-500">+{extra.price} ₺</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Price & Quantity */}
                <div className="pt-6 mt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-1 hover:bg-white rounded-lg transition-colors"
                            >
                                <Minus size={18} className="text-gray-600"/>
                            </button>
                            <span className="font-bold text-lg w-6 text-center">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-1 hover:bg-white rounded-lg transition-colors"
                            >
                                <Plus size={18} className="text-gray-600"/>
                            </button>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-gray-500 block">Toplam Tutar</span>
                            <span className="text-3xl font-bold text-[#021E73]">{totalPrice} ₺</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        className="w-full py-4 bg-[#021E73] text-white font-bold rounded-xl hover:bg-[#335AA6] transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                    >
                        Sepete Ekle
                    </button>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
