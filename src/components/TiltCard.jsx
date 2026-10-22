import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../animations/tokens'

/**
 * 3D Gyroscopic Tilt Card with dynamic specular glare sheen.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)

  const handleMouseMove = (e) => {
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      scale: 1.02,
      duration: 0.35,
      ease: 'power2.out',
    })

    if (glare && glareRef.current) {
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(126, 156, 122, 0.22) 0%, transparent 60%)`
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })

    if (glare && glareRef.current) {
      glareRef.current.style.background = 'transparent'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative will-change-transform transform-gpu select-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{ mixBlendMode: 'screen', zIndex: 10 }}
        />
      )}
    </div>
  )
}
