import React from 'react'
import { Flame, Star, ArrowRight } from 'lucide-react'
import TiltCard from './TiltCard'

export default function DishCard({ dish, onClick, variant = 'card' }) {
  if (variant === 'row') {
    return (
      <div
        onClick={() => onClick(dish)}
        className="group py-4 px-3 sm:px-4 rounded-2xl border border-transparent hover:border-[var(--primary)]/60 hover:bg-[var(--surface)] transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-none hover:shadow-md hover:shadow-[var(--footer)]/5"
        data-cursor="View"
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Small Dish Thumbnail in Row View */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[var(--bg-alt)] shrink-0 border border-[var(--border)] relative">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {dish.isVeg ? (
                <span className="w-4 h-4 rounded-sm border border-emerald-600 flex items-center justify-center p-[2px] shrink-0 bg-emerald-50">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                </span>
              ) : (
                <span className="w-4 h-4 rounded-sm border border-amber-800 flex items-center justify-center p-[2px] shrink-0 bg-amber-50">
                  <span className="w-2 h-2 rounded-full bg-amber-800" />
                </span>
              )}
              <h4 className="font-display text-lg sm:text-xl text-[var(--primary-dark)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                {dish.name}
              </h4>
              {dish.isChefPick && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent)] text-[#1C2B22] text-[10px] font-mono font-bold">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Chef
                </span>
              )}
              {dish.isSpicy && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[var(--primary-dark)] text-[var(--bg)] text-[10px] font-mono font-medium">
                  <Flame className="w-2.5 h-2.5 fill-current" />
                  Spicy
                </span>
              )}
            </div>
            <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] line-clamp-1">
              {dish.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 self-auto sm:self-center">
          <span className="font-mono text-lg sm:text-xl font-bold text-[var(--accent)]">
            ₹{dish.price}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[var(--bg-alt)]/80 group-hover:bg-[var(--primary)] text-[var(--primary-dark)] group-hover:text-white transition-all duration-300 font-mono text-xs font-semibold flex items-center gap-1.5 shadow-xs">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    )
  }

  // Default Grid Card with 3D Tilt, Light Sheen Shimmer, and Micro-Interactions
  return (
    <TiltCard
      maxTilt={7}
      onClick={() => onClick(dish)}
      className="group relative bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[rgba(28,43,34,0.1)] flex flex-col justify-between transition-all duration-300"
      data-cursor="Discover"
    >
      {/* Top Image Stage with Diagonal Sheen */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[var(--bg-alt)]">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Diagonal Light Shimmer on Hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[var(--surface)] to-transparent pointer-events-none" />

        {/* Dietary & Chef Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {dish.isVeg ? (
            <span className="w-5 h-5 rounded-md bg-[var(--surface)]/95 border border-emerald-600 flex items-center justify-center p-[3px] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            </span>
          ) : (
            <span className="w-5 h-5 rounded-md bg-[var(--surface)]/95 border border-amber-800 flex items-center justify-center p-[3px] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-800" />
            </span>
          )}

          {dish.isChefPick && (
            <span className="bg-[var(--accent)] text-[#1C2B22] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <Star className="w-2.5 h-2.5 fill-current" />
              Chef's Pick
            </span>
          )}
        </div>

        {dish.isSpicy && (
          <span className="absolute top-3 right-3 bg-[var(--primary-dark)] text-[var(--bg)] text-[10px] font-mono font-medium px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs z-10">
            <Flame className="w-2.5 h-2.5 fill-current" />
            Spicy
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-display text-xl text-[var(--primary-dark)] group-hover:text-[var(--primary)] transition-colors leading-snug">
            {dish.name}
          </h3>
          <p className="font-body text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Footer: Price + Pill Action Button */}
        <div className="pt-3 border-t border-[var(--border)]/70 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] block text-[10px]">
              Portion Price
            </span>
            <span className="font-mono text-xl font-bold text-[var(--accent)] leading-tight">
              ₹{dish.price}
            </span>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-[var(--bg-alt)]/80 group-hover:bg-[var(--primary)] text-[var(--primary-dark)] group-hover:text-white transition-all duration-300 font-mono text-xs font-semibold flex items-center gap-1.5 shadow-xs">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </TiltCard>
  )
}
