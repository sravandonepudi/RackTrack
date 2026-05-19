import './UseCasesPage.css'
import Reveal from '../components/Reveal'

const useCases = [
  {
    role: 'Security & Vulnerability Teams',
    pain: "Your vulnerability management starts from incomplete inventory. Agents do not run on switches, patch panels, or PDUs, and the CMDB lags.",
    outcome: 'Firmware and vulnerability status are surfaced per device against your full physical inventory. Patch priorities become a query, not a spreadsheet exercise.',
    cta: 'Extend vulnerability coverage to the rack',
  },
  {
    role: 'Incident Responders',
    pain: 'The first twenty minutes of every page are spent confirming what is actually in the rack and which cable goes where.',
    outcome: 'Link the scan to the incident and walk in with the rack already characterized. The target device, port, and cable run are pinpointed before you open the cabinet.',
    cta: 'Cut incident pinpoint time',
  },
  {
    role: 'Infrastructure Leaders',
    pain: 'Planning and reporting depend on systems that drift away from the physical estate.',
    outcome: 'RackTrack gives leadership a current physical baseline for investment, migration, and risk decisions.',
    cta: 'Build a verified infrastructure baseline',
  },
  {
    role: 'Network Architects',
    pain: 'Topology diagrams age quickly, while rack reality changes through tickets, swaps, and emergency fixes.',
    outcome: 'Physical position, port context, and topology stay tied to a verified model that teams can search and defend.',
    cta: 'Bring rack truth into network design',
  },
  {
    role: 'Compliance Owners',
    pain: 'Evidence collection turns into screenshots, spreadsheets, and late-night confirmation calls.',
    outcome: 'Audit-ready artifacts are generated from continuously verified physical records.',
    cta: 'Reduce evidence-prep effort',
  },
  {
    role: 'M&A and Migration Teams',
    pain: 'Inherited environments often come with partial documentation and costly unknowns.',
    outcome: 'RackTrack creates a fast physical baseline so teams can plan moves, consolidations, and risk work from measured reality.',
    cta: 'Baseline an unknown data hall',
  },
]

function UseCasesPage() {
  return (
    <section className="page use-cases-page">
      <Reveal className="page-hero compact">
        <div className="page-hero-copy">
          <div className="page-kicker">Use Cases</div>
          <h1>Every team gets a different version of the same truth.</h1>
          <p className="page-lede">
            RackTrack helps each buyer recognize their own pain and move into a
            practical conversation about the rack, the network, and the evidence they need.
          </p>
        </div>
      </Reveal>

      <div className="use-case-list">
        {useCases.map((item, index) => (
          <Reveal className="use-case-row" delay={index * 45} key={item.role}>
            <div>
              <div className="eyebrow">{item.role}</div>
              <h2>{item.role}</h2>
            </div>
            <div className="glass-card">
              <h3>Pain</h3>
              <p>{item.pain}</p>
            </div>
            <div className="glass-card">
              <h3>Outcome with RackTrack</h3>
              <p>{item.outcome}</p>
              <span>{item.cta}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default UseCasesPage
