import React, { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../animations/tokens'

/**
 * Floating embers / firefly sparks canvas with cursor repulsion physics
 */
export default function Embers({ count = 32, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = canvas.parentElement.offsetWidth)
    let height = (canvas.height = canvas.parentElement.offsetHeight)

    let mouseX = -1000
    let mouseY = -1000

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.offsetWidth
      height = canvas.height = canvas.parentElement.offsetHeight
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Generate ember particles
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseSpeedY: -(Math.random() * 0.6 + 0.3),
      baseSpeedX: (Math.random() - 0.5) * 0.5,
      vx: 0,
      vy: 0,
      size: Math.random() * 2.2 + 0.8,
      opacity: Math.random() * 0.65 + 0.2,
      fadeRate: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      hue: Math.random() > 0.4 ? 'rgba(126, 156, 122, ' : 'rgba(224, 160, 48, ', // Sage or Saffron
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        // Cursor repulsion force
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.hypot(dx, dy)
        const maxDist = 110

        if (dist < maxDist && dist > 0) {
          const force = (maxDist - dist) / maxDist
          p.vx += (dx / dist) * force * 1.8
          p.vy += (dy / dist) * force * 1.8
        }

        // Apply friction to velocity
        p.vx *= 0.94
        p.vy *= 0.94

        p.x += p.baseSpeedX + p.vx
        p.y += p.baseSpeedY + p.vy
        p.opacity += p.fadeRate

        if (p.opacity > 0.85 || p.opacity < 0.15) {
          p.fadeRate = -p.fadeRate
        }

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
          p.vx = 0
          p.vy = 0
        }
        if (p.x < -10) p.x = width + 5
        if (p.x > width + 10) p.x = -5

        const alpha = Math.max(0, Math.min(1, p.opacity))
        // Subtle outer aura
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `${p.hue}${alpha * 0.25})`
        ctx.fill()

        // Crisp inner spark
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.hue}${alpha})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}
      style={{ opacity: 0.75 }}
      aria-hidden="true"
    />
  )
}
