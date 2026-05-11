import { useParams, Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import { getCommunity, communityHubGradient, type CommunityUpdate } from '../data/communitiesCatalog'
import { CommunityChat } from '../components/CommunityChat'
import { CommunityMemberNav } from '../components/CommunityMemberNav'
import { NhVerifiedResources } from '../components/NhVerifiedResources'
import { useCommunityAnnouncements } from '../hooks/useCommunityAnnouncements'

type HubTab = 'about' | 'updates' | 'chat'

export function CommunityDetail() {
  const { id } = useParams()
  const comm = getCommunity(id)
  const [tab, setTab] = useState<HubTab>('about')

  usePageMeta(
    comm?.name ?? 'Community',
    comm?.fullDesc ?? 'Learn about refugee-led communities connected with Beacon NH in Manchester.',
  )

  const { rows: liveAnnouncements, loading: annLoading, error: annError } = useCommunityAnnouncements(comm?.id)

  type MergedUpdate = CommunityUpdate & { kind?: 'news' | 'event' }

  const mergedUpdates: MergedUpdate[] = useMemo(() => {
    if (!comm) return []
    const fromLive: MergedUpdate[] = liveAnnouncements.map((a) => ({
      title: a.title,
      body: a.body,
      date: a.date,
      kind: a.kind,
    }))
    const fromCatalog: MergedUpdate[] = comm.updates.map((u) => ({ ...u }))
    const sortKey = (d: string) => {
      const t = Date.parse(d)
      return Number.isFinite(t) ? t : 0
    }
    return [...fromLive, ...fromCatalog].sort((a, b) => sortKey(b.date) - sortKey(a.date))
  }, [liveAnnouncements, comm])

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
        <div
          className="community-detail-hero-bg"
          style={{ background: communityHubGradient(comm.id) }}
          aria-hidden
        />
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
                id={`hub-tab-${key}`}
                type="button"
                role="tab"
                aria-selected={tab === key}
                aria-controls={`hub-panel-${key}`}
                tabIndex={tab === key ? 0 : -1}
                className={`community-hub-tab ${tab === key ? 'community-hub-tab--on' : ''}`}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'about' ? (
            <div
              id="hub-panel-about"
              role="tabpanel"
              aria-labelledby="hub-tab-about"
              tabIndex={0}
              className="community-hub-panel"
            >
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
                  <Link className="btn-primary community-detail-cta" to="/support">
                    Support Beacon NH
                  </Link>
                )}
                <Link className="community-detail-cta-secondary" to="/">
                  Get help
                </Link>
              </div>
            </div>
          ) : null}

          {tab === 'updates' ? (
            <div
              id="hub-panel-updates"
              role="tabpanel"
              aria-labelledby="hub-tab-updates"
              tabIndex={0}
              className="community-hub-panel community-panel community-updates"
            >
              <NhVerifiedResources compact />
              <p className="community-updates-live-note">
                Official posts from partner accounts appear below together with any items we have confirmed in our static
                catalog. For informal questions, use the Discussion tab.
              </p>
              {annError ? (
                <div className="community-chat-error" role="alert">
                  Could not load live updates: {annError}
                </div>
              ) : null}
              {annLoading && mergedUpdates.length === 0 ? (
                <p className="community-panel-note">Loading updates…</p>
              ) : null}
              <p className="community-updates-lead">
                Community-specific posts are only added when we have confirmed details from organizers.
                Have something to share? Use the{' '}
                <button type="button" className="community-inline-link" onClick={() => setTab('chat')}>
                  Discussion
                </button>{' '}
                tab when it is open, or use the sidebar links.
              </p>
              {mergedUpdates.length ? (
                <ul className="community-updates-list">
                  {mergedUpdates.map((u, i) => (
                    <li key={`${u.date}-${u.title}-${i}`} className="community-update-card">
                      <div className="community-update-meta">
                        <time dateTime={u.date}>{format_update_date(u.date)}</time>
                        {u.kind === 'event' ? (
                          <span className="community-update-badge community-update-badge--event">Event</span>
                        ) : u.kind === 'news' ? (
                          <span className="community-update-badge">News</span>
                        ) : null}
                      </div>
                      <h3 className="community-update-title">{u.title}</h3>
                      <p className="community-update-body">{u.body}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="community-updates-empty">
                  No dated announcements are on file here yet. Everyday coordination belongs in Discussion;
                  urgent needs belong with the helplines above, not on the board.
                </p>
              )}
            </div>
          ) : null}

          {tab === 'chat' ? (
            <div
              id="hub-panel-chat"
              role="tabpanel"
              aria-labelledby="hub-tab-chat"
              tabIndex={0}
              className="community-hub-panel"
            >
              <CommunityChat
                communityId={comm.id}
                communityLabel={comm.name}
                conversationStarters={comm.conversationStarters}
              />
            </div>
          ) : null}
        </div>

        <aside className="community-detail-aside">
          <CommunityMemberNav contactEmail={contactEmail} />
        </aside>
      </div>
    </article>
  )
}
