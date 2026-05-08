import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import { Dashboard } from './admin/Dashboard'
import { AboutPage } from './pages/AboutPage'
import { EventDetail } from './pages/EventDetail'
import { CommunityDetail } from './pages/CommunityDetail'

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
  return (
    <>
      <Hero />
      <Ticker />
      <QuickHelp />
      <About />
    </>
  )
}

function App() {
  return (
    <Router>
      <FloatingButtons />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/communities/:id" element={<CommunityDetail />} />
        <Route path="/services" element={<><Services /><QuickHelp /></>} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/events" element={<><Events /><Languages /><ResourcesMap /></>} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
