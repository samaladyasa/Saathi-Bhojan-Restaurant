import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../animations/tokens'
import food1 from '../assets/food.png'
import food2 from '../assets/food2.png'
import food3 from '../assets/food3.png'

const DISHES = [
  { id: 1, src: food1, alt: 'Imperial Awadhi Dum Biryani' },
  { id: 2, src: food2, alt: 'Botanical Garden Harvest Salad' },
  { id: 3, src: food3, alt: 'Smoked Saffron Charcoal Medallions' },
]

/**
 * HeroFood3DCarousel
 * 100% Frameless True 3D Sliding Food Showcase
 * - No card, no arch, no circle lines, no motifs, no text clutter
 * - Automatic, buttery-smooth 3D sliding animation without glitching
 * - Persistent DOM nodes with hardware-accelerated 3D transforms
 * - Completely decoupled idle levitation & gyroscopic mouse tracking
 * - Realistic dynamic ground contact shadow & soft ambient hearth glow
 */
export default function HeroFood3DCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const containerRef = useRef(null)
  const rigRef = useRef(null)
  const shadowRef = useRef(null)
  const glowRef = useRef(null)

  // 1. Automatic Sliding Timer (Smooth 3.8s intervals)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % DISHES.length)
    }, 3800)

    return () => clearInterval(timer)
  }, [])

  // 2. Real-time Gyroscopic 3D Mouse Tilt on Outer Rig
  const handleMouseMove = (e) => {
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    const container = containerRef.current
    const rig = rigRef.current
    if (!container || !rig) return

    const rect = container.getBoundingClientRect()
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    gsap.to(rig, {
      rotateX: -normY * 11,
      rotateY: normX * 13,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    if (shadowRef.current) {
      gsap.to(shadowRef.current, {
        x: -normX * 22,
        y: 16 - normY * 8,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: normX * 16,
        y: normY * 10,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  const handleMouseLeave = () => {
    const rig = rigRef.current
    if (!rig) return

    gsap.to(rig, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.85,
      ease: 'elastic.out(1, 0.5)',
    })

    if (shadowRef.current) {
      gsap.to(shadowRef.current, {
        x: 0,
        y: 16,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }
  }

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % DISHES.length)
  }

  const handleDotClick = (idx) => {
    setCurrentIdx(idx)
  }

  /**
   * Hardware-accelerated 3D slide position for each persistent slide
   * Offset:
   *  0 -> Center active (scaled up, crisp, translateZ forward)
   *  1 -> Next slide (staged off to the right, hidden)
   *  2 -> Previous slide (glided off to the left, hidden)
   */
  const getSlideStyle = (index) => {
    const diff = (index - currentIdx + DISHES.length) % DISHES.length

    if (diff === 0) {
      // ACTIVE CENTER DISH
      return {
        transform: 'translate3d(0px, 0px, 40px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 20,
        pointerEvents: 'auto',
        transition:
          'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.15s cubic-bezier(0.22, 1, 0.36, 1)',
      }
    } else if (diff === 1) {
      // NEXT DISH (Waiting on the right)
      return {
        transform: 'translate3d(105px, 0px, -70px) rotateY(-26deg) scale(0.82)',
        opacity: 0,
        zIndex: 10,
        pointerEvents: 'none',
        transition:
          'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.15s cubic-bezier(0.22, 1, 0.36, 1)',
      }
    } else {
      // PREVIOUS DISH (Exited to the left)
      return {
        transform: 'translate3d(-105px, 0px, -70px) rotateY(26deg) scale(0.82)',
        opacity: 0,
        zIndex: 10,
        pointerEvents: 'none',
        transition:
          'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.15s cubic-bezier(0.22, 1, 0.36, 1)',
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md lg:max-w-lg mx-auto py-4 px-2 flex flex-col items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* 0. Warm Atmospheric Hearth Glow (Pure soft blur, NO circle lines or motifs) */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none transition-all duration-700 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(229, 184, 105, 0.26) 0%, rgba(194, 65, 12, 0.10) 50%, transparent 72%)',
        }}
      />

      {/* 1. Main 3D Floating Rig Stage */}
      <div
        ref={rigRef}
        onClick={handleNext}
        className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] flex items-center justify-center will-change-transform transform-gpu cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
        }}
        title="Click to view next dish"
      >
        {/* Dynamic Ground Contact Shadow Beneath Floating Dish */}
        <div
          ref={shadowRef}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[65%] h-14 bg-black/95 rounded-[100%] blur-2xl pointer-events-none will-change-transform"
        />

        {/* 3 Persistent 3D Food Plates (No re-mounting, zero flicker) */}
        {DISHES.map((dish, i) => (
          <div
            key={dish.id}
            className="absolute inset-0 flex items-center justify-center will-change-transform transform-gpu"
            style={{
              ...getSlideStyle(i),
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Decoupled Organic Idle Levitation Wrapper */}
            <div
              className="w-full h-full flex items-center justify-center will-change-transform"
              style={{
                animation: 'plateIdleLevitate 5.2s ease-in-out infinite',
                animationDelay: `${i * 0.7}s`,
              }}
            >
              <img
                src={dish.src}
                alt={dish.alt}
                className="w-[90%] sm:w-[95%] max-h-[340px] sm:max-h-[400px] md:max-h-[440px] object-contain drop-shadow-[0_28px_38px_rgba(0,0,0,0.92)] select-none"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 2. Sleek Minimalist Pagination Dots (Zero text) */}
      <div className="relative z-30 flex items-center justify-center gap-2.5 pt-4">
        {DISHES.map((d, i) => (
          <button
            key={d.id}
            onClick={(e) => {
              e.stopPropagation()
              handleDotClick(i)
            }}
            className={`rounded-full transition-all duration-500 ${
              currentIdx === i
                ? 'w-7 h-2 bg-[#E5B869] shadow-[0_0_12px_rgba(229,184,105,0.85)]'
                : 'w-2 h-2 bg-[#B8894B]/35 hover:bg-[#E5B869]/60'
            }`}
            aria-label={`Slide to dish ${i + 1}`}
          />
        ))}
      </div>

      {/* Embedded scoped keyframes for decoupled buttery levitation */}
      <style>{`
        @keyframes plateIdleLevitate {
          0%, 100% {
            transform: translateY(-8px) rotate(0.8deg);
          }
          50% {
            transform: translateY(8px) rotate(-0.8deg);
          }
        }
      `}</style>
    </div>
  )
}
