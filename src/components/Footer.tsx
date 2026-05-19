import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="brand-logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="4" fill="currentColor" />
            <path d="M7 8h10M7 12h10M7 16h6" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <span className="brand-text">RackTrack</span>
      </div>
      <div className="footer-copy">Copyright {new Date().getFullYear()} RackTrack</div>
    </footer>
  )
}

export default Footer
