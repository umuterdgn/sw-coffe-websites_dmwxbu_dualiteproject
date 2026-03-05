import express from 'express';
import { Order } from '../models/Order.js';
import { ProductStat } from '../models/ProductStat.js';
import { Product } from '../models/Product.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    // 1. Toplam Ciro ve Sipariş Sayısı
    const totalStats = await Order.aggregate([
      { $match: { status: 'tamamlandı' } },
      { 
        $group: { 
          _id: null, 
          totalRevenue: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        } 
      }
    ]);

    const totalOrdersCount = await Order.countDocuments();
    const totalProductsCount = await Product.countDocuments();

    // 2. En çok görüntülenen ürünler
    const topViewed = await ProductStat.find().sort({ views: -1 }).limit(5);

    // 3. Saatlik Sipariş Dağılımı (Basit)
    // MongoDB aggregation ile saatleri gruplayabiliriz
    const hourlyStats = await Order.aggregate([
      {
        $project: {
          hour: { $hour: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$hour",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      revenue: totalStats[0]?.totalRevenue || 0,
      completedOrders: totalStats[0]?.count || 0,
      totalOrders: totalOrdersCount,
      totalProducts: totalProductsCount,
      topViewed,
      hourlyStats
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
