import { Link } from 'react-router-dom'

export function About() {
  return (
    <section className="about">
      <div className="about-img">
        <div
          className="about-img-fill"
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(145deg, #1a3328 0%, #2d5a45 45%, #4a7a62 100%)',
          }}
        />
        <div className="about-img-overlay"></div>
        <div className="about-year-badge">
          <div className="ayb-n">NH</div>
          <div className="ayb-l">Refugee Admissions<br/>Program</div>
        </div>
      </div>
      <div className="about-content">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Who We Are</span></div>
        <h2 className="s-title" style={{ marginBottom: '24px' }}>Connect With<br/><em>Trusted NH Programs</em></h2>
        <p>
          Beacon NH is a student-built site that points Manchester neighbors to <strong>public</strong> help:
          <a href="https://211nh.org" target="_blank" rel="noopener noreferrer"> 211 NH</a>, the{' '}
          <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer">988</a> lifeline, screening for civil legal help through{' '}
          <a href="https://www.603legalaid.org" target="_blank" rel="noopener noreferrer">603 Legal Aid</a>, and{' '}
          <a href="https://www.nhla.org" target="_blank" rel="noopener noreferrer">NH Legal Assistance</a>.
        </p>
        <p>
          New Hampshire’s U.S. Refugee Admissions Program is described by{' '}
          <a href="https://www.dhhs.nh.gov/programs-services/health-equity/operation-united-states-refugee-admissions-program-new-hampshire" target="_blank" rel="noopener noreferrer">NH DHHS</a>.
          Federal reception & placement in the state is carried out by the two resettlement agencies DHHS lists there (currently Ascentria Care Alliance and the International Institute of New England). Counts of arrivals change by federal fiscal year — use official ORR reports rather than guesswork on a flyer.
        </p>
        <p>
          The{' '}
          <a href="https://iine.org/contact/" target="_blank" rel="noopener noreferrer">
            International Institute of New England
          </a>{' '}
          maintains a Manchester office at <strong>470 Pine Street</strong> (Lower Level) for resettlement, ESOL,
          employment supports, legal services, and — through IINE Language Services — professional interpretation based in
          Manchester. Beacon NH summarizes their public pages so newcomers can find the right door faster; always
          confirm programs directly with IINE staff.
        </p>
        <p className="about-note" style={{ fontSize: '15px', color: '#5A8A6E', marginTop: '8px' }}>
          Nothing on this site is legal or medical advice. For emergencies, call <strong>911</strong>.
        </p>
        <Link to="/services" className="btn-primary" style={{ marginTop: '32px', width: 'fit-content' }}>
          Our Services →
        </Link>
      </div>
    </section>
  )
}
