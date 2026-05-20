import { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import UseCasesPage from './pages/UseCasesPage'
import WhyRackTrackPage from './pages/WhyRackTrackPage'
import CompanyPage from './pages/CompanyPage'
import ResourcesPage from './pages/ResourcesPage'
import ContactPage from './pages/ContactPage'
import TrustPage from './pages/TrustPage'

import NavBar from './components/NavBar'
import Footer from './components/Footer'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, summary'
const TEXT_SELECTOR = 'input, textarea, select, [contenteditable="true"]'

function moveElement(element: HTMLDivElement, x: number, y: number) {
  element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
}

function MouseCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const root = rootRef.current
    const ring = ringRef.current
    const dot = dotRef.current

    if (!pointerQuery.matches || motionQuery.matches || !root || !ring || !dot) {
      return
    }

    const target = { x: -100, y: -100 }
    const current = { x: -100, y: -100 }
    let frameId = 0

    document.body.classList.add('cursor-ready')

    const render = () => {
      current.x += (target.x - current.x) * 0.18
      current.y += (target.y - current.y) * 0.18
      moveElement(ring, current.x, current.y)
      frameId = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      moveElement(dot, target.x, target.y)
      root.classList.add('is-visible')
    }

    const handlePointerOver = (event: PointerEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null
      const interactiveElement = targetElement?.closest(INTERACTIVE_SELECTOR)
      const isTextTarget = Boolean(interactiveElement?.matches(TEXT_SELECTOR))

      root.classList.toggle('is-active', Boolean(interactiveElement))
      root.classList.toggle('is-text', isTextTarget)
    }

    const handlePointerDown = () => root.classList.add('is-down')
    const handlePointerUp = () => root.classList.remove('is-down')
    const handlePointerLeave = () => root.classList.remove('is-visible', 'is-active', 'is-text')

    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerover', handlePointerOver, { passive: true })
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('blur', handlePointerLeave)
    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      document.body.classList.remove('cursor-ready')
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('blur', handlePointerLeave)
    }
  }, [])

  return (
    <div ref={rootRef} className="mouse-cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}



function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="milkyway-bg" aria-hidden="true" />
        <MouseCursor />
        <NavBar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/use-cases" element={<UseCasesPage />} />
            <Route path="/why-racktrack" element={<WhyRackTrackPage />} />
            <Route path="/trust" element={<TrustPage />} />
            <Route path="/trust-security" element={<TrustPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book-assessment" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
