import { useEffect, useRef, useState } from 'react'
import { EMAIL, countries, waURL, DEFAULT_MSG } from '../data/contacts'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const [selected, setSelected] = useState(countries[0])

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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const url = selected.number ? waURL(selected.number, DEFAULT_MSG) : '#'

  const countryName = (c) => t(`contact.countries.${c.key}`, c.label)

  return (
    <div className="contact-spread" id="contact">
      <div className="contact-spread-image">
        <picture>
          <source media="(max-width: 768px)" srcSet="/11_TOMY_Mobile_Lets_Talk_Travel.jpg" />
          <img
            src="/assets/11_TOMY_Lets_Talk_Travel.jpg"
            alt="TOMY office consultation"
            loading="lazy"
          />
        </picture>
        <div className="veil" />
      </div>

      <div className="contact-spread-form reveal" ref={ref}>
        <h3>{t('contact.heading')}</h3>
        <p>{t('contact.text')}</p>

        <div className="country-selector">
          <label>{t('contact.countryLabel')}</label>
          <div className="country-options">
            {countries.map((c) => {
              const isAvail = !!c.number
              return (
                <button
                  key={c.key}
                  className={`country-btn${selected.key === c.key ? ' active' : ''}${!isAvail ? ' disabled' : ''}`}
                  onClick={() => isAvail && setSelected(c)}
                  disabled={!isAvail}
                >
                  <span className="c-flag">{c.flag}</span>
                  <span className="c-name">{countryName(c)}</span>
                  {isAvail && <span className="c-num">{c.display}</span>}
                </button>
              )
            })}
          </div>
        </div>

        <div className="c-item">
          <span className="c-icon">📱</span>
          <span>
            {t('contact.whatsapp')}:{' '}
            <strong>
              {selected.number ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {selected.display} ({countryName(selected)})
                </a>
              ) : (
                `${countryName(selected)} - ${t('contact.comingSoon')}`
              )}
            </strong>
          </span>
        </div>

        <div className="c-item">
          <span className="c-icon">✉️</span>
          <span>{t('contact.email')}: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
        </div>

        <div className="c-item">
          <span className="c-icon">📍</span>
          <span>{t('contact.location')}</span>
        </div>

        <div className="c-item">
          <span className="c-icon">⏰</span>
          <span>{t('contact.response')}</span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp btn-lg"
        >
          <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {selected.number ? `${t('contact.chatCta')} (${countryName(selected)})` : t('contact.comingSoon')}
        </a>
      </div>
    </div>
  )
}
