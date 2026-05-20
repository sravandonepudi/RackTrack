import { Link } from 'react-router-dom';
import './HomePage.css';

const PROBLEMS = [
  {
    title: 'CMDB drift',
    body: 'Records describe intent, but racks change through incidents, refreshes, and undocumented hands-on work.',
  },
  {
    title: 'Manual audits',
    body: 'Walkdowns are expensive, slow, and already stale by the time the spreadsheet is reviewed.',
  },
  {
    title: 'Missing context',
    body: 'Network tools know logical state, but they cannot see labels, port occupancy, cabling, or rack position.',
  },
];

const CAPABILITIES = [
  'Inventory verification',
  'Port-level physical context',
  'CMDB and DCIM drift detection',
  'Audit evidence bundles',
  'Incident response context',
  'Baseline assessment reports',
];

const METRICS = [
  { value: '20 min', label: 'baseline assessment window' },
  { value: '1 rack', label: 'enough to reveal record quality' },
  { value: '3 views', label: 'CMDB, network, and observed state' },
];

const ROLES = [
  {
    id: 'infrastructure',
    title: 'Infrastructure operations',
    outcome: 'RackTrack turns physical state into a verified inventory and highlights drift before it spreads.',
    cta: 'Map infrastructure drift',
  },
  {
    id: 'network',
    title: 'Network engineering',
    outcome: 'Port-level observations give network teams the missing physical context behind topology changes.',
    cta: 'Verify port mapping',
  },
  {
    id: 'security',
    title: 'Security teams',
    outcome: 'Evidence-backed physical inventory makes exceptions visible and defensible.',
    cta: 'Find unknown assets',
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero-local">
        <div className="home-hero-copy-local">
          <h1>Point your phone at the rack. Get a network you can trust.</h1>
          <p className="home-lede">
            RackTrack is the Physical Intelligence Layer for the modern data center. Verified inventory,
            port-level topology, firmware posture, and compliance evidence from a smartphone video sweep.
          </p>
          <div className="home-actions">
            <Link className="home-button primary" to="/contact">
              Book a Baseline Assessment
            </Link>
            <Link className="home-button" to="/product">
              See the Product
            </Link>
          </div>
        </div>
      </section>

      <div className="home-divider" />

      <section className="home-section">
        <div className="home-section-heading">
          <p className="home-eyebrow">The problem</p>
          <h2>Physical infrastructure is the least trusted record in the stack.</h2>
          <p>
            Teams make high-risk decisions from partial systems, manual exports, and observations trapped in
            someone else's notebook.
          </p>
        </div>
        <div className="home-card-grid">
          {PROBLEMS.map((problem) => (
            <article className="home-card" key={problem.title}>
              <h3>{problem.title}</h3>
              <p>{problem.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="home-divider" />

      <section className="home-section home-split">
        <div className="home-section-heading">
          <p className="home-eyebrow">What RackTrack does</p>
          <h2>It converts rack observations into usable operational truth.</h2>
          <p>
            RackTrack captures evidence, identifies devices, maps physical details, and compares the result
            with your existing systems.
          </p>
        </div>
        <div className="home-card">
          <h3>From image to workflow</h3>
          <ul>
            <li>Device identity and rack position</li>
            <li>Port, label, cable, and LED observations</li>
            <li>Drift reports against CMDB and DCIM records</li>
            <li>Exports for audits, ITSM, and remediation queues</li>
          </ul>
        </div>
      </section>

      <div className="home-divider" />

      <section className="home-section">
        <div className="home-section-heading">
          <p className="home-eyebrow">Capabilities</p>
          <h2>Designed for the teams that inherit physical uncertainty.</h2>
        </div>
        <div className="home-capability-list">
          {CAPABILITIES.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </section>

      <div className="home-divider" />

      <section className="home-section">
        <div className="home-section-heading">
          <p className="home-eyebrow">Proof</p>
          <h2>Start small, expose the drift, and decide with evidence.</h2>
        </div>
        <div className="home-metric-grid">
          {METRICS.map((metric) => (
            <div className="home-metric" key={metric.value}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <p className="home-eyebrow">Use cases</p>
          <h2>One verified layer, useful to every team around the rack.</h2>
        </div>
        <div className="home-card-grid">
          {ROLES.map((role) => (
            <article className="home-card" key={role.id}>
              <h3>{role.title}</h3>
              <p>{role.outcome}</p>
              <Link className="home-text-link" to={`/use-cases#${role.id}`}>
                {role.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div className="home-divider" />

      <section className="home-section home-final-cta">
        <div>
          <h2>See your rack the way RackTrack sees it.</h2>
          <p>
            Twenty minutes. One rack or one row. The output is a side-by-side of what your CMDB says, what
            your network reports, and what RackTrack actually finds for your environment, not a benchmark.
          </p>
          <Link to="/contact" className="home-button primary">
            Book a Baseline Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
