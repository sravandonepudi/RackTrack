import './ContactPage.css';

const CONTACT_CONTENT = {
  hero: {
    eyebrow: 'Book Assessment',
    title: 'Twenty minutes. One rack. Verified. Jahnavi',
    highlightedTitle: 'One rack.',
    body: 'Book a baseline assessment. We show you exactly what RackTrack sees - before any commitment.',
  },
  form: {
    eyebrow: 'Assessment request',
    title: 'Tell us what you want to baseline.',
    body:
      'Share the environment size, security requirements, and the systems you want RackTrack to compare against.',
    nameLabel: 'Name',
    emailLabel: 'Work email',
    companyLabel: 'Company',
    messageLabel: 'What should we assess?',
    messagePlaceholder: 'One rack, one row, a cage, or a specific audit need.',
    submitLabel: 'Request Assessment',
  },
} as const;

function PageHeroScene() {
  const theme = { accent: '#22F14C', secondary: '#05E5F0', glow: 'rgba(34,241,76,0.22)' };

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: `radial-gradient(circle at 75% 35%, ${theme.glow}, transparent 30%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05), transparent 28%)`,
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
          boxShadow: `0 0 70px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          background: 'linear-gradient(160deg, rgba(18,26,36,0.88), rgba(2,6,23,0.5))',
          padding: '18px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          opacity: 0.92,
        }}
      >
        {Array.from({ length: 10 }).map((_, rackIndex) => (
          <div
            key={rackIndex}
            style={{
              border: '1px solid rgba(174,183,194,0.12)',
              borderRadius: '6px',
              background: 'rgba(0,0,0,0.35)',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <span
                key={rowIndex}
                style={{
                  height: rowIndex === 1 ? '18px' : '10px',
                  borderRadius: '3px',
                  background:
                    rowIndex === rackIndex % 4
                      ? `linear-gradient(90deg, ${theme.accent}, ${theme.secondary})`
                      : 'rgba(140,160,184,0.2)',
                  boxShadow: rowIndex === rackIndex % 4 ? `0 0 12px ${theme.glow}` : 'none',
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: '12% -10%',
          background: `linear-gradient(105deg, transparent 36%, ${theme.glow} 48%, transparent 62%)`,
          filter: 'blur(18px)',
          opacity: 0.85,
        }}
      />
    </div>
  );
}

function ContactForm() {
  return (
    <section className="contact-section">
      <form className="contact-form" action="mailto:hello@racktrack.com" method="post">
        <div>
          <p className="contact-eyebrow">{CONTACT_CONTENT.form.eyebrow}</p>
          <h2>{CONTACT_CONTENT.form.title}</h2>
          <p>{CONTACT_CONTENT.form.body}</p>
        </div>

        <label>
          {CONTACT_CONTENT.form.nameLabel}
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          {CONTACT_CONTENT.form.emailLabel}
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          {CONTACT_CONTENT.form.companyLabel}
          <input name="company" autoComplete="organization" />
        </label>
        <label>
          {CONTACT_CONTENT.form.messageLabel}
          <textarea name="message" rows={5} placeholder={CONTACT_CONTENT.form.messagePlaceholder} />
        </label>
        <button className="contact-button primary" type="submit">
          {CONTACT_CONTENT.form.submitLabel}
        </button>
      </form>
    </section>
  );
}

export default function ContactPage() {
  const [titleStart, titleEnd] = CONTACT_CONTENT.hero.title.split(CONTACT_CONTENT.hero.highlightedTitle);

  return (
    <div className="contact-page">
      <section style={{ position:'relative', minHeight:'70vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:'7rem', paddingBottom:'2rem', paddingLeft:'4rem', paddingRight:'4rem' }}>
        <PageHeroScene />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:'linear-gradient(to top, #0B0F14, transparent)', pointerEvents:'none', zIndex:10 }} />
        <div style={{ position:'relative', zIndex:20, maxWidth:'600px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(34,241,76,0.08)', border:'1px solid rgba(34,241,76,0.22)', borderRadius:'999px', padding:'0.375rem 1rem', marginBottom:'2rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22F14C', animation:'pulse 2s infinite' }} />
            <span style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#22F14C' }}>{CONTACT_CONTENT.hero.eyebrow}</span>
          </div>
          <h1 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:700, lineHeight:1.08, letterSpacing:0, color:'#EAF2FF', marginBottom:'1.5rem' }}>
            {titleStart}
            <span style={{ background:'linear-gradient(100deg,#05E5F0,#22F14C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{CONTACT_CONTENT.hero.highlightedTitle}</span>
            {titleEnd}
          </h1>
          <p style={{ fontSize:'1.0625rem', color:'#8CA0B8', lineHeight:1.78, fontWeight:300, maxWidth:'480px' }}>
            {CONTACT_CONTENT.hero.body}
          </p>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
