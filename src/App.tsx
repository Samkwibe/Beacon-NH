import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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
import { Donate } from './components/Donate'
import { Footer } from './components/Footer'
import { FloatingButtons } from './components/FloatingButtons'
import { VoiceRibbon } from './components/VoiceRibbon'
import { PartnerStrip } from './components/PartnerStrip'
import { ImpactStrip } from './components/ImpactStrip'
import { FaqSection } from './components/FaqSection'
import { Dashboard } from './admin/Dashboard'
import { AboutPage } from './pages/AboutPage'
import { EventDetail } from './pages/EventDetail'
import { CommunityDetail } from './pages/CommunityDetail'
import { PrivacyPage } from './pages/PrivacyPage'
import { usePageMeta } from './hooks/usePageMeta'

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
  return (
    <div className="ticker">
      <div className="t-track">
        {[...Array(2)].map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '32px' }}>
            <span className="t-item"><span className="t-star">★</span> Free Housing Support</span>
            <span className="t-item"><span className="t-star">★</span> Immigration Legal Aid</span>
            <span className="t-item"><span className="t-star">★</span> ESOL English Classes</span>
            <span className="t-item"><span className="t-star">★</span> Mental Health Support</span>
            <span className="t-item"><span className="t-star">★</span> NH Food Bank Access</span>
            <span className="t-item"><span className="t-star">★</span> Employment Services</span>
            <span className="t-item"><span className="t-star">★</span> 10 Languages Supported</span>
            <span className="t-item"><span className="t-star">★</span> 100% Confidential & Free</span>
            <span className="t-item"><span className="t-star">★</span> Manchester, NH Community</span>
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

function DonatePage() {
  usePageMeta(
    'Donate',
    'Support Beacon NH — tax-deductible donations sustain free programs for refugee families in Manchester.',
  )
  return (
    <div className="page-with-nav">
      <Donate />
    </div>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <FloatingButtons />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/communities/:id" element={<CommunityDetail />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      <Footer />
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
