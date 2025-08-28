'use client';

import React from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star, User, MapPin } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';


const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.902,36.631,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
);
const NaverIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.225 12.015L7.804 4H4v16h3.804V11.985l8.421 8.015H20V4h-3.775v8.015z" fill="#03C75A"/></svg>
);

import testimonials from '@/data/testimonials.json';

const Testimonials = () => {
  return (
    <section className="bg-[#FBEFDD] py-16 sm:py-20 md:py-24">
      <style>{`
        .review-card { min-height: 400px; }
        @media (min-width: 640px){ .review-card { min-height: 420px; } }
        .review-quote { overflow:hidden; display:-webkit-box; -webkit-line-clamp:5; -webkit-box-orient:vertical; }
        .swiper-slide-active .review-quote { -webkit-line-clamp:unset; }
      `}</style>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12 md:mb-16" 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#9A3434]">What Our Customers Say</h2>
          <p className="text-[#9A3434]/80 mt-4 max-w-3xl mx-auto text-base sm:text-lg">실제 237 PIZZA를 방문한 고객님들의 생생한 후기입니다.</p>
        </motion.div>

        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false, 
          }}
          rewind={true} 
          className="w-full max-w-lg"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl review-card">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
                      <User className="w-7 h-7 sm:w-8 sm:h-8 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#9A3434]">{t.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        {t.role.includes('Google') && <GoogleIcon className="w-4 h-4" />}
                        {t.role.includes('Naver') && <NaverIcon className="w-4 h-4" />}
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic review-quote">"{t.quote}"</p>
                </div>
                <div className="mt-3 flex justify-end">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-center text-gray-500 text-sm mt-2">* Real Review *</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const MapSection = () => {
  const address = "서울특별시 용산구 서울시 용산구 이태원로237 챕터 한남동 B1";
  const encodedAddress = encodeURIComponent("237 Pizza");
  const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (

    <section className="bg-[#F8F4E9] py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#9A3434]">Find Us Here</h2>
          <div className="flex justify-center items-center mt-6 text-base sm:text-lg">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#9A3434]/80 mr-2 flex-shrink-0" />
            <p className="text-[#9A3434]/80">{address}</p>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border-4 border-white"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <iframe
            title="237 PIZZA Location"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default function LocationPage() {
  return (
    <main>
      <Testimonials />
      <MapSection />
    </main>
  );
}