import React, { useState, useEffect, useRef, memo } from 'react';

const BoxPattern = () => (
  <div className="grid grid-cols-4 gap-0.5 p-1">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="w-3 h-3 bg-red-600 rounded-full"></div>
    ))}
  </div>
);

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

const FlyingPizzas = memo(() => {
  const pizzaCount = 80;
  const pizzas = React.useMemo(
    () =>
      Array.from({ length: pizzaCount }).map((_, i) => {
        const size = Math.random() * 80 + 20;
        const duration = Math.random() * 8 + 8;
        const delay = Math.random() * -16;
        const startX = Math.random() * 150 - 25;
        const startY = Math.random() * 150 - 25;
        const rotation = Math.random() * 360;
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
        return { id: i, style: customStyle };
      }),
    []
  );
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {pizzas.map((pizza) => (
        <PizzaSlice key={pizza.id} className="absolute animate-fly opacity-25 text-red-600" style={pizza.style} />
      ))}
    </div>
  );
});

const ArchScrollAnimator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const desiredProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!animationContainerRef.current) return;
      const { top, height } = animationContainerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;
      const distance = vh * 1.7;
      const traveled = start - top;
      const raw = traveled / distance;
      const clamped = Math.max(0, Math.min(1, raw));
      desiredProgressRef.current = clamped;
    };

    const tick = () => {
      setScrollPercentage((prev) => {
        const target = desiredProgressRef.current;
        const next = prev + (target - prev) * 0.15;
        return Math.abs(next - target) < 0.0005 ? target : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    tick();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const text = '237 PIZZA 237 PIZZA 237 PIZZA 237 PIZZA 237 PIZZA';
  const letters = text.split('');

  const getLetterStyle = (index: number) => {
    const startAngle = -60;
    const endAngle = 100;
    const totalAngle = endAngle - startAngle;
    const baseAngle = startAngle + scrollPercentage * totalAngle;
    const letterSpacing = 8.5;
    const angleOffset = (letters.length / 2 - index) * letterSpacing;
    const currentAngle = baseAngle + angleOffset;

    const radiusX = 45;
    const centerX = 50;
    const centerY = 32;

    let x: number, y: number, rotation: number;

    const cornerStartAngle = 45;
    const cornerEndAngle = 135;

    if (currentAngle < 0) {
      x = centerX + radiusX * Math.cos(0);
      y = centerY - currentAngle * 1.3;
      rotation = 0;
    } else if (currentAngle >= 0 && currentAngle < cornerStartAngle) {
      const angleInRadians = (currentAngle * Math.PI) / 180;
      x = centerX + radiusX * Math.cos(angleInRadians);
      y = centerY - radiusX * Math.sin(angleInRadians);
      rotation = -currentAngle + 90;
    } else if (currentAngle >= cornerStartAngle && currentAngle <= cornerEndAngle) {
      const progress = (currentAngle - cornerStartAngle) / (cornerEndAngle - cornerStartAngle);
      const startX = centerX + radiusX * Math.cos((cornerStartAngle * Math.PI) / 180);
      const endX = centerX + radiusX * Math.cos((cornerEndAngle * Math.PI) / 180);
      x = startX + progress * (endX - startX);
      y = centerY - radiusX * Math.sin((cornerStartAngle * Math.PI) / 180);
      rotation = 0;
    } else if (currentAngle > cornerEndAngle && currentAngle <= 180) {
      const angleInRadians = (currentAngle * Math.PI) / 180;
      x = centerX + radiusX * Math.cos(angleInRadians);
      y = centerY - radiusX * Math.sin(angleInRadians);
      rotation = -currentAngle + 90;
    } else {
      x = centerX + radiusX * Math.cos(Math.PI);
      const angleAfter180 = currentAngle - 180;
      y = centerY + angleAfter180 * 1.3;
      rotation = 0;
    }

    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      willChange: 'transform, left, top',
    };
  };

  return (
    <div ref={animationContainerRef} className="bg-[#F9EFE4] text-red-600 font-sans h-screen sticky top-0">
      <style>
        {`
@keyframes fly {
  0% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0.3; }
  100% { transform: translateX(var(--end-x)) translateY(var(--end-y)) rotate(var(--rotation-end)); opacity: 0; }
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
                backgroundImage: `url('/images/three_image/pizza_girl2.png')`,
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
              <span key={index} className="absolute font-extrabold text-4xl md:text-6xl" style={getLetterStyle(index)}>
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