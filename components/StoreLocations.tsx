'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Clock, Search } from 'lucide-react'

const StoreLocations = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('전체')

  const regions = ['전체', '서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산']

  const stores = [
    {
      id: 1,
      name: '237피자 강남점',
      address: '서울특별시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      hours: '11:00 - 23:00',
      region: '서울',
      isNew: true,
      services: ['배달', '포장', '매장 취식']
    },
    {
      id: 2,
      name: '237피자 홍대점',
      address: '서울특별시 마포구 홍익로 456',
      phone: '02-2345-6789',
      hours: '11:00 - 24:00',
      region: '서울',
      isNew: false,
      services: ['배달', '포장', '심야 배달']
    },
    {
      id: 3,
      name: '237피자 분당점',
      address: '경기도 성남시 분당구 정자로 789',
      phone: '031-3456-7890',
      hours: '11:00 - 23:00',
      region: '경기',
      isNew: false,
      services: ['배달', '포장', '매장 취식', '주차 가능']
    },
    {
      id: 4,
      name: '237피자 부산서면점',
      address: '부산광역시 부산진구 서면로 101',
      phone: '051-4567-8901',
      hours: '11:00 - 23:30',
      region: '부산',
      isNew: true,
      services: ['배달', '포장', '매장 취식']
    },
    {
      id: 5,
      name: '237피자 대전둔산점',
      address: '대전광역시 서구 둔산로 202',
      phone: '042-5678-9012',
      hours: '11:00 - 23:00',
      region: '대전',
      isNew: false,
      services: ['배달', '포장', '드라이브스루']
    },
    {
      id: 6,
      name: '237피자 인천논현점',
      address: '인천광역시 남동구 논현로 303',
      phone: '032-6789-0123',
      hours: '11:00 - 23:00',
      region: '인천',
      isNew: false,
      services: ['배달', '포장', '매장 취식']
    }
  ]

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === '전체' || store.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* --- 수정된 부분: text-dark-red -> text-red-800, text-medium-gray -> text-gray-600 --- */}
          <h2 className="text-4xl md:text-5xl font-bold text-red-800 font-gmarket mb-4">
            STORE LOCATIONS
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            가까운 237Pizza피자 매장을 찾아보세요
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Search Input */}
            <div className="relative">
              {/* --- 수정된 부분: text-medium-gray -> text-gray-400 --- */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {/* --- 수정된 부분: border-light-gray -> border-gray-300, focus:border-primary -> focus:border-red-600 --- */}
              <input
                type="text"
                placeholder="매장명 또는 주소로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition-colors duration-300 w-80 text-gray-800"
              />
            </div>

            {/* Region Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  // --- 수정된 부분: 사용자 정의 색상을 표준 색상으로 변경 ---
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedRegion === region
                      ? 'bg-red-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Store Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {filteredStores.map((store) => (
            <motion.div
              key={store.id}
              variants={itemVariants}
              // --- 수정된 부분: border-light-gray -> border-gray-200 ---
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                {/* --- 수정된 부분: text-dark-red -> text-red-800 --- */}
                <h3 className="text-xl font-bold text-red-800 font-gmarket">
                  {store.name}
                </h3>
                {/* --- 수정된 부분: bg-primary -> bg-red-700 --- */}
                {store.isNew && (
                  <span className="bg-red-700 text-white px-2 py-1 rounded-full text-xs font-medium">
                    NEW
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                   {/* --- 수정된 부분: text-primary -> text-red-700, text-medium-gray -> text-gray-600 --- */}
                  <MapPin className="w-4 h-4 text-red-700 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {store.address}
                  </p>
                </div>

                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-red-700 mr-3" />
                  <span className="text-gray-600 text-sm">
                    {store.phone}
                  </span>
                </div>

                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-red-700 mr-3" />
                  <span className="text-gray-600 text-sm">
                    {store.hours}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {store.services.map((service, serviceIndex) => (
                     // --- 수정된 부분: bg-cream -> bg-red-100, text-primary -> text-red-800 ---
                    <span
                      key={serviceIndex}
                      className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {/* --- 수정된 부분: bg-primary -> bg-red-700, hover:bg-dark-red -> hover:bg-red-800 --- */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-red-700 text-white py-2 rounded-lg font-medium hover:bg-red-800 transition-colors duration-300 text-sm"
                >
                  전화주문
                </motion.button>
                {/* --- 수정된 부분: border-primary -> border-red-700, text-primary -> text-red-700, hover:bg-primary -> hover:bg-red-700 --- */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border border-red-700 text-red-700 py-2 rounded-lg font-medium hover:bg-red-700 hover:text-white transition-colors duration-300 text-sm"
                >
                  길찾기
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredStores.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            {/* --- 수정된 부분: text-medium-gray -> text-gray-600 --- */}
            <p className="text-gray-600 text-lg">
              검색 조건에 맞는 매장이 없습니다.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
           {/* --- 수정된 부분: bg-primary -> bg-red-700, hover:bg-dark-red -> hover:bg-red-800 --- */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-red-800 transition-colors duration-300 shadow-lg"
          >
            가맹점 개설 문의
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default StoreLocations
