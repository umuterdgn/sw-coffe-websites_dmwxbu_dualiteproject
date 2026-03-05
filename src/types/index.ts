export type Category = 
  | 'Soğuk Kahveler'
  | 'Sıcak Kahveler'
  | 'Sıcak İçecekler'
  | 'SW Special'
  | 'Bubble Tea'
  | 'Waffles'
  | 'Turkish Coffee';

export const CATEGORIES: Category[] = [
  'Soğuk Kahveler',
  'Sıcak Kahveler',
  'Sıcak İçecekler',
  'SW Special',
  'Bubble Tea',
  'Waffles',
  'Turkish Coffee'
];

export interface ExtraOption {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  images: string[];
  allergens: string[];
  extras: ExtraOption[]; 
  story: string;
}

export interface Stat {
  id: string;
  productId: string;
  productName: string;
  timestamp: number;
}

// Yeni Eklenen Tipler
export interface CartItem {
  cartId: string; // Sepetteki benzersiz ID (aynı ürün farklı ekstralarla olabilir)
  product: Product;
  quantity: number;
  selectedExtras: ExtraOption[];
  totalPrice: number;
}

export type OrderStatus = 'hazırlanıyor' | 'tamamlandı' | 'iptal';

export interface Order {
  id: string;
  tableId: string; // Masa 1, Masa 2 vb.
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  timestamp: number;
  note?: string;
}
