import React from 'react'

export default function BrandLogo({ size = 'default', showSubtitle = true, className = '' }) {
  const isLarge = size === 'large'
  const isCompact = size === 'compact'

  const crestSize = isLarge ? 'w-12 h-12' : isCompact ? 'w-8 h-8' : 'w-10 h-10'
  const iconSize = isLarge ? 'w-7 h-7' : isCompact ? 'w-4 h-4' : 'w-5 h-5'
  const titleSize = isLarge ? 'text-3xl' : isCompact ? 'text-lg' : 'text-xl sm:text-[22px]'
  const subSize = isLarge ? 'text-[10px]' : 'text-[8px] sm:text-[8.5px]'

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Bespoke Heraldic Royal Hearth Medallion */}
      <div
        className={`${crestSize} rounded-full border border-[#B8894B]/55 bg-gradient-to-b from-[#261812] via-[#1A100C] to-[#120B08] flex items-center justify-center group-hover:border-[#E5B869] group-hover:shadow-[0_0_16px_rgba(229,184,105,0.35)] transition-all duration-300 shrink-0 shadow-lg shadow-black/60`}
      >
        <svg
          viewBox="0 0 32 32"
          className={`${iconSize} text-[#E5B869] fill-none transition-transform duration-300 group-hover:scale-110`}
        >
          {/* Beaded coin-edge inner hairline ring */}
          <circle
            cx="16"
            cy="16"
            r="13.5"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="1.5 2.5"
            opacity="0.5"
          />

          {/* Exterior Sacred Flame Petal */}
          <path
            d="M16 6.5 C13.5 10.5 10.5 13 10.5 16.8 C10.5 20.2 12.9 22.8 16 22.8 C19.1 22.8 21.5 20.2 21.5 16.8 C21.5 13 18.5 10.5 16 6.5 Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1.2"
          />

          {/* Inner Golden Ember Core */}
          <path
            d="M16 11.5 C14.8 13.8 13.5 15.2 13.5 17.2 C13.5 18.8 14.6 20 16 20 C17.4 20 18.5 18.8 18.5 17.2 C18.5 15.2 17.2 13.8 16 11.5 Z"
            fill="currentColor"
          />

          {/* Grand Dining Hearth Arch Pedestal */}
          <path
            d="M8.5 25.5 C12 23.5 20 23.5 23.5 25.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Micro Compass Stars */}
          <circle cx="16" cy="2.5" r="0.8" fill="currentColor" opacity="0.8" />
          <circle cx="16" cy="29.5" r="0.8" fill="currentColor" opacity="0.8" />
        </svg>
      </div>

      {/* Brand Typography Lockup */}
      <div className="flex flex-col text-left">
        <div className={`font-display tracking-tight flex items-baseline gap-1.5 ${titleSize} leading-none`}>
          <span className="italic font-normal text-[#E5B869] group-hover:text-[#FBF5EC] transition-colors">
            Saathi
          </span>
          <span className="font-normal text-[#F5E9D4] tracking-normal">
            Bhojan
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-mono ${subSize} uppercase tracking-[0.28em] text-[#B8894B] mt-1 font-medium group-hover:text-[#E5B869] transition-colors`}
          >
            Multi-Cuisine · Est. 2021
          </span>
        )}
      </div>
    </div>
  )
}
