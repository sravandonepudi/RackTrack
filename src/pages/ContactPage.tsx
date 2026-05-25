import { useState } from 'react';
import './ContactPage.css';


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
    a: 'Yes. RackTrack uses a smartphone video sweep to capture rack state without agents, downtime, or disruption to production infrastructure.',
  },
  {
    q: 'What kind of infrastructure can RackTrack identify?',
    a: 'RackTrack supports a broad and continuously expanding range of enterprise networking and data center infrastructure devices.',
  },
  {
    q: 'How does RackTrack verify inventory accuracy?',
    a: 'RackTrack reconciles physical scan data against live infrastructure signals to maintain continuously verified inventory and topology records.',
  },
  {
    q: 'Does RackTrack replace our CMDB or DCIM?',
    a: 'No. RackTrack acts as the physical intelligence layer underneath existing CMDB, DCIM, and ITSM platforms — helping reconcile what systems report against what is physically present in the rack.',
  },
  {
    q: 'Is RackTrack useful for compliance and audit preparation?',
    a: 'Yes. RackTrack helps generate continuously updated inventory, topology, and infrastructure evidence that supports audit readiness and operational reviews.',
  },
  {
    q: 'Can RackTrack help during incidents and outages?',
    a: 'Yes. RackTrack helps teams quickly identify devices, ports, and cable relationships so responders spend less time validating rack state during critical incidents.',
  },
  {
    q: 'Does RackTrack support security and vulnerability workflows?',
    a: 'Yes. RackTrack provides device-level firmware and infrastructure posture visibility to help security teams identify operational and compliance risks faster.',
  },
  {
    q: 'How long does a baseline assessment take?',
    a: 'Typically about twenty minutes for a single rack or row. The assessment compares your existing records against observed physical and network state.',
  },
  {
    q: 'Can we request a demo before committing?',
    a: 'Yes. You can schedule a guided walkthrough against your own environment to see how RackTrack performs on real infrastructure.',
  },
  {
    q: 'Does RackTrack work with existing enterprise tools?',
    a: 'Yes. RackTrack is designed to integrate with existing infrastructure, inventory, compliance, and operational workflows.',
  },
  {
    q: 'Where can RackTrack be deployed?',
    a: 'RackTrack supports cloud-hosted, private cloud, on-premise, and air-gapped deployment models for regulated or restricted environments.',
  },
  {
    q: 'Who uses RackTrack?',
    a: 'RackTrack is built for infrastructure leaders, network engineering teams, security operations, compliance owners, incident responders, and data center operators.',
  },
];

function HeroImage() {
  return (
    <div className="contact-hero-visual" aria-hidden="true">
      <img
        src="/contact-infographic.png"
        alt="20-minute assessment infographic"
        className="chv-infographic-img"
      />
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
            <span style={{ whiteSpace: 'nowrap' }}>Twenty minutes</span><br />
            <span style={{ whiteSpace: 'nowrap' }}>One rack.{' '}
              <span className="contact-gradient-text">Verified.</span>
            </span>
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
