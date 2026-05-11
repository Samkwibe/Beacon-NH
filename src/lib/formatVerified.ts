/** `YYYY-MM` from data → screen reader–friendly label */
export function formatVerifiedMonth(ym: string): string {
  const [y, m] = ym.split('-').map(Number)
  if (!y || !m) return ym
  const d = new Date(Date.UTC(y, m - 1, 1))
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}
