import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const ICONS = ['👔', '🤝', '🌐', '🕐']
const IMAGES = [
  '/assets/07_TOMY_Global_Executive_Mobility.jpg',
  '/assets/08_TOMY_White_Glove_Service.jpg',
  '/assets/09_TOMY_Strategic_Partnership_Network.jpg',
  '/assets/10_TOMY_24_7_Concierge_Support.jpg',
]

function Row({ item, i, icon }) {
  const ref = useRef(null)

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

  return (
    <div className={`service-split${i % 2 === 0 ? '' : ' reverse'}`} ref={ref}>
      <div className="service-split-image">
        <img src={item.img} alt={item.title} loading="lazy" />
        <div className="service-veil" />
      </div>
      <div className="service-split-content reveal">
        <span className="service-icon">{icon}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </div>
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
