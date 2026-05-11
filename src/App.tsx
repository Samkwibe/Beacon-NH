import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { QuickHelp } from './components/QuickHelp'
import { About } from './components/About'
import { Communities } from './components/Communities'
import { Services } from './components/Services'
import { Stories } from './components/Stories'
import { Events } from './components/Events'
import { Languages } from './components/Languages'
import { ResourcesMap } from './components/ResourcesMap'
import { SupportCommunity } from './components/SupportCommunity'
import { Footer } from './components/Footer'
import { FloatingButtons } from './components/FloatingButtons'
import { VoiceRibbon } from './components/VoiceRibbon'
import { PartnerStrip } from './components/PartnerStrip'
import { ImpactStrip } from './components/ImpactStrip'
import { IineSpotlight } from './components/IineSpotlight'
import { FaqSection } from './components/FaqSection'
import { Dashboard } from './admin/Dashboard'
import { AboutPage } from './pages/AboutPage'
import { EventDetail } from './pages/EventDetail'
import { CommunityDetail } from './pages/CommunityDetail'
import { PrivacyPage } from './pages/PrivacyPage'
import { FirstWeekInNH } from './pages/FirstWeekInNH'
import { KnowYourRights } from './pages/KnowYourRights'
import { SkipToMain } from './components/SkipToMain'
import { PolicyAlertBar } from './components/PolicyAlertBar'
import { AiHelper } from './components/AiHelper'
import { usePageMeta } from './hooks/usePageMeta'
import { getAdminRouteSegment, isAdminUiEnabled } from './lib/adminRoute'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [pathname, hash])
  return null
}

function Ticker() {
  const items = [
    { star: '★', text: '211 NH — information & referral (24/7)' },
    { star: '★', text: '988 — Suicide & Crisis Lifeline' },
    { star: '★', text: '603 Legal Aid — civil legal screening' },
    { star: '★', text: 'NH DHHS — U.S. Refugee Admissions Program (NH)' },
    { star: '★', text: 'Events on this site — from your admin / API / Firestore' },
    { star: '★', text: 'IINE — Manchester resettlement, ESOL, LNA training, Language Services HQ' },
    { star: '★', text: 'Ascentria & IINE — NH’s federally funded resettlement affiliates (per DHHS)' },
    { star: '★', text: 'NH Legal Assistance — Manchester office (603) 668-2900' },
    { star: '★', text: 'Not an emergency service — call 911 for emergencies' },
  ]
  return (
    <div className="ticker">
      <div className="t-track">
        {[...Array(2)].map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '32px' }}>
            {items.map((item) => (
              <span key={`${i}-${item.text}`} className="t-item">
                <span className="t-star">{item.star}</span> {item.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function HomePage() {
  usePageMeta(
    'Home',
    'Beacon NH connects refugees and asylum seekers with free housing help, legal aid, ESOL, and community in Manchester, NH.',
  )
  return (
    <>
      <Hero />
      <Ticker />
      <VoiceRibbon />
      <QuickHelp />
      <PartnerStrip />
      <IineSpotlight />
      <About />
      <ImpactStrip />
    </>
  )
}

function ServicesPage() {
  usePageMeta(
    'Services',
    'Free housing, legal, education, employment, mental health, and food support — multilingual and confidential in Manchester, NH.',
  )
  return (
    <div className="page-with-nav">
      <Services />
      <div className="page-band page-band--faq">
        <FaqSection />
      </div>
      <QuickHelp />
    </div>
  )
}

function EventsPage() {
  usePageMeta(
    'Events',
    'Free upcoming workshops, meals, legal clinics, and community gatherings in Manchester, NH.',
  )
  return (
    <div className="page-with-nav">
      <Events />
      <Languages />
      <ResourcesMap />
    </div>
  )
}

function SupportPage() {
  usePageMeta(
    'Support',
    'Give through verified New Hampshire nonprofits with real fiscal sponsors — resettlement, food security, civil legal access, and more.',
  )
  return (
    <div className="page-with-nav">
      <SupportCommunity />
    </div>
  )
}

const adminPathSegment = getAdminRouteSegment()

function AppRoutes() {
  const adminUiOn = isAdminUiEnabled()
  return (
    <>
      <SkipToMain />
      <PolicyAlertBar />
      <ScrollToTop />
      <FloatingButtons />
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/communities/:id" element={<CommunityDetail />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/donate" element={<Navigate to="/support" replace />} />
          <Route path="/first-week-nh" element={<FirstWeekInNH />} />
          <Route path="/know-your-rights" element={<KnowYourRights />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          {adminUiOn ? (
            <Route path={adminPathSegment} element={<Dashboard />} />
          ) : null}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <AiHelper />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
