const PARTNERS: { name: string; href: string }[] = [
  { name: '211 NH (Granite United Way)', href: 'https://211nh.org' },
  { name: 'NH Legal Assistance', href: 'https://www.nhla.org' },
  { name: '603 Legal Aid', href: 'https://www.603legalaid.org' },
  { name: 'NH Food Bank', href: 'https://www.nhfoodbank.org' },
  { name: 'International Institute of New England', href: 'https://iine.org' },
  { name: 'Ascentria Care Alliance', href: 'https://www.ascentria.org' },
]

export function PartnerStrip() {
  return (
    <section className="partner-strip" aria-label="Partners and referrals">
      <p className="partner-strip-label">We highlight agencies you can verify — not a substitute for 911 or the ER.</p>
      <ul className="partner-chips">
        {PARTNERS.map(({ name, href }) => (
          <li key={name} className="partner-chip">
            <a href={href} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
