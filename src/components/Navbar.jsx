import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Utensils, PhoneCall, Menu as MenuIcon, X } from 'lucide-react'
import { SITE_CONFIG } from '../data/site'
import MobileMenu from './MobileMenu'
import Button from './Button'
import BrandLogo from './BrandLogo'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollYRef = useRef(0)
  const isVisibleRef = useRef(true)
  const isScrolledRef = useRef(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Background blur trigger (only update if state actually changes)
      const scrolled = currentScrollY > 50
      if (scrolled !== isScrolledRef.current) {
        isScrolledRef.current = scrolled
        setIsScrolled(scrolled)
      }

      // Hide on scroll down, show on scroll up
      let visible = true
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 180) {
        visible = false
      } else {
        visible = true
      }

      if (visible !== isVisibleRef.current) {
        isVisibleRef.current = visible
        setIsVisible(visible)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[990] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#130D0B]/92 backdrop-blur-md border-b border-amber-500/20 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo with Bespoke Crest & Typography */}
          <Link
            to="/"
            className="group text-decoration-none"
            data-cursor="Home"
          >
            <BrandLogo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {SITE_CONFIG.navigation
              .filter((item) => item.path !== '/reserve' && item.path !== '/contact')
              .map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-sm font-mono uppercase tracking-[0.15em] transition-all relative py-1 ${
                      isActive
                        ? 'text-[#E5B869] font-medium'
                        : 'text-[#F5E9D4]/80 hover:text-[#E5B869]'
                    }`}
                    data-cursor="Explore"
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E5B869] shadow-[0_0_8px_rgba(229,184,105,0.6)] rounded-full" />
                    )}
                  </Link>
                )
              })}
          </nav>

          {/* Right Action: Table Reservation Button & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <Button
              to="/reserve"
              variant="ember"
              className={`hidden sm:inline-flex !py-2.5 !px-5 text-xs font-mono ${
                location.pathname === '/reserve' || location.pathname === '/contact'
                  ? 'ring-2 ring-[#E5B869] shadow-[0_0_15px_rgba(229,184,105,0.4)]'
                  : ''
              }`}
              cursorLabel="Reserve"
              icon={Utensils}
            >
              <span>Reserve a Table</span>
            </Button>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-full border border-[#B8894B]/40 bg-[#2A1812] text-[#F5E9D4] hover:text-[#E8A317] hover:border-[#E8A317] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  )
}
