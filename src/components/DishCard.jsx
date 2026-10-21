import React from 'react'
import { Flame, Star, Sparkles } from 'lucide-react'
import TiltCard from './TiltCard'

export default function DishCard({ dish, onClick, variant = 'card' }) {
  if (variant === 'row') {
    return (
      <div
        onClick={() => onClick(dish)}
        className="group py-4 border-b border-[#B8894B]/15 hover:border-[#E8A317]/50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        data-cursor="View"
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-1">
            {dish.isVeg ? (
              <span className="w-3.5 h-3.5 rounded-sm border border-emerald-500 flex items-center justify-center p-[2px] shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
            ) : (
              <span className="w-3.5 h-3.5 rounded-sm border border-rose-500 flex items-center justify-center p-[2px] shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </span>
            )}
            <h4 className="font-display text-lg sm:text-xl text-[#F5E9D4] group-hover:text-[#E8A317] transition-colors">
              {dish.name}
            </h4>
            {dish.isChefPick && <Star className="w-3.5 h-3.5 text-[#E8A317] fill-current" />}
            {dish.isSpicy && <Flame className="w-3.5 h-3.5 text-[#C4532B]" />}
          </div>
          <p className="font-body text-xs sm:text-sm text-[#F5E9D4]/65 line-clamp-1">
            {dish.description}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 sm:self-center">
          <span className="font-mono text-base sm:text-lg font-medium text-[#EAD6B4] group-hover:text-[#E8A317] transition-colors">
            ₹{dish.price}
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-[#B8894B] opacity-0 group-hover:opacity-100 transition-opacity">
            Details →
          </span>
        </div>
      </div>
    )
  }

  // Default Grid Card with 3D Tilt and Arch Mask
  return (
    <TiltCard
      maxTilt={8}
      onClick={() => onClick(dish)}
      className="group relative bg-[#1E1410] border border-[#B8894B]/30 hover:border-[#E5B869]/70 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between transition-all duration-300"
      data-cursor="Discover"
    >
      {/* Top Arch Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#130D0B]">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1410] via-transparent to-transparent opacity-85" />

        {/* Dietary & Chef Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {dish.isVeg ? (
            <span className="w-5 h-5 rounded-md bg-[#130D0B]/90 border border-emerald-500 flex items-center justify-center p-[3px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </span>
          ) : (
            <span className="w-5 h-5 rounded-md bg-[#130D0B]/90 border border-rose-500 flex items-center justify-center p-[3px]">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            </span>
          )}

          {dish.isChefPick && (
            <span className="bg-[#E5B869] text-[#130D0B] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md shadow-black/40">
              <Star className="w-2.5 h-2.5 fill-current" />
              Chef's Pick
            </span>
          )}
        </div>

        {dish.isSpicy && (
          <span className="absolute top-3 right-3 bg-[#B91C1C]/90 text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md shadow-black/40">
            <Flame className="w-2.5 h-2.5 fill-current" />
            Spicy
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-display text-xl text-[#F5E9D4] group-hover:text-[#E5B869] transition-colors leading-snug">
            {dish.name}
          </h3>
          <p className="font-body text-xs text-[#F5E9D4]/75 mt-1 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Footer: Price + Read More */}
        <div className="pt-3 border-t border-[#B8894B]/20 flex items-center justify-between">
          <span className="font-mono text-xl font-medium text-[#E5B869]">
            ₹{dish.price}
          </span>
          <span className="text-xs font-mono tracking-wider text-[#B8894B] group-hover:text-[#E5B869] flex items-center gap-1 transition-colors">
            Recipe Story
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </TiltCard>
  )
}
