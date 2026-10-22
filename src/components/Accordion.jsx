import React, { useState } from 'react'
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react'
import { SITE_CONFIG } from '../data/site'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div
            key={idx}
            className={`group relative rounded-2xl transition-all duration-300 overflow-hidden border ${
              isOpen
                ? 'bg-[var(--surface)] border-[var(--primary)] shadow-[0_12px_32px_rgba(47,74,58,0.1)] -translate-y-0.5'
                : 'bg-[var(--surface)]/75 border-[var(--border)] hover:border-[var(--primary)]/60 hover:bg-[var(--surface)] hover:-translate-y-0.5 hover:shadow-sm'
            }`}
          >
            {/* Left Accent Indicator Bar */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 ${
                isOpen ? 'bg-[var(--primary)] opacity-100 scale-y-100' : 'bg-transparent opacity-0 scale-y-0'
              }`}
            />

            <button
              onClick={() => toggle(idx)}
              className="w-full text-left py-4 sm:py-5 px-5 sm:px-7 flex items-center justify-between gap-4 select-none focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                {/* Number Badge with animated color and scale */}
                <span
                  className={`font-mono text-xs px-2.5 py-1 rounded-full font-bold transition-all duration-300 shrink-0 ${
                    isOpen
                      ? 'bg-[var(--accent)] text-[#1C2B22] shadow-[0_2px_8px_rgba(224,160,48,0.35)] scale-105'
                      : 'bg-[var(--bg-alt)] text-[var(--text-muted)] group-hover:bg-[var(--primary)]/15 group-hover:text-[var(--primary-dark)]'
                  }`}
                >
                  0{idx + 1}
                </span>

                <span
                  className={`font-display text-base sm:text-lg transition-colors duration-200 leading-snug ${
                    isOpen
                      ? 'text-[var(--primary-dark)] font-semibold'
                      : 'text-[var(--text)] group-hover:text-[var(--primary-dark)]'
                  }`}
                >
                  {item.q}
                </span>
              </div>

              {/* Chevron with circular background and smooth rotation */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen
                    ? 'bg-[var(--primary)] text-white shadow-[0_2px_10px_rgba(126,156,122,0.45)] rotate-180'
                    : 'bg-[var(--bg-alt)] text-[var(--primary-dark)] group-hover:bg-[var(--primary)]/20 rotate-0'
                }`}
              >
                <ChevronDown className="w-4 h-4 transition-transform duration-300" />
              </div>
            </button>

            {/* Smooth CSS Grid Height and Opacity Transition */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-7 pb-5 pt-1 text-sm sm:text-base font-body text-[var(--text)]/90 leading-relaxed border-t border-[var(--border)]/70 bg-[var(--bg)]/30">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Interactive Helper Banner with micro-actions */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[var(--surface)]/90 border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/15 text-[var(--primary-dark)] flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-display text-sm sm:text-base font-semibold text-[var(--primary-dark)]">
              Have a bespoke request or private banquet query?
            </h4>
            <p className="font-mono text-xs text-[var(--text-muted)]">
              Our hospitality team is available 11:00 AM – 11:00 PM daily.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
            className="px-3.5 py-2 rounded-full border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] text-[var(--primary-dark)] text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 shadow-xs hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Desk</span>
          </a>
          <a
            href={SITE_CONFIG.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-full border border-emerald-600/30 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all duration-200 text-xs font-mono font-medium flex items-center gap-1.5 shadow-xs hover:scale-105"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
