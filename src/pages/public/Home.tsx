import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Coffee, MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  
  // High quality coffee video
  const videoUrl = "https://player.vimeo.com/external/494248796.sd.mp4?s=d017b209d89269786422b467652758eb0934988f&profile_id=164&oauth2_token_id=57447761";

  return (
    <div className="relative w-full">
      {/* Hero Section with Video */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
             <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60"
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#021E73]/60 via-transparent to-[#021E73]/90" />
        
        {/* Content */}
        <motion.div 
          style={{ opacity, y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <Coffee size={64} className="text-[#335AA6]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black mb-4 tracking-tighter drop-shadow-lg"
          >
            SW CAFE
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl font-light mb-10 max-w-3xl text-gray-200"
          >
            İskenderun'un en özel kahve çekirdekleri ve el yapımı tatlıları.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
             <Link 
              to="/menu" 
              className="px-10 py-4 bg-[#335AA6] text-white font-bold rounded-full hover:bg-white hover:text-[#021E73] transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
            >
              Menüyü Keşfet <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10"
          >
            <ChevronDown size={32} className="text-white/50" />
          </motion.div>
        </motion.div>
      </div>

      {/* Info Cards */}
      <div className="relative z-20 -mt-20 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#021E73]">
                <div className="w-14 h-14 bg-[#021E73]/10 rounded-full flex items-center justify-center mb-4 text-[#021E73]">
                    <Coffee size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#021E73] mb-2">3. Nesil Kahve</h3>
                <p className="text-gray-600">Dünyanın en seçkin çiftliklerinden gelen %100 Arabica çekirdeklerini İskenderun'da sizin için kavuruyoruz.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#335AA6]">
                <div className="w-14 h-14 bg-[#335AA6]/10 rounded-full flex items-center justify-center mb-4 text-[#335AA6]">
                    <Clock size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#021E73] mb-2">Çalışma Saatleri</h3>
                <p className="text-gray-600">Haftanın her günü sabah 08:00'den gece 24:00'e kadar kesintisiz hizmet.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#021E73]">
                <div className="w-14 h-14 bg-[#021E73]/10 rounded-full flex items-center justify-center mb-4 text-[#021E73]">
                    <MapPin size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#021E73] mb-2">Merkezi Konum</h3>
                <p className="text-gray-600">Karağaç 20 metrelik yol bandına yürüme mesafesinde, şehrin kalbinde huzurlu bir mola noktası.</p>
            </div>
        </div>
      </div>

      {/* Why Us Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
                <img 
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000" 
                    alt="Barista making coffee" 
                    className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
                />
            </div>
            <div className="md:w-1/2 space-y-6">
                <h2 className="text-4xl font-bold text-[#021E73]">Neden SW Cafe?</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    SW Cafe olarak sadece kahve sunmuyoruz, bir deneyim tasarlıyoruz. İskenderun'un sıcak atmosferini modern kahve kültürüyle harmanlıyoruz.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-[#335AA6] rounded-full" />
                        Günlük taze kavrulan çekirdekler
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-[#335AA6] rounded-full" />
                        El yapımı katkısız tatlılar
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-[#335AA6] rounded-full" />
                        Hızlı ve güvenilir Wi-Fi hizmeti
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-[#335AA6] rounded-full" />
                        Vegan ve glutensiz seçenekler
                    </li>
                </ul>
                <Link to="/about" className="inline-block px-8 py-3 border-2 border-[#021E73] text-[#021E73] font-bold rounded-full hover:bg-[#021E73] hover:text-white transition-colors mt-4">
                    Hikayemizi Oku
                </Link>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-[#021E73] text-white">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Misafirlerimiz Ne Diyor?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                      <div className="flex justify-center gap-1 text-yellow-400 mb-4">
                          <Star fill="currentColor" size={20} />
                          <Star fill="currentColor" size={20} />
                          <Star fill="currentColor" size={20} />
                          <Star fill="currentColor" size={20} />
                          <Star fill="currentColor" size={20} />
                      </div>
                      <p className="text-lg italic mb-6">"İskenderun'da içtiğim en iyi Latte. Ortamın sakinliği ve çalışanların güleryüzlülüğü harika."</p>
                      <h4 className="font-bold">- Ayşe Y.</h4>
                  </div>
                  <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                      <div className="flex justify-center gap-1 text-yellow-400 mb-4">
                          <Star fill="currentColor" size={20} />
                          <Star fill="currentColor" size={20} />
                          <Star fill="currentColor" size={20} />
                          <Star fill="currentColor" size={20} />
                          <Star fill="currentColor" size={20} />
                      </div>
                      <p className="text-lg italic mb-6">"Waffle'ları efsane! Malzemeler çok taze. Arkadaşlarımla buluşmak için favori mekanımız."</p>
                      <h4 className="font-bold">- Mehmet K.</h4>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};
