import './WhyRackTrackPage.css'
import Reveal from '../components/Reveal'

const rows = [
  ['RackTrack', 'Yes', 'Yes', 'Yes'],
  ['DCIM platforms', 'Partial', 'Partial', '-'],
  ['Network discovery tools', '-', 'Yes', 'Partial'],
  ['Manual rack audits', 'Yes', '-', '-'],
]

function WhyRackTrackPage() {
  return (
    <section className="page why-racktrack-page">
      <Reveal className="page-hero compact">
        <div className="page-hero-copy">
          <div className="page-kicker">Why RackTrack</div>
          <h1>Three things every infrastructure tool does. Only one does all three.</h1>
          <p className="page-lede">
            Existing tools sense the rack, read from the network, or track vendor and
            security data. RackTrack does all three in the same pass and reconciles them
            into output that is trustworthy enough for audits, fast enough for incidents,
            and complete enough for planning.
          </p>
        </div>
      </Reveal>

      <Reveal className="section-band">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Sense the rack</th>
              <th>Verify against the network</th>
              <th>Enrich with vendor and security data</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, sense, verify, enrich]) => (
              <tr key={name}>
                <td>{name}</td>
                <td className={sense === 'Yes' ? 'check' : ''}>{sense}</td>
                <td className={verify === 'Yes' ? 'check' : ''}>{verify}</td>
                <td className={enrich === 'Yes' ? 'check' : ''}>{enrich}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal className="section-band split-panel">
        <div className="glass-card">
          <div className="eyebrow">Evidence Grade</div>
          <h2>Built to be trusted by the people who carry the consequences.</h2>
        </div>
        <div className="glass-card">
          <p>
            Every data point in RackTrack is traceable to its source. Every device
            identification is verifiable against the live network. Every change is
            timestamped. Compliance owners, security teams, and on-call engineers do not
            need another dashboard - they need data they can defend.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

export default WhyRackTrackPage
