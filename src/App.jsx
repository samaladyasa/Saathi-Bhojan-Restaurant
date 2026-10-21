import React, { useEffect, useState, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './App.css'

// Register ScrollTrigger once globally
gsap.registerPlugin(ScrollTrigger)

export const LenisContext = createContext(null)

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import GrainOverlay from './components/GrainOverlay'
import Preloader from './components/Preloader'
import PageTransition from './components/PageTransition'

// Pages
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Scroll to top helper on route change
function ScrollToTop({ lenis }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    // Refresh ScrollTrigger calculations after route transition
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => clearTimeout(timeout)
  }, [pathname, lenis])

  return null
}

function App() {
  const [lenisInstance, setLenisInstance] = useState(null)
  const [preloaderDone, setPreloaderDone] = useState(false)

  // Initialize Lenis + GSAP synchronization
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085, // Buttery smooth momentum
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: false,
    })

    setLenisInstance(lenis)

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Synchronize with GSAP RAF ticker
    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Window resize handler
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisInstance}>
      <Router>
        <ScrollToTop lenis={lenisInstance} />
        <PageTransition />
        
        {/* Film Grain Texture */}
        <GrainOverlay />

        {/* Thin Brass Scroll Progress Line */}
        <ScrollProgress />

        {/* Lagging Ring Custom Cursor */}
        <Cursor />

        {/* Ceremonial Diya Lamp Preloader */}
        <Preloader onComplete={() => setPreloaderDone(true)} />

        <div className="flex flex-col min-h-screen bg-[#1B100C] text-[#F5E9D4] relative">
          {/* Floating Navbar */}
          <Navbar />

          {/* Main Content View */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reserve" element={<Contact />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Universal Scalloped Footer */}
          <Footer />
        </div>
      </Router>
    </LenisContext.Provider>
  )
}

export default App
