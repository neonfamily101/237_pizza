'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const BrandIntroduction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [circleExpanded, setCircleExpanded] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setCircleExpanded(true);
      }, 1000); // 1초 후 원이 확장되도록 설정
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section 
      ref={ref}
      id="brand-introduction"
      className="relative min-h-screen bg-neutral-100 overflow-hidden flex items-center py-24 lg:py-0"
    >
      {/* 배경 원 애니메이션 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.05 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-[600px] h-[600px] rounded-full border-2 border-red-700"
        />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={circleExpanded ? { scale: 10 } : { scale: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute w-[200px] h-[200px] rounded-full bg-red-700 z-0"
        />
      </div>

      {/* 콘텐츠 */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 왼쪽 텍스트 콘텐츠 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`text-4xl md:text-5xl font-bold leading-tight transition-colors duration-1000 ${
                circleExpanded ? 'text-white' : 'text-gray-900'
              }`}
            >
              환영합니다!<br />새로운 미식의 기준, 237피자
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg leading-relaxed"
            >
              <span className={`transition-colors duration-1000 ${ circleExpanded ? 'text-white/90' : 'text-gray-600' }`}>
                237피자는{' '}
              </span>
              <strong className={`font-extrabold transition-all duration-500 inline-block ${
                  circleExpanded
                    ? 'bg-white text-gray-800 px-2 py-1 rounded-md shadow-lg'
                    : 'text-red-700 underline decoration-wavy decoration-red-300'
                }`}>
                2024년 6월 서울 한남동에 문을 연 국내 최초이자 유일한 글루텐 프리 나폴리 화덕피자 전문점
              </strong>
              <span className={`transition-colors duration-1000 ${ circleExpanded ? 'text-white/90' : 'text-gray-600' }`}>
                입니다. 저희는 단순한 레스토랑을 넘어, 건강을 생각하는 모든 이들에게 새로운 미식 경험을 제공하며 한국 식문화의 지평을 넓히는 선구자적 역할을 하고 있습니다.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className={`p-8 rounded-2xl border transition-all duration-1000 ${
                circleExpanded 
                  ? 'bg-white/10 border-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'bg-white border-gray-200 shadow-xl'
              }`}
            >
              <h3 className={`text-3xl md:text-7xl font-extrabold mb-3 transition-colors duration-1000 ${
                circleExpanded ? 'text-white' : 'text-red-700'
              }`}>
                100% 글루텐 프리
              </h3>
              <p className={`transition-colors duration-1000 text-base md:text-md ${
                  circleExpanded ? 'text-white/90' : 'text-gray-600'
                }`}>
                모든 메뉴를 100% 글루텐 프리로 제공하여, 피자에 대한 저희의 확고한 약속을 상징합니다.
              </p>
            </motion.div>
          </motion.div>

          {/* 오른쪽 피자 비주얼 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex items-center justify-center h-96 lg:h-auto"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { 
                  scale: 1, 
                  rotate: 0,
                  translateY: ["0px", "-20px", "0px"],
                } : {}}
                transition={{
                  duration: 1,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 50,
                  translateY: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="w-[24rem] h-[24rem] md:w-[30rem] md:h-[30rem]"
              >
                <img 
                  src="https://placehold.co/600x600/ffffff/c9302c?text=237+Pizza" 
                  alt="237 글루텐 프리 피자" 
                  className="w-full h-full object-contain drop-shadow-2xl rounded-full"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/600x600/f87171/ffffff?text=Image+Error`; }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-4 right-2 bg-red-700 text-white px-4 py-2 rounded-full font-bold shadow-lg"
              >
                Gluten-Free
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute bottom-4 left-2 bg-yellow-100 text-red-700 px-4 py-2 rounded-full font-bold shadow-lg"
              >
                Since 2024
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="absolute top-20 left-0 bg-white text-red-700 px-4 py-2 rounded-full font-bold shadow-lg"
              >
                나폴리 정통
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const App = () => {
  return <BrandIntroduction />;
}

export default App;
