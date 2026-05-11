import { useTranslation } from 'react-i18next'
import {
  NH_211,
  CRISIS_988,
  LEGAL_603_INTAKE,
  NHLA_MANCHESTER,
  CCNH_IMMIGRATION,
} from '../data/nhPublicResources'
import { formatVerifiedMonth } from '../lib/formatVerified'

type Props = {
  /** Shorter list for tight layouts */
  compact?: boolean
}

/**
 * Fact-checked NH-wide resources (same on every community hub Updates tab).
 */
export function NhVerifiedResources({ compact }: Props) {
  const { t } = useTranslation()

  if (compact) {
    return (
      <div className="nh-resources nh-resources--compact">
        <h3 className="nh-resources-heading">Trusted New Hampshire helplines</h3>
        <p className="nh-resources-intro">
          These numbers come from public programs, not from random posts. Use them for emergencies and legal
          intake — use the Discussion tab for everyday community coordination.
        </p>
        <ul className="nh-resources-list">
          <li>
            <strong>{NH_211.name}</strong> —{' '}
            <a href={NH_211.telHref}>{NH_211.dial}</a> or{' '}
            <a href={NH_211.telTollFreeHref}>{NH_211.tollFreeDisplay}</a> —{' '}
            <a href={NH_211.website} target="_blank" rel="noopener noreferrer">
              211nh.org
            </a>
            <span className="nh-resources-verified">
              {t('common.verifiedLabel', { date: formatVerifiedMonth(NH_211.lastVerified) })}
            </span>
          </li>
          <li>
            <strong>{CRISIS_988.name}</strong> — <a href={CRISIS_988.telHref}>Call or text 988</a>
            <span className="nh-resources-verified">
              {t('common.verifiedLabel', { date: formatVerifiedMonth(CRISIS_988.lastVerified) })}
            </span>
          </li>
          <li>
            <strong>{LEGAL_603_INTAKE.name}</strong> —{' '}
            <a href={LEGAL_603_INTAKE.telHref}>{LEGAL_603_INTAKE.phoneDisplay}</a> —{' '}
            <a href={LEGAL_603_INTAKE.website} target="_blank" rel="noopener noreferrer">
              603legalaid.org
            </a>
            <span className="nh-resources-verified">
              {t('common.verifiedLabel', { date: formatVerifiedMonth(LEGAL_603_INTAKE.lastVerified) })}
            </span>
          </li>
          <li>
            <strong>{NHLA_MANCHESTER.name}</strong> —{' '}
            <a href={NHLA_MANCHESTER.telHref}>{NHLA_MANCHESTER.phoneDisplay}</a> (toll-free{' '}
            <a href={NHLA_MANCHESTER.telTollFreeHref}>{NHLA_MANCHESTER.tollFreeDisplay}</a>) —{' '}
            <a href={NHLA_MANCHESTER.website} target="_blank" rel="noopener noreferrer">
              nhla.org
            </a>
            <span className="nh-resources-verified">
              {t('common.verifiedLabel', { date: formatVerifiedMonth(NHLA_MANCHESTER.lastVerified) })}
            </span>
          </li>
          <li>
            <strong>{CCNH_IMMIGRATION.name}</strong> —{' '}
            <a href={CCNH_IMMIGRATION.telHref}>{CCNH_IMMIGRATION.phoneDisplay}</a> —{' '}
            <a href={CCNH_IMMIGRATION.website} target="_blank" rel="noopener noreferrer">
              cc-nh.org
            </a>
            <span className="nh-resources-verified">
              {t('common.verifiedLabel', { date: formatVerifiedMonth(CCNH_IMMIGRATION.lastVerified) })}
            </span>
          </li>
        </ul>
        <p className="nh-resources-foot">
          Programs and hours can change. Confirm on each organization&apos;s website before you travel.
        </p>
      </div>
    )
  }

  return (
    <section className="nh-resources" aria-labelledby="nh-resources-title">
      <h3 id="nh-resources-title" className="nh-resources-heading">
        New Hampshire resources (verified contacts)
      </h3>
      <p className="nh-resources-intro">
        Beacon NH lists only widely published phone numbers and websites. We do not invent meetings or events
        here — community-specific news should come from your leaders or from the Discussion board when it is
        live.
      </p>
      <ul className="nh-resources-cards">
        <li className="nh-resource-card">
          <h4 className="nh-resource-card-title">{NH_211.name}</h4>
          <p className="nh-resource-card-body">{NH_211.summary}</p>
          <p className="nh-resource-card-verified">
            {t('common.verifiedLabel', { date: formatVerifiedMonth(NH_211.lastVerified) })}
          </p>
          <p className="nh-resource-card-actions">
            <a href={NH_211.telHref}>Dial {NH_211.dial}</a>
            {' · '}
            <a href={NH_211.telTollFreeHref}>{NH_211.tollFreeDisplay}</a>
            {' · '}
            <a href={NH_211.website} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          </p>
        </li>
        <li className="nh-resource-card">
          <h4 className="nh-resource-card-title">{CRISIS_988.name}</h4>
          <p className="nh-resource-card-body">{CRISIS_988.summary}</p>
          <p className="nh-resource-card-verified">
            {t('common.verifiedLabel', { date: formatVerifiedMonth(CRISIS_988.lastVerified) })}
          </p>
          <p className="nh-resource-card-actions">
            <a href={CRISIS_988.telHref}>988 (call or text)</a>
            {' · '}
            <a href={CRISIS_988.website} target="_blank" rel="noopener noreferrer">
              988lifeline.org
            </a>
          </p>
        </li>
        <li className="nh-resource-card">
          <h4 className="nh-resource-card-title">{LEGAL_603_INTAKE.name}</h4>
          <p className="nh-resource-card-body">{LEGAL_603_INTAKE.summary}</p>
          <p className="nh-resource-card-verified">
            {t('common.verifiedLabel', { date: formatVerifiedMonth(LEGAL_603_INTAKE.lastVerified) })}
          </p>
          <p className="nh-resource-card-actions">
            <a href={LEGAL_603_INTAKE.telHref}>{LEGAL_603_INTAKE.phoneDisplay}</a>
            {' · '}
            <a href={LEGAL_603_INTAKE.website} target="_blank" rel="noopener noreferrer">
              603legalaid.org
            </a>
          </p>
        </li>
        <li className="nh-resource-card">
          <h4 className="nh-resource-card-title">{NHLA_MANCHESTER.name}</h4>
          <p className="nh-resource-card-body">{NHLA_MANCHESTER.summary}</p>
          <p className="nh-resource-card-meta">{NHLA_MANCHESTER.address}</p>
          <p className="nh-resource-card-verified">
            {t('common.verifiedLabel', { date: formatVerifiedMonth(NHLA_MANCHESTER.lastVerified) })}
          </p>
          <p className="nh-resource-card-actions">
            <a href={NHLA_MANCHESTER.telHref}>{NHLA_MANCHESTER.phoneDisplay}</a>
            {' · '}
            <a href={NHLA_MANCHESTER.telTollFreeHref}>{NHLA_MANCHESTER.tollFreeDisplay}</a>
            {' · '}
            <a href={NHLA_MANCHESTER.website} target="_blank" rel="noopener noreferrer">
              nhla.org
            </a>
          </p>
        </li>
        <li className="nh-resource-card">
          <h4 className="nh-resource-card-title">{CCNH_IMMIGRATION.name}</h4>
          <p className="nh-resource-card-body">{CCNH_IMMIGRATION.summary}</p>
          <p className="nh-resource-card-verified">
            {t('common.verifiedLabel', { date: formatVerifiedMonth(CCNH_IMMIGRATION.lastVerified) })}
          </p>
          <p className="nh-resource-card-actions">
            <a href={CCNH_IMMIGRATION.telHref}>{CCNH_IMMIGRATION.phoneDisplay}</a>
            {' · '}
            <a href={CCNH_IMMIGRATION.website} target="_blank" rel="noopener noreferrer">
              cc-nh.org
            </a>
          </p>
        </li>
      </ul>
    </section>
  )
}
