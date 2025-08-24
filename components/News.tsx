'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertTriangle, ShieldCheck, Heart, XCircle } from 'lucide-react';

const analysisData = [
  {
    // icon: <AlertTriangle className="w-10 h-10 text-red-500" />,
    title: '글루텐의 잠재적 위험',
    description: '이는 셀리악병이나 글루텐 민감증 등 다양한 면역 반응을 일으켜 신체에 부담을 줄 수 있습니다.',
  },
  {
    // icon: <XCircle className="w-10 h-10 text-red-500" />,
    title: '소화불량 단백질',
    description: '장내 환경에 해를 끼치고 염증 반응을 일으켜 누수 장 증후군의 직접적인 원인이 됩니다.',
  },
  {
    // icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
    title: '과학적 검증',
    description: 'WHO/FAO는 글루텐 함량을 20ppm 이하로 엄격히 규제하고 있어 공중보건 관리가 필요하다는 것을 시사합니다.',
  },
  {
    // icon: <Heart className="w-10 h-10 text-pink-500" />,
    title: '모두를 위한 새로운 기준',
    description: '글루텐 프리 식단은 질병을 예방하고 삶의 질을 향상시키는 데 중요한 선택입니다. 237 Pizza가 그 기준을 제시합니다.',
  },
];

const News = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section 
      ref={ref}
      className="w-full min-h-screen py-24 px-4 bg-[#FBEFDD] flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-[#9A3434]">
            Why Gluten-Free is a Must
          </h2>
          <p className="text-[#9A3434]/80 mt-4 max-w-3xl mx-auto text-lg">
            From the hidden stories of gluten to healthy solutions for everyone, discover the new dining standard proposed by 237 Pizza.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {analysisData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="p-8 rounded-2xl bg-white shadow-lg text-left h-full flex flex-col items-center text-center"
            >
              {/* <div className="mb-6">{item.icon}</div> */}
              <h3 className="text-2xl font-bold text-[#9A3434] mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default News;