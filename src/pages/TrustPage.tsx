import { Link } from 'react-router-dom';
import './TrustPage.css';

const TRUST = {
  sub:
    'RackTrack is designed for controlled environments: scoped capture, auditable access, regional data controls, and deployment models that fit security review.',
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

function PageHeroScene() {
  const theme = { accent: '#22C55E', secondary: '#3B82F6', glow: 'rgba(34,197,94,0.18)' };

  return (
    <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden', background:`radial-gradient(circle at 75% 35%, ${theme.glow}, transparent 30%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05), transparent 28%)` }}>
      <div style={{ position:'absolute', right:'6%', top:'18%', width:'min(38vw, 520px)', minWidth:'280px', aspectRatio:'0.82', border:'1px solid rgba(174,183,194,0.16)', borderRadius:'8px', transform:'perspective(900px) rotateY(-16deg) rotateX(6deg)', boxShadow:`0 0 70px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`, background:'linear-gradient(160deg, rgba(18,26,36,0.88), rgba(2,6,23,0.5))', padding:'18px', display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'12px', opacity:0.92 }}>
        {Array.from({ length: 10 }).map((_, rackIndex) => (
          <div key={rackIndex} style={{ border:'1px solid rgba(174,183,194,0.12)', borderRadius:'6px', background:'rgba(0,0,0,0.35)', padding:'8px', display:'flex', flexDirection:'column', gap:'6px' }}>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <span key={rowIndex} style={{ height: rowIndex === 1 ? '18px' : '10px', borderRadius:'3px', background: rowIndex === rackIndex % 4 ? `linear-gradient(90deg, ${theme.accent}, ${theme.secondary})` : 'rgba(140,160,184,0.2)', boxShadow: rowIndex === rackIndex % 4 ? `0 0 12px ${theme.glow}` : 'none' }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ position:'absolute', inset:'12% -10%', background:`linear-gradient(105deg, transparent 36%, ${theme.glow} 48%, transparent 62%)`, filter:'blur(18px)', opacity:0.85 }} />
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
      {/* HERO */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:'7rem', paddingBottom:'2rem', paddingLeft:'4rem', paddingRight:'4rem' }}>
        <PageHeroScene />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:'linear-gradient(to top, #0B0F14, transparent)', pointerEvents:'none', zIndex:10 }} />
        <div style={{ position:'relative', zIndex:20, maxWidth:'640px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.22)', borderRadius:'999px', padding:'0.375rem 1rem', marginBottom:'2rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22C55E', animation:'pulse 2s infinite' }} />
            <span style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#22C55E' }}>Trust & Security</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:700, lineHeight:1.08, letterSpacing:'-0.03em', color:'#EAF2FF', marginBottom:'1.5rem' }}>
            Built for environments where{' '}
            <span style={{ background:'linear-gradient(135deg,#EAF2FF 20%,#22C55E)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>"no" is the default.</span>
          </h1>
          <p style={{ fontSize:'1.0625rem', color:'#8CA0B8', lineHeight:1.78, fontWeight:300, marginBottom:'2.5rem', maxWidth:'520px' }}>{TRUST.sub}</p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <Link to="/contact" style={{ display:'inline-flex', background:'#3B82F6', color:'#fff', padding:'0.875rem 2rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'0.9375rem', textDecoration:'none', boxShadow:'0 0 28px rgba(59,130,246,0.4)' }}>Discuss Your Requirements</Link>
            <Link to="#security" style={{ display:'inline-flex', background:'rgba(18,26,36,0.55)', backdropFilter:'blur(10px)', color:'#8CA0B8', padding:'0.875rem 1.75rem', borderRadius:'0.5rem', fontWeight:400, fontSize:'0.9375rem', border:'1px solid rgba(174,183,194,0.1)', textDecoration:'none' }}>Review Security Posture</Link>
          </div>
        </div>
      </section>

      {/* BADGES */}
      <section id="security" style={{ padding:'7rem 4rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#3B82F6', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#3B82F6' }} />Security Posture
          </div>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:'-0.025em', marginBottom:'4rem' }}>Designed to survive the security review.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }} className="max-lg:grid-cols-2 max-md:grid-cols-1">
            {TRUST.badges.map(b=>(
              <div key={b.title} style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1rem', padding:'2rem', display:'flex', alignItems:'flex-start', gap:'1rem' }}>
                <span style={{ fontSize:'1.5rem', flexShrink:0 }}>{ICONS[b.icon]??'🔒'}</span>
                <div>
                  <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:'1rem', fontWeight:600, color:'#EAF2FF', marginBottom:'0.5rem' }}>{b.title}</h3>
                  <p style={{ fontSize:'0.8125rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding:'0 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'56rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#3B82F6', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#3B82F6' }} />Data Handling
          </div>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:'-0.025em', marginBottom:'3rem' }}>Clear answers to what your security team will ask.</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {FAQ.map(f=>(
              <div key={f.q} style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1rem', padding:'2rem' }}>
                <h4 style={{ fontFamily:'Syne,sans-serif', fontSize:'1rem', fontWeight:600, color:'#EAF2FF', marginBottom:'0.75rem' }}>{f.q}</h4>
                <p style={{ fontSize:'0.9375rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section style={{ padding:'0 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#3B82F6', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#3B82F6' }} />Deployment Options
          </div>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:'-0.025em', marginBottom:'3rem' }}>Deploy it your way.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem', marginBottom:'3rem' }} className="max-lg:grid-cols-1">
            {DEPLOYMENT.map(d=>(
              <div key={d.title} style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1.25rem', padding:'2.5rem 2rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#3B82F6,transparent)' }} />
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
                  <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:'1.125rem', fontWeight:600, color:'#EAF2FF' }}>{d.title}</h3>
                  <span style={{ fontSize:'0.625rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(59,130,246,0.1)', color:'#3B82F6', border:'1px solid rgba(59,130,246,0.25)', padding:'0.25rem 0.625rem', borderRadius:'999px' }}>{d.badge}</span>
                </div>
                <p style={{ fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7, marginBottom:'1.5rem' }}>{d.desc}</p>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.625rem' }}>
                  {d.features.map(f=>(
                    <li key={f} style={{ display:'flex', alignItems:'center', gap:'0.625rem', fontSize:'0.875rem', color:'#8CA0B8' }}>
                      <span style={{ width:'14px', height:'14px', borderRadius:'50%', background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8px', color:'#22C55E', flexShrink:0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center' }}>
            <Link to="/contact" style={{ display:'inline-flex', background:'#3B82F6', color:'#fff', padding:'1rem 2.5rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'1rem', textDecoration:'none', boxShadow:'0 0 32px rgba(59,130,246,0.4)' }}>Discuss Your Deployment →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
