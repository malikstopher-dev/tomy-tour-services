import { useState, useRef, useEffect } from 'react'
import { waURL } from '../data/contacts'
import { useLanguage } from '../context/LanguageContext'

const WHATSAPP_URL = waURL('243896969575', 'I need assistance with visa and travel services.')

export default function Navbar({ scrolled }) {
  const { t, lang, setLang, langs } = useLanguage()
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const navLinks = [
    { href: '#services', label: t('nav.services') },
    { href: '#visa', label: t('nav.destinations') },
    { href: '#how-it-works', label: t('nav.howItWorks') },
    { href: '#why-us', label: t('nav.whyUs') },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <img
            src="/assets/tomy-new-logo.jpg"
            alt="TOMY Global Services"
            className="navbar-logo-img"
          />
          <div className="navbar-logo-text">
            <span className="navbar-logo-main">TOMY</span>
            <span className="navbar-logo-sub">{t('brand.sub')}</span>
          </div>
        </a>

        <ul className={`navbar-links${open ? ' open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="lang-dropdown-wrap" ref={langRef}>
            <button
              className="lang-toggle"
              onClick={() => setLangOpen(!langOpen)}
              aria-label={t('nav.selectLanguage')}
            >
              {langs.find((l) => l.code === lang)?.flag} {langs.find((l) => l.code === lang)?.label}
              <span className="lang-arrow">{langOpen ? '▲' : '▼'}</span>
            </button>
            {langOpen && (
              <div className="lang-menu">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    className={`lang-option${l.code === lang ? ' active' : ''}`}
                    onClick={() => { setLang(l.code); setLangOpen(false); setOpen(false) }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </li>
          <li>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-whatsapp"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('nav.whatsapp')}
            </a>
          </li>
        </ul>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={t('nav.toggleMenu')}
        >
          <span style={open ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}}></span>
          <span style={open ? { opacity: 0 } : {}}></span>
          <span style={open ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}}></span>
        </button>
      </div>
    </nav>
  )
}
