import { useState } from 'react'

type Item = { q: string; a: string }

const FAQ_ITEMS: Item[] = [
  {
    q: 'Do I need an appointment?',
    a: 'No for emergencies — dial 211 or use our crisis buttons on this site. For ongoing housing, legal, or intake visits, we help you schedule once we understand your situation.',
  },
  {
    q: 'Are services really free?',
    a: 'Yes. Beacon NH programs listed here are free and confidential. External agencies (e.g. courts, landlords) may have their own processes — we explain those clearly.',
  },
  {
    q: 'Which languages do you support?',
    a: 'Staff and volunteers cover 10+ languages including Arabic, Somali, Dari/Pashto, French, Ukrainian, Swahili, and more. Ask for an interpreter anytime.',
  },
  {
    q: 'What if I am undocumented?',
    a: 'We connect people to legal advocates who can explain options in private. We never share your story without consent except where required by law.',
  },
  {
    q: 'How fast is housing help?',
    a: 'Emergency pathways vary by availability and eligibility. We prioritize safety first — same-day referrals when possible through NH networks.',
  },
  {
    q: 'Where are programs held?',
    a: 'Most workshops and clinics rotate across Manchester-area partner sites. Check the events calendar for addresses and accessibility notes.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="section-header">
        <div className="s-eyebrow">
          <div className="s-line" />
          <span className="s-eye">FAQ</span>
        </div>
        <h2 id="faq-heading" className="s-title">
          Questions We Hear <em>Often</em>
        </h2>
        <p className="s-sub">
          Straight answers about access, privacy, and timing. Still unsure? Reach out through Contact / Support in the footer.
        </p>
      </div>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => {
          const open = openIndex === i
          return (
            <div key={item.q} className={`faq-item ${open ? 'faq-item--open' : ''}`}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq-chevron" aria-hidden>
                  {open ? '−' : '+'}
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                className="faq-a-wrap"
                aria-hidden={!open}
              >
                <p className="faq-a">{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
