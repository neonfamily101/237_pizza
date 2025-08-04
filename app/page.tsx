'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SelfBaking from '@/components/SelfBaking'
import MenuShowcase from '@/components/MenuShowcase'
import Statistics from '@/components/Statistics'
import NewStores from '@/components/NewStores'
import News from '@/components/News'
import StoreLocations from '@/components/StoreLocations'
import Footer from '@/components/Footer'
import VideoSection from '@/components/videoSection'
import Gluten from '@/components/Glueten'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <SelfBaking />
      <MenuShowcase />
      <Gluten />
      <Statistics />
      <NewStores />
      <News />
      <StoreLocations />
      <Footer />
    </main>
  )
} 