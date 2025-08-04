'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SelfBaking = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [circleExpanded, setCircleExpanded] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setCircleExpanded(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <section 
      ref={ref}
      id="brand"
      // --- 수정된 부분: 모바일 화면에서만 상단 패딩을 추가합니다. ---
      className="relative min-h-screen bg-neutral-light-gray overflow-hidden flex items-center pt-20 lg:pt-0"
    >
      {/* Background Circle Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-[600px] h-[600px] rounded-full border-2 border-red-700"
        />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={circleExpanded ? { scale: 8 } : { scale: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute w-[200px] h-[200px] rounded-full bg-red-700 z-0"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={`text-4xl md:text-5xl font-gmarket font-bold leading-tight transition-colors duration-1000 ${
                  circleExpanded ? 'text-white' : 'text-gray-900'
                }`}
              >
                빵이 맛있다<br />
                237피자
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className={`text-xl md:text-2xl font-medium transition-colors duration-1000 ${
                  circleExpanded ? 'text-white' : 'text-gray-700'
                }`}
              >
                직접 반죽한 자가제빵의 특별함
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
                className={`text-lg transition-colors duration-1000 ${
                  circleExpanded ? 'text-white/90' : 'text-gray-600'
                }`}
              >
                국내산 흑미로 직접 반죽한 도우
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className={`p-6 rounded-lg border transition-all duration-1000 ${
                  circleExpanded 
                    ? 'bg-white/10 border-white/20 backdrop-blur-sm' 
                    : 'bg-white border-gray-200 shadow-lg'
                }`}>
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-1000 ${
                    circleExpanded ? 'text-white' : 'text-red-700'
                  }`}>
                    자가제빵 시스템
                  </h3>
                  <p className={`transition-colors duration-1000 ${
                    circleExpanded ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    매일 신선하게 반죽하고 24시간 냉장 숙성하여 최고의 맛을 구현합니다.
                  </p>
                </div>

                <div className={`p-6 rounded-lg border transition-all duration-1000 ${
                  circleExpanded 
                    ? 'bg-white/10 border-white/20 backdrop-blur-sm' 
                    : 'bg-white border-gray-200 shadow-lg'
                }`}>
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-1000 ${
                    circleExpanded ? 'text-white' : 'text-red-700'
                  }`}>
                    프리미엄 재료
                  </h3>
                  <p className={`transition-colors duration-1000 ${
                    circleExpanded ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    국내산 흑미와 100% 자연산 모짜렐라 치즈로 건강하고 맛있게.
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-lg border transition-all duration-1000 ${
                circleExpanded 
                  ? 'bg-white/10 border-white/20 backdrop-blur-sm' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-1000 ${
                  circleExpanded ? 'text-white' : 'text-red-700'
                }`}>
                  엣지 없는 철학
                </h3>
                <p className={`transition-colors duration-1000 ${
                    circleExpanded ? 'text-white/90' : 'text-gray-600'
                  }`}>
                  도우 끝까지 가득 채운 토핑으로 한 입 한 입이 풍성한 맛의 경험을 선사합니다.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Pizza Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 50 }}
                className="w-[26rem] h-[26rem] md:w-[31rem] md:h-[31rem] pizza-float"
              >
                <img 
                  src="/image/hero/pizza.transparent.png" 
                  alt="자가제빵 피자" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-4 right-2 bg-red-700 text-white px-4 py-2 rounded-full font-bold shadow-lg"
              >
                자가제빵
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute bottom-4 left-2 bg-yellow-100 text-red-700 px-4 py-2 rounded-full font-bold shadow-lg"
              >
                국내산 흑미
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="absolute top-20 left-0 bg-white text-red-700 px-4 py-2 rounded-full font-bold shadow-lg"
              >
                엣지 NO
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="absolute bottom-16 right-0 bg-white text-red-700 px-4 py-2 rounded-full font-bold shadow-lg">
                신선한 재료
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={circleExpanded ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className={`absolute bottom-20 left-0 w-full h-0.5 origin-left transition-colors duration-1000 ${
          circleExpanded ? 'bg-white/30' : 'bg-red-700/30'
        }`}
      />
    </section>
  )
}

export default SelfBaking
