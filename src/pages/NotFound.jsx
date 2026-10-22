import React from 'react'
import { Link } from 'react-router-dom'
import { Utensils, ArrowLeft } from 'lucide-react'
import Embers from '../components/Embers'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center p-6 text-center relative overflow-hidden">
      <Embers count={20} />

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-semibold">
          Error 404 · Table Unoccupied
        </div>

        <div className="font-display text-8xl sm:text-9xl text-[var(--primary)]/35 font-bold">
          404
        </div>

        <h2 className="font-display text-3xl sm:text-4xl text-[var(--primary-dark)]">
          This Seat Seems Empty
        </h2>

        <p className="font-body text-sm sm:text-base text-[var(--text)] leading-relaxed">
          The dish or room you were looking for has either moved to another table or was never on the feast ledger.
        </p>

        <div className="pt-4 flex justify-center">
          <Link to="/" className="btn-ember">
            <ArrowLeft className="w-4 h-4 mr-1 text-[#1C2B22]" />
            <span>Return to Main Feast</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
