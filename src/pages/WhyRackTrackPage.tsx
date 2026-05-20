import { Link } from 'react-router-dom';
import './WhyRackTrackPage.css';

const WHY = {
  body:
    'Most systems either record intent, discover logical network state, or preserve point-in-time audit evidence. RackTrack connects physical observation, verification, and operational enrichment in one workflow.',
  pillars: [
    {
      num: '01',
      title: 'Sense',
      desc: 'Computer vision captures device position, labels, ports, cable state, and visual evidence from the rack.',
    },
    {
      num: '02',
      title: 'Verify',
      desc: 'Observed state is checked against existing CMDB, DCIM, network, and audit records to expose drift.',
    },
    {
      num: '03',
      title: 'Enrich',
      desc: 'RackTrack turns findings into exports, reports, and workflows each team can use immediately.',
    },
  ],
  compTable: {
    headers: ['System', 'Sense', 'Verify', 'Enrich'],
    rows: [
      { name: 'RackTrack', highlight: true, cells: ['Yes', 'Yes', 'Yes'] },
      { name: 'DCIM', highlight: false, cells: ['Manual', 'Partial', 'Yes'] },
      { name: 'Network discovery', highlight: false, cells: ['No', 'Partial', 'Yes'] },
      { name: 'Manual audit', highlight: false, cells: ['Yes', 'Point-in-time', 'No'] },
      { name: 'CMDB', highlight: false, cells: ['No', 'No', 'Yes'] },
    ],
  },
  evidence: {
    headline: 'The physical layer should be a source of truth, not a quarterly project.',
    body:
      'RackTrack gives infrastructure teams a practical path from uncertain records to verified physical evidence.',
  },
};

function PageHeroScene() {
  const theme = { accent: '#22F14C', secondary: '#05E5F0', glow: 'rgba(34,241,76,0.2)' };

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

const TOOL_GAPS = [
  { cat:'DCIM platforms',         pros:'Comprehensive DC management, capacity and power tracking.', gaps:'Physical inventory manually entered. No real-time verification. Drift builds invisibly.' },
  { cat:'Network discovery tools',pros:'Accurate picture of traffic. Good layer 2/3 topology.',      gaps:'Only sees what has network presence. Agents and decommissioned devices invisible. No rack position context.' },
  { cat:'Manual audits',          pros:'Ground truth when done carefully. Compliance teams trust it.',gaps:'Point-in-time, immediately drifts, takes 3–6 weeks per cycle. Doesn\'t scale to modern footprint.' },
  { cat:'CMDB',                   pros:'Central record of intent, drives ITSM and change management.',gaps:'Describes what should be there, not what is. Accuracy degrades with every undocumented change.' },
];

export default function WhyRackTrackPage() {
  return (
    <div className="why-racktrack-page">
      {/* HERO */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:'7rem', paddingBottom:'2rem', paddingLeft:'4rem', paddingRight:'4rem' }}>
        <PageHeroScene />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:'linear-gradient(to top, #0B0F14, transparent)', pointerEvents:'none', zIndex:10 }} />
        <div style={{ position:'relative', zIndex:20, maxWidth:'680px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(34,241,76,0.08)', border:'1px solid rgba(34,241,76,0.22)', borderRadius:'999px', padding:'0.375rem 1rem', marginBottom:'2rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22F14C' }} />
            <span style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#22F14C' }}>Differentiation</span>
          </div>
          <h1 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:700, lineHeight:1.08, letterSpacing:0, color:'#EAF2FF', marginBottom:'1.5rem' }}>
            Three things every tool does.{' '}
            <span style={{ background:'linear-gradient(100deg,#05E5F0,#22F14C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Only one does all three.</span>
          </h1>
          <p style={{ fontSize:'1.0625rem', color:'#8CA0B8', lineHeight:1.78, fontWeight:300, marginBottom:'2.5rem', maxWidth:'560px' }}>{WHY.body}</p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <Link to="/contact" style={{ display:'inline-flex', background:'#22F14C', color:'#fff', padding:'0.875rem 2rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'0.9375rem', textDecoration:'none', boxShadow:'0 0 28px rgba(34,241,76,0.4)' }}>Book a Demo</Link>
            <Link to="#comparison" style={{ display:'inline-flex', background:'rgba(18,26,36,0.55)', backdropFilter:'blur(10px)', color:'#8CA0B8', padding:'0.875rem 1.75rem', borderRadius:'0.5rem', fontWeight:400, fontSize:'0.9375rem', border:'1px solid rgba(174,183,194,0.1)', textDecoration:'none' }}>See the comparison</Link>
          </div>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section style={{ padding:'7rem 4rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#22F14C', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#22F14C' }} />How It Works
          </div>
          <h2 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:0, marginBottom:'4rem' }}>Sense. Verify. Enrich.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }} className="max-lg:grid-cols-1">
            {WHY.pillars.map(p=>(
              <div key={p.num} style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(34,241,76,0.2)', borderRadius:'1rem', padding:'2.5rem 2rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#22F14C,transparent)' }} />
                <div style={{ position:'absolute', top:'1.25rem', right:'1.25rem', width:'28px', height:'28px', borderRadius:'50%', background:'rgba(34,241,76,0.12)', border:'1px solid rgba(34,241,76,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4 7.5L11 1" stroke="#22F14C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'3.5rem', fontWeight:800, color:'rgba(34,241,76,0.07)', lineHeight:1, marginBottom:'1rem', userSelect:'none' }}>{p.num}</div>
                <h3 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'1.25rem', fontWeight:600, color:'#EAF2FF', marginBottom:'0.75rem' }}>{p.title}</h3>
                <p style={{ fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="comparison" style={{ padding:'0 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:0, marginBottom:'4rem' }}>Three things. One comparison.</h2>
          <div style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1.25rem', overflow:'hidden', maxWidth:'56rem' }}>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'1rem 1.5rem', background:'rgba(26,37,53,0.5)', borderBottom:'1px solid rgba(174,183,194,0.08)' }}>
              {WHY.compTable.headers.map(h=><span key={h} style={{ fontSize:'0.6875rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'#8CA0B8', textAlign: h==='System'?'left':'center' }}>{h}</span>)}
            </div>
            {WHY.compTable.rows.map(row=>(
              <div key={row.name} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'1rem 1.5rem', borderBottom:'1px solid rgba(174,183,194,0.06)', alignItems:'center', background: row.highlight?'rgba(34,241,76,0.05)':'transparent' }}>
                <span style={{ fontSize:'0.9375rem', color: row.highlight?'#22F14C':'#8CA0B8', fontWeight: row.highlight?500:400 }}>{row.name}</span>
                {row.cells.map((c,i)=>(
                  <span key={i} style={{ textAlign:'center', fontSize: c==='✓'?'1.125rem':'0.75rem', color: c==='✓'?'#22C55E': c==='—'?'rgba(255,255,255,0.1)':'#8CA0B8' }}>{c}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOL GAPS */}
      <section style={{ padding:'0 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#22F14C', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#22F14C' }} />Tool Landscape
          </div>
          <h2 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:0, marginBottom:'4rem' }}>What every category does — and where it falls short.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }} className="max-md:grid-cols-1">
            {TOOL_GAPS.map(t=>(
              <div key={t.cat} style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1rem', padding:'2rem' }}>
                <h4 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'1.0625rem', fontWeight:600, color:'#EAF2FF', marginBottom:'1.25rem' }}>{t.cat}</h4>
                <div style={{ marginBottom:'1rem' }}>
                  <div style={{ fontSize:'0.625rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#22F14C', marginBottom:'0.5rem' }}>Strengths</div>
                  <p style={{ fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7 }}>{t.pros}</p>
                </div>
                <div style={{ width:'100%', height:'1px', background:'rgba(174,183,194,0.07)', margin:'1rem 0' }} />
                <div>
                  <div style={{ fontSize:'0.625rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#8CA0B8', marginBottom:'0.5rem' }}>Where it falls short</div>
                  <p style={{ fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7 }}>{t.gaps}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'6rem 4rem', textAlign:'center' }}>
        <div style={{ maxWidth:'42rem', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:0, marginBottom:'1rem' }}>{WHY.evidence.headline}</h2>
          <p style={{ fontSize:'1rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.75, marginBottom:'2.5rem' }}>{WHY.evidence.body}</p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/contact" style={{ display:'inline-flex', background:'#22F14C', color:'#fff', padding:'1rem 2.5rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'1rem', textDecoration:'none', boxShadow:'0 0 32px rgba(34,241,76,0.4)' }}>Book a Demo →</Link>
            <Link to="/trust" style={{ display:'inline-flex', background:'rgba(18,26,36,0.55)', backdropFilter:'blur(10px)', color:'#8CA0B8', padding:'1rem 2rem', borderRadius:'0.5rem', fontWeight:400, fontSize:'1rem', border:'1px solid rgba(174,183,194,0.1)', textDecoration:'none' }}>Review Security Posture</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
