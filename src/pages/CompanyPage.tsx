import { Link } from 'react-router-dom';
import './CompanyPage.css';

const COMPANY = {
  headline: 'RackTrack was born from the gap between what tools report and what teams find at the rack.',
  founderStory:
    'We have lived the handoffs between infrastructure, network, security, and compliance teams. The common failure was always the same: every system had a partial view, while the physical rack kept changing.',
  deploymentOptions: [
    'Guided baseline assessment for one rack, row, or cage',
    'Camera-assisted evidence capture with customer-approved access',
    'Structured exports for CMDB, DCIM, ITSM, and audit workflows',
    'Enterprise rollout with private cloud or on-premise options',
  ],
} as const;

function PageHeroScene() {
  const theme = { accent: '#3B82F6', secondary: '#05E5F0', glow: 'rgba(59,130,246,0.2)' };

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '6%',
          top: '18%',
          width: 'min(38vw, 520px)',
          minWidth: '280px',
          aspectRatio: '0.82',
          border: '1px solid rgba(174,183,194,0.16)',
          borderRadius: '8px',
          transform: 'perspective(900px) rotateY(-16deg) rotateX(6deg)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          background: 'linear-gradient(160deg, rgba(18,26,36,0.88), rgba(2,6,23,0.5))',
          padding: '18px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          opacity: 0.92,
        }}
      >
        {Array.from({ length: 10 }).map((_, rackIndex) => (
          <div key={rackIndex} style={{ border:'1px solid rgba(174,183,194,0.12)', borderRadius:'6px', background:'rgba(0,0,0,0.35)', padding:'8px', display:'flex', flexDirection:'column', gap:'6px' }}>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <span
                key={rowIndex}
                style={{
                  height: rowIndex === 1 ? '18px' : '10px',
                  borderRadius: '3px',
                  background: rowIndex === rackIndex % 4 ? `linear-gradient(90deg, ${theme.accent}, ${theme.secondary})` : 'rgba(140,160,184,0.2)',
                  boxShadow: rowIndex === rackIndex % 4 ? `0 0 12px ${theme.glow}` : 'none',
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display:'none' }} />
    </div>
  );
}

export default function CompanyPage() {
  return (
    <div className="company-page">
      {/* HERO */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:'7rem', paddingBottom:'2rem', paddingLeft:'4rem', paddingRight:'4rem' }}>
        <PageHeroScene />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:'linear-gradient(to top, #0B0F14, transparent)', pointerEvents:'none', zIndex:10 }} />
        <div style={{ position:'relative', zIndex:20, maxWidth:'640px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.22)', borderRadius:'999px', padding:'0.375rem 1rem', marginBottom:'2rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#3B82F6' }} />
            <span style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#3B82F6' }}>Company</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:700, lineHeight:1.08, letterSpacing:'-0.03em', color:'#EAF2FF', marginBottom:'1.5rem' }}>
            Built by infrastructure veterans who hit the{' '}
            <span style={{ background:'linear-gradient(135deg,#EAF2FF 20%,#3B82F6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>same wall.</span>
          </h1>
          <p style={{ fontSize:'1.0625rem', color:'#8CA0B8', lineHeight:1.78, fontWeight:300, marginBottom:'2.5rem', maxWidth:'520px' }}>
            Decades managing data center infrastructure. The same problems repeating. Drift. Stale CMDBs. Audit hell. We stopped accepting it.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <Link to="/contact" style={{ display:'inline-flex', background:'#3B82F6', color:'#fff', padding:'0.875rem 2rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'0.9375rem', textDecoration:'none', boxShadow:'0 0 28px rgba(59,130,246,0.4)' }}>Get In Touch</Link>
            <Link to="#story" style={{ display:'inline-flex', background:'rgba(18,26,36,0.55)', backdropFilter:'blur(10px)', color:'#8CA0B8', padding:'0.875rem 1.75rem', borderRadius:'0.5rem', fontWeight:400, fontSize:'0.9375rem', border:'1px solid rgba(174,183,194,0.1)', textDecoration:'none' }}>Our Story</Link>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section id="story" style={{ padding:'7rem 4rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'center' }} className="max-lg:grid-cols-1">
          <div>
            <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#3B82F6', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#3B82F6' }} />The Problem We Lived
            </div>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:'-0.025em', marginBottom:'2rem' }}>{COMPANY.headline}</h2>
            <p style={{ fontSize:'1rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.8, marginBottom:'1.5rem' }}>{COMPANY.founderStory}</p>
            <p style={{ fontSize:'1rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.8, borderLeft:'2px solid rgba(59,130,246,0.4)', paddingLeft:'1.25rem', fontStyle:'italic' }}>
              Not an audit tool. Not a DCIM replacement. The truth layer underneath both.
            </p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <div style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1.25rem', padding:'2.5rem', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#3B82F6,transparent)' }} />
              <div style={{ fontFamily:'Syne,sans-serif', fontSize:'3.5rem', fontWeight:800, color:'rgba(59,130,246,0.12)', lineHeight:1, marginBottom:'0.5rem' }}>20+</div>
              <div style={{ fontSize:'1rem', fontWeight:500, color:'#EAF2FF', marginBottom:'0.375rem' }}>Years of combined DC leadership</div>
              <div style={{ fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300 }}>Financial services, healthcare, enterprise, hyperscale.</div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              {['Infrastructure at scale','Network architecture','Security & compliance','Data center ops'].map(s=>(
                <div key={s} style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(10px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'0.75rem', padding:'1.25rem', fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300 }}>✓ {s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section style={{ padding:'0 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'56rem', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:'-0.025em', marginBottom:'3rem' }}>How we deploy.</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'3rem' }}>
            {COMPANY.deploymentOptions.map((o)=>(
              <div key={o} style={{ display:'flex', alignItems:'center', gap:'1rem', background:'rgba(18,26,36,0.62)', backdropFilter:'blur(10px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'0.75rem', padding:'1rem 1.5rem' }}>
                <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#3B82F6', flexShrink:0 }} />
                <span style={{ fontSize:'0.9375rem', color:'#8CA0B8', fontWeight:300 }}>{o}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section style={{ padding:'0 4rem 7rem', textAlign:'center' }}>
        <div style={{ maxWidth:'42rem', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:'-0.025em', marginBottom:'1rem' }}>We're building the team.</h2>
          <p style={{ fontSize:'1rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.75, marginBottom:'2.5rem' }}>Early stage. High conviction. Looking for people who've lived the data center problem and want to fix it permanently.</p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/contact" style={{ display:'inline-flex', background:'#3B82F6', color:'#fff', padding:'1rem 2.5rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'1rem', textDecoration:'none', boxShadow:'0 0 32px rgba(59,130,246,0.4)' }}>Get In Touch →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
