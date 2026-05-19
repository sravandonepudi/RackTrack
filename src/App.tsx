import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import UseCasesPage from './pages/UseCasesPage'
import WhyRackTrackPage from './pages/WhyRackTrackPage'
import TrustSecurityPage from './pages/TrustSecurityPage'
import CompanyPage from './pages/CompanyPage'
import ResourcesPage from './pages/ResourcesPage'
import BookAssessmentPage from './pages/BookAssessmentPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="milkyway-bg" aria-hidden="true" />
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/use-cases" element={<UseCasesPage />} />
            <Route path="/why-racktrack" element={<WhyRackTrackPage />} />
            <Route path="/trust-security" element={<TrustSecurityPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/book-assessment" element={<BookAssessmentPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
