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
      </div>
    </div>
  )
}
