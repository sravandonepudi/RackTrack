import './ProductPage.css'
import Reveal from '../components/Reveal'
import twinImage from '../assets/racktrack-3d-twin.png'

const stages = [
  ['Capture', 'Walk the rack with your phone. Upload existing footage, or capture live. Link the scan to an incident, change, or audit - or run it standalone.'],
  ['Verify', 'RackTrack reconciles what it sees with what your network reports. Every device, port, and cable is cross-checked before it becomes inventory.'],
  ['Enrich', 'Verified inventory is enriched with manufacturer specifications, firmware status, and security posture so you get a complete picture, not just a list.'],
]

const capabilities = [
  ['Physical Inventory', 'Every device in every rack, identified by position, vendor, model, and serial. Verified against the live network for accuracy you can defend in an audit.'],
  ['Security Posture', 'Firmware version and known vulnerability status, surfaced per device, in real time. Your security team starts from complete inventory instead of partial coverage.'],
  ['Incident Response', 'Link a scan to an incident and RackTrack pinpoints the target device and port before the responder reaches the rack. Cable-confirmation time collapses to seconds.'],
  ['Capacity Planning', 'Plan new work against measured rack reality. Power, space, and device posture stay tied to what is actually installed.'],
  ['3D Twin', 'Your physical footprint becomes a navigable three-dimensional model. Teams get spatial context without walking the data hall for every question.'],
  ['Compliance Evidence', 'Audit-ready artifacts are generated from verified records. Evidence prep becomes a live workflow instead of a manual scramble.'],
]

function ProductPage() {
  return (
    <section className="page product-page">
      <Reveal className="page-hero">
        <div className="page-hero-copy">
          <div className="page-kicker">Product</div>
          <h1>One scan. Every device. Verified.</h1>
          <p className="page-lede">
            RackTrack turns a smartphone video into a structured, verified model of your
            physical infrastructure - ready to power inventory, security, capacity, and
            compliance from a single source of truth.
          </p>
        </div>
        <div className="hero-visual">
          <img src={twinImage} alt="3D twin of connected data center racks" />
        </div>
      </Reveal>

      <Reveal className="section-band">
        <div className="section-heading">
          <div className="eyebrow">How It Works</div>
          <h2>Three loops, described by outcomes.</h2>
        </div>
        <div className="card-grid three">
          {stages.map(([title, body], index) => (
            <Reveal className="glass-card stage-card" delay={index * 70} key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-band">
        <div className="section-heading">
          <div className="eyebrow">Capabilities</div>
          <h2>Detailed enough for buyers. Protected enough for the moat.</h2>
        </div>
        <div className="card-grid three">
          {capabilities.map(([title, body]) => (
            <div className="glass-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-band split-panel">
        <div className="glass-card">
          <div className="eyebrow">Integrations</div>
          <h2>Works with what you already run.</h2>
        </div>
        <div className="glass-card">
          <p>
            RackTrack pushes verified physical state into your CMDB, DCIM, ITSM, and
            compliance systems. Integrations are available for major platforms, with
            custom integrations supported for your environment.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

export default ProductPage
