import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    // pt-24 ekledik ki sabit navbar içeriğin üstüne binmesin
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-[#021E73] mb-8">Hakkımızda</h1>
        
        <div className="prose prose-lg text-gray-600">
          <p className="mb-6">
            SW Cafe olarak, kahve tutkusunu modern bir deneyimle birleştiriyoruz. 
            Amacımız sadece bir içecek sunmak değil, her yudumda size özel bir hikaye anlatmak.
          </p>
          
          <div className="my-8 rounded-2xl overflow-hidden shadow-lg h-64 md:h-96">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" 
              alt="Cafe Interior" 
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-2xl font-bold text-[#021E73] mb-4">Vizyonumuz</h3>
          <p className="mb-6">
            Kaliteli çekirdekler, usta eller ve sıcak bir atmosfer. SW Cafe'de her detay, 
            sizin konforunuz ve keyfiniz için düşünüldü. Sürdürülebilir kaynaklardan elde ettiğimiz 
            kahvelerimizle doğaya saygılı, lezzete tutkulu bir yolculuğa çıkıyoruz.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
