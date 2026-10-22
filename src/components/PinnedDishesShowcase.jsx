import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from './TiltCard'
import { prefersReducedMotion } from '../animations/tokens'

gsap.registerPlugin(ScrollTrigger)

// Subtle vertical wave rhythm for cards sharing the exact heritage arch shape
const CARD_OFFSETS = [
  'translate-y-0',
  'translate-y-4',
  '-translate-y-3',
  'translate-y-5',
  '-translate-y-2',
  'translate-y-4',
  '-translate-y-3',
  'translate-y-2',
]

export default function PinnedDishesShowcase({ dishes, onSelectDish }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    // Tablet, laptop, and desktop screens (>= 640px)
    mm.add('(min-width: 640px)', () => {
      // Calculate exact travel so the last card stops cleanly at the right edge of the screen
      const getScrollAmount = () => {
        const cardEls = track.querySelectorAll('.dish-card-wrapper')
        if (!cardEls.length) return 0
        const lastCard = cardEls[cardEls.length - 1]
        const totalContentWidth = lastCard.offsetLeft + lastCard.offsetWidth
        const padding = window.innerWidth >= 640 ? 48 : 24
        // Stop exactly when the right edge of the last card reaches (window.innerWidth - padding)
        const travel = totalContentWidth - window.innerWidth + padding
        return -Math.max(0, travel)
      }

      const getScrollDistance = () => {
        const cardEls = track.querySelectorAll('.dish-card-wrapper')
        if (!cardEls.length) return 600
        const lastCard = cardEls[cardEls.length - 1]
        const totalContentWidth = lastCard.offsetLeft + lastCard.offsetWidth
        return Math.max(totalContentWidth - window.innerWidth + 80, 500)
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })

      // 1. Move the cards rail horizontally, stopping precisely when the last picture aligns
      tl.to(
        track,
        {
          x: getScrollAmount,
          ease: 'none',
        },
        0
      )

      // 2. Parallax: Move the dishes WITHIN the arch cards
      // The wrapper is 140% width with 20% bleed on each side.
      // An xPercent shift of 10% leaves a 10% safety margin at all times, making gaps physically impossible!
      const innerWrappers = track.querySelectorAll('.inner-parallax-wrapper')
      tl.fromTo(
        innerWrappers,
        { xPercent: 10 },
        { xPercent: -10, ease: 'none' },
        0
      )

      // 3. Staggered vertical floating wave on alternate cards
      const oddCards = track.querySelectorAll('.dish-card-odd')
      const evenCards = track.querySelectorAll('.dish-card-even')
      tl.fromTo(oddCards, { y: 12 }, { y: -12, ease: 'none' }, 0)
      tl.fromTo(evenCards, { y: -12 }, { y: 12, ease: 'none' }, 0)
    })

    // Mobile screens (< 640px): inner parallax scrub as user scrolls
    mm.add('(max-width: 639px)', () => {
      const innerWrappers = track.querySelectorAll('.inner-parallax-wrapper')
      gsap.fromTo(
        innerWrappers,
        { xPercent: 6 },
        {
          xPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: true,
          },
        }
      )
    })

    // Refresh ScrollTrigger after layout and images mount
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250)

    return () => {
      clearTimeout(timeout)
      mm.revert()
    }
  }, [dishes])

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-screen flex flex-col justify-center py-16 bg-[var(--bg-alt)] text-[var(--text)]"
    >
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-medium">
              Signature Showcase
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-[var(--primary-dark)] tracking-tight">
            Crafted for <span className="italic font-normal text-[var(--primary)]">The Companion</span> Table
          </h2>
        </div>
      </div>

      {/* Horizontal Rail Track */}
      <div className="w-full overflow-x-auto sm:overflow-hidden no-scrollbar pb-6 sm:pb-0 px-6 sm:px-12 relative z-10">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-9 w-max will-change-transform py-6 pr-6 sm:pr-12"
        >
          {dishes.map((dish, idx) => {
            const isOdd = idx % 2 !== 0
            const offsetClass = CARD_OFFSETS[idx % CARD_OFFSETS.length]

            return (
              <div
                key={dish.id}
                className={`dish-card-wrapper ${isOdd ? 'dish-card-odd' : 'dish-card-even'} ${offsetClass} transition-transform duration-300 shrink-0`}
              >
                <TiltCard
                  maxTilt={5}
                  onClick={() => onSelectDish(dish)}
                  className="group relative w-[215px] sm:w-[245px] lg:w-[265px] h-[340px] sm:h-[385px] lg:h-[405px] rounded-t-[140px] rounded-b-[44px] overflow-hidden border-2 border-[var(--border)] hover:border-[var(--primary)] shadow-xl shadow-[var(--footer)]/10 hover:shadow-2xl hover:shadow-[var(--footer)]/20 transition-all duration-500 cursor-pointer bg-[var(--surface)]"
                  data-cursor={dish.name}
                >
                  {/* Inner Parallax Dish Image - Oversized with 20% bleed buffer on all sides */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-t-[140px] rounded-b-[44px]">
                    <div className="inner-parallax-wrapper absolute -left-[20%] -right-[20%] top-0 bottom-0 w-[140%] h-full will-change-transform">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Inner Highlight Rim */}
                  <div className="absolute inset-0 rounded-t-[140px] rounded-b-[44px] border border-transparent group-hover:border-[var(--primary)]/70 transition-colors duration-500 pointer-events-none" />
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
