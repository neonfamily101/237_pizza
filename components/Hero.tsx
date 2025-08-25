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
      {/* dark scrim to improve readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent z-[1]" />
      {/* subtle vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_80%_at_0%_50%,transparent_0%,transparent_55%,rgba(0,0,0,0.5)_100%)] z-[1]" />

      {/* Clouds */}
      <div className="absolute inset-0 pointer-events-none z-[0]">
        <Cloud className="left-[-20%] w-56" delay={0} scale={1} />
        <Cloud className="top-1/4 left-[-40%] w-80" delay={6} scale={1.3} />
        <Cloud className="top-2/3 left-[-30%] w-64" delay={12} scale={0.9} />
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-[2] grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-20 md:py-28"
        style={{ y }}
      >
        <div className="md:col-span-7 font-playfair antialiased">
          <motion.h1
            initial={{ opacity: 0, y: 20, backgroundPositionX: '0%' }}
            animate={{ opacity: 1, y: 0, backgroundPositionX: '100%' }}
            transition={{ duration: 0.7, backgroundPositionX: { duration: 14, ease: 'linear', repeat: Infinity, repeatType: 'mirror' } }}
            className="text-[12vw] leading-none md:text-8xl lg:text-9xl font-medium text-transparent tracking-wider drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
            style={{
              textShadow:
                '0 8px 22px rgba(110, 60, 60, 0.85), 0 2px 4px rgba(242, 35, 35, 0.55), 0 0 1px rgba(0,0,0,0.85), 0 0 14px rgba(255,210,90,0.35)',
              WebkitTextStroke: '1px rgba(255,255,255,0.4)',
              backgroundImage:
                'linear-gradient(135deg, #fffbe6 0%, #ffd981 25%, #ffc23f 50%, #ffd981 75%, #fffbe6 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              mixBlendMode: 'screen',
              filter: 'drop-shadow(0 0 10px rgba(255,210,90,0.25))',
            }}
          >
            237 PIZZA
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8"
          >
            <div className="w-100 h-px bg-gradient-to-r from-amber-600/80 to-transparent" />

            {/* readable text panel */}
            <div className="mt-6 max-w-2xl rounded-xl  backdrop-blur-[2px] p-5 md:p-6">
              <p
                className="text-white/95 text-lg md:text-xl leading-relaxed font-semibold"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              >
                237 피자는 나폴리 피자를 추구합니다
              </p>
              <p
                className="mt-5 text-white/90 text-lg md:text-xl leading-relaxed font-semibold"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              >
                저희 237 피자는 최고의 이탈리아산 글루텐 프리 밀가루로 도우를 만들어 24시간 동안 천천히 발표시켜 손으로 늘이고 최고급 재료로 토핑하여,
              </p>
              <p
                className="mt-5 text-white/90 text-lg md:text-xl leading-relaxed font-semibold"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              >
                국내 최초 '식품의약품안전처'로 부터 검증 받은 환경오염 염려 없는 안전한 이탈리아산 가스 화덕에서 건강하게 조리합니다.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-4"
          />
        </div>
      </motion.div>
    </section>
  )
}



// 'use client'

// import Link from 'next/link'
// import { motion, useScroll, useTransform } from 'framer-motion'

// const Cloud = ({ className = '', delay = 0, scale = 1 }: { className?: string; delay?: number; scale?: number }) => (
//   <motion.div
//     initial={{ x: '-10%', opacity: 0.6 }}
//     animate={{ x: '110%', opacity: [0.6, 0.85, 0.6] }}
//     transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay }}
//     className={`absolute top-1/3 h-24 rounded-full blur-2xl bg-white/80 ${className}`}
//     style={{ transform: `scale(${scale})` }}
//   />
// )

// export default function Hero() {
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

//   return (
//     <section
//       className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden bg-[#FBEFDD] flex items-center bg-[url('/images/hero/dough.jpg')] bg-cover bg-center"
//       style={{ backgroundAttachment: 'fixed' }}
//     >
//       {/* dark scrim to improve readability */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent z-[1]" />
//       {/* subtle vignette */}
//       <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_80%_at_0%_50%,transparent_0%,transparent_55%,rgba(0,0,0,0.5)_100%)] z-[1]" />

//       {/* Clouds */}
//       <div className="absolute inset-0 pointer-events-none z-[0]">
//         <Cloud className="left-[-20%] w-56" delay={0} scale={1} />
//         <Cloud className="top-1/4 left-[-40%] w-80" delay={6} scale={1.3} />
//         <Cloud className="top-2/3 left-[-30%] w-64" delay={12} scale={0.9} />
//       </div>

//       {/* Content */}
//       <motion.div
//         className="container mx-auto px-6 relative z-[2] grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-20 md:py-28"
//         style={{ y }}
//       >
//         <div className="md:col-span-7 font-playfair antialiased">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             className="text-[12vw] leading-none md:text-8xl lg:text-9xl font-medium text-white tracking-wider drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
//             style={{
//               textShadow:
//                 '0 10px 28px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.9)',
//               WebkitTextStroke: '0.4px rgba(0,0,0,0.35)',
//             }}
//           >
//             237 PIZZA
//           </motion.h1>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.15 }}
//             className="mt-8"
//           >
//             <div className="w-100 h-px bg-gradient-to-r from-amber-600/80 to-transparent" />

//             {/* readable text panel */}
//             <div className="mt-6 max-w-2xl rounded-xl  backdrop-blur-[2px] p-5 md:p-6">
//               <p
//                 className="text-white/95 text-lg md:text-xl leading-relaxed font-semibold"
//                 style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
//               >
//                 237 피자는 나폴리 피자를 추구합니다
//               </p>
//               <p
//                 className="mt-5 text-white/90 text-lg md:text-xl leading-relaxed font-semibold"
//                 style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
//               >
//                 저희 237 피자는 최고의 이탈리아산 글루텐 프리 밀가루로 도우를 만들어 24시간 동안 천천히 발표시켜 손으로 늘이고 최고급 재료로 토핑하여,
//               </p>
//               <p
//                 className="mt-5 text-white/90 text-lg md:text-xl leading-relaxed font-semibold"
//                 style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
//               >
//                 국내 최초 '식품의약품안전처'로 부터 검증 받은 환경오염 염려 없는 안전한 이탈리아산 가스 화덕에서 건강하게 조리합니다.
//               </p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="mt-12 flex flex-wrap gap-4"
//           />
//         </div>
//       </motion.div>
//     </section>
//   )
// }