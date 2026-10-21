import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { prefersReducedMotion } from '../animations/tokens'

/**
 * Curved "Clay Wipe" Page Transition with destination title flash.
 */
export default function PageTransition() {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pageName, setPageName] = useState('')

  useEffect(() => {
    if (prefersReducedMotion()) return

    // Derive page name from route
    let name = 'Saathi Bhojan'
    if (location.pathname === '/menu') name = 'Grand Menu'
    else if (location.pathname === '/about') name = 'Our Story'
    else if (location.pathname === '/gallery') name = 'Gallery Archives'
    else if (location.pathname === '/contact' || location.pathname === '/reserve') name = 'Reserve Your Table'

    setPageName(name)
    setIsTransitioning(true)

    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 650)

    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!isTransitioning) return null

  return (
    <div
      className="fixed inset-0 z-[10001] pointer-events-none flex flex-col items-center justify-center overflow-hidden animate-clayWipe"
      style={{
        backgroundColor: '#2A1812',
      }}
      aria-hidden="true"
    >
      {/* Animated Top Curved Edge */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-16 fill-[#1B100C]"
      >
        <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z" />
      </svg>

      {/* Flashing Destination Title */}
      <div className="text-center space-y-2 animate-fadeIn z-10 px-6">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#E8A317]">
          <span>◆</span>
          <span>SAATHI BHOJAN</span>
          <span>◆</span>
        </div>
        <h2 className="font-display italic text-3xl sm:text-4xl text-[#FAF4E9]">
          {pageName}
        </h2>
      </div>

      {/* Animated Bottom Curved Edge */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-16 fill-[#1B100C]"
      >
        <path d="M0,120 C300,30 900,30 1200,120 L1200,0 L0,0 Z" />
      </svg>
    </div>
  )
}
