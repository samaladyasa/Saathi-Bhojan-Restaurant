import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../animations/tokens'

gsap.registerPlugin(ScrollTrigger)

export default function ManifestoScrub() {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const container = containerRef.current
    const words = textRef.current?.querySelectorAll('.scrub-word')
    if (!container || !words || words.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0.18,
          y: 6,
          color: 'rgba(245, 233, 212, 0.25)',
        },
        {
          opacity: 1,
          y: 0,
          color: 'rgba(245, 233, 212, 1)',
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 0.5,
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [])

  const textParagraph =
    '"Saathi" signifies the cherished companion beside you. "Bhojan" is the sacred feast shared in fellowship. Under our glowing terracotta arches, no friend, partner, or family member has to compromise. From sizzling Asian wok noodles and authentic wood-fired sourdough pizzas to royal Lucknowi dum biryanis and crisp southern dosas — every craving finds its honored sanctuary.'

  const words = textParagraph.split(' ')

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto text-center py-6">
      <p
        ref={textRef}
        className="font-display text-2xl sm:text-3xl md:text-4xl text-[#F5E9D4] leading-relaxed select-none"
      >
        {words.map((word, idx) => (
          <React.Fragment key={idx}>
            <span className="scrub-word inline-block opacity-20 transition-all will-change-transform mr-[0.28em]">
              {word === '"Saathi"' ? (
                <span className="italic font-normal text-[#EAD6B4]">{word}</span>
              ) : word === '"Bhojan"' ? (
                <span className="font-normal text-[#E8A317]">{word}</span>
              ) : (
                word
              )}
            </span>
            {/* Inline floating image pill at word 7 */}
            {idx === 7 && (
              <span className="inline-flex items-center align-middle mx-2 w-14 h-7 rounded-full overflow-hidden border border-[#E8A317]/60 shadow-lg transform -translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=300&auto=format&fit=crop"
                  alt="Hearth"
                  className="w-full h-full object-cover scale-125"
                />
              </span>
            )}
            {/* Inline floating image pill at word 22 */}
            {idx === 22 && (
              <span className="inline-flex items-center align-middle mx-2 w-14 h-7 rounded-full overflow-hidden border border-[#C4532B]/80 shadow-lg transform -translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop"
                  alt="Pizza"
                  className="w-full h-full object-cover scale-125"
                />
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
    </div>
  )
}
