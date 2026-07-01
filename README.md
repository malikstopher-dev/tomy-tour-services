# TOMY Travel & Tour

A premium multilingual lead generation website for TOMY GLOBAL SERVICES, a visa and international travel agency serving clients across Africa, Europe, and the Americas.

**Live languages:** Português (Angola) — Français — English

---

## Tech Stack

- **Framework:** [Vite](https://vitejs.dev/) 5 + [React](https://react.dev/) 18
- **Language:** JavaScript (JSX)
- **Styling:** Pure CSS with custom properties, no framework
- **Fonts:** Inter (sans), Playfair Display (serif), Cormorant Garamond (serif alt)
- **Internationalisation:** Custom React Context with static JSON locale files (pt-AO, fr, en)
- **State persistence:** localStorage for language preference

## Features

- 6-video hero crossfade with 2-slot preload pattern
- Auto-rotating destination carousel (6 countries, 2600 ms interval)
- Alternating photo/text split rows for services
- Full-bleed editorial design with gold accent system
- Country-specific WhatsApp contact selector (3 active numbers)
- Fully responsive across mobile, tablet, and desktop
- Scroll-triggered reveal animations
- Sticky WhatsApp CTA on mobile

## Project Structure

```
tomy-global-services/
├── index.html                  # Entry HTML with SEO meta + hreflang
├── vite.config.js
├── package.json
├── .gitignore
├── public/
│   └── assets/                 # Static assets (videos, images, logo)
│       ├── 1st.mp4 – 6th.mp4  # Hero background videos
│       ├── 01_TOMY_*.jpg      # 15 custom brand images
│       └── tomy-new-logo.jpg
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component, section layout
    ├── index.css               # All styles (982 lines, 4 breakpoints)
    ├── context/
    │   └── LanguageContext.jsx # i18n provider + localStorage
    ├── components/
    │   ├── Navbar.jsx          # Fixed nav + language selector
    │   ├── Hero.jsx            # 6-video crossfade
    │   ├── ServicesSplit.jsx   # 6 service rows
    │   ├── VisaServices.jsx    # Destination carousel
    │   ├── PremiumServices.jsx # 4 premium rows
    │   ├── HowItWorks.jsx      # 4-step journey + CTA banner
    │   ├── WhyChoose.jsx       # Stats + trust pillars
    │   ├── Testimonials.jsx    # 3-column review cards
    │   ├── Contact.jsx         # Country selector + WhatsApp
    │   ├── Footer.jsx
    │   ├── SectionDivider.jsx  # Reusable gold divider
    │   └── StickyWhatsApp.jsx  # Mobile sticky CTA
    ├── data/
    │   └── contacts.js         # Phone numbers, WA URLs
    └── locales/
        ├── pt-AO.json          # Angolan Portuguese (default)
        ├── fr.json             # French
        └── en.json             # English
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement.

## Build

```bash
npm run build
```

Outputs to `dist/`. CSS is purged and minified by Vite.

## Preview Production Build

```bash
npm run preview
```

Serves the `dist/` folder locally for final QA.

## Deployment

The project is a static SPA. Deploy `dist/` to any static host:

- **Vercel:** Connect repo, framework preset = Vite, output dir = `dist`
- **Netlify:** Publish directory = `dist`, build command = `npm run build`
- **GitHub Pages:** Use `vite.config.js` with `base: '/<repo-name>/'` then deploy `dist/` to `gh-pages` branch

No server-side rendering or API keys are required for the static site.

## Language System

- Default language is **Português (Angola)**
- Language is persisted in `localStorage` under key `tomy-language`
- Switching languages updates all visible text without page reload
- All strings live in `/src/locales/*.json` — no hardcoded text in components
- The HTML `lang` attribute updates dynamically
- hreflang tags are set in `index.html` for SEO

## Image Assets

All 15 brand images are custom-generated (Grok Imagine) and stored in `public/assets/`. The site has zero Unsplash dependencies. Image inventory:

| Section | Count | Files |
|---------|-------|-------|
| Services | 6 | `01` – `06` |
| Premium Mobility | 4 | `07` – `10` |
| Contact | 1 | `11` |
| How It Works | 4 | `01_TOMY_Visa_Journey_Step_01` – `04` |

---

Built for TOMY GLOBAL SERVICES.
