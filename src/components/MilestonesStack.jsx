import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Flame, Compass, ShieldCheck, Users, ArrowUpRight } from 'lucide-react'
import { prefersReducedMotion } from '../animations/tokens'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    year: '2021',
    title: 'The Founding Promise',
    description:
      'Saathi Bhojan is founded on a singular ideal: whenever family or friends gather, every companion should enjoy their favorite cuisine without compromise.',
    tag: 'THE BEGINNING',
    eraNumber: '01',
    icon: Sparkles,
    highlights: ['Heritage Dining Room', 'Family-First Philosophy', 'Zero-Compromise Table'],
    quote: '"One table where everyone belongs."',
  },
  {
    year: '2022',
    title: 'Acacia Charcoal Tandoor & Royal Dum',
    description:
      'Master kebabiers and Lucknowi ustaads join the kitchen, bringing 20-hour slow-simmered Dal Makhani, bhatti skewers, and dough-sealed Awadhi dum biryanis.',
    tag: 'HEARTH & FLAME',
    eraNumber: '02',
    icon: Flame,
    highlights: ['Acacia Wood Bhatti', '20-Hr Slow Handi Simmer', 'Sealed Clay Dum Handis'],
    quote: '"Slow fire, timeless Mughlai heritage."',
  },
  {
    year: '2023',
    title: 'Neapolitan Wood Ovens & Fierce Wok Hei',
    description:
      'We install custom 450°C stone pizza ovens for 48-hour fermented sourdough pizzas and blazing wok stations for hand-pulled noodles and delicate dim sums.',
    tag: 'GLOBAL HORIZONS',
    eraNumber: '03',
    icon: Compass,
    highlights: ['450°C Stone Pizza Oven', '48-Hour Cold Ferment', 'Fierce Cantonese Wok Hei'],
    quote: '"Artisan craft across continents."',
  },
  {
    year: '2024',
    title: 'Dedicated Dual-Kitchen Separation',
    description:
      'Inaugurating our expansive dining hall with strictly separated pure vegetarian and non-vegetarian kitchen stations, stone-ground southern tiffins, and artisanal dolci.',
    tag: 'EXPANSION & PURITY',
    eraNumber: '04',
    icon: ShieldCheck,
    highlights: ['Dedicated Veg / Non-Veg Line', 'Cast-Iron Ghee Roasts', 'Artisanal Italian Dolci'],
    quote: '"Purity of practice, absolute trust."',
  },
  {
    year: 'Present',
    title: 'Every Flavour Has a Seat',
    description:
      'Hosting thousands of joyful companions every week across intimate booths, celebratory long banquet tables, and courtyard lantern feasts.',
    tag: 'THE LIVING TABLE',
    eraNumber: '05',
    icon: Users,
    highlights: ['500+ Daily Companions', 'Private Celebration Suites', 'Living Culinary Sanctuary'],
    quote: '"Where every appetite is celebrated."',
  },
]

/**
 * MilestonesStack
 * Premium scroll-driven 3D card stacking chronicle.
 * As the user scrolls, each milestone card gracefully slides into view and stacks
 * on top of the previous cards, scaling down previous layers with depth shadows and dimming.
 */
export default function MilestonesStack() {
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const progressLineRef = useRef(null)
  const lampRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const container = containerRef.current
    const cards = cardsRef.current.filter(Boolean)
    if (!container || cards.length === 0) return

    const ctx = gsap.context(() => {
      // 1. Vertical progress bar and traveling lamp tracker
      if (progressLineRef.current && lampRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top center+=100',
              end: 'bottom bottom-=100',
              scrub: 0.3,
            },
          }
        )

        gsap.fromTo(
          lampRef.current,
          { top: '0%' },
          {
            top: '95%',
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top center+=100',
              end: 'bottom bottom-=100',
              scrub: 0.3,
            },
          }
        )
      }

      // 2. Scroll-driven Card Stacking & Depth Scaling
      cards.forEach((card, index) => {
        // As subsequent cards come into view, scale down earlier cards
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1]
          
          gsap.to(card, {
            scale: 0.94 - index * 0.015,
            y: index * 6,
            filter: 'brightness(0.72) blur(0.5px)',
            ease: 'power1.out',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top top+=220',
              end: 'top top+=100',
              scrub: true,
            },
          })
        }

        // Entrance reveal for the card itself
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0.6,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=60',
              end: 'top center+=100',
              scrub: 0.4,
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto mt-14 pb-16">
      {/* Background Subtle Spine Line (Desktop) */}
      <div className="hidden lg:block absolute left-8 top-10 bottom-24 w-[2px] bg-[#B8894B]/20 pointer-events-none">
        {/* Active Golden Scroll Fill */}
        <div
          ref={progressLineRef}
          className="w-full h-full bg-gradient-to-b from-[#E5B869] via-[#E8A317] to-[#F5E9D4] origin-top scale-y-0 shadow-[0_0_12px_rgba(229,184,105,0.7)]"
        />

        {/* Floating Lamp Diya Indicator */}
        <div
          ref={lampRef}
          className="absolute -left-[11px] w-6 h-6 rounded-full bg-[#1B100C] border-2 border-[#E5B869] shadow-[0_0_16px_rgba(232,163,23,0.9)] flex items-center justify-center text-[10px] text-[#E5B869] transition-transform will-change-transform"
        >
          ✦
        </div>
      </div>

      {/* Stacking Cards Container */}
      <div className="space-y-10 sm:space-y-14 lg:pl-20">
        {MILESTONES.map((item, idx) => {
          const IconComponent = item.icon
          // Offset each sticky card so they stack gracefully like a deck of cards
          const stickyTopOffset = 110 + idx * 22

          return (
            <div
              key={item.year}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="sticky transition-all duration-300 will-change-transform transform-gpu"
              style={{
                top: `${stickyTopOffset}px`,
                zIndex: idx + 10,
              }}
            >
              {/* The Masterpiece Stacking Card */}
              <div
                className="relative rounded-3xl p-7 sm:p-10 md:p-12 bg-gradient-to-br from-[#241712]/96 via-[#1D110D]/95 to-[#160D09]/98 border border-[#B8894B]/35 hover:border-[#E5B869]/70 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] transition-all group overflow-hidden"
              >
                {/* Ambient Warm Golden Sheen Corner */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#E5B869]/10 via-[#B8894B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

                {/* Top Subtle Brass Hairline */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#E5B869]/40 to-transparent" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
                  {/* Left Column: Huge Year & Era Medallion */}
                  <div className="flex sm:flex-col items-center sm:items-start gap-4 shrink-0 sm:min-w-[170px]">
                    {/* Big Year Number */}
                    <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#F5E9D4] via-[#E5B869] to-[#C99742] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                      {item.year}
                    </div>

                    {/* Era Medallion Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#170E0B] border border-[#B8894B]/40 text-[#E5B869] text-xs font-mono tracking-wider shadow-inner">
                      <IconComponent className="w-3.5 h-3.5 text-[#E5B869]" />
                      <span>ERA {item.eraNumber}</span>
                    </div>

                    {/* Index Counter */}
                    <div className="hidden sm:block font-mono text-[11px] text-[#B8894B]/60 tracking-[0.2em]">
                      {item.tag}
                    </div>
                  </div>

                  {/* Right Column: Title, Narrative & Highlight Chips */}
                  <div className="flex-1 space-y-4">
                    {/* Mobile Eyebrow Tag */}
                    <span className="sm:hidden font-mono text-xs uppercase tracking-widest text-[#E5B869] block">
                      {item.tag}
                    </span>

                    {/* Headline */}
                    <h3 className="font-display italic text-2xl sm:text-3xl md:text-4xl text-[#F5E9D4] leading-tight group-hover:text-[#FFF4DD] transition-colors">
                      {item.title}
                    </h3>

                    {/* Story Description */}
                    <p className="font-body text-sm sm:text-base text-[#F5E9D4]/80 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>

                    {/* Signature Quote Line */}
                    <p className="font-display italic text-xs sm:text-sm text-[#E5B869]/90 border-l-2 border-[#E5B869]/40 pl-3 pt-0.5">
                      {item.quote}
                    </p>

                    {/* Highlight Chips */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-3">
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-[#19100C]/80 border border-[#B8894B]/30 text-[#F5E9D4]/80 group-hover:border-[#E5B869]/40 transition-colors"
                        >
                          ✦ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Hairline Corner Fasteners */}
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#E5B869]/60 shadow-[0_0_6px_rgba(229,184,105,0.7)]" />
                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#E5B869]/60 shadow-[0_0_6px_rgba(229,184,105,0.7)]" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
