'use client';

import React, { useEffect, useRef } from 'react';

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
    name: "김**3277",
    role: "Naver Review",
    quote: "글루텐프리 피자여서 다이어트 중이신 분들도 안심하고 먹을 수 있어요! 속도 편하고요!! 그리고 무엇보다 쫄깃하고 짱맛있습니당👍🏻 사장님께서도 친절하셔서 좋아요!!",
    rating: 5,
  },
  {
    name: "이뱅*",
    role: "Naver Review",
    quote: "이태리에서 공수한 재료로 피자를 만드는 곳. 정말 담백하고 도우가 쫄깃합니다. 일반 피자와 다르게 기교없이 맛으로 승부하는 곳이예요. 사장님도 너무 친절하시고 다시 방문하고 싶은 한남동 피자맛집입니다.",
    rating: 5,
  },
  {
    name: "Emily White",
    role: "Google Review",
    quote: "A beautiful place with an even more beautiful mission. The pizza is just divine. Highly recommend the truffle quattro formaggi!",
    rating: 5,
  },
  {
    name: "Michael Brown",
    role: "Google Review",
    quote: "Found this gem on our trip to Seoul. The staff was incredibly friendly and the pizza was out of this world. A must-visit!",
    rating: 5,
  },
];

const Testimonials = () => {
  const swiperRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const tick = () => {
      const swiper = swiperRef.current;
      if (swiper && !swiper.destroyed) {
        // 마지막이면 처음으로 점프하여 무한 재생처럼 보이게 처리
        if (swiper.activeIndex >= swiper.slides.length - 1) {
          swiper.slideTo(0, 0);
        } else {
          swiper.slideNext();
        }
      }
      timerRef.current = setTimeout(tick, 1000);
    };
    timerRef.current = setTimeout(tick, 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="bg-[#FBEFDD] py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-[#9A3434]">
            What Our Customers Say
          </h2>
          <p className="text-[#9A3434]/80 mt-4 max-w-3xl mx-auto text-lg">
            실제 237 PIZZA를 방문한 고객님들의 생생한 후기입니다.
          </p>
        </motion.div>

        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          // autoplay는 일부 환경에서 cards 효과와 충돌할 수 있어 수동 타이머로 제어합니다.
          // autoplay={{ delay: 1000, disableOnInteraction: false }}
          loop={false}
          rewind={true}
          allowTouchMove={false}
          className="w-full max-w-lg"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // 안전하게 시작
            if (swiper.autoplay && typeof swiper.autoplay.start === 'function') {
              swiper.autoplay.start();
            }
          }}
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
