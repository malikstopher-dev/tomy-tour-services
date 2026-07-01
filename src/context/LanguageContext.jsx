import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import ptStrings from '../locales/pt-AO.json'
import frStrings from '../locales/fr.json'
import enStrings from '../locales/en.json'

const STORAGE_KEY = 'tomy-language'

const STRING_MAP = {
  pt: ptStrings,
  fr: frStrings,
  en: enStrings,
}

const LanguageContext = createContext(null)

function deepGet(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'pt' } catch { return 'pt' }
  })

  const strings = STRING_MAP[lang] || ptStrings

  const setLang = useCallback((l) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch {}
    document.documentElement.lang = l === 'pt' ? 'pt' : l
  }, [])

  const t = useCallback((path, defaultValue = '') => {
    const val = deepGet(strings, path)
    return val !== undefined ? val : defaultValue
  }, [strings])

  const langs = [
    { code: 'pt', label: strings?.languages?.pt || 'Português', flag: '🇦🇴' },
    { code: 'fr', label: strings?.languages?.fr || 'Français', flag: '🇫🇷' },
    { code: 'en', label: strings?.languages?.en || 'English', flag: '🇬🇧' },
  ]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, strings, langs }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
