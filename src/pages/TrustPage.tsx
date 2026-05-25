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

const VIDEO_ACTIONS = [
  { icon: 'evidence', title: 'Retain as Evidence', body: 'Keep what matters.' },
  { icon: 'delete', title: 'Delete Anytime', body: 'Remove when needed.' },
  { icon: 'reprocess', title: 'Reprocess as Platform Improves', body: 'Always getting better.' },
];

const DEPLOYMENTS = [
  { icon: 'cloud', title: 'Cloud-Hosted', body: 'Secure, scalable, and fastest time to value.' },
  { icon: 'private', title: 'Private Cloud / Customer VPC', body: 'Deployed in your private environment with full control.' },
  { icon: 'onprem', title: 'On-Premise Deployment', body: 'Runs in your data center for regulated environments.' },
  { icon: 'airgap', title: 'Air-Gapped Deployment', body: 'For classified or restricted facilities with no external access.' },
];

function SecurityPostureLogo({ name }: { name: string }) {
  return (
    <span className="security-logo-hud" aria-hidden="true">
      <span className="security-logo-orbit" />
      <span className="security-logo-core">
        {name === 'shield' && (
          <svg viewBox="0 0 96 96">
            <path d="M48 10 77 21v23c0 18-11 32-29 42C30 76 19 62 19 44V21l29-11Z" />
            <path d="M36 34h18c8 0 13 5 13 12 0 5-3 9-8 11l10 14H55l-8-12h-1v12H36V34Zm10 9v8h8c2 0 4-2 4-4s-2-4-4-4h-8Z" />
          </svg>
        )}
        {name === 'tenant' && (
          <svg viewBox="0 0 96 96">
            <path d="m24 32 24-13 25 13-25 14-24-14Z" />
            <path d="M24 32v28l24 15V46L24 32Z" />
            <path d="M73 32v28L48 75V46l25-14Z" />
            <path d="m43 28 9-5 10 5-10 6-9-6Z" />
            <path d="M63 55h14c5 0 8 3 8 8v13c0 5-3 8-8 8H63c-5 0-8-3-8-8V63c0-5 3-8 8-8Z" />
            <path d="M61 55v-5c0-6 4-10 9-10s9 4 9 10v5" />
            <path d="M70 66v7" />
          </svg>
        )}
        {name === 'lock' && (
          <svg viewBox="0 0 96 96">
            <path d="M30 43h36c6 0 10 4 10 10v23c0 6-4 10-10 10H30c-6 0-10-4-10-10V53c0-6 4-10 10-10Z" />
            <path d="M31 43V31c0-11 7-19 17-19s17 8 17 19v12" />
            <path d="M48 58v13" />
          </svg>
        )}
        {name === 'key' && (
          <svg viewBox="0 0 96 96">
            <circle cx="31" cy="44" r="15" />
            <path d="M45 44h35" />
            <path d="M65 44v10h8v-7h7" />
            <path d="M73 58h8c4 0 7 3 7 7v10c0 4-3 7-7 7h-8c-4 0-7-3-7-7V65c0-4 3-7 7-7Z" />
            <path d="M71 58v-4c0-5 3-8 7-8s7 3 7 8v4" />
          </svg>
        )}
        {name === 'users' && (
          <svg viewBox="0 0 96 96">
            <circle cx="39" cy="31" r="13" />
            <circle cx="65" cy="36" r="10" />
            <path d="M17 74c0-15 9-24 22-24s22 9 22 24v5H17v-5Z" />
            <path d="M57 55c4-3 8-4 13-4 11 0 18 8 18 21v3H61" />
          </svg>
        )}
      </span>
    </span>
  );
}

function WorkflowLogo({ name }: { name: string }) {
  return (
    <span className={`workflow-logo-hud workflow-logo-hud--${name}`} aria-hidden="true">
      <span className="workflow-logo-orbit" />
      <span className="workflow-logo-core">
        {name === 'rack' && (
          <svg viewBox="0 0 128 96">
            <defs>
              <linearGradient id="rack-panel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#86f6ff" stopOpacity="0.7" />
                <stop offset="0.3" stopColor="#112d67" />
                <stop offset="1" stopColor="#020916" />
              </linearGradient>
              <linearGradient id="rack-light" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#061127" />
                <stop offset="0.56" stopColor="#00f0ff" />
                <stop offset="1" stopColor="#2f91ff" />
              </linearGradient>
            </defs>
            <rect x="11" y="12" width="106" height="72" rx="8" />
            <path d="M22 20h20v56H22zM48 17h28v61H48zM82 21h23v55H82z" />
            {Array.from({ length: 5 }).map((_, index) => (
              <g key={index}>
                <rect x="26" y={27 + index * 9} width="12" height="4" rx="1" />
                <rect x="54" y={25 + index * 10} width="16" height="5" rx="1" />
                <rect x="87" y={28 + index * 9} width="13" height="4" rx="1" />
              </g>
            ))}
          </svg>
        )}
        {name === 'brain' && (
          <svg viewBox="0 0 96 96">
            <path d="M48 18v60" />
            <path d="M42 22c-13-8-27 4-24 17-8 4-7 18 2 21-3 13 11 22 22 15" />
            <path d="M54 22c13-8 27 4 24 17 8 4 7 18-2 21 3 13-11 22-22 15" />
            <path d="M34 31c-7 1-10 6-10 12M30 52c5-4 10-4 15 0M37 67c-5-1-8-4-9-8" />
            <path d="M62 31c7 1 10 6 10 12M66 52c-5-4-10-4-15 0M59 67c5-1 8-4 9-8" />
          </svg>
        )}
        {name === 'records' && (
          <svg viewBox="0 0 96 96">
            <rect x="18" y="18" width="60" height="60" rx="8" />
            <rect x="27" y="28" width="15" height="9" rx="2" />
            <path d="M48 32h20M48 39h14" />
            <rect x="27" y="45" width="15" height="9" rx="2" />
            <path d="M48 49h20M48 56h14" />
            <rect x="27" y="62" width="15" height="9" rx="2" />
            <path d="M48 66h20M48 73h14" />
          </svg>
        )}
        {name === 'control' && (
          <svg viewBox="0 0 96 96">
            <path d="M48 11 77 22v23c0 19-11 33-29 42C30 78 19 64 19 45V22l29-11Z" />
            <circle cx="48" cy="39" r="10" />
            <path d="M32 67c0-11 6-18 16-18s16 7 16 18" />
          </svg>
        )}
      </span>
    </span>
  );
}

function DeploymentLogo({ name }: { name: string }) {
  return (
    <span className={`deployment-logo-stage deployment-logo-stage--${name}`} aria-hidden="true">
      <span className="deployment-logo-platform" />
      <span className="deployment-logo-core">
        {(name === 'cloud' || name === 'private') && (
          <svg viewBox="0 0 128 104">
            <path d="M38 72c-14 0-24-9-24-22 0-12 9-21 21-22C39 15 50 8 63 8c17 0 30 12 32 28 12 1 21 9 21 21 0 9-7 15-18 15H38Z" />
            {name === 'cloud' && (
              <path d="M55 36h18c8 0 13 5 13 12 0 5-3 9-8 11l9 12H74l-7-10h-3v10H55V36Zm9 8v8h8c3 0 4-2 4-4s-1-4-4-4h-8Z" />
            )}
            {name === 'private' && (
              <>
                <path d="M64 40 82 47v14c0 11-7 20-18 26-11-6-18-15-18-26V47l18-7Z" />
                <path d="m57 62 5 5 10-12" />
              </>
            )}
          </svg>
        )}
        {name === 'onprem' && (
          <svg viewBox="0 0 128 104">
            <path d="M28 22 69 10l31 15v58L59 94 28 77V22Z" />
            <path d="M59 94V34l41-9" />
            <path d="M39 28 59 34v60" />
            {Array.from({ length: 5 }).map((_, index) => (
              <g key={index}>
                <rect x="37" y={38 + index * 8} width="15" height="4" rx="1" />
                <rect x="68" y={34 + index * 9} width="21" height="5" rx="1" />
              </g>
            ))}
            <path d="M94 37 112 32v42L94 79V37Z" />
          </svg>
        )}
        {name === 'airgap' && (
          <svg viewBox="0 0 128 104">
            <path d="M25 28 65 10l39 18-40 19-39-19Z" />
            <path d="M25 28v48l39 19V47L25 28Z" />
            <path d="M104 28v48L64 95V47l40-19Z" />
            <path d="m50 24 15-7 14 7-15 7-14-7Z" />
            <path d="M38 49h18c5 0 8 3 8 8v18c0 5-3 8-8 8H38c-5 0-8-3-8-8V57c0-5 3-8 8-8Z" />
            <path d="M35 49v-7c0-8 5-13 12-13s12 5 12 13v7" />
            <path d="M95 42v28" />
          </svg>
        )}
      </span>
    </span>
  );
}

function CtaShieldLogo() {
  return (
    <span className="cta-shield-hud" aria-hidden="true">
      <span className="cta-shield-topology" />
      <span className="cta-shield-ring" />
      <span className="cta-shield-core">
        <svg viewBox="0 0 120 140">
          <path d="M60 7 104 24v40c0 31-17 55-44 70C33 119 16 95 16 64V24L60 7Z" />
          <path d="M40 47h29c13 0 21 8 21 19 0 8-5 15-13 18l15 22H73L60 87h-4v19H40V47Zm16 13v14h12c5 0 8-3 8-7s-3-7-8-7H56Z" />
        </svg>
      </span>
    </span>
  );
}

function HeroVisual() {
  return (
    <figure className="trust-hero-visual" aria-label="RackTrack secure datacenter visualization">
      <img
        className="trust-hero-image"
        src="/trust-hero-security.png"
        alt="Cinematic datacenter racks with a holographic RackTrack shield, AI scanning beam, and security data cards"
      />
    </figure>
  );
}

function VideoActionIcon({ name }: { name: string }) {
  return (
    <span className={`video-action-icon video-action-icon--${name}`} aria-hidden="true">
      {name === 'evidence' && (
        <svg viewBox="0 0 64 64">
          <path d="M8 19c0-4 3-7 7-7h12l6 7h16c4 0 7 3 7 7v21c0 4-3 7-7 7H15c-4 0-7-3-7-7V19Z" />
          <path d="M22 37h21" />
          <rect x="34" y="31" width="18" height="18" rx="3" />
          <path d="M38 31v-4c0-4 2-7 5-7s5 3 5 7v4" />
          <path d="M43 39v4" />
        </svg>
      )}
      {name === 'delete' && (
        <svg viewBox="0 0 64 64">
          <path d="M17 20h30" />
          <path d="M25 20v-7h14v7" />
          <path d="M21 25l2 27c0 4 3 6 7 6h4c4 0 7-2 7-6l2-27" />
          <path d="M29 31v17M36 31v17" />
        </svg>
      )}
      {name === 'reprocess' && (
        <svg viewBox="0 0 64 64">
          <path d="M49 25a18 18 0 0 0-31-6" />
          <path d="M47 13v12H35" />
          <path d="M15 39a18 18 0 0 0 31 6" />
          <path d="M17 51V39h12" />
          <path d="M32 23v9l7 4" />
        </svg>
      )}
      {name === 'lock' && (
        <svg viewBox="0 0 64 64">
          <rect x="17" y="28" width="30" height="24" rx="5" />
          <path d="M23 28v-7c0-7 4-12 9-12s9 5 9 12v7" />
          <path d="M32 37v7" />
        </svg>
      )}
    </span>
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
              <WorkflowLogo name={step.icon} />
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
            {index < VIDEO_STEPS.length - 1 && <span className="flow-arrow" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="video-actions" aria-label="Raw footage control actions">
        {VIDEO_ACTIONS.map((action) => (
          <article className="video-action-card" key={action.title}>
            <VideoActionIcon name={action.icon} />
            <span className="video-action-copy">
              <strong>{action.title}</strong>
              <small>{action.body}</small>
            </span>
          </article>
        ))}
      </div>
      <p className="video-control-note">
        <VideoActionIcon name="lock" />
        <span>Raw footage never leaves your control</span>
      </p>
    </div>
  );
}

export default function TrustPage() {
  return (
    <div className="trust-page">
      <section className="trust-hero">
        <div className="trust-hero-copy">
          <p className="trust-kicker">Trust &amp; Security</p>
          <h1>
            Enterprise-grade <span>security</span> for <span>infrastructure</span> <span>intelligence.</span>
          </h1>
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
        <HeroVisual />
      </section>

      <section className="trust-section trust-section--center trust-content-container" id="security-posture">
        <h2>Security Posture</h2>
        <p>Built to meet the enterprise security signals procurement teams expect.</p>
        <div className="security-card-grid">
          {SECURITY_POSTURE.map((item) => (
            <article className="security-card" key={item.title}>
              <SecurityPostureLogo name={item.icon} />
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

      <section className="trust-section trust-video-section trust-content-container" id="data-handling">
        <div className="video-copy">
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

      <section className="trust-section trust-section--center trust-content-container" id="deployment-options">
        <h2>Deployment Options</h2>
        <p>Flexible deployment models to meet your environment and compliance needs.</p>
        <div className="deployment-card-grid">
          {DEPLOYMENTS.map((item) => (
            <article className="deployment-card" key={item.title}>
              <DeploymentLogo name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-bottom-cta trust-content-container">
        <div className="cta-emblem">
          <CtaShieldLogo />
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
