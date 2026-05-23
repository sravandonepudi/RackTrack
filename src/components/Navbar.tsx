import { useState, useRef, useEffect } from 'react'
import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

type NavChild = { label: string; path: string; desc: string }
type NavItem  = { path: string; label: string; children?: NavChild[] }

const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  {
    path: '/product',
    label: 'Products',
    children: [
      { label: 'Capabilities',  path: '/product',  desc: 'Full feature overview' },
      { label: 'How It Works',  path: '/product',  desc: 'From sweep to insight' },
      { label: 'Integrations',  path: '/product',  desc: 'Connect your stack' },
    ],
  },
  { path: '/use-cases',     label: 'Use Cases' },
  { path: '/why-racktrack', label: 'Why RackTrack' },
  { path: '/trust',         label: 'Trust & Security' },
  {
    path: '/company',
    label: 'Company',
    children: [
      { label: 'About',          path: '/company', desc: 'Our story and team' },
      { label: 'Trust & Legal',  path: '/trust',   desc: 'Security and compliance' },
      { label: 'Contact',        path: '/contact', desc: 'Get in touch' },
    ],
  },
  {
    path: '/resources',
    label: 'Resources',
    children: [
      { label: 'Resources',   path: '/resources',    desc: 'Guides and docs' },
      { label: 'Use Cases',   path: '/use-cases',    desc: 'Real-world scenarios' },
    ],
  },
]

function ChevronIcon() {
  return (
    <svg className="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DropdownItem({ item }: { item: NavChild }) {
  return (
    <NavLink to={item.path} className="nav-dd-item">
      <span className="nav-dd-label">{item.label}</span>
      <span className="nav-dd-desc">{item.desc}</span>
    </NavLink>
  )
}

function NavItemWithDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpen(true)
  }
  const hide = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  if (!item.children) {
    return (
      <NavLink
        to={item.path}
        end={item.path === '/'}
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div className="nav-item" onMouseEnter={show} onMouseLeave={hide}>
      <NavLink
        to={item.path}
        end={item.path === '/'}
        className={({ isActive }) =>
          `nav-link nav-link--has-dd${isActive ? ' active' : ''}${open ? ' nav-link--open' : ''}`
        }
      >
        {item.label}
        <ChevronIcon />
      </NavLink>

      <div className={`nav-dropdown${open ? ' nav-dropdown--open' : ''}`} role="menu">
        <div className="nav-dd-arrow" aria-hidden="true" />
        {item.children.map((child) => (
          <DropdownItem key={child.label} item={child} />
        ))}
      </div>
    </div>
  )
}

export default function NavBar(): ReactElement {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand" aria-label="RackTrack home">
        <img src="/RackTrack_Logo.png" alt="RackTrack" className="rack-mark" />
        <span>RackTrack</span>
      </NavLink>

      <nav className="navbar-links" aria-label="Main">
        {navItems.map((item) => (
          <NavItemWithDropdown key={item.path} item={item} />
        ))}
      </nav>

      <NavLink to="/contact" className="nav-cta">
        Book Assessment
      </NavLink>
    </header>
  )
}
