import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const ICONS = ['👔', '🤝', '🌐', '🕐']
const IMAGES = [
  '/assets/07_TOMY_Global_Executive_Mobility.jpg',
  '/assets/08_TOMY_White_Glove_Service.jpg',
  '/assets/09_TOMY_Strategic_Partnership_Network.jpg',
  '/assets/10_TOMY_24_7_Concierge_Support.jpg',
]

const MOBILE_IMAGES = [
  '/07_TOMY_Mobile_Global_Executive_Mobility.jpg',
  '/08_TOMY_Mobile_White_Glove_Service.jpg',
  '/09_TOMY_Mobile_Strategic_Partnership.jpg',
  '/10_TOMY_Mobile_24_7_Concierge.jpg',
]

function Row({ item, i, icon }) {
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
            <img src={item.img} alt={item.title} loading="lazy" />
          </picture>
          <div className="service-veil" />
        </div>
        <div className="service-split-content reveal">
          <span className="service-icon">{icon}</span>
          <h3>{item.title}</h3>
          <p className="desc-text">{item.desc}</p>
          <button className="read-more-btn" onClick={() => setShowModal(true)}>Read more</button>
        </div>
      </div>

      {showModal && (
        <div className="read-more-overlay" onClick={() => setShowModal(false)}>
          <div className="read-more-modal" onClick={e => e.stopPropagation()}>
            <button className="read-more-close" onClick={() => setShowModal(false)} aria-label="Close">&times;</button>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default function PremiumServices() {
  const { t } = useLanguage()
  const items = []
  for (let i = 0; i < 4; i++) {
    const p = t(`premium.${i}`)
    if (typeof p === 'object') {
      items.push({
        title: p.title || '',
        desc: p.desc || '',
        img: IMAGES[i],
      })
    }
  }

  return (
    <div id="premium-mobility">
      {items.map((item, i) => (
        <Row key={i} item={item} i={i} icon={ICONS[i]} />
      ))}
    </div>
  )
}
