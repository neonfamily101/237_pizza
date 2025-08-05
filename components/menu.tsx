'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// 타입 정의
interface MenuItem {
  name: string;
  description: string;
  image: string;
  price: string;
}

// 메뉴 데이터
const pizzaMenu: MenuItem[] = [
  { name: '마리나라 오리지날', description: '토마토, 오레가노, 마늘로 맛을 낸 클래식 비건 피자', image: '/images/menu/1.marinara.png', price: '₩18,000' },
  { name: '마르게리타 클라시카', description: '신선한 바질과 부팔라 모짜렐라가 어우러진 정통 나폴리 피자', image: '/images/menu/2.margherita_classica.png', price: '₩22,000' },
  { name: '마르게리타', description: '기본에 충실한 클래식 토마토 소스 피자', image: '/images/menu/3.margherita.png', price: '₩20,000' },
  { name: '고르곤졸라', description: '진한 풍미의 고르곤졸라 치즈와 꿀의 완벽한 조화', image: '/images/menu/4.gorgonzola.png', price: '₩26,000' },
  { name: '올리브 피자', description: '다양한 종류의 올리브가 듬뿍 올라간 풍미 가득한 피자', image: '/images/menu/5.olive_pizza.png', price: '₩25,000' },
  { name: '카프레제 피자', description: '신선한 토마토와 부팔라 모짜렐라, 바질이 올라간 샐러드 피자', image: '/images/menu/6.caprese.png', price: '₩27,000' },
  { name: '고트 치즈 피자', description: '독특한 풍미의 고트 치즈와 채소의 조화', image: '/images/menu/7.goat_cheese.png', price: '₩28,000' },
  { name: '콰트로 포르마지', description: '네 가지 종류의 치즈가 만들어내는 깊고 풍부한 맛', image: '/images/menu/8.quattro.png', price: '₩29,000' },
  { name: '통 포르치니 피자', description: '진한 버섯의 왕, 포르치니 버섯이 통으로 올라간 피자', image: '/images/menu/9.whole_porcini.png', price: '₩32,000' },
  { name: '트러플 콰트로', description: '콰트로 포르마지 피자에 트러플 오일이 더해져 풍미를 극대화한 피자', image: '/images/menu/10.truffle_quattro.png', price: '₩34,000' },
];

const DynamicMenu = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section ref={ref} className="relative min-h-screen w-full py-24 overflow-hidden bg-gray-50">
      {/* 배경 애니메이션 */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-800 rounded-full z-0"
        style={{ x: '-50%', y: '-50%' }}
        animate={{
            width: isInView ? '250vw' : '0vw',
            height: isInView ? '250vw' : '0vw',
        }}
        transition={{ duration: 5.5, ease: [0.25, 1, 0.5, 1] }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 transition-colors duration-1000 ${isInView ? 'text-white' : 'text-gray-800'}`}>
            Our Signature Pizzas
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-1000 ${isInView ? 'text-gray-200' : 'text-gray-600'}`}>
            237피자만의 특별한 레시피로 만든, 건강하고 맛있는 글루텐 프리 피자들을 만나보세요.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-10"
        >
          {pizzaMenu.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
              <div className="md:col-span-2 flex justify-center">
                <motion.div 
                  className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/400x400/e2e8f0/94a3b8?text=Image+Error`; }}
                  />
                </motion.div>
              </div>
              <div className="md:col-span-3 text-center md:text-left">
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-1000 ${isInView ? 'text-white' : 'text-gray-800'}`}>
                  {item.name}
                </h3>
                <p className={`text-sm mb-3 max-w-md mx-auto md:mx-0 transition-colors duration-1000 ${isInView ? 'text-gray-300' : 'text-gray-500'}`}>
                  {item.description}
                </p>
                <p className={`text-3xl font-bold transition-colors duration-1000 ${isInView ? 'text-yellow-300' : 'text-red-600'}`}>
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const App = () => {
  return <DynamicMenu />;
};

export default App;
