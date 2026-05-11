import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { DisclaimerBanner } from '../components/DisclaimerBanner'

const LINKS: { href: string; labelKey: 'kyr.aclu' | 'kyr.ilrc' | 'kyr.ice' }[] = [
  { href: 'https://www.aclu.org/know-your-rights', labelKey: 'kyr.aclu' },
  { href: 'https://www.ilrc.org/red-cards', labelKey: 'kyr.ilrc' },
  { href: 'https://www.nilc.org', labelKey: 'kyr.ice' },
]

export function KnowYourRights() {
  const { t } = useTranslation()
  usePageMeta(t('kyr.title'), t('kyr.intro'))

  return (
    <div className="page-with-nav">
      <article className="page-shell page-shell--narrow">
        <h1 className="page-title">{t('kyr.title')}</h1>
        <p className="page-lead">{t('kyr.intro')}</p>

        <DisclaimerBanner variant="legal" />

        <ul className="kyr-link-list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {t(l.labelKey)} →
              </a>
            </li>
          ))}
        </ul>

        <p className="page-body">
          {t('common.disclaimerGeneral')}
        </p>

        <p className="page-body" style={{ marginTop: 24 }}>
          <Link to="/first-week-nh" className="btn-primary">
            {t('firstWeekLink')}
          </Link>
        </p>
        <p className="page-body">
          <Link to="/" className="event-detail-back">
            ← {t('common.backHome')}
          </Link>
        </p>
      </article>
    </div>
  )
}
