import { Link } from 'react-router-dom';
import './ResourcesPage.css';

const GATED_ASSETS = [
  {
    cat: 'Calculator',
    title: 'ROI Calculator',
    desc: 'An interactive sensitivity model behind the $1M-$2.5M annual value claim for a 500-rack footprint.',
  },
  {
    cat: 'Whitepaper',
    title: 'Buyer\'s Guide to Physical Intelligence',
    desc: 'A category-defining guide for teams evaluating evidence-grade inventory and topology.',
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

const PUBLIC_ASSETS = [
  {
    title: 'The Cost of CMDB Drift',
    desc: 'Why intent records decay, where the hidden costs show up, and how teams can frame the problem.',
  },
  {
    title: 'Why Manual Rack Audits Fail',
    desc: 'A plain-language look at point-in-time evidence, spreadsheet decay, and audit fatigue.',
  },
  {
    title: 'Evidence-Grade Inventory',
    desc: 'What defensible inventory means for infrastructure, security, and compliance teams.',
  },
  {
    title: 'The Physical Layer in Incident Response',
    desc: 'Why responders lose time at the rack and how better physical truth changes the workflow.',
  },
];

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

export default function ResourcesPage() {
  return (
    <div className="resources-page">
      <section style={{ position:'relative', minHeight:'80vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:'7rem', paddingBottom:'2rem', paddingLeft:'4rem', paddingRight:'4rem' }}>
        <PageHeroScene />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:'linear-gradient(to top, #0B0F14, transparent)', pointerEvents:'none', zIndex:10 }} />
        <div style={{ position:'relative', zIndex:20, maxWidth:'660px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(34,241,76,0.08)', border:'1px solid rgba(34,241,76,0.22)', borderRadius:'999px', padding:'0.375rem 1rem', marginBottom:'2rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22F14C' }} />
            <span style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#22F14C' }}>Resources</span>
          </div>
          <h1 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:700, lineHeight:1.08, letterSpacing:0, color:'#EAF2FF', marginBottom:'1.5rem' }}>
            Useful enough to trade an email for.{' '}
            <span style={{ background:'linear-gradient(100deg,#05E5F0,#22F14C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Careful enough to publish.</span>
          </h1>
          <p style={{ fontSize:'1.0625rem', color:'#8CA0B8', lineHeight:1.78, fontWeight:300, maxWidth:'520px' }}>
            Gated models and guides for serious buyers, plus public writing on CMDB drift, manual audit failure modes, and evidence-grade physical inventory.
          </p>
        </div>
      </section>

      <section style={{ padding:'6rem 4rem 3rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#22F14C', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#22F14C' }} />Gated Assets
          </div>
          <h2 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:0, marginBottom:'1rem' }}>Resources for buyers doing the math.</h2>
          <p style={{ fontSize:'1rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.75, marginBottom:'3rem', maxWidth:'42rem' }}>
            These assets are designed for qualified evaluations and keep implementation details, source lists, and architecture out of public view.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.25rem' }} className="max-xl:grid-cols-2 max-md:grid-cols-1">
            {GATED_ASSETS.map((asset) => (
              <article key={asset.title} style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1rem', padding:'2rem', minHeight:'260px', display:'flex', flexDirection:'column' }}>
                <span style={{ alignSelf:'flex-start', fontSize:'0.625rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', background:'rgba(34,241,76,0.1)', color:'#22F14C', border:'1px solid rgba(34,241,76,0.2)', padding:'0.2rem 0.625rem', borderRadius:'999px', marginBottom:'1.25rem' }}>{asset.cat}</span>
                <h3 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'1.05rem', fontWeight:600, color:'#EAF2FF', marginBottom:'0.75rem', lineHeight:1.35 }}>{asset.title}</h3>
                <p style={{ fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7, marginBottom:'1.5rem' }}>{asset.desc}</p>
                <Link to="/contact" style={{ marginTop:'auto', fontSize:'0.8125rem', color:'#22F14C', textDecoration:'none' }}>Request access</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'4rem 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#22F14C', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#22F14C' }} />Public Reading
          </div>
          <h2 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontWeight:700, color:'#EAF2FF', letterSpacing:0, marginBottom:'3rem' }}>Category thinking, without the blueprint.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1rem' }} className="max-md:grid-cols-1">
            {PUBLIC_ASSETS.map((asset) => (
              <article key={asset.title} style={{ background:'rgba(18,26,36,0.62)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1rem', padding:'2rem' }}>
                <h3 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'1rem', fontWeight:600, color:'#EAF2FF', marginBottom:'0.75rem' }}>{asset.title}</h3>
                <p style={{ fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7 }}>{asset.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
