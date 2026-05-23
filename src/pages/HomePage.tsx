import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import RackScene from '../components/RackScene';

// ── Content data ──────────────────────────────────────────────────────────────
const STATS = [
  { value: '40–60%',    label: 'drift between CMDB and physical reality in production' },
  { value: '~30%',      label: 'of unplanned outages traced to inventory and config drift' },
  { value: '15–20%',    label: 'of installed assets are ghosts, still drawing power and license cost' },
  { value: '3–6 weeks', label: 'of manual evidence prep per compliance cycle' },
  { value: '20–40 min', label: "of every incident lost confirming what's actually in the rack" },
];

const CAPABILITIES = [
  { icon: '⬡', title: 'Physical Inventory',       body: 'Every device in every rack, identified and verified. Continuous, not annual.' },
  { icon: '⇄', title: 'Port & Cable Intelligence', body: 'Every port, every cable, every connection — mapped and searchable.' },
  { icon: '◈', title: 'Topology & 3D Twin',         body: 'Your data center, rendered in three dimensions and kept current.' },
  { icon: '⚿', title: 'Security Posture',           body: 'Firmware and vulnerability state surfaced per device, in real time.' },
  { icon: '⚡', title: 'Incident Response',          body: 'Find the device, find the port, before you open the door.' },
  { icon: '▦', title: 'Capacity Planning',           body: "Plan against measured reality, not last year's spreadsheet." },
  { icon: '⊕', title: 'Procurement Guidance',        body: 'Compatible parts and modules, recommended automatically.' },
  { icon: '✓', title: 'Compliance Evidence',         body: 'Audit-ready artifacts, generated continuously.' },
];

const PROOF_ROWS = [
  { metric: 'Time to characterize a rack', before: '2–5 days, manual',        after: 'Minutes, from a phone sweep' },
  { metric: 'CMDB reconciliation cycle',   before: 'Quarterly, error-prone',   after: 'Continuous, automated' },
  { metric: 'Ghost asset discovery',       before: 'Never, or by accident',    after: 'First sweep' },
  { metric: 'Compliance evidence prep',    before: '3–6 weeks per cycle',      after: 'Always ready' },
  { metric: 'Incident device lookup',      before: '20–40 min per incident',   after: 'Seconds' },
];

const ROLES = [
  { id: 'infrastructure', title: 'Infrastructure and data center leaders' },
  { id: 'network',        title: 'Network architects and engineers' },
  { id: 'security',       title: 'Security and vulnerability teams' },
  { id: 'compliance',     title: 'Compliance and audit owners' },
  { id: 'incident',       title: 'Incident responders and on-call engineers' },
  { id: 'ma',             title: 'M&A and migration teams' },
];

// ── Ambient particle field ────────────────────────────────────────────────────
function ParticleField() {
  return (
    <div className="hp-particles" aria-hidden="true">
      {Array.from({ length: 34 }).map((_, i) => (
        <span
          key={i}
          className="hp-particle"
          style={{
            '--p-x':       `${Math.round((i * 13.7 + 7) % 100)}%`,
            '--p-delay':   `${((i * 0.43) % 5).toFixed(2)}s`,
            '--p-dur':     `${(5 + (i * 0.67) % 5).toFixed(1)}s`,
            '--p-size':    `${(0.8 + (i % 4) * 0.4).toFixed(1)}px`,
            '--p-opacity': `${(0.25 + (i % 5) * 0.08).toFixed(2)}`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

// ── 3-D card tilt on mouse move ───────────────────────────────────────────────
function useCardTilt(containerRef: { current: HTMLElement | null }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.hp-tilt');
      if (!card || !container.contains(card)) return;
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      card.style.setProperty('--tx', `${(y * -7).toFixed(2)}deg`);
      card.style.setProperty('--ty', `${(x * 7).toFixed(2)}deg`);
      card.style.setProperty('--gx', `${((x + 1) * 50).toFixed(1)}%`);
      card.style.setProperty('--gy', `${((y + 1) * 50).toFixed(1)}%`);
    };

    const onLeave = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.hp-tilt');
      if (!card) return;
      card.style.setProperty('--tx', '0deg');
      card.style.setProperty('--ty', '0deg');
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave, true);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave, true);
    };
  }, [containerRef]);
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const capRef   = useRef<HTMLElement>(null);
  const rolesRef = useRef<HTMLElement>(null);

  useCardTilt(capRef);
  useCardTilt(rolesRef);

  // General scroll-reveal for .home-reveal sections
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.home-reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } }); },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  // Role cards staggered reveal
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.home-role-card');
    const section = rolesRef.current;
    if (!section) return;
    const sectionObserver = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { cards.forEach((c) => c.classList.add('is-visible')); sectionObserver.disconnect(); } }); },
      { threshold: 0.1 }
    );
    sectionObserver.observe(section);
    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div className="home-page">

      {/* ══════════════════════════════════════════
          HERO  — two-column: text left, 3D rack right
      ══════════════════════════════════════════ */}
      <section className="home-hero-section">
        <ParticleField />
        <div className="home-hero-inner">

          <div className="home-hero-content">
            <p className="home-eyebrow">Physical Intelligence Layer</p>
            <h1 className="home-hero-headline">
              Point your phone at the rack.<br />
              Get a network you can trust.
            </h1>
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

          <div className="home-hero-rack" aria-hidden="true">
            <RackScene />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROBLEM — full-bleed stat grid
      ══════════════════════════════════════════ */}
      <section className="home-section home-section--problem home-reveal">
        <div className="hp-problem-glow" aria-hidden="true" />
        <div className="home-section-heading">
          <p className="home-eyebrow">The problem</p>
          <h2>Your CMDB lies. Your DCIM guesses. Nobody owns the truth.</h2>
          <p>
            Every system above the rack — CMDB, DCIM, ITSM, asset register — describes what
            <em> should</em> be there. Switch fabrics describe what's talking. Neither describes
            what's actually in the rack right now.
          </p>
        </div>
        <div className="home-stat-grid">
          {STATS.map((stat, i) => (
            <div className="home-stat" key={stat.value} style={{ '--stat-i': i } as CSSProperties}>
              <div className="home-stat-bar" aria-hidden="true" />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT — what RackTrack is
      ══════════════════════════════════════════ */}
      <section className="home-section home-section--what home-reveal">
        <div className="hp-what-badge" aria-hidden="true">
          <span className="hp-what-badge-ring" />
          <span className="hp-what-badge-ring hp-what-badge-ring--2" />
        </div>
        <div className="home-section-heading">
          <p className="home-eyebrow">What RackTrack is</p>
          <h2>The Physical Intelligence Layer for the modern data center.</h2>
          <p>
            RackTrack captures the physical state of your racks from a smartphone video, verifies it
            against your live network, and turns it into a continuously reconciled truth that the rest
            of your stack can finally trust.
          </p>
        </div>
        <p className="home-positioning">
          Not an audit tool. Not a DCIM replacement. The truth layer underneath both.
        </p>
      </section>

      {/* ══════════════════════════════════════════
          CAPABILITIES — sticky animated 4×2 grid
      ══════════════════════════════════════════ */}
      <section className="cap-section home-reveal" ref={capRef}>
        <div className="cap-sticky-wrap">
          <div className="home-section-heading">
            <p className="home-eyebrow">Capabilities</p>
            <h2>Designed for the teams that inherit physical uncertainty.</h2>
          </div>
          <div className="cap-grid-stack">
            {CAPABILITIES.map((cap, i) => (
              <article
                className="cap-card hp-tilt"
                key={cap.title}
                style={{ '--cap-index': i, '--cap-total': CAPABILITIES.length } as CSSProperties}
              >
                <div className="cap-card-icon" aria-hidden="true">{cap.icon}</div>
                <div className="cap-card-body">
                  <h3>{`${String(i + 1).padStart(2, '0')} · ${cap.title.toUpperCase()}`}</h3>
                  <p>{cap.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROOF — before / after comparison table
      ══════════════════════════════════════════ */}
      <section className="home-section home-section--proof home-reveal">
        <div className="home-section-heading">
          <p className="home-eyebrow">Proof</p>
          <h2>Before and after — in your environment.</h2>
        </div>
        <div className="home-proof-table">
          <div className="hp-proof-scanlines" aria-hidden="true" />
          <div className="home-proof-header">
            <span>Metric</span>
            <span>Without RackTrack</span>
            <span>With RackTrack</span>
          </div>
          {PROOF_ROWS.map((row) => (
            <div className="home-proof-row" key={row.metric}>
              <span className="home-proof-metric">{row.metric}</span>
              <span className="home-proof-before">{row.before}</span>
              <span className="home-proof-after">{row.after}</span>
            </div>
          ))}
        </div>
        <p className="home-proof-footnote">
          Total addressable value per 500-rack footprint: $1M–$2.5M annually.{' '}
          <em>Modeled outcome. Inputs and assumptions available on request.</em>
        </p>
      </section>

      {/* ══════════════════════════════════════════
          ROLES — who it's for
      ══════════════════════════════════════════ */}
      <section className="home-section home-section--roles" ref={rolesRef}>
        <div className="home-section-heading">
          <p className="home-eyebrow">Who it's for</p>
          <h2>One optimized layer, useful to every team around the rack.</h2>
        </div>
        <div className="home-roles-grid">
          {ROLES.map((role, i) => (
            <article
              className="home-role-card hp-tilt"
              key={role.id}
              style={{ '--role-delay': `${i * 0.1}s` } as CSSProperties}
            >
              <div className="home-role-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
              <h3>{role.title}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="home-section home-final-cta home-reveal">
        <div>
          <h2>See your rack the way RackTrack sees it.</h2>
          <p>
            Twenty minutes. One rack or one row. The output is a side-by-side of what your CMDB says,
            what your network reports, and what RackTrack actually finds — for your environment, not a benchmark.
          </p>
          <Link to="/contact" className="home-button primary">
            Book a baseline assessment <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
