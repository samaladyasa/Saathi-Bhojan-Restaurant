import React from 'react'
import { Link } from 'react-router-dom'
import { Flame, HeartHandshake, Compass, Users, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import CurveDivider from '../components/CurveDivider'
import SectionHeading from '../components/SectionHeading'
import Embers from '../components/Embers'
import TiltCard from '../components/TiltCard'
import Button from '../components/Button'
import MilestonesStack from '../components/MilestonesStack'
import QualityCovenant from '../components/QualityCovenant'
import KitchenMastersAtelier from '../components/KitchenMastersAtelier'
import { SITE_CONFIG } from '../data/site'

export default function About() {

  return (
    <div className="min-h-screen bg-[#1B100C] text-[#F5E9D4] pt-28 pb-0 overflow-hidden">
      {/* 1. HERO STORY SECTION */}
      <section className="relative px-6 sm:px-10 pb-20">
        <Embers count={20} />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <SectionHeading
            eyebrow="The Story of Togetherness"
            titlePart1="A Tapestry of"
            italicPart="World Flavours"
            titlePart2="Under One Warm Roof"
            subtitle="Built to honor the bond of companions: an architectural dining sanctuary where diverse international and regional cuisines live in effortless harmony."
            watermark="STORY"
          />

          {/* Large Arch Feature Image with 3D Tilt */}
          <TiltCard
            maxTilt={6}
            className="w-full max-w-4xl mx-auto h-72 sm:h-96 mask-arch overflow-hidden border border-[#B8894B]/30 shadow-2xl mt-8"
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop"
              alt="Saathi Bhojan Dining Courtyard"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B100C]/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E8A317]">
                Architectural Dining Sanctuary
              </span>
              <p className="font-display italic text-lg sm:text-xl text-[#F5E9D4]">
                Hand-fired terracotta brickwork, glowing brass details, and spacious tables crafted for celebration
              </p>
            </div>
          </TiltCard>
        </div>

        <CurveDivider
          variant="convex"
          fromColor="#2A1812"
          toColor="#1B100C"
          height={60}
          flip={false}
        />
      </section>

      {/* 2. SCROLL-DRIVEN STACKING MILESTONES DECK */}
      <section className="py-20 px-6 sm:px-10 bg-[#241712] relative border-y border-[#B8894B]/20">
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

      {/* 3. OUR CULINARY STANDARDS (Quality Covenant) */}
      <QualityCovenant />

      <div className="relative -mt-1 z-20">
        <CurveDivider
          variant="wave"
          fromColor="#1B100C"
          toColor="#F5E9D4"
          height={60}
          flip={false}
        />
      </div>

      {/* 4. MEET THE KITCHEN MASTERS */}
      <section className="py-24 px-6 sm:px-10 bg-[#1B100C] relative">
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
