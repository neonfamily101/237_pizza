'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Flame, ShieldCheck, Pizza, Star, Leaf } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Flame className="w-8 h-8 text-red-500" />,
    title: "국내 유일, 100% 글루텐 프리",
    description: "237피자는 국내 최초이자 유일한 글루텐 프리 나폴리 화덕피자 전문점으로, 새로운 미식의 장을 엽니다.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
    title: "완벽한 교차오염 방지",
    description: "국내 최초 글루텐 프리 전용 화덕과 주방을 완비했습니다. 셀리악 환우도 안심하고 즐길 수 있는 환경을 보장합니다.",
  },
  {
    icon: <Pizza className="w-8 h-8 text-red-500" />,
    title: "기대 이상의 맛과 품질",
    description: "글루텐이 없어도 더 맛있다는 평가! 22가지 정통 피자를 최고급 이탈리아산 재료로 구현해 맛의 편견을 깹니다.",
  },
  {
    icon: <Star className="w-8 h-8 text-red-500" />,
    title: "1년간 증명된 안전성",
    description: "개업 후 1년간 단 한 건의 부작용 보고도 없었습니다. 주한이탈리아대사관 파티에서도 극찬받은 품질을 자랑합니다.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-red-500" />,
    title: "건강을 생각하는 윤리적 가치",
    description: "'해로운 것을 빼어 건강하고 맛있는 음식을 만들자'는 모토로 '가치 소비' 트렌드에 부합하는 정직한 음식을 만듭니다.",
  },
];

const RotatingPizza = () => (
  <motion.div
    className="w-64 h-64 md:w-96 md:h-96 relative"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
  >
    <div className="absolute inset-0 rounded-full bg-yellow-400 border-8 border-yellow-600"></div>
    <div className="absolute w-16 h-8 bg-red-500 rounded-full top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
    <div className="absolute w-12 h-12 bg-green-600 rounded-full top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 -rotate-30"></div>
    <div className="absolute w-10 h-10 bg-red-600 rounded-full bottom-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 rotate-15"></div>
    <div className="absolute w-14 h-14 bg-green-500 rounded-full bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 rotate-60"></div>
    <div className="absolute w-8 h-8 bg-red-500 rounded-full top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
  </motion.div>
);

const FeatureSection = ({ feature, index }: { feature: Feature, index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const isReversed = index % 2 !== 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isReversed ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  
  const pizzaVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    // FIX: 유효하지 않은 cubic-bezier 값을 'easeOut'으로 변경하여 오류를 해결했습니다.
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-20 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      <motion.div variants={pizzaVariants}>
        <RotatingPizza />
      </motion.div>
      <motion.div variants={itemVariants} className="lg:w-1/3 text-center lg:text-left">
        <div className="inline-flex items-center gap-4 mb-4">
          {feature.icon}
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800">{feature.title}</h3>
        </div>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{feature.description}</p>
      </motion.div>
    </motion.section>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900">
            <span className="text-red-600">237피자</span>, 맛의 새로운 기준
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto">
            건강과 맛, 어느 하나도 놓치지 않는 당신을 위한 단 하나의 피자.
          </p>
        </motion.div>

        <div>
          {features.map((feature, index) => (
            <FeatureSection key={index} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-24"
        >
          <h2 className="text-4xl font-bold text-gray-800">이제, 모두가 함께 즐기는 피자</h2>
          <p className="mt-4 text-lg text-gray-600">
            237피자는 단순한 식사를 넘어, 모두가 안심하고 즐기는 행복한 경험을 선물합니다.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-10 py-4 bg-red-600 text-white font-bold text-xl rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            메뉴 보러가기
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
