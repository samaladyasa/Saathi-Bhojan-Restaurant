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
          } text-[var(--primary)]`}
          style={{ opacity: 0.05 }}
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
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--primary-dark)] font-semibold">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Main Heading with Fraunces Roman & Italic */}
      <h2
        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-4 text-[var(--primary-dark)]"
      >
        {titlePart1 && <span>{titlePart1} </span>}
        {italicPart && (
          <span className="italic font-normal text-[var(--primary)]">
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
          } text-[var(--text-muted)]`}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative Hairline Divider */}
      <div
        className={`mt-5 ${
          isCenter ? 'mx-auto' : ''
        } w-16 h-[1.5px] bg-[var(--primary)]/40 rounded-full`}
      />
    </div>
  )
}
