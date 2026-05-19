import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'
import Reveal from '../components/Reveal'
import heroScan from '../assets/racktrack-hero-scan.png'
import twinImage from '../assets/racktrack-3d-twin.png'

const homeMetadata = {
  title: 'RackTrack - Physical Intelligence Layer',
  description:
    'Point your phone at the rack. Get a network you can trust. Verified inventory, port-level topology, and compliance evidence from a smartphone sweep.',
}

const problems = [
  ['Inventory drift', 'CMDB records, switch telemetry, and the real rack slowly separate until every audit starts with uncertainty.'],
  ['Slow incident work', 'Responders lose time proving which device and port are involved before they can fix the actual issue.'],
  ['Manual evidence', 'Compliance teams still assemble physical inventory evidence from spreadsheets, photos, and one-off checks.'],
]

const whatRackTrackDoes = [
  ['Scan', 'Capture the rack with a phone or upload existing footage.'],
  ['Reconcile', 'Match physical state against network and inventory sources.'],
  ['Publish', 'Send verified records into CMDB, DCIM, ITSM, and audit workflows.'],
]

const capabilities = [
  'Device position, vendor, model, and serial recognition',
  'Port and cable confirmation for incident response',
  'Firmware and vulnerability context per device',
  'Capacity planning tied to measured rack state',
]

const proofPoints = [
  ['20 min', 'for a focused baseline scan'],
  ['1 rack', 'enough to expose record drift'],
  ['3 views', 'CMDB, network, and physical state'],
]

const roles = [
  ['Infrastructure', 'Know what is installed before a change window starts.'],
  ['Security', 'Start vulnerability work from complete physical coverage.'],
  ['Compliance', 'Produce defensible inventory evidence without the scramble.'],
]

function HomePage() {
  useEffect(() => {
    document.title = homeMetadata.title

    let description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )

    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }

    description.content = homeMetadata.description
  }, [])

  return (
    <section className="page home-page">
      <Reveal className="page-hero home-hero">
        <div className="page-hero-copy">
          <div className="page-kicker">RackTrack</div>
          <h1>Physical infrastructure, verified from a simple scan.</h1>
          <p className="page-lede">
            RackTrack turns rack footage into structured inventory, reconciles it
            against your live network, and keeps operations, security, and audit
            teams working from the same truth.
          </p>
          <div className="hero-actions">
            <Link to="/book-assessment" className="button-link primary">
              Book a Baseline Assessment
            </Link>
            <Link to="/product" className="button-link">
              See Product
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <img src={heroScan} alt="RackTrack scan view of data center racks" />
        </div>
      </Reveal>

      <Reveal className="section-band">
        <div className="section-heading">
          <div className="eyebrow">Problem</div>
          <h2>Your systems describe the rack. RackTrack verifies it.</h2>
        </div>
        <div className="card-grid three">
          {problems.map(([title, body]) => (
            <div className="glass-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-band split-panel">
        <div className="image-panel">
          <img src={twinImage} alt="3D digital twin of connected rack equipment" />
        </div>
        <div className="glass-card home-list-card">
          <div className="eyebrow">What It Does</div>
          <h2>From footage to verified operating data.</h2>
          <div className="home-steps">
            {whatRackTrackDoes.map(([title, body], index) => (
              <div className="home-step" key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section-band">
        <div className="section-heading">
          <div className="eyebrow">Capabilities</div>
          <h2>Built for the teams who live with rack reality.</h2>
        </div>
        <div className="card-grid two">
          {capabilities.map((capability) => (
            <div className="glass-card capability-item" key={capability}>
              <span className="check">✓</span>
              <p>{capability}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-band">
        <div className="metric-grid">
          {proofPoints.map(([value, label]) => (
            <div className="metric" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-band">
        <div className="section-heading">
          <div className="eyebrow">Roles</div>
          <h2>One verified view, multiple teams unblocked.</h2>
        </div>
        <div className="card-grid three">
          {roles.map(([title, body]) => (
            <div className="glass-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-band home-cta">
        <div className="section-heading">
          <h2>See your rack the way RackTrack sees it.</h2>
          <p>
            Twenty minutes. One rack or one row. The output is a side-by-side of
            what your CMDB says, what your network reports, and what RackTrack
            actually finds for your environment.
          </p>
        </div>
        <Link to="/book-assessment" className="button-link primary">
          Book a Baseline Assessment
        </Link>
      </Reveal>
    </section>
  )
}

export default HomePage
