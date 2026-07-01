import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const IMAGES = [
  '/assets/01_TOMY_Visa_Journey_Step_01.jpg',
  '/assets/02_TOMY_Visa_Journey_Step_02.jpg',
  '/assets/03_TOMY_Visa_Journey_Step_03.jpg',
  '/assets/04_TOMY_Visa_Journey_Step_04.jpg',
]

const MOBILE_IMAGES = [
  '/12_TOMY_Mobile_Visa_Step01_Meet_Consultant.jpg',
  '/13_TOMY_Mobile_Visa_Step02_Prepare_Documents.jpg',
  '/14_TOMY_Mobile_Visa_Step03_Visa_Approved.jpg',
  '/15_TOMY_Mobile_Visa_Step04_Airport_to_Arrival.jpg',
]

function Block({ step, index, img }) {
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
    <div className={`journey-block reveal reveal-d${(index % 3) + 1}`} ref={ref}>
      <div className="journey-block-image">
        <picture>
          <source media="(max-width: 768px)" srcSet={MOBILE_IMAGES[index]} />
          <img src={img} alt={step.title} loading="lazy" />
        </picture>
        <div className="veil" />
      </div>
      <div className="journey-block-content">
        <div className="step-tag">{step.tag}</div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const { t } = useLanguage()
  const stepLabel = t('howItWorks.stepLabel', 'Step')
  const steps = []
  for (let i = 0; i < 4; i++) {
    const s = t(`howItWorks.steps.${i}`)
    if (typeof s === 'object') {
      steps.push({
        tag: `${stepLabel} ${String(i + 1).padStart(2, '0')}`,
        title: s.title || '',
        text: s.text || '',
      })
    }
  }

  return (
    <div id="how-it-works">
      {steps.map((step, i) => (
        <Block key={i} step={step} index={i} img={IMAGES[i]} />
      ))}
      <div className="full-banner">
        <img
          src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1600&q=80"
          alt="Aircraft cabin"
          loading="lazy"
        />
        <div className="overlay" />
        <div className="banner-glass">
          <div className="banner-glass-inner">
            <h3>{t('howItWorks.bannerHeading', 'Ready to begin?')}</h3>
            <p>{t('howItWorks.bannerText', 'Send us a message on WhatsApp and take the first step toward your next journey.')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
