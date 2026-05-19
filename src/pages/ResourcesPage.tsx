import './ResourcesPage.css'
import Reveal from '../components/Reveal'

const gated = [
  ['ROI Calculator', 'Interactive sensitivity model behind the $1M-$2.5M annual value claim.'],
  ["Buyer's Guide to Physical Intelligence", 'A category-defining whitepaper for infrastructure leaders.'],
  ['Compliance Mapping', 'How RackTrack outputs map to SOC 2, ISO 27001, HIPAA, and PCI-DSS Requirement 9.'],
  ['Integration Reference', 'A high-level overview of how RackTrack fits into CMDB, DCIM, ITSM, and compliance stacks.'],
  ['Case Studies', 'Design partner stories as approvals become available.'],
]

const publicTopics = [
  'The cost of CMDB drift',
  'Failure modes of manual rack audits',
  'The case for evidence-grade inventory',
  'Why physical intelligence belongs below DCIM',
]

function ResourcesPage() {
  return (
    <section className="page resources-page">
      <Reveal className="page-hero compact">
        <div className="page-hero-copy">
          <div className="page-kicker">Resources</div>
          <h1>Useful enough to trade an email for. Careful enough to protect the moat.</h1>
          <p className="page-lede">
            RackTrack resources help qualified buyers understand the category, model the
            value, and prepare for procurement without publishing architecture, data-source
            detail, or product methods.
          </p>
        </div>
      </Reveal>

      <Reveal className="section-band">
        <div className="section-heading">
          <div className="eyebrow">Gated Assets</div>
          <h2>High-value documents for serious buyers.</h2>
        </div>
        <div className="card-grid three">
          {gated.map(([title, body]) => (
            <div className="glass-card resource-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
              <span>Request access</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-band split-panel">
        <div className="glass-card">
          <div className="eyebrow">Public Content</div>
          <h2>Category-level thought leadership.</h2>
        </div>
        <div className="glass-card">
          <ul>
            {publicTopics.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

export default ResourcesPage
