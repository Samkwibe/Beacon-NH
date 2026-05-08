import { Link } from 'react-router-dom'

const nav_class = 'community-member-nav-link'

type Props = {
  contactEmail?: string
}

/**
 * Quick links that matter for people using a community hub (help, services, events, contact).
 */
export function CommunityMemberNav({ contactEmail }: Props) {
  return (
    <nav className="community-member-nav" aria-label="Helpful links for this community">
      <p className="community-member-nav-title">Helpful links</p>
      <ul className="community-member-nav-list">
        <li>
          <Link className={nav_class} to="/">
            Get help now
          </Link>
        </li>
        <li>
          <Link className={nav_class} to="/services">
            Free services &amp; FAQ
          </Link>
        </li>
        <li>
          <Link className={nav_class} to="/events">
            Events calendar
          </Link>
        </li>
        <li>
          <Link className={nav_class} to="/stories">
            Community stories
          </Link>
        </li>
        <li>
          <Link className={nav_class} to="/communities">
            All communities
          </Link>
        </li>
        <li>
          <Link className={nav_class} to="/donate">
            Support Beacon NH
          </Link>
        </li>
        {contactEmail ? (
          <li>
            <a className={nav_class} href={`mailto:${contactEmail}`}>
              Email Beacon NH
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
