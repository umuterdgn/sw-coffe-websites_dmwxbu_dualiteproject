import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ChefHat } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateCartItemQuantity, placeOrder, tableNumber } = useCafe();
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [orderNote, setOrderNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Context'teki masa numarasını state'e aktar
  useEffect(() => {
    if (tableNumber) {
      setSelectedTable(tableNumber.toString());
    }
  }, [tableNumber]);

  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const tables = Array.from({ length: 14 }, (_, i) => (i + 1).toString());

  const handlePlaceOrder = async () => {
    if (!selectedTable) {
      alert('Lütfen bir masa seçiniz veya QR kodu okutunuz.');
      return;
    }
    
    setIsProcessing(true);
    const success = await placeOrder(parseInt(selectedTable), orderNote);
    setIsProcessing(false);
    
    if (success) {
      setOrderNote('');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="p-5 border-b flex items-center justify-between bg-[#021E73] text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag />
                <h2 className="text-xl font-bold">Sepetim</h2>
              </div>
              <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p className="text-lg">Sepetiniz henüz boş.</p>
                  <button onClick={toggleCart} className="text-[#021E73] font-bold hover:underline">
                    Menüye Dön
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-20 h-20 object-cover rounded-lg bg-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-800">{item.product.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        {item.selectedExtras.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.selectedExtras.map(e => e.name).join(', ')}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 bg-white border rounded-lg px-2 py-1">
                            <button 
                              onClick={() => updateCartItemQuantity(item.cartId, -1)}
                              className="text-gray-500 hover:text-[#021E73]"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartItemQuantity(item.cartId, 1)}
                              className="text-gray-500 hover:text-[#021E73]"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="font-bold text-[#021E73]">{item.totalPrice} ₺</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t bg-gray-50 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Masa Seçimi</label>
                  <select 
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    disabled={!!tableNumber} // Eğer QR ile geldiyse kilitli olabilir
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#021E73] outline-none bg-white disabled:bg-gray-100"
                  >
                    <option value="">Lütfen masanızı seçin</option>
                    {tables.map(t => (
                      <option key={t} value={t}>Masa {t}</option>
                    ))}
                  </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sipariş Notu (Opsiyonel)</label>
                    <input 
                        type="text" 
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        placeholder="Örn: Kahve çok sıcak olsun"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#021E73] outline-none bg-white text-sm"
                    />
                </div>

                <div className="flex items-center justify-between text-lg font-bold text-gray-800 pt-2">
                  <span>Toplam</span>
                  <span>{totalAmount} ₺</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`w-full py-4 bg-[#021E73] text-white font-bold rounded-xl hover:bg-[#335AA6] transition-colors shadow-lg flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ChefHat size={20} />
                      Siparişi Tamamla
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
