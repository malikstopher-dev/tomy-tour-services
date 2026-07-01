export const EMAIL = 'tomynickens76@gmail.com'

export const countries = [
  { key: 'rdc', label: 'RDC / Kinshasa', number: '243896969575', flag: '🇨🇩', display: '+243 896 969 575' },
  { key: 'angola', label: 'Angola / Luanda', number: '244951282680', flag: '🇦🇴', display: '+244 951 282 680' },
  { key: 'southAfrica', label: 'Afrique du Sud', number: '277299988863', flag: '🇿🇦', display: '+27 729 998 8863' },
  { key: 'portugal', label: 'Portugal', number: null, flag: '🇵🇹', display: null },
  { key: 'brazil', label: 'Brésil', number: null, flag: '🇧🇷', display: null },
  { key: 'kenya', label: 'Kenya', number: null, flag: '🇰🇪', display: null },
  { key: 'canada', label: 'Canada', number: null, flag: '🇨🇦', display: null },
]

export const PRIMARY = countries[0]

export function waURL(number, text = '') {
  const msg = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://wa.me/${number}${msg}`
}

export const DEFAULT_MSG = 'Hello TOMY Travel & Tour, I need visa and travel assistance.'
