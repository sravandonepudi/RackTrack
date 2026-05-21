import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './CompanyPage.css';

const COMPANY = {
  headline: 'RackTrack evolved from records and reality',
  founderStory:
    'Enterprise teams operated through fragmented infrastructure visibility. Critical systems relied on records that quickly became outdated.Meanwhile, the rack remained the operational blind spot.',

  deploymentOptions: [
    'Guided baseline assessment for one rack, row, or cage',
    'Camera-assisted evidence capture with customer-approved access',
    'Structured exports for CMDB, DCIM, ITSM, and audit workflows',
    'Enterprise rollout with private cloud or on-premise options',
  ],
} as const;

type RevealProps = {
  children: ReactNode;
  from?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
};

function Reveal({ children, from = 'bottom', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenTransforms: Record<NonNullable<RevealProps['from']>, string> = {
    top: 'translate3d(0, -90px, 0)',
    bottom: 'translate3d(0, 90px, 0)',
    left: 'translate3d(-110px, 0, 0)',
    right: 'translate3d(110px, 0, 0)',
  };

  const revealStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : hiddenTransforms[from],
    filter: isVisible ? 'blur(0)' : 'blur(10px)',
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: '760ms',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
    willChange: 'opacity, transform, filter',
  };

  return (
    <div ref={ref} className={`reveal reveal-${from}`} style={revealStyle}>
      {children}
    </div>
  );
}

export default function CompanyPage() {
  return (
    <div className="company-page">

      {/* HERO */}
      <section style={{ position:'relative', minHeight:'88vh', display:'flex', alignItems:'center', paddingTop:'5rem', paddingBottom:'2.5rem', paddingLeft:'4rem', paddingRight:'4rem' }}>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'110px', background:'linear-gradient(to top, #050816, transparent)', pointerEvents:'none', zIndex:10 }} />
        <div style={{ position:'relative', zIndex:20, maxWidth:'640px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(0,209,255,0.10)', border:'1px solid rgba(0,209,255,0.26)', borderRadius:'999px', padding:'0.375rem 1rem', marginBottom:'2rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#00D1FF', display:'block' }} />
            <span style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#00D1FF' }}>Company</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'3.25rem', fontWeight:700, lineHeight:1.08, color:'#FFFFFF', marginBottom:'1.5rem' }}>
            Built to Restore Infrastructure Trust{' '}
            <span style={{ background:'linear-gradient(135deg,#FFFFFF 20%,#00D1FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}> </span>
          </h1>
          <p style={{ fontSize:'1.0625rem', color:'#B6C2D9', lineHeight:1.78, fontWeight:400, marginBottom:'2.5rem', maxWidth:'520px' }}>
             After decades managing data center infrastructure, we stopped accepting rack drift, stale CMDBs, and endless audit failures as normal.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <Link to="/contact" style={{ display:'inline-flex', background:'#00D1FF', color:'#fff', padding:'0.875rem 2rem', borderRadius:'0.5rem', fontWeight:500, fontSize:'0.9375rem', textDecoration:'none', boxShadow:'0 0 28px rgba(0,209,255,0.42)' }}>Get In Touch</Link>
            <Link to="#story" style={{ display:'inline-flex', background:'rgba(11,16,38,0.55)', backdropFilter:'blur(10px)', color:'#B6C2D9', padding:'0.875rem 1.75rem', borderRadius:'0.5rem', fontWeight:400, fontSize:'0.9375rem', border:'1px solid rgba(0,209,255,0.1)', textDecoration:'none' }}>Our Story</Link>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section id="story" style={{ padding:'4rem 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'center' }} className="max-lg:grid-cols-1">

          <Reveal from="left">
            <div>
              <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#00D1FF', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#00D1FF' }} />The Problem We Lived
              </div>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, lineHeight:1.14, marginBottom:'2rem', background:'linear-gradient(100deg,#FFFFFF 0%,#E9FDFF 16%,#16E7FF 38%,#00D1FF 58%,#7C6CFF 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                <span style={{ display:'block', whiteSpace:'nowrap', fontSize:'clamp(1.6rem, 3.3vw, 2.5rem)' }}>RackTrack evolved from</span>
                <span style={{ display:'block', whiteSpace:'nowrap', fontSize:'clamp(1.6rem, 3.3vw, 2.5rem)' }}>records and reality</span>
              </h2>
              <p style={{ fontSize:'1rem', color:'#dce6f5', fontWeight:400, lineHeight:1.8, marginBottom:'1.5rem' }}>{COMPANY.founderStory}</p>
              <p style={{ fontSize:'1rem', color:'#dce6f5', fontWeight:400, lineHeight:1.8, borderLeft:'2px solid rgba(0,209,255,0.42)', paddingLeft:'1.25rem', fontStyle:'italic' }}>
                Not an audit tool. Not a DCIM replacement. The truth layer underneath both.
              </p>
            </div>
          </Reveal>

          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <Reveal from="top">
              <div className="glass-card" style={{ padding:'2.5rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#00D1FF,transparent)' }} />
                <div style={{ fontFamily:'Syne,sans-serif', fontSize:'3.5rem', fontWeight:800, color:'rgba(0,209,255,0.5)', lineHeight:1, marginBottom:'0.5rem' }}>20+</div>
                <div style={{ fontSize:'1rem', fontWeight:600, color:'#FFFFFF', marginBottom:'0.375rem' }}>Years of combined DC leadership</div>
                <div style={{ fontSize:'0.875rem', color:'#dce6f5', fontWeight:400 }}>Financial services, healthcare, enterprise, hyperscale.</div>
              </div>
            </Reveal>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              {(['Infrastructure at scale','Network architecture','Security & compliance','Data center ops'] as const).map((s, i) => (
                <Reveal key={s} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 80}>
                  <div className="glass-card" style={{ padding:'1.25rem', fontSize:'0.875rem', color:'#dce6f5', fontWeight:400, height:'100%' }}>
                    + {s}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section style={{ padding:'0 4rem 7rem', position:'relative' }}>
        <div style={{ maxWidth:'56rem', margin:'0 auto' }}>
          <Reveal from="left">
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'2.5rem', fontWeight:700, color:'#FFFFFF', marginBottom:'3rem' }}>How we deploy.</h2>
          </Reveal>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {COMPANY.deploymentOptions.map((o, i) => (
              <Reveal key={o} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 100}>
                <div className="glass-card" style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.5rem' }}>
                  <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#00D1FF', flexShrink:0, display:'block' }} />
                  <span style={{ fontSize:'0.9375rem', color:'#dce6f5', fontWeight:400 }}>{o}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section style={{ padding:'0 4rem 7rem', textAlign:'center' }}>
        <div style={{ maxWidth:'42rem', margin:'0 auto' }}>
          <Reveal from="bottom">
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'2.5rem', fontWeight:700, color:'#FFFFFF', marginBottom:'1rem' }}>We're building the team.</h2>
            <p style={{ fontSize:'1rem', color:'#dce6f5', fontWeight:400, lineHeight:1.75, marginBottom:'2.5rem' }}>
              Early stage. High conviction. Looking for people who've lived the data center problem and want to fix it permanently.
            </p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/contact" className="ghost-btn">Get In Touch →</Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
