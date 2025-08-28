'use client'

import Hero from '@/components/Hero'
import Good_point from '@/components/Good_point'
import News from '@/components/News'
import Menu from '@/components/Menu'
import ArchScroller from '@/components/ArchScrollAnimator'
import Market from '@/components/Market'
import MakingProcess from '@/components/MakingProcess'
import CoreValues from '@/components/three_image'
import Testimonials from '@/components/Testimonials'
import YtImage from '@/components/yt_image'
export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBEFDD]">
      <Hero />
      <YtImage />
      <Good_point/>
      <MakingProcess />
      <News />
      <Menu/>
      <CoreValues />
      <Market/>
      <Testimonials />
    </main>
  )
} 