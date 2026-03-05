import express from 'express';
import { Order } from '../models/Order.js';
import { ProductStat } from '../models/ProductStat.js';

const router = express.Router();

// Create Order
router.post('/', async (req, res) => {
  try {
    const { tableNumber, items, totalAmount, note } = req.body;
    
    const newOrder = new Order({
      tableNumber,
      items,
      totalAmount,
      note
    });

    const savedOrder = await newOrder.save();

    // İstatistikleri güncelle (Ordered sayısını artır)
    for (const item of items) {
      if (item.productId) {
        await ProductStat.findOneAndUpdate(
          { productId: item.productId },
          { 
            $inc: { ordered: item.quantity },
            $setOnInsert: { productName: item.name }
          },
          { upsert: true }
        );
      }
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Orders (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
