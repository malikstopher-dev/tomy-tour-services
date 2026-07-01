import { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesSplit from './components/ServicesSplit'
import VisaServices from './components/VisaServices'
import PremiumServices from './components/PremiumServices'
import HowItWorks from './components/HowItWorks'
import WhyChoose from './components/WhyChoose'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StickyWhatsApp from './components/StickyWhatsApp'
import SectionDivider from './components/SectionDivider'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <LanguageProvider>
      <Navbar scrolled={scrolled} />
      <Hero />
      <SectionDivider labelKey="section.services" />
      <ServicesSplit />
      <SectionDivider labelKey="section.destinations" />
      <VisaServices />
      <SectionDivider labelKey="section.premiumMobility" />
      <PremiumServices />
      <SectionDivider labelKey="section.journey" />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <Contact />
      <Footer />
      <StickyWhatsApp />
    </LanguageProvider>
  )
}
