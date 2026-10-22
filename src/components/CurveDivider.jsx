import React from 'react'

/**
 * Reusable animated curved section divider to eliminate straight horizontal edges.
 * @param {'convex'|'concave'|'wave'|'arch'|'scallop'} variant
 * @param {boolean} flip - Flips vertically (scaleY)
 * @param {boolean} mirror - Flips horizontally (scaleX)
 * @param {string} fromColor - CSS color or token (fills the curve, usually next section's bg)
 * @param {string} toColor - Background underneath the curve (usually previous section's bg)
 * @param {number|string} height - Height of the divider in px (default 96)
 * @param {string} className
 */
export default function CurveDivider({
  variant = 'wave',
  flip = false,
  mirror = false,
  fromColor = 'var(--bg-alt)',
  toColor = 'transparent',
  height = 96,
  strokeColor = '',
  strokeWidth = 1.5,
  strokeOpacity = 0.4,
  className = '',
}) {
  const getPath = () => {
    switch (variant) {
      case 'wave':
        // Smooth, organic undulating wave with generous curves
        return 'M0,38 C280,108 440,8 720,58 C1000,108 1160,18 1440,48 L1440,121 L0,121 Z'
      case 'convex':
      case 'curve':
        // Deep, luxurious architectural curve scoop
        return 'M0,0 C380,105 1060,105 1440,0 L1440,121 L0,121 Z'
      case 'concave':
      case 'arch':
        // Arched dome rising upward
        return 'M0,120 C360,12 1080,12 1440,120 L1440,121 L0,121 Z'
      case 'scallop':
        // Rhythmic royal canopy scalloped wave
        return 'M0,121 L0,100 Q120,20 240,100 Q360,20 480,100 Q600,20 720,100 Q840,20 960,100 Q1080,20 1200,100 Q1320,20 1440,100 L1440,121 Z'
      default:
        return 'M0,38 C280,108 440,8 720,58 C1000,108 1160,18 1440,48 L1440,121 L0,121 Z'
    }
  }

  const getStrokePath = () => {
    switch (variant) {
      case 'wave':
        return 'M0,38 C280,108 440,8 720,58 C1000,108 1160,18 1440,48'
      case 'convex':
      case 'curve':
        return 'M0,0 C380,105 1060,105 1440,0'
      case 'concave':
      case 'arch':
        return 'M0,120 C360,12 1080,12 1440,120'
      case 'scallop':
        return 'M0,100 Q120,20 240,100 Q360,20 480,100 Q600,20 720,100 Q840,20 960,100 Q1080,20 1200,100 Q1320,20 1440,100'
      default:
        return 'M0,38 C280,108 440,8 720,58 C1000,108 1160,18 1440,48'
    }
  }

  const computedHeight = typeof height === 'number' ? `${height}px` : height
  const transform = [
    flip ? 'scaleY(-1)' : '',
    mirror ? 'scaleX(-1)' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      style={{
        height: computedHeight,
        backgroundColor: toColor,
        marginTop: '-1px',
        marginBottom: '-1px',
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{
          fill: fromColor,
          transform: transform || undefined,
          transformOrigin: 'center center',
        }}
      >
        <path d={getPath()} />
        {strokeColor && (
          <path
            d={getStrokePath()}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  )
}
