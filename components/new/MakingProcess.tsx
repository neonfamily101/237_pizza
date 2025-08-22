'use client';

import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Wheat, CookingPot } from 'lucide-react';


const steps = [
    {
      icon: <Wheat size={36} className="text-yellow-200" />,
      title: "The Perfect GLUTEN FREE",
      description: "저희 피자의 핵심인 도우는 전 세계 유일한 이탈리아산 글루텐 프리 피자 전용 밀가루로 만듭니다. 완벽하게 발효된 100% 글루텐 프리 도우는 가볍고 쫄깃하며 소화가 용이하여, 글루텐 프리 피자에 대한 편견을 깨고 오히려 더 맛있다는 평가를 받고 있습니다. 237피자에서만 경험할 수 있는 22가지 나폴리 정통 화덕피자는 건강과 미식을 동시에 만족시키는 새로운 표준 식단을 제시합니다.",
      imageUrl: "/images/makingprocess/gluten_free1.jpg",
    },
    {
      icon: <CookingPot size={36} className="text-red-400" />,
      title: "Clean GLUTEN FREE Ingredients",
      description: "237피자는 식자재 반입부터 보관, 조리, 서빙까지 글루텐 오염 가능성을 원천적으로 배제하는 완벽한 교차 오염 방지 시스템을 갖추고 있습니다. 한국 최초로 글루텐 프리 전용 화덕과 전용 주방 시설을 완비하여 셀리악 고객분들도 안심할 수 있습니다. 아티쵸크, 버섯류, 시금치, 양파, 통 올리브, 소시지(초리조), 햄(프로슈토), 향신료(오레가노, 타임, 로즈마리, 후추, 페페론치노, 바질페스토) 등의 재료 또한 글루텐 오염이 없는 상태로 제조, 포장, 운송되는 것을 검수해 사용하며 [User provided base], **유럽 DOP 인증 치즈, 이탈리아산 마르자노 플럼 토마토, 그리스 칼라마타 이리아다 올리브 오일** 등 모든 재료를 최고급으로 엄선해 사용합니다. 2024년 6월 개업 이래 지난 1년간 단 한 건의 문제 제기나 부작용 보고가 없는 '무결점' 운영으로 안전성이 입증되었습니다.",
      imageUrl: "/images/makingprocess/clean_ingredients.jpg",
    },
    // {
    //   icon: <CookingPot size={36} className="text-yellow-300" />,
    //   title: "Creamy Fior di Latte",
    //   description: "저희는 이탈리아에서 직수입한 **유럽 DOP 인증 생우유 100% 자연 치즈인 크리미한 피오르 디 라테 모짜렐라**를 아낌없이 올립니다. 이 치즈는 완벽하게 녹아내리며 **고유의 신선하고 고소한 풍미**를 선사하여 피자의 맛을 한층 더 높여줍니다.",
    //   imageUrl: "/images/hero/pizza.02.jpg",
    // },
  ]
  
const TextItem = React.forwardRef<
  HTMLDivElement,
  { index: number; activeIndex: number }
>(({ index, activeIndex }, ref) => {
  const [expanded, setExpanded] = useState(false);
  const isActive = activeIndex === index;
  return (
    <motion.div
      ref={ref}
      data-index={index}
      animate={{ opacity: isActive ? 1 : 0.35, scale: isActive ? 1 : 0.96 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="text-left py-24"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
          {steps[index].icon}
        </div>
        <h3 className="text-4xl font-extrabold text-white">{steps[index].title}</h3>
      </div>
      <p className={`text-white/70 text-lg leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>{steps[index].description}</p>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 inline-flex items-center gap-1 text-sm text-gray-200 underline/50 hover:underline"
        aria-expanded={expanded}
        aria-controls={`desc-${index}`}
      >
        {expanded ? '접기' : '더보기'}
      </button>
    </motion.div>
  );
});
TextItem.displayName = 'TextItem';

const ImageContent = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          animate={{ opacity: activeIndex === index ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${step.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </motion.div>
      ))}
    </div>
  );
};

const MakingProcess = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const textColRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [leftHeight, setLeftHeight] = useState(0);
  const [imageBoxHeight, setImageBoxHeight] = useState(520);
  const ySpring = useSpring(0, { stiffness: 110, damping: 22, mass: 0.6 });

  useLayoutEffect(() => {
    const size = () => {
      const textH = textColRef.current?.getBoundingClientRect().height ?? 0;
      setLeftHeight(textH);
      const vh = Math.max(320, Math.min(600, Math.round((window.innerHeight || 800) * 0.6)));
      setImageBoxHeight(vh);
      updateY();
    };
    const updateY = () => {
      const leftRect = leftColRef.current?.getBoundingClientRect();
      const targetEl = itemRefs.current[activeIndex];
      if (!leftRect || !targetEl) return;
      const itemRect = targetEl.getBoundingClientRect();
      const y = itemRect.top - leftRect.top + (itemRect.height - imageBoxHeight) / 2;
      const maxY = Math.max(0, leftHeight - imageBoxHeight);
      const clamped = Math.max(0, Math.min(maxY, y));
      ySpring.set(clamped);
    };
    size();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateY();
        ticking = false;
      });
    };
    const onResize = () => size();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [activeIndex, leftHeight, imageBoxHeight, ySpring]);

  useEffect(() => {
    const els = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number((visible.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      { root: null, threshold: [0.25, 0.5, 0.75], rootMargin: '-35% 0% -35% 0%' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-[#2a1a1a] text-white py-24">
      <div
        ref={gridRef}
        className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
      >
         <div
           ref={leftColRef}
           className="relative hidden lg:block"
           style={{ height: leftHeight ? `${leftHeight}px` : undefined }}
         >
           <motion.div
             className="absolute left-0 right-0 mx-auto w-full max-w-[560px]"
             style={{ y: ySpring, height: imageBoxHeight }}
           >
             <ImageContent activeIndex={activeIndex} />
           </motion.div>
         </div>
 
        <LayoutGroup id="making-process-mobile">
          <div ref={textColRef} className="flex flex-col">
            {steps.map((_, index) => (
              <React.Fragment key={index}>
                <div className="lg:hidden mb-4">
                  <AnimatePresence initial={false} mode="popLayout">
                    {activeIndex === index && (
                      <motion.div
                        layoutId="mobile-image-box"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.80, ease: 'easeOut' }}
                        className="w-full h-[300px] rounded-2xl overflow-hidden shadow-2xl"
                      >
                        <ImageContent activeIndex={activeIndex} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <TextItem
                  index={index}
                  activeIndex={activeIndex}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                    if (el) (el as HTMLElement).dataset.index = String(index);
                  }}
                />
              </React.Fragment>
            ))}
          </div>
        </LayoutGroup>
 
      </div>
    </section>
  );
};
export default MakingProcess;