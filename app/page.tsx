'use client'

import Hero from '@/components/Hero'
import Good_point from '@/components/Good_point'
import News from '@/components/News'
import Menu from '@/components/new/Menu'
import ArchScroller from '@/components/new/ArchScrollAnimator'
import Market from '@/components/new/Market'
import MakingProcess from '@/components/new/MakingProcess'
import CoreValues from '@/components/new/CoreValues'
import Testimonials from '@/components/new/Testimonials'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBEFDD]">
      <Hero />
      <Good_point/>
      <MakingProcess />
      <News />
      <CoreValues />
      <Market/>
      <ArchScroller/>
      <Menu/>
      <Testimonials />
    </main>
  )
} 