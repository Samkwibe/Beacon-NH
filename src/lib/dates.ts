/** Parse YYYY-MM-DD as a calendar date in the user's local timezone (avoids UTC off-by-one). */
export function parseCalendarDate(isoDate: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim())
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2]) - 1
  const d = Number(m[3])
  const dt = new Date(y, mo, d)
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null
  return dt
}

export function calendarDayMonth(isoDate: string): { day: number; monthShort: string } {
  const dt = parseCalendarDate(isoDate) ?? new Date(NaN)
  if (Number.isNaN(dt.getTime())) {
    return { day: 0, monthShort: '—' }
  }
  return {
    day: dt.getDate(),
    monthShort: dt.toLocaleString(undefined, { month: 'short' }),
  }
}

export function formatLongDate(isoDate: string): string {
  const dt = parseCalendarDate(isoDate)
  if (!dt) return isoDate
  return dt.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
