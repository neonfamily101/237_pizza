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
    {
      id: 1,
      type: 'image',
      src: '/image/hero/pizza.01.jpg',
      alt: 'Delicious combination pizza'
    },
    {
      id: 2,
      type: 'image',
      src: '/image/hero/pizza.02.jpg',
      alt: 'Fresh arugula and prosciutto pizza'
    },
    {
      id: 3,
      type: 'image',
      src: '/image/hero/pizza.model.jpg',
      alt: 'Pizza model promotion'
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
      case 0:
        return (
          <motion.div key="slide-0" {...textAnimation} className="w-full h-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-[35%] -translate-y-1/2 left-12 md:left-16 lg:left-20"
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent [-webkit-text-stroke:2px_white] font-gmarket leading-none tracking-[0.05em]">
                엣지는 없다
              </h1>
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.0 }}
              className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent origin-center"
            />
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-[53%] -translate-y-1/2 right-12 md:right-16 lg:right-20 text-right"
            >
              <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-white font-gmarket leading-none tracking-[0.02em]">
                토핑만 있다
              </h2>
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="slide-2" 
            {...textAnimation} 
            className="w-full h-full flex flex-col items-center justify-center text-center text-white font-gmarket"
          >
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl"
            >
              237 PIZZA X BIBI 공개 팬사인회
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-widest mt-2"
            >
              Coming Soon
            </motion.h1>
          </motion.div>
        );
      default:
        // 두 번째 슬라이드(index 1) 및 다른 경우에는 텍스트를 렌더링하지 않음
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
