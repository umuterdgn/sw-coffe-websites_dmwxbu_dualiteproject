import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Product } from './models/Product.js';

// Routes
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import statRoutes from './routes/stats.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/swcafe')
  .then(() => {
    console.log('✅ MongoDB Connected');
    seedProducts();
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Initial Data Seeding
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const initialProducts = [
        {
            name: 'Iced Latte',
            price: 120,
            category: 'Soğuk Kahveler',
            description: 'Soğuk süt ve espresso ile hazırlanan ferahlatıcı lezzet.',
            images: ['https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600'],
            allergens: ['Süt', 'Laktoz'],
            extras: [
                { name: 'Vanilya Şurubu', price: 20 },
                { name: 'Karamel Şurubu', price: 20 },
                { name: 'Yulaf Sütü', price: 30 }
            ],
            story: 'Etiyopya çekirdeklerinden özenle hazırlanan espressomuzun buzla dansı.',
        },
        {
            name: 'Türk Kahvesi',
            price: 80,
            category: 'Turkish Coffee',
            description: 'Geleneksel yöntemlerle pişirilen bol köpüklü Türk kahvesi.',
            images: ['https://images.unsplash.com/photo-1596910547037-846b1980329f?auto=format&fit=crop&q=80&w=600'],
            allergens: [],
            extras: [{ name: 'Çifte Kavrulmuş Lokum', price: 15 }],
            story: '500 yıllık geleneğin fincandaki yansıması.',
        },
        {
            name: 'Çikolatalı Waffle',
            price: 250,
            category: 'Waffles',
            description: 'Taze meyveler ve Belçika çikolatası ile.',
            images: ['https://images.unsplash.com/photo-1562519702-8959d09795c4?auto=format&fit=crop&q=80&w=600'],
            allergens: ['Gluten', 'Süt', 'Yumurta'],
            extras: [
                { name: 'Ekstra Çikolata', price: 40 },
                { name: 'Dondurma Topu', price: 35 }
            ],
            story: 'Brüksel sokaklarından gelen tatlı bir kaçamak.',
        }
      ];
      await Product.insertMany(initialProducts);
      console.log('🌱 Initial products seeded');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

// Routes Middleware
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send('SW Cafe API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
