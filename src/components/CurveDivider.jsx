import React from 'react'

/**
 * Reusable animated curved section divider to eliminate straight horizontal edges.
 * @param {'convex'|'concave'|'wave'|'arch'|'scallop'} variant
 * @param {boolean} flip - Flips vertically
 * @param {string} fromColor - CSS color or token (e.g., 'var(--kiln)', 'var(--cream)')
 * @param {string} toColor - Background underneath
 * @param {string} className
 */
export default function CurveDivider({
  variant = 'convex',
  flip = false,
  fromColor = 'var(--kiln)',
  toColor = 'transparent',
  height = 64,
  className = '',
}) {
  const getPath = () => {
    switch (variant) {
      case 'concave':
        return 'M0,0 Q600,100 1200,0 L1200,100 L0,100 Z'
      case 'convex':
        return 'M0,100 Q600,0 1200,100 L1200,100 L0,100 Z'
      case 'wave':
        return 'M0,50 Q300,100 600,50 T1200,50 L1200,100 L0,100 Z'
      case 'arch':
        return 'M0,100 C300,10 900,10 1200,100 L1200,100 L0,100 Z'
      case 'scallop':
        return 'M0,100 Q150,20 300,100 Q450,20 600,100 Q750,20 900,100 Q1050,20 1200,100 L1200,100 L0,100 Z'
      default:
        return 'M0,100 Q600,0 1200,100 L1200,100 L0,100 Z'
    }
  }

  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      style={{
        height: `${height}px`,
        backgroundColor: toColor,
        transform: flip ? 'rotate(180deg)' : 'none',
        marginTop: '-1px',
        marginBottom: '-1px',
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ fill: fromColor }}
      >
        <path d={getPath()} />
      </svg>
    </div>
  )
}
