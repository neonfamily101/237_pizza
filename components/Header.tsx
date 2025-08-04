'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // 개별 드롭다운 상태 -> 전체 메뉴 상태로 변경
  const [isScrolled, setIsScrolled] = useState(false)

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    // 드롭다운 열려있을 때 스크롤 방지 (선택 사항)
    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = 'auto';
    }
  }, [isDropdownOpen])


  const navLinks = [
    { name: '브랜드', dropdown: ['자가제빵', '브랜드스토리', '인테리어'] },
    { name: '메뉴', dropdown: ['시그니처메뉴', '메뉴', '매장찾기'] },
    { name: '고객', dropdown: ['공지사항', '이벤트', '자주묻는질문', '고객의소리'] },
    { name: '회사', dropdown: ['회사소개', 'CI/BI', '연혁'] },
    { name: '창업', dropdown: ['창업안내', '창업문의', '온라인상담'] }
  ]

  const megaMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } }
  }

  return (
    // onMouseLeave 이벤트를 header 전체에 걸어 메뉴 영역을 벗어나면 닫히도록 함
    <header 
      onMouseLeave={() => setIsDropdownOpen(false)}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen || isDropdownOpen ? 'bg-red-700 shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white font-gmarket tracking-wide">
            237피자
          </Link>
          
          {/* Desktop Navigation */}
          {/* onMouseEnter 이벤트를 nav 전체에 걸어 메뉴 위에 마우스를 올리면 열리도록 함 */}
          <nav 
            className="hidden lg:flex justify-center items-center flex-1 h-full"
            onMouseEnter={() => setIsDropdownOpen(true)}
          >
            <ul className="flex items-center space-x-10 h-full">
              {navLinks.map((link) => (
                <li key={link.name} className="flex items-center h-full">
                  <span className="flex items-center text-white font-medium cursor-pointer">
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Right-side empty div to balance the logo */}
          <div className="hidden lg:block w-32" /> 
        </div>
      </div>
      
      {/* --- Mega Menu Dropdown --- */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            variants={megaMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // 요청하신 스타일: 어두운 반투명 검정 배경, 흰색 폰트
            className="absolute top-full left-0 w-full bg-black/70 backdrop-blur-md shadow-2xl"
          >
            <div className="container mx-auto px-4 py-12">
              <div className="flex justify-center gap-x-16 lg:gap-x-24">
                {navLinks.map((link) => (
                  <div key={link.name} className="text-left">
                    <h3 className="text-lg font-bold text-white pb-2 mb-4 border-b-2 border-red-600">
                      {link.name}
                    </h3>
                    <ul className="space-y-3">
                      {link.dropdown.map((item) => (
                        <li key={item}>
                          <Link 
                            href="#"
                            className="block text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-red-700"
          >
            <nav>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.name} className="border-t border-white/20">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 text-white font-medium cursor-pointer">
                        {link.name}
                        <ChevronDown className="w-5 h-5 transform group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <div className="bg-black/20">
                        <ul>
                          {link.dropdown.map((item) => (
                            <li key={item} className="border-t border-white/10">
                              <Link
                                href="#"
                                className="block p-4 pl-8 text-white/80 hover:bg-white/20"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
