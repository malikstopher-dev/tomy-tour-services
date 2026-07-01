import { useState, useEffect, useRef, useCallback } from 'react'
import { PRIMARY } from '../data/contacts'
import { useLanguage } from '../context/LanguageContext'

const BASE_URL = `https://wa.me/${PRIMARY.number}`

const FLAGS = ['🇧🇷', '🇵🇹', '🇨🇦', '🇪🇺', '🇬🇧', '🇨🇭']
const IMAGES = [
  'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1600&q=80',
  'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=80',
  'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1600&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80',
  'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1600&q=80',
  'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1600&q=80',
]

export default function VisaServices() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const sectionRef = useRef(null)

  const dests = []
  for (let i = 0; i < 6; i++) {
    const d = t(`destinations.${i}`)
    if (typeof d === 'object') {
      dests.push({
        name: d.name || '',
        desc: d.desc || '',
        cta: d.cta || '',
        flag: FLAGS[i],
        img: IMAGES[i],
        url: `${BASE_URL}?text=${encodeURIComponent(`Hello TOMY Travel & Tour, I need assistance with a ${d.name || ''} visa.`)}`,
      })
    }
  }

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % dests.length)
  }, [dests.length])

  const goTo = (i) => setActive(i)

  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(next, 2600)
    return () => clearInterval(timerRef.current)
  }, [paused, next, dests.length])

  return (
    <div
      id="visa"
      className="dest-carousel"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="dest-carousel-track">
        {dests.map((d, i) => (
          <div
            key={d.name + i}
            className={`dest-slide${i === active ? ' active' : ''}`}
          >
            <img src={d.img} alt={d.name} />
            <div className="dest-darken" />
            <div className="dest-slide-content">
              <span className="dest-flag">{d.flag}</span>
              <h2 className="dest-name">{d.name}</h2>
              <p className="dest-desc">{d.desc}</p>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                {d.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="dest-dots">
        {dests.map((_, i) => (
          <button
            key={i}
            className={`dest-dot${i === active ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`${t('visaDotAria')} ${dests[i]?.name || ''}`}
          />
        ))}
      </div>
    </div>
  )
}
