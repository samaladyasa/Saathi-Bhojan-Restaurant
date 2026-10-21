import React, { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext])

  if (currentIndex === null || !images[currentIndex]) return null
  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-[10000] bg-[#1B100C]/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-[#F5E9D4] relative z-20">
        <div className="font-mono text-xs uppercase tracking-widest text-[#B8894B]">
          Saathi Bhojan Archives · {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full border border-[#B8894B]/30 bg-[#2A1812] text-[#F5E9D4] hover:text-[#E8A317] hover:scale-110 transition-transform"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative my-auto max-w-5xl mx-auto max-h-[75vh] flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl border border-[#B8894B]/30 shadow-2xl"
        />

        {/* Prev / Next Buttons */}
        <button
          onClick={onPrev}
          className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1B100C]/70 border border-[#B8894B]/40 text-[#F5E9D4] hover:text-[#E8A317] hover:scale-110 transition-transform"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1B100C]/70 border border-[#B8894B]/40 text-[#F5E9D4] hover:text-[#E8A317] hover:scale-110 transition-transform"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption & Metadata */}
      <div
        className="max-w-2xl mx-auto text-center space-y-1.5 pb-4 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl sm:text-2xl text-[#F5E9D4]">
          {currentImage.title}
        </h3>
        <p className="font-body text-xs sm:text-sm text-[#F5E9D4]/75">
          {currentImage.caption}
        </p>
      </div>
    </div>
  )
}
