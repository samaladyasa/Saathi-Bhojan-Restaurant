import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'

/**
 * Premium Magnetic Button with liquid entry fill and micro-animations.
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'ember', // 'ember' | 'brass'
  className = '',
  icon: Icon = ArrowRight,
  cursorLabel,
  ...props
}) {
  const magneticRef = useMagnetic(0.35, 90)
  const fillRef = useRef(null)

  const handleMouseEnter = (e) => {
    const btn = magneticRef.current
    const fill = fillRef.current
    if (!btn || !fill) return

    const rect = btn.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top

    fill.style.left = `${relX}px`
    fill.style.top = `${relY}px`
  }

  const baseClasses = `group relative inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full font-mono text-xs uppercase tracking-[0.16em] overflow-hidden select-none transition-all duration-300 will-change-transform ${
    variant === 'ember'
      ? 'bg-[#C4532B] text-[#FAF4E9] border border-[#E8A317]/50 shadow-lg shadow-[#C4532B]/25 hover:shadow-xl hover:shadow-[#E8A317]/20'
      : 'bg-transparent text-[#F5E9D4] border border-[#B8894B]/60 hover:border-[#E8A317]'
  } ${className}`

  const content = (
    <>
      {/* Liquid circle fill */}
      <span
        ref={fillRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full transition-all duration-500 ease-out group-hover:w-[350px] group-hover:h-[350px] opacity-25"
        style={{
          backgroundColor: variant === 'ember' ? '#E8A317' : '#B8894B',
        }}
      />

      <span className="relative z-10 flex items-center gap-2 font-medium tracking-widest">
        {children}
        {Icon && (
          <Icon className="w-3.5 h-3.5 text-[#EAD6B4] transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
        )}
      </span>
    </>
  )

  if (to) {
    return (
      <Link
        ref={magneticRef}
        to={to}
        onMouseEnter={handleMouseEnter}
        className={baseClasses}
        data-cursor={cursorLabel || 'Explore'}
        {...props}
      >
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        ref={magneticRef}
        href={href}
        onMouseEnter={handleMouseEnter}
        className={baseClasses}
        data-cursor={cursorLabel || 'Open'}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={magneticRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className={baseClasses}
      data-cursor={cursorLabel || 'Click'}
      {...props}
    >
      {content}
    </button>
  )
}
