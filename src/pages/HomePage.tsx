import { Link } from 'react-router-dom';
import './HomePage.css';

const PROBLEMS = [
  {
    title: 'Real-time Monitoring',
    body: 'Monitor servers, racks, and devices as infrastructure changes, with clear signals for every team.',
  },
  {
    title: 'Smart Alerts',
    body: 'Get instant alerts for anomalies, capacity pressure, undocumented change, and operational risk.',
  },
  {
    title: 'Secure and Reliable',
    body: 'Keep your physical infrastructure visible, verified, and ready for audit or incident response.',
  },
];

const CAPABILITIES = [
  'Server Inventory',
  'Cloud Visibility',
  'Security Checks',
  'Live Monitoring',
  'Network Mapping',
  'Audit Evidence',
];

const METRICS = [
  { value: '500+', label: 'Active Customers' },
  { value: '20K+', label: 'Servers Monitored' },
  { value: '99.99%', label: 'Uptime' },
  { value: '24/7', label: 'Expert Support' },
];

const ROLES = [
  {
    id: 'infrastructure',
    title: 'Infrastructure operations',
    outcome: 'Turn rack state into verified inventory and highlight drift before it spreads.',
    cta: 'Learn more',
  },
  {
    id: 'network',
    title: 'Network engineering',
    outcome: 'Add port-level physical context to topology changes, incidents, and service planning.',
    cta: 'Learn more',
  },
  {
    id: 'security',
    title: 'Security teams',
    outcome: 'Make unknown assets, exceptions, and audit evidence visible from one trusted layer.',
    cta: 'Learn more',
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
            port-level topology, firmware posture, and compliance evidence &mdash; from a smartphone video sweep.
          </p>
          <div className="home-actions">
            <Link className="home-button primary" to="/contact">
              Get Started <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="home-button" to="/product">
              Explore Features <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="home-divider" />

      <section className="home-section">
        <div className="home-section-heading">
          <p className="home-eyebrow">The problem</p>
          <h2>Everything you need to run your data center.</h2>
          <p>
            See infrastructure clearly, catch issues earlier, and keep every operational workflow grounded in
            verified rack data.
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
          <h2>Live data center overview, without the operational fog.</h2>
          <p>
            RackTrack captures evidence, maps physical details, and compares the result with your existing
            operational systems.
          </p>
        </div>
        <div className="home-card">
          <h3>From signal to workflow</h3>
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
          <h2>Trusted numbers for daily operations.</h2>
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
          <h2>One optimized layer, useful to every team around the rack.</h2>
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
            Twenty minutes. One rack or one row. The output is a live-style view of what your records say,
            what your network reports, and what RackTrack actually finds.
          </p>
          <Link to="/contact" className="home-button primary">
            Get Started <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
