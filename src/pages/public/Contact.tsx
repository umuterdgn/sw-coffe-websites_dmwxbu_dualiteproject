import React from "react";
import { Phone, Mail, MapPin, Instagram, Clock } from "lucide-react";

export const Contact: React.FC = () => {
  return (
    <div className="pt-24 pb-12 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#021E73] mb-4">
          İletişim
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          İskenderun'un en keyifli noktasında, kahve kokuları eşliğinde sizi
          bekliyoruz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Info Cards */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#021E73] flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#021E73]/10 rounded-full flex items-center justify-center text-[#021E73] mb-6">
            <MapPin size={32} />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">Adres</h3>
          <p className="text-gray-600">
            Karağaaç konarlı mh Uğurmumcu 9, Cadde No:337/B, 31290 Arsuz/Hatay
            <br />
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#335AA6] flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#335AA6]/10 rounded-full flex items-center justify-center text-[#335AA6] mb-6">
            <Phone size={32} />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">İletişim</h3>
          <p className="text-gray-600 mb-2">+90 533 615 85 86</p>
          <p className="text-gray-600">info@swcafe.com</p>
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-[#E1306C] transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#021E73] flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#021E73]/10 rounded-full flex items-center justify-center text-[#021E73] mb-6">
            <Clock size={32} />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">
            Çalışma Saatleri
          </h3>
          <p className="text-gray-600">
            Hafta İçi: 08:00 - 24:00
            <br />
            Hafta Sonu: 08:00 - 01:00
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white p-4 rounded-3xl shadow-xl h-[400px] md:h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51165.69686004653!2d36.14282667683935!3d36.58628892972993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152f5828f034339d%3A0x67396071f026024!2zxLBza2VuZGVydW4sIEhhdGF5!5e0!3m2!1str!2str!4v1708900000000!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "1.5rem" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"></iframe>
      </div>
    </div>
  );
};
