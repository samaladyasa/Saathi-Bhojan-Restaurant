import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Flame, ShieldCheck, Check } from 'lucide-react'
import TiltCard from './TiltCard'
import SectionHeading from './SectionHeading'
import { prefersReducedMotion } from '../animations/tokens'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    number: '01',
    roman: 'I',
    title: 'Artisanal Ingredients',
    subtitle: 'Uncompromising Provenance',
    description:
      'Authentic San Marzano tomatoes, fresh Italian burrata, aged Himalayan basmati rice, single-origin hand-ground spices, and cold-pressed oils chosen without shortcuts.',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    tag: 'ORIGIN VERIFIED',
    icon: Sparkles,
    accentColor: '#8E2418',
    chips: ['San Marzano D.O.P.', 'Aged Basmati Rice', 'Cold-Pressed Oils'],
  },
  {
    number: '02',
    roman: 'II',
    title: 'Living Hearths & Live Fire',
    subtitle: 'Elemental Authenticity',
    description:
      'Every preparation uses its authentic heat source — 450°C stone wood-fired ovens, raging wok fires, slow clay handis, and acacia wood charcoal bhatti tandoors.',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    tag: 'ELEMENTAL HEARTH',
    icon: Flame,
    accentColor: '#B45309',
    chips: ['Acacia Wood Bhatti', '450°C Stone Oven', 'Cantonese Wok Hei'],
  },
  {
    number: '03',
    roman: 'III',
    title: 'Strict Kitchen Integrity',
    subtitle: 'Sacred Dietary Trust',
    description:
      'Completely independent kitchen stations, separated cookware, and dedicated preparation tables for Pure Vegetarian and Jain dining to honor your family’s dietary choices.',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
    tag: 'DUAL SEPARATION',
    icon: ShieldCheck,
    accentColor: '#047857',
    chips: ['Dedicated Pure Veg Line', 'Jain Cookware Stations', 'Zero Cross-Contact'],
  },
]

/**
 * QualityCovenant - Masterpiece Culinary Standards Showcase
 * Features:
 * - Staggered 3D entrance reveal on scroll via GSAP ScrollTrigger
 * - Arched photographic windows with parallax zoom
 * - 3D Gyroscopic tilt with specular light reflection
 * - Handcrafted brass & ivory editorial luxury styling
 * - Distinct culinary station highlight chips
 */
export default function QualityCovenant() {
  const sectionRef = useRef(null)
  const cardsContainerRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const cards = cardsContainerRef.current?.querySelectorAll('.covenant-card')
    if (!cards || cards.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 70,
          rotateX: 14,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top bottom-=80',
            end: 'top center+=80',
            scrub: false,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 sm:px-10 bg-[#F5E9D4] text-[#1B100C] relative overflow-hidden"
    >
      {/* Background Subtle Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-display font-bold text-[#B8894B]/[0.07] uppercase tracking-[0.2em] pointer-events-none select-none">
        INTEGRITY
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="The Quality Covenant"
          titlePart1="Honoring The Craft"
          italicPart="Behind Every Plate"
          titlePart2=""
          subtitle="True multi-cuisine dining requires uncompromising dedication to ingredients, traditional techniques, and separated dietary preparation."
          theme="light"
          watermark="CRAFT"
        />

        {/* 3 Cards Grid with 3D Tilt & Image Arches */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mt-16 items-stretch"
          style={{ perspective: 1200 }}
        >
          {PILLARS.map((pillar) => {
            const IconComponent = pillar.icon

            return (
              <TiltCard
                key={pillar.number}
                maxTilt={6}
                className="covenant-card group relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 bg-[#FAF4EA] border border-[#B8894B]/35 hover:border-[#8E2418] shadow-[0_15px_35px_rgba(27,16,12,0.08)] hover:shadow-[0_25px_60px_rgba(142,36,24,0.18)] transition-all duration-500 overflow-hidden"
              >
                {/* Top Subtle Metallic Brass Hairline */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#E5B869] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Header Row: Medallion Number Badge & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    {/* Number Badge with Roman Numeral */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-11 h-11 rounded-full bg-[#1B100C] text-[#E5B869] flex items-center justify-center font-mono font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-300 border border-[#E5B869]/40">
                        {pillar.number}
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#B8894B] font-semibold">
                        PILLAR {pillar.roman}
                      </span>
                    </div>

                    {/* Verified Tag Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAD6B4]/60 border border-[#B8894B]/30 text-[10px] font-mono tracking-wider text-[#1B100C] font-semibold">
                      <IconComponent className="w-3 h-3 text-[#8E2418]" />
                      <span>{pillar.tag}</span>
                    </div>
                  </div>

                  {/* Arched Architectural Photographic Window */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-6 border border-[#B8894B]/30 bg-[#1B100C] shadow-inner">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-112 brightness-[0.96] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Corner Rivet Details */}
                    <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#FAF4EA] shadow-sm" />
                    <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#FAF4EA] shadow-sm" />
                  </div>

                  {/* Subtitle Eyebrow */}
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#8E2418] font-bold block mb-1.5">
                    {pillar.subtitle}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-[26px] text-[#1B100C] leading-snug group-hover:text-[#8E2418] transition-colors mb-3">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-[#1B100C]/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Highlight Chips Along Bottom */}
                <div className="pt-6 mt-6 border-t border-[#B8894B]/20">
                  <div className="flex flex-wrap gap-2">
                    {pillar.chips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#EFE4D2] text-[#1B100C]/85 border border-[#B8894B]/25 group-hover:border-[#8E2418]/30 transition-colors"
                      >
                        <Check className="w-2.5 h-2.5 text-[#8E2418]" />
                        <span>{chip}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
