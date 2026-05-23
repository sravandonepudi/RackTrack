import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Capabilities', path: '/product' },
      { label: 'How It Works', path: '/product' },
      { label: 'Integrations', path: '/product' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Use Cases', path: '/use-cases' },
      { label: 'Why RackTrack', path: '/why-racktrack' },
      { label: 'Resources', path: '/resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/company' },
      { label: 'Trust & Security', path: '/trust' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms-of-service' },
      { label: 'Security', path: '/trust' },
    ],
  },
]

export default function Footer(): ReactElement {
  return (
    <footer className="footer">
      {/* Top glow divider */}
      <div className="footer-glow-line" aria-hidden="true" />

      <div className="footer-inner">
        {/* Brand column */}
        <section className="footer-about" aria-label="RackTrack">
          <Link to="/" className="footer-brand" aria-label="RackTrack home">
            <img src="/RackTrack_Logo.png" alt="RackTrack" className="footer-logo-img" />
            <span>RackTrack</span>
          </Link>
          <p>Physical Intelligence Layer for the modern data center.</p>
          <div className="footer-socials" aria-label="Social links">
            <a href="https://www.linkedin.com" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M6.7 20H3.4V9.4h3.3V20ZM5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm16 12h-3.3v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20h-3.3V9.4h3.2v1.5h.1c.4-.9 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20Z" />
              </svg>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M20.8 7.8v.6c0 6.2-4.7 13.3-13.3 13.3-2.6 0-5.1-.8-7.1-2.1h1.1c2.2 0 4.2-.7 5.8-2-2.1 0-3.8-1.4-4.4-3.3.3.1.6.1.9.1.4 0 .8-.1 1.2-.2-2.1-.4-3.7-2.3-3.7-4.5v-.1c.6.4 1.4.6 2.1.6-1.3-.8-2.1-2.3-2.1-3.9 0-.9.2-1.7.6-2.4 2.3 2.8 5.7 4.6 9.6 4.8-.1-.3-.1-.7-.1-1.1 0-2.6 2.1-4.7 4.7-4.7 1.4 0 2.6.6 3.4 1.5 1.1-.2 2.1-.6 3-1.2-.4 1.1-1.1 2-2 2.6 1-.1 1.9-.4 2.7-.7-.6.9-1.4 1.8-2.4 2.4Z" />
              </svg>
            </a>
          </div>
        </section>

        {/* Link columns */}
        <nav className="footer-links" aria-label="Footer">
          {footerGroups.map((group) => (
            <section className="footer-column" key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map((link) => (
                <Link key={`${group.title}-${link.label}`} to={link.path}>
                  {link.label}
                </Link>
              ))}
            </section>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-copy">
            © {new Date().getFullYear()} RackTrack. All rights reserved.
          </span>
          <div className="footer-bottom-links">
            <Link to="/trust">Security</Link>
            <span aria-hidden="true" className="footer-sep">·</span>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
