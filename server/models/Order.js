import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number, // Birim fiyat (ekstralar dahil o anki fiyat)
  quantity: Number,
  selectedExtras: [{ name: String, price: Number }]
});

const orderSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  note: String,
  status: { 
    type: String, 
    enum: ['hazırlanıyor', 'tamamlandı', 'iptal'], 
    default: 'hazırlanıyor' 
  },
  source: { type: String, default: 'qr' },
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', orderSchema);
