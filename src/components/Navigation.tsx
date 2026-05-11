import { useState, useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

type LangRow = { native: string; en: string; code: string; flag: string; i18nCode?: string }

const languages: LangRow[] = [
  { native: 'English', en: 'English', code: 'en', flag: '🇺🇸' },
  { native: 'العربية', en: 'Arabic', code: 'ar', flag: '🇸🇦' },
  { native: 'Soomaali', en: 'Somali', code: 'so', flag: '🇸🇴', i18nCode: 'sw' },
  { native: 'دری / پښتو', en: 'Dari / Pashto', code: 'fa', flag: '🇦🇫' },
  { native: 'ትግርኛ', en: 'Tigrinya', code: 'ti', flag: '🇪🇷' },
  { native: 'Français', en: 'French', code: 'fr', flag: '🇫🇷' },
  { native: 'Kurdî', en: 'Kurdish', code: 'ku', flag: '🏴' },
  { native: 'Українська', en: 'Ukrainian', code: 'uk', flag: '🇺🇦' },
  { native: 'Kiswahili', en: 'Swahili', code: 'sw', flag: '🇰🇪' },
  { native: 'አማርኛ', en: 'Amharic', code: 'am', flag: '🇪🇹' },
  { native: 'नेपाली', en: 'Nepali', code: 'ne', flag: '🇳🇵' },
  { native: 'Ikinyarwanda', en: 'Kinyarwanda', code: 'rw', flag: '🇷🇼' },
]

export function Navigation() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [lddOpen, setLddOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedLang = useMemo(() => {
    const base = i18n.language.replace('_', '-').split('-')[0]?.toLowerCase() ?? 'en'
    return languages.find((l) => (l.i18nCode ?? l.code).toLowerCase() === base) ?? languages[0]
  }, [i18n.language])

  useEffect(() => {
    let active = true
    queueMicrotask(() => {
      if (active) setMenuOpen(false)
    })
    return () => {
      active = false
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setLddOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLddOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLangChange = (lang: LangRow) => {
    void i18n.changeLanguage(lang.i18nCode ?? lang.code)
    setLddOpen(false)
  }

  const closeMobileAndNavigate = () => setMenuOpen(false)

  return (
    <>
      <nav className={menuOpen ? 'nav nav--menu-open' : 'nav'} aria-label="Main">
        <Link to="/" className="logo" onClick={closeMobileAndNavigate}>
          <div className="logo-mark">
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2L10 12M10 2L6 6M10 2L14 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="2" r="2.5" fill="white" />
              <path
                d="M4 16H16M6 16V13H14V16"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="logo-text">
            <span>Beacon</span> NH
          </div>
        </Link>

        <div
          id="nav-mobile-panel"
          className={`nav-mid ${menuOpen ? 'nav-mid--open' : ''}`}
          role="navigation"
        >
          <Link to="/" className="nav-a" onClick={closeMobileAndNavigate}>
            {t('nav.getHelp')}
          </Link>
          <Link to="/about" className="nav-a" onClick={closeMobileAndNavigate}>
            About
          </Link>
          <Link to="/communities" className="nav-a" onClick={closeMobileAndNavigate}>
            {t('nav.communities')}
          </Link>
          <Link to="/services" className="nav-a" onClick={closeMobileAndNavigate}>
            {t('nav.services')}
          </Link>
          <Link to="/stories" className="nav-a" onClick={closeMobileAndNavigate}>
            {t('nav.stories')}
          </Link>
          <Link to="/events" className="nav-a" onClick={closeMobileAndNavigate}>
            {t('nav.events')}
          </Link>
          <Link to="/services#faq" className="nav-a" onClick={closeMobileAndNavigate}>
            FAQ
          </Link>
          <Link to="/events#resources" className="nav-a" onClick={closeMobileAndNavigate}>
            {t('nav.resources')}
          </Link>
        </div>

        <div className="nav-tail">
          <div className="nav-actions">
            <div className={`ldd ${lddOpen ? 'open' : ''}`} id="ldd" ref={dropdownRef}>
              <button
                type="button"
                className="ldd-btn"
                onClick={() => setLddOpen(!lddOpen)}
                aria-expanded={lddOpen}
                aria-haspopup="listbox"
                aria-label={`${t('nav.selectLanguage')}: ${selectedLang.native}`}
              >
                <span aria-hidden>🌍</span>{' '}
                <span className="ldd-current">{selectedLang.native}</span>{' '}
                <span className="arr" aria-hidden>
                  ▾
                </span>
              </button>
              <div className="ldd-menu">
                <div className="ldd-head">{t('nav.selectLanguage')}</div>
                {languages.map((lang, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`ldd-opt ${selectedLang.code === lang.code ? 'on' : ''}`}
                    onClick={() => handleLangChange(lang)}
                  >
                    <span className="ldd-nat">{lang.native}</span>
                    <span className="ldd-en">{lang.en}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link to="/support" className="nav-donate" onClick={closeMobileAndNavigate}>
              {t('nav.donate')}
            </Link>
          </div>

          <button
            type="button"
            className="nav-burger"
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-panel"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="nav-burger-lines" aria-hidden>
              <span className="nav-burger-bar" />
              <span className="nav-burger-bar" />
              <span className="nav-burger-bar" />
            </span>
            <span className="nav-burger-label">{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </nav>

      <button
        type="button"
        className={`nav-backdrop ${menuOpen ? 'nav-backdrop--visible' : ''}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
    </>
  )
}
