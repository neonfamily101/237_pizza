import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr'
})

export const metadata: Metadata = {
  title: '237 Pizza - The Art of Pizza',
  description: 'Welcome to the official website of 237 Pizza. Discover the authentic taste of Naples with our 100% gluten-free pizzas.',
  openGraph: {
    title: '237 Pizza',
    description: 'The Art of Pizza',
    images: '/og-image.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#9A3434',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={notoSansKR.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${notoSansKR.className} antialiased bg-[#FBEFDD]`}>
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  )
} 