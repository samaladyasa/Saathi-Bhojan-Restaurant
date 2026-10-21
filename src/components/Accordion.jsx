import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
            className={`border rounded-xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-[#2A1812] border-[#E8A317]/60 shadow-lg'
                : 'bg-[#1B100C]/60 border-[#B8894B]/20 hover:border-[#B8894B]/50'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left py-4 px-6 flex items-center justify-between gap-4 select-none focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg sm:text-xl text-[#F5E9D4] flex items-center gap-3">
                <span className="font-mono text-xs text-[#B8894B]">
                  0{idx + 1}
                </span>
                {item.q}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#E8A317] shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-sm sm:text-base font-body text-[#F5E9D4]/75 leading-relaxed border-t border-[#B8894B]/15">
                {item.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
