import React, { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Lightbox from '../components/Lightbox'
import TiltCard from '../components/TiltCard'
import { GALLERY_CATEGORIES, GALLERY_IMAGES } from '../data/gallery'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredImages =
    activeCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#1B100C] text-[#F5E9D4] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHeading
          eyebrow="Visual Chronicles"
          titlePart1="Moments Around"
          italicPart="The Shared Table"
          titlePart2=""
          subtitle="A glimpse into twilight dining, artisan stone hearths, and shared multi-cuisine feasts."
          watermark="MOMENTS"
        />

        {/* 1. Category Filter Tabs */}
        <div className="flex justify-center items-center gap-3 overflow-x-auto my-10 pb-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 select-none whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#E8A317] text-[#1B100C] font-bold shadow-lg'
                  : 'bg-[#2A1812] text-[#F5E9D4]/70 hover:text-[#F5E9D4] border border-[#B8894B]/30'
              }`}
              data-cursor="Filter"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2. Masonry Gallery Grid with 3D Tilt Cards */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image, idx) => (
            <TiltCard
              key={image.id}
              maxTilt={6}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-[#B8894B]/25 hover:border-[#E8A317] cursor-pointer bg-[#2A1812] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#E8A317]/10"
              data-cursor="Expand"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-106"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B100C]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E8A317] mb-1">
                  {image.category}
                </span>
                <h4 className="font-display text-xl text-[#F5E9D4]">
                  {image.title}
                </h4>
                <p className="font-body text-xs text-[#F5E9D4]/75 mt-1 line-clamp-2">
                  {image.caption}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* 3. Circular Tasting Plate Snapshots */}
        <div className="mt-20 py-10 border-y border-[#B8894B]/20 overflow-hidden">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#E5B869] text-center mb-8">
            ✦ SNAPSHOTS FROM THE KITCHEN HEARTH ✦
          </div>
          <div className="flex items-center justify-start md:justify-center gap-6 sm:gap-8 overflow-x-auto pb-4 px-4 scrollbar-none">
            {GALLERY_IMAGES.slice(0, 5).map((img) => (
              <div
                key={`strip-${img.id}`}
                onClick={() => {
                  const foundIdx = filteredImages.findIndex((f) => f.id === img.id)
                  setLightboxIndex(foundIdx !== -1 ? foundIdx : 0)
                }}
                className="group relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 shrink-0 rounded-full p-1.5 bg-gradient-to-br from-[#E5B869]/60 via-[#8A5A2B]/40 to-[#E5B869]/60 hover:from-[#E5B869] hover:to-[#F5E9D4] shadow-xl hover:shadow-[0_0_25px_rgba(229,184,105,0.45)] transition-all duration-500 hover:scale-105 cursor-pointer"
                data-cursor="View"
              >
                {/* Inner circular image container */}
                <div className="w-full h-full rounded-full overflow-hidden border border-[#1B100C] bg-[#18100C] relative">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover rounded-full group-hover:scale-115 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle darkening vignette */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Hover title preview badge */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-[2px] rounded-full text-center">
                    <span className="font-display italic text-xs sm:text-sm text-[#F5E9D4] leading-tight drop-shadow-md">
                      {img.title}
                    </span>
                  </div>
                </div>

                {/* Outer concentric golden ring accent */}
                <div className="absolute -inset-1 rounded-full border border-[#E5B869]/25 group-hover:border-[#E5B869]/50 transition-colors pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev === 0 ? filteredImages.length - 1 : prev - 1
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev === filteredImages.length - 1 ? 0 : prev + 1
          )
        }
      />
    </div>
  )
}
