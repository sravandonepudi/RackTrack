import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import RackTrackLogo from './RackTrackLogo'
import './Navbar.css'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/product', label: 'Products' },
  { path: '/use-cases', label: 'Solutions' },
  { path: '/why-racktrack', label: 'Why Us' },
  { path: '/trust', label: 'Security' },
  { path: '/company', label: 'About' },
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
        Get Started
      </NavLink>
    </header>
  )
}
