import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const services = []
  for (let i = 0; i < 4; i++) {
    const s = t(`footer.services.${i}`)
    if (s) services.push(s)
  }

  const links = []
  for (let i = 0; i < 3; i++) {
    const l = t(`footer.quickLinks.${i}`)
    if (l) links.push(l)
  }

  const LINK_HASHES = ['#how-it-works', '#why-us', '#contact']

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="f-col">
          <div className="brand">TOMY</div>
          <span className="brand-sub">{t('footer.brandSub')}</span>
          <p>{t('footer.description')}</p>
        </div>
        <div className="f-col">
          <h4>{t('footer.servicesHeading')}</h4>
          <ul>
            {services.map((s, i) => (
              <li key={i}><a href="#services">{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="f-col">
          <h4>{t('footer.quickLinksHeading')}</h4>
          <ul>
            {links.map((l, i) => (
              <li key={i}><a href={LINK_HASHES[i]}>{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bot">
        &copy; {new Date().getFullYear()} TOMY GLOBAL SERVICES. {t('footer.copyright')}
        <div className="footer-credit">Website by <a href="https://stopher-malik.co.za" target="_blank" rel="noopener noreferrer">Stopher Malik</a> &amp; <a href="https://smk.stopher-malik.co.za" target="_blank" rel="noopener noreferrer">SMK Web Design</a></div>
        <div style={{ marginTop: '8px' }}><a href="https://tomy-global-services.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#C9A96E', textDecoration: 'none', fontSize: '0.85rem' }}>{t('footer.backToMain')}</a></div>
      </div>
    </footer>
  )
}
