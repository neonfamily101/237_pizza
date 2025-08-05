'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const FloatingElement = ({ children }: { children: React.ReactNode }) => {
  const style = useMemo(() => ({
    position: 'absolute' as const,
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    fontSize: `${Math.random() * 3 + 1.5}rem`,
    opacity: Math.random() * 0.5 + 0.3,
  }), [])

  const animation = useMemo(() => ({
    y: [0, Math.random() * 40 - 20, 0],
    x: [0, Math.random() * 40 - 20, 0],
    rotate: [0, Math.random() * 360, 0],
    transition: {
      duration: Math.random() * 15 + 10,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }), [])

  return (
    <motion.div style={style} animate={animation}>
      {children}
    </motion.div>
  )
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    // {
    //   id: 1,
    //   type: 'image',
    //   src: '/image/hero/pizza.01.jpg',
    //   alt: 'Delicious combination pizza'
    // },
    {
      id: 2,
      type: 'image',
      src: '/images/hero/pizza.model.jpg',
      alt: 'Pizza model promotion'
    },
    {
      id: 3,
      type: 'image',
      src: '/images/hero/dough.jpg',
      alt: 'Premium dough and gluten-free ingredients'
    }
  ]
  
  const floatingElements = useMemo(() => Array.from({ length: 16 }).map((_, i) => (
    <FloatingElement key={i}>{i < 8 ? '🍕' : '🧀'}</FloatingElement>
  )), [])

  useEffect(() => {
    // Custom global styles for Hero pagination
    const style = document.createElement('style')
    style.textContent = `
      .hero-pagination .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
        background: rgba(255, 255, 255, 0.4);
        border: 2px solid rgba(255, 255, 255, 0.8);
        opacity: 1;
        margin: 0 8px;
        transition: all 0.3s ease;
      }
      .hero-pagination .swiper-pagination-bullet-active {
        background: rgba(255, 255, 255, 0.9);
        border-color: rgba(255, 255, 255, 1);
        transform: scale(1.2);
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  const textAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.8, ease: 'easeInOut' }
  };

  // --- 슬라이드 인덱스에 따라 다른 텍스트 오버레이를 렌더링하는 함수 ---
  const renderSlideOverlay = (index: number) => {
    switch (index) {
      // case 0:
      //   return (
      //     <motion.div key="slide-0" {...textAnimation} className="w-full h-full">
      //       <motion.div 
      //         initial={{ opacity: 0, x: -50 }}
      //         animate={{ opacity: 1, x: 0 }}
      //         transition={{ duration: 1, delay: 0.5 }}
      //         className="absolute top-[35%] -translate-y-1/2 left-12 md:left-16 lg:left-20"
      //       >
      //         <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent [-webkit-text-stroke:2px_white] font-gmarket leading-none tracking-[0.05em]">
      //           엣지는 없다
      //         </h1>
      //       </motion.div>
      //       <motion.div 
      //         initial={{ scaleX: 0 }}
      //         animate={{ scaleX: 1 }}
      //         transition={{ duration: 1.5, delay: 1.0 }}
      //         className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent origin-center"
      //       />
      //       <motion.div 
      //         initial={{ opacity: 0, x: 50 }}
      //         animate={{ opacity: 1, x: 0 }}
      //         transition={{ duration: 1, delay: 0.8 }}
      //         className="absolute top-[53%] -translate-y-1/2 right-12 md:right-16 lg:right-20 text-right"
      //       >
      //         <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-white font-gmarket leading-none tracking-[0.02em]">
      //           토핑만 있다
      //         </h2>
      //       </motion.div>
      //     </motion.div>
      //   );
      case 0:
        return (
          <motion.div 
            key="slide-0" 
            {...textAnimation} 
            className="w-full h-full flex flex-col items-center justify-center text-center text-white font-gmarket"
          >
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl"
            >
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-widest mt-2"
            >
              237 PIZZA
            </motion.h1>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key="slide-1" {...textAnimation} className="w-full h-full">
            {/* 데스크톱 레이아웃 */}
            <div className="hidden lg:flex items-center justify-between w-full h-full lg:px-16 xl:px-24">
              {/* 왼쪽 CAPUTO 텍스트 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="w-1/3 text-left text-white"
              >
                <h3 className="font-gmarket font-bold text-4xl">CAPUTO</h3>
                <p className="text-lg text-white/80 mt-3">
                  1924년부터 3대째 이어온 이탈리아 나폴리의 자부심, 세계 최고의 피자 장인들이 선택한 밀가루입니다.
                </p>
              </motion.div>

              {/* 중앙 애니메이션 이미지 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 80 }}
                className="flex-shrink-0"
              >
                <motion.div 
                  className="w-72"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img 
                    src="/images/hero/gluten.png" 
                    alt="프리미엄 밀가루" 
                    className="w-full h-full object-contain"
                    onDragStart={(e) => e.preventDefault()}
                  />
                </motion.div>
              </motion.div>

              {/* 오른쪽 글루텐 프리 텍스트 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="w-1/3 text-right text-white"
              >
                <h3 className="font-gmarket font-bold text-4xl">글루텐 프리</h3>
                <p className="text-lg text-white/80 mt-3">
                  오랜 연구 끝에 탄생한 글루텐 프리 도우는 밀가루 본연의 맛과 향을 유지하며 편안한 소화감을 선사합니다.
                </p>
              </motion.div>
            </div>

            {/* 모바일 레이아웃 */}
            <div className="lg:hidden flex flex-col items-center justify-center gap-8 text-white w-full h-full">
              {/* 위쪽 CAPUTO 텍스트 */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-center max-w-sm"
              >
                <h3 className="font-gmarket font-bold text-3xl">CAPUTO</h3>
                <p className="text-md text-white/80 mt-2">
                  1924년부터 3대째 이어온 이탈리아 나폴리의 자부심, 세계 최고의 피자 장인들이 선택한 밀가루입니다.
                </p>
              </motion.div>
              
              {/* 중앙 이미지 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div 
                  className="w-60 h-auto"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img 
                    src="/images/hero/gluten.png" 
                    alt="프리미엄 밀가루" 
                    className="w-full h-full object-contain"
                    onDragStart={(e) => e.preventDefault()}
                  />
                </motion.div>
              </motion.div>

              {/* 아래쪽 글루텐 프리 텍스트 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-center max-w-sm"
              >
                <h3 className="font-gmarket font-bold text-3xl">글루텐 프리</h3>
                <p className="text-md text-white/80 mt-2">
                  오랜 연구 끝에 탄생한 글루텐 프리 도우는 밀가루 본연의 맛과 향을 유지하며 편안한 소화감을 선사합니다.
                </p>
              </motion.div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  }

  return (
    <section className="relative w-full h-screen max-h-[100vh] bg-black overflow-hidden">
      <div className="relative w-full h-full">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{
            el: '.hero-pagination',
            clickable: true,
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          speed={1000}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="w-full h-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full">
              <div className="absolute inset-0 z-0">
                {floatingElements}
              </div>
              <div className="absolute inset-0 w-full h-full">
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.src})` }}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="absolute inset-0 z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            {renderSlideOverlay(currentSlide)}
          </AnimatePresence>
        </div>

        {/* Custom Pagination */}
        <div className="hero-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20" />
      </div>
    </section>
  )
}

export default Hero
