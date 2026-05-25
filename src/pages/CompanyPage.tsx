import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import './CompanyPage.css';

type RevealProps = {
  children: ReactNode;
  from?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
};

function Reveal({ children, from = 'bottom', delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden: Record<NonNullable<RevealProps['from']>, string> = {
    top:    'translate3d(0, -28px, 0)',
    bottom: 'translate3d(0, 32px, 0)',
    left:   'translate3d(-36px, 0, 0)',
    right:  'translate3d(36px, 0, 0)',
  };

  return (
    <div
      ref={ref}
      className={`cp-reveal ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0,0,0)' : hidden[from],
        transition: `opacity 520ms cubic-bezier(0.22,1,0.36,1) ${isVisible ? delay : 0}ms, transform 520ms cubic-bezier(0.22,1,0.36,1) ${isVisible ? delay : 0}ms`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ── Animated SVG icons ── */
function IconDrift() {
  return (
    <svg width="40" height="40" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <style>{`
        @keyframes rt-rowDrift { 0%,100%{transform:translateX(0px)} 45%{transform:translateX(7px)} 75%{transform:translateX(-4px)} }
        @keyframes rt-rowFade  { 0%,100%{opacity:0.9} 50%{opacity:0.3} }
        .rt-row1{animation:rt-rowDrift 2.1s ease-in-out infinite}
        .rt-row2{animation:rt-rowDrift 2.1s ease-in-out infinite 0.25s}
        .rt-row3{animation:rt-rowDrift 2.1s ease-in-out infinite 0.5s;animation-direction:reverse}
        .rt-warn{animation:rt-rowFade 1.1s ease-in-out infinite}
      `}</style>
      <ellipse cx="14" cy="7" rx="10" ry="3" stroke="#00D1FF" strokeWidth="1.4" fill="none" opacity="0.7"/>
      <line x1="4" y1="7" x2="4" y2="22" stroke="#00D1FF" strokeWidth="1.4" opacity="0.4"/>
      <line x1="24" y1="7" x2="24" y2="22" stroke="#00D1FF" strokeWidth="1.4" opacity="0.4"/>
      <ellipse cx="14" cy="22" rx="10" ry="3" stroke="#00D1FF" strokeWidth="1.4" fill="none" opacity="0.4"/>
      <g className="rt-row1"><rect x="6" y="11" width="16" height="2.5" rx="1" fill="#00D1FF" opacity="0.6"/></g>
      <g className="rt-row2"><rect x="6" y="15.5" width="12" height="2.5" rx="1" fill="#00D1FF" opacity="0.4"/></g>
      <g className="rt-row3"><rect x="6" y="20" width="9" height="2" rx="1" fill="#00D1FF" opacity="0.25"/></g>
      <circle cx="28" cy="28" r="5.5" fill="#0B1026" className="rt-warn"/>
      <circle cx="28" cy="28" r="5.5" stroke="#FF6B6B" strokeWidth="1.2" fill="none" className="rt-warn"/>
      <line x1="28" y1="25" x2="28" y2="28.5" stroke="#FF6B6B" strokeWidth="1.4" strokeLinecap="round" className="rt-warn"/>
      <circle cx="28" cy="30.5" r="0.8" fill="#FF6B6B" className="rt-warn"/>
    </svg>
  );
}

function IconBlind() {
  return (
    <svg width="40" height="40" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <style>{`
        @keyframes rt-scanMove { 0%{transform:translateX(-8px);opacity:0} 15%{opacity:0.7} 85%{opacity:0.7} 100%{transform:translateX(8px);opacity:0} }
        @keyframes rt-irisFlicker { 0%,100%{r:3;opacity:1} 50%{r:1.5;opacity:0.3} }
        .rt-scan{animation:rt-scanMove 1.55s ease-in-out infinite}
        .rt-iris{animation:rt-irisFlicker 1.55s ease-in-out infinite}
      `}</style>
      <path d="M4 18 C9 9, 27 9, 32 18 C27 27, 9 27, 4 18Z" stroke="#00D1FF" strokeWidth="1.4" fill="none" opacity="0.7"/>
      <circle cx="18" cy="18" r="5.5" stroke="#00D1FF" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <circle cx="18" cy="18" r="3" fill="#00D1FF" className="rt-iris"/>
      <g className="rt-scan"><line x1="10" y1="18" x2="26" y2="18" stroke="#00D1FF" strokeWidth="1" strokeDasharray="2 3" opacity="0.8"/></g>
      <line x1="7" y1="7" x2="29" y2="29" stroke="#FF6B6B" strokeWidth="1.8" strokeLinecap="round" opacity="0.85"/>
    </svg>
  );
}

function IconStale() {
  return (
    <svg width="40" height="40" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <style>{`
        @keyframes rt-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes rt-xPulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .rt-hand{transform-origin:16px 16px;animation:rt-spin 2.6s linear infinite}
        .rt-xmark{animation:rt-xPulse 1s ease-in-out infinite}
      `}</style>
      <circle cx="16" cy="16" r="11" stroke="#00D1FF" strokeWidth="1.4" fill="none" opacity="0.7"/>
      <line x1="16" y1="6.5" x2="16" y2="8.5"  stroke="#00D1FF" strokeWidth="1.2" opacity="0.4"/>
      <line x1="16" y1="23.5" x2="16" y2="25.5" stroke="#00D1FF" strokeWidth="1.2" opacity="0.4"/>
      <line x1="6.5" y1="16" x2="8.5" y2="16"   stroke="#00D1FF" strokeWidth="1.2" opacity="0.4"/>
      <line x1="23.5" y1="16" x2="25.5" y2="16"  stroke="#00D1FF" strokeWidth="1.2" opacity="0.4"/>
      <line x1="16" y1="16" x2="16" y2="9" stroke="#00D1FF" strokeWidth="1.6" strokeLinecap="round" className="rt-hand"/>
      <line x1="16" y1="16" x2="21" y2="16" stroke="#00D1FF" strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
      <circle cx="27" cy="27" r="6" fill="#0B1026"/>
      <circle cx="27" cy="27" r="6" stroke="#FF6B6B" strokeWidth="1.2" fill="none" className="rt-xmark"/>
      <line x1="24" y1="24" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" className="rt-xmark"/>
      <line x1="30" y1="24" x2="24" y2="30" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" className="rt-xmark"/>
    </svg>
  );
}

const PROBLEMS = [
  { Icon: IconDrift,  tag: '01', title: 'CMDBs drifted',              desc: 'Records fell out of sync the moment something changed in the physical world. The system said one thing. The rack said another.' },
  { Icon: IconBlind,  tag: '02', title: 'Discovery tools were blind',  desc: 'Network tools saw packets — not positions. Physical location was guessed, never verified. The rack was a black box.' },
  { Icon: IconStale,  tag: '03', title: 'Audits were always stale',    desc: 'Manual audits finished weeks after they started — outdated before they were done. Compliance ran on expired snapshots.' },
];

const TEAM = [
  {
    name: 'Ravi Kiran',
    role: 'Co-Founder & CTO',
    bio: 'IET Fellow, Senior IEEE Member. 20+ years architecting enterprise network infrastructure.',
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:ravi@racktrack.ai',
  },
  {
    name: 'Sravan Sai Kumar',
    role: 'Co-Founder & CEO',
    bio: 'Network engineer.',
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:sravan@racktrack.ai',
  },
]

const STATS = [
  { value: '20+',  label: 'Years of combined\ndata center leadership' },
  { value: '3',    label: 'Root problems\nidentified and solved' },
  { value: '1',    label: 'Trusted truth layer\nfor every rack' },
];

export default function CompanyPage() {
  return (
    <div className="company-page">

      {/* ══════════════════════════════
          HERO — split layout
      ══════════════════════════════ */}
      <section className="cp-hero">
        <div className="cp-hero-bg" aria-hidden="true" />

        {/* Left — story text */}
        <div className="cp-hero-left">
          <Reveal from="left">
            <p className="cp-eyebrow">
              <span className="cp-eyebrow-dot" />
              Our Story
            </p>
          </Reveal>

          <Reveal from="left" delay={80}>
            <h1 className="cp-hero-h1">
              Why we built<br />
              <span className="cp-gradient-text">RackTrack</span>
            </h1>
          </Reveal>

          <Reveal from="bottom" delay={160}>
            <blockquote className="cp-hero-quote">
              <span className="cp-quote-mark">"</span>
              Every system above the rack assumed the rack matched the record.
              No system could prove it.
            </blockquote>
          </Reveal>

          <Reveal from="bottom" delay={220}>
            <p className="cp-hero-sub">
              Two decades of running enterprise infrastructure — and one problem that never went away.
              We stopped waiting for someone else to solve it.
            </p>
          </Reveal>
        </div>

        {/* Right — animated stats */}
        <div className="cp-hero-right">
          <div className="cp-stats-wrap">
            {STATS.map((s, i) => (
              <Reveal key={s.value} from="right" delay={120 + i * 100}>
                <div className="cp-stat-card">
                  <div className="cp-stat-top-line" />
                  <span className="cp-stat-value">{s.value}</span>
                  <span className="cp-stat-label">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PROBLEM SECTION — 3 horizontal cards
      ══════════════════════════════ */}
      <section className="cp-problems">
        <Reveal from="bottom">
          <div className="cp-section-head">
            <p className="cp-eyebrow"><span className="cp-eyebrow-dot" />The problem we kept hitting</p>
            <h2 className="cp-section-h2">The same wall.<br /><span className="cp-gradient-text">Three ways.</span></h2>
          </div>
        </Reveal>

        <div className="cp-problem-grid">
          {PROBLEMS.map(({ Icon, tag, title, desc }, i) => (
            <Reveal key={title} from="bottom" delay={i * 130}>
              <article className="cp-problem-card">
                <div className="cp-problem-card-glow" />
                <span className="cp-problem-tag">{tag}</span>
                <div className="cp-problem-icon-wrap">
                  <Icon />
                </div>
                <h3 className="cp-problem-title">{title}</h3>
                <p className="cp-problem-desc">{desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          CONSEQUENCES + QUESTION — split
      ══════════════════════════════ */}
      <section className="cp-insight">
        <Reveal from="left" className="cp-insight-left">
          <div>
            <p className="cp-eyebrow"><span className="cp-eyebrow-dot" />The consequences</p>
            <h2 className="cp-insight-h2">Incidents that should take seconds took twenty minutes.</h2>
            <p className="cp-insight-body">
              Unplanned outages. Compliance failures. Ghost assets drawing power and license cost.
              The data existed — it was just never trustworthy enough to act on.
            </p>
            <div className="cp-consequence-list">
              {['Outages with no clear cause', 'Compliance runs on expired snapshots', 'Security blind spots no one owns', 'Incident response measured in hours'].map((item) => (
                <div key={item} className="cp-consequence-item">
                  <span className="cp-consequence-dot" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal from="right" delay={140} className="cp-insight-right">
          <div className="cp-question-card">
            <div className="cp-question-card-glow" />
            <div className="cp-question-card-line" />
            <p className="cp-eyebrow"><span className="cp-eyebrow-dot" />The question that started everything</p>
            <p className="cp-question-big">
              "What is <em>actually</em> in that rack right now?"
            </p>
            <p className="cp-question-body">
              RackTrack was built to answer that question — connecting physical assets with live network data
              to deliver <span className="cp-cyan-text">trusted, audit-ready intelligence</span> for
              operations, incidents, and capacity planning.
            </p>
            <p className="cp-founding-attr">
              — Founded by infrastructure engineers who lived this problem.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════
          TEAM SECTION
      ══════════════════════════════ */}
      <section className="cp-team">
        <Reveal from="bottom">
          <p className="cp-eyebrow cp-eyebrow--center"><span className="cp-eyebrow-dot" />The team behind it</p>
          <h2 className="cp-team-h2">Meet the team</h2>
          <p className="cp-team-sub">Built by infrastructure veterans who've spent decades in the data center.</p>
        </Reveal>

        <div className="cp-team-grid team-card-grid">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} from={i === 0 ? 'left' : 'right'} delay={i * 100}>
              <article className="cp-team-card glass-card team-card">
                <div className="team-avatar" aria-hidden="true" />
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
                <div className="team-links" aria-label={`${member.name} links`}>
                  <a href={member.linkedin} aria-label={`${member.name} LinkedIn`} target="_blank" rel="noreferrer">in</a>
                  <a href={member.email} aria-label={`Email ${member.name}`}>@</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          MISSION — bold centered
      ══════════════════════════════ */}
      <section className="cp-mission">
        <div className="cp-mission-bg" aria-hidden="true" />
        <Reveal from="bottom">
          <p className="cp-eyebrow cp-eyebrow--center"><span className="cp-eyebrow-dot" />Our mission</p>
          <h2 className="cp-mission-h2">
            Build the Physical Intelligence Layer<br />
            <span className="cp-gradient-text">for the modern data center.</span>
          </h2>
          <p className="cp-mission-sub">
            Not an audit tool. Not a DCIM replacement.<br />
            The truth layer underneath both.
          </p>
        </Reveal>
      </section>

    </div>
  );
}
