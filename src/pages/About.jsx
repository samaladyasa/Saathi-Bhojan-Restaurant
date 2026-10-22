import React from 'react'
import { Link } from 'react-router-dom'
import { Flame, HeartHandshake, Compass, Users, ArrowRight, ShieldCheck } from 'lucide-react'
import CurveDivider from '../components/CurveDivider'
import SectionHeading from '../components/SectionHeading'
import Embers from '../components/Embers'
import TiltCard from '../components/TiltCard'
import Button from '../components/Button'
import ScrollExpand from '../components/ScrollExpand'
import MilestonesStack from '../components/MilestonesStack'
import QualityCovenant from '../components/QualityCovenant'
import KitchenMastersAtelier from '../components/KitchenMastersAtelier'
import { SITE_CONFIG } from '../data/site'
import restroImage from '../assets/restro.png'

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pt-0 pb-0 overflow-x-clip">
      {/* 1. CINEMATIC HERO SCROLL EXPAND STAGE (From the start of Our Story) */}
      <section className="relative pt-20 sm:pt-24 bg-[var(--bg)]">
        <Embers count={18} />

        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[var(--primary)]/10 blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center px-6 pt-2 pb-4 space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary-dark)] font-medium">
              The Story of Togetherness
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-[var(--primary-dark)] tracking-tight leading-[1.08]">
            A Tapestry of{' '}
            <span className="italic font-normal text-[var(--primary)]">
              World Flavours
            </span>
          </h1>

          <p className="font-body text-base sm:text-xl text-[var(--text)] max-w-2xl mx-auto leading-relaxed">
            Built to honor the bond of companions: an architectural dining sanctuary where diverse international and regional cuisines live in effortless harmony.
          </p>
        </div>

        {/* React Bits ScrollExpand Cinematic Frame */}
        <ScrollExpand
          src={restroImage}
          alt="Saathi Bhojan Dining Sanctuary"
          useWindowScroll={true}
          stageHeight={540}
          startWidth={94}
          startHeight={92}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.15}
          scrollDistance={0.2}
          holdDistance={0.03}
          smoothing={0.08}
          overlayScrim={0.65}
        >
          <div className="max-w-3xl mx-auto space-y-4 px-6 text-center">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#F6F4EC] font-semibold tracking-tight leading-[1.12]">
              Where Every Companion Has a Seat.
            </h2>
            <p className="font-body text-sm sm:text-lg text-[#F6F4EC]/90 max-w-xl mx-auto leading-relaxed">
              Hand-fired terracotta brickwork, glowing brass details, and spacious tables crafted for celebration.
            </p>
          </div>
        </ScrollExpand>
      </section>

      {/* 2. HERITAGE LANDMARK METRICS (--bg) */}
      <section className="-mt-8 sm:-mt-10 pt-0 pb-10 sm:pb-14 px-6 sm:px-10 bg-[var(--bg)] relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Heritage Landmark Numbers Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md text-center">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--primary-dark)]">
                8
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">
                Specialty Kitchens
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md text-center">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-800">
                100%
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">
                Separated Prep Lines
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md text-center">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--accent)]">
                25+
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">
                Signature Offerings
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md text-center">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--primary-dark)]">
                4.9 ★
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">
                Guest Delight Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURVED SECTION DIVIDER 1: Hero (--bg) to Milestones (--bg-alt) */}
      <CurveDivider
        variant="wave"
        fromColor="var(--bg-alt)"
        toColor="var(--bg)"
        height={96}
        className="-mt-1 relative z-10"
      />

      {/* 2. SCROLL-DRIVEN STACKING MILESTONES DECK (--bg-alt) */}
      <section className="pt-8 sm:pt-12 pb-20 px-6 sm:px-10 bg-[var(--bg-alt)] relative">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            eyebrow="Chronicle of The Hearth"
            titlePart1="How The Vision"
            italicPart="Unfolded"
            titlePart2=""
            subtitle="The journey of creating a multi-cuisine dining haven where quality and authenticity never take a back seat."
            watermark="CHRONICLE"
          />

          {/* Premium 3D Scroll Stacking Deck */}
          <MilestonesStack />
        </div>
      </section>

      {/* CURVED SECTION DIVIDER 2: Milestones (--bg-alt) to Quality Covenant (--bg) */}
      <CurveDivider
        variant="convex"
        fromColor="var(--bg)"
        toColor="var(--bg-alt)"
        height={96}
        className="-mt-1 relative z-10"
      />

      {/* 3. OUR CULINARY STANDARDS (Quality Covenant: --bg) */}
      <QualityCovenant />

      {/* CURVED SECTION DIVIDER 3: Quality Covenant (--bg) to Kitchen Masters (--bg-alt) */}
      <CurveDivider
        variant="wave"
        fromColor="var(--bg-alt)"
        toColor="var(--bg)"
        height={96}
        mirror={true}
        className="-mt-1 relative z-10"
      />

      {/* 4. MEET THE KITCHEN MASTERS (--bg-alt) */}
      <section className="pt-8 sm:pt-12 pb-24 px-6 sm:px-10 bg-[var(--bg-alt)] relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Specialist Masters"
            titlePart1="Masters of"
            italicPart="Each Station"
            titlePart2=""
            subtitle="Meet the executive chefs who bring decades of specialized passion to your table."
            watermark="MASTERS"
          />

          {/* Interactive Expanding Atelier Studio */}
          <div className="mt-12">
            <KitchenMastersAtelier />
          </div>

          <div className="text-center pt-16 flex justify-center">
            <Button to="/reserve" variant="ember" cursorLabel="Reserve">
              <span>Sit With Us This Evening</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
