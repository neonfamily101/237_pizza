'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'

// 숫자를 동적으로 카운팅하는 애니메이션 컴포넌트
const AnimatedNumber = ({ to, isInView }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration: 2,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, to, count]);

  return <motion.span>{rounded}</motion.span>;
};

// --- 수정된 부분: 상태 기반의 폭죽 애니메이션 컴포넌트 ---
const Firework = ({ initialDelay }) => {
  const [isExploding, setIsExploding] = useState(false);
  const colors = ['#FFC700', '#FF0000', '#FFFFFF'];
  const particles = Array.from({ length: 30 });

  useEffect(() => {
    let timerId;

    const explosionCycle = () => {
      setIsExploding(true);
      // 애니메이션 지속 시간보다 길게 설정하여 자연스럽게 사라지도록 함
      setTimeout(() => {
        setIsExploding(false);
      }, 2500);
    };
    
    // 다음 폭발을 스케줄링하는 함수
    const scheduleNext = (delay) => {
      timerId = setTimeout(() => {
        explosionCycle();
        scheduleNext(4000); // 4초마다 동일한 타이밍으로 반복
      }, delay);
    };

    // 첫 사이클 시작
    scheduleNext(initialDelay);

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearTimeout(timerId);
  }, [initialDelay]);

  // 폭죽이 터질 위치를 랜덤으로 설정
  const style = {
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    position: 'absolute',
  };

  return (
    <div style={style}>
      <AnimatePresence>
        {isExploding && (
          <>
            {particles.map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                }}
                initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 1 + 1.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Statistics = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const fireworks = Array.from({ length: 15 }); // 15개의 폭죽을 생성

  const stats = [
    {
      value: 1000,
      suffix: '+',
      label: '전국 매장',
      description: '전국 어디서나 237피자를 만날 수 있습니다',
      icon: '🏪'
    },
    {
      value: 25,
      suffix: '년',
      label: '전통과 노하우',
      description: '1998년부터 쌓아온 믿을 수 있는 브랜드',
      icon: '🏆'
    },
    {
      value: 100,
      suffix: '만+',
      label: '고객 만족',
      description: '매년 100만 명 이상의 고객이 선택하는 피자',
      icon: '👥'
    },
    {
      value: 24,
      suffix: '시간',
      label: '신선한 반죽',
      description: '매일 신선하게 만드는 수제 도우',
      icon: '🍞'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {isInView && fireworks.map((_, i) => <Firework key={i} initialDelay={i * 200} />)}
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white font-gmarket mb-4">
            237 PIZZA STATS
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            숫자로 보는 237피자의 성장과 고객 만족도
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl group-hover:bg-white/30 transition-all duration-300"
              >
                {stat.icon}
              </motion.div>
              
              <div className="mb-4">
                <div className="text-5xl md:text-6xl font-bold text-white font-gmarket mb-2">
                  <AnimatedNumber to={stat.value} isInView={isInView} />{stat.suffix}
                </div>
                <div className="text-xl font-medium text-white/90 mb-3">
                  {stat.label}
                </div>
              </div>
              
              <p className="text-white/80 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-700 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-red-600 hover:shadow-lg transition-all duration-300"
          >
            가맹점 문의하기
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics
