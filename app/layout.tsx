import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr'
})

export const metadata: Metadata = {
  title: '237 Pizza - 엣지는 없다, 토핑만 있다',
  description: '237피자(237 Pizza)의 공식 웹사이트입니다. 신선한 재료로 만든 맛있는 피자를 만나보세요.',
  openGraph: {
    title: '237 Pizza',
    description: '언제나 맛있는 237피자',
    images: '/og-image.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#e12800',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${notoSansKR.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 