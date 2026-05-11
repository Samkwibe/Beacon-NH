import { IINE_URLS } from '../data/iinePublicInfo'

/** No fiscal sponsor on this student site — route donations to verified 501(c)(3) partners. */
export function SupportCommunity() {
  return (
    <section className="donate support-community" id="support">
      <div className="donate-inner">
        <div className="donate-img">
          <div
            className="donate-img-fill"
            aria-hidden
            style={{ background: 'linear-gradient(160deg, #1a3328 0%, #2e6e4a 40%, #4a8a6e 100%)' }}
          />
          <div className="donate-img-overlay"></div>
        </div>
        <div className="donate-form">
          <div className="s-eyebrow">
            <div className="s-line"></div>
            <span className="s-eye">Support refugees in NH</span>
          </div>
          <h2 className="s-title">
            Give through<br />
            <em>trusted nonprofits</em>
          </h2>
          <p className="d-note">
            Beacon NH does not collect money on this student build. Use the links below so your gift has a real fiscal
            sponsor and receipt.
          </p>
          <ul className="support-partner-list">
            <li>
              <a href="https://iine.org/donate/" target="_blank" rel="noopener noreferrer">
                International Institute of New England — donate
              </a>
              <span className="support-partner-note">501(c)(3) · resettlement, ESOL, legal &amp; workforce programs</span>
            </li>
            <li>
              <a href="https://www.ascentria.org/donate" target="_blank" rel="noopener noreferrer">
                Ascentria Care Alliance — donate
              </a>
              <span className="support-partner-note">NH resettlement &amp; community services</span>
            </li>
            <li>
              <a href="https://www.nhfoodbank.org/give/" target="_blank" rel="noopener noreferrer">
                NH Food Bank — give
              </a>
              <span className="support-partner-note">Food assistance statewide</span>
            </li>
            <li>
              <a href="https://www.603legalaid.org/donate" target="_blank" rel="noopener noreferrer">
                603 Legal Aid — support civil legal access
              </a>
            </li>
            <li>
              <a href={IINE_URLS.volunteer} target="_blank" rel="noopener noreferrer">
                Volunteer with IINE (Manchester)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
