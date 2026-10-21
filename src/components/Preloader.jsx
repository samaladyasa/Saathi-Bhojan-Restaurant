import React, { useEffect, useState } from 'react'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Check if previously loaded in this session
    const hasLoaded = sessionStorage.getItem('saathi_preloaded')
    if (hasLoaded) {
      setShouldRender(false)
      onComplete?.()
      return
    }

    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4
      if (current >= 100) {
        current = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => {
          setIsDone(true)
          sessionStorage.setItem('saathi_preloaded', 'true')
          setTimeout(() => {
            setShouldRender(false)
            onComplete?.()
          }, 850)
        }, 300)
      } else {
        setProgress(current)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[10000] flex pointer-events-none transition-opacity duration-700 select-none overflow-hidden ${
        isDone ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Left Heritage Door Panel */}
      <div
        className={`w-1/2 h-full bg-[#1B100C] border-r border-[#B8894B]/30 transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isDone ? '-translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Right Heritage Door Panel */}
      <div
        className={`w-1/2 h-full bg-[#1B100C] border-l border-[#B8894B]/30 transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isDone ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Central Emblem & Percentage */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-auto transition-transform duration-500 ${
          isDone ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Animated Diya Lamp SVG */}
        <div className="relative w-20 h-20 mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#B8894B] fill-none stroke-[2.5]">
            {/* Lamp base */}
            <path
              d="M20,65 Q50,90 80,65 L75,55 Q50,60 25,55 Z"
              className="transition-all duration-700"
              style={{ strokeDasharray: 200, strokeDashoffset: Math.max(0, 200 - progress * 2) }}
            />
            {/* Stand */}
            <path
              d="M50,75 L50,92 M35,92 L65,92"
              style={{ strokeDasharray: 60, strokeDashoffset: Math.max(0, 60 - progress * 0.6) }}
            />
            {/* Sacred Flame */}
            <path
              d="M50,22 Q62,40 50,55 Q38,40 50,22 Z"
              fill={progress > 60 ? '#C4532B' : 'transparent'}
              stroke={progress > 40 ? '#E8A317' : 'transparent'}
              className="animate-pulse"
              style={{
                filter: 'drop-shadow(0 0 12px #E8A317)',
                transition: 'fill 0.5s ease',
              }}
            />
          </svg>
        </div>

        {/* Wordmark with Italic Fraunces + Roman Bhojan */}
        <div className="flex items-center gap-3 text-2xl md:text-3xl tracking-tight text-[#F5E9D4] font-display mb-3">
          <span className="italic text-[#EAD6B4]">Saathi</span>
          <span className="text-[#B8894B] text-sm">◆</span>
          <span className="font-normal">Bhojan</span>
        </div>

        <p className="text-xs uppercase font-mono tracking-[0.25em] text-[#B8894B] mb-8">
          Every Flavour Has A Seat
        </p>

        {/* Counter */}
        <div className="font-mono text-sm tracking-widest text-[#E8A317] flex items-center gap-2">
          <span className="w-8 text-right font-medium">{progress}</span>
          <span className="text-xs opacity-60">%</span>
        </div>
      </div>
    </div>
  )
}
