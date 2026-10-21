import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Sparkles, Utensils, Flame } from 'lucide-react'
import { prefersReducedMotion } from '../animations/tokens'
import foodImg from '../assets/food.png'

/**
 * HeroArch3D - Masterpiece 3D Gyroscopic Dining Showcase
 * Features:
 * - Transparent high-res food plate (food.png) floating in true 3D space with translateZ
 * - Organic idle levitation & gyroscopic 3D mouse tilt with dynamic drop-shadow
 * - Golden aura rings & ambient backlight behind the plate
 * - Decoupled rotating typographic seal medallion (translateZ 72px)
 * - Floating glassmorphic description plaque (translateZ 42px)
 * - Beveled brass metallic arch frame with corner rivets
 */
export default function HeroArch3D() {
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const foodRef = useRef(null)
  const plaqueRef = useRef(null)
  const badgeRef = useRef(null)
  const textRingRef = useRef(null)
  const glareRef = useRef(null)
  const shadowRef = useRef(null)
  const auraRef = useRef(null)

  const [isHovered, setIsHovered] = useState(false)
  const isHoveredRef = useRef(false)
  const idleCardAnimRef = useRef(null)
  const idleFoodAnimRef = useRef(null)

  // 1. Initialize Continuous Badge Ring Rotation & Organic Idle 3D Floating
  useEffect(() => {
    if (prefersReducedMotion()) return

    // Smooth continuous 360 rotation on circular typography ring
    const ringTween = gsap.to(textRingRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 22,
      ease: 'none',
      transformOrigin: '50% 50%',
    })

    // Organic idle floating animation on the card rig
    const card = cardRef.current
    if (card) {
      idleCardAnimRef.current = gsap.timeline({ repeat: -1, yoyo: true })
        .to(card, {
          y: -8,
          rotateX: 2.5,
          rotateY: -2.5,
          rotateZ: 0.4,
          duration: 3.5,
          ease: 'sine.inOut',
        })
        .to(card, {
          y: 6,
          rotateX: -2,
          rotateY: 2,
          rotateZ: -0.4,
          duration: 3.8,
          ease: 'sine.inOut',
        })
    }

    // Organic independent 3D levitation on the food plate itself
    const food = foodRef.current
    if (food) {
      idleFoodAnimRef.current = gsap.timeline({ repeat: -1, yoyo: true })
        .to(food, {
          y: -10,
          rotateZ: 1.2,
          scale: 1.02,
          duration: 3.0,
          ease: 'sine.inOut',
        })
        .to(food, {
          y: 8,
          rotateZ: -1.2,
          scale: 0.98,
          duration: 3.4,
          ease: 'sine.inOut',
        })
    }

    return () => {
      ringTween.kill()
      if (idleCardAnimRef.current) idleCardAnimRef.current.kill()
      if (idleFoodAnimRef.current) idleFoodAnimRef.current.kill()
    }
  }, [])

  // 2. High-Performance Gyroscopic 3D Mouse Tracking
  const handleMouseMove = (e) => {
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    const container = containerRef.current
    const card = cardRef.current
    if (!container || !card) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Normalized coordinates (-1 to 1)
    const normX = (x - centerX) / centerX
    const normY = (y - centerY) / centerY

    // 3D Rotations (clamped for cinema-grade feel)
    const maxTilt = 13
    const rotX = -normY * maxTilt
    const rotY = normX * maxTilt

    // Pause idle timelines smoothly when user is interacting
    if (idleCardAnimRef.current && idleCardAnimRef.current.isActive()) {
      idleCardAnimRef.current.pause()
    }
    if (idleFoodAnimRef.current && idleFoodAnimRef.current.isActive()) {
      idleFoodAnimRef.current.pause()
    }

    // Animate Card Rig
    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      rotateZ: normX * 1.2,
      scale: 1.025,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    // 3D Parallax & Independent Tilt on Transparent Food Plate (pops forward toward camera)
    if (foodRef.current) {
      gsap.to(foodRef.current, {
        x: normX * 22,
        y: normY * 18,
        rotateX: -normY * 12,
        rotateY: normX * 14,
        rotateZ: normX * 2.5,
        scale: 1.07,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // Floating Plaque Parallax
    if (plaqueRef.current) {
      gsap.to(plaqueRef.current, {
        x: normX * 8,
        y: normY * 6,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // Floating Badge Parallax (highest Z-axis elevation)
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        x: normX * 14,
        y: normY * 12,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // Dynamic Specular Light Glare
    if (glareRef.current) {
      const glarePercentX = (x / rect.width) * 100
      const glarePercentY = (y / rect.height) * 100
      glareRef.current.style.opacity = '1'
      glareRef.current.style.background = `radial-gradient(circle 280px at ${glarePercentX}% ${glarePercentY}%, rgba(245, 233, 212, 0.25) 0%, rgba(229, 184, 105, 0.1) 40%, transparent 70%)`
    }

    // Dynamic Cast Ground Shadow
    if (shadowRef.current) {
      gsap.to(shadowRef.current, {
        x: -normX * 24,
        y: 20 - normY * 12,
        scale: 1 - Math.abs(normY) * 0.1,
        opacity: 0.8,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // Background Aura Glow Shift
    if (auraRef.current) {
      gsap.to(auraRef.current, {
        x: normX * 12,
        y: normY * 10,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    isHoveredRef.current = true
    if (idleCardAnimRef.current) idleCardAnimRef.current.pause()
    if (idleFoodAnimRef.current) idleFoodAnimRef.current.pause()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    isHoveredRef.current = false

    const card = cardRef.current
    if (!card) return

    // Spring return to neutral, then resume natural idle float
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.5)',
      onComplete: () => {
        if (!isHoveredRef.current && idleCardAnimRef.current) {
          idleCardAnimRef.current.restart()
        }
      },
    })

    if (foodRef.current) {
      gsap.to(foodRef.current, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        duration: 0.9,
        ease: 'elastic.out(1, 0.5)',
        onComplete: () => {
          if (!isHoveredRef.current && idleFoodAnimRef.current) {
            idleFoodAnimRef.current.restart()
          }
        },
      })
    }

    if (plaqueRef.current) {
      gsap.to(plaqueRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    if (auraRef.current) {
      gsap.to(auraRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }

    if (shadowRef.current) {
      gsap.to(shadowRef.current, {
        x: 0,
        y: 20,
        scale: 1,
        opacity: 0.5,
        duration: 0.8,
        ease: 'power3.out',
      })
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md mx-auto py-8 px-4 flex justify-center items-center select-none"
      style={{ perspective: 1300 }}
    >
      {/* 0. Ambient Volumetric Glow Behind Rig */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[480px] bg-gradient-to-tr from-amber-600/20 via-[#E5B869]/15 to-transparent rounded-full blur-[90px] pointer-events-none" />

      {/* 0. Dynamic Cast Ground Shadow */}
      <div
        ref={shadowRef}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[75%] h-8 bg-black/85 rounded-[100%] blur-xl pointer-events-none transition-opacity duration-500"
      />

      {/* 1. Main 3D Card Rig */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[390px] sm:max-w-[430px] h-[490px] sm:h-[540px] rounded-t-[180px] rounded-b-[24px] will-change-transform transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(184, 137, 75, 0.35)',
        }}
      >
        {/* Layer A: Double Metallic Brass Bevel Rim */}
        <div
          className="absolute -inset-[3px] rounded-t-[183px] rounded-b-[27px] pointer-events-none z-30"
          style={{
            background: 'linear-gradient(145deg, #F5E9D4 0%, #E5B869 25%, #8A5A2B 50%, #E5B869 75%, #F5E9D4 100%)',
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Inner Hairline Gold Trim */}
        <div className="absolute inset-2 rounded-t-[172px] rounded-b-[18px] border border-[#E5B869]/25 pointer-events-none z-20" />

        {/* Layer B: The Arch Architectural Sanctum Backdrop */}
        <div className="relative w-full h-full rounded-t-[180px] rounded-b-[24px] overflow-hidden bg-gradient-to-b from-[#1E130E] via-[#160D09] to-[#0F0705]">
          
          {/* Concentric Golden Aura Rings Behind Dish */}
          <div
            ref={auraRef}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
          >
            <div className="absolute inset-0 rounded-full border border-[#E5B869]/15 animate-pulse" />
            <div className="absolute inset-6 rounded-full border border-dashed border-[#E5B869]/20" />
            <div className="absolute inset-12 rounded-full border border-[#E5B869]/10" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-amber-600/25 via-[#E5B869]/20 to-transparent blur-2xl" />
          </div>

          {/* Architectural Ray Highlights */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E5B869]/15 via-transparent to-transparent pointer-events-none" />

          {/* Dynamic Specular Glass Glare Overlay */}
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-10"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Micro Corner Rivets / Brass Fasteners (Bottom Corners) */}
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#E5B869] shadow-[0_0_6px_rgba(229,184,105,0.8)] z-20" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#E5B869] shadow-[0_0_6px_rgba(229,184,105,0.8)] z-20" />
        </div>

        {/* Layer C: TRANSPARENT 3D ANIMATED FOOD DISH (food.png) */}
        <div
          ref={foodRef}
          className="absolute top-8 sm:top-12 left-0 right-0 z-35 flex items-center justify-center pointer-events-none will-change-transform transform-gpu"
          style={{
            transform: 'translateZ(55px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Dynamic Soft Under-Dish Drop Shadow */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[65%] h-12 bg-black/85 rounded-full blur-xl pointer-events-none" />

          {/* The High-Resolution Food Dish */}
          <img
            src={foodImg}
            alt="Saathi Bhojan Signature Multi-Cuisine Bowl"
            className="w-[88%] sm:w-[94%] max-w-[360px] object-contain drop-shadow-[0_22px_30px_rgba(0,0,0,0.9)] filter select-none pointer-events-none"
            loading="eager"
          />
        </div>

        {/* Layer D: Floating Glassmorphism Information Plaque */}
        <div
          ref={plaqueRef}
          className="absolute bottom-5 left-5 right-5 z-40 rounded-2xl p-4 sm:p-5 bg-[#140D0B]/90 backdrop-blur-md border border-[#E5B869]/35 shadow-[0_20px_35px_-8px_rgba(0,0,0,0.9)] will-change-transform"
          style={{
            transform: 'translateZ(42px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Eyebrow with gold star */}
          <div className="flex items-center justify-between pb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B869] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#E5B869] font-semibold">
                The Grand Companion Table
              </span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-[#E5B869]/70" />
          </div>

          {/* Serif Title */}
          <p className="font-display italic text-lg sm:text-xl text-[#F5E9D4] leading-snug">
            Where international culinary crafts share one festive table
          </p>

          {/* Subtext Cuisine Badges */}
          <div className="flex items-center gap-3 pt-2.5 mt-2 border-t border-[#B8894B]/20 font-mono text-[9px] uppercase tracking-wider text-[#F5E9D4]/60">
            <span className="flex items-center gap-1 text-[#E5B869]">
              <Flame className="w-2.5 h-2.5 text-amber-500" />
              Live Hearth
            </span>
            <span>·</span>
            <span>All Palates Welcome</span>
            <span>·</span>
            <span>Estd 2021</span>
          </div>
        </div>

        {/* Layer E: Masterpiece 3D Circular Medallion Seal (Elevated on Z-Axis) */}
        <div
          ref={badgeRef}
          className="absolute -top-6 -right-5 sm:-right-8 z-50 w-28 h-28 sm:w-34 sm:h-34 rounded-full will-change-transform"
          style={{
            transform: 'translateZ(72px)',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.75))',
          }}
        >
          {/* Outer Multi-layered Medallion Dish */}
          <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-[#E5B869] via-[#8A5A2B] to-[#E5B869] shadow-2xl flex items-center justify-center">
            {/* Dark Obsidian Inset Cavity */}
            <div className="relative w-full h-full rounded-full bg-[#150D0A] border border-[#E5B869]/40 flex items-center justify-center overflow-hidden">
              
              {/* Concentric etched metallic track lines */}
              <div className="absolute inset-1.5 rounded-full border border-[#E5B869]/20 pointer-events-none" />
              <div className="absolute inset-3 rounded-full border border-dashed border-[#E5B869]/30 pointer-events-none" />

              {/* ROTATING TYPOGRAPHIC SEAL RING (SVG) */}
              <div
                ref={textRingRef}
                className="absolute inset-0 w-full h-full will-change-transform pointer-events-none"
                style={{ transformOrigin: '50% 50%' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <defs>
                    <path
                      id="heroArchSealPath"
                      d="M 50, 50 m -36.5, 0 a 36.5,36.5 0 1,1 73,0 a 36.5,36.5 0 1,1 -73,0"
                      fill="none"
                    />
                  </defs>
                  <text className="font-mono text-[8.2px] uppercase font-bold tracking-[0.24em] fill-[#E5B869]">
                    <textPath
                      href="#heroArchSealPath"
                      startOffset="0%"
                      textLength="229"
                      lengthAdjust="spacing"
                    >
                      ✦ EVERY FLAVOUR HAS A SEAT ✦ SAATHI BHOJAN
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* CENTER CORE: Royal Gold Crest (Stays Perfectly Stable & Upright) */}
              <div
                className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-b from-[#2A1A14] to-[#120B08] border border-[#E5B869]/60 shadow-[inset_0_2px_4px_rgba(229,184,105,0.3)] flex flex-col items-center justify-center text-center group"
                style={{
                  transform: 'translateZ(18px)',
                }}
              >
                <Utensils className="w-3.5 h-3.5 text-[#E5B869] mb-0.5 drop-shadow-[0_0_4px_rgba(229,184,105,0.8)]" />
                <span className="font-mono text-[7px] font-bold text-[#F5E9D4] tracking-widest">
                  SB
                </span>
                <span className="absolute -bottom-0.5 text-[6px] text-[#E5B869]">✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
