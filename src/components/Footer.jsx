import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, MapPin, Phone, Mail, Clock, ArrowUpRight, Heart } from 'lucide-react'
import CurveDivider from './CurveDivider'
import { SITE_CONFIG } from '../data/site'
import BrandLogo from './BrandLogo'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <footer className="relative bg-[#130D0B] text-[#F5E9D4] pt-0 overflow-hidden select-none">
      {/* Scalloped Curve Divider at top edge */}
      <CurveDivider
        variant="scallop"
        fromColor="#130D0B"
        toColor="transparent"
        height={56}
        flip={false}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-12 relative z-10">
        {/* Top Grid: Brand Story, Quick Nav, Coordinates, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-amber-500/20">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group text-decoration-none">
              <BrandLogo size="default" />
            </Link>
            <p className="font-body text-sm text-[#F5E9D4]/75 leading-relaxed max-w-sm">
              A premier multi-cuisine sanctuary where Italian wood-fired pizzas, Asian woks, charcoal tandoor platters, and authentic regional delicacies share one celebratory table.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-[#F5E9D4]/80 hover:border-rose-400 hover:text-rose-400 hover:shadow-[0_0_12px_rgba(244,63,94,0.4)] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-[#F5E9D4]/80 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-[#F5E9D4]/80 hover:border-emerald-400 hover:text-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 mb-4 font-bold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-body">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#F5E9D4]/80 hover:text-amber-300 transition-colors flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 mb-4 font-bold">
              Sanctuary Hours
            </h4>
            <div className="space-y-3 text-sm text-[#F5E9D4]/80 font-body">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[#F5E9D4]">Lunch: {SITE_CONFIG.hours.lunch}</p>
                  <p className="font-medium text-[#F5E9D4]">Dinner: {SITE_CONFIG.hours.dinner}</p>
                  <p className="text-xs text-amber-400/80 mt-0.5">{SITE_CONFIG.hours.days}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <p className="text-xs leading-relaxed text-[#F5E9D4]/80">
                  {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2}, {SITE_CONFIG.address.district}, {SITE_CONFIG.address.state} — {SITE_CONFIG.address.pin}
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 mb-4 font-bold">
              Feast Notes
            </h4>
            <p className="text-xs font-body text-[#F5E9D4]/75 leading-relaxed">
              Receive seasonal festive menus, weekend culinary tastings, and chef specials.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#1F1410] border border-amber-500/30 rounded-full py-2.5 pl-4 pr-12 text-xs font-mono text-[#F5E9D4] placeholder-[#F5E9D4]/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E5B869] flex items-center justify-center text-[#130D0B] font-bold hover:bg-[#F5E9D4] shadow-md shadow-black/40 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs font-mono text-[#E5B869] animate-fadeIn">
                  ✦ Welcome! You are on our guest list.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Giant Outlined Wordmark with Refined Champagne & Bronze Sheen */}
        <div className="py-12 text-center select-none overflow-hidden relative">
          <div className="font-display font-bold text-[14vw] tracking-tighter leading-none text-transparent transition-all duration-700 bg-clip-text bg-gradient-to-b from-[#B8894B]/25 via-[#E5B869]/15 to-transparent hover:from-[#E5B869]/40 hover:to-[#B8894B]/20">
            SAATHI BHOJAN
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B8894B]/70 pt-4 border-t border-[#B8894B]/10 gap-3">
          <p>© {new Date().getFullYear()} Saathi Bhojan. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Crafted with passion for companion dining & global cuisines</span>
            <span className="text-[#E5B869]">✦</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
