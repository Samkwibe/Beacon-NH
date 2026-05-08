import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const languages = [
  { native: 'English', en: 'English', code: 'en', flag: '🇺🇸' },
  { native: 'العربية', en: 'Arabic', code: 'ar', flag: '🇸🇦' },
  { native: 'Soomaali', en: 'Somali', code: 'so', flag: '🇸🇴' },
  { native: 'دری / پښتو', en: 'Dari / Pashto', code: 'fa', flag: '🇦🇫' },
  { native: 'ትግርኛ', en: 'Tigrinya', code: 'ti', flag: '🇪🇷' },
  { native: 'Français', en: 'French', code: 'fr', flag: '🇫🇷' },
  { native: 'Kurdî', en: 'Kurdish', code: 'ku', flag: '🏴' },
  { native: 'Українська', en: 'Ukrainian', code: 'uk', flag: '🇺🇦' },
  { native: 'Kiswahili', en: 'Swahili', code: 'sw', flag: '🇰🇪' },
  { native: 'አማርኛ', en: 'Amharic', code: 'am', flag: '🇪🇹' }
];

export function Navigation() {
  const { t, i18n } = useTranslation();
  const [lddOpen, setLddOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLddOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangChange = (lang: typeof languages[0]) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang.code);
    setLddOpen(false);
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <div className="logo-mark">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M10 2L10 12M10 2L6 6M10 2L14 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="2" r="2.5" fill="white"/>
            <path d="M4 16H16M6 16V13H14V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="logo-text"><span>Beacon</span> NH</div>
      </Link>
      <div className="nav-mid">
        <Link to="/" className="nav-a">{t('nav.getHelp')}</Link>
        <Link to="/about" className="nav-a">About</Link>
        <Link to="/communities" className="nav-a">{t('nav.communities')}</Link>
        <Link to="/services" className="nav-a">{t('nav.services')}</Link>
        <Link to="/stories" className="nav-a">{t('nav.stories')}</Link>
        <Link to="/events" className="nav-a">{t('nav.events')}</Link>
        <Link to="/events" className="nav-a">{t('nav.resources')}</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div className={`ldd ${lddOpen ? 'open' : ''}`} id="ldd" ref={dropdownRef}>
          <button className="ldd-btn" onClick={() => setLddOpen(!lddOpen)}>
            🌍 <span id="lLbl">{selectedLang.native}</span> <span className="arr">▾</span>
          </button>
          <div className="ldd-menu">
            <div className="ldd-head">{t('nav.selectLanguage')}</div>
            {languages.map((lang, idx) => (
              <div 
                key={idx} 
                className={`ldd-opt ${selectedLang.code === lang.code ? 'on' : ''}`} 
                onClick={() => handleLangChange(lang)}
              >
                <span className="ldd-nat">{lang.native}</span>
                <span className="ldd-en">{lang.en}</span>
              </div>
            ))}
          </div>
        </div>
        <Link to="/donate" className="nav-donate">{t('nav.donate')}</Link>
      </div>
    </nav>
  );
}
