import { useLanguage } from '../context/LanguageContext'

export default function SectionDivider({ labelKey }) {
  const { t } = useLanguage()
  return (
    <div className="section-divider-block">
      <div className="sd-line" />
      <div className="sd-diamond" />
      <span className="sd-label">{t(labelKey)}</span>
      <div className="sd-diamond" />
      <div className="sd-line" />
    </div>
  )
}
