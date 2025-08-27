'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate
} from 'framer-motion';

const values = [
  {
    title: "237 PIZZA",
    videoUrl: "/videos/direction.webm",
    bgColor: "#2E2A2B"
  },
  {
    title: "237 PIZZA",
    videoUrl: "/videos/firepit.webm",
    bgColor: "#4B3F3A"
  },
  {
    title: "237 PIZZA",
    videoUrl: "/videos/make_pizza.webm",
    bgColor: "#2A3B4A"
  },
];

const CoreValues = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile(); // 초기 로드 시 체크
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);


  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(Math.floor(latest * values.length), values.length - 1);
    setActiveIndex(newIndex);
  });

  const clipPathRadius = useTransform(scrollYProgress, [0, 0.1], [0, 50]);
  const clipPath = useMotionTemplate`circle(${clipPathRadius}% at 50% 50%)`;
  
  const textZ = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [200, 0, 200]);
  
  return (
    <div ref={targetRef} className="relative h-[700vh]">
      <motion.div
        animate={{ backgroundColor: values[activeIndex]?.bgColor || "#2a2a2a" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="sticky top-0 h-screen flex items-center justify-center"
      >
        <div className="w-full h-full flex items-center justify-center">
          
          <motion.div
            style={{ 
              clipPath: clipPath,
            }}
            className="absolute w-[70vw] h-[70vw] md:w-[40vh] md:h-[40vh] max-w-[90vw] max-h-[90vw] md:max-w-[800px] md:max-h-[800px] z-10 shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/40 z-20"></div>
            {values.map((item, index) => {
              const length = values.length;
              const start = index / length;
              const end = (index + 1) / length;
              
              const opacity = useTransform(scrollYProgress, [start - 0.08, start, end, end + 0.08], [0, 1, 1, 0]);
              const scale = useTransform(scrollYProgress, [start, end], [1, 1.1]);

              return (
                <motion.div key={item.videoUrl} className="absolute inset-0" style={{ opacity }}>
                  <motion.video
                    style={{ scale, filter: 'grayscale(100%)' }} 
                    className="w-full h-full object-cover"
                    src={item.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div 
            style={{ translateZ: textZ }}
            className="relative w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-between h-4/5 z-20"
          >
            <div className="flex justify-between items-start">
              <span className="text-white/80 font-serif leading-none select-none" style={{ fontSize: 'clamp(2.5rem, 20vw, 12rem)' }}>MA</span>
              <span className="text-white/80 font-serif leading-none select-none" style={{ fontSize: 'clamp(2.5rem, 20vw, 12rem)' }}>KE</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-white/80 font-serif leading-none select-none" style={{ fontSize: 'clamp(2.5rem, 20vw, 12rem)' }}>PI</span>
              <span className="text-white/80 font-serif leading-none select-none" style={{ fontSize: 'clamp(2.5rem, 20vw, 12rem)' }}>ZZA</span>
            </div>
          </motion.div>

          <div className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 text-white/40 font-mono text-xs [writing-mode:vertical-rl] tracking-[0.3em] uppercase select-none z-30">Scroll</div>
          <div className="absolute bottom-8 left-4 md:left-8 text-white/80 font-mono text-sm uppercase tracking-widest z-30"><p>{values[activeIndex]?.title}</p></div>
          <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-white/80 z-30" style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} />
        </div>
      </motion.div>
    </div>
  );
};

export default CoreValues;