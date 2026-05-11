import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { NhRefugeeNeedsGuide } from './NhRefugeeNeedsGuide'

const G = {
  housing: 'linear-gradient(135deg, #1e3d32 0%, #3d6b52 100%)',
  legal: 'linear-gradient(135deg, #243040 0%, #4a6078 100%)',
  edu: 'linear-gradient(135deg, #2a3828 0%, #4a6b3d 100%)',
  jobs: 'linear-gradient(135deg, #2d2838 0%, #5a4a6b 100%)',
  health: 'linear-gradient(135deg, #1a3040 0%, #3d5a70 100%)',
  food: 'linear-gradient(135deg, #3a3018 0%, #6b5a32 100%)',
  hubs: 'linear-gradient(135deg, #143028 0%, #2a6e4a 100%)',
} as const

export function Services() {
  const { t } = useTranslation()

  return (
    <section className="services" id="services">
      <div className="section-header">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">{t('services.eyebrow')}</span></div>
        <h2 className="s-title">{t('services.titleLine1')}<br/><em>{t('services.titleLine2')}</em></h2>
        <p className="s-sub">{t('services.sub')}</p>
        <p className="svc-extra-links">
          <Link to="/first-week-nh" className="svc-extra-link">
            {t('firstWeekLink')}
          </Link>
          <span className="svc-extra-sep" aria-hidden>
            ·
          </span>
          <Link to="/know-your-rights" className="svc-extra-link">
            {t('rightsLink')}
          </Link>
        </p>
      </div>
      <div className="svc-grid">
        <a href="/#help-housing" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><div className="svc-img-fill" style={{ background: G.housing }} aria-hidden /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">🏠</div>
            <div className="svc-title">{t('services.housingTitle')}</div>
            <p>{t('services.housingDesc')}</p>
          </div>
        </a>
        <a href="/#help-legal" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><div className="svc-img-fill" style={{ background: G.legal }} aria-hidden /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">⚖️</div>
            <div className="svc-title">{t('services.legalTitle')}</div>
            <p>{t('services.legalDesc')}</p>
          </div>
        </a>
        <a href="/#help-education" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><div className="svc-img-fill" style={{ background: G.edu }} aria-hidden /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">📚</div>
            <div className="svc-title">{t('services.eduTitle')}</div>
            <p>{t('services.eduDesc')}</p>
          </div>
        </a>
        <a href="/events" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><div className="svc-img-fill" style={{ background: G.jobs }} aria-hidden /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">💼</div>
            <div className="svc-title">{t('services.jobsTitle')}</div>
            <p>{t('services.jobsDesc')}</p>
          </div>
        </a>
        <a href="tel:988" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><div className="svc-img-fill" style={{ background: G.health }} aria-hidden /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">🧠</div>
            <div className="svc-title">{t('services.healthTitle')}</div>
            <p>{t('services.healthDesc')}</p>
          </div>
        </a>
        <a href="/#help-food" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><div className="svc-img-fill" style={{ background: G.food }} aria-hidden /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">🍎</div>
            <div className="svc-title">{t('services.foodTitle')}</div>
            <p>{t('services.foodDesc')}</p>
          </div>
        </a>
        <Link to="/communities" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><div className="svc-img-fill" style={{ background: G.hubs }} aria-hidden /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">🌍</div>
            <div className="svc-title">Community hubs</div>
            <p>Dedicated pages for Manchester&apos;s refugee-led networks — updates and discussion where Firebase is enabled.</p>
          </div>
        </Link>
      </div>
      <NhRefugeeNeedsGuide />
    </section>
  )
}
