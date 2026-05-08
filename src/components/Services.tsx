import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function Services() {
  const { t } = useTranslation();

  return (
    <section className="services" id="services">
      <div className="section-header">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">{t('services.eyebrow')}</span></div>
        <h2 className="s-title">{t('services.titleLine1')}<br/><em>{t('services.titleLine2')}</em></h2>
        <p className="s-sub">{t('services.sub')}</p>
      </div>
      <div className="svc-grid">
        <a href="#help-housing" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><img src="/pexels-safari-consoler-3290243-11834954.jpg" alt="Housing" /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">🏠</div>
            <div className="svc-title">{t('services.housingTitle')}</div>
            <p>{t('services.housingDesc')}</p>
          </div>
        </a>
        <a href="#help-legal" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><img src="/pexels-dialophotography-10385918.jpg" alt="Legal" /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">⚖️</div>
            <div className="svc-title">{t('services.legalTitle')}</div>
            <p>{t('services.legalDesc')}</p>
          </div>
        </a>
        <a href="#help-education" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><img src="/pexels-gwejeofafrica-15450149.jpg" alt="Education" /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">📚</div>
            <div className="svc-title">{t('services.eduTitle')}</div>
            <p>{t('services.eduDesc')}</p>
          </div>
        </a>
        <a href="/events" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><img src="/pexels-hosny-salah-21693143-35934219.jpg" alt="Jobs" /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">💼</div>
            <div className="svc-title">{t('services.jobsTitle')}</div>
            <p>{t('services.jobsDesc')}</p>
          </div>
        </a>
        <a href="tel:988" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><img src="/pexels-osamanaser-20110833.jpg" alt="Health" /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">🧠</div>
            <div className="svc-title">{t('services.healthTitle')}</div>
            <p>{t('services.healthDesc')}</p>
          </div>
        </a>
        <a href="#help-food" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><img src="/pexels-lagosfoodbank-8054607.jpg" alt="Food" /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">🍎</div>
            <div className="svc-title">{t('services.foodTitle')}</div>
            <p>{t('services.foodDesc')}</p>
          </div>
        </a>
        <Link to="/communities" className="svc-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="svc-img"><img src="/kenyan-community.png" alt="Community hubs" /></div>
          <div className="svc-overlay"></div>
          <div className="svc-body">
            <div className="svc-icon-sq">🌍</div>
            <div className="svc-title">Community hubs</div>
            <p>Country networks in Manchester — see what&apos;s happening and join the conversation in each community space.</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
