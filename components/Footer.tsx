'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Globe, MapPin, Phone, ArrowRight } from 'lucide-react'

const GrandFinale = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const content = {
    title: '새로운 시장, 위대한 기회',
    subtitle: '237피자는 성장의 중심에서 새로운 역사를 만듭니다.',
    points: [
      {
        icon: <TrendingUp className="w-6 h-6 text-red-400" />,
        text: '전 세계 글루텐 프리 시장은 **연간 10% 이상** 놀라운 속도로 성장하고 있습니다.'
      },
      {
        icon: <Users className="w-6 h-6 text-red-400" />,
        text: '매년 **1,500만 명의 외국인 방문객**이라는 거대한 미개척 시장을 선점할 기회입니다.'
      },
      {
        icon: <Globe className="w-6 h-6 text-red-400" />,
        text: '건강을 중시하는 모든 소비자를 위한 피자로, **기존 시장의 패러다임을 전환**합니다.'
      }
    ],
    ctaTitle: '237피자를 경험해 보세요!',
    ctaSubtitle: '국내 최초, 유일의 글루텐 프리 나폴리 화덕피자! 밀가루 걱정 없이 정통의 맛을 즐기세요.',
    address: '서울시 용산구 이태원로 237',
    phone: '02-797-2377',
    buttonText: '지금 바로 경험하기'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  }

  return (
    <section ref={ref} className="relative min-h-screen bg-white text-black flex flex-col justify-center py-24 overflow-hidden">
      
      {/* Background Spotlight Animation */}
      <div className="absolute inset-0 z-0 opacity-50">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: '50%', y: '50%' }}
            animate={isInView ? { opacity: [0, 1, 0.5, 1], y: `-${i * 20}%`, x: `${i * 15}%` } : {}}
            transition={{ duration: 10, delay: i * 1.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="absolute w-[80vw] h-[80vw] bg-gradient-to-r from-red-500/20 via-red-500/5 to-transparent"
            style={{ transform: `rotate(${i * 45}deg)` }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Rotating Pizza */}
            <div className="relative flex items-center justify-center h-[500px]">
              {/* Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.cos(i * 18) * 250, 0],
                    y: [0, Math.sin(i * 18) * 250, 0],
                    scale: [1, 1.5, 1, 0.8, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-2 h-2 bg-amber-300 rounded-full"
                  style={{ filter: 'blur(1px)' }}
                />
              ))}

              {/* Pizza Image */}
              <motion.img
                src="/images/hero/pizza.transparent.png" // 피자 이미지 경로를 수정하세요.
                alt="237피자"
                className="w-full h-full object-contain drop-shadow-[0_0px_35px_rgba(239,68,68,0.4)]"
                animate={{
                  rotate: 360,
                  y: [-10, 10, -10],
                }}
                transition={{
                  rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
                  y: { duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                }}
              />
            </div>
            
            {/* Right: Content */}
            <div className="space-y-10">
              <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-bold font-gmarket mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300">
                  {content.title}
                </h2>
                <p className="text-lg text-black">
                  {content.subtitle}
                </p>
              </motion.div>

              <ul className="space-y-6">
                {content.points.map((point, index) => (
                  <motion.li key={index} variants={itemVariants} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 p-2 bg-red-900/50 rounded-full">
                      {point.icon}
                    </div>
                    <p className="text-black text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: point.text }} />
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Final CTA */}
          <motion.div 
            initial={{opacity: 0}}
            animate={isInView ? {opacity: 1} : {}}
            transition={{duration: 1, delay: 1.5}}
            className="mt-24 text-center border-t border-red-500/20 pt-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold font-gmarket text-red mb-4">
              {content.ctaTitle}
            </h3>
            <p className="text-black mb-8 max-w-2xl mx-auto">
              {content.ctaSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-lg mb-8 text-black">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-400" />
                <span>{content.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-red-400" />
                <span>{content.phone}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: ['0 0 20px rgba(239,68,68,0.4)', '0 0 40px rgba(239,68,68,0.7)', '0 0 20px rgba(239,68,68,0.4)'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center justify-center">
                {content.buttonText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default GrandFinale