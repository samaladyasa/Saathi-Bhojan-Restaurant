import React, { useEffect, useState } from 'react'
import logoImg from '../assets/logo.png'

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
        className={`w-1/2 h-full bg-[var(--bg)] border-r border-[var(--border)] transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isDone ? '-translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Right Heritage Door Panel */}
      <div
        className={`w-1/2 h-full bg-[var(--bg)] border-l border-[var(--border)] transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isDone ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Central Emblem & Percentage */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-auto transition-transform duration-500 ${
          isDone ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Brand Official Logo */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4">
          <img
            src={logoImg}
            alt="Saathi Bhojan"
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500"
            style={{
              transform: `scale(${0.92 + (progress / 100) * 0.08})`,
            }}
          />
        </div>

        <p className="text-xs uppercase font-mono tracking-[0.25em] text-[var(--text-muted)] mb-8">
          Every Flavour Has A Seat
        </p>

        {/* Counter */}
        <div className="font-mono text-sm tracking-widest text-[var(--accent)] flex items-center gap-2">
          <span className="w-8 text-right font-medium">{progress}</span>
          <span className="text-xs opacity-60">%</span>
        </div>
      </div>
    </div>
  )
}
