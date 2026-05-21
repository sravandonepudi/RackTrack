import { Link } from 'react-router-dom';
import './ProductPage.css';

const OUTPUTS = [
  {
    title: 'Observed inventory',
    body: 'Device identity, rack unit position, labels, and visual evidence captured in a repeatable scan.',
  },
  {
    title: 'Physical topology',
    body: 'Port and cable observations that add physical context to logical network discovery.',
  },
  {
    title: 'Drift reports',
    body: 'Side-by-side comparisons of observed state against CMDB, DCIM, and audit records.',
  },
];

function PageHeroScene() {
  const theme = { accent: '#8B5CF6', secondary: '#00F0FF', glow: 'rgba(139,92,246,0.28)' };

  return (
    <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden', background:'transparent' }}>
      <div style={{ position:'absolute', right:'6%', top:'18%', width:'min(38vw, 520px)', minWidth:'280px', aspectRatio:'0.82', border:'1px solid rgba(0,209,255,0.16)', borderRadius:'8px', transform:'perspective(900px) rotateY(-16deg) rotateX(6deg)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08)', background:'linear-gradient(160deg, rgba(11,16,38,0.88), rgba(5,8,22,0.58))', padding:'18px', display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'12px', opacity:0.92 }}>
        {Array.from({ length: 10 }).map((_, rackIndex) => (
          <div key={rackIndex} style={{ border:'1px solid rgba(0,209,255,0.12)', borderRadius:'6px', background:'rgba(0,0,0,0.35)', padding:'8px', display:'flex', flexDirection:'column', gap:'6px' }}>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <span key={rowIndex} style={{ height: rowIndex === 1 ? '18px' : '10px', borderRadius:'3px', background: rowIndex === rackIndex % 4 ? `linear-gradient(90deg, ${theme.accent}, ${theme.secondary})` : 'rgba(182,194,217,0.16)', boxShadow: rowIndex === rackIndex % 4 ? `0 0 12px ${theme.glow}` : 'none' }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display:'none' }} />
    </div>
  );
}

function ProductHeroSection() {
  return (
    <section className="product-section">
      <div className="product-section-heading">
        <p className="product-eyebrow">Product outputs</p>
        <h2>Evidence your existing tools can use.</h2>
        <p>
          RackTrack does not ask teams to abandon their systems of record. It gives those systems a verified
          physical layer to reconcile against.
        </p>
      </div>
      <div className="product-card-grid">
        {OUTPUTS.map((output) => (
          <article className="product-card" key={output.title}>
            <h3>{output.title}</h3>
            <p>{output.body}</p>
          </article>
        ))}
      </div>
      <div className="product-actions">
        <Link className="product-button primary" to="/contact">
          Book a Baseline Assessment
        </Link>
        <Link className="product-button" to="/why-racktrack">
          Compare Approaches
        </Link>
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <div className="product-page">
      <section style={{ position:'relative', minHeight:'70vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:'7rem', paddingBottom:'2rem', paddingLeft:'4rem', paddingRight:'4rem' }}>
        <PageHeroScene />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:'linear-gradient(to top, #050816, transparent)', pointerEvents:'none', zIndex:10 }} />
        <div style={{ position:'relative', zIndex:20, maxWidth:'680px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(139,92,246,0.10)', border:'1px solid rgba(139,92,246,0.30)', borderRadius:'999px', padding:'0.375rem 1rem', marginBottom:'2rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#8B5CF6', boxShadow:'0 0 12px rgba(139,92,246,0.75)' }} />
            <span style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#8B5CF6' }}>Product</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'3.25rem', fontWeight:700, lineHeight:1.08, letterSpacing:0, color:'#FFFFFF', marginBottom:'1.5rem' }}>What RackTrack actually sees.</h1>
          <p style={{ fontSize:'1.0625rem', color:'#B6C2D9', lineHeight:1.78, fontWeight:300, maxWidth:'560px' }}>Inventory, port-level topology, and evidence for compliance - generated from computer vision applied to your rack.</p>
        </div>
      </section>

      <ProductHeroSection />
    </div>
  );
}
