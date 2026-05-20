import { Link } from 'react-router-dom';
import './TrustPage.css';

const theme = {
  pale: '#9BC9FF',
  mint: '#72C7F4',
  blue: '#4D87E4',
  indigo: '#2F63B8',
  teal: '#52B6E6',
  glow: 'rgba(112, 175, 255, 0.20)',
  panel: 'rgba(3, 28, 58, 0.92)',
  panelSoft: 'rgba(6, 46, 86, 0.78)',
  content: 'rgba(6, 28, 58, 0.74)',
  border: 'rgba(87, 137, 209, 0.20)',
  text: '#EDF6FF',
  textSub: '#B8D9FF',
  buttonSecondary: 'rgba(7, 27, 55, 0.70)',
};

const TRUST = {
  sub:
    'RackTrack aligns with the controls security and compliance teams evaluate during software review: constrained data capture, enforced access policies, comprehensive audit logs, and deployment options that respect data boundaries.',
  badges: [
    {
      icon: 'shield',
      title: 'Scoped capture',
      desc: 'Collect only physical-layer evidence needed for inventory, topology, and audit support.',
    },
    {
      icon: 'lock',
      title: 'Tenant isolation',
      desc: 'Customer data is separated by tenant with role-based access and logged administrative actions.',
    },
    {
      icon: 'key',
      title: 'Key control',
      desc: 'Enterprise deployments can use customer-managed encryption keys and stricter residency controls.',
    },
    {
      icon: 'users',
      title: 'Approval workflows',
      desc: 'Support access can be approval-based and time-bound for sensitive environments.',
    },
    {
      icon: 'video',
      title: 'Evidence handling',
      desc: 'Rack imagery and derived outputs follow defined retention and export policies.',
    },
    {
      icon: 'server',
      title: 'Flexible deployment',
      desc: 'SaaS, private cloud, and on-premise deployment paths support different security postures.',
    },
  ],
} as const;

function SparkleLayer() {
  const sparkles = Array.from({ length: 320 }, (_, index) => ({
    key: index,
    left: `${Math.random() * 100}%`,
    top: `${-30 + Math.random() * 140}%`,
    width: `${1 + Math.random() * 1.5}px`,
    height: `${14 + Math.random() * 28}px`,
    delay: `${-Math.random() * 10}s`,
    duration: `${5 + Math.random() * 7}s`,
    opacity: `${0.15 + Math.random() * 0.55}`,
  }));

  return (
    <div className="sparkle-layer" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.key}
          className="sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.width,
            height: sparkle.height,
            opacity: sparkle.opacity,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        />
      ))}
    </div>
  );
}

const ICONS:Record<string,string>={shield:'🔒',lock:'🔑',key:'🗝️',users:'👥',video:'📹',server:'🏗️'};

const DEPLOYMENT = [
  { title:'SaaS (Default)',  badge:'Standard', desc:'Fully managed. Data in your region. Fastest to value.',       features:['Managed infrastructure','Auto updates','Regional data residency','99.9% SLA'] },
  { title:'Private Cloud',   badge:'Enterprise',desc:'Dedicated infra in your cloud account. You control the keys.',features:['Dedicated compute','Customer-managed keys','VPC isolation','Custom SLA'] },
  { title:'On-Premise',      badge:'Regulated', desc:'Fully air-gap capable. Nothing leaves your network.',         features:['Air-gap capable','No external connectivity','Local residency','HSM support'] },
];

const FAQ = [
  { q:'What data does RackTrack collect?', a:'Physical device state: device identity, rack position, port mapping, cable connections, and LED status. We do not capture network traffic content, credentials, or application data.' },
  { q:'Where is data stored?',             a:'In your designated region, or for on-premise deployments, entirely within your environment. No data crosses regions without explicit authorization.' },
  { q:'Who can access my data?',           a:'Only authorized users within your tenant. RackTrack support access is logged, requires customer approval, and is fully auditable.' },
  { q:'What happens if I leave?',          a:'You own your data. Export everything in standard formats at any time. We delete all copies within 30 days of contract termination on request.' },
];

export default function TrustPage() {
  return (
    <div className="trust-page">
      <SparkleLayer />
      <div className="page-content">
        {/* HERO */}
        <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', paddingTop:'7rem', paddingBottom:'2rem', paddingLeft:'4rem', paddingRight:'4rem' }}>
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:`linear-gradient(to top, ${theme.panel}, transparent)`, pointerEvents:'none', zIndex:10 }} />
          <div style={{ position:'relative', zIndex:20, maxWidth:'640px', textAlign:'center' }}>
            <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:700, lineHeight:1.08, letterSpacing:'-0.03em', color:theme.text, marginBottom:'1.5rem' }}>
              Secure deployment, simplified.
            </h1>
            <p style={{ fontSize:'1.0625rem', color:theme.textSub, lineHeight:1.78, fontWeight:300, marginBottom:'2.5rem', maxWidth:'520px', margin:'0 auto' }}>
              RackTrack supports flexible deployment models with strong isolation, clear auditability, and controls built for modern infrastructure operations.
            </p>
            <div style={{ display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap' }}>
              <Link to="/contact" style={{ display:'inline-flex', background:theme.indigo, color:'#fff', padding:'0.875rem 2rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'0.9375rem', textDecoration:'none', boxShadow:'0 0 28px rgba(76, 125, 255, 0.28)' }}>Discuss Your Requirements</Link>
              <Link to="#security" style={{ display:'inline-flex', background:theme.buttonSecondary, backdropFilter:'blur(10px)', color:theme.textSub, padding:'0.875rem 1.75rem', borderRadius:'0.5rem', fontWeight:400, fontSize:'0.9375rem', border:`1px solid ${theme.border}`, textDecoration:'none' }}>Review Security Posture</Link>
            </div>
          </div>
        </section>

      {/* BADGES */}
      <section id="security" style={{ padding:'7rem 4rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:theme.indigo, marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:theme.blue }} />Security Posture
          </div>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:theme.text, letterSpacing:'-0.025em', marginBottom:'4rem' }}>Designed to survive the security review.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }} className="max-lg:grid-cols-2 max-md:grid-cols-1">
            {TRUST.badges.map(b=>(
              <div key={b.title} style={{ background:theme.content, backdropFilter:'blur(14px)', border:`1px solid ${theme.border}`, borderRadius:'1rem', padding:'2rem', display:'flex', alignItems:'flex-start', gap:'1rem' }}>
                <span style={{ fontSize:'1.5rem', flexShrink:0 }}>{ICONS[b.icon]??'🔒'}</span>
                <div>
                  <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:'1rem', fontWeight:600, color:theme.text, marginBottom:'0.5rem' }}>{b.title}</h3>
                  <p style={{ fontSize:'0.8125rem', color:theme.textSub, fontWeight:300, lineHeight:1.7 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding:'0 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'56rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:theme.indigo, marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:theme.indigo }} />Data Handling
          </div>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:theme.text, letterSpacing:'-0.025em', marginBottom:'3rem' }}>Clear answers to what your security team will ask.</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {FAQ.map(f=>(
              <div key={f.q} style={{ background:theme.content, backdropFilter:'blur(14px)', border:`1px solid ${theme.border}`, borderRadius:'1rem', padding:'2rem' }}>
                <h4 style={{ fontFamily:'Syne,sans-serif', fontSize:'1rem', fontWeight:600, color:theme.text, marginBottom:'0.75rem' }}>{f.q}</h4>
                <p style={{ fontSize:'0.9375rem', color:theme.textSub, fontWeight:300, lineHeight:1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section style={{ padding:'0 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:theme.indigo, marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:theme.indigo }} />Deployment Options
          </div>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:theme.text, letterSpacing:'-0.025em', marginBottom:'3rem' }}>Deploy it your way.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem', marginBottom:'3rem' }} className="max-lg:grid-cols-1">
            {DEPLOYMENT.map(d=>(
              <div key={d.title} style={{ background:theme.content, backdropFilter:'blur(14px)', border:`1px solid ${theme.border}`, borderRadius:'1.25rem', padding:'2.5rem 2rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${theme.indigo},transparent)` }} />
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
                  <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:'1.125rem', fontWeight:600, color:theme.text }}>{d.title}</h3>
                  <span style={{ fontSize:'0.625rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(104, 162, 255, 0.14)', color:theme.indigo, border:`1px solid rgba(104, 162, 255, 0.24)`, padding:'0.25rem 0.625rem', borderRadius:'999px' }}>{d.badge}</span>
                </div>
                <p style={{ fontSize:'0.875rem', color:theme.textSub, fontWeight:300, lineHeight:1.7, marginBottom:'1.5rem' }}>{d.desc}</p>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.625rem' }}>
                  {d.features.map(f=>(
                    <li key={f} style={{ display:'flex', alignItems:'center', gap:'0.625rem', fontSize:'0.875rem', color:theme.textSub }}>
                      <span style={{ width:'14px', height:'14px', borderRadius:'50%', background:'rgba(104, 162, 255, 0.14)', border:'1px solid rgba(104, 162, 255, 0.24)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8px', color:theme.indigo, flexShrink:0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center' }}>
            <Link to="/contact" style={{ display:'inline-flex', background:theme.indigo, color:'#fff', padding:'1rem 2.5rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'1rem', textDecoration:'none', boxShadow:'0 0 32px rgba(76, 125, 255, 0.28)' }}>Discuss Your Deployment →</Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
