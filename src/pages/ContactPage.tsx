import { useState } from 'react';
import './ContactPage.css';

const CONTACT_CARDS = [
  {
    icon: '📍',
    label: 'Office Address',
    value: '85 Felt Rd, Suite #604',
    sub: 'South Windsor, CT 06074',
  },
  {
    icon: '✉',
    label: 'Email',
    value: 'info@racktrack.ai',
    sub: 'Share audit goals, rollout questions, or support requests.',
    highlight: true,
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+1 (860) 566 9894',
    sub: 'Call our contact team for demos, support, and meeting schedules.',
  },
  {
    icon: '🕐',
    label: 'Response Time',
    value: 'Within 1 business day',
    sub: 'We respond quickly to demos, planning, and support conversations.',
  },
];

const CONTACT_PATHS = [
  {
    label: 'Sales',
    desc: 'Book a call with our team for qualified buyers.',
    action: 'Schedule a Call →',
    href: 'mailto:sales@racktrack.ai',
    color: '#00d1ff',
  },
  {
    label: 'Partnerships',
    desc: 'Design partner and channel partner inquiries.',
    action: 'partners@racktrack.ai',
    href: 'mailto:partners@racktrack.ai',
    color: '#8b5cf6',
  },
  {
    label: 'Security & Compliance',
    desc: 'Procurement and vendor security review requests.',
    action: 'security@racktrack.ai',
    href: 'mailto:security@racktrack.ai',
    color: '#19ff8a',
  },
  {
    label: 'General',
    desc: 'Everything else — use the contact form below.',
    action: 'Use the form ↓',
    href: '#contact-form',
    color: '#ff384f',
  },
];

const FAQS = [
  {
    q: 'Can RackTrack scan existing racks without downtime?',
    a: 'Yes. RackTrack uses a smartphone video sweep — no agents, no downtime, no physical access beyond a walk-through.',
  },
  {
    q: 'What network protocols does RackTrack use?',
    a: 'RackTrack correlates physical scan data against live network state using CDP, LLDP, SNMP, SSH, NETCONF, and gRPC.',
  },
  {
    q: 'Which vendors does RackTrack identify?',
    a: 'RackTrack enriches against a broad vendor library including Cisco, Dell, Aruba, Juniper, TP-Link, MikroTik, and others. Coverage expands continuously.',
  },
  {
    q: 'How does confidence scoring work?',
    a: 'Each identified device receives a confidence score based on visual, network, and metadata signals. Low-confidence items are flagged for human validation before being committed to the record.',
  },
  {
    q: 'Is RackTrack useful for compliance audits?',
    a: 'Yes. RackTrack generates continuously updated audit-ready artifacts — port maps, firmware states, and inventory records — reducing evidence prep from weeks to always-ready.',
  },
  {
    q: 'Can we request a demo before committing?',
    a: 'Yes. Submit the form and our team will schedule a walkthrough against your environment — not a benchmark.',
  },
  {
    q: 'Does RackTrack replace our CMDB or DCIM?',
    a: 'No. RackTrack is the physical truth layer underneath both. It reconciles what those systems say against what is actually in the rack.',
  },
  {
    q: 'What CVE and threat intelligence sources are used?',
    a: 'RackTrack surfaces firmware vulnerability state per device in real time. Specific source integrations are disclosed under NDA during the security review process.',
  },
];

function HeroImage() {
  return (
    <div className="contact-hero-visual" aria-hidden="true">
      {/* Rack scan visualization — themed to match the site */}
      <div className="chv-rack">
        <div className="chv-rack-rail chv-rack-rail--left" />
        <div className="chv-rack-rail chv-rack-rail--right" />
        <div className="chv-rack-slots">
          {[
            { color: '#796cff', w: '88%' },
            { color: '#ff384f', w: '72%', tall: true },
            { color: '#7467ff', w: '80%' },
            { color: '#19ff8a', w: '65%' },
            { color: '#ff4056', w: '78%', tall: true },
            { color: '#00d8ff', w: '90%' },
            { color: '#21ff91', w: '60%' },
            { color: '#8677ff', w: '74%' },
            { color: '#18f58d', w: '82%', tall: true },
          ].map((device, i) => (
            <div
              key={i}
              className="chv-device"
              style={{
                '--dev-color': device.color,
                height: device.tall ? '52px' : '38px',
              } as React.CSSProperties}
            >
              <span className="chv-device-led" />
              <span className="chv-device-bar" style={{ width: device.w }} />
              <span className="chv-device-ports" />
            </div>
          ))}
        </div>
        {/* Scan line */}
        <div className="chv-scan-line" />
      </div>
      {/* Floating data badges */}
      <div className="chv-badge chv-badge--1">CDP · LLDP · SNMP</div>
      <div className="chv-badge chv-badge--2">9 devices identified</div>
      <div className="chv-badge chv-badge--3">Confidence 94%</div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`contact-faq-item${open ? ' is-open' : ''}`}>
      <button
        className="contact-faq-q"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {q}
        <span className="contact-faq-icon">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="contact-faq-a">{a}</p>}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="contact-page">

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-text">
          <div className="contact-eyebrow-pill">
            <span className="contact-eyebrow-dot" />
            <span>Book Assessment</span>
          </div>
          <h1>
            Twenty minutes.<br />
            One rack.{' '}
            <span className="contact-gradient-text">Verified.</span>
          </h1>
          <p>
            Book a baseline assessment. We show you exactly what RackTrack sees —
            before any commitment. The output is a side-by-side of what your CMDB says,
            what your network reports, and what RackTrack actually finds.
          </p>
          <a href="#contact-form" className="contact-cta-btn">
            <span>⇒</span> Request Assessment
          </a>
        </div>
        <HeroImage />
      </section>

      {/* ── Contact Paths ── */}
      <section className="contact-paths-section">
        <p className="contact-eyebrow">Contact Paths</p>
        <h2>Reach the right team directly.</h2>
        <div className="contact-paths-grid">
          {CONTACT_PATHS.map((path) => (
            <a
              key={path.label}
              href={path.href}
              className="contact-path-card"
              style={{ '--path-color': path.color } as React.CSSProperties}
            >
              <p className="contact-path-label">{path.label}</p>
              <p className="contact-path-desc">{path.desc}</p>
              <span className="contact-path-action">{path.action}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Form + FAQ ── */}
      <section className="contact-main-section" id="contact-form">
        {/* Form */}
        <div className="contact-form-wrap">
          <h2>Start your <span className="contact-gradient-text">conversation.</span></h2>
          <p>Tell us what you need and the RackTrack team will get back to you with the right next step.</p>
          <form className="contact-form" action="mailto:info@racktrack.ai" method="post">
            <div className="contact-form-row">
              <label>
                Full Name <span className="req">*</span>
                <input name="name" placeholder="Enter your full name" autoComplete="name" required />
              </label>
              <label>
                Email Address <span className="req">*</span>
                <input name="email" type="email" placeholder="Enter your email address" autoComplete="email" required />
              </label>
            </div>
            <div className="contact-form-row">
              <label>
                Company Name <span className="opt">(Optional)</span>
                <input name="company" placeholder="Enter your company name" autoComplete="organization" />
              </label>
              <label>
                Mobile Number <span className="req">*</span>
                <input name="phone" type="tel" placeholder="Enter your mobile number" autoComplete="tel" required />
              </label>
            </div>
            <label>
              Requirement <span className="opt">(Optional)</span>
              <textarea name="message" rows={4} placeholder="Enter your requirement or notes" />
            </label>
            <button className="contact-submit-btn" type="submit">
              <span>⇒</span> Submit Request ↗
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="contact-faq-wrap">
          <h2>Before you <span className="contact-gradient-text">connect.</span></h2>
          <div className="contact-faq-list">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
