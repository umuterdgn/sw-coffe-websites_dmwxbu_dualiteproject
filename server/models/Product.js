import mongoose from 'mongoose';

const extraSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: String,
  images: [String],
  allergens: [String],
  extras: [extraSchema],
  story: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model('Product', productSchema);
