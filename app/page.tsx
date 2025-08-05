'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SelfBaking from '@/components/SelfBaking'
import MenuShowcase from '@/components/MenuShowcase'
import NewStores from '@/components/NewStores'
import News from '@/components/News'
import StoreLocations from '@/components/StoreLocations'
import VideoSection from '@/components/videoSection'
import Gluten from '@/components/Glueten'
import MarketOpportunity from '@/components/Footer'
import Menu from '@/components/menu'
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <Hero />
      <SelfBaking />
      {/* <MenuShowcase /> */}
      {/* <Gluten /> */}
      {/* <NewStores /> */}
      <News />
      <Menu/>
      <StoreLocations />
      <MarketOpportunity />
    </main>
  )
} 