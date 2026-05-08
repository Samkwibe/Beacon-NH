/**
 * Admin UI is always available in local dev.
 * In production builds, set VITE_PUBLIC_ADMIN=true or the /admin URL is not registered.
 */
export function isAdminUiEnabled(): boolean {
  return import.meta.env.DEV || import.meta.env.VITE_PUBLIC_ADMIN === 'true'
}

/**
 * Single URL segment (no slashes). Default "admin".
 * In production, set VITE_ADMIN_ROUTE to a hard-to-guess value so the path is not obvious.
 */
export function getAdminRouteSegment(): string {
  const raw = import.meta.env.VITE_ADMIN_ROUTE?.trim()
  if (!raw) return 'admin'
  const cleaned = raw.replace(/^\/+|\/+$/g, '')
  if (!cleaned || cleaned.includes('/')) return 'admin'
  return cleaned
}
