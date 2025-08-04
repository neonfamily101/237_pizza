'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { motion, useInView } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'

const News = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const newsItems = [
    {
      id: 1,
      title: '237피자 신메뉴 \'트러플 크림 피자\' 출시',
      summary: '프리미엄 트러플과 진한 크림의 만남으로 더욱 고급스러운 맛을 선보입니다.',
      date: '2025.07.24',
      category: '신메뉴',
      image: '/image/hero/truffle.jpg',
      featured: true
    },
    {
      id: 2,
      title: '전국 매장 1000호점 돌파 기념 이벤트',
      summary: '237피자가 전국 1000호점을 돌파했습니다. 감사 이벤트를 진행합니다.',
      date: '2025.05.10',
      category: '이벤트',
      image: '/image/news/store-1000.jpg',
      featured: false
    },
    {
      id: 3,
      title: '친환경 포장재 도입으로 지구환경 보호 동참',
      summary: '237피자는 친환경 포장재를 도입하여 지속가능한 환경보호에 앞장서고 있습니다.',
      date: '2025.04.05',
      category: '공지사항',
      image: '/image/news/eco-friendly.jpg',
      featured: false
    },
    {
      id: 4,
      title: '24시간 배달 서비스 확대 운영',
      summary: '고객 편의를 위해 24시간 배달 서비스를 전국 주요 지역으로 확대합니다.',
      date: '2025.02.28',
      category: '서비스',
      image: '/image/news/delivery.jpg',
      featured: false
    },
    {
      id: 5,
      title: '237피자 모바일 앱 리뉴얼 완료',
      summary: '더욱 편리하고 빠른 주문을 위해 모바일 앱을 전면 리뉴얼했습니다.',
      date: '2025.01.20',
      category: '서비스',
      image: '/image/news/app-renewal.jpg',
      featured: false
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '신메뉴':
        return 'bg-red-700 text-white'
      case '이벤트':
        return 'bg-orange-500 text-white'
      case '공지사항':
        return 'bg-blue-500 text-white'
      case '서비스':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

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

  const featuredNews = newsItems.find(item => item.featured)
  const regularNews = newsItems.filter(item => !item.featured)

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
            NEWS & EVENTS
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            237피자의 최신 소식과 이벤트 정보를 확인해보세요
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Featured News */}
          {featuredNews && (
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full border flex flex-col">
                {/* --- 수정된 부분: 이모지 대신 실제 이미지를 표시합니다. --- */}
                <div className="relative h-80 w-full overflow-hidden">
                   <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/ef4444/ffffff?text=Image`; }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredNews.category)} shadow-md`}>
                      {featuredNews.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    HOT
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2 text-red-700" />
                    {featuredNews.date}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-red-800 mb-4 font-gmarket leading-tight">
                    {featuredNews.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {featuredNews.summary}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-red-700 font-medium hover:text-red-900 transition-colors duration-300 self-start"
                  >
                    자세히 보기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Regular News List */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            {regularNews.slice(0, 4).map((news) => (
              <motion.div
                key={news.id}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(news.category)}`}>
                    {news.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3 h-3 mr-1 text-red-700" />
                    {news.date}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-red-800 mb-2 font-gmarket leading-tight group-hover:text-red-700 transition-colors duration-300 flex-grow">
                  {news.title}
                </h4>
                                
                <div className="flex items-center text-red-700 text-sm font-medium group-hover:text-red-900 transition-colors duration-300 self-start mt-4">
                  자세히 보기
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            className="bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-red-800 transition-colors duration-300 shadow-lg"
          >
            전체 소식 보기
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default News
