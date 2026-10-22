import React from 'react'
import { X, Flame, Star } from 'lucide-react'

export default function DishModal({ dish, onClose }) {
  if (!dish) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-[var(--footer)]/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl text-[var(--text)] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[var(--surface)]/90 border border-[var(--border)] text-[var(--primary-dark)] hover:text-[var(--accent)] hover:border-[var(--primary)] hover:scale-110 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Arch Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[var(--bg-alt)]">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[var(--surface)] to-transparent pointer-events-none" />

          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {dish.isChefPick && (
              <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-[var(--primary-dark)] text-[11px] font-mono uppercase px-2.5 py-1 rounded-full font-bold shadow-sm">
                <Star className="w-3 h-3 fill-current" />
                Chef's Masterpiece
              </span>
            )}
            {dish.isSpicy && (
              <span className="inline-flex items-center gap-1 bg-[var(--primary-dark)] text-[var(--bg)] text-[11px] font-mono uppercase px-2.5 py-1 rounded-full font-medium shadow-sm">
                <Flame className="w-3 h-3" />
                Aromatic Spice
              </span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {dish.isVeg ? (
                  <span className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center p-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  </span>
                ) : (
                  <span className="w-3.5 h-3.5 rounded-sm border border-amber-700 flex items-center justify-center p-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                  </span>
                )}
                <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  {dish.cuisine}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[var(--primary-dark)]">
                {dish.name}
              </h3>
            </div>
            <div className="font-mono text-2xl font-bold text-[var(--accent)] shrink-0">
              ₹{dish.price}
            </div>
          </div>

          <p className="font-body text-sm sm:text-base text-[var(--text)] leading-relaxed">
            {dish.description}
          </p>

        </div>
      </div>
    </div>
  )
}
