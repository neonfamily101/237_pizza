'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  const companyInfo = {
    name: '237피자',
    address: '서울특별시 강남구 이태원로 237',
    phone: '1588-1234',
    email: 'info@237pizza.co.kr',
    businessHours: '평일 09:00 - 18:00',
    businessNumber: '123-45-67890',
    ceo: '237피자'
  }

  const menuLinks = [
    {
      title: '메뉴',
      links: [
        { name: '피자', href: '/menu/pizza' },
        { name: '사이드', href: '/menu/side' },
        { name: '음료', href: '/menu/drink' },
        { name: '세트메뉴', href: '/menu/set' }
      ]
    },
    {
      title: '매장',
      links: [
        { name: '매장찾기', href: '/store' },
        { name: '신규매장', href: '/store/new' },
        { name: '가맹문의', href: '/franchise' },
        { name: '창업안내', href: '/franchise/guide' }
      ]
    },
    {
      title: '고객센터',
      links: [
        { name: '공지사항', href: '/notice' },
        { name: '이벤트', href: '/event' },
        { name: '문의하기', href: '/contact' },
        { name: 'FAQ', href: '/faq' }
      ]
    },
    {
      title: '회사소개',
      links: [
        { name: '브랜드 스토리', href: '/about' },
        { name: '채용정보', href: '/career' },
        { name: '투자정보', href: '/investor' },
        { name: '지속가능경영', href: '/sustainability' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Youtube', icon: Youtube, href: '#' }
  ]

  return (
    <footer className="bg-dark-red text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold font-gmarket mb-6 text-white">
              {companyInfo.name}
            </h3>
            
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-white" />
                <span>{companyInfo.address}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-white" />
                <span>{companyInfo.phone}</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-white" />
                <span>{companyInfo.email}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-3 text-white" />
                <span>{companyInfo.businessHours}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Menu Links */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {menuLinks.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-bold font-gmarket mb-4 text-white">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <motion.a
                          href={link.href}
                          whileHover={{ x: 5 }}
                          className="text-white/80 hover:text-white transition-colors duration-300 text-sm"
                        >
                          {link.name}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-white/20 py-12"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold font-gmarket mb-2">
                237피자 뉴스레터 구독
              </h4>
              <p className="text-white/80 text-sm">
                최신 이벤트와 신메뉴 소식을 가장 먼저 받아보세요
              </p>
            </div>
            
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors duration-300 w-80"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-dark-red px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors duration-300 whitespace-nowrap"
              >
                구독하기
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span>
                사업자등록번호: {companyInfo.businessNumber} | 대표: {companyInfo.ceo}
              </span>
              <div className="flex gap-4">
                <a href="/privacy" className="hover:text-white transition-colors duration-300">
                  개인정보처리방침
                </a>
                <a href="/terms" className="hover:text-white transition-colors duration-300">
                  이용약관
                </a>
              </div>
            </div>
            
            <p>
              © 2024 237Pizza. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 