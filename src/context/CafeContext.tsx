import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Product, Stat, CartItem, Order, ExtraOption, OrderStatus } from '../types';
import { Toast, ToastType } from '../components/ui/Toast';

interface CafeContextType {
  products: Product[];
  stats: any; // Dashboard stats
  isAuthenticated: boolean;
  cart: CartItem[];
  orders: Order[];
  isCartOpen: boolean;
  tableNumber: number | null;
  setTableNumber: (num: number) => void;
  // Auth
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  // Product
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductsByCategory: (category: string) => Product[];
  // Stats
  recordClick: (productId: string, productName: string) => void;
  // Cart
  addToCart: (product: Product, quantity: number, extras: ExtraOption[]) => void;
  removeFromCart: (cartId: string) => void;
  updateCartItemQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  // Order
  placeOrder: (tableId: number, note?: string) => Promise<boolean>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  refreshOrders: () => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export const CafeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<any>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState<number | null>(null);

  // Toast State
  const [toast, setToast] = useState<{ msg: string; type: ToastType; show: boolean }>({
    msg: '', type: 'success', show: false
  });

  const showToast = (msg: string, type: ToastType) => {
    setToast({ msg, type, show: true });
  };

  // Initial Fetch
  useEffect(() => {
    fetchProducts();
    const storedAuth = localStorage.getItem('cafe_auth');
    if (storedAuth === 'true') setIsAuthenticated(true);
    
    // Session'dan masa numarasını al (Sayfa yenilenirse kaybolmasın)
    const sessionTable = sessionStorage.getItem('tableNumber');
    if (sessionTable) setTableNumber(parseInt(sessionTable));
  }, []);

  // Admin girişi yapıldıysa siparişleri ve istatistikleri çek
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      fetchDashboardStats();
      const interval = setInterval(fetchOrders, 30000); // 30 saniyede bir yenile
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      // MongoDB _id'yi id olarak mapleyelim
      const mapped = res.data.map((p: any) => ({ ...p, id: p._id }));
      setProducts(mapped);
    } catch (err) {
      console.error("Ürünler çekilemedi", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders');
      const mapped = res.data.map((o: any) => ({ ...o, id: o._id }));
      setOrders(mapped);
    } catch (err) {
      console.error("Siparişler çekilemedi", err);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get('/api/dashboard/stats');
      setStats(res.data);
    } catch (err) {
      console.error("İstatistikler çekilemedi", err);
    }
  };

  // Auth Methods
  const login = (email: string, pass: string) => {
    if (email === 'admin@swcafe.com' && pass === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('cafe_auth', 'true');
      showToast('Giriş başarılı', 'success');
      return true;
    }
    showToast('Hatalı giriş bilgileri', 'error');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cafe_auth');
    showToast('Çıkış yapıldı', 'success');
  };

  // Product Methods
  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      await axios.post('/api/products', product);
      await fetchProducts();
      showToast('Ürün başarıyla eklendi', 'success');
    } catch (err) {
      showToast('Ürün eklenirken hata oluştu', 'error');
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct);
      await fetchProducts();
      showToast('Ürün güncellendi', 'success');
    } catch (err) {
      showToast('Güncelleme hatası', 'error');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      await fetchProducts();
      showToast('Ürün silindi', 'success');
    } catch (err) {
      showToast('Silme hatası', 'error');
    }
  };

  const recordClick = async (productId: string, productName: string) => {
    try {
      await axios.post('/api/stats/view', { productId, productName });
    } catch (e) { console.error(e); }
  };

  const getProductsByCategory = (category: string) => {
    return products.filter((p) => p.category === category);
  };

  // Cart Methods
  const addToCart = (product: Product, quantity: number, extras: ExtraOption[]) => {
    const extrasPrice = extras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = product.price + extrasPrice;
    
    // İstatistik gönder
    axios.post('/api/stats/cart', { productId: product.id, productName: product.name }).catch(console.error);

    const existingItemIndex = cart.findIndex(item => 
      item.product.id === product.id && 
      JSON.stringify(item.selectedExtras.sort((a,b) => a.name.localeCompare(b.name))) === 
      JSON.stringify(extras.sort((a,b) => a.name.localeCompare(b.name)))
    );

    if (existingItemIndex > -1) {
      setCart(prev => {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        newCart[existingItemIndex].totalPrice = newCart[existingItemIndex].quantity * unitPrice;
        return newCart;
      });
    } else {
      const newItem: CartItem = {
        cartId: crypto.randomUUID(),
        product,
        quantity,
        selectedExtras: extras,
        totalPrice: quantity * unitPrice
      };
      setCart(prev => [...prev, newItem]);
    }
    setIsCartOpen(true);
    showToast('Sepete eklendi', 'success');
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateCartItemQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        const unitPrice = item.totalPrice / item.quantity;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * unitPrice
        };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Order Methods
  const placeOrder = async (tableId: number, note?: string) => {
    if (cart.length === 0) return false;

    const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    
    const orderPayload = {
      tableNumber: tableId,
      items: cart.map(c => ({
        productId: c.product.id,
        name: c.product.name,
        price: c.totalPrice / c.quantity,
        quantity: c.quantity,
        selectedExtras: c.selectedExtras
      })),
      totalAmount,
      note
    };

    try {
      await axios.post('/api/orders', orderPayload);
      clearCart();
      setIsCartOpen(false);
      showToast('Siparişiniz alındı!', 'success');
      return true;
    } catch (err) {
      showToast('Sipariş oluşturulamadı', 'error');
      return false;
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status });
      await fetchOrders();
      showToast(`Sipariş durumu: ${status}`, 'success');
    } catch (err) {
      showToast('Durum güncellenemedi', 'error');
    }
  };

  return (
    <CafeContext.Provider
      value={{
        products,
        stats,
        isAuthenticated,
        cart,
        orders,
        isCartOpen,
        tableNumber,
        setTableNumber,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        recordClick,
        getProductsByCategory,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        toggleCart,
        placeOrder,
        updateOrderStatus,
        refreshOrders: fetchOrders
      }}
    >
      {children}
      <Toast 
        message={toast.msg} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast(prev => ({ ...prev, show: false }))} 
      />
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (context === undefined) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
