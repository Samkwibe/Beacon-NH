import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { apiAiAssistant, usesBeaconApi } from '../lib/beaconApi'

export function AiHelper() {
  const { t } = useTranslation()
  const enabled =
    import.meta.env.VITE_AI_HELPER_ENABLED === 'true' || import.meta.env.VITE_AI_HELPER_ENABLED === '1'
  const apiConfigured = usesBeaconApi()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<{ role: 'user' | 'assistant'; text: string }[]>([])
  const [pending, setPending] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines, open])

  if (!enabled) return null

  async function send() {
    const q = input.trim()
    if (!q || pending || !apiConfigured) return
    setInput('')
    setErr(null)
    const nextMsgs = [...lines, { role: 'user' as const, text: q }]
    setLines(nextMsgs)
    setPending(true)
    try {
      const msgs = nextMsgs.map((m) => ({ role: m.role, content: m.text }))
      const reply = await apiAiAssistant(msgs)
      setLines((prev) => [...prev, { role: 'assistant', text: reply || t('ai.serverAiOff') }])
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(t('ai.error'))
      const lower = msg.toLowerCase()
      if (lower.includes('not configured') || lower.includes('openai')) {
        setErr(String(t('ai.serverAiOff')))
      } else {
        setErr(msg)
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="ai-helper">
      <button
        type="button"
        className="ai-helper-fab"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="ai-helper-panel"
        aria-label={String(t('ai.openLabel'))}
      >
        <span aria-hidden>✨</span>
        <span className="ai-helper-fab-text">AI</span>
      </button>

      {open ? (
        <div
          id="ai-helper-panel"
          className="ai-helper-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-helper-title"
        >
          <div className="ai-helper-head">
            <h2 id="ai-helper-title" className="ai-helper-title">
              {t('ai.title')}
            </h2>
            <button type="button" className="ai-helper-close" onClick={() => setOpen(false)} aria-label={String(t('ai.close'))}>
              ✕
            </button>
          </div>
          <p className="ai-helper-disclaimer" role="status">
            {t('ai.disclaimer')}
          </p>
          {!apiConfigured ? (
            <p className="ai-helper-warn" role="status">
              {t('ai.apiMissing')}
            </p>
          ) : null}
          <div className="ai-helper-log" role="log" aria-live="polite" aria-relevant="additions">
            {lines.map((l, i) => (
              <div key={i} className={`ai-helper-msg ai-helper-msg--${l.role}`}>
                {l.text}
              </div>
            ))}
            {pending ? <div className="ai-helper-msg ai-helper-msg--assistant">{t('ai.thinking')}</div> : null}
            <div ref={endRef} />
          </div>
          {err ? (
            <div className="ai-helper-error" role="alert">
              {err}
            </div>
          ) : null}
          <div className="ai-helper-compose">
            <label htmlFor="ai-helper-input" className="sr-only">
              {t('ai.placeholder')}
            </label>
            <textarea
              id="ai-helper-input"
              className="ai-helper-input"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={String(t('ai.placeholder'))}
              disabled={pending || !apiConfigured}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void send()
                }
              }}
            />
            <button type="button" className="btn-primary ai-helper-send" onClick={() => void send()} disabled={pending || !input.trim() || !apiConfigured}>
              {t('ai.send')}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
