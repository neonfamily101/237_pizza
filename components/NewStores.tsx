'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'

const NewStores = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const newStores = [
    {
      name: '237피자 강남점',
      address: '서울특별시 강남구 테헤란로 123',
      openDate: '2024.01.15',
      image: '/images/stores/store1.jpg',
      features: ['24시간 운영', '주차 가능', '배달 서비스']
    },
    {
      name: '237피자 홍대점',
      address: '서울특별시 마포구 홍익로 456',
      openDate: '2024.02.01',
      image: '/images/stores/store2.jpg',
      features: ['심야 배달', '테이크아웃', '단체 주문']
    },
    {
      name: '237피자 부산서면점',
      address: '부산광역시 부산진구 서면로 789',
      openDate: '2024.02.15',
      image: '/images/stores/store3.jpg',
      features: ['매장 취식', '생일 파티', '케이터링']
    },
    {
      name: '237피자 대전둔산점',
      address: '대전광역시 서구 둔산로 101',
      openDate: '2024.03.01',
      image: '/images/stores/store4.jpg',
      features: ['드라이브스루', '픽업 서비스', '온라인 주문']
    },
    {
      name: '237피자 대구동성로점',
      address: '대구광역시 중구 동성로 202',
      openDate: '2024.03.15',
      image: '/images/stores/store5.jpg',
      features: ['무료 와이파이', '단체석', '포장 전문']
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-red-800 font-gmarket mb-4">
            NEW STORES
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            새롭게 오픈한 237피자 매장들을 만나보세요
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {newStores.map((store, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border"
                >
                  <div className="relative h-48 bg-gray-100 overflow-hidden border-b">
                    {/* --- 수정된 부분 --- */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-700/20 to-red-900/20 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 bg-red-700 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <span className="text-white text-2xl font-bold">🏪</span>
                      </motion.div>
                    </div>
                    {/* --- 수정된 부분 --- */}
                    <div className="absolute top-4 right-4 bg-red-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      NEW
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-red-800 mb-3 font-gmarket">
                      {store.name}
                    </h3>
                    
                    <div className="flex items-start mb-3">
                      {/* --- 수정된 부분 --- */}
                      <MapPin className="w-4 h-4 text-red-700 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {store.address}
                      </p>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {/* --- 수정된 부분 --- */}
                      <Calendar className="w-4 h-4 text-red-700 mr-2" />
                      <span className="text-gray-600 text-sm">
                        오픈일: {store.openDate}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {store.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            // --- 수정된 부분 ---
                            className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium border border-red-200"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      // --- 수정된 부분 ---
                      className="w-full bg-red-700 text-white py-2 rounded-lg font-medium hover:bg-red-800 transition-colors duration-300 shadow"
                    >
                      매장 정보 보기
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 gap-4">
             {/* --- 수정된 부분 --- */}
            <button className="swiper-button-prev-custom w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center hover:bg-red-800 transition-colors duration-300 shadow-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="swiper-button-next-custom w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center hover:bg-red-800 transition-colors duration-300 shadow-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // --- 수정된 부분 ---
            className="bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-red-800 transition-colors duration-300 shadow-lg"
          >
            전체 매장 보기
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default NewStores
