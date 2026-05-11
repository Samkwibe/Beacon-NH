import { NH_REFUGEE_NEED_TOPICS } from '../data/nhRefugeeNeedsCatalog'
import { DisclaimerBanner } from './DisclaimerBanner'
import { formatVerifiedMonth } from '../lib/formatVerified'
import { useTranslation } from 'react-i18next'

/**
 * “I need…” grid wired to public NH / national entry points (not invented programs).
 */
export function NhRefugeeNeedsGuide() {
  const { t } = useTranslation()

  return (
    <div className="nh-needs-guide" id="nh-refugee-needs">
      <div className="section-header">
        <div className="s-eyebrow">
          <div className="s-line" />
          <span className="s-eye">New Hampshire pathways</span>
        </div>
        <h2 className="s-title">
          Common needs &amp; <em>where to start</em>
        </h2>
        <p className="s-sub">
          Each card lists real agencies or state pages you can open yourself. Eligibility and hours change — always
          confirm on the official site or by phone. Nothing here replaces your resettlement case manager or 911. For a
          dedicated overview of the International Institute of New England&apos;s Manchester office and program pages,{' '}
          <a href="/#iine-spotlight">see the IINE spotlight on the home page</a>.
        </p>
      </div>

      <DisclaimerBanner variant="default" className="nh-needs-disclaimer" />

      <ul className="nh-needs-grid">
        {NH_REFUGEE_NEED_TOPICS.map((topic) => (
          <li key={topic.id}>
            {topic.id === 'wic-babies' ? (
              <DisclaimerBanner variant="health" className="nh-needs-disclaimer nh-needs-disclaimer--inline" />
            ) : null}
            {topic.id === 'immigration-legal' ? (
              <DisclaimerBanner variant="legal" className="nh-needs-disclaimer nh-needs-disclaimer--inline" />
            ) : null}
            <div className="nh-needs-card">
              <div className="nh-needs-card-head">
                <span className="nh-needs-emoji" aria-hidden>
                  {topic.emoji}
                </span>
                <h3 className="nh-needs-title">{topic.title}</h3>
              </div>
              <p className="nh-needs-summary">{topic.summary}</p>
              <p className="nh-needs-first">
                <strong>First step:</strong> {topic.firstStep}
              </p>
              <p className="nh-needs-verified-topic">
                {t('common.verifiedTopic', { date: formatVerifiedMonth(topic.lastVerified) })}
              </p>
              <ul className="nh-needs-links">
                {topic.links.map((l) => (
                  <li key={`${topic.id}-${l.label}`}>
                    <span className="nh-needs-link-line">
                      <a href={l.href} className="nh-needs-link" target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                      {l.tel ? (
                        <>
                          {' · '}
                          <a href={`tel:${l.tel}`} className="nh-needs-link nh-needs-link--tel">
                            call
                          </a>
                        </>
                      ) : null}
                    </span>
                    <span className="nh-needs-verified-link">
                      {t('common.verifiedLink', {
                        date: formatVerifiedMonth(l.lastVerified ?? topic.lastVerified),
                      })}
                    </span>
                    {l.note ? <span className="nh-needs-note">{l.note}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
