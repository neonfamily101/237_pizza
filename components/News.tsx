'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Heart, XCircle, Wheat } from 'lucide-react';

// 타입 정의
interface Module {
  type: 'problem' | 'solution';
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  emphasisStart?: string; // 강조할 시작 텍스트
  emphasisEnd?: string;   // 강조할 끝 텍스트
}

const GlutenAnalysis = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  const [currentState, setCurrentState] = useState('initial');

  useEffect(() => {
    if (isInView) {
      const timer1 = setTimeout(() => setCurrentState('problem'), 500);
      const timer2 = setTimeout(() => setCurrentState('solution'), 2000); // 문제점을 인지할 시간을 조금 더 줍니다.
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isInView]);

  // 제공된 상세 정보로 모듈 데이터 업데이트
  const modules: Module[] = [
    { 
      type: 'problem', 
      id: 'risks', 
      icon: <AlertTriangle size={40} />, 
      title: '글루텐의 잠재적 위험성', 
      description: '셀리악병, 비셀리악 글루텐 민감증(NCGS), 밀 알레르기 등을 유발하며 복통, 설사, 피부 트러블, 심하면 아나필락시스 쇼크까지 일으킬 수 있습니다.' 
    },
    { 
      type: 'problem', 
      id: 'indigestible', 
      icon: <XCircle size={40} />, 
      title: '소화 불가능한 단백질', 
      description: '인체에서 완전 분해가 어려운 불용성 단백질입니다. 장내 환경을 해치고 염증 반응을 일으켜 장 누수(Leaky Gut)의 원인이 될 수 있습니다.' 
    },
    { 
      type: 'solution', 
      id: 'regulation', 
      icon: <ShieldCheck size={40} />, 
      title: '과학적 검증과 국제 규제', 
      description: 'WHO/FAO는 글루텐의 위해성을 인지, 식품 내 함량을 20ppm 이하로 엄격히 규제합니다. 이는 공공 보건 차원의 관리가 필요함을 의미합니다.' 
    },
    { 
      type: 'solution', 
      id: 'promise', 
      icon: <Heart size={40} />, 
      title: '모두를 위한 새로운 표준', 
      description: " 잠재적 질병을 예방하고 삶의 질을 높이는 중요한 선택입니다.",
      emphasisStart: "글루텐 프리는",
      emphasisEnd: "237피자가 그 기준을 제시합니다."
    },
  ];

  const cardPositions = ['lg:top-0 lg:left-[5%]', 'lg:bottom-0 lg:left-[15%]', 'lg:top-0 lg:right-[5%]', 'lg:bottom-0 lg:right-[15%]'];
  const linePaths = ["M 50 45 L 20 15", "M 50 55 L 25 85", "M 50 45 L 80 15", "M 50 55 L 75 85"];

  const problemColor = "#dc2626"; // Red-600
  const solutionColor = "#16a34a"; // Green-600
  const neutralColor = "#94a3b8";   // Slate-400

  const getCardStyle = (type: 'problem' | 'solution', id: string) => {
    if (currentState === 'problem' && type === 'problem') {
      return { borderColor: problemColor, textColor: problemColor, scale: 1.05, shadow: 'shadow-xl shadow-red-500/20' };
    }
    if (currentState === 'solution') {
      if (type === 'solution') {
        if (id === 'promise') {
          return { borderColor: solutionColor, textColor: solutionColor, scale: 1.15, shadow: 'shadow-2xl shadow-green-500/40' };
        }
        return { borderColor: solutionColor, textColor: solutionColor, scale: 1.1, shadow: 'shadow-2xl shadow-green-500/30' };
      }
      return { borderColor: neutralColor, textColor: neutralColor, scale: 1, shadow: 'shadow-md' };
    }
    return { borderColor: neutralColor, textColor: neutralColor, scale: 1, shadow: 'shadow-md' };
  };

  return (
    <section ref={ref} className="relative min-h-screen bg-slate-50 flex items-center justify-center py-24 px-4 overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            initial={{ x: `${Math.random()*100}vw`, y: `${Math.random()*100}vh`, scale: 0, opacity: 0, backgroundColor: Math.random() > 0.5 ? solutionColor : problemColor }}
            animate={{ scale: 1, opacity: [0, 0.1, 0] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
            style={{ width: `${Math.random() * 200 + 100}px`, height: `${Math.random() * 200 + 100}px`, filter: 'blur(80px)' }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 1, delay: 0.2 }} 
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
            왜 '글루텐 프리'는 '선택'이 아닌 '필수'일까요?
          </h2>
          <p className="text-slate-600 mt-4 max-w-3xl mx-auto text-lg">
            글루텐의 숨겨진 이야기부터 모두를 위한 건강한 해결책까지, 237피자가 제안하는 새로운 식사 표준을 만나보세요.
          </p>
        </motion.div>

        <div className="relative w-full max-w-6xl h-[110vh] md:h-[90vh]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <motion.div
              animate={{ rotate: currentState === 'solution' ? 720 : 0, scale: currentState === 'solution' ? 1.2 : 1 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            >
              <motion.div
                animate={{ color: currentState === 'solution' ? solutionColor : problemColor }}
                transition={{ duration: 1, delay: currentState === 'solution' ? 0 : 3 }}
              >
                {currentState === 'solution' ? <ShieldCheck size={120}/> : <Wheat size={120} />}
              </motion.div>
            </motion.div>
          </div>
          
          <div className="hidden lg:block absolute inset-0">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              {modules.map((module, i) => {
                const { borderColor } = getCardStyle(module.type, module.id);
                return (
                  <motion.path 
                    key={`line-${i}`} 
                    d={linePaths[i]} 
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, stroke: neutralColor }}
                    animate={{ pathLength: currentState !== 'initial' ? 1 : 0, stroke: borderColor }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  />
                )
              })}
            </svg>
          </div>

          {modules.map((module, i) => {
            const { borderColor, textColor, scale, shadow } = getCardStyle(module.type, module.id);
            return (
              <motion.div
                key={`card-desktop-${i}`}
                className={`hidden lg:flex absolute p-6 rounded-2xl flex-col items-start w-80 bg-white/80 backdrop-blur-lg ${cardPositions[i]} ${shadow}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentState !== 'initial' ? 1 : 0, y: currentState !== 'initial' ? 0 : 20, scale: scale, boxShadow: `0 0 0 2px ${borderColor}` }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              >
                  <div className="flex-grow">
                    <motion.div className="mb-4" animate={{ color: textColor }} transition={{ duration: 0.7 }}>
                      {module.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{module.title}</h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {module.emphasisStart && (
                        <motion.strong className="font-bold" animate={{ color: textColor }} transition={{ duration: 0.7 }}>
                          {module.emphasisStart}
                        </motion.strong>
                      )}
                      {module.description}
                    </p>
                  </div>
                  {module.emphasisEnd && (
                    <motion.div
                      className="mt-4 text-center w-full p-3 rounded-lg font-bold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: currentState === 'solution' ? 1 : 0,
                        scale: currentState === 'solution' ? 1 : 0.8,
                        color: currentState === 'solution' ? solutionColor : neutralColor,
                        backgroundColor: currentState === 'solution' ? '#dcfce7' : '#f3f4f6'
                      }}
                      transition={{ delay: currentState === 'solution' ? 0.5 : 0, duration: 0.5 }}
                    >
                      {module.emphasisEnd}
                    </motion.div>
                  )}
              </motion.div>
            )
          })}

          <div className="lg:hidden absolute inset-0 top-[60%] flex flex-col justify-start items-center gap-4 px-4">
             {modules.map((module, i) => {
               const { borderColor, textColor, scale } = getCardStyle(module.type, module.id);
               return (
                <motion.div
                  key={`card-mobile-${i}`}
                  className="w-full max-w-md p-4 rounded-xl bg-white/80 backdrop-blur-md flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: currentState !== 'initial' ? 1 : 0, x: currentState !== 'initial' ? 0 : -20, scale: scale, boxShadow: `0 0 0 2px ${borderColor}` }}
                  transition={{ duration: 0.2, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div className="flex-shrink-0" animate={{ color: textColor }} transition={{ duration: 0.7 }}>
                      {module.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-slate-800">{module.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">
                        {module.emphasisStart && <strong className="font-bold" style={{color: textColor}}>{module.emphasisStart}</strong>}
                        {module.description}
                      </p>
                    </div>
                  </div>
                   {module.emphasisEnd && (
                    <motion.div
                      className="mt-3 text-center w-full p-2 rounded-lg font-bold text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: currentState === 'solution' ? 1 : 0,
                        color: currentState === 'solution' ? solutionColor : neutralColor,
                        backgroundColor: currentState === 'solution' ? '#dcfce7' : '#f3f4f6'
                      }}
                      transition={{ delay: currentState === 'solution' ? 0.5 : 0, duration: 0.5 }}
                    >
                      {module.emphasisEnd}
                    </motion.div>
                  )}
                </motion.div>
               )
             })}
          </div>
        </div>
      </div>
    </section>
  )
}

const App = () => {
    return <GlutenAnalysis />;
}

export default App;
