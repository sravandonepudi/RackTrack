import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/product', label: 'Product' },
  { path: '/use-cases', label: 'Use Cases' },
  { path: '/why-racktrack', label: 'Why RackTrack' },
  { path: '/trust', label: 'Trust & Security' },
  { path: '/company', label: 'Company' },
  { path: '/resources', label: 'Resources' },
  { path: '/contact', label: 'Book Assessment' },
]

export default function NavBar(): JSX.Element {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 12L9 6L15 12L9 18L3 12Z" fill="currentColor" />
          </svg>
        </span>
        RackTrack
      </div>

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
    </header>
  )
}
