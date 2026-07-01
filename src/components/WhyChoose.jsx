import { useLanguage } from '../context/LanguageContext'

export default function WhyChoose() {
  const { t } = useLanguage()

  const stats = []
  for (let i = 0; i < 4; i++) {
    const s = t(`whyChoose.stats.${i}`)
    if (typeof s === 'object') {
      stats.push({ number: s.number || '', label: s.label || '' })
    }
  }

  const reasons = []
  for (let i = 0; i < 4; i++) {
    const r = t(`whyChoose.reasons.${i}`)
    if (typeof r === 'object') {
      reasons.push({ title: r.title || '', text: r.text || '' })
    }
  }

  const REASON_ICONS = ['🌍', '🤝', '⚡', '🏢']

  return (
    <div id="why-us">
      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-cell" key={s.label}>
                <div className="num">{s.number}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="trust-pillars">
        <div className="container">
          <div className="trust-header">
            <div className="label">{t('whyChoose.label')}</div>
            <h2>{t('whyChoose.heading')}</h2>
            <p>{t('whyChoose.subtitle')}</p>
          </div>
          <div className="trust-grid">
            {reasons.map((r, i) => (
              <div className="trust-card" key={i}>
                <span className="icon">{REASON_ICONS[i]}</span>
                <h4>{r.title}</h4>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
