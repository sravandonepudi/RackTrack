import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import RackTrackLogo from './RackTrackLogo'
import './Navbar.css'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/product', label: 'Product' },
  { path: '/use-cases', label: 'Use Cases' },
  { path: '/why-racktrack', label: 'Why RackTrack' },
  { path: '/trust', label: 'Trust & Security' },
  { path: '/company', label: 'Company' },
  { path: '/resources', label: 'Resources' },
]

export default function NavBar(): ReactElement {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand" aria-label="RackTrack home">
        <RackTrackLogo />
        <span>RackTrack</span>
      </NavLink>

      <nav className="navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/contact" className="nav-cta">
        Book Assessment
      </NavLink>
    </header>
  )
}
