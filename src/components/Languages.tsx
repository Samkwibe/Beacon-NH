export function Languages() {
  return (
    <section className="languages" id="languages">
      <div className="lang-bg-word">BEACON</div>
      <div className="lang-layout">
        <div className="lang-left">
          <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">UI languages</span></div>
          <h2 className="s-title">Switch<br/><em>the interface</em></h2>
          <p>
            The header language menu maps to the locales defined in <code style={{ fontSize: '12px' }}>i18n.ts</code>.
            For professional interpretation, call <a href="tel:211" style={{ color: 'rgba(255,255,255,.85)' }}>211 NH</a> or your resettlement case manager.
          </p>
          <div className="lang-count-big">5</div>
          <div className="lang-count-label">Full UI locales shipped in this repo</div>
        </div>
        <div className="lang-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div className="lang-card"><div className="lang-flag">🇺🇸</div><div className="lang-nat">English</div><div className="lang-en">English · default</div></div>
          <div className="lang-card"><div className="lang-flag">🇸🇦</div><div className="lang-nat">العربية</div><div className="lang-en">Arabic</div></div>
          <div className="lang-card"><div className="lang-flag">🇫🇷</div><div className="lang-nat">Français</div><div className="lang-en">French</div></div>
          <div className="lang-card"><div className="lang-flag">🇺🇦</div><div className="lang-nat">Українська</div><div className="lang-en">Ukrainian</div></div>
          <div className="lang-card"><div className="lang-flag">🇰🇪</div><div className="lang-nat">Kiswahili</div><div className="lang-en">Swahili</div></div>
        </div>
      </div>
    </section>
  )
}
