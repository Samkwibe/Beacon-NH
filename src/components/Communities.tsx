import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { COMMUNITIES } from '../data/communitiesCatalog'

export function Communities() {
  usePageMeta(
    'Communities',
    'Explore Manchester NH refugee-led communities — Congo, Kenya, Syria, Afghanistan, Ukraine, Somalia, and more.',
  )

  return (
    <div className="page-with-nav">
      <section className="communities communities-landing" id="communities">
        <div className="section-header">
          <div className="s-eyebrow">
            <div className="s-line" />
            <span className="s-eye">Our Networks</span>
          </div>
          <h2 className="s-title">
            Vibrant <em>Sub-Communities</em>
          </h2>
          <p className="s-sub">
            We are proud to partner with and support the international communities that make Manchester, NH
            strong.
          </p>
          <p className="s-sub communities-hub-intro">
            Each group has a dedicated page with <strong>updates</strong>, a <strong>discussion</strong> space
            to share with neighbors, and quick links to <strong>services and help</strong> — all in one place.
          </p>
        </div>

        <div className="community-landing-quick" aria-label="Quick actions">
          <Link className="community-landing-quick-card" to="/">
            <span className="community-landing-quick-emoji" aria-hidden>
              🆘
            </span>
            <h3 className="community-landing-quick-title">Get help</h3>
            <p className="community-landing-quick-desc">Housing, legal, food, crisis lines — free &amp; confidential.</p>
          </Link>
          <Link className="community-landing-quick-card" to="/services">
            <span className="community-landing-quick-emoji" aria-hidden>
              📋
            </span>
            <h3 className="community-landing-quick-title">Services</h3>
            <p className="community-landing-quick-desc">Programs Beacon NH helps connect you with in NH.</p>
          </Link>
          <Link className="community-landing-quick-card" to="/events">
            <span className="community-landing-quick-emoji" aria-hidden>
              📅
            </span>
            <h3 className="community-landing-quick-title">Events</h3>
            <p className="community-landing-quick-desc">Workshops, meals, clinics, and gatherings.</p>
          </Link>
          <Link className="community-landing-quick-card" to="/donate">
            <span className="community-landing-quick-emoji" aria-hidden>
              ❤️
            </span>
            <h3 className="community-landing-quick-title">Donate</h3>
            <p className="community-landing-quick-desc">Keep these programs free for families.</p>
          </Link>
        </div>

        <div className="communities-grid">
          {COMMUNITIES.map((comm) => (
            <article key={comm.id} className="community-card">
              <div className="community-card-img">
                <img src={comm.img} alt={comm.name} />
              </div>
              <div className="community-card-body">
                <span className="story-country-tag" style={{ marginBottom: '12px', background: '#4A9669' }}>
                  {comm.flag} {comm.name.split(' ')[0]}
                </span>
                <h3
                  style={{
                    font: '700 20px/1.2 "Barlow Condensed", sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '.03em',
                    color: '#1A3328',
                    marginBottom: '8px',
                  }}
                >
                  <Link to={`/communities/${comm.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {comm.name}
                  </Link>
                </h3>
                <p style={{ font: '400 14px/1.6 "Barlow", sans-serif', color: '#5A8A6E', margin: 0 }}>
                  {comm.desc}
                </p>
                <p className="community-card-link">
                  <Link className="community-card-cta" to={`/communities/${comm.id}`}>
                    Open hub — updates &amp; discussion
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
