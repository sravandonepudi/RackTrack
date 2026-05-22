import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import './CompanyPage.css';
 
type RevealProps = {
  children: ReactNode;
  from?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
};
 
function Reveal({ children, from = 'bottom', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hideTimer.current) {
            window.clearTimeout(hideTimer.current);
            hideTimer.current = null;
          }
          setIsVisible(true);
          return;
        }

        if (!hideTimer.current) {
          hideTimer.current = window.setTimeout(() => {
            setIsVisible(false);
            hideTimer.current = null;
          }, 180);
        }
      },
      { threshold: 0, rootMargin: '12% 0px 12% 0px' }
    );
    observer.observe(el);
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      observer.disconnect();
    };
  }, []);

  const hiddenTransforms: Record<NonNullable<RevealProps['from']>, string> = {
    top: 'translate3d(0, -24px, 0)',
    bottom: 'translate3d(0, 24px, 0)',
    left: 'translate3d(-28px, 0, 0)',
    right: 'translate3d(28px, 0, 0)',
  };
 
  const revealStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : hiddenTransforms[from],
    filter: 'none',
    transitionProperty: 'opacity, transform',
    transitionDuration: '420ms',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };
 
  return (
    <div ref={ref} className={`reveal reveal-${from}`} style={revealStyle}>
      {children}
    </div>
  );
}
 
/* ─────────────────────────────────────────
   Animated SVG icons
───────────────────────────────────────── */
function IconDrift() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <style>{`
        @keyframes rt-rowDrift {
          0%,100% { transform: translateX(0px); }
          45%      { transform: translateX(7px); }
          75%      { transform: translateX(-4px); }
        }
        @keyframes rt-rowFade {
          0%,100% { opacity: 0.9; }
          50%      { opacity: 0.3; }
        }
        .rt-row1 { animation: rt-rowDrift 2.1s ease-in-out infinite; }
        .rt-row2 { animation: rt-rowDrift 2.1s ease-in-out infinite 0.25s; }
        .rt-row3 { animation: rt-rowDrift 2.1s ease-in-out infinite 0.5s; animation-direction: reverse; }
        .rt-warn { animation: rt-rowFade 1.1s ease-in-out infinite; }
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
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <style>{`
        @keyframes rt-scanMove {
          0%   { transform: translateX(-8px); opacity: 0; }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.7; }
          100% { transform: translateX(8px); opacity: 0; }
        }
        @keyframes rt-irisFlicker {
          0%,100% { r: 3; opacity: 1; }
          50%      { r: 1.5; opacity: 0.3; }
        }
        .rt-scan { animation: rt-scanMove 1.55s ease-in-out infinite; }
        .rt-iris { animation: rt-irisFlicker 1.55s ease-in-out infinite; }
      `}</style>
      <path d="M4 18 C9 9, 27 9, 32 18 C27 27, 9 27, 4 18Z" stroke="#00D1FF" strokeWidth="1.4" fill="none" opacity="0.7"/>
      <circle cx="18" cy="18" r="5.5" stroke="#00D1FF" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <circle cx="18" cy="18" r="3" fill="#00D1FF" className="rt-iris"/>
      <g className="rt-scan">
        <line x1="10" y1="18" x2="26" y2="18" stroke="#00D1FF" strokeWidth="1" strokeDasharray="2 3" opacity="0.8"/>
      </g>
      <line x1="7" y1="7" x2="29" y2="29" stroke="#FF6B6B" strokeWidth="1.8" strokeLinecap="round" opacity="0.85"/>
    </svg>
  );
}
 
function IconStale() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <style>{`
        @keyframes rt-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes rt-xPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.25; }
        }
        .rt-hand  { transform-origin: 16px 16px; animation: rt-spin 2.6s linear infinite; }
        .rt-xmark { animation: rt-xPulse 1s ease-in-out infinite; }
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
 
/* ── tokens ── */
const CYAN        = '#00D1FF';
const TEXT_BODY   = '#B6C2D9';
const TEXT_BRIGHT = '#FFFFFF';
const TEXT_MID    = '#dce6f5';
 
const problems = [
  { Icon: IconDrift,  title: 'CMDBs drifted',             desc: 'Records fell out of sync the moment something changed in the physical world.' },
  { Icon: IconBlind,  title: 'Discovery tools were blind', desc: 'Network tools saw packets — not positions. Physical location was guessed, never verified.' },
  { Icon: IconStale,  title: 'Audits were always stale',   desc: 'Manual audits finished weeks after they started — outdated before they were done.' },
];

const teamMembers = [
  {
    name: 'Ravi Kumar',
    role: 'Co-Founder & CTO',
    bio: 'IET Fellow, Senior IEEE Member. 20+ years architecting enterprise network infrastructure.',
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:ravi@racktrack.com',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Co-Founder & CEO',
    bio: 'Former VP of Infrastructure at Salesforce. Led data center operations for global scale.',
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:sarah@racktrack.com',
  },
];
 
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontSize: '0.6875rem', fontWeight: 600,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: CYAN, marginBottom: '0.75rem',
      display: 'flex', alignItems: 'center', gap: '0.75rem',
    }}>
      <span style={{ width: '1rem', height: '1px', background: CYAN, display: 'block' }} />
      {children}
    </p>
  );
}
 
export default function CompanyPage() {
  /* page outer padding — matches your site's existing side padding */
  const sidePad = '1rem';
  /* keeps story copy wide so the right side does not feel empty */
  const storyRightPad = 'clamp(2rem, 12vw, 12rem)';
 
  return (
    <div className="company-page">
 
      {/* ══════════════════════════════════════════════════════
          STORY SECTION
          Layout rhythm (matching screenshot):
            – "Our story" label + headline + sub-hook:
                LEFT edge  → starts at page left padding (far left)
                RIGHT edge → stops at ~55% of page width
            – Pull quote + problem cards:
                LEFT edge  → starts at page left padding
                RIGHT edge → stops just before centre (~52%)
            – Consequences + question box:
                fills full width with equal left/right padding
      ══════════════════════════════════════════════════════ */}
 
      <section style={{ padding: `4rem 0 5rem`, position: 'relative' }}>
 
        {/* ── BLOCK 1: "Our story" — anchored far LEFT ── */}
        <div style={{ paddingLeft: sidePad, paddingRight: storyRightPad, marginBottom: '2rem' }}>
 
          <Reveal from="left" delay={0}>
            <p style={{
              fontSize: '0.6875rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: CYAN, marginBottom: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{ width: '1.5rem', height: '1px', background: CYAN, display: 'block' }} />
              Our story
            </p>
          </Reveal>
 
          <Reveal from="left" delay={80}>
            <h1 className="story-heading-gradient" style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)',
              fontWeight: 700, lineHeight: 1.1,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(100deg, #FFFFFF 0%, #E9FDFF 18%, #2EEFFF 42%, #16A8FF 70%, #7C6CFF 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}>
              Why we built{' '}
              <span>RackTrack</span>
            </h1>
          </Reveal>
 
          <Reveal from="bottom" delay={140}>
            <p style={{ fontSize: '1.0625rem', color: TEXT_BODY, lineHeight: 1.8 }}>
              Two decades of running enterprise infrastructure — and one problem that never went away.
            </p>
          </Reveal>
 
        </div>
 
        {/* full-width rule */}
        <Reveal from="left" delay={170}>
          <hr style={{
            border: 'none', borderTop: '0.5px solid rgba(255,255,255,0.07)',
            margin: `0 ${sidePad} 1.75rem`,
          }} />
        </Reveal>
 
        {/* Pull quote — anchored LEFT, stops before centre */}
        <div style={{ paddingLeft: sidePad, paddingRight: storyRightPad, marginBottom: '3.5rem' }}>
          <Reveal from="bottom" delay={210}>
            <blockquote style={{
              borderLeft: `2px solid ${CYAN}`, borderRadius: 0,
              padding: '1.25rem 1.75rem',
              background: 'rgba(0,209,255,0.03)',
            }}>
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: TEXT_MID, lineHeight: 1.7 }}>
                "Every system above the rack assumed the rack matched the record.
                No system could prove it."
              </p>
            </blockquote>
          </Reveal>
        </div>
 
        {/* ── BLOCK 2: "The problem" — anchored LEFT, stops before centre ── */}
        <div style={{ paddingLeft: sidePad, paddingRight: storyRightPad, marginBottom: '1.75rem' }}>
          <Reveal from="bottom" delay={250}>
            <SectionLabel>The problem</SectionLabel>
            <p style={{ fontSize: '1rem', color: TEXT_MID, lineHeight: 1.8 }}>
              We kept hitting the same wall — and it showed up in three ways, every time.
            </p>
          </Reveal>
        </div>
 
        {/* Problem cards — anchored LEFT, stops before centre */}
        <div style={{ paddingLeft: sidePad, paddingRight: storyRightPad, marginBottom: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {problems.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} from="left" delay={310 + i * 110}>
                <div
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex', alignItems: 'flex-start', gap: '1.1rem',
                    position: 'relative', overflow: 'hidden',
                    transition: 'border-color 0.25s ease, background 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,209,255,0.45)';
                    (e.currentTarget as HTMLDivElement).style.background   = 'rgba(0,209,255,0.07)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,209,255,0.18)';
                    (e.currentTarget as HTMLDivElement).style.background   = 'rgba(0,209,255,0.04)';
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, opacity: 0.35 }} />
                  <div style={{ flexShrink: 0, marginTop: '2px' }}><Icon /></div>
                  <div>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: TEXT_BRIGHT, marginBottom: '0.3rem' }}>{title}</p>
                    <p style={{ fontSize: '0.875rem', color: TEXT_BODY, lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
 
        {/* ── BLOCK 3: "The consequences" + question — FULL WIDTH with equal side padding ── */}
        <div style={{ paddingLeft: sidePad, paddingRight: sidePad }}>
 
          <Reveal from="bottom" delay={320}>
            <SectionLabel>The consequences</SectionLabel>
            <p style={{ fontSize: '1rem', color: TEXT_MID, lineHeight: 1.8, marginBottom: '3rem' }}>
              Unplanned outages. Compliance failures.{' '}
              <strong style={{ color: TEXT_BRIGHT, fontWeight: 600 }}>
                20-minute incident pinpoint times that should have taken seconds.
              </strong>{' '}
              The data existed — it was just never trustworthy enough to act on.
            </p>
          </Reveal>
 
          <Reveal from="bottom" delay={370}>
            <SectionLabel>The question that started everything</SectionLabel>
            <div style={{
              background: 'rgba(0,209,255,0.05)',
              border: '1px solid rgba(0,209,255,0.2)',
              borderRadius: '0.625rem',
              padding: '2rem 2.25rem',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }} />
              <p style={{ fontSize: '1rem', color: TEXT_MID, lineHeight: 1.85, marginBottom: '1.25rem' }}>
                RackTrack was built to answer a critical question for every infrastructure team:{' '}
                <span style={{ color: CYAN, fontStyle: 'italic', fontWeight: 500 }}>
                  "what is actually in that rack right now?"
                </span>
              </p>
              <p style={{ fontSize: '1rem', color: TEXT_MID, lineHeight: 1.85 }}>
                We created RackTrack to provide a real-time, verified view of rack infrastructure —
                connecting physical assets with live network data to deliver{' '}
                <span style={{ color: CYAN, fontWeight: 500 }}>trusted, audit-ready intelligence</span>{' '}
                for operations, incidents, and capacity planning.
              </p>
            </div>
          </Reveal>
 
          <Reveal from="bottom" delay={450}>
            <p style={{
              marginTop: '3rem',
              fontSize: '0.8125rem',
              color: 'rgba(182,194,217,0.35)',
              letterSpacing: '0.04em',
            }}>
              — Founded by infrastructure engineers who lived this problem.
            </p>
          </Reveal>
 
        </div>
      </section>
 
      {/* ── FOUNDER BACKGROUND ── */}
      <section style={{ padding: '1rem 4rem 7rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <Reveal from="bottom">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SectionLabel>The team behind it</SectionLabel>
            </div>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: TEXT_BRIGHT,
              marginBottom: '3rem',
            }}>
              Meet the team
            </h2>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '2rem',
          }} className="team-card-grid">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} from={index === 0 ? 'left' : 'right'} delay={index * 100}>
                <article className="glass-card team-card">
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
        </div>
      </section>

      <section id="story" style={{ display: 'none' }}>
        <div style={{
          maxWidth: '80rem', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '6rem', alignItems: 'center',
        }} className="max-lg:grid-cols-1">
 
          <Reveal from="left">
            <div>
              <div style={{
                fontSize: '0.6875rem', fontWeight: 500,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: CYAN, marginBottom: '1rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <span style={{ display: 'block', width: '1.5rem', height: '1px', background: CYAN }} />
                The team behind it
              </div>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700, lineHeight: 1.14, marginBottom: '2rem',
                background: `linear-gradient(100deg, ${TEXT_BRIGHT} 0%, #E9FDFF 16%, #16E7FF 38%, ${CYAN} 58%, #7C6CFF 100%)`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'clamp(1.6rem, 3.3vw, 2.5rem)' }}>RackTrack evolved from</span>
                <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'clamp(1.6rem, 3.3vw, 2.5rem)' }}>records and reality</span>
              </h2>
              <p style={{ fontSize: '1rem', color: TEXT_MID, lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Enterprise teams operated through fragmented infrastructure visibility.
                Critical systems relied on records that quickly became outdated.
                Meanwhile, the rack remained the operational blind spot.
              </p>
              <p style={{
                fontSize: '1rem', color: TEXT_MID, lineHeight: 1.8,
                borderLeft: '2px solid rgba(0,209,255,0.42)', borderRadius: 0,
                paddingLeft: '1.25rem', fontStyle: 'italic',
              }}>
                Not an audit tool. Not a DCIM replacement. The truth layer underneath both.
              </p>
            </div>
          </Reveal>
 
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }} />
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '3.5rem', fontWeight: 800, color: 'rgba(0,209,255,0.5)', lineHeight: 1, marginBottom: '0.5rem' }}>20+</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: TEXT_BRIGHT, marginBottom: '0.375rem' }}>Years of combined DC leadership</div>
              <div style={{ fontSize: '0.875rem', color: TEXT_MID }}>Financial services, healthcare, enterprise, hyperscale.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {(['Physical-first thinking', 'Built for live operations', 'Evidence, not assumptions', 'Designed for scale'] as const).map((s, i) => (
                <Reveal key={s} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 80}>
                  <div className="glass-card" style={{ padding: '1.25rem', fontSize: '0.875rem', color: TEXT_MID, height: '100%' }}>
                    + {s}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
 
        </div>
      </section>
 
      {/* ── TEAM ── */}
      <section style={{ padding: '0 4rem 7rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '50rem', margin: '0 auto' }}>
          <Reveal from="bottom">
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              color: TEXT_BRIGHT,
              marginBottom: '1.25rem',
            }}>
              Meet the Team
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: TEXT_MID,
              lineHeight: 1.75,
              marginBottom: '4.5rem',
            }}>
              Built by infrastructure veterans who've spent decades in the data center.
            </p>
          </Reveal>
 
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '2rem',
          }}>
            {[0, 1].map((card) => (
              <Reveal key={card} from="bottom" delay={card * 100}>
                <div className="glass-card" style={{
                  minHeight: '18rem',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(0,0,0,0.22)',
                  borderColor: 'rgba(255,255,255,0.14)',
                }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── MISSION ── */}
      <section style={{ padding: '0 4rem 7rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <Reveal from="bottom">
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              color: TEXT_BRIGHT,
              marginBottom: '1.25rem',
            }}>
              Our Mission
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: TEXT_MID,
              lineHeight: 1.75,
            }}>
              To Built Physical Intelligence Layer for the modern data center.
            </p>
          </Reveal>
        </div>
      </section>
 
    </div>
  );
}
 
 
 
 
