import { useState } from 'react'

const policyMessage = ((import.meta.env.VITE_POLICY_ALERT as string | undefined) ?? '').trim()
const policyUntilRaw = ((import.meta.env.VITE_POLICY_ALERT_UNTIL as string | undefined) ?? '').trim()

/**
 * Set VITE_POLICY_ALERT (plain text) and optional VITE_POLICY_ALERT_UNTIL (ISO date YYYY-MM-DD).
 * Bar hides automatically after that date (local midnight).
 */
export function PolicyAlertBar() {
  const [dismissed, setDismissed] = useState(() =>
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('beacon_policy_alert_dismiss') === '1'
      : false,
  )

  const [expired] = useState(() => {
    if (!policyUntilRaw) return false
    const end = Date.parse(policyUntilRaw + 'T23:59:59')
    return Number.isFinite(end) && Date.now() > end
  })

  if (!policyMessage || expired || dismissed) return null

  function dismiss() {
    try {
      sessionStorage.setItem('beacon_policy_alert_dismiss', '1')
    } catch {
      /* ignore */
    }
    setDismissed(true)
  }

  return (
    <div className="policy-alert-bar" role="region" aria-label="Important site notice">
      <div className="policy-alert-inner">
        <span className="policy-alert-icon" aria-hidden>
          ⚠️
        </span>
        <p className="policy-alert-text">{policyMessage}</p>
        <button type="button" className="policy-alert-dismiss" onClick={dismiss} aria-label="Dismiss this notice">
          ✕
        </button>
      </div>
    </div>
  )
}
