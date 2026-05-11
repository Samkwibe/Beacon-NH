export function ImpactStrip() {
  return (
    <section className="impact-strip" aria-labelledby="impact-strip-heading">
      <div className="impact-inner">
        <div className="impact-left">
          <h2 id="impact-strip-heading">
            Real Programs,
            <br />
            Real Numbers
          </h2>
          <p>
            When we quote impact, we point to sources — not made-up dashboards.
          </p>
        </div>
        <div className="impact-nums">
          <div className="imp">
            <div className="imp-n">211</div>
            <div className="imp-l">NH information & referral (Granite United Way)</div>
          </div>
          <div className="imp">
            <div className="imp-n">988</div>
            <div className="imp-l">National Suicide & Crisis Lifeline</div>
          </div>
          <div className="imp">
            <div className="imp-n">2</div>
            <div className="imp-l">ORR resettlement agencies listed by NH DHHS for the state</div>
          </div>
          <div className="imp">
            <div className="imp-n">↗</div>
            <div className="imp-l">
              <a
                href="https://www.dhhs.nh.gov/programs-services/health-equity/operation-united-states-refugee-admissions-program-new-hampshire"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit' }}
              >
                Read NH DHHS on the refugee program
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
