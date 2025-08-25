'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// 데이터를 아이콘 없이 텍스트 중심으로 재구성합니다.
const glutenProblems = [
  {
    title: '면역 체계의 교란',
    description: '셀리악병이나 글루텐 민감증 등 면역 체계를 비정상적으로 자극하여 신체에 지속적인 염증 반응과 부담을 유발할 수 있습니다.',
  },
  {
    title: '소화 시스템의 부담',
    description: '소화가 어려운 단백질 구조로 인해 장내 환경을 해치고, 이는 ‘누수 장 증후군(Leaky Gut Syndrome)’과 같은 심각한 문제의 직접적인 원인이 될 수 있습니다.',
  },
];

const glutenFreeSolutions = [
  {
    title: '국제적으로 검증된 기준',
    description: 'WHO/FAO와 같은 국제 보건 기구는 글루텐 함량을 20ppm 이하로 엄격히 규제하며, 이는 글루텐 관리가 공중 보건의 중요한 요소임을 의미합니다.',
  },
  {
    title: '237 Pizza의 새로운 표준',
    description: '단순한 식사를 넘어, 질병을 예방하고 삶의 질을 향상시키는 건강한 선택. 237 Pizza는 모두를 위한 더 높은 수준의 식사 경험을 제안합니다.',
  },
];

const News = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // 왼쪽과 오른쪽 카드를 위한 개별 애니메이션 Variants
  const leftCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // 부드러운 Easing 효과
        staggerChildren: 0.2, // 내부 요소들의 순차적 애니메이션
      },
    },
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section 
      ref={ref}
      className="w-full min-h-screen py-24 px-4 bg-[#F8F4E9] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* --- 헤더 섹션 --- */}
        <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-[#9A3434]">
            A Clear Choice for Your Health
          </h2>
          <p className="text-[#9A3434]/80 mt-4 max-w-3xl mx-auto text-lg">
            글루텐의 숨겨진 진실과 237 Pizza의 건강한 약속을 한눈에 비교해보세요.
          </p>
        </motion.div>

        {/* --- 대비되는 컨텐츠 섹션 --- */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* --- 문제점 섹션 (왼쪽) --- */}
          <motion.div 
            variants={leftCardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="bg-white/50 p-8 md:p-10 rounded-xl shadow-md border-t-4 border-stone-300"
          >
            <motion.div variants={contentVariants} className="mb-8">
              <h3 className="text-sm font-bold tracking-widest text-red-700 uppercase mb-1">The Issue</h3>
              <p className="text-3xl font-bold text-stone-800">글루텐의 잠재적 위험성</p>
            </motion.div>
            <div className="space-y-8">
              {glutenProblems.map((item, index) => (
                <InfoCard key={index} {...item} variants={contentVariants} borderColor="bg-red-200" />
              ))}
            </div>
          </motion.div>

          {/* --- 해결책 섹션 (오른쪽) --- */}
          <motion.div 
            variants={rightCardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="bg-white p-8 md:p-10 rounded-xl shadow-lg border-t-4 border-emerald-500"
          >
            <motion.div variants={contentVariants} className="mb-8">
              <h3 className="text-sm font-bold tracking-widest text-emerald-700 uppercase mb-1">The Standard</h3>
              <p className="text-3xl font-bold text-gray-800 ">글루텐 프리의 중요성</p>
            </motion.div>
            <div className="space-y-8">
              {glutenFreeSolutions.map((item, index) => (
                <InfoCard key={index} {...item} variants={contentVariants} borderColor="bg-emerald-300" />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- 애니메이션이 추가된 정보 카드 컴포넌트 ---
const InfoCard = ({ title, description, variants, borderColor }: { title: string, description: string, variants: any, borderColor: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div ref={ref} variants={variants}>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
      <div className={`relative w-full h-0.5 bg-gray-200 rounded-full overflow-hidden`}>
          <motion.div 
            className={`absolute top-0 left-0 h-full ${borderColor}`}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
      </div>
      <p className="text-gray-600 leading-relaxed pt-3">{description}</p>
    </motion.div>
  );
};

export default News;
