import { Link } from 'react-router-dom';
import './TrustPage.css';

const SECURITY_POSTURE = [
  {
    icon: 'shield',
    title: 'SOC 2 Type II',
    body: 'SOC 2 Type II is in progress, with controls and evidence practices being prepared for formal review.',
    meter: true,
  },
  {
    icon: 'tenant',
    title: 'Tenant Isolation',
    body: 'Customer environments are isolated, with customer-controlled data residency for evidence and structured records.',
  },
  {
    icon: 'lock',
    title: 'Encryption',
    body: 'Encryption in transit and at rest protects rack video, derived records, and operational metadata.',
  },
  {
    icon: 'key',
    title: 'Credential Vaulting',
    body: 'RackTrack works with customer-controlled vaulting and never stores production access keys directly.',
  },
  {
    icon: 'users',
    title: 'Access Control & Audit Logs',
    body: 'Role-based access control and audit logging support least-privilege operations and review.',
  },
];

const VIDEO_STEPS = [
  { icon: 'rack', title: '1. Rack Video', body: 'You capture. You own.' },
  { icon: 'brain', title: '2. AI Processing', body: 'Video is processed inside your tenant.' },
  { icon: 'records', title: '3. Structured Output', body: 'Devices, connections, and topology records.' },
  { icon: 'control', title: '4. Your Control', body: 'Retain, delete, or reprocess.' },
];

const DEPLOYMENTS = [
  { icon: 'cloud', title: 'Cloud-Hosted', body: 'Secure, scalable, and fastest time to value.' },
  { icon: 'private', title: 'Private Cloud / Customer VPC', body: 'Deployed in your private environment with full control.' },
  { icon: 'onprem', title: 'On-Premise Deployment', body: 'Runs in your data center for regulated environments.' },
  { icon: 'airgap', title: 'Air-Gapped Deployment', body: 'For classified or restricted facilities with no external access.' },
];

function IconGlyph({ name }: { name: string }) {
  return (
    <span className={`trust-icon trust-icon--${name}`} aria-hidden="true">
      <span />
    </span>
  );
}

function HeroRackScene() {
  return (
    <div className="trust-hero-scene" aria-label="Secure rack intelligence visualization">
      <div className="hero-rack-cluster">
        {Array.from({ length: 5 }).map((_, rackIndex) => (
          <div className="hero-rack" key={rackIndex}>
            {Array.from({ length: 8 }).map((__, unitIndex) => (
              <span className="hero-rack-row" key={unitIndex}>
                <i />
                <i />
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="hero-scan-line" />
      <div className="hero-shield">R</div>
      <div className="hero-vault-beam" />
      <div className="hero-callout hero-callout--scan">
        <IconGlyph name="shield" />
        <strong>AI Scanning</strong>
        <span>Analyzing rack infrastructure</span>
      </div>
      <div className="hero-callout hero-callout--data">
        <IconGlyph name="records" />
        <strong>Structured Data</strong>
        <span>Devices, connections & topology</span>
      </div>
      <div className="hero-callout hero-callout--tenant">
        <IconGlyph name="tenant" />
        <strong>Secure Tenant</strong>
        <span>Your data stays in your control</span>
      </div>
    </div>
  );
}

function VideoFlow() {
  return (
    <div className="trust-video-flow" aria-label="Rack video handling workflow">
      <div className="tenant-label">Your secure tenant environment</div>
      <div className="video-step-row">
        {VIDEO_STEPS.map((step, index) => (
          <div className="video-step-wrap" key={step.title}>
            <article className="video-step">
              <IconGlyph name={step.icon} />
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
            {index < VIDEO_STEPS.length - 1 && <span className="flow-arrow" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="video-actions">
        <span>Retain as evidence</span>
        <span>Delete anytime</span>
        <span>Reprocess as platform improves</span>
      </div>
      <p className="video-control-note">Raw footage never leaves your control</p>
    </div>
  );
}

export default function TrustPage() {
  return (
    <div className="trust-page">
      <section className="trust-hero">
        <div className="trust-hero-copy">
          <p className="trust-kicker">Trust &amp; Security</p>
          <h1>Enterprise-grade security for infrastructure intelligence.</h1>
          <p>
            RackTrack helps enterprises process rack intelligence securely while maintaining complete control
            over data, deployment, and operational access.
          </p>
          <div className="trust-actions">
            <Link className="trust-button trust-button--primary" to="/contact">
              Request Security Overview
            </Link>
            <Link className="trust-button" to="/contact">
              Talk to Solutions Team
            </Link>
          </div>
        </div>
        <HeroRackScene />
      </section>

      <section className="trust-section trust-section--center" id="security-posture">
        <p className="trust-section-label">Section 5.1</p>
        <h2>Security Posture</h2>
        <p>Built to meet the enterprise security signals procurement teams expect.</p>
        <div className="security-card-grid">
          {SECURITY_POSTURE.map((item) => (
            <article className="security-card" key={item.title}>
              <IconGlyph name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {item.meter && (
                <div className="soc-meter" aria-hidden="true">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <span key={index} />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="trust-section trust-video-section" id="data-handling">
        <div className="video-copy">
          <p className="trust-section-label">Section 5.2</p>
          <h2>
            Your video,
            <span> your control.</span>
          </h2>
          <p>
            Rack video is processed in your tenant, structured into device and topology records, and retained
            per your data residency policy.
          </p>
          <p>The structured output is what powers downstream workflows.</p>
          <p>
            The raw footage is yours: delete it, retain it as evidence, or keep it for re-processing as the
            platform improves. It never leaves your control.
          </p>
        </div>
        <VideoFlow />
      </section>

      <section className="trust-section trust-section--center" id="deployment-options">
        <p className="trust-section-label">Section 5.3</p>
        <h2>Deployment Options</h2>
        <p>Flexible deployment models to meet your environment and compliance needs.</p>
        <div className="deployment-card-grid">
          {DEPLOYMENTS.map((item) => (
            <article className="deployment-card" key={item.title}>
              <IconGlyph name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-bottom-cta">
        <div className="cta-emblem">
          <IconGlyph name="shield" />
        </div>
        <div>
          <h2>Built for secure infrastructure operations at enterprise scale.</h2>
          <p>Security. Control. Transparency. That's the RackTrack promise.</p>
        </div>
        <div className="trust-actions">
          <Link className="trust-button trust-button--primary" to="/contact">
            Request Security Documentation
          </Link>
          <Link className="trust-button" to="/contact">
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}
