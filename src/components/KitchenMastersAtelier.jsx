import React, { useState } from 'react'
import { Utensils, Flame, Award, MapPin, Quote, ChevronRight } from 'lucide-react'
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
    accentColor: '#E0A030',
    icon: Award,
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
                  ? 'bg-[var(--primary-dark)] text-[var(--bg)] font-bold shadow-lg shadow-[var(--footer)]/25 scale-105'
                  : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary-dark)] hover:border-[var(--primary)]'
              }`}
            >
              <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--bg)]' : 'text-[var(--primary)]'}`} />
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
                  ? 'lg:flex-[2.6] min-h-[460px] lg:min-h-0 border-2 border-[var(--primary)] shadow-[0_25px_60px_-10px_rgba(28,43,34,0.35),0_0_30px_rgba(126,156,122,0.2)]'
                  : 'lg:flex-[1] min-h-[140px] lg:min-h-0 border border-[var(--border)] hover:border-[var(--primary)]/50 opacity-90 hover:opacity-100 shadow-xl'
              }`}
            >
              {/* Background Full-Bleed Portrait Photo */}
              <img
                src={master.image}
                alt={master.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100 group-hover:scale-105'
                }`}
              />

              {/* Gentle Bottom Scrim for Text Readability Only (No Top or Side Vignettes) */}
              <div
                className={`absolute bottom-0 inset-x-0 h-[55%] transition-opacity duration-700 pointer-events-none ${
                  isActive
                    ? 'bg-gradient-to-t from-[#1C2B22]/85 via-[#1C2B22]/35 to-transparent'
                    : 'bg-gradient-to-t from-[#1C2B22]/60 via-transparent to-transparent'
                }`}
              />

              {/* Top Hairline Accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${
                  isActive
                    ? 'bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-100'
                    : 'bg-transparent opacity-0'
                }`}
              />

              {/* Top Experience Chip */}
              <div className="absolute top-5 right-5 z-20">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--bg)]/90 px-2.5 py-1 rounded-full bg-[#1C2B22]/80 border border-[var(--border)]/40 backdrop-blur-md">
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
                  <div className="w-8 h-8 rounded-full border border-[var(--primary)]/40 bg-[#1C2B22]/80 flex items-center justify-center text-[var(--primary)]">
                    <IconComp className="w-4 h-4" />
                  </div>
                  
                  {/* Rotated Name Title */}
                  <span className="font-display italic text-2xl text-[var(--bg)] tracking-wide -rotate-90 whitespace-nowrap drop-shadow-md">
                    {master.name}
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] -rotate-90 whitespace-nowrap">
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
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-[var(--accent)]">
                    <div className="flex items-center gap-1 bg-[#1C2B22]/80 px-2.5 py-1 rounded-md border border-[var(--border)]/30">
                      <MapPin className="w-3 h-3 text-[var(--accent)]" />
                      <span>{master.origin}</span>
                    </div>
                    <span className="text-[var(--border)]">·</span>
                    <span className="text-[var(--bg)]/90">{master.station}</span>
                  </div>

                  {/* Master Name & Role */}
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl text-[var(--bg)] leading-tight drop-shadow-lg">
                      {master.name}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-[var(--accent)] mt-1 uppercase tracking-wider">
                      {master.role}
                    </p>
                  </div>

                  {/* Personal Quote */}
                  <div className="relative pl-4 border-l-2 border-[var(--accent)] py-1 bg-[#1C2B22]/40 backdrop-blur-sm rounded-r-lg">
                    <p className="font-display italic text-sm sm:text-base text-[var(--bg)]/90 leading-relaxed">
                      "{master.quote}"
                    </p>
                  </div>

                  {/* Signature Dish Pill */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--border)]">
                      Signature Dish:
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium bg-[var(--accent)]/15 border border-[var(--accent)]/40 text-[var(--bg)]">
                      <Utensils className="w-3 h-3 text-[var(--accent)]" />
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
