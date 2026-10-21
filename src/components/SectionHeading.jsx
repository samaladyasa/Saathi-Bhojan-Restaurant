import React from 'react'

export default function SectionHeading({
  eyebrow,
  titlePart1,
  italicPart,
  titlePart2,
  subtitle,
  watermark = 'FEAST',
  align = 'center',
  theme = 'dark', // 'dark' | 'light'
  className = '',
}) {
  const isCenter = align === 'center'
  const isDark = theme === 'dark'

  return (
    <div
      className={`relative py-6 sm:py-8 ${
        isCenter ? 'text-center mx-auto' : 'text-left'
      } ${className}`}
    >
      {/* English / Latin Watermark */}
      {watermark && (
        <span
          className={`watermark-text text-[14vw] sm:text-[10vw] -top-6 ${
            isCenter
              ? 'left-1/2 -translate-x-1/2'
              : 'left-0'
          } ${isDark ? 'text-[#B8894B]' : 'text-[#8E2418]'}`}
          style={{ opacity: isDark ? 0.05 : 0.06 }}
        >
          {watermark}
        </span>
      )}

      {/* Eyebrow in DM Mono */}
      {eyebrow && (
        <div
          className={`flex items-center gap-2 mb-3.5 ${
            isCenter ? 'justify-center' : 'justify-start'
          }`}
        >
          <span className="text-[#E8A317] text-xs">◆</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B8894B]">
            {eyebrow}
          </span>
          <span className="text-[#E8A317] text-xs">◆</span>
        </div>
      )}

      {/* Main Heading with Fraunces Roman & Italic */}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-4 ${
          isDark ? 'text-[#F5E9D4]' : 'text-[#1B100C]'
        }`}
      >
        {titlePart1 && <span>{titlePart1} </span>}
        {italicPart && (
          <span className={`italic font-normal ${isDark ? 'text-[#EAD6B4]' : 'text-[#C4532B]'}`}>
            {italicPart}
          </span>
        )}
        {titlePart2 && <span> {titlePart2}</span>}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`max-w-2xl text-base sm:text-lg font-body leading-relaxed ${
            isCenter ? 'mx-auto' : ''
          } ${isDark ? 'text-[#F5E9D4]/70' : 'text-[#1B100C]/75'}`}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative Brass Hairline with Diamond */}
      <div
        className={`flex items-center gap-3 mt-5 ${
          isCenter ? 'justify-center max-w-xs mx-auto' : 'max-w-xs'
        }`}
      >
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#B8894B]/40" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#E8A317]" />
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#B8894B]/40" />
      </div>
    </div>
  )
}
