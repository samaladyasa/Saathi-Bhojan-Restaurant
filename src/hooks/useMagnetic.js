import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../animations/tokens'

/**
 * Magnetic physics hook for interactive buttons and badges.
 * Attracts the element toward the cursor within a radius and snaps back with elastic ease.
 */
export function useMagnetic(strength = 0.35, radius = 90) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    // Disable on touch
    if (window.matchMedia('(pointer: coarse)').matches) return

    const setX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const setY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY)

      if (dist < radius) {
        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength
        setX(deltaX)
        setY(deltaY)
      } else {
        setX(0)
        setY(0)
      }
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)',
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, radius])

  return ref
}
