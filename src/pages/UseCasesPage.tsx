import { Link } from 'react-router-dom';
import './UseCasesPage.css';

const ROLES = [
  {
    id: 'infrastructure',
    title: 'Infrastructure operations',
    pain: 'Teams spend cycles reconciling spreadsheets, walkdowns, CMDB records, and what is actually installed.',
    outcome: 'RackTrack turns physical state into a verified inventory and highlights drift before it spreads.',
    cta: 'Map infrastructure drift',
  },
  {
    id: 'network',
    title: 'Network engineering',
    pain: 'Logical topology rarely explains the last meter: patch panels, ports, labels, and unplugged gear.',
    outcome: 'Port-level observations give network teams the missing physical context behind topology changes.',
    cta: 'Verify port mapping',
  },
  {
    id: 'security',
    title: 'Security teams',
    pain: 'Unknown devices and stale physical records create blind spots during reviews and investigations.',
    outcome: 'Evidence-backed physical inventory makes exceptions visible and defensible.',
    cta: 'Find unknown assets',
  },
  {
    id: 'compliance',
    title: 'Compliance and audit',
    pain: 'Manual evidence collection is slow, inconsistent, and hard to repeat across audit cycles.',
    outcome: 'RackTrack creates repeatable artifacts tied to observed rack state.',
    cta: 'Prepare audit evidence',
  },
  {
    id: 'incident',
    title: 'Incident response',
    pain: 'Responders lose time confirming where hardware is, what it connects to, and whether it changed.',
    outcome: 'Verified physical context shortens the path from alert to action.',
    cta: 'Speed up response',
  },
  {
    id: 'ma',
    title: 'Mergers and acquisitions',
    pain: 'Acquired environments often arrive with incomplete records and inherited unknowns.',
    outcome: 'A baseline scan gives teams a practical inventory before integration work begins.',
    cta: 'Baseline an environment',
  },
] as const;

function PageHeroScene() {
  const theme = { accent: '#3B82F6', secondary: '#22F14C', glow: 'rgba(59,130,246,0.2)' };

  return (
    <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden', background:'transparent' }}>
      <div style={{ position:'absolute', right:'6%', top:'18%', width:'min(38vw, 520px)', minWidth:'280px', aspectRatio:'0.82', border:'1px solid rgba(174,183,194,0.16)', borderRadius:'8px', transform:'perspective(900px) rotateY(-16deg) rotateX(6deg)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08)', background:'linear-gradient(160deg, rgba(18,26,36,0.88), rgba(2,6,23,0.5))', padding:'18px', display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'12px', opacity:0.92 }}>
        {Array.from({ length: 10 }).map((_, rackIndex) => (
          <div key={rackIndex} style={{ border:'1px solid rgba(174,183,194,0.12)', borderRadius:'6px', background:'rgba(0,0,0,0.35)', padding:'8px', display:'flex', flexDirection:'column', gap:'6px' }}>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <span key={rowIndex} style={{ height: rowIndex === 1 ? '18px' : '10px', borderRadius:'3px', background: rowIndex === rackIndex % 4 ? `linear-gradient(90deg, ${theme.accent}, ${theme.secondary})` : 'rgba(140,160,184,0.2)', boxShadow: rowIndex === rackIndex % 4 ? `0 0 12px ${theme.glow}` : 'none' }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display:'none' }} />
    </div>
  );
}

const ROLE_ICONS: Record<string, string> = {
  infrastructure:'🏢', network:'🔌', security:'🛡️', compliance:'📋', incident:'⚡', ma:'🔄',
};

export default function UseCasesPage() {
  return (
    <div className="use-cases-page">
      {/* HERO */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:'7rem', paddingBottom:'2rem', paddingLeft:'4rem', paddingRight:'4rem' }}>
        <PageHeroScene />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:'linear-gradient(to top, #0B0F14, transparent)', pointerEvents:'none', zIndex:10 }} />
        <div style={{ position:'relative', zIndex:20, maxWidth:'640px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.22)', borderRadius:'999px', padding:'0.375rem 1rem', marginBottom:'2rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#3B82F6' }} />
            <span style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#3B82F6' }}>Use Cases</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:700, lineHeight:1.08, letterSpacing:'-0.03em', color:'#EAF2FF', marginBottom:'1.5rem' }}>
            The same truth,{' '}
            <span style={{ background:'linear-gradient(135deg,#EAF2FF 20%,#3B82F6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>for every team.</span>
          </h1>
          <p style={{ fontSize:'1.0625rem', color:'#8CA0B8', lineHeight:1.78, fontWeight:300, marginBottom:'2.5rem', maxWidth:'520px' }}>
            One verified physical layer. Six teams that draw from it differently. All of them finally get answers they can trust.
          </p>
          <div style={{ display:'flex', gap:'0.625rem', flexWrap:'wrap' }}>
            {ROLES.map(r=>(
              <a key={r.id} href={`#${r.id}`} style={{ padding:'0.4rem 1rem', background:'rgba(18,26,36,0.6)', backdropFilter:'blur(10px)', border:'1px solid rgba(174,183,194,0.1)', borderRadius:'999px', fontSize:'0.8125rem', color:'#8CA0B8', textDecoration:'none' }}>
                {r.title.split(' ')[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ROLE SECTIONS */}
      {ROLES.map((role, i) => (
        <section key={role.id} id={role.id} style={{ padding:'6rem 4rem', position:'relative', background:'transparent' }}>
          <div style={{ maxWidth:'80rem', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }} className="max-lg:grid-cols-1">
            {/* Text side */}
            <div style={{ order: i%2===1 ? 2:1 }}>
              <div style={{ fontFamily:'Syne,sans-serif', fontSize:'4rem', fontWeight:800, color:'rgba(59,130,246,0.06)', lineHeight:1, marginBottom:'0.75rem', userSelect:'none' }}>
                {String(i+1).padStart(2,'0')}
              </div>
              <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>{ROLE_ICONS[role.id]}</div>
              <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#3B82F6', marginBottom:'0.75rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#3B82F6' }} />Role {String(i+1).padStart(2,'0')}
              </div>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:700, color:'#EAF2FF', marginBottom:'1.5rem', letterSpacing:'-0.02em' }}>{role.title}</h2>

              {/* Pain */}
              <div style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.12)', borderRadius:'0.75rem', padding:'1.25rem', marginBottom:'1rem' }}>
                <div style={{ fontSize:'0.625rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(239,68,68,0.7)', marginBottom:'0.625rem' }}>Before RackTrack</div>
                <p style={{ fontSize:'0.9375rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7, borderLeft:'2px solid rgba(239,68,68,0.3)', paddingLeft:'1rem' }}>{role.pain}</p>
              </div>

              {/* Outcome */}
              <div style={{ background:'rgba(59,130,246,0.06)', border:'1px solid rgba(59,130,246,0.15)', borderRadius:'0.75rem', padding:'1.25rem', marginBottom:'2rem' }}>
                <div style={{ fontSize:'0.625rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(59,130,246,0.8)', marginBottom:'0.625rem' }}>With RackTrack</div>
                <p style={{ fontSize:'0.9375rem', color:'#EAF2FF', fontWeight:300, lineHeight:1.7, borderLeft:'2px solid rgba(59,130,246,0.4)', paddingLeft:'1rem' }}>{role.outcome}</p>
              </div>

              <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(59,130,246,0.12)', border:'1px solid rgba(59,130,246,0.3)', color:'#3B82F6', padding:'0.75rem 1.5rem', borderRadius:'0.5rem', fontSize:'0.875rem', fontWeight:500, textDecoration:'none' }}>
                {role.cta} →
              </Link>
            </div>

            {/* Visual panel */}
            <div style={{ order: i%2===1 ? 1:2 }}>
              <div style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1.25rem', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.35)' }}>
                {/* Window bar */}
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.875rem 1.25rem', borderBottom:'1px solid rgba(174,183,194,0.08)', background:'rgba(26,37,53,0.5)' }}>
                  {['#EF4444','#F59E0B','#22C55E'].map(c=><div key={c} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c, opacity:0.6 }} />)}
                  <span style={{ marginLeft:'0.5rem', fontSize:'0.75rem', color:'#8CA0B8', fontFamily:'monospace' }}>racktrack / {role.id}</span>
                  <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'0.375rem', fontSize:'0.625rem', color:'#22C55E' }}>
                    <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#22C55E' }} />Live
                  </div>
                </div>
                {/* Rows */}
                <div style={{ padding:'1.25rem', display:'flex', flexDirection:'column', gap:'0.625rem' }}>
                  {['Device detected','Port mapped','Firmware verified','Compliance artifact'].map((row,j)=>(
                    <div key={row} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.625rem 1rem', background:'rgba(26,37,53,0.55)', borderRadius:'0.5rem' }}>
                      <span style={{ fontSize:'0.8125rem', color:'#8CA0B8' }}>{row}</span>
                      <span style={{ fontSize:'0.6875rem', fontWeight:500, color:j===2?'#3B82F6':'#22C55E' }}>
                        {j===2?'✓ Current':'✓ Verified'}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ padding:'0.875rem 1.25rem', borderTop:'1px solid rgba(174,183,194,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:'0.6875rem', color:'#8CA0B8' }}>Scan #{1200+i*47}</span>
                  <div style={{ display:'flex', gap:'0.5rem' }}>
                    {['Export','Archive'].map(a=>(
                      <span key={a} style={{ padding:'0.25rem 0.75rem', border:'1px solid rgba(174,183,194,0.1)', borderRadius:'0.25rem', fontSize:'0.6875rem', color:'#8CA0B8' }}>{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <div style={{ width:'100%', height:'1px', background:'linear-gradient(90deg,transparent,rgba(59,130,246,0.08),transparent)' }} />
      <ContactFormBanner />
    </div>
  );
}

function ContactFormBanner() {
  return (
    <section style={{ padding:'6rem 4rem', textAlign:'center' }}>
      <div style={{ maxWidth:'42rem', margin:'0 auto' }}>
        <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:'-0.025em', marginBottom:'1rem' }}>Ready to see your rack the way RackTrack sees it?</h2>
        <p style={{ fontSize:'1rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.75, marginBottom:'2.5rem' }}>Twenty minutes. One rack. Verified. Book a baseline assessment.</p>
        <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'#3B82F6', color:'#fff', padding:'1rem 2.5rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'1rem', textDecoration:'none', boxShadow:'0 0 32px rgba(59,130,246,0.4)' }}>Book Assessment →</Link>
      </div>
    </section>
  );
}
