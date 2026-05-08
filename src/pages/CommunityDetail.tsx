import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import { getCommunity } from '../data/communitiesCatalog'
import { CommunityChat } from '../components/CommunityChat'
import { CommunityMemberNav } from '../components/CommunityMemberNav'

type HubTab = 'about' | 'updates' | 'chat'

export function CommunityDetail() {
  const { id } = useParams()
  const comm = getCommunity(id)
  const [tab, setTab] = useState<HubTab>('about')

  usePageMeta(
    comm?.name ?? 'Community',
    comm?.fullDesc ?? 'Learn about refugee-led communities connected with Beacon NH in Manchester.',
  )

  if (!comm) {
    return (
      <div className="page-shell page-with-nav page-shell--narrow">
        <div className="page-empty">Community not found.</div>
        <Link to="/communities" className="event-detail-back">
          ← Back to Communities
        </Link>
      </div>
    )
  }

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim()

  const format_update_date = (d: string) => {
    const t = Date.parse(d)
    if (Number.isNaN(t)) return d
    return new Date(t).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <article className="community-detail page-with-nav">
      <div className="community-detail-hero">
        <img src={comm.img} alt={comm.name} />
        <div className="community-detail-hero-grad" />
        <div className="community-detail-hero-text">
          <div className="community-detail-flag" aria-hidden>
            {comm.flag}
          </div>
          <h1 className="community-detail-title">{comm.name}</h1>
          <p className="community-detail-hub-tag">
            Your space for news, questions, and meeting neighbors — free and confidential through Beacon NH.
          </p>
        </div>
      </div>

      <div className="community-detail-shell">
        <div className="community-detail-main">
          <Link to="/communities" className="event-detail-back community-detail-back">
            ← All communities
          </Link>

          <div className="community-hub-tabs" role="tablist" aria-label="Community hub sections">
            {(
              [
                ['about', 'About'] as const,
                ['updates', 'Updates'] as const,
                ['chat', 'Discussion'] as const,
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                className={`community-hub-tab ${tab === key ? 'community-hub-tab--on' : ''}`}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'about' ? (
            <>
              <p className="community-detail-desc">{comm.fullDesc}</p>
              <div className="community-highlights">
                <h2 className="community-highlights-title">Tips for this community</h2>
                <ul className="community-highlights-list">
                  {comm.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
              <h2 className="community-detail-h2">Get involved</h2>
              <p className="community-detail-lead">
                If you are part of this community and need assistance — or you want to volunteer —
                reach out. We can connect you with leaders and programs.
              </p>
              <div className="community-detail-cta-row">
                {contactEmail ? (
                  <a className="btn-primary community-detail-cta" href={`mailto:${contactEmail}`}>
                    Email Beacon NH
                  </a>
                ) : (
                  <Link className="btn-primary community-detail-cta" to="/donate">
                    Support Beacon NH
                  </Link>
                )}
                <Link className="community-detail-cta-secondary" to="/">
                  Get help
                </Link>
              </div>
            </>
          ) : null}

          {tab === 'updates' ? (
            <div className="community-panel community-updates">
              <p className="community-updates-lead">
                Short updates for this network. Have something to share? Use the{' '}
                <button type="button" className="community-inline-link" onClick={() => setTab('chat')}>
                  Discussion
                </button>{' '}
                tab when it is open, or reach us through the links on the side.
              </p>
              <ul className="community-updates-list">
                {comm.updates.map((u, i) => (
                  <li key={i} className="community-update-card">
                    <div className="community-update-meta">
                      <time dateTime={u.date}>{format_update_date(u.date)}</time>
                    </div>
                    <h3 className="community-update-title">{u.title}</h3>
                    <p className="community-update-body">{u.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {tab === 'chat' ? (
            <CommunityChat
              communityId={comm.id}
              communityLabel={comm.name}
              conversationStarters={comm.conversationStarters}
            />
          ) : null}
        </div>

        <aside className="community-detail-aside">
          <CommunityMemberNav contactEmail={contactEmail} />
        </aside>
      </div>
    </article>
  )
}
