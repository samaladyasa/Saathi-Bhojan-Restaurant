import React, { useState } from 'react'
import { Utensils, Flame, Sparkles, Award, MapPin, Quote, ChevronRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

const MASTERS_DATA = [
  {
    id: 1,
    name: 'Chef Marco Bellini',
    role: 'Head Pizzaiolo & Master of Italian Pastas',
    origin: 'Naples, Italy',
    station: '450°C Stone Pizza Ovens & Pastificio',
    badge: 'NAPOLI HERITAGE',
    experience: '18+ Years',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop',
    quote: 'Patience in natural sourdough fermentation is the true soul of Neapolitan craft.',
    signature: 'Truffle Burrata Sourdough & Hand-Rolled Cacio e Pepe',
    accentColor: '#E5B869',
    icon: Sparkles,
  },
  {
    id: 2,
    name: 'Ustad Tariq Qureshi',
    role: 'Master of Royal Tandoor & Awadhi Dum',
    origin: 'Old Lucknow Heritage',
    station: 'Acacia Wood Charcoal Bhatti & Sealed Clay Handis',
    badge: 'AWADHI ROYALTY',
    experience: '24+ Years',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=800&auto=format&fit=crop',
    quote: 'The clay handi must gently breathe with slow charcoal, royal saffron, and sealed steam.',
    signature: 'Overnight 20-Hour Dal Makhani & Melt-in-Mouth Galouti',
    accentColor: '#DC2626',
    icon: Flame,
  },
  {
    id: 3,
    name: 'Chef Chen Wei',
    role: 'Executive Wok & Dim Sum Specialist',
    origin: 'Guangzhou & Sichuan',
    station: 'High-Heat Dragon Woks & Hand-Pleated Bamboo Steamers',
    badge: 'CANTONESE & SICHUAN',
    experience: '16+ Years',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=800&auto=format&fit=crop',
    quote: 'Wok hei is not merely flame and high heat — it is the fleeting breath and spirit of the wok.',
    signature: 'Fierce Wok Hei Hand-Pulled Noodles & Crystal Har Gow',
    accentColor: '#EA580C',
    icon: Award,
  },
]

/**
 * KitchenMastersAtelier - Cinematic Expanding Atelier Showcase
 * A high-end interactive studio presentation where hovering/selecting a culinary master
 * expands their portrait panel into a widescreen narrative spread with signature dish,
 * origin coordinates, station craft, and personal philosophy.
 */
export default function KitchenMastersAtelier() {
  const [activeId, setActiveId] = useState(1)

  return (
    <div className="w-full">
      {/* Top Station Selector Switcher (Desktop & Mobile) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {MASTERS_DATA.map((m) => {
          const isActive = activeId === m.id
          const IconComp = m.icon
          return (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#B8894B] to-[#E5B869] text-[#130D0B] font-bold shadow-lg shadow-[#E5B869]/25 scale-105'
                  : 'bg-[#1F1410] border border-[#B8894B]/30 text-[#F5E9D4]/75 hover:text-[#E5B869] hover:border-[#E5B869]/50'
              }`}
            >
              <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#130D0B]' : 'text-[#E5B869]'}`} />
              <span>{m.badge}</span>
            </button>
          )
        })}
      </div>

      {/* Main Interactive Atelier Grid / Expanding Panels */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 h-auto lg:h-[580px] w-full">
        {MASTERS_DATA.map((master) => {
          const isActive = activeId === master.id
          const IconComp = master.icon

          return (
            <div
              key={master.id}
              onClick={() => setActiveId(master.id)}
              onMouseEnter={() => setActiveId(master.id)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[flex,transform] select-none ${
                isActive
                  ? 'lg:flex-[2.6] min-h-[460px] lg:min-h-0 border-2 border-[#E5B869]/80 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(229,184,105,0.25)]'
                  : 'lg:flex-[1] min-h-[140px] lg:min-h-0 border border-[#B8894B]/25 hover:border-[#E5B869]/50 opacity-90 hover:opacity-100 shadow-xl'
              }`}
            >
              {/* Background Full-Bleed Portrait Photo */}
              <img
                src={master.image}
                alt={master.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${
                  isActive
                    ? 'scale-105 brightness-[0.88] contrast-[1.08]'
                    : 'scale-100 grayscale-[0.35] brightness-[0.6] group-hover:grayscale-0 group-hover:scale-108 group-hover:brightness-[0.75]'
                }`}
              />

              {/* Multi-Layer Cinematic Obsidian Vignettes */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isActive
                    ? 'bg-gradient-to-t from-[#100A08] via-[#100A08]/55 to-transparent'
                    : 'bg-gradient-to-t from-[#100A08] via-[#100A08]/75 to-[#100A08]/40'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#100A08]/70 via-transparent to-black/60 pointer-events-none" />

              {/* Top Hairline Metallic Accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${
                  isActive
                    ? 'bg-gradient-to-r from-transparent via-[#E5B869] to-transparent opacity-100'
                    : 'bg-transparent opacity-0'
                }`}
              />

              {/* Top Badges Row */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
                {/* Station Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#130D0B]/85 backdrop-blur-md border border-[#E5B869]/40 text-[#E5B869] text-[10px] font-mono uppercase tracking-widest shadow-lg">
                  <IconComp className="w-3 h-3 text-[#E5B869]" />
                  <span>{master.badge}</span>
                </div>

                {/* Experience Chip */}
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#F5E9D4]/80 px-2.5 py-1 rounded-full bg-[#1F1410]/80 border border-[#B8894B]/30 backdrop-blur-md">
                  {master.experience}
                </div>
              </div>

              {/* COLLAPSED STATE (Desktop Only: Vertical Architectural Typography) */}
              <div
                className={`hidden lg:flex absolute inset-0 items-center justify-center p-6 transition-all duration-500 z-10 pointer-events-none ${
                  isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                }`}
              >
                <div className="flex flex-col items-center justify-between h-full py-16">
                  <div className="w-8 h-8 rounded-full border border-[#E5B869]/40 bg-[#140D0B]/80 flex items-center justify-center text-[#E5B869]">
                    <IconComp className="w-4 h-4" />
                  </div>
                  
                  {/* Rotated Name Title */}
                  <span className="font-display italic text-2xl text-[#F5E9D4] tracking-wide -rotate-90 whitespace-nowrap drop-shadow-md">
                    {master.name}
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E5B869] -rotate-90 whitespace-nowrap">
                    {master.origin}
                  </span>
                </div>
              </div>

              {/* EXPANDED CONTENT (Rich Narrative & Details) */}
              <div
                className={`relative z-20 flex flex-col justify-end h-full p-6 sm:p-8 md:p-10 transition-all duration-700 ${
                  isActive
                    ? 'opacity-100 translate-y-0'
                    : 'lg:opacity-0 lg:translate-y-8 pointer-events-none'
                }`}
              >
                <div className="space-y-4 max-w-xl">
                  {/* Origin & Station Coordinates */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-[#E5B869]">
                    <div className="flex items-center gap-1 bg-[#1A110D]/80 px-2.5 py-1 rounded-md border border-[#B8894B]/30">
                      <MapPin className="w-3 h-3 text-[#E5B869]" />
                      <span>{master.origin}</span>
                    </div>
                    <span className="text-[#B8894B]/60">·</span>
                    <span className="text-[#F5E9D4]/80">{master.station}</span>
                  </div>

                  {/* Master Name & Role */}
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl text-[#F5E9D4] leading-tight drop-shadow-lg">
                      {master.name}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-[#E5B869]/90 mt-1 uppercase tracking-wider">
                      {master.role}
                    </p>
                  </div>

                  {/* Personal Quote */}
                  <div className="relative pl-4 border-l-2 border-[#E5B869] py-1 bg-[#1A110D]/40 backdrop-blur-sm rounded-r-lg">
                    <p className="font-display italic text-sm sm:text-base text-[#F5E9D4]/90 leading-relaxed">
                      "{master.quote}"
                    </p>
                  </div>

                  {/* Signature Dish Pill */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8894B]">
                      Signature Dish:
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium bg-[#E5B869]/15 border border-[#E5B869]/40 text-[#F5E9D4]">
                      <Utensils className="w-3 h-3 text-[#E5B869]" />
                      {master.signature}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
