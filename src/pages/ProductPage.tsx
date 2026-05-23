import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';

/* ── Scroll-reveal ──────────────────────────────── */
type RevealProps = {
  children: ReactNode;
  from?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
};

function Reveal({ children, from = 'bottom', delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const hidden: Record<string, string> = {
    top: 'translate3d(0,-28px,0)',
    bottom: 'translate3d(0,32px,0)',
    left: 'translate3d(-36px,0,0)',
    right: 'translate3d(36px,0,0)',
  };

  return (
    <div
      ref={ref}
      className={`pp-reveal ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : hidden[from],
        transition: `opacity 520ms cubic-bezier(0.22,1,0.36,1) ${visible ? delay : 0}ms, transform 520ms cubic-bezier(0.22,1,0.36,1) ${visible ? delay : 0}ms`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ── Hero Visual ────────────────────────────────── */
function HeroVisual() {
  return (
    <div className="pp-hero-img-wrap" aria-hidden="true">
      <img
        src="/Productspage_hero.png"
        alt=""
        className="pp-hero-img"
      />
    </div>
  );
}

/* ── 3D Tilt Card ───────────────────────────────── */
function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -7;
    const ry = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 7;
    el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  }

  return (
    <div
      ref={ref}
      className={`pp-tilt-wrap ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* ── Data ───────────────────────────────────────── */
const STAGES = [
  {
    num: '01',
    label: 'CAPTURE',
    title: 'Walk the floor.\nFrame the rack.',
    body: 'Point a smartphone at any rack and record what\'s there. RackTrack reads device identities, rack-unit positions, visible labels, and port connectivity from ordinary video. No specialist hardware. No rack downtime. No preparation required.',
    accent: '#00D1FF',
    image: '/product_1.png',
  },
  {
    num: '02',
    label: 'VERIFY',
    title: 'Every device checked\nagainst record.',
    body: 'Each observed device is matched against what your CMDB, DCIM, or spreadsheet says should be present. Discrepancies surface immediately — assets in the wrong slot, unlisted devices drawing power, expected hardware that isn\'t there.',
    accent: '#8B5CF6',
    image: '/product_2.png',
  },
  {
    num: '03',
    label: 'ENRICH',
    title: 'Verified identity becomes\nlive intelligence.',
    body: 'Once confirmed, each asset pulls in operational context automatically — security exposure, end-of-life status, capacity load, and replacement horizon. The record doesn\'t just reflect reality. It tells you what to do next.',
    accent: '#10B981',
    image: '/product_3.png',
  },
];

const CAPABILITIES = [
  {
    title: 'Physical Inventory',
    outcome: 'Every device in every rack — verified against record, not assumed from logs.',
    diff: 'Captured visually, so identity is confirmed by what is physically present.',
    accent: '#00D1FF',
  },
  {
    title: 'Security Posture',
    outcome: 'Firmware currency and end-of-life exposure surfaced for every confirmed asset.',
    diff: 'Tied to verified physical identity — not inferred from a hostname or IP.',
    accent: '#FF6B6B',
  },
  {
    title: 'Incident Response',
    outcome: 'Locate any device and know its physical and logical state in seconds.',
    diff: 'Location is real — confirmed at last scan, not entered six months ago.',
    accent: '#F59E0B',
  },
  {
    title: 'Capacity Planning',
    outcome: 'Accurate U-space, power draw, and cooling load per rack and per row.',
    diff: 'Based on what is physically present, not what was planned or procured.',
    accent: '#8B5CF6',
  },
  {
    title: 'Compliance & Audit',
    outcome: 'Audit-ready evidence packages generated on demand, at any point in time.',
    diff: 'Snapshot verified at scan time — not interpolated from stale records.',
    accent: '#10B981',
  },
  {
    title: 'Asset Lifecycle',
    outcome: 'End-of-life flags and replacement timelines attached to every asset automatically.',
    diff: 'Driven by confirmed model and serial identity, not procurement estimates.',
    accent: '#06B6D4',
  },
  {
    title: 'Change Validation',
    outcome: 'Confirm changes were completed correctly without a second site visit.',
    diff: 'Before-and-after scan comparison with photographic evidence attached.',
    accent: '#A78BFA',
  },
  {
    title: 'Drift Detection',
    outcome: 'Know the moment physical reality diverges from the system of record.',
    diff: 'Catches what network discovery cannot — physical moves, swaps, and silent removals.',
    accent: '#FB923C',
  },
];

const INTEGRATIONS = [
  { name: 'ServiceNow',    sub: 'CMDB · ITSM',  color: '#62B340' },
  { name: 'BMC Helix',     sub: 'CMDB · ITSM',  color: '#E8262A' },
  { name: 'Sunbird DCIM',  sub: 'DCIM',          color: '#FF6600' },
  { name: 'Device42',      sub: 'CMDB · DCIM',  color: '#0074CC' },
  { name: 'Jira SM',       sub: 'ITSM',          color: '#0052CC' },
  { name: 'Freshservice',  sub: 'ITSM',          color: '#25C16F' },
];

/* ── Page ───────────────────────────────────────── */
export default function ProductPage() {
  return (
    <div className="product-page">

      {/* ══ 2.1 HERO ══════════════════════════════ */}
      <section className="pp-hero">
        <div className="pp-hero-bg" aria-hidden="true" />

        <div className="pp-hero-text">
          <Reveal from="left">
            <div className="pp-eyebrow-pill">
              <span className="pp-eyebrow-dot" />
              Product
            </div>
          </Reveal>

          <Reveal from="left" delay={60}>
            <h1 className="pp-hero-h1">
              One scan.<br />
              Every device.<br />
              <span className="pp-gradient-text">Verified.</span>
            </h1>
          </Reveal>

          <Reveal from="bottom" delay={150}>
            <p className="pp-hero-sub">
              Point a smartphone at your rack. RackTrack turns what it sees into a structured,
              verified model of your physical infrastructure — your single source of truth.
            </p>
          </Reveal>

          <Reveal from="bottom" delay={220}>
            <div className="pp-hero-actions">
              <Link to="/contact" className="pp-cta-btn">Request a Demo</Link>
              <Link to="/why-racktrack" className="pp-ghost-btn">See How It Works</Link>
            </div>
          </Reveal>
        </div>

        <Reveal from="right" delay={90} className="pp-hero-visual-col">
          <HeroVisual />
        </Reveal>
      </section>

      {/* ══ 2.2 THREE-STAGE STORY ═════════════════ */}
      <section className="pp-stages-section">
        <Reveal from="bottom">
          <div className="pp-section-head">
            <p className="pp-eyebrow"><span className="pp-eyebrow-dot" />How it works</p>
            <h2 className="pp-section-h2">
              Three stages.<br />
              <span className="pp-gradient-text">One complete picture.</span>
            </h2>
          </div>
        </Reveal>

        <div className="pp-stages-grid">
          {STAGES.map((st, i) => (
            <Reveal key={st.num} from="bottom" delay={i * 120}>
              <article className="pp-stage-card" style={{ '--stg-accent': st.accent } as CSSProperties}>
                <div className="pp-stage-card-inner">
                  <div className="pp-stage-card-front">
                    <div className="pp-stage-top-bar" />
                    <div className="pp-stage-header">
                      <span className="pp-stage-num">{st.num}</span>
                      <span className="pp-stage-label">{st.label}</span>
                    </div>
                    <h3 className="pp-stage-title">{st.title}</h3>
                    <p className="pp-stage-body">{st.body}</p>
                  </div>
                  <div className="pp-stage-card-back">
                    <img src={st.image} alt={st.label} className="pp-stage-card-img" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 2.3 CAPABILITIES ══════════════════════ */}
      <section className="pp-cap-section">
        <Reveal from="bottom">
          <div className="pp-section-head">
            <p className="pp-eyebrow"><span className="pp-eyebrow-dot" />Capabilities</p>
            <h2 className="pp-section-h2">
              What RackTrack<br />
              <span className="pp-gradient-text">unlocks for your team.</span>
            </h2>
          </div>
        </Reveal>

        <div className="pp-cap-grid">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} from="bottom" delay={(i % 4) * 70 + Math.floor(i / 4) * 50}>
              <TiltCard>
                <article className="pp-cap-card" style={{ '--cap-accent': cap.accent } as CSSProperties}>
                  <div className="pp-cap-accent-bar" />
                  <div className="pp-cap-glow" />
                  <h3 className="pp-cap-title">{cap.title}</h3>
                  <p className="pp-cap-outcome">{cap.outcome}</p>
                  <p className="pp-cap-diff">{cap.diff}</p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 2.4 INTEGRATION ═══════════════════════ */}
      <section className="pp-int-section">
        <div className="pp-int-bg" aria-hidden="true" />

        <Reveal from="bottom">
          <div className="pp-section-head pp-section-head--center">
            <p className="pp-eyebrow pp-eyebrow--center"><span className="pp-eyebrow-dot" />Integrations</p>
            <h2 className="pp-section-h2">
              Works with what<br />
              <span className="pp-gradient-text">you already run.</span>
            </h2>
            <p className="pp-int-sub">
              RackTrack feeds verified physical intelligence into the systems your teams already
              trust. No rip-and-replace. No new workflow to learn.
            </p>
          </div>
        </Reveal>

        <Reveal from="bottom" delay={80}>
          <div className="pp-logo-grid">
            {INTEGRATIONS.map((item, i) => (
              <div
                key={item.name}
                className="pp-logo-chip"
                style={{ '--chip-color': item.color, '--chip-i': i } as CSSProperties}
              >
                <span className="pp-logo-name">{item.name}</span>
                <span className="pp-logo-cat">{item.sub}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal from="bottom" delay={200}>
          <div className="pp-int-footer">
            <p className="pp-int-note">
              Already using something else? RackTrack ships with a clean output so any system of
              record can consume verified inventory data directly.
            </p>
            <Link to="/contact" className="pp-cta-btn">Talk to the Team</Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
