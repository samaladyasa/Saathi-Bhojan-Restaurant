import React from 'react'

/**
 * Fixed film-grain noise overlay using SVG feTurbulence at 4-6% opacity
 */
export default function GrainOverlay() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="saathi-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#saathi-grain)" />
      </svg>
    </div>
  )
}
