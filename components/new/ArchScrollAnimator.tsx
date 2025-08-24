import React, { useState, useEffect, useRef, memo } from 'react';

// 작은 상자 패턴 UI
const BoxPattern = () => (
  <div className="grid grid-cols-4 gap-0.5 p-1">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="w-3 h-3 bg-red-600 rounded-full"></div>
    ))}
  </div>
);

// 스케치 스타일 피자 SVG 컴포넌트
const PizzaSlice = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
    <svg 
        viewBox="0 0 100 100" 
        className={className}
        style={style}
        xmlns="/images/pizza/pizza_icon_131067.svg" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="4"
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M 10 10 L 90 50 L 10 90 Z" />
        <path d="M 10 10 C 40 40, 40 60, 10 90" />
        <circle cx="40" cy="45" r="8" />
        <circle cx="60" cy="60" r="6" />
        <circle cx="30" cy="70" r="5" />
    </svg>
);


// React.memo를 사용하여 불필요한 리렌더링을 방지합니다.
const FlyingPizzas = memo(() => {
    const pizzaCount = 40; 

    // useMemo를 사용하여 pizzas 배열이 컴포넌트가 리렌더링될 때마다 재생성되지 않도록 합니다.
    const pizzas = React.useMemo(() => Array.from({ length: pizzaCount }).map((_, i) => {
        const size = Math.random() * 40 + 20; // 20px ~ 60px 크기
        const duration = Math.random() * 8 + 8; // 8초 ~ 16초 지속시간
        const delay = Math.random() * -16; // 애니메이션 시작 지연
        
        const startX = Math.random() * 150 - 25; // -25vw ~ 125vw
        const startY = Math.random() * 150 - 25; // -25vh ~ 125vh
        
        const rotation = Math.random() * 360; // 초기 회전 각도

        const customStyle = {
            '--start-x': `${startX}vw`,
            '--start-y': `${startY}vh`,
            '--end-x': `${Math.random() * 200 - 100}vw`,
            '--end-y': `${Math.random() * 200 - 100}vh`,
            '--rotation-end': `${Math.random() * 1440 - 720}deg`,
            width: `${size}px`,
            height: `${size}px`,
            left: 'var(--start-x)',
            top: 'var(--start-y)',
            transform: `rotate(${rotation}deg)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
        } as React.CSSProperties;

        return {
            id: i,
            style: customStyle,
        };
    }), []); // 의존성 배열이 비어 있으므로 최초 렌더링 시에만 실행됩니다.

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {pizzas.map(pizza => (
                <PizzaSlice 
                    key={pizza.id}
                    className="absolute animate-fly opacity-25 text-red-600"
                    style={pizza.style}
                />
            ))}
        </div>
    );
});


// 메인 컴포넌트: ArchScrollAnimator
const ArchScrollAnimator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const animationContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!animationContainerRef.current) return;

    const { top } = animationContainerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const animationStartTrigger = viewportHeight;
    // [수정] 애니메이션 거리를 원래 값으로 되돌립니다.
    const animationDistance = viewportHeight * 1.7;
    const distanceScrolled = animationStartTrigger - top;
    const progress = distanceScrolled / animationDistance;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    setScrollPercentage(clampedProgress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const text = "237 PIZZA 237 PIZZA 237 PIZZA 237 PIZZA 237 PIZZA";
  const letters = text.split('');

  // --- [수정] 텍스트 애니메이션을 원래의 아치 형태로 되돌립니다. ---
  const getLetterStyle = (index: number) => {
    const startAngle = -60;
    const endAngle = 210;
    const totalAngle = endAngle - startAngle;

    const baseAngle = startAngle + scrollPercentage * totalAngle;
    const letterSpacing = 8.5; 
    const angleOffset = (letters.length / 2 - index) * letterSpacing;
    const currentAngle = baseAngle + angleOffset;

    const radiusX = 45;
    const centerX = 50;
    const centerY = 30;

    let x, y, rotation;

    if (currentAngle >= 0 && currentAngle <= 180) {
        const angleInRadians = currentAngle * (Math.PI / 180);
        const radiusY = radiusX; 
        x = centerX + radiusX * Math.cos(angleInRadians);
        y = centerY - radiusY * Math.sin(angleInRadians);
        rotation = -currentAngle + 90;
    } else if (currentAngle < 0) {
        x = centerX + radiusX;
        y = centerY - currentAngle * 1.3;
        rotation = 0;
    } else {
        x = centerX - radiusX;
        const angleAfter180 = currentAngle - 180;
        y = centerY + angleAfter180 * 1.3;
        rotation = 0;
    }

    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      transition: 'transform 0.1s linear',
    };
  };

  return (
    <div ref={animationContainerRef} className="bg-[#F9EFE4] text-red-600 font-sans h-screen sticky top-0">
      <style>
        {`
          @keyframes fly {
            0% {
              transform: translateX(0) translateY(0) rotate(0deg);
              opacity: 0.3;
            }
            100% {
              transform: translateX(var(--end-x)) translateY(var(--end-y)) rotate(var(--rotation-end));
              opacity: 0;
            }
          }
          .animate-fly {
            animation-name: fly;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
      </style>
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <FlyingPizzas />
        
        <div className="relative w-[90vw] h-[90vh] md:w-[55vw] md:h-[85vh] max-w-2xl max-h-3xl z-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="relative w-[75%] h-[85%] rounded-2xl shadow-2xl overflow-hidden border-8 border-[#F9EFE4]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1964&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
               
               <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-[#F9EFE4] z-10"></div>
               <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 bg-[#F9EFE4] z-10"></div>
            </div>
          </div>
          <div className="absolute w-full h-full pointer-events-none">
            {letters.map((char, index) => (
              <span
                key={index}
                className="absolute font-extrabold text-4xl md:text-6xl"
                style={getLetterStyle(index)}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchScrollAnimator;
