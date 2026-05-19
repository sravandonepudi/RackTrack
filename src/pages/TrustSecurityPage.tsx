import './TrustSecurityPage.css'
import Reveal from '../components/Reveal'

const posture = [
  'SOC 2 Type II readiness stated honestly as the program progresses',
  'Tenant isolation and customer-controlled data residency',
  'Encryption in transit and at rest',
  'Customer-controlled credential vaulting',
  'Role-based access control and audit logging',
]

const deployments = [
  'Cloud-hosted',
  'Private cloud / customer VPC',
  'On-premise deployment for regulated environments',
  'Air-gapped deployment for classified or restricted facilities',
]

function TrustSecurityPage() {
  return (
    <section className="page trust-security-page">
      <Reveal className="page-hero compact">
        <div className="page-hero-copy">
          <div className="page-kicker">Trust & Security</div>
          <h1>Your video, your control.</h1>
          <p className="page-lede">
            Rack video is processed in your tenant, structured into device and topology
            records, and retained per your data residency policy. The raw footage is yours:
            delete it, retain it as evidence, or keep it for re-processing as the platform improves.
          </p>
        </div>
      </Reveal>

      <Reveal className="section-band card-grid two">
        <div className="glass-card">
          <div className="eyebrow">Security Posture</div>
          <h2>Enterprise signals buyers expect.</h2>
          <ul>
            {posture.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="glass-card">
          <div className="eyebrow">Deployment</div>
          <h2>Flexible enough for regulated environments.</h2>
          <ul>
            {deployments.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

export default TrustSecurityPage
