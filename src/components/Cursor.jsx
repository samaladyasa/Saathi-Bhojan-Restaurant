import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring) return

    // GSAP quickTo for ultra-fluid lag
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' })
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' })
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })
    const setGlowX = glow ? gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power2.out' }) : null
    const setGlowY = glow ? gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power2.out' }) : null

    const onMouseMove = (e) => {
      setDotX(e.clientX)
      setDotY(e.clientY)
      setRingX(e.clientX)
      setRingY(e.clientY)
      if (setGlowX && setGlowY) {
        setGlowX(e.clientX)
        setGlowY(e.clientY)
      }
    }

    // Detect hover targets with data-cursor attributes
    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        const text = target.getAttribute('data-cursor')
        setCursorText(text || '')
        setIsHovered(true)
      } else if (e.target.closest('a, button, [role="button"]')) {
        setCursorText('')
        setIsHovered(true)
      } else {
        setCursorText('')
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Candlelit Flame Glow Aura */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[240px] h-[240px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[990] transition-opacity duration-300 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(232, 163, 23, 0.12) 0%, rgba(196, 83, 43, 0.04) 40%, transparent 70%)',
          opacity: 0.8,
        }}
        aria-hidden="true"
      />

      {/* Central Gold Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#E8A317] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] transition-opacity duration-200"
        style={{
          boxShadow: '0 0 10px rgba(232, 163, 23, 0.85)',
          opacity: isHovered && cursorText ? 0 : 1,
        }}
      />

      {/* Lagging Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9998] flex items-center justify-center transition-all duration-300"
        style={{
          width: isHovered ? (cursorText ? '84px' : '48px') : '32px',
          height: isHovered ? (cursorText ? '84px' : '48px') : '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(232, 163, 23, 0.75)',
          backgroundColor: cursorText ? 'rgba(42, 24, 18, 0.88)' : 'rgba(232, 163, 23, 0.08)',
          backdropFilter: cursorText ? 'blur(6px)' : 'none',
        }}
      >
        {cursorText && (
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#E8A317] font-medium px-2 text-center select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  )
}
