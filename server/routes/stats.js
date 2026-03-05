import express from 'express';
import { ProductStat } from '../models/ProductStat.js';

const router = express.Router();

// Record View
router.post('/view', async (req, res) => {
  try {
    const { productId, productName } = req.body;
    await ProductStat.findOneAndUpdate(
      { productId },
      { 
        $inc: { views: 1 },
        $setOnInsert: { productName }
      },
      { upsert: true }
    );
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Record Add to Cart
router.post('/cart', async (req, res) => {
  try {
    const { productId, productName } = req.body;
    await ProductStat.findOneAndUpdate(
      { productId },
      { 
        $inc: { addedToCart: 1 },
        $setOnInsert: { productName }
      },
      { upsert: true }
    );
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
