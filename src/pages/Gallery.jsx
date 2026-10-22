import React, { useState } from 'react'
import { Expand, Sparkles, Camera } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Lightbox from '../components/Lightbox'
import TiltCard from '../components/TiltCard'
import CurveDivider from '../components/CurveDivider'
import { GALLERY_CATEGORIES, GALLERY_IMAGES } from '../data/gallery'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredImages =
    activeCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory)

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pt-28 pb-0 relative overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-20 right-1/4 w-[600px] h-[500px] rounded-full bg-[var(--primary)]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-16 relative z-10">
        <SectionHeading
          eyebrow="Visual Chronicles"
          titlePart1="Moments Around"
          italicPart="The Shared Table"
          titlePart2=""
          subtitle="A glimpse into twilight dining, artisan stone hearths, and shared multi-cuisine feasts."
          watermark="MOMENTS"
        />

        {/* 1. Category Filter Tabs with Count Badges */}
        <div className="flex justify-center items-center gap-3 overflow-x-auto my-10 pb-2">
          {GALLERY_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? GALLERY_IMAGES.length
                : GALLERY_IMAGES.filter((img) => img.category === cat.id).length
            const isSelected = activeCategory === cat.id

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 select-none whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[var(--primary-dark)] text-[var(--bg)] font-bold shadow-md shadow-[var(--footer)]/20 scale-105'
                    : 'bg-[var(--surface)] text-[var(--text)] hover:text-[var(--primary-dark)] border border-[var(--border)] hover:border-[var(--primary)]'
                }`}
                data-cursor="Filter"
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    isSelected
                      ? 'bg-[var(--accent)] text-[#1C2B22] font-bold'
                      : 'bg-[var(--bg-alt)] text-[var(--text-muted)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* 2. Masonry Gallery Grid with 3D Tilt Cards */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image, idx) => (
            <TiltCard
              key={image.id}
              maxTilt={6}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] cursor-pointer bg-[var(--surface)] transition-all duration-500 shadow-md hover:shadow-xl hover:shadow-[var(--footer)]/10 animate-fade-up"
              data-cursor="Expand"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-106"
                loading="lazy"
              />

              {/* Floating Top Right Expand Icon Badge */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] text-[var(--primary-dark)] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 flex items-center justify-center shadow-md">
                <Expand className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#1C2B22]/85 via-[#1C2B22]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left pointer-events-none">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-1">
                  {image.category}
                </span>
                <h4 className="font-display text-xl text-[var(--bg)]">
                  {image.title}
                </h4>
                <p className="font-body text-xs text-[var(--bg)]/80 mt-1 line-clamp-2">
                  {image.caption}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* CURVED SECTION DIVIDER: Gallery Grid (--bg) to Snapshots Strip (--bg-alt) */}
      <CurveDivider
        variant="wave"
        fromColor="var(--bg-alt)"
        toColor="var(--bg)"
        height={96}
        className="-mt-1 relative z-10"
      />

      {/* 3. Circular Tasting Plate Snapshots (--bg-alt) */}
      <section className="py-14 px-6 sm:px-10 bg-[var(--bg-alt)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--primary-dark)] font-semibold text-center mb-8">
            SNAPSHOTS FROM THE KITCHEN HEARTH
          </div>
          <div className="flex items-center justify-start md:justify-center gap-6 sm:gap-8 overflow-x-auto pb-4 px-4 scrollbar-none">
            {GALLERY_IMAGES.slice(0, 5).map((img) => (
              <div
                key={`strip-${img.id}`}
                onClick={() => {
                  const foundIdx = filteredImages.findIndex((f) => f.id === img.id)
                  setLightboxIndex(foundIdx !== -1 ? foundIdx : 0)
                }}
                className="group relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 shrink-0 rounded-full p-1.5 bg-gradient-to-br from-[var(--primary)]/60 via-[var(--border)] to-[var(--primary-dark)]/60 hover:from-[var(--primary)] hover:to-[var(--primary-dark)] shadow-md hover:shadow-[0_0_25px_rgba(47,74,58,0.25)] transition-all duration-500 hover:scale-105 cursor-pointer"
                data-cursor="View"
              >
                {/* Inner circular image container */}
                <div className="w-full h-full rounded-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] relative">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover rounded-full group-hover:scale-115 transition-transform duration-700 ease-out"
                  />

                  {/* Hover title preview badge */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-[2px] rounded-full text-center">
                    <span className="font-display italic text-xs sm:text-sm text-[var(--bg)] leading-tight drop-shadow-md">
                      {img.title}
                    </span>
                  </div>
                </div>

                {/* Outer concentric ring accent */}
                <div className="absolute -inset-1 rounded-full border border-[var(--primary)]/30 group-hover:border-[var(--primary)]/60 transition-colors pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

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
