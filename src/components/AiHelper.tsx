import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { apiAiAssistant, usesBeaconApi } from '../lib/beaconApi'

const QUICK_KEYS = ['chip211', 'chipHousing', 'chipEnglish', 'chipFood', 'chipLegal'] as const

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
      setLines((prev) => [...prev, { role: 'assistant', text: reply || String(t('ai.serverAiOff')) }])
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(t('ai.error'))
      const lower = msg.toLowerCase()
      if (
        lower.includes('not configured') ||
        lower.includes('openai') ||
        lower.includes('gemini') ||
        lower.includes('google')
      ) {
        setErr(String(t('ai.serverAiOff')))
      } else {
        setErr(msg)
      }
    } finally {
      setPending(false)
    }
  }

  function applyQuickPrompt(key: (typeof QUICK_KEYS)[number]) {
    const text = String(t(`ai.${key}`))
    setInput(text)
    setErr(null)
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
        <span className="ai-helper-fab-glow" aria-hidden />
        <span className="ai-helper-fab-icon" aria-hidden>
          ✦
        </span>
        <span className="ai-helper-fab-text">{t('ai.title')}</span>
      </button>

      {open ? (
        <div
          id="ai-helper-panel"
          className="ai-helper-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-helper-title"
          aria-describedby="ai-helper-subtitle"
        >
          <div className="ai-helper-head">
            <div className="ai-helper-head-text">
              <h2 id="ai-helper-title" className="ai-helper-title">
                {t('ai.title')}
              </h2>
              <p id="ai-helper-subtitle" className="ai-helper-subtitle">
                {t('ai.subtitle')}
              </p>
            </div>
            <button
              type="button"
              className="ai-helper-close"
              onClick={() => setOpen(false)}
              aria-label={String(t('ai.close'))}
            >
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
          <div className="ai-helper-chips" role="group" aria-label="Quick questions">
            {QUICK_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className="ai-helper-chip"
                disabled={!apiConfigured || pending}
                onClick={() => applyQuickPrompt(key)}
              >
                {t(`ai.${key}`)}
              </button>
            ))}
          </div>
          <div className="ai-helper-toolbar">
            <button
              type="button"
              className="ai-helper-clear"
              disabled={lines.length === 0 && !input}
              onClick={() => {
                setLines([])
                setInput('')
                setErr(null)
              }}
            >
              {t('ai.clearChat')}
            </button>
          </div>
          <div className="ai-helper-log" role="log" aria-live="polite" aria-relevant="additions">
            {lines.length === 0 && !pending ? <p className="ai-helper-empty">{t('ai.emptyHint')}</p> : null}
            {lines.map((l, i) => (
              <div key={i} className={`ai-helper-msg ai-helper-msg--${l.role}`}>
                <span className="ai-helper-msg-label" aria-hidden>
                  {l.role === 'user' ? 'You' : 'Guide'}
                </span>
                <div className="ai-helper-msg-body">{l.text}</div>
              </div>
            ))}
            {pending ? (
              <div className="ai-helper-msg ai-helper-msg--assistant ai-helper-msg--pending">
                <span className="ai-helper-msg-label" aria-hidden>
                  Guide
                </span>
                <div className="ai-helper-msg-body ai-helper-thinking">
                  <span className="ai-helper-dot" />
                  <span className="ai-helper-dot" />
                  <span className="ai-helper-dot" />
                  <span className="ai-helper-thinking-text">{t('ai.thinking')}</span>
                </div>
              </div>
            ) : null}
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
            <button
              type="button"
              className="ai-helper-send btn-primary"
              onClick={() => void send()}
              disabled={pending || !input.trim() || !apiConfigured}
            >
              {t('ai.send')}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
