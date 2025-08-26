'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const values = [
  {
    title: "Authenticity",
    description: "We honor the centuries-old tradition of Neapolitan pizza, bringing its authentic spirit to the modern era with our gluten-free promise.",
    imageUrl: "/images/hero/pizza.model.jpg",
  },
  {
    title: "Quality",
    description: "From our specially milled flour to the freshest toppings, we never compromise on quality. Every ingredient is chosen to create the ultimate pizza experience.",
    imageUrl: "/images/three_image/pizza_girl1.png",
  },
  {
    title: "Inclusivity",
    description: "We believe everyone deserves great pizza. Our 100% gluten-free kitchen ensures that people with dietary restrictions can dine with confidence and joy.",
    imageUrl: "/images/three_image/pizza_girl.png",
  },
];

// 1. 컴포넌트에 className prop을 추가하여 부모로부터 스타일을 받을 수 있도록 합니다.
const ParallaxSection = ({ title, description, imageUrl, className }: { title: string, description: string, imageUrl: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    // 2. 전달받은 className을 적용하고, 높이를 min-h-screen으로 변경합니다.
    <section ref={ref} className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y,
        }}
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 text-center text-white p-8">
        <motion.h2
          // 3. 폰트 크기를 모바일 친화적으로 세분화합니다.
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold uppercase"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

const CoreValues = () => {
  return (
    <div>
      {values.map((value, index) => (
        <ParallaxSection
          key={index}
          {...value}
          // 4. 첫 번째 아이템(index === 0)일 경우에만 모바일에서 숨기는 클래스를 전달합니다.
          // md(768px) 사이즈 이상일 때만 flex로 보이게 됩니다.
          className={index === 0 ? 'hidden md:flex' : ''}
        />
      ))}
    </div>
  );
};

export default CoreValues;