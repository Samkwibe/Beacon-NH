import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t } = useTranslation()
  const [videoTipOpen, setVideoTipOpen] = useState(false)

  return (
    <section className="hero">
      <div className="hero-bg">
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
          <source src="/14660672_3840_2160_50fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-bg-overlay"></div>
        <div className="hero-bg-side"></div>
        <div className="hero-video-ph">
          <button
            type="button"
            className="play-ring play-ring--btn"
            aria-haspopup="dialog"
            aria-expanded={videoTipOpen}
            onClick={() => setVideoTipOpen(true)}
          >
            <div className="play-circle">
              <div className="play-triangle"></div>
            </div>
            <span className="play-label">{t('hero.watchStory')}</span>
          </button>
        </div>
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
          <Link to="/stories" className="btn-secondary">
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
        <div className="hb-icon">🏠</div>
        <div className="hb-title">Emergency Housing</div>
        <div className="hb-desc">Same-day referrals across Manchester NH</div>
        <span className="hb-tag">Available Now</span>
      </div>

      <div
        className={`modal-bg ${videoTipOpen ? 'open' : ''}`}
        role="presentation"
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains('modal-bg')) setVideoTipOpen(false)
        }}
      >
        <div className="modal hero-video-modal" role="dialog" aria-modal="true" aria-labelledby="hero-video-tip-title">
          <button type="button" className="modal-close" onClick={() => setVideoTipOpen(false)}>
            ✕
          </button>
          <h2 id="hero-video-tip-title">Community spotlight video</h2>
          <p>
            Replace this looping background with your flagship story: upload to YouTube or Vimeo, then embed the player in{' '}
            <code className="hero-code">Hero.tsx</code> or swap the <code className="hero-code">&lt;video&gt;</code> source.
          </p>
          <p className="hero-video-tip-note">Tip: keep files compressed under ~8&nbsp;MB for fast loads on mobile data.</p>
          <button type="button" className="btn-primary hero-video-tip-dismiss" onClick={() => setVideoTipOpen(false)}>
            Got it
          </button>
        </div>
      </div>
    </section>
  )
}
