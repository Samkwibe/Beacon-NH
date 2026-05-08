import { About } from '../components/About'
import { usePageMeta } from '../hooks/usePageMeta'

export function AboutPage() {
  usePageMeta(
    'About',
    'Beacon NH is Manchester NH\'s multilingual hub for refugee and asylum-seeking families — dignity-first support since 2020.',
  )

  return (
    <div className="page-with-nav">
      <div className="page-shell page-shell--narrow page-shell--muted">
        <h1 className="page-title">About Beacon NH</h1>
        <p className="page-lead">
          Beacon NH was founded in 2020 by a coalition of local community leaders, former refugees,
          and human rights advocates in Manchester, NH. Our mission is to provide an unconditional
          safety net and vibrant community hub for all those fleeing war, persecution, and climate
          disasters.
        </p>
        <h2 className="page-subtitle">Our core philosophy</h2>
        <p className="page-body">
          We believe that integration should not mean losing one&apos;s cultural identity. By
          providing services in over ten native languages, we ensure that every newly arrived family
          feels respect from their very first day in New Hampshire.
        </p>
        <h2 className="page-subtitle">Our team</h2>
        <div className="about-cards">
          <div className="about-card">
            <h3 className="about-card-name">Maria K.</h3>
            <div className="about-card-role">Executive Director</div>
            <p className="about-card-desc">
              Former asylum seeker from Colombia; leads Beacon NH&apos;s strategic vision.
            </p>
          </div>
          <div className="about-card">
            <h3 className="about-card-name">Dr. Ahmed S.</h3>
            <div className="about-card-role">Director of Wellbeing</div>
            <p className="about-card-desc">
              Trauma-informed care and culturally sensitive mental health programs.
            </p>
          </div>
        </div>
      </div>
      <About />
    </div>
  )
}
