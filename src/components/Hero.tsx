import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero">
      <div className="hero-bg">
        <div
          className="hero-bg-canvas"
          aria-hidden
          style={{
            width: '100%',
            height: '100%',
            minHeight: '100%',
            background:
              'linear-gradient(120deg, #0f241c 0%, #1a4d3a 35%, #2a6b52 70%, #14332a 100%)',
          }}
        />
        <div className="hero-bg-overlay"></div>
        <div className="hero-bg-side"></div>
      </div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <div className="hero-line"></div>
          <span>{t('hero.city')}</span>
        </div>
        <h1>{t('hero.titleLine1')}<br/>{t('hero.titleLine2')}<br/><em>{t('hero.titleLine3')}</em></h1>
        <p className="hero-sub">{t('hero.sub')}</p>
        <div className="hero-btns">
          <Link to="/#help" className="btn-primary">
            {t('hero.btnPrimary')}
          </Link>
          <Link to="/about" className="btn-secondary">
            {t('hero.btnSecondary')}
          </Link>
        </div>
        <div className="hero-stats">
          <div className="hs"><div className="hs-n">{t('hero.stat1Num')}</div><div className="hs-l">{t('hero.stat1Label')}</div></div>
          <div className="hs"><div className="hs-n">{t('hero.stat2Num')}</div><div className="hs-l">{t('hero.stat2Label')}</div></div>
          <div className="hs"><div className="hs-n">{t('hero.stat3Num')}</div><div className="hs-l">{t('hero.stat3Label')}</div></div>
          <div className="hs" style={{ border: 'none', margin: 0, padding: 0 }}><div className="hs-n">{t('hero.stat4Num')}</div><div className="hs-l">{t('hero.stat4Label')}</div></div>
        </div>
      </div>
      <div className="hero-badge">
        <div className="hb-icon">📞</div>
        <div className="hb-title">211 NH</div>
        <div className="hb-desc">Free information & referral — 24 hours a day</div>
        <a className="hb-tag" href="tel:211" style={{ textDecoration: 'none' }}>Call 211</a>
      </div>
    </section>
  )
}
