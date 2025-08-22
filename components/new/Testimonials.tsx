'use client';

import React from 'react';
// Swiper 라이브러리 임포트 경로를 표준 방식으로 수정합니다.
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star, User, MapPin } from 'lucide-react';

// Swiper CSS 파일들을 표준 import 방식으로 가져옵니다.
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const testimonials = [
  {
    name: "Jane Doe",
    role: "Food Blogger",
    quote: "The best gluten-free pizza I've ever had! The crust was perfectly crispy and chewy. It's a game-changer for people with Celiac disease.",
    rating: 5,
  },
  {
    name: "John Smith",
    role: "Pizza Lover",
    quote: "I'couldn't believe it was gluten-free. The flavors were incredible, and I didn't feel bloated afterward. I'm a customer for life!",
    rating: 5,
  },
  {
    name: "Emily White",
    role: "Local Resident",
    quote: "A beautiful place with an even more beautiful mission. The pizza is just divine. Highly recommend the truffle quattro formaggi!",
    rating: 5,
  },
  {
    name: "Michael Brown",
    role: "Tourist",
    quote: "Found this gem on our trip to Seoul. The staff was incredibly friendly and the pizza was out of this world. A must-visit!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#FBEFDD] py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-[#9A3434]">
            What Our Customers Say
          </h2>
          <p className="text-[#9A3434]/80 mt-4 max-w-3xl mx-auto text-lg">
            Don't just take our word for it. Here's what people are saying about their 237 Pizza experience.
          </p>
        </motion.div>

        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full max-w-lg"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                      <User className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#9A3434]">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex justify-end mt-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className='text-center text-gray-500 text-sm'>* Real Review *</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const MapSection = () => {
  const address = "챕터 한남동 B1, 서울특별시 용산구 이태원로 237";
  // 주소를 직접 검색 쿼리로 사용하여 지도를 표시하도록 URL을 수정합니다.
  const encodedAddress = encodeURIComponent("서울특별시 용산구 이태원로 237");
  const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="bg-[#F8F4E9] py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-[#9A3434]">
            Find Us Here
          </h2>
          <div className="flex justify-center items-center mt-6">
            <MapPin className="w-6 h-6 text-[#9A3434]/80 mr-2" />
            <p className="text-[#9A3434]/80 text-lg">
              {address}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl border-4 border-white"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            // allowFullScreen 속성값을 boolean 타입으로 수정합니다.
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
    )
}
