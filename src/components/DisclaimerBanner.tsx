import { useTranslation } from 'react-i18next'

type Props = {
  /** Emphasize legal vs health wording */
  variant?: 'default' | 'legal' | 'health'
  className?: string
}

export function DisclaimerBanner({ variant = 'default', className = '' }: Props) {
  const { t } = useTranslation()
  const key =
    variant === 'legal'
      ? 'common.disclaimerLegal'
      : variant === 'health'
        ? 'common.disclaimerHealth'
        : 'common.disclaimerGeneral'
  return (
    <aside
      className={`disclaimer-banner ${className}`.trim()}
      role="note"
      aria-label={String(t('common.disclaimerAria'))}
    >
      <p className="disclaimer-banner-text">{t(key)}</p>
    </aside>
  )
}
