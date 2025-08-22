'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const Cloud = ({ className = '', delay = 0, scale = 1 }: { className?: string; delay?: number; scale?: number }) => (
  <motion.div
    initial={{ x: '-10%', opacity: 0.6 }}
    animate={{ x: '110%', opacity: [0.6, 0.85, 0.6] }}
    transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay }}
    className={`absolute top-1/3 h-24 rounded-full blur-2xl bg-white/80 ${className}`}
    style={{ transform: `scale(${scale})` }}
  />
)

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden bg-[#FBEFDD] flex items-center bg-[url('/images/hero/dough.jpg')] bg-cover bg-center"
      style={{ backgroundAttachment: 'fixed' }}
    >
      {/* Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <Cloud className="left-[-20%] w-56" delay={0} scale={1} />
        <Cloud className="top-1/4 left-[-40%] w-80" delay={6} scale={1.3} />
        <Cloud className="top-2/3 left-[-30%] w-64" delay={12} scale={0.9} />
      </div>

      {/* 텍스트를 담는 메인 컨테이너 */}
      <motion.div 
        className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-20 md:py-28"
        style={{ y }}
      >
        {/* --- ✨ Left: Text - 새롭게 디자인된 텍스트 섹션 --- */}
        <div className="md:col-span-7 font-playfair antialiased">
          
          {/* 메인 헤드라인 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[12vw] leading-none md:text-8xl lg:text-9xl font-medium text-[#F3EFEA] tracking-wider"
          >
            237 PIZZA
          </motion.h1>

          {/* 장식 및 부제목 컨테이너 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8"
          >
            {/* 고급스러운 느낌을 주는 장식 라인 */}
            <div className="w-100 h-px bg-gradient-to-r from-amber-700 to-transparent"></div>
            
            <p className="mt-6 text-gray-300 text-lg md:text-xl font-normal leading-relaxed">
              237 피자는 나폴리 피자를 추구합니다
            </p>
            <p className="mt-6 text-gray-200 text-lg md:text-xl font-normal leading-relaxed">
              저희 237 피자는 최고의 이탈리아산 글루텐 프리 밀가루로 도우를 만들어 24시간 동안 천천히 발표시켜 손으로 늘이고 최고급 재료로 토핑하여,
            </p>
            <p className="mt-6 text-gray-200 text-lg md:text-xl font-normal leading-relaxed">
            국내 최초 '식품의약품안전처'로 부터 검증 받은 환경오염 염려 없는 안전한 이탈리아산 가스 화덕에서 건강하게 조리합니다.
            </p>
          </motion.div>

          {/* 버튼/링크 영역 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            {/* 필요시 여기에 버튼 추가 */}
          </motion.div>
          
        </div>
        
      </motion.div>

      {/* Right: Badge/Blob - 오른쪽 상단 로고 */}
      {/* <div className="absolute top-0 right-0 z-10 hidden md:flex">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[5rem] lg:h-[5rem] mr-10 mt-7"
        >
          <div className="absolute inset-0 bg-[url('/images/logo_1.png')] bg-cover bg-center bg-gradient-to-br from-white/80 to-amber-100" />
        </motion.div>
      </div> */}
    </section>
  )
}