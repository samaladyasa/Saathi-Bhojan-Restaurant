import React from 'react'
import { X, Flame, Star, UtensilsCrossed, Clock, Check } from 'lucide-react'

export default function DishModal({ dish, onClose }) {
  if (!dish) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-[#1B100C]/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#2A1812] border border-[#B8894B]/40 rounded-2xl overflow-hidden shadow-2xl text-[#F5E9D4] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1B100C]/70 border border-[#B8894B]/30 text-[#F5E9D4] hover:text-[#E8A317] hover:scale-110 transition-transform"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Arch Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1B100C]">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1812] via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {dish.isChefPick && (
              <span className="inline-flex items-center gap-1 bg-[#E8A317] text-[#1B100C] text-[11px] font-mono uppercase px-2.5 py-1 rounded-full font-bold">
                <Star className="w-3 h-3 fill-current" />
                Chef's Masterpiece
              </span>
            )}
            {dish.isSpicy && (
              <span className="inline-flex items-center gap-1 bg-[#C4532B] text-[#F5E9D4] text-[11px] font-mono uppercase px-2.5 py-1 rounded-full">
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
                  <span className="w-3.5 h-3.5 rounded-sm border border-emerald-500 flex items-center justify-center p-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </span>
                ) : (
                  <span className="w-3.5 h-3.5 rounded-sm border border-rose-500 flex items-center justify-center p-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  </span>
                )}
                <span className="font-mono text-xs text-[#B8894B] uppercase tracking-wider">
                  {dish.cuisine}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#F5E9D4]">
                {dish.name}
              </h3>
            </div>
            <div className="font-mono text-2xl font-medium text-[#E8A317] shrink-0">
              ₹{dish.price}
            </div>
          </div>

          <p className="font-body text-sm sm:text-base text-[#F5E9D4]/80 leading-relaxed">
            {dish.description}
          </p>

          {/* Tags */}
          {dish.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-[#B8894B]/30 bg-[#1B100C]/50 text-[#EAD6B4]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Heritage Hospitality Note */}
          <div className="border-t border-[#B8894B]/20 pt-4 flex items-center justify-between text-xs font-mono text-[#B8894B]">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Cooked fresh to order in pure cold-pressed oils
            </span>
            <span className="text-[10px] text-[#F5E9D4]/50">
              // PLACEHOLDER
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
