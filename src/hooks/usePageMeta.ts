import { useEffect } from 'react'

const BASE = 'Beacon NH'

function upsertMeta(selectors: { attr: string; value: string }, content: string) {
  const sel =
    selectors.attr === 'name'
      ? `meta[name="${selectors.value}"]`
      : `meta[property="${selectors.value}"]`
  let el = document.querySelector<HTMLMetaElement>(sel)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(selectors.attr, selectors.value)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle =
      title === BASE || title === 'Home'
        ? `${BASE} — Refugee Community Hub · Manchester, NH`
        : `${title} · ${BASE}`
    document.title = fullTitle

    upsertMeta({ attr: 'property', value: 'og:title' }, fullTitle)

    if (!description) return
    upsertMeta({ attr: 'name', value: 'description' }, description)
    upsertMeta({ attr: 'property', value: 'og:description' }, description)
    upsertMeta({ attr: 'name', value: 'twitter:card' }, 'summary_large_image')
  }, [title, description])
}
