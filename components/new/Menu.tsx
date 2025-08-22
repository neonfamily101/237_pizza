import { useEffect, useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pizzaItems, saladItems, wineItems, type BasicMenuItem } from '../../data/menuItems';

// Types and Interfaces
// 분리된 데이터(`data/menuItems.ts`)를 사용하므로 이 파일에서 별도의 아이템 타입 정의/하드코딩은 하지 않습니다.

interface MenuCardProps {
  name: string;
  description: string;
  weight: string;
  price: string;
  imageUrl: string;
  isNew?: boolean;
  isPopular?: boolean;
  onClick?: () => void;
}

// Utility Functions - Menu images mapping
const getMenuImage = (itemId: string): string => {
  // 각 메뉴 아이템에 맞는 피자 이미지 매핑
  const imageMapping: { [key: string]: string } = {
    'marinara_originale': '/images/menu/1.marinara_originale.png',
    'margherita_classica': '/images/menu/2.margherita_classica.png',
    'margherita_doppio_bufala': '/images/menu/3.margherita_doppio_bufala.png',
    'pesto_royale_bufala': '/images/menu/4.pesto_royale_bufala.png',
    'prosciutto&gorgonzola': '/images/menu/5.prosciutto&gorgonzola.png',
    'spinach': '/images/menu/6.spinach.png',
    'gorgonzola': '/images/menu/7.gorgonzola.png',
    'mascarpone&rucola': '/images/menu/8.mascarpone&rucola.png',
    'spinach&artichoke': '/images/menu/9.spinach&artichoke.png',
    'tomato&mascarpone': '/images/menu/10.tomato&mascarpone.png',
    'olive': '/images/menu/11.olive.png',
    'caprese': '/images/menu/12.caprese.png',
    'quattro_stagioni': '/images/menu/13.quattro_stagioni.png',
    'diavola': '/images/menu/14.diavola.png',
    'quattro_formaggi': '/images/menu/15.quattro_formaggi.png',
    'prosciutto_rucola': '/images/menu/16.prosciutto_rucola.png',
    'spicy_hell_gate': '/images/menu/17.spicy_hell_gate.png',
    'whole_porcini': '/images/menu/18.whole_porcini.png',
    'truffle_quattro_funghi': '/images/menu/19.truffle_quattro_funghi.png',
    'artichokes': '/images/menu/20.artichokes.png',
    'capriciosa': '/images/menu/21.capriciosa.png',
    'calzoni': '/images/menu/calzoni.png',
    'salad': '/images/menu/salad.png'
  };
  
  // 매핑된 이미지가 있으면 사용, 없으면 기본 피자 이미지 사용
  return imageMapping[itemId] || '/images/menu/pizza.01.svg';
};

// MenuCard Component
function MenuCard({ 
  name, 
  description, 
  weight, 
  price, 
  imageUrl, 
  isNew = false,
  onClick
}: MenuCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      ref={cardRef}
      className="relative bg-white rounded-2xl p-6 lg:p-10 cursor-pointer overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Radial Fill Background following mouse position */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #f5e6d3 0%, #f5e6d3 40%, transparent 70%)`,
          borderRadius: '1rem'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        {/* NEW Badge */}
        {isNew && (
          <div className="absolute top-0 right-0 w-12 h-12 z-20 lg:w-14 lg:h-14 border-2 border-red-600 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-xs lg:text-sm font-medium">NEW</span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative mb-6 lg:mb-10 flex justify-center">
          <div className="w-32 h-32 lg:w-48 lg:h-48 flex items-center justify-center">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-contain transition-transform duration-300 scale-150"
            />
          </div>
          
          {/* Delicious Emoji Animation */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-600 ease-out ${
              isHovered ? 'opacity-100 translate-y-0 scale-110' : 'opacity-0 translate-y-6 scale-75'
            }`}
          >
            <div className="text-5xl transform transition-transform duration-300">
              😋
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2 lg:space-y-4">
          <h3 className="text-red-700 font-bold text-sm lg:text-base tracking-wide uppercase">
            {name}
          </h3>
          <p className="text-gray-600 text-xs lg:text-sm overflow-hidden line-clamp-3">
            {description}
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-red-700 font-bold text-lg lg:text-xl">
                {price}
              </p>
            </div>
            {/* <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-700 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white lg:w-5 lg:h-5"
              >
                <path 
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="currentColor"
                />
              </svg>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// AllFlavorsButton Component
function AllFlavorsButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    console.log('All Flavors button clicked!');
    // 여기에 버튼 클릭 시 실행할 로직을 추가할 수 있습니다
  };

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-48 h-48 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95 transition-transform duration-300"
      >
        {/* Rotating Background Container */}
        <div className="absolute inset-0 animate-spin-slow">
          {/* Button Background Image */}
          <div className="relative w-full h-full">
            <img
              src="/image/pizza_button.svg"
              alt=""
              className="w-full h-full object-contain"
            />
            
            {/* Red Fill Animation - Bottom to Top */}
            <div 
              className={`absolute inset-0 overflow-hidden transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`absolute inset-0 bg-red-600 transition-transform duration-700 ease-out ${
                  isHovered ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{
                  maskImage: 'url(/image/pizza_button.svg)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url(/image/pizza_button.svg)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Fixed Text - Not Rotating - Absolute Center */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <span 
            className={`font-bold text-sm tracking-wider uppercase transition-colors duration-300 text-center ${
              isHovered ? 'text-white' : 'text-red-600'
            }`}
          >
            ALL FLAVORS
          </span>
        </div>
      </button>
    </div>
  );
}

// Main FLAVORS Component
export default function FLAVORS() {
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [filter, setFilter] = useState<'ALL' | 'PIZZA' | 'SALAD' | 'WINE'>('ALL');
  const [selectedItem, setSelectedItem] = useState<BasicMenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [initialCount, setInitialCount] = useState<number>(8);

  const allItems: BasicMenuItem[] = [...pizzaItems, ...saladItems, ...wineItems];

  const getFilteredItems = (): BasicMenuItem[] => {
    if (filter === 'ALL') return allItems;
    if (filter === 'PIZZA') return pizzaItems;
    if (filter === 'SALAD') return saladItems;
    return wineItems; // WINE
  };

  useEffect(() => {
    const imageMap: { [key: string]: string } = {};
    allItems.forEach((item) => {
      imageMap[item.id] = getMenuImage(item.id);
    });
    setImages(imageMap);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w >= 1024) setInitialCount(8);
    else if (w >= 768) setInitialCount(6);
    else setInitialCount(5);
  }, []);

  useEffect(() => {
    setShowAll(false);
  }, [filter]);

  const openModal = (item: BasicMenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5e6d3' }}>
      <div className="container mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-7xl font-bold text-red-700 tracking-wider">
            MENU
          </h1>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {(['ALL', 'PIZZA', 'SALAD', 'WINE'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border transition-colors duration-200 uppercase text-sm tracking-wide ${
                filter === cat
                  ? 'bg-red-700 text-white border-red-700'
                  : 'border-red-700 text-red-700 hover:bg-red-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {(showAll ? getFilteredItems() : getFilteredItems().slice(0, initialCount)).map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <MenuCard
                  name={item.name}
                  description={item.description}
                  weight={item.weight}
                  price={item.price}
                  imageUrl={images[item.id] || '/images/menu/pizza.01.svg'}
                  isNew={item.isNew}
                  onClick={() => openModal(item)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Collapse - all devices */}
        <div className="mt-6 flex justify-center">
          {getFilteredItems().length > initialCount && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="px-5 py-2 rounded-full border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-colors duration-200"
            >
              {showAll ? '접기' : '더보기'}
            </button>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 20, scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 20, scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800 transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Image */}
                <div className="w-full bg-[#f5e6d3] flex items-center justify-center p-6">
                  <img
                    src={images[selectedItem.id] || '/images/menu/pizza.01.svg'}
                    alt={selectedItem.name}
                    className="w-70 h-70 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-bold text-red-700 uppercase tracking-wide">{selectedItem.name}</h2>
                    {selectedItem.isNew && (
                      <span className="shrink-0 inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-red-700 border border-red-700 rounded-full">NEW</span>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedItem.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    {/* <span className="text-sm text-gray-500">{selectedItem.weight}</span> */}
                    <span className="text-xl font-bold text-red-700">{selectedItem.price}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Flavors Button */}
        {/* <AllFlavorsButton /> */}
      </div>
    </div>
  );
}