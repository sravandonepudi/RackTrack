import './CompanyPage.css'
import Reveal from '../components/Reveal'

function CompanyPage() {
  return (
    <section className="page company-page">
      <Reveal className="page-hero compact">
        <div className="page-hero-copy">
          <div className="page-kicker">Company</div>
          <h1>Built for the people who need physical truth at 2 a.m.</h1>
          <p className="page-lede">
            After years of running enterprise systems at scale, the same wall kept
            appearing: every system above the rack assumed the rack matched the record,
            and no system could prove it.
          </p>
        </div>
      </Reveal>

      <Reveal className="section-band split-panel">
        <div className="glass-card">
          <div className="eyebrow">Why We Built RackTrack</div>
          <h2>From record keeping to evidence-grade infrastructure.</h2>
        </div>
        <div className="glass-card">
          <p>
            RackTrack started as the answer to a question every infrastructure leader has
            asked during an incident: what is actually in that rack right now? We are
            building toward a world where physical infrastructure is not a stale
            spreadsheet, a remembered diagram, or a manual audit. It is a continuously
            verified layer that teams can trust for inventory, security, compliance,
            capacity, and change.
          </p>
        </div>
      </Reveal>

      <Reveal className="section-band">
        <div className="section-heading">
          <div className="eyebrow">Team</div>
          <h2>Enterprise systems, networking depth, and product conviction.</h2>
          <p>
            RackTrack is led by operators and builders with enterprise architecture,
            platform integration, networking, and infrastructure experience. The company
            is shaped around one principle: show buyers the outcome, protect the method,
            and make the product defensible where the consequences are real.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

export default CompanyPage
