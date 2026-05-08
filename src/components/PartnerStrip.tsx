const PARTNERS = [
  'NH 211',
  'NH Legal Assistance',
  'NH Food Bank',
  'Multicultural coalition partners',
  'Faith & civic volunteer networks',
]

export function PartnerStrip() {
  return (
    <section className="partner-strip" aria-label="Partners and referrals">
      <p className="partner-strip-label">We coordinate with NH agencies & neighbors — not a replacement for 911 or clinical ER care.</p>
      <ul className="partner-chips">
        {PARTNERS.map((name) => (
          <li key={name} className="partner-chip">
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}
