import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCafe } from '../../context/CafeContext';
import { Product } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';

export const Menu: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const tableParam = searchParams.get('table');
  
  const { products, getProductsByCategory, recordClick, setTableNumber, tableNumber } = useCafe();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // URL'den masa numarasını yakala
  useEffect(() => {
    if (tableParam) {
      const num = parseInt(tableParam);
      if (!isNaN(num)) {
        setTableNumber(num);
        sessionStorage.setItem('tableNumber', num.toString());
      }
    }
  }, [tableParam, setTableNumber]);

  const displayProducts = categoryFilter 
    ? getProductsByCategory(categoryFilter)
    : products;

  const handleProductClick = (product: Product) => {
    recordClick(product.id, product.name);
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Masa Bilgisi Banner */}
        {tableNumber && (
          <div className="mb-6 bg-[#021E73]/5 border border-[#021E73]/10 p-4 rounded-xl flex items-center gap-3 text-[#021E73]">
            <QrCode size={24} />
            <div>
              <p className="font-bold">Masa {tableNumber}</p>
              <p className="text-xs opacity-70">Siparişiniz bu masaya servis edilecektir.</p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
             <div>
                <h2 className="text-4xl font-bold text-[#021E73]">
                {categoryFilter || 'Tüm Menü'}
                </h2>
                <p className="text-gray-500 mt-2">Lezzetli seçeneklerimizi keşfedin.</p>
             </div>
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xl text-gray-400">Yükleniyor veya bu kategoride ürün yok...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <motion.div
                key={product.id}
                layoutId={`product-${product.id}`}
                whileHover={{ y: -8 }}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-medium text-sm">Detayları Gör</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-[#335AA6] transition-colors">{product.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-2xl font-bold text-[#021E73]">{product.price} ₺</span>
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#021E73] group-hover:bg-[#021E73] group-hover:text-white transition-colors">
                          +
                      </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </div>
  );
};
