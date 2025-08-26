'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const socialLinks = [
    { icon: <Instagram />, href: 'https://www.instagram.com/youngshin5388/' },
  ]

  const storeInfo = [
    { label: 'CEO', value: '최영신 (崔永信, Choi young shin)' },
    { label: '영업시간', value: '* 영업일 기준 10:30 ~ 22:00' },
    { label: '전화', value: '02-797-2377 / 010-2311-1958' },
  ]

  return (
    // {/** 1. 상하 여백을 반응형으로 조절 (모바일: py-8, 데스크톱: py-12) */}
    <footer className="bg-[#FBEFDD] text-[#9A3434] py-8 md:py-12">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* 2. 로고 폰트 크기를 반응형으로 조절 */}
          <Link href="/" className="text-3xl sm:text-4xl font-extrabold text-[#9A3434] mb-6 inline-block">
            237 PIZZA
          </Link>

          {/* 3. 가게 정보 레이아웃을 반응형으로 대폭 수정 */}
          <div className="flex flex-col items-center md:flex-row md:justify-center gap-2 md:gap-6 mb-8 text-gray-600 text-sm">
            {storeInfo.map((info, index) => (
              // React.Fragment를 사용하여 각 아이템을 그룹화
              <React.Fragment key={info.label}>
                <p>
                  {/* 데스크톱에서는 레이블을 숨겨 심플하게 표시 */}
                  <span className="md:hidden font-semibold">{info.label}: </span>
                  {info.value}
                </p>
                {/* 마지막 아이템이 아닐 경우, 데스크톱에서만 구분선 표시 */}
                {index < storeInfo.length - 1 && (
                  <span className="hidden md:inline text-gray-400">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9A3434] hover:text-red-700 transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-[#9A3434]/80 text-sm">
            &copy; {new Date().getFullYear()} 237 PIZZA. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

// React.Fragment를 사용하기 위해 import
import React from 'react'

export default Footer