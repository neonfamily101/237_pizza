'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 

const ContentSection = ({
  textPosition = 'left',
  title,
  children,
  imageUrl,
  showOverlayNav,
  onPrev,
  onNext,
}: {
  textPosition?: 'left' | 'right';
  title: string;
  children: React.ReactNode;
  imageUrl: string;
  showOverlayNav?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const textVariants = {
    hidden: { opacity: 0, x: textPosition === 'left' ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const textBlock = (
    <motion.div
      variants={textVariants}
      className="w-full md:w-2/5"
    >
      <h1 className="text-5xl text-center md:text-left md:text-7xl font-extrabold text-[#9A3434] uppercase leading-none tracking-tight">
        {title}
      </h1>
      <div className="mt-20 text-base md:text-lg text-[#9A3434]/80 font-bold">{children}</div>
    </motion.div>
  );

  const imageBlock = (
    <motion.div variants={imageVariants} className="w-full md:w-2/5 flex justify-center items-center mt-12 md:mt-0">
      <div className="relative w-full max-w-md md:h-[350px]">
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full max-w-[320px] h-auto md:w-96 md:h-96 object-contain"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: `drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))` }}
        />
        {showOverlayNav && (
          <>
            <button
              onClick={onPrev}
              className="absolute top-1/2 -translate-y-1/2 left-2 w-12 h-12 rounded-full bg-[#9A3434] text-white text-2xl flex items-center justify-center active:scale-95 md:hidden"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={onNext}
              className="absolute top-1/2 -translate-y-1/2 right-2 w-12 h-12 rounded-full bg-[#9A3434] text-white text-2xl flex items-center justify-center active:scale-95 md:hidden"
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col md:flex-row justify-center items-center w-full max-w-7xl mx-auto py-15 px-8"
    >
      <div className={`w-full flex flex-col md:flex-row justify-between items-center pb-20 ${textPosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
        {textBlock}
        {imageBlock}
      </div>
    </motion.section>
  );
};

const SelfBaking = () => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = 5;
  const goPrev = () => { setDirection(-1); setMobileIndex((i) => (i - 1 + total) % total); };
  const goNext = () => { setDirection(1); setMobileIndex((i) => (i + 1) % total); };
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 })
  };
  return (
    <div className="bg-[#FBEFDD] pb-24">
      <h1 className="text-center mt-20 mb-10 text-5xl md:text-7xl font-extrabold text-[#9A3434] uppercase leading-none tracking-tight pb-20">
        237 피자만의 차별점
      </h1>

      {/* 모바일: 하나씩 슬라이드 */}
      <div className="md:hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={mobileIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {mobileIndex === 0 && (
              <ContentSection textPosition="left" title="CAPUTO GLUTEN FREE" imageUrl="/images/good_point/gluten.png" showOverlayNav onPrev={goPrev} onNext={goNext}>
                <p>•나폴리 장인의 노하우로 완성된 정통 이탈리아산 Caputo Gluten Free 플라워 블렌드 — 피자, 빵 등 다양한 베이킹에 전문가급 성능을 제공합니다.</p>
                <br />
                <p>•특히 글루텐 프리이면서도 뛰어난 식감과 부드러운 구조를 구현해, ‘진짜 밀가루’처럼 반죽할 수 있는 유연함이 돋보입니다.</p>
                <br />
                <p>•FDA 기준 이하로 안전하게 테스트된 제품으로, 셀리악 환자도 안심하고 즐길 수 있는 고급 선택지입니다.</p>
              </ContentSection>
            )}
            {mobileIndex === 1 && (
              <ContentSection textPosition="right" title="Kalamata EXTRA VIRGIN OLIVE OIL" imageUrl="/images/good_point/oil.png" showOverlayNav onPrev={goPrev} onNext={goNext}>
                <p>• 세계적으로 인정받은 Kalamata PDO 올리브오일만 사용합니다.</p>
                <br />
                <p>•신선한 과일 향과 깊은 풍미가 피자의 맛을 한층 높여줍니다.</p>
                <br />
                <p>•정통 이탈리아식 건강함과 고급스러움을 그대로 담았습니다.</p>
              </ContentSection>
            )}
            {mobileIndex === 2 && (
              <ContentSection textPosition="left" title="VESU TOMATOES" imageUrl="/images/good_point/tomato.png" showOverlayNav onPrev={goPrev} onNext={goNext}>
                <p>•이탈리아산 신선한 Vesu 홀 토마토만을 사용해 진한 풍미가 입안 가득 살아납니다.</p>
                <br />
                <p>•껍질과 씨 없이 정제된 퓨레로, 깔끔한 식감과 깊은 맛을 선사합니다.</p>
                <br />
                <p>•전통 지중해 스타일의 리얼함을 담아, 피자 소스의 맛을 한층 업그레이드합니다.</p>
              </ContentSection>
            )}
            {mobileIndex === 3 && (
              <ContentSection textPosition="right" title="Sorrentina mozzarella CHEESE" imageUrl="/images/good_point/cheese.png" showOverlayNav onPrev={goPrev} onNext={goNext}>
                <p>•	전통을 담은 부드럽고 쫄깃한 텍스처 나폴리 인근 캄파니아 지역의 신선한 우유로 만든 전통 방식의 치즈로, 부드러우면서도 스트링처럼 늘어나는 탄력감이 특징입니다.</p>
                <br />
                <p>•	완벽한 균일한 유동성과 풍부한 녹는성 수분 함량과 녹는 성질이 이상적으로 조화를 이루어, 피자 토핑 시 전체적으로 균일하게 녹아들며 풍미를 극대화합니다. </p>
                <br />
                <p>•	깊은 전통과 장인정신이 깃든 품질 1880년부터 가족 전통으로 이어온 수제 제작 방식과 지역 장인들의 노하우가 담겨 있어, 진정한 이탈리아 정통 맛을 제공합니다.</p>
              </ContentSection>
            )}
            {mobileIndex === 4 && (
              <ContentSection textPosition="left" title="La Sevillana Black Olive" imageUrl="/images/good_point/olive.png" showOverlayNav onPrev={goPrev} onNext={goNext}>
                <p>•	농약이나 합성비료 없이 재배된 올리브를 인위적 방법 없이 자연 숙성하여, 깊고 고소한 맛을 자랑합니다.</p>
                <br />
                <p>•	오일에 재워 더해진 감각적인 고소함 올리브 오일에 재워 보관함으로써, 한층 고소함이 더해지고 와인이나 피자 등 다양한 요리에 잘 어울리는 풍미를 제공합니다.</p>
                <br />
                <p>•	스페인 전통을 담은 정통 레시피 정통 라 세비야나 방식으로 만든 제품으로, 스페인의 요리 전통과 진정한 지역 맛을 느낄 수 있습니다.</p>
              </ContentSection>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-center px-8 -mt-6">
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${i === mobileIndex ? 'bg-[#9A3434]' : 'bg-[#9A3434]/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:block">
      <ContentSection
        textPosition="left"
        title="CAPUTO GLUTEN FREE"
        imageUrl="/images/good_point/gluten.png"
      >
        <p>
        •	나폴리 장인의 노하우로 완성된 정통 이탈리아산 Caputo Gluten Free 플라워 블렌드 — 피자, 빵 등 다양한 베이킹에 전문가급 성능을 제공합니다.
        </p>
        <br />
        <p>
        •	특히 글루텐 프리이면서도 뛰어난 식감과 부드러운 구조를 구현해, ‘진짜 밀가루’처럼 반죽할 수 있는 유연함이 돋보입니다.
        </p>
        <br />
        <p>
        •	FDA 기준 이하로 안전하게 테스트된 제품으로, 셀리악 환자도 안심하고 즐길 수 있는 고급 선택지입니다.
          </p>
      </ContentSection>

      <ContentSection
        textPosition="right"
        title="Kalamata EXTRA VIRGIN OLIVE OIL"
        imageUrl="/images/good_point/oil.png"
      >
        <p>
        • 세계적으로 인정받은 Kalamata PDO 올리브오일만 사용합니다.
        </p>
        <br />
        <p>
        •	신선한 과일 향과 깊은 풍미가 피자의 맛을 한층 높여줍니다.
        </p>
        <br />
        <p>
        •	정통 이탈리아식 건강함과 고급스러움을 그대로 담았습니다.
        </p>
      </ContentSection>

      <ContentSection
        textPosition="left"
        title="VESU TOMATOES"
        imageUrl="/images/good_point/tomato.png"
      >
        <p>
        •	이탈리아산 신선한 Vesu 홀 토마토만을 사용해 진한 풍미가 입안 가득 살아납니다.
        </p>
        <br />
        <p>
        •	껍질과 씨 없이 정제된 퓨레로, 깔끔한 식감과 깊은 맛을 선사합니다.
        </p>
        <br />
        <p>
        •	전통 지중해 스타일의 리얼함을 담아, 피자 소스의 맛을 한층 업그레이드합니다.</p>
      </ContentSection>


      <ContentSection
        textPosition="right"
        title="Sorrentina mozzarella CHEESE"
        imageUrl="/images/good_point/cheese.png"
      >
        <p>
        •	전통을 담은 부드럽고 쫄깃한 텍스처
          나폴리 인근 캄파니아 지역의 신선한 우유로 만든 전통 방식의 치즈로, 부드러우면서도 스트링처럼 늘어나는 탄력감이 특징입니다.
        </p>
        <br />
        <p>
        •	완벽한 균일한 유동성과 풍부한 녹는성
          수분 함량과 녹는 성질이 이상적으로 조화를 이루어, 피자 토핑 시 전체적으로 균일하게 녹아들며 풍미를 극대화합니다. 
        </p>
        <br />
        <p>
        •	깊은 전통과 장인정신이 깃든 품질
          1880년부터 가족 전통으로 이어온 수제 제작 방식과 지역 장인들의 노하우가 담겨 있어, 진정한 이탈리아 정통 맛을 제공합니다.
        </p>
      </ContentSection>


      <ContentSection
        textPosition="left"
        title="La Sevillana Black Olive"
        imageUrl="/images/good_point/olive.png"
      >
        <p>
        •	농약이나 합성비료 없이 재배된 올리브를 인위적 방법 없이 자연 숙성하여, 깊고 고소한 맛을 자랑합니다.
        </p>
        <br />
        <p>
        •	오일에 재워 더해진 감각적인 고소함
        올리브 오일에 재워 보관함으로써, 한층 고소함이 더해지고 와인이나 피자 등 다양한 요리에 잘 어울리는 풍미를 제공합니다.
        </p>
        <br />
        <p>
        •	스페인 전통을 담은 정통 레시피
        정통 라 세비야나 방식으로 만든 제품으로, 스페인의 요리 전통과 진정한 지역 맛을 느낄 수 있습니다.
        </p>
      </ContentSection>
      </div>
    </div>
  );
};

export default SelfBaking;
