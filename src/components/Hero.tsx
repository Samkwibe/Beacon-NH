import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-bg">
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
          <source src="/14660672_3840_2160_50fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-bg-overlay"></div>
        <div className="hero-bg-side"></div>
        <div className="hero-video-ph">
          <div className="play-ring" onClick={() => alert('Upload your community video to YouTube, then paste the video ID into the code to replace this placeholder.')}>
            <div className="play-circle"><div className="play-triangle"></div></div>
            <span className="play-label">{t('hero.watchStory')}</span>
          </div>
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
          <a href="#help" className="btn-primary">{t('hero.btnPrimary')}</a>
          <a href="#stories" className="btn-secondary">{t('hero.btnSecondary')}</a>
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
    </section>
  );
}
