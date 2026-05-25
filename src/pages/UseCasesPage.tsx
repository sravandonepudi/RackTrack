import { Link } from 'react-router-dom';
import { useState } from 'react';
import './UseCasesPage.css';

const FEATURES = [
  { label: 'AISENSE', title: 'Configured' },
  { label: '98 PORTS', title: 'Mapped' },
  { label: '0/5 CABLES', title: 'Detected' },
  { label: '100% SYNC', title: 'Verified' },
];

const HERO_FEATURES: { iconClass: string; label: string; description: string; stat: string; color: string; icon: JSX.Element }[] = [
  {
    iconClass: 'ai-chip',
    label: 'AI Powered Scanning',
    description: 'Intelligent automation for faster, smarter scanning.',
    stat: '3× Faster',
    color: '#00D1FF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="7" y="7" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="10" y="10" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.3"/>
        <circle cx="14" cy="14" r="2" fill="currentColor"/>
        <line x1="4" y1="10" x2="7" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="4" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="4" y1="18" x2="7" y2="18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="21" y1="10" x2="24" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="21" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="21" y1="18" x2="24" y2="18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="10" y1="4" x2="10" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="14" y1="4" x2="14" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="18" y1="4" x2="18" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="10" y1="21" x2="10" y2="24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="14" y1="21" x2="14" y2="24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="18" y1="21" x2="18" y2="24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    iconClass: 'visibility-cube',
    label: 'Complete Visibility',
    description: 'End-to-end visibility across your entire inventory.',
    stat: '100% Coverage',
    color: '#4488FF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 6C8 6 3.5 12 3.5 14S8 22 14 22s10.5-6 10.5-8-4.5-8-10.5-8z" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="14" cy="14" r="4" fill="currentColor" opacity="0.55"/>
        <circle cx="14" cy="14" r="2" fill="currentColor"/>
        <circle cx="15.5" cy="12.5" r="0.9" fill="white" opacity="0.5"/>
      </svg>
    ),
  },
  {
    iconClass: 'validation-shield',
    label: 'Instant Validation',
    description: 'Real-time data validation for accurate results you can trust.',
    stat: 'Real-Time',
    color: '#9B7CFF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3L5 7v7c0 5.5 3.9 10.2 9 11.9 5.1-1.7 9-6.4 9-11.9V7L14 3z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M9.5 14l3.5 3.5L19 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    iconClass: 'integration-puzzle',
    label: 'Seamless Integration',
    description: 'Connect effortlessly with your existing systems and workflows.',
    stat: 'Zero Friction',
    color: '#22E68A',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.65"/>
        <circle cx="5" cy="7.5" r="2.2" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="23" cy="7.5" r="2.2" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="5" cy="20.5" r="2.2" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="23" cy="20.5" r="2.2" stroke="currentColor" strokeWidth="1.4"/>
        <line x1="7.1" y1="8.7" x2="11.4" y2="11.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="20.9" y1="8.7" x2="16.6" y2="11.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="7.1" y1="19.3" x2="11.4" y2="16.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="20.9" y1="19.3" x2="16.6" y2="16.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const OUTCOME_CARDS = [
  {
    iconClass: 'target',
    icon: '🎯',
    value: '99%+',
    label: 'Inventory Accuracy',
    description: 'AI-powered scanning ensures industry-leading accuracy across your entire inventory.',
  },
  {
    iconClass: 'clock',
    icon: '⏱',
    value: '5-15 Min',
    label: 'From Rack Scan to Insights',
    description: 'Transform raw data into actionable insights in minutes, not hours.',
  },
  {
    iconClass: 'growth',
    icon: '📈',
    value: '90%+',
    label: 'Reduction in Manual Effort',
    description: 'Automate workflows and eliminate repetitive manual tasks with intelligent automation.',
  },
  {
    iconClass: 'infinity',
    icon: '♾',
    value: 'Continuous',
    label: 'Physical-to-Logical Reconciliation',
    description: 'Keep your physical infrastructure and logical records perfectly aligned.',
  },
];

const HERO_CALLOUTS = [
  {
    id: 'ai',
    iconText: 'AI',
    title: 'AI IDENTIFICATION',
    description: 'Devices, ports, cables and labels detected automatically.',
  },
  {
    id: 'validation',
    iconText: '',
    title: 'LIVE VALIDATION',
    description: 'Validate against live network data and discover neighbors.',
  },
  {
    id: 'sync',
    iconText: '',
    title: 'SYNC & AUTOMATE',
    description: 'Sync with ServiceNow CMDB and keep your infrastructure accurate.',
  },
];

const CARD_VISUALS: { [key: string]: JSX.Element } = {
  target: (
    <svg className="uc-flip-visual" viewBox="0 0 160 96" fill="none" aria-hidden="true">
      <circle cx="80" cy="48" r="44" stroke="rgba(0,209,255,0.1)" strokeWidth="10"/>
      <circle cx="80" cy="48" r="44" stroke="rgba(0,209,255,0.25)" strokeWidth="10" strokeLinecap="round" strokeDasharray="276" strokeDashoffset="138" transform="rotate(-90 80 48)"/>
      <circle cx="80" cy="48" r="44" stroke="#00D1FF" strokeWidth="10" strokeLinecap="round" strokeDasharray="276" strokeDashoffset="3" transform="rotate(-90 80 48)"/>
      <circle cx="80" cy="48" r="30" fill="rgba(0,209,255,0.07)"/>
      <circle cx="80" cy="48" r="16" fill="rgba(0,209,255,0.13)"/>
      <text x="80" y="44" textAnchor="middle" fill="#00D1FF" fontSize="17" fontWeight="800">99%+</text>
      <text x="80" y="58" textAnchor="middle" fill="rgba(0,209,255,0.65)" fontSize="7.5" fontWeight="600" letterSpacing="2">ACCURACY</text>
      <circle cx="80" cy="8" r="3.5" fill="#00D1FF" opacity="0.9"/>
      <circle cx="116" cy="18" r="2.5" fill="#00D1FF" opacity="0.5"/>
      <circle cx="44" cy="18" r="2.5" fill="#00D1FF" opacity="0.5"/>
    </svg>
  ),
  clock: (
    <svg className="uc-flip-visual" viewBox="0 0 160 96" fill="none" aria-hidden="true">
      <path d="M18 82 A62 62 0 0 1 142 82" stroke="rgba(155,124,255,0.12)" strokeWidth="10" strokeLinecap="round"/>
      <path d="M18 82 A62 62 0 0 1 60 26" stroke="rgba(155,124,255,0.3)" strokeWidth="10" strokeLinecap="round"/>
      <path d="M60 26 A62 62 0 0 1 115 30" stroke="#9B7CFF" strokeWidth="10" strokeLinecap="round"/>
      <line x1="80" y1="82" x2="112" y2="36" stroke="#c4a8ff" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="80" cy="82" r="8" fill="#9B7CFF"/>
      <circle cx="80" cy="82" r="3.5" fill="#100520"/>
      <text x="30" y="94" fill="rgba(155,124,255,0.5)" fontSize="7.5" fontWeight="600">SLOW</text>
      <text x="118" y="94" textAnchor="end" fill="#9B7CFF" fontSize="7.5" fontWeight="700">FAST</text>
      <text x="80" y="94" textAnchor="middle" fill="rgba(155,124,255,0.4)" fontSize="6.5" letterSpacing="0.5">5-15 MIN</text>
    </svg>
  ),
  growth: (
    <svg className="uc-flip-visual" viewBox="0 0 160 96" fill="none" aria-hidden="true">
      <line x1="10" y1="82" x2="155" y2="82" stroke="rgba(68,136,255,0.18)" strokeWidth="1"/>
      <rect x="12" y="18" width="24" height="64" fill="rgba(68,136,255,0.18)" rx="4"/>
      <rect x="44" y="32" width="24" height="50" fill="rgba(68,136,255,0.3)" rx="4"/>
      <rect x="76" y="48" width="24" height="34" fill="rgba(68,136,255,0.5)" rx="4"/>
      <rect x="108" y="66" width="24" height="16" fill="#4488FF" rx="4"/>
      <polyline points="24,18 56,32 88,48 120,66" stroke="#4488FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="18" r="3" fill="#4488FF"/>
      <circle cx="56" cy="32" r="3" fill="#4488FF"/>
      <circle cx="88" cy="48" r="3" fill="#4488FF"/>
      <circle cx="120" cy="66" r="3.5" fill="#4488FF"/>
      <path d="M142 10 L152 22 M147 10 L152 10 L152 16" stroke="#4488FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="80" y="95" textAnchor="middle" fill="rgba(68,136,255,0.65)" fontSize="7.5" fontWeight="600" letterSpacing="1.5">90% LESS EFFORT</text>
    </svg>
  ),
  infinity: (
    <svg className="uc-flip-visual" viewBox="0 0 160 96" fill="none" aria-hidden="true">
      <path d="M55 48 C55 34 63 24 75 24 C87 24 80 48 80 48 C80 48 73 72 85 72 C97 72 105 62 105 48 C105 34 97 24 85 24 C73 24 80 48 80 48 C80 48 87 72 75 72 C63 72 55 62 55 48Z" stroke="rgba(34,230,138,0.25)" strokeWidth="2.5" fill="rgba(34,230,138,0.05)"/>
      <path d="M55 48 C55 34 63 24 75 24 C87 24 80 48 80 48 C80 48 73 72 85 72 C97 72 105 62 105 48" stroke="#22E68A" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M105 48 C105 34 97 24 85 24 C73 24 80 48 80 48 C80 48 87 72 75 72 C63 72 55 62 55 48" stroke="rgba(34,230,138,0.45)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <circle cx="55" cy="48" r="4.5" fill="#22E68A"/>
      <circle cx="80" cy="48" r="3" fill="rgba(34,230,138,0.8)"/>
      <circle cx="105" cy="48" r="4.5" fill="rgba(34,230,138,0.5)"/>
      <path d="M65 26 L70 20 L75 26" stroke="#22E68A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M95 70 L90 76 L85 70" stroke="rgba(34,230,138,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="25" y="52" fill="rgba(34,230,138,0.55)" fontSize="7" fontWeight="600">Physical</text>
      <text x="120" y="52" fill="rgba(34,230,138,0.55)" fontSize="7" fontWeight="600">Logical</text>
      <text x="80" y="92" textAnchor="middle" fill="rgba(34,230,138,0.6)" fontSize="7.5" fontWeight="600" letterSpacing="1.5">ALWAYS IN SYNC</text>
    </svg>
  ),
};

const CARD_FRONT_VISUALS: { [key: string]: JSX.Element } = {
  target: (
    <svg className="uc-ffv" viewBox="0 0 160 88" fill="none" aria-hidden="true">
      <path d="M 22 78 A 58 58 0 1 1 138 78" stroke="rgba(0,209,255,0.1)" strokeWidth="9" strokeLinecap="round"/>
      <path d="M 22 78 A 58 58 0 1 1 138 78" stroke="#00d1ff" strokeWidth="9" strokeLinecap="round"
        strokeDasharray="181 183" className="uc-ffv-arc"/>
      <circle cx="138" cy="79" r="5" fill="#00d1ff"/>
      <text x="80" y="52" textAnchor="middle" fill="#00d1ff" fontSize="22" fontWeight="800" fontFamily="inherit">99%</text>
      <text x="80" y="67" textAnchor="middle" fill="rgba(180,200,220,0.5)" fontSize="9" fontFamily="inherit">accuracy rate</text>
    </svg>
  ),
  clock: (
    <svg className="uc-ffv" viewBox="0 0 160 88" fill="none" aria-hidden="true">
      <line x1="18" y1="46" x2="142" y2="46" stroke="rgba(155,124,255,0.15)" strokeWidth="2.5"/>
      <line x1="18" y1="46" x2="142" y2="46" stroke="#9B7CFF" strokeWidth="2.5" strokeDasharray="124" className="uc-ffv-line"/>
      <circle cx="18" cy="46" r="9" fill="#9B7CFF"/>
      <text x="18" y="49.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">1</text>
      <circle cx="80" cy="46" r="9" fill="#9B7CFF" opacity="0.75"/>
      <text x="80" y="49.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">2</text>
      <circle cx="142" cy="46" r="9" fill="#9B7CFF" opacity="0.5"/>
      <text x="142" y="49.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">3</text>
      <text x="18" y="67" textAnchor="middle" fill="rgba(155,124,255,0.7)" fontSize="8.5" fontFamily="inherit">Scan</text>
      <text x="80" y="67" textAnchor="middle" fill="rgba(155,124,255,0.7)" fontSize="8.5" fontFamily="inherit">Process</text>
      <text x="142" y="67" textAnchor="middle" fill="rgba(155,124,255,0.7)" fontSize="8.5" fontFamily="inherit">Insights</text>
      <text x="18" y="29" textAnchor="middle" fill="rgba(180,200,220,0.35)" fontSize="7.5" fontFamily="inherit">0 min</text>
      <text x="142" y="29" textAnchor="middle" fill="rgba(180,200,220,0.35)" fontSize="7.5" fontFamily="inherit">5-15 min</text>
    </svg>
  ),
  growth: (
    <svg className="uc-ffv" viewBox="0 0 160 88" fill="none" aria-hidden="true">
      <line x1="12" y1="72" x2="152" y2="72" stroke="rgba(68,136,255,0.2)" strokeWidth="1.5"/>
      <rect x="18" y="20" width="24" height="52" rx="4" fill="rgba(68,136,255,0.12)"/>
      <rect x="18" y="20" width="24" height="52" rx="4" fill="#4488FF" className="uc-ffv-bar" style={{animationDelay:'0s'}}/>
      <rect x="52" y="33" width="24" height="39" rx="4" fill="rgba(68,136,255,0.12)"/>
      <rect x="52" y="33" width="24" height="39" rx="4" fill="#4488FF" opacity="0.78" className="uc-ffv-bar" style={{animationDelay:'0.15s'}}/>
      <rect x="86" y="49" width="24" height="23" rx="4" fill="rgba(68,136,255,0.12)"/>
      <rect x="86" y="49" width="24" height="23" rx="4" fill="#4488FF" opacity="0.55" className="uc-ffv-bar" style={{animationDelay:'0.3s'}}/>
      <rect x="120" y="60" width="24" height="12" rx="4" fill="rgba(68,136,255,0.12)"/>
      <rect x="120" y="60" width="24" height="12" rx="4" fill="#4488FF" opacity="0.35" className="uc-ffv-bar" style={{animationDelay:'0.45s'}}/>
      <path d="M 30 28 Q 64 40 98 55 T 132 64" stroke="#4488FF" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.4"/>
      <text x="148" y="24" fill="rgba(68,136,255,0.65)" fontSize="14" textAnchor="middle">↘</text>
      <text x="80" y="84" textAnchor="middle" fill="rgba(180,200,220,0.38)" fontSize="8" fontFamily="inherit">manual effort over time</text>
    </svg>
  ),
  infinity: (
    <svg className="uc-ffv" viewBox="0 0 160 88" fill="none" aria-hidden="true">
      <circle cx="24" cy="25" r="1.3" fill="rgba(34,230,138,0.18)"/>
      <circle cx="48" cy="25" r="1.3" fill="rgba(34,230,138,0.18)"/>
      <circle cx="72" cy="25" r="1.3" fill="rgba(34,230,138,0.18)"/>
      <circle cx="96" cy="25" r="1.3" fill="rgba(34,230,138,0.18)"/>
      <circle cx="120" cy="25" r="1.3" fill="rgba(34,230,138,0.18)"/>
      <circle cx="144" cy="25" r="1.3" fill="rgba(34,230,138,0.18)"/>
      <circle cx="24" cy="44" r="1.3" fill="rgba(34,230,138,0.1)"/>
      <circle cx="48" cy="44" r="1.3" fill="rgba(34,230,138,0.1)"/>
      <circle cx="96" cy="44" r="1.3" fill="rgba(34,230,138,0.1)"/>
      <circle cx="120" cy="44" r="1.3" fill="rgba(34,230,138,0.1)"/>
      <circle cx="144" cy="44" r="1.3" fill="rgba(34,230,138,0.1)"/>
      <path d="M 8 44 C 26 10, 46 78, 80 44 S 134 10, 152 44" stroke="rgba(34,230,138,0.18)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 8 44 C 26 10, 46 78, 80 44 S 134 10, 152 44" stroke="#22E68A" strokeWidth="3" strokeLinecap="round" className="uc-ffv-wave"/>
      <circle cx="80" cy="44" r="5" fill="#22E68A" opacity="0.9" className="uc-ffv-dot"/>
      <circle cx="12" cy="72" r="4" fill="#22E68A" className="uc-ffv-blink"/>
      <text x="22" y="75.5" fill="rgba(34,230,138,0.65)" fontSize="8.5" fontFamily="inherit">Physical</text>
      <line x1="78" y1="72" x2="90" y2="72" stroke="rgba(34,230,138,0.3)" strokeWidth="1.5"/>
      <circle cx="98" cy="72" r="4" fill="#22E68A" opacity="0.6" className="uc-ffv-blink" style={{animationDelay:'0.6s'}}/>
      <text x="108" y="75.5" fill="rgba(180,200,220,0.5)" fontSize="8.5" fontFamily="inherit">Logical</text>
    </svg>
  ),
};

export default function UseCasesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeRackSlot, setActiveRackSlot] = useState<number | null>(null);

  return (
    <div className="use-cases-page">
      <section className="uc-hero">
        <div className="uc-hero-wrapper">
          <div className="uc-hero-content">
            <div className="uc-badge">USE CASES</div>
            <h1 className="uc-hero-title">
              Built for every <span className="uc-highlight">infrastructure</span> moment.
            </h1>
            <p className="uc-hero-subtitle">
              RackTrack empowers data center teams with AI-powered rack intelligence to streamline operations, reduce risk, and maintain a single source of truth.
            </p>
            <div className="uc-hero-cta">
              <Link to="#use-cases-grid" className="uc-btn-primary">Explore Use Cases <span aria-hidden="true">-&gt;</span></Link>
              <Link to="/contact" className="uc-btn-secondary"><span className="uc-play-icon" aria-hidden="true" />Book a Demo</Link>
            </div>

          </div>

          <div className="uc-hero-visual">
            <div className="uc-rack-visualization">
              <div className="uc-orbit uc-orbit-one" />
              <div className="uc-orbit uc-orbit-two" />
              <div className="uc-holo-floor" />

              <div className="uc-rack-container">
                <div className="uc-rack-3d-frame">
                  <div className="uc-rack-side-panel">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                  <div className="uc-rack-bezel">
                    <div className="uc-rack-top-bar">R</div>
                    <div className="uc-rack-devices-container">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const colors = ['#00D1FF', '#7CEEFF', '#9B7CFF', '#22E68A', '#FFB84D'];
                        const color = colors[i % colors.length];

                        return (
                          <div
                            key={i}
                            className="uc-3d-device"
                            style={{ animationDelay: `${i * 0.08}s`, color }}
                            onMouseEnter={() => setActiveRackSlot(i)}
                            onMouseLeave={() => setActiveRackSlot(null)}
                          >
                            <div className="uc-device-top-bar" />
                            <div className="uc-device-content">
                              <div className="uc-ports-left">
                                {Array.from({ length: 14 }).map((_, p) => (
                                  <div
                                    key={`l${p}`}
                                    className="uc-port"
                                    style={{
                                      backgroundColor: color,
                                      animationDelay: `${i * 0.12 + p * 0.05}s`,
                                    }}
                                  />
                                ))}
                              </div>

                              <div className="uc-device-board">
                                {Array.from({ length: 18 }).map((_, trace) => (
                                  <span key={trace} />
                                ))}
                              </div>

                              <div className="uc-indicators-right">
                                {Array.from({ length: 3 }).map((_, ind) => (
                                  <div
                                    key={`ind${ind}`}
                                    className={`uc-indicator ${activeRackSlot === i ? 'active' : ''}`}
                                    style={{
                                      backgroundColor: color,
                                      animationDelay: `${i * 0.12 + ind * 0.08}s`,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="uc-cable" style={{ borderColor: color, animationDelay: `${i * 0.12}s` }} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="uc-rack-bottom-bar" />
                  </div>
                </div>

                <svg className="uc-connections-svg" viewBox="0 0 700 450" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: 'rgba(0,209,255,0)', stopOpacity: 0 }} />
                      <stop offset="50%" style={{ stopColor: 'rgba(0,209,255,0.6)', stopOpacity: 0.6 }} />
                      <stop offset="100%" style={{ stopColor: 'rgba(0,209,255,0)', stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  <path d="M 315 92 Q 455 108 620 60" stroke="url(#lineGradient1)" strokeWidth="2" fill="none" className="uc-animated-line" />
                  <path d="M 338 222 Q 480 222 620 225" stroke="url(#lineGradient1)" strokeWidth="2" fill="none" className="uc-animated-line" />
                  <path d="M 318 348 Q 455 342 620 390" stroke="url(#lineGradient1)" strokeWidth="2" fill="none" className="uc-animated-line" />
                  <circle cx="620" cy="60" r="3" fill="#00D1FF" className="uc-connector-dot" />
                  <circle cx="620" cy="225" r="3" fill="#7CEEFF" className="uc-connector-dot" />
                  <circle cx="620" cy="390" r="3" fill="#00D1FF" className="uc-connector-dot" />
                </svg>
              </div>

              <div className="uc-rack-highlights">
                {HERO_CALLOUTS.map((callout) => (
                  <div key={callout.id} className={`uc-highlight-box uc-highlight-${callout.id}`}>
                    <div className={`uc-highlight-icon ${callout.id}`} aria-hidden="true">{callout.iconText}</div>
                    <div>
                      <div className="uc-highlight-label">{callout.title}</div>
                      <div className="uc-highlight-text">{callout.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="uc-proof-section" aria-label="RackTrack capabilities and outcomes">
        <div className="uc-proof-particles" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="uc-proof-particle" style={{ '--pi': i } as React.CSSProperties} />
          ))}
        </div>
        <div className="uc-proof-container">
          <div className="uc-proof-grid uc-proof-grid-features">
            {HERO_FEATURES.map((feature, idx) => (
              <div
                key={feature.label}
                className="uc-proof-card uc-proof-card-feature"
                style={{ '--pf-color': feature.color, animationDelay: `${idx * 0.13}s` } as React.CSSProperties}
              >
                <div className="uc-pf-icon-area">
                  <div className="uc-pf-icon-rings">
                    <span className="uc-pf-ring uc-pf-ring-1" />
                    <span className="uc-pf-ring uc-pf-ring-2" />
                  </div>
                  <div className="uc-pf-icon-box">{feature.icon}</div>
                </div>
                <div className="uc-pf-stat-chip">{feature.stat}</div>
                <div className="uc-proof-copy">
                  <h3>{feature.label}</h3>
                  <p>{feature.description}</p>
                </div>
                <div className="uc-pf-scan-line" />
                <div className="uc-pf-bottom-bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REDESIGNED 3D USE CASES SECTION - CLEAN GRID LAYOUT */}
      <section className="uc-use-cases-hero">
        <div className="uc-use-cases-header">
          <div className="uc-use-cases-badge">BUILT FOR MODERN DATA CENTER TEAMS</div>
          
          <h2 className="uc-use-cases-main-title">
            Purpose-built use cases<br />for <span className="uc-highlight">data center teams</span>
          </h2>
          
          <p className="uc-use-cases-subtitle">
            From day-to-day operations to critical incidents,<br />
            RackTrack brings clarity to every layer of your infrastructure.
          </p>
        </div>

        {/* MAIN LAYOUT: LEFT CARDS - CENTER ANIMATION - RIGHT CARDS */}
        <div className="uc-use-cases-main-grid">
          {/* LEFT COLUMN - 3 CARDS */}
          <div className="uc-use-cases-column uc-left-column">
            {[
              {
                id: 'audit',
                icon: '🎯',
                title: 'Audit & Inventory Accuracy',
                desc: 'Automate rack audits and achieve 99%+ inventory accuracy with AI-powered scanning.'
              },
              {
                id: 'incident',
                icon: '⚡',
                title: 'Faster Incident Response',
                desc: 'Instantly identify devices, connections and cable paths during outages and incidents.'
              },
              {
                id: 'cmdb',
                icon: '💾',
                title: 'CMDB & Asset Reconciliation',
                desc: 'Keep your CMDB and ServiceNow records accurate with automated reconciliation.'
              },
            ].map((useCase) => (
              <div
                key={useCase.id}
                className="uc-use-case-card"
                onMouseEnter={() => setHoveredCard(useCase.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="uc-card-header-wrapper">
                  <div className="uc-card-icon-large">{useCase.icon}</div>
                  <h3 className="uc-card-title-large">{useCase.title}</h3>
                </div>
                <p className="uc-card-desc-large">{useCase.desc}</p>
                <div className={`uc-card-border-glow ${hoveredCard === useCase.id ? 'active' : ''}`} />
              </div>
            ))}
          </div>

          {/* CENTER - DATA CENTER VISUALIZATION */}
          <div className="uc-center-rack-animation">
            <div className="uc-dc-scene">
              {/* Orbit rings */}
              <div className="uc-dc-ring uc-dc-ring-1" />
              <div className="uc-dc-ring uc-dc-ring-2" />
              <div className="uc-dc-ring uc-dc-ring-3" />

              {/* Floating icon nodes */}
              <div className="uc-dc-node uc-dc-node-shield">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              </div>
              <div className="uc-dc-node uc-dc-node-bolt">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
              </div>
              <div className="uc-dc-node uc-dc-node-cube">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.34.13-.53.13-.19 0-.37-.04-.53-.13l-7.9-4.44C3.21 17.21 3 16.88 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.34-.13.53-.13.19 0 .37.04.53.13l7.9 4.44c.32.17.53.5.53.88v9z"/></svg>
              </div>
              <div className="uc-dc-node uc-dc-node-db">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 6c-3.87 0-7-1.34-7-3s3.13-3 7-3 7 1.34 7 3-3.13 3-7 3zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4zm0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z"/></svg>
              </div>
              <div className="uc-dc-node uc-dc-node-clip">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              </div>

              {/* Isometric dual server rack SVG */}
              <svg className="uc-dc-rack-svg" viewBox="0 0 380 470" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <defs>
                  <linearGradient id="dcFront" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#0e2240' }} />
                    <stop offset="100%" style={{ stopColor: '#070f20' }} />
                  </linearGradient>
                  <linearGradient id="dcTop" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#0d2a50' }} />
                    <stop offset="100%" style={{ stopColor: '#183870' }} />
                  </linearGradient>
                  <linearGradient id="dcSide" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#081830' }} />
                    <stop offset="100%" style={{ stopColor: '#051020' }} />
                  </linearGradient>
                  <radialGradient id="dcBase" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style={{ stopColor: 'rgba(0,180,255,0.4)' }} />
                    <stop offset="100%" style={{ stopColor: 'rgba(0,60,120,0)' }} />
                  </radialGradient>
                  <filter id="dcGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <ellipse cx="190" cy="415" rx="175" ry="28" fill="url(#dcBase)" />
                <ellipse cx="190" cy="415" rx="130" ry="18" fill="none" stroke="rgba(0,209,255,0.3)" strokeWidth="1.5" className="uc-dc-plat-ring" />
                <polygon points="130,55 165,32 165,355 130,378" fill="url(#dcSide)" stroke="rgba(0,160,220,0.6)" strokeWidth="1.5" />
                <polygon points="40,55 130,55 165,32 75,32" fill="url(#dcTop)" stroke="rgba(0,209,255,0.7)" strokeWidth="1.5" />
                <rect x="40" y="55" width="90" height="323" fill="url(#dcFront)" stroke="rgba(0,160,220,0.6)" strokeWidth="1.5" />
                {Array.from({ length: 13 }).map((_, i) => {
                  const y = 63 + i * 23;
                  const colorSet = ['#00D1FF', '#7CEEFF', '#22E68A', '#FFB84D', '#9B7CFF'];
                  const c = colorSet[i % colorSet.length];
                  return (
                    <g key={`l${i}`} style={{ animationDelay: `${i * 0.1}s` }} className="uc-dc-dev">
                      <rect x="44" y={y} width="82" height="19" fill={c} fillOpacity="0.1" rx="1.5" />
                      <rect x="44" y={y} width="82" height="19" fill="none" stroke={c} strokeWidth="0.5" strokeOpacity="0.5" rx="1.5" />
                      {[0, 1, 2, 3].map(p => (
                        <circle key={p} cx={51 + p * 9} cy={y + 9.5} r="2.2" fill={c} fillOpacity="0.75" className="uc-dc-port" style={{ animationDelay: `${(i * 4 + p) * 0.06}s` }} />
                      ))}
                      <circle cx="120" cy={y + 9.5} r="2.8" fill={c} fillOpacity="1" className="uc-dc-led" style={{ animationDelay: `${i * 0.2}s` }} />
                    </g>
                  );
                })}
                <rect x="40" y="55" width="90" height="323" fill="none" stroke="rgba(0,209,255,0.5)" strokeWidth="0.8" filter="url(#dcGlow)" />
                <rect x="60" y="32" width="55" height="22" fill="rgba(0,80,160,0.4)" stroke="rgba(0,209,255,0.5)" strokeWidth="1" rx="3" />
                <text x="87" y="47" textAnchor="middle" fill="#7CEEFF" fontSize="8.5" fontWeight="700" letterSpacing="1">RACK-A</text>
                <rect x="40" y="378" width="90" height="18" fill="url(#dcTop)" stroke="rgba(0,180,220,0.5)" strokeWidth="1" />
                <polygon points="130,378 165,355 165,373 130,396" fill="url(#dcSide)" stroke="rgba(0,160,200,0.4)" strokeWidth="1" />
                <polygon points="250,55 285,32 285,355 250,378" fill="url(#dcSide)" stroke="rgba(0,160,220,0.6)" strokeWidth="1.5" />
                <polygon points="160,55 250,55 285,32 195,32" fill="url(#dcTop)" stroke="rgba(0,209,255,0.7)" strokeWidth="1.5" />
                <rect x="160" y="55" width="90" height="323" fill="url(#dcFront)" stroke="rgba(0,160,220,0.6)" strokeWidth="1.5" />
                {Array.from({ length: 13 }).map((_, i) => {
                  const y = 63 + i * 23;
                  const colorSet = ['#9B7CFF', '#22E68A', '#00D1FF', '#FFB84D', '#7CEEFF'];
                  const c = colorSet[i % colorSet.length];
                  return (
                    <g key={`r${i}`} style={{ animationDelay: `${i * 0.1 + 0.15}s` }} className="uc-dc-dev">
                      <rect x="164" y={y} width="82" height="19" fill={c} fillOpacity="0.1" rx="1.5" />
                      <rect x="164" y={y} width="82" height="19" fill="none" stroke={c} strokeWidth="0.5" strokeOpacity="0.5" rx="1.5" />
                      {[0, 1, 2, 3].map(p => (
                        <circle key={p} cx={171 + p * 9} cy={y + 9.5} r="2.2" fill={c} fillOpacity="0.75" className="uc-dc-port" style={{ animationDelay: `${(i * 4 + p) * 0.07}s` }} />
                      ))}
                      <circle cx="240" cy={y + 9.5} r="2.8" fill={c} fillOpacity="1" className="uc-dc-led" style={{ animationDelay: `${i * 0.25 + 0.1}s` }} />
                    </g>
                  );
                })}
                <rect x="160" y="55" width="90" height="323" fill="none" stroke="rgba(0,209,255,0.5)" strokeWidth="0.8" filter="url(#dcGlow)" />
                <rect x="180" y="32" width="55" height="22" fill="rgba(0,80,160,0.4)" stroke="rgba(0,209,255,0.5)" strokeWidth="1" rx="3" />
                <text x="207" y="47" textAnchor="middle" fill="#7CEEFF" fontSize="8.5" fontWeight="700" letterSpacing="1">RACK-B</text>
                <rect x="160" y="378" width="90" height="18" fill="url(#dcTop)" stroke="rgba(0,180,220,0.5)" strokeWidth="1" />
                <polygon points="250,378 285,355 285,373 250,396" fill="url(#dcSide)" stroke="rgba(0,160,200,0.4)" strokeWidth="1" />
                <path d="M130 140 C145 135 145 145 160 140" stroke="rgba(0,209,255,0.35)" strokeWidth="1.8" fill="none" strokeDasharray="4,2" />
                <path d="M130 210 C145 205 145 215 160 210" stroke="rgba(34,230,138,0.35)" strokeWidth="1.8" fill="none" strokeDasharray="4,2" />
                <path d="M130 280 C145 275 145 285 160 280" stroke="rgba(155,124,255,0.35)" strokeWidth="1.8" fill="none" strokeDasharray="4,2" />
              </svg>

              {/* System Status Badge */}
              <div className="uc-dc-status">
                <span className="uc-dc-status-indicator" />
                <div className="uc-dc-status-copy">
                  <span className="uc-dc-status-heading">System Status</span>
                  <span className="uc-dc-status-msg">All Systems Operational</span>
                </div>
                <svg className="uc-dc-wave" viewBox="0 0 72 24" preserveAspectRatio="none" aria-hidden="true">
                  <polyline points="0,12 9,5 18,17 27,7 36,14 45,4 54,15 63,6 72,12" fill="none" stroke="#22E68A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="uc-dc-wave-anim" />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - 3 CARDS */}
          <div className="uc-use-cases-column uc-right-column">
            {[
              {
                id: 'capacity',
                icon: '⚡',
                title: 'Capacity & Power Optimization',
                desc: 'Analyze power usage, space availability and plan capacity with confidence.'
              },
              {
                id: 'compliance',
                icon: '🛡️',
                title: 'Compliance & Audit Readiness',
                desc: 'Generate audit-ready reports and maintain continuous compliance with confidence.'
              },
              {
                id: 'visualization',
                icon: '🧊',
                title: '2D & 3D Infrastructure Visualization',
                desc: 'Visualize your racks in 2D diagrams or interactive 3D models for complete visibility.'
              },
            ].map((useCase) => (
              <div
                key={useCase.id}
                className="uc-use-case-card"
                onMouseEnter={() => setHoveredCard(useCase.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="uc-card-header-wrapper">
                  <div className="uc-card-icon-large">{useCase.icon}</div>
                  <h3 className="uc-card-title-large">{useCase.title}</h3>
                </div>
                <p className="uc-card-desc-large">{useCase.desc}</p>
                <div className={`uc-card-border-glow ${hoveredCard === useCase.id ? 'active' : ''}`} />
              </div>
            ))}
          </div>
        </div>

      </section>

      <section className="uc-impact-section" aria-label="Operational impact metrics">
        <div className="uc-impact-container">
          <div className="uc-impact-header">
            <div className="uc-badge">IMPACT THAT MATTERS</div>
            <h2 className="uc-impact-title">Real Results. <span className="uc-highlight">Measurable Impact.</span></h2>
            <p className="uc-impact-subtitle">RackTrack delivers accuracy, speed, and clarity at every layer.</p>
          </div>

          <div className="uc-flip-cards-grid">
            {OUTCOME_CARDS.map((outcome) => (
              <div key={outcome.value} className={`uc-flip-card uc-flip-${outcome.iconClass}`}>
                <div className="uc-flip-inner">
                  <div className="uc-flip-front">
                    <div className="uc-flip-front-icon">{outcome.icon}</div>
                    <div className="uc-flip-front-value">{outcome.value}</div>
                    <div className="uc-flip-front-label">{outcome.label}</div>
                    <div className="uc-ffv-wrap">
                      {CARD_FRONT_VISUALS[outcome.iconClass]}
                    </div>
                    <div className="uc-flip-hint">Hover to flip <span className="uc-flip-spin-icon">↺</span></div>
                  </div>
                  <div className="uc-flip-back">
                    <div className="uc-flip-back-header">
                      <span className="uc-flip-back-icon">{outcome.icon}</span>
                      <div className="uc-flip-back-meta">
                        <span className="uc-flip-back-value">{outcome.value}</span>
                        <span className="uc-flip-back-label">{outcome.label}</span>
                      </div>
                    </div>
                    <div className="uc-flip-divider" />
                    <p className="uc-flip-description">{outcome.description}</p>
                    <div className="uc-flip-visual-wrap">
                      {CARD_VISUALS[outcome.iconClass]}
                    </div>
                    <div className="uc-flip-hint">Flip back <span className="uc-flip-spin-icon">↺</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="uc-iops-section">
        {/* Concentric glow rings behind the phone */}
        <div className="uc-iops-rings" aria-hidden="true">
          <div className="uc-iops-ring r1"/><div className="uc-iops-ring r2"/>
          <div className="uc-iops-ring r3"/><div className="uc-iops-ring r4"/>
        </div>

        <div className="uc-iops-wrap">

          {/* ── LEFT COLUMN ── */}
          <div className="uc-iops-left">
            <div className="uc-iops-brand">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 7V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V7L12 2Z"
                  stroke="#00d1ff" strokeWidth="1.5" fill="rgba(0,209,255,0.12)"/>
              </svg>
              <span>RACKTRACK</span>
            </div>

            <h2 className="uc-iops-title">
              Turn physical<br/>infrastructure into<br/>
              <span className="uc-highlight">intelligent operations.</span>
            </h2>
            <p className="uc-iops-sub">
              RackTrack helps modern data center teams operate faster, smarter, and with complete confidence.
            </p>

            <ul className="uc-iops-feats">
              <li>
                <div className="uc-iops-fi ai">
                  <svg viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="5" rx="1.2" stroke="#00d1ff" strokeWidth="1.3"/><rect x="2" y="11" width="16" height="5" rx="1.2" stroke="#00d1ff" strokeWidth="1.3"/><circle cx="15" cy="6.5" r="1.1" fill="#00d1ff"/><circle cx="15" cy="13.5" r="1.1" fill="#00d1ff"/></svg>
                </div>
                <div className="uc-iops-fc">
                  <strong>AI-Powered Scanning</strong>
                  <span>Instantly scan racks and capture every detail with AI accuracy.</span>
                </div>
              </li>
              <li>
                <div className="uc-iops-fi vis">
                  <svg viewBox="0 0 20 20" fill="none"><rect x="1" y="13" width="3" height="6" rx="0.8" fill="#4488ff"/><rect x="6" y="9" width="3" height="10" rx="0.8" fill="#4488ff"/><rect x="11" y="5" width="3" height="14" rx="0.8" fill="#4488ff"/><rect x="16" y="11" width="3" height="8" rx="0.8" fill="#4488ff"/></svg>
                </div>
                <div className="uc-iops-fc">
                  <strong>Real-time Visibility</strong>
                  <span>See exactly what's in your racks, live and always up to date.</span>
                </div>
              </li>
              <li>
                <div className="uc-iops-fi rel">
                  <svg viewBox="0 0 20 20" fill="none"><path d="M10 1.5L3 5.5V10C3 14 6.2 17.5 10 18.8C13.8 17.5 17 14 17 10V5.5L10 1.5Z" stroke="#9B7CFF" strokeWidth="1.3"/><path d="M7 10L9 12L13 8" stroke="#9B7CFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="uc-iops-fc">
                  <strong>Accurate &amp; Reliable</strong>
                  <span>Reduce manual work and errors with automated validation and sync.</span>
                </div>
              </li>
              <li>
                <div className="uc-iops-fi sync">
                  <svg viewBox="0 0 20 20" fill="none"><path d="M3.5 9.5A6.5 6.5 0 0 1 16 6" stroke="#22E68A" strokeWidth="1.3" strokeLinecap="round"/><path d="M16.5 10.5A6.5 6.5 0 0 1 4 14" stroke="#22E68A" strokeWidth="1.3" strokeLinecap="round"/><path d="M14 4L17 6L14 8" stroke="#22E68A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12L3 14L6 16" stroke="#22E68A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="uc-iops-fc">
                  <strong>Continuous Sync</strong>
                  <span>Keep your data, CMDB and operations perfectly in sync.</span>
                </div>
              </li>
            </ul>

          </div>

          {/* ── CENTER – Phone mockup ── */}
          <div className="uc-iops-center">
            <div className="uc-iops-phone">
              {/* Status bar */}
              <div className="uc-iops-sb">
                <span>9:41</span>
                <div className="uc-iops-sb-icons">
                  <svg width="13" height="10" viewBox="0 0 13 10"><rect x="0" y="5.5" width="2" height="4.5" rx="0.4" fill="white"/><rect x="3" y="3.5" width="2" height="6.5" rx="0.4" fill="white"/><rect x="6" y="1.5" width="2" height="8.5" rx="0.4" fill="white"/><rect x="9" y="0" width="2" height="10" rx="0.4" fill="white"/></svg>
                  <svg width="12" height="10" viewBox="0 0 12 10"><path d="M6 2.5C8.2 2.5 10.2 3.5 11.5 5" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none"/><path d="M6 5C7.5 5 8.8 5.7 9.8 6.8" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none"/><circle cx="6" cy="8.5" r="1" fill="white"/></svg>
                  <div className="uc-iops-batt"/>
                </div>
              </div>

              {/* App header */}
              <div className="uc-iops-app-hdr">
                <div className="uc-iops-app-logo">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 7V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V7L12 2Z" stroke="#00d1ff" strokeWidth="1.6" fill="rgba(0,209,255,0.18)"/></svg>
                  <span>RackTrack</span>
                </div>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 3C10.4 3 9 4.3 9 5.8C6.8 6.8 5 9.1 5 12V17L3 19V20H21V19L19 17V12C19 9.1 17.2 6.8 15 5.8C15 4.3 13.6 3 12 3Z" stroke="rgba(180,200,220,0.65)" strokeWidth="1.3"/><path d="M10 20C10 21.1 10.9 22 12 22S14 21.1 14 20" stroke="rgba(180,200,220,0.65)" strokeWidth="1.3"/></svg>
              </div>

              {/* Scan card row */}
              <div className="uc-iops-scan-row">
                <svg className="uc-iops-rack-ico" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect x="3" y="5" width="24" height="20" rx="2" stroke="#00d1ff" strokeWidth="1.2"/>
                  <rect x="5" y="8" width="20" height="2.5" rx="0.6" fill="rgba(0,209,255,0.25)"/>
                  <rect x="5" y="12" width="20" height="2.5" rx="0.6" fill="rgba(0,209,255,0.18)"/>
                  <rect x="5" y="16" width="20" height="2.5" rx="0.6" fill="rgba(0,209,255,0.12)"/>
                  <rect x="5" y="20" width="14" height="2" rx="0.6" fill="rgba(0,209,255,0.08)"/>
                </svg>
                <div className="uc-iops-scan-meta">
                  <span className="uc-iops-scan-name">Scanning Rack</span>
                  <span className="uc-iops-scan-id">Rack R1A-42</span>
                </div>
                <div className="uc-iops-scan-badge">85% Scanning...</div>
              </div>

              {/* Viewfinder */}
              <div className="uc-iops-vf">
                <img
                  className="uc-iops-vf-img"
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80"
                  alt="Server rack being scanned"
                />
                <div className="uc-iops-vf-overlay"/>
                <div className="uc-iops-vf-corner tl"/><div className="uc-iops-vf-corner tr"/>
                <div className="uc-iops-vf-corner bl"/><div className="uc-iops-vf-corner br"/>
                <div className="uc-iops-scan-line"/>
              </div>

              {/* Camera controls */}
              <div className="uc-iops-cam">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 2L5 6H3C2 6 1 7 1 8V20C1 21 2 22 3 22H21C22 22 23 21 23 20V8C23 7 22 6 21 6H19L17 2H7Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/><circle cx="12" cy="13" r="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/></svg>
                <div className="uc-iops-shutter"/>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/><path d="M3 15L8 10L12 14L16 9L21 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>

              {/* Progress */}
              <div className="uc-iops-prog">
                <div className="uc-iops-prog-hd">
                  <span>Live Scan Progress</span>
                  <span className="uc-iops-prog-pct">85%</span>
                </div>
                <div className="uc-iops-prog-track">
                  <div className="uc-iops-prog-fill"/>
                </div>
                <p className="uc-iops-prog-txt">Detecting ports, devices and connections...</p>
              </div>

              {/* Bottom nav */}
              <div className="uc-iops-nav">
                {['Scan','Racks','Assets','Alerts','More'].map((item, i) => (
                  <button key={item} className={`uc-iops-nav-btn${i===0?' active':''}`}>
                    <span className="uc-iops-nav-dot"/>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT – Status cards ── */}
          <div className="uc-iops-right">
            {[
              { color:'#00d1ff', label:'AI SENSE',   status:'Configured', icon:'server' },
              { color:'#4488ff', label:'98 PORTS',   status:'Mapped',     icon:'ports'  },
              { color:'#9B7CFF', label:'0/5 CABLES', status:'Detected',   icon:'cables' },
              { color:'#22E68A', label:'100% SYNC',  status:'Verified',   icon:'sync'   },
            ].map((c) => (
              <div key={c.label} className="uc-iops-sc" style={{'--sc-color': c.color} as React.CSSProperties}>
                <div className="uc-iops-sc-ico">
                  {c.icon === 'server' && <svg viewBox="0 0 22 22" fill="none"><rect x="2" y="5" width="18" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><rect x="2" y="13" width="18" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><circle cx="16" cy="7.5" r="1" fill="currentColor"/><circle cx="16" cy="15.5" r="1" fill="currentColor"/></svg>}
                  {c.icon === 'ports'  && <svg viewBox="0 0 22 22" fill="none"><rect x="2" y="6" width="18" height="11" rx="1.8" stroke="currentColor" strokeWidth="1.3"/><rect x="5" y="9" width="3" height="5" rx="0.6" stroke="currentColor" strokeWidth="1.1"/><rect x="9.5" y="9" width="3" height="5" rx="0.6" stroke="currentColor" strokeWidth="1.1"/><rect x="14" y="9" width="3" height="5" rx="0.6" stroke="currentColor" strokeWidth="1.1"/></svg>}
                  {c.icon === 'cables' && <svg viewBox="0 0 22 22" fill="none"><circle cx="5" cy="11" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="17" cy="11" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7 11H10M12 11H15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M10 8.5V13.5M12 8.5V13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>}
                  {c.icon === 'sync'   && <svg viewBox="0 0 22 22" fill="none"><path d="M4 10A7 7 0 0 1 17 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M18 12A7 7 0 0 1 5 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M15 4L18 6L15 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 14L4 16L7 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div className="uc-iops-sc-body">
                  <span className="uc-iops-sc-label">{c.label}</span>
                  <span className="uc-iops-sc-status">{c.status}</span>
                  <span className="uc-iops-sc-time">Last sync: 2 min ago</span>
                </div>
                <div className="uc-iops-sc-check">
                  <svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="#1a5fcf"/><path d="M5.5 9L8 11.5L12.5 7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            ))}
          </div>

        </div>{/* /uc-iops-wrap */}
      </section>

      <section className="uc-fcta-section">
        {/* Background layers */}
        <div className="uc-fcta-grid" aria-hidden="true"/>
        <div className="uc-fcta-glow gl"  aria-hidden="true"/>
        <div className="uc-fcta-glow gr"  aria-hidden="true"/>

        {/* Decorative left nodes */}
        <div className="uc-fcta-deco left" aria-hidden="true">
          <svg viewBox="0 0 160 260" fill="none">
            <circle cx="24" cy="40"  r="5" fill="#00d1ff" opacity="0.5"/>
            <circle cx="24" cy="40"  r="12" stroke="#00d1ff" strokeWidth="1" opacity="0.15"/>
            <circle cx="80" cy="110" r="4" fill="#9B7CFF" opacity="0.45"/>
            <circle cx="80" cy="110" r="10" stroke="#9B7CFF" strokeWidth="1" opacity="0.15"/>
            <circle cx="30" cy="190" r="3" fill="#22E68A" opacity="0.4"/>
            <line x1="24" y1="40" x2="80" y2="110" stroke="rgba(0,209,255,0.12)" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="80" y1="110" x2="30" y2="190" stroke="rgba(155,124,255,0.12)" strokeWidth="1" strokeDasharray="4 4"/>
            <rect x="110" y="70" width="30" height="18" rx="4" stroke="rgba(0,209,255,0.2)" strokeWidth="1" fill="rgba(0,209,255,0.04)"/>
            <rect x="110" y="73" width="8" height="3" rx="1" fill="rgba(0,209,255,0.3)"/>
            <rect x="120" y="73" width="6" height="3" rx="1" fill="rgba(0,209,255,0.2)"/>
            <rect x="110" y="78" width="12" height="3" rx="1" fill="rgba(0,209,255,0.15)"/>
            <rect x="50" y="150" width="28" height="16" rx="3" stroke="rgba(155,124,255,0.2)" strokeWidth="1" fill="rgba(155,124,255,0.04)"/>
          </svg>
        </div>

        {/* Decorative right nodes */}
        <div className="uc-fcta-deco right" aria-hidden="true">
          <svg viewBox="0 0 160 260" fill="none">
            <circle cx="136" cy="50"  r="5" fill="#4488ff" opacity="0.5"/>
            <circle cx="136" cy="50"  r="12" stroke="#4488ff" strokeWidth="1" opacity="0.15"/>
            <circle cx="80"  cy="130" r="4" fill="#00d1ff" opacity="0.45"/>
            <circle cx="80"  cy="130" r="10" stroke="#00d1ff" strokeWidth="1" opacity="0.15"/>
            <circle cx="130" cy="210" r="3" fill="#9B7CFF" opacity="0.4"/>
            <line x1="136" y1="50"  x2="80" y2="130" stroke="rgba(68,136,255,0.12)"  strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="80"  y1="130" x2="130" y2="210" stroke="rgba(0,209,255,0.12)" strokeWidth="1" strokeDasharray="4 4"/>
            <rect x="20" y="90" width="30" height="18" rx="4" stroke="rgba(68,136,255,0.2)" strokeWidth="1" fill="rgba(68,136,255,0.04)"/>
            <rect x="23" y="93" width="10" height="3" rx="1" fill="rgba(68,136,255,0.3)"/>
            <rect x="23" y="98" width="7"  height="3" rx="1" fill="rgba(68,136,255,0.2)"/>
            <rect x="20" y="170" width="28" height="16" rx="3" stroke="rgba(34,230,138,0.2)" strokeWidth="1" fill="rgba(34,230,138,0.04)"/>
          </svg>
        </div>

        {/* Main content */}
        <div className="uc-fcta-inner">
          <div className="uc-badge">GET STARTED TODAY</div>

          <h2 className="uc-fcta-title">
            Ready to transform your<br/>
            <span className="uc-fcta-gradient">data center operations?</span>
          </h2>

          <p className="uc-fcta-sub">
            Join leading enterprises that trust RackTrack for physical<br/>
            infrastructure visibility and intelligence.
          </p>

          {/* Trust chips */}
          <div className="uc-fcta-chips">
            {['No setup fees', '14-day free trial', 'Enterprise support', 'SOC 2 compliant'].map(chip => (
              <span key={chip} className="uc-fcta-chip">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5.5" fill="rgba(0,209,255,0.15)" stroke="rgba(0,209,255,0.4)" strokeWidth="0.8"/>
                  <path d="M3.5 6L5.2 7.8L8.5 4.5" stroke="#00d1ff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {chip}
              </span>
            ))}
          </div>

          <div className="uc-fcta-btns">
            <Link to="/contact" className="uc-fcta-btn-primary">
              Schedule a Demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/contact" className="uc-fcta-btn-ghost">
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
