import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const ICONS = ['✈️', '🛩️', '🏨', '🛡️', '🌍', '💎']

function ServiceRow({ s, i, icon }) {
  const ref = useRef(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setShowModal(false) }
    if (showModal) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [showModal])

  return (
    <>
      <div className={`service-split${i % 2 === 0 ? '' : ' reverse'}`} ref={ref}>
        <div className="service-split-image">
          <picture>
            <source media="(max-width: 768px)" srcSet={MOBILE_IMAGES[i]} />
            <img src={s.img} alt={s.title} loading="lazy" />
          </picture>
          <div className="service-veil" />
        </div>
        <div className="service-split-content reveal">
          <span className="service-icon">{icon}</span>
          <h3>{s.title}</h3>
          <p className="desc-text">{s.desc}</p>
          <button className="read-more-btn" onClick={() => setShowModal(true)}>Read more</button>
        </div>
      </div>

      {showModal && (
        <div className="read-more-overlay" onClick={() => setShowModal(false)}>
          <div className="read-more-modal" onClick={e => e.stopPropagation()}>
            <button className="read-more-close" onClick={() => setShowModal(false)} aria-label="Close">&times;</button>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </div>
      )}
    </>
  )
}

const IMAGES = [
  '/assets/01_TOMY_International_Visa_Assistance.jpg',
  '/assets/02_TOMY_Premium_Flight_Bookings.jpg',
  '/assets/03_TOMY_Curated_Hotel_Reservations.jpg',
  '/assets/04_TOMY_Comprehensive_Travel_Insurance.jpg',
  '/assets/05_TOMY_Bespoke_International_Tours.jpg',
  '/assets/06_TOMY_Strategic_Travel_Consultation.jpg',
]

const MOBILE_IMAGES = [
  '/01_TOMY_Mobile_Visa_Assistance.jpg',
  '/02_TOMY_Mobile_Premium_Flight_Bookings.jpg',
  '/03_TOMY_Mobile_Hotel_Reservations.jpg',
  '/04_TOMY_Mobile_Travel_Insurance.jpg',
  '/05_TOMY_Mobile_Bespoke_International_Tours.jpg',
  '/06_TOMY_Mobile_Strategic_Travel_Consultation.jpg',
]

export default function ServicesSplit() {
  const { t } = useLanguage()
  const services = []
  for (let i = 0; i < 6; i++) {
    const s = t(`services.${i}`)
    if (typeof s === 'object') {
      services.push({
        title: s.title || '',
        desc: s.desc || '',
        img: IMAGES[i],
      })
    }
  }

  return (
    <div id="services">
      {services.map((s, i) => (
        <ServiceRow key={i} s={s} i={i} icon={ICONS[i]} />
      ))}
    </div>
  )
}
