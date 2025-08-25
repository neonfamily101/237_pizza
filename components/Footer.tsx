'use client'

import { motion } from 'framer-motion'
import { Twitter, Instagram, Facebook } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const socialLinks = [
    // { icon: <Twitter />, href: '#' },
    { icon: <Instagram />, href: 'https://www.instagram.com/youngshin5388/' },
    // { icon: <Facebook />, href: '#' },
  ]

  return (
    <footer className="bg-[#FBEFDD] text-[#9A3434] py-12">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Link href="/" className="text-4xl font-extrabold text-[#9A3434] mb-6 inline-block">
            237 PIZZA
          </Link>
          <div className='flex justify-center space-x-6 mb-8'>
            <p className='text-center text-gray-500 text-lg font-sm mb-4'>CEO 최영신(崔永信, Choi young shin)</p>
            <p className='text-center text-gray-500 text-lg font-sm mb-4'>* 영업일 기준 영업시간 10:30 ~ 22:00</p>
            <p className='text-center text-gray-500 text-lg font-sm mb-4'>전화: 02)797~2377, 010)2311~1958</p>
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

export default Footer