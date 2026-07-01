import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
]

export default function Testimonials() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const timerRef = useRef(null)

  const reviews = []
  for (let i = 0; i < 5; i++) {
    const r = t(`testimonials.list.${i}`)
    if (typeof r === 'object') {
      reviews.push({
        text: r.text || '',
        name: r.name || '',
        detail: r.detail || '',
        img: AVATARS[i],
      })
    }
  }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % reviews.length)
  }, [reviews.length])

  useEffect(() => {
    if (!isMobile || paused) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(next, 4000)
    return () => clearInterval(timerRef.current)
  }, [isMobile, paused, next])

  return (
    <div className="testimonials-premium">
      <div className="container">
        <div className="testi-header">
          <span className="testi-super">{t('testimonials.super')}</span>
          <h2>{t('testimonials.heading')}</h2>
        </div>

        <div className="testi-grid">
          {reviews.map((r, i) => (
            <div className="testi-premium-card" key={i}>
              <div className="t-accent" />
              <div className="t-body">
                <div className="t-stars">{'★★★★★'}</div>
                <div className="t-quote">{'\u201C'}</div>
                <blockquote>{r.text}</blockquote>
                <div className="t-author">
                  <img src={r.img} alt={r.name} loading="lazy" />
                  <div>
                    <div className="t-name">{r.name}</div>
                    <div className="t-detail">{r.detail}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isMobile && (
          <div
            className="testi-mobile"
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="testi-mobile-card">
              <div className="testi-premium-card active">
                <div className="t-accent" />
                <div className="t-body">
                  <div className="t-stars">{'★★★★★'}</div>
                  <div className="t-quote">{'\u201C'}</div>
                  <blockquote>{reviews[active].text}</blockquote>
                  <div className="t-author">
                    <img src={reviews[active].img} alt={reviews[active].name} loading="lazy" />
                    <div>
                      <div className="t-name">{reviews[active].name}</div>
                      <div className="t-detail">{reviews[active].detail}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="testi-dots">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot${i === active ? ' active' : ''}`}
                  onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 5000) }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
