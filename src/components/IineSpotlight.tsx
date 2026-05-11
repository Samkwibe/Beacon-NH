import {
  IINE_ATTRIBUTION,
  IINE_MANCHESTER_OFFICE,
  IINE_PROGRAM_HIGHLIGHTS,
  IINE_URLS,
  IINE_LEADERSHIP_PUBLISHED,
  IINE_LEADERSHIP_MANCHESTER,
  IINE_LEADERSHIP_TEAM,
} from '../data/iinePublicInfo'

/**
 * Highlights IINE’s real Manchester presence and programs — respectful of their brand, no copy-paste.
 */
export function IineSpotlight() {
  return (
    <section className="iine-spotlight" id="iine-spotlight" aria-labelledby="iine-spotlight-title">
      <div className="iine-spotlight-inner">
        <div className="iine-spotlight-intro">
          <div className="s-eyebrow iine-spotlight-eyebrow">
            <div className="s-line" />
            <span className="s-eye">Manchester · resettlement partner</span>
          </div>
          <h2 id="iine-spotlight-title" className="iine-spotlight-title">
            Learn what the <em>International Institute of New England</em> offers
          </h2>
          <p className="iine-spotlight-lead">
            Beacon NH is a student-built guide. When newcomers ask &ldquo;who actually runs resettlement and English
            classes here?&rdquo; one authoritative answer in Manchester is IINE — founded in 1918, with offices in
            Boston, Lowell, and <strong>Manchester, NH</strong>. Below is a faithful map to their public pages (not a
            substitute for calling or applying through their team).
          </p>
          <p className="iine-spotlight-attrib">{IINE_ATTRIBUTION}</p>
          <div className="iine-spotlight-contact-card">
            <h3 className="iine-spotlight-contact-title">{IINE_MANCHESTER_OFFICE.name}</h3>
            <p className="iine-spotlight-address">
              {IINE_MANCHESTER_OFFICE.street}
              <br />
              {IINE_MANCHESTER_OFFICE.cityStateZip}
            </p>
            <p className="iine-spotlight-phone">
              <a href={IINE_MANCHESTER_OFFICE.telHref}>{IINE_MANCHESTER_OFFICE.phoneDisplay}</a>
              <span className="iine-spotlight-sep">·</span>
              <a href={IINE_URLS.contact} target="_blank" rel="noopener noreferrer">
                iine.org/contact
              </a>
            </p>
          </div>

          <div className="iine-spotlight-leadership">
            <h3 className="iine-spotlight-leadership-title">IINE leadership (public roster)</h3>
            <p className="iine-spotlight-leadership-intro">
              Names and titles below are copied from {IINE_LEADERSHIP_PUBLISHED.sourceLabel} — roles change; confirm on{' '}
              <a href={IINE_LEADERSHIP_PUBLISHED.sourceUrl} target="_blank" rel="noopener noreferrer">
                iine.org
              </a>
              . Beacon NH does not employ IINE staff. Listing checked {IINE_LEADERSHIP_PUBLISHED.lastVerified}.
            </p>
            <p className="iine-spotlight-leadership-sub">Manchester, NH focus</p>
            <ul className="iine-spotlight-leadership-list">
              {IINE_LEADERSHIP_MANCHESTER.map((m) => (
                <li key={m.name}>
                  <strong>{m.name}</strong>
                  <span className="iine-spotlight-leadership-sep"> — </span>
                  {m.title}
                </li>
              ))}
            </ul>
            <details className="iine-spotlight-leadership-details">
              <summary className="iine-spotlight-leadership-summary">
                Full IINE leadership team (all sites, from iine.org)
              </summary>
              <ul className="iine-spotlight-leadership-list iine-spotlight-leadership-list--full">
                {IINE_LEADERSHIP_TEAM.map((m) => (
                  <li key={`${m.name}-${m.title}`}>
                    <strong>{m.name}</strong>
                    <span className="iine-spotlight-leadership-sep"> — </span>
                    {m.title}
                  </li>
                ))}
              </ul>
            </details>
          </div>

          <div className="iine-spotlight-ctas">
            <a className="btn-primary" href={IINE_URLS.whatWeDo} target="_blank" rel="noopener noreferrer">
              What IINE does →
            </a>
            <a className="btn-secondary" href={IINE_URLS.volunteer} target="_blank" rel="noopener noreferrer">
              Volunteer with IINE
            </a>
          </div>
        </div>
        <ul className="iine-spotlight-grid">
          {IINE_PROGRAM_HIGHLIGHTS.map((p) => (
            <li key={p.title} className="iine-spotlight-card">
              <h3 className="iine-spotlight-card-title">{p.title}</h3>
              <p className="iine-spotlight-card-blurb">{p.blurb}</p>
              <a className="iine-spotlight-card-link" href={p.href} target="_blank" rel="noopener noreferrer">
                On iine.org →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
