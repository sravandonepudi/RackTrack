import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import './ResourcesPage.css';

/* ── icons ──────────────────────────────────────────── */
function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 6V4.5a2 2 0 014 0V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── data ───────────────────────────────────────────── */
const GATED = [
  {
    cat: 'Calculator',
    title: 'ROI Calculator',
    desc: 'An interactive sensitivity model behind the $1M–$2.5M annual value claim for a 500-rack footprint. Adjustable for rack count, audit frequency, and headcount assumptions.',
  },
  {
    cat: 'Whitepaper',
    title: "Buyer's Guide to Physical Intelligence",
    desc: 'A category-defining guide for teams evaluating evidence-grade inventory and topology. ~12 pages.',
  },
  {
    cat: 'Mapping Guide',
    title: 'Compliance Mapping',
    desc: 'How RackTrack outputs support SOC 2, ISO 27001, HIPAA, and PCI-DSS physical security evidence workflows.',
  },
  {
    cat: 'Reference',
    title: 'Integration Reference',
    desc: 'A high-level overview of how RackTrack fits into CMDB, DCIM, ITSM, and compliance stacks.',
  },
];

const POSTS = [
  { cat: 'CMDB',           catColor: '#00D1FF', readTime: '6 min', title: 'The Cost of CMDB Drift',                               desc: 'Why intent records decay, where the hidden costs show up, and how teams can frame the problem before they can justify fixing it.' },
  { cat: 'Infrastructure', catColor: '#10B981', readTime: '5 min', title: 'Why Manual Rack Audits Fail',                          desc: 'A plain-language look at point-in-time evidence, spreadsheet decay, and audit fatigue — and why clipboard-and-human is structurally broken.' },
  { cat: 'Inventory',      catColor: '#8B5CF6', readTime: '7 min', title: 'Evidence-Grade Inventory',                             desc: 'What defensible inventory means for infrastructure, security, and compliance teams — and why "checked last quarter" is not the same as "known."' },
  { cat: 'Operations',     catColor: '#F59E0B', readTime: '5 min', title: 'The Physical Layer in Incident Response',              desc: 'Why responders lose time at the rack and how better physical truth changes the workflow from the first moment of an incident.' },
  { cat: 'Compliance',     catColor: '#06B6D4', readTime: '8 min', title: 'What SOC 2 Auditors Actually Want at the Rack',       desc: 'The control families that touch physical access and asset evidence — and why screenshot-level proof is replacing spreadsheet attestation.' },
  { cat: 'Infrastructure', catColor: '#10B981', readTime: '6 min', title: "The Infrastructure Gap Network Discovery Can't Close", desc: 'Network discovery finds what has a management plane. It misses power units, KVMs, unmanaged switches, and anything that fell off DHCP.' },
  { cat: 'Lifecycle',      catColor: '#FB923C', readTime: '5 min', title: "Hardware End-of-Life Starts with Knowing What's There",desc: "You can't retire hardware you don't know you have. The lifecycle management problem is, at its root, an inventory problem." },
  { cat: 'CMDB',           catColor: '#00D1FF', readTime: '6 min', title: 'Physical Moves, Logical Blindness: How Racks Drift',   desc: "Every physical swap that doesn't trigger a ticket is a CMDB lie. This maps the failure modes: what moves silently, why, and what it costs." },
  { cat: 'Security',       catColor: '#EF4444', readTime: '7 min', title: 'Physical Inventory Is a Security Problem',             desc: 'Unknown devices draw power, hold firmware, and occupy ports. Security posture is only as good as the accuracy of the physical record.' },
  { cat: 'Operations',     catColor: '#F59E0B', readTime: '5 min', title: 'Capacity Planning Starts at the Physical Layer',       desc: "U-space, power draw, and cooling load per rack — none of these can be planned from a CMDB that has drifted from physical reality." },
];

const CATS = ['All', 'CMDB', 'Infrastructure', 'Compliance', 'Security', 'Operations', 'Lifecycle', 'Inventory'];


/* ── page ───────────────────────────────────────────── */
export default function ResourcesPage() {
  const [filter, setFilter] = useState('All');

  const featured = POSTS[0];
  const showAll  = filter === 'All';
  const gridPosts = showAll ? POSTS.slice(1) : POSTS.filter(p => p.cat === filter);

  return (
    <div className="rp">

      {/* ══ HERO ══════════════════════════════════════ */}
      <section className="rp-hero">
        <div className="rp-hero-text">
          <div className="rp-pill">
            <span className="rp-pill-dot" />Resources
          </div>
          <h1 className="rp-hero-h1">
            Intelligence worth<br />protecting.{' '}
            <span className="rp-grad">Knowledge<br />worth sharing.</span>
          </h1>
          <p className="rp-hero-sub">
            Four gated assets for buyers doing the math, and ten public posts on CMDB
            drift, audit failure modes, and evidence-grade physical inventory.
          </p>
          <div className="rp-stats">
            <div className="rp-stat">
              <span className="rp-stat-n">4</span>
              <span className="rp-stat-l">Gated resources</span>
            </div>
            <div className="rp-stat-sep" />
            <div className="rp-stat">
              <span className="rp-stat-n">10</span>
              <span className="rp-stat-l">Public posts</span>
            </div>
            <div className="rp-stat-sep" />
            <div className="rp-stat">
              <span className="rp-stat-n">0</span>
              <span className="rp-stat-l">Architecture details</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VAULT ═════════════════════════════════════ */}
      <section className="rp-vault">
        <div className="rp-vault-bg-glow" />
        <div className="rp-container">

          <div className="rp-eyebrow rp-eyebrow--pu">
            <LockIcon />Restricted Access
          </div>
          <h2 className="rp-h2">The documents behind the claim.</h2>
          <p className="rp-sub">
            Designed for qualified evaluations. Implementation details, source lists,
            and architecture stay out of public view.
          </p>

          {/* Featured vault card — ROI Calculator */}
          <article className="rp-vault-hero">
            <div className="rp-vault-hero-body">
              <span className="rp-vault-badge">Calculator</span>
              <h3 className="rp-vault-hero-title">ROI Calculator</h3>
              <p className="rp-vault-hero-desc">
                An interactive sensitivity model behind the $1M–$2.5M annual value claim
                for a 500-rack footprint. Adjustable for rack count, audit cycle frequency,
                and headcount assumptions.
              </p>
              <Link to="/contact" className="rp-vault-cta">
                Request access <ArrowIcon />
              </Link>
            </div>
            <div className="rp-vault-hero-aside">
              <p className="rp-vault-aside-value">$1M–$2.5M</p>
              <p className="rp-vault-aside-label">annual value modeled</p>
              <p className="rp-vault-aside-sub">500-rack footprint · adjustable inputs</p>
            </div>
          </article>

          {/* Three smaller vault cards */}
          <div className="rp-vault-grid">
            {GATED.slice(1).map(asset => (
              <article key={asset.title} className="rp-vault-card">
                <div className="rp-vault-card-top">
                  <span className="rp-vault-badge">{asset.cat}</span>
                  <span className="rp-vault-lock"><LockIcon /></span>
                </div>
                <h3 className="rp-vault-card-title">{asset.title}</h3>
                <p className="rp-vault-card-desc">{asset.desc}</p>
                <Link to="/contact" className="rp-vault-link">Request access →</Link>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ══ BRIEF ═════════════════════════════════════ */}
      <section className="rp-brief">
        <div className="rp-container">

          <div className="rp-eyebrow rp-eyebrow--cy">
            <span className="rp-dot" />Public Reading
          </div>
          <h2 className="rp-h2">Category thinking,<br />without the blueprint.</h2>
          <p className="rp-sub">
            Eight to twelve posts on CMDB drift, audit failure modes, and evidence-grade
            physical inventory. Categorical, not technical. No product methodology.
          </p>

          {/* Category filters */}
          <div className="rp-filters" role="group" aria-label="Filter by category">
            {CATS.map(cat => (
              <button
                key={cat}
                className={'rp-filter' + (filter === cat ? ' rp-filter--on' : '')}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post — shown only in "All" view */}
          {showAll && (
            <article className="rp-post-hero">
              <div className="rp-post-hero-body">
                <div className="rp-post-meta">
                  <span className="rp-post-cat" style={{ color: featured.catColor, background: `${featured.catColor}1A`, borderColor: `${featured.catColor}40` }}>
                    {featured.cat}
                  </span>
                  <span className="rp-post-time">{featured.readTime} read</span>
                </div>
                <h3 className="rp-post-hero-title">{featured.title}</h3>
                <p className="rp-post-hero-desc">{featured.desc}</p>
                <Link to="/contact" className="rp-post-hero-cta" style={{ color: featured.catColor }}>
                  Read the piece →
                </Link>
              </div>
              <div className="rp-post-hero-art" style={{ '--art': featured.catColor } as CSSProperties}>
                <span className="rp-art-n">01</span>
                <div className="rp-art-bars">
                  <span style={{ height: '60%' }} /><span style={{ height: '85%' }} />
                  <span style={{ height: '45%' }} /><span style={{ height: '70%' }} />
                  <span style={{ height: '55%' }} />
                </div>
              </div>
            </article>
          )}

          {/* Post grid */}
          <div className="rp-post-grid">
            {gridPosts.map(post => (
              <article key={post.title} className="rp-post-card" style={{ '--c': post.catColor } as CSSProperties}>
                <div className="rp-post-meta">
                  <span className="rp-post-cat" style={{ color: post.catColor, background: `${post.catColor}1A`, borderColor: `${post.catColor}40` }}>
                    {post.cat}
                  </span>
                  <span className="rp-post-time">{post.readTime} read</span>
                </div>
                <h3 className="rp-post-card-title">{post.title}</h3>
                <p className="rp-post-card-desc">{post.desc}</p>
                <Link to="/contact" className="rp-post-read" style={{ color: post.catColor }}>
                  Read →
                </Link>
              </article>
            ))}
            {gridPosts.length === 0 && (
              <p className="rp-no-posts">No posts in this category yet.</p>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
