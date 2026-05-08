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
    <section className="communities" id="communities" style={{ background: '#FFFFFF', padding: '80px 60px' }}>
      <div className="section-header">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Our Networks</span></div>
        <h2 className="s-title">Vibrant <em>Sub-Communities</em></h2>
        <p className="s-sub">We are proud to partner with and support the thriving international communities that make Manchester, NH so uniquely beautiful.</p>
        <p className="s-sub communities-hub-intro">
          Each community has its own <strong>hub page</strong>: what&apos;s happening, and a space to chat with neighbors (when Firebase is enabled).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '52px' }}>
        {COMMUNITIES.map((comm) => (
          <div key={comm.id} style={{ border: '1px solid rgba(46,110,74,.15)', borderRadius: '4px', overflow: 'hidden', transition: 'border-color .2s', background: '#F4F8F5' }}>
            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
              <img src={comm.img} alt={comm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '24px' }}>
              <span className="story-country-tag" style={{ marginBottom: '12px', background: '#4A9669' }}>{comm.flag} {comm.name.split(' ')[0]}</span>
              <h3 style={{ font: '700 20px/1.2 "Barlow Condensed", sans-serif', textTransform: 'uppercase', letterSpacing: '.03em', color: '#1A3328', marginBottom: '8px' }}>
                <Link to={`/communities/${comm.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{comm.name}</Link>
              </h3>
              <p style={{ font: '400 14px/1.6 "Barlow", sans-serif', color: '#5A8A6E' }}>
                {comm.desc}
              </p>
              <p style={{ marginTop: '12px', marginBottom: 0 }}>
                <Link
                  to={`/communities/${comm.id}`}
                  style={{
                    font: '700 13px/1.2 "Barlow", sans-serif',
                    color: '#2e6e4a',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(46,110,74,.35)',
                  }}
                >
                  Open community hub →
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  )
}
