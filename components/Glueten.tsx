'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Gluten = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const style = `
    .element-float {
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  `

  return (
    <>
      <style>{style}</style>
      <section 
        ref={ref}
        className="relative min-h-screen bg-gray-800 overflow-hidden flex items-center justify-center py-16 lg:py-0"
        style={{
          backgroundImage: `url('/image/hero/dough.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="container mx-auto px-4 relative z-10 w-full h-full flex items-center justify-center">
            
            {/* --- 데스크톱 레이아웃 (lg 스크린 이상) --- */}
            {/* --- 수정된 부분: lg, xl 스크린에서 수평 패딩을 추가하여 간격을 조정합니다. --- */}
            <div className="hidden lg:flex items-center justify-between w-full lg:px-16 xl:px-24">
              {/* 왼쪽 상단 텍스트 */}
              <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
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
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 80 }}
                  className="flex-shrink-0" // 이미지가 줄어들지 않도록 설정
              >
                  <div className="w-72 element-float">
                      <img 
                          src="/image/hero/gluten.png" 
                          alt="프리미엄 밀가루" 
                          className="w-full h-full object-contain"
                          onDragStart={(e) => e.preventDefault()}
                      />
                  </div>
              </motion.div>

              {/* 오른쪽 하단 텍스트 */}
              <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="w-1/3 text-right text-white"
              >
                  <h3 className="font-gmarket font-bold text-4xl">글루텐 프리</h3>
                  <p className="text-lg text-white/80 mt-3">
                      오랜 연구 끝에 탄생한 글루텐 프리 도우는 밀가루 본연의 맛과 향을 유지하며 편안한 소화감을 선사합니다.
                  </p>
              </motion.div>
            </div>

            {/* --- 모바일 레이아웃 (lg 스크린 미만) --- */}
            <div className="lg:hidden flex flex-col items-center justify-center gap-8 text-white w-full">
              {/* 위쪽 텍스트 */}
              <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
              >
                  <div className="w-60 h-auto element-float">
                      <img 
                          src="/image/hero/gluten.png" 
                          alt="프리미엄 밀가루" 
                          className="w-full h-full object-contain"
                          onDragStart={(e) => e.preventDefault()}
                      />
                  </div>
              </motion.div>

              {/* 아래쪽 텍스트 */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-center max-w-sm"
              >
                  <h3 className="font-gmarket font-bold text-3xl">글루텐 프리</h3>
                  <p className="text-md text-white/80 mt-2">
                      오랜 연구 끝에 탄생한 글루텐 프리 도우는 밀가루 본연의 맛과 향을 유지하며 편안한 소화감을 선사합니다.
                  </p>
              </motion.div>
            </div>
        </div>
      </section>
    </>
  )
}

export default Gluten
