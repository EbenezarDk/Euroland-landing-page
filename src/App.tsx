import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { ProductPage } from './pages/ProductPage'
import { FloatingActions } from './components/FloatingActions'
import './styles/landing.css'
import './styles/product.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:slug" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingActions />
    </BrowserRouter>
  )
}
