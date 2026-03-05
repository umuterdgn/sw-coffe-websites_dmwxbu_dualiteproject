import mongoose from 'mongoose';

const productStatSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: String,
  views: { type: Number, default: 0 },
  addedToCart: { type: Number, default: 0 },
  ordered: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export const ProductStat = mongoose.model('ProductStat', productStatSchema);
