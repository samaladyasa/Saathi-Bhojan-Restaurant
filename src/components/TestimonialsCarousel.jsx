import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import TiltCard from './TiltCard'
import { SITE_CONFIG } from '../data/site'
import { prefersReducedMotion } from '../animations/tokens'

/**
 * TestimonialsCarousel
 * Features:
 * - Automatic sliding every 5 seconds
 * - Pauses automatically on hover or touch so user can read comfortably
 * - Animated sliding transition with directional entry
 * - Interactive dot indicators with active progress filling
 * - Previous/Next manual navigation controls
 * - Star rating display & occasion metadata
 */
export default function TestimonialsCarousel() {
  const testimonials = SITE_CONFIG.testimonials || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('next') // 'next' | 'prev'
  const [isPaused, setIsPaused] = useState(false)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const AUTOPLAY_INTERVAL = 5200 // 5.2 seconds per slide

  // Auto-sliding interval effect
  useEffect(() => {
    if (prefersReducedMotion() || isPaused || testimonials.length <= 1) return

    timerRef.current = setInterval(() => {
      handleNext()
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentIndex, isPaused, testimonials.length])

  const handleNext = () => {
    setDirection('next')
    setAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection('prev')
    setAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleSelect = (idx) => {
    if (idx === currentIndex) return
    setDirection(idx > currentIndex ? 'next' : 'prev')
    setAnimating(true)
    setCurrentIndex(idx)
  }

  const current = testimonials[currentIndex] || {}

  return (
    <div
      className="relative w-full max-w-4xl mx-auto mt-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <TiltCard
        maxTilt={4}
        className="relative p-8 sm:p-12 md:p-14 rounded-3xl bg-[#221612]/92 backdrop-blur-md border border-[#B8894B]/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        {/* Subtle Progress Bar along Top Border (fills during autoplay) */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8894B]/15 overflow-hidden">
          <div
            key={currentIndex + (isPaused ? '-paused' : '-active')}
            className={`h-full bg-gradient-to-r from-[#B8894B] via-[#E5B869] to-[#F5E9D4] transition-all ${
              isPaused ? 'opacity-40' : 'opacity-100'
            }`}
            style={{
              animation: isPaused
                ? 'none'
                : `progressFill ${AUTOPLAY_INTERVAL}ms linear forwards`,
            }}
          />
        </div>

        {/* Ambient Warm Candlelight Glow Inside Card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Large Decorative Amber Quotation Mark */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-5xl sm:text-6xl font-display text-[#E5B869]/70 leading-none select-none">
            “
          </span>

          {/* Star Rating */}
          <div className="flex items-center gap-1 bg-[#18100C]/80 px-3 py-1.5 rounded-full border border-[#B8894B]/30">
            {[...Array(current.rating || 5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-[#E5B869] text-[#E5B869] drop-shadow-[0_0_4px_rgba(229,184,105,0.6)]"
              />
            ))}
          </div>
        </div>

        {/* Dynamic Testimonial Slide Body */}
        <div className="min-h-[160px] sm:min-h-[140px] flex flex-col justify-center">
          <div
            key={currentIndex}
            className={`transition-all duration-500 ease-out ${
              direction === 'next'
                ? 'animate-slide-in-right'
                : 'animate-slide-in-left'
            }`}
          >
            {/* Quote Body */}
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-[#F5E9D4] italic leading-relaxed sm:leading-snug">
              {current.quote}
            </p>

            {/* Author & Role */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-center gap-1 sm:gap-3 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                {current.author}
              </span>
              <span className="hidden sm:inline text-[#B8894B]/50">·</span>
              <span className="font-mono text-xs text-[#F5E9D4]/75">
                {current.role}
              </span>
            </div>

            {/* Occasion */}
            {current.occasion && (
              <div className="font-mono text-[11px] text-[#B8894B] mt-1.5 uppercase tracking-wider text-center">
                Occasion: <span className="text-[#F5E9D4]/80">{current.occasion}</span>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Navigation Controls & Autoplay Indicator */}
        <div className="flex items-center justify-center gap-5 mt-8 pt-4 border-t border-[#B8894B]/15">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full border border-[#B8894B]/40 hover:border-[#E5B869] text-[#F5E9D4] hover:text-[#E5B869] transition-all hover:scale-110 active:scale-95 bg-[#18100C]/90 shadow-md shadow-black/40"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2.5 items-center" role="tablist" aria-label="Review indicators">
            {testimonials.map((_, i) => {
              const isActive = currentIndex === i
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`relative h-2 rounded-full cursor-pointer transition-all duration-400 overflow-hidden ${
                    isActive
                      ? 'bg-[#E5B869] w-8 shadow-[0_0_10px_rgba(229,184,105,0.6)]'
                      : 'bg-[#B8894B]/25 hover:bg-[#B8894B]/60 w-2'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                  role="tab"
                  aria-selected={isActive}
                />
              )
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full border border-[#B8894B]/40 hover:border-[#E5B869] text-[#F5E9D4] hover:text-[#E5B869] transition-all hover:scale-110 active:scale-95 bg-[#18100C]/90 shadow-md shadow-black/40"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </TiltCard>
    </div>
  )
}
