import { useTranslation } from 'react-i18next'

export function SkipToMain() {
  const { t } = useTranslation()
  return (
    <a href="#main-content" className="skip-link">
      {t('common.skipToMain')}
    </a>
  )
}
