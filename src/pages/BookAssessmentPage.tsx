import './BookAssessmentPage.css'
import Reveal from '../components/Reveal'

const paths = [
  ['Sales', 'Calendar link for qualified buyers'],
  ['Partnerships', 'Design partner and channel inquiries'],
  ['Security & Compliance', 'Procurement and vendor security review requests'],
  ['General', 'Everything else'],
]

function BookAssessmentPage() {
  return (
    <section className="page book-assessment-page">
      <Reveal className="page-hero compact assessment-hero">
        <div className="page-hero-copy">
          <div className="page-kicker">Book Assessment</div>
          <h1>Twenty minutes. One rack. Verified.</h1>
          <p className="page-lede">
            We will run a baseline assessment against a single rack or row in your
            environment. The output is a side-by-side of what your CMDB says, what your
            network reports, and what RackTrack actually finds.
          </p>
          <div className="cta-row">
            <a className="button-link primary" href="mailto:sales@racktrack.ai">Book a baseline assessment</a>
            <a className="button-link" href="mailto:security@racktrack.ai">Security review</a>
          </div>
        </div>
      </Reveal>

      <Reveal className="section-band card-grid four contact-grid">
        {paths.map(([title, body]) => (
          <div className="glass-card" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

export default BookAssessmentPage
