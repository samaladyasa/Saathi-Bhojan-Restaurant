import React from 'react'
import logoImg from '../assets/logo.png'

export default function BrandLogo({
  size = 'default',
  showSubtitle = true,
  className = '',
  onDark = false,
  alt = 'Saathi Bhojan Restaurant',
}) {
  const sizeClasses = {
    compact: 'h-11 w-11 sm:h-12 sm:w-12',
    default: 'h-14 w-14 sm:h-16 sm:w-16',
    large: 'h-20 w-20 sm:h-24 sm:w-24',
  }[size] || 'h-14 w-14 sm:h-16 sm:w-16'

  if (onDark) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <div className="p-1.5 sm:p-2 rounded-2xl bg-[#F6F4EC] border border-[var(--border)]/40 shadow-[0_4px_16px_rgba(0,0,0,0.22)] group-hover:scale-105 group-hover:border-[var(--primary)] transition-all duration-300 inline-flex items-center justify-center shrink-0">
          <img
            src={logoImg}
            alt={alt}
            className={`${sizeClasses} object-contain`}
          />
        </div>
        <span className="sr-only">Saathi Bhojan Restaurant</span>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoImg}
        alt={alt}
        className={`${sizeClasses} object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 shrink-0`}
      />
      <span className="sr-only">Saathi Bhojan Restaurant</span>
    </div>
  )
}
