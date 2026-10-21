import React from 'react'
import { Link } from 'react-router-dom'
import { X, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '../data/site'
import BrandLogo from './BrandLogo'

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[1000] bg-[#1B100C] text-[#F5E9D4] flex flex-col justify-between p-6 sm:p-10 animate-fadeIn"
      style={{
        clipPath: 'circle(150% at top right)',
        transition: 'clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background Watermark */}
      <div className="watermark-text text-[18vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#B8894B]">
        GATHER
      </div>

      {/* Top Bar with Brand & Close Button */}
      <div className="flex items-center justify-between border-b border-[#B8894B]/20 pb-5 z-10">
        <div onClick={onClose} className="cursor-pointer">
          <BrandLogo size="compact" />
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full border border-[#B8894B]/50 bg-[#2A1812] text-[#E8A317] hover:scale-110 transition-transform"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Links with large Fraunces font */}
      <nav className="flex flex-col gap-4 my-auto py-6 z-10" aria-label="Mobile Navigation">
        {SITE_CONFIG.navigation.map((item, idx) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="flex items-center justify-between group py-2 border-b border-[#B8894B]/10 hover:border-[#E8A317]/40 transition-colors"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-[#B8894B]">0{idx + 1}</span>
              <span className="font-display text-3xl sm:text-4xl text-[#F5E9D4] group-hover:text-[#E8A317] group-hover:translate-x-2 transition-all">
                {item.label}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-[#B8894B] group-hover:text-[#E8A317] group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
          </Link>
        ))}
      </nav>

      {/* Bottom Coordinates & Quick Reserve Button */}
      <div className="border-t border-[#B8894B]/20 pt-6 space-y-4 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#F5E9D4]/70 font-mono">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#E8A317]" />
            <span>Grand Heritage Promenade, Downtown</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#E8A317]" />
            <span>Lunch 12–3:30 · Dinner 6:30–11</span>
          </div>
        </div>

        <a
          href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
          className="btn-ember w-full justify-center !py-3.5 text-center flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          <span>Call Sanctuary: {SITE_CONFIG.contact.phoneDisplay}</span>
        </a>
      </div>
    </div>
  )
}
