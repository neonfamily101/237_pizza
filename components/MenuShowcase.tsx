'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const MenuShowcase = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [showAllMenus, setShowAllMenus] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const menuCategories = [
    {
      id: 0,
      name: '피자',
      items: [
        {
          name: 'MARINARA ORIGINALE',
          description: '글루텐 프리 밀가루로 만든 담백한 비건 피자',
          image: '/image/menu/marinara.jpg',
          price: '₩15,000'
        },
        {
          name: 'MARGHERITA CLASSICA',
          description: '전통 나폴리 스타일 피자',
          image: '/image/menu/margherita.jpg',
          price: '₩19,000'
        },
        {
          name: 'PESTO ROYALE Bufala',
          description: '향긋한 바질 소스가 올라간 피자',
          image: '/image/menu/pesto.jpg',
          price: '₩25,900'
        },
        {
          name: 'Prosciutto & Gorgonzola',
          description: '신선한 이탈리아 햄으로 만든 피자',
          image: '/image/menu/prosciutto.jpg',
          price: '₩28,500'
        }
      ]
    },
    {
      id: 1,
      name: '사이드',
      items: [
        {
          name: '237 샐러드',
          description: '신선한 재료가 듬뿍담긴 샐러드',
          image: '/image/menu/salad.jpg',
          price: '₩15,000'
        },
        {
          name: 'Calzone',
          description: '피자를 반으로 접은 이탈리안 만두',
          image: '/image/menu/calzone.jpg',
          price: '₩26,000'
        },
        {
          name: '치즈스틱',
          description: '쫄깃한 모짜렐라 치즈스틱',
          image: '/image/menu/cheesestick.jpg',
          price: '₩7,000'
        }
      ]
    },
    {
      id: 2,
      name: '음료',
      items: [
        {
          name: '콜라',
          description: '시원한 코카콜라',
          image: '/image/menu/coke.jpg',
          price: '₩2,000'
        },
        {
          name: '사이다',
          description: '상쾌한 스프라이트',
          image: '/image/menu/sprite.jpg',
          price: '₩2,000'
        },
        {
          name: '오렌지 주스',
          description: '100% 오렌지 주스',
          image: '/image/menu/orangejuice.jpg',
          price: '₩3,000'
        }
      ]
    }
  ]

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

  const MenuCard = ({ item, index }) => (
    <motion.div
      key={index}
      variants={itemVariants}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border flex flex-col w-full max-w-xs sm:w-72"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/f87171/ffffff?text=Image+Not+Found`; }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-red-800 mb-2 font-gmarket">
          {item.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
          {item.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-red-700 font-gmarket">
            {item.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-800 transition-colors duration-300 shadow"
          >
            주문하기
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

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
            DELICIOUS MENU
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            237피자만의 특별한 레시피로 만든 맛있는 메뉴들을 만나보세요
          </p>
        </motion.div>
        
        <AnimatePresence>
          {!showAllMenus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="flex justify-center mb-12"
            >
              <div className="bg-white rounded-full p-2 shadow-lg border">
                {menuCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-8 py-3 mx-2 rounded-full font-medium transition-all duration-300 ${
                      activeTab === category.id
                        ? 'bg-red-700 text-white shadow-lg'
                        : 'text-gray-700 hover:text-red-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showAllMenus ? (
            <motion.div
              key="all-menus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              {menuCategories.map(category => (
                <div key={category.id}>
                  <h3 className="text-3xl font-bold text-red-800 font-gmarket mb-8 text-center">{category.name}</h3>
                  {/* --- 수정된 부분: 반응형 정렬 클래스를 더 세분화합니다. --- */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-8 justify-center sm:justify-start xl:justify-center"
                  >
                    {category.items.map((item, index) => (
                      <MenuCard item={item} index={index} key={index} />
                    ))}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="tab-view"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              // --- 수정된 부분: 반응형 정렬 클래스를 더 세분화합니다. ---
              className="flex flex-wrap gap-8 justify-center sm:justify-start xl:justify-center"
            >
              {menuCategories[activeTab].items.map((item, index) => (
                 <MenuCard item={item} index={index} key={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllMenus(!showAllMenus)}
            className="bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-red-800 transition-colors duration-300 shadow-lg"
          >
            {showAllMenus ? '메뉴 접기' : '전체 메뉴 보기'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default MenuShowcase
