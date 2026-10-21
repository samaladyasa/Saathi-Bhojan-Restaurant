import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Utensils,
  UtensilsCrossed,
  ArrowRight,
  Flame,
  Star,
  Users,
  Sparkles,
  HeartHandshake,
  ChevronRight,
  ChevronLeft,
  Pizza,
  Soup,
  CookingPot,
  Coffee,
  Fish,
  Cake,
  Salad,
  Crown,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import DishModal from '../components/DishModal'
import Embers from '../components/Embers'
import Button from '../components/Button'
import TiltCard from '../components/TiltCard'
import ManifestoScrub from '../components/ManifestoScrub'
import PinnedDishesShowcase from '../components/PinnedDishesShowcase'
import LogoLoop from '../components/LogoLoop'
import HeroFood3DCarousel from '../components/HeroFood3DCarousel'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import { SITE_CONFIG } from '../data/site'
import { MENU_ITEMS } from '../data/menu'

gsap.registerPlugin(ScrollTrigger)

const CUISINE_LOGOS = [
  {
    title: 'Wood-Fired Neapolitan',
    href: '/menu',
    hoverColor: '#E5B869',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#E5B869] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <Pizza className="w-6 h-6 text-[#E5B869]" />
      </div>
    ),
  },
  {
    title: 'Pan-Asian Wok & Dim Sum',
    href: '/menu',
    hoverColor: '#D97706',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#E28743] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <Soup className="w-6 h-6 text-[#E28743]" />
      </div>
    ),
  },
  {
    title: 'Awadhi & Lucknowi Dum',
    href: '/menu',
    hoverColor: '#F59E0B',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#FBBF24] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <Crown className="w-6 h-6 text-[#FBBF24]" />
      </div>
    ),
  },
  {
    title: 'Acacia Charcoal Tandoor',
    href: '/menu',
    hoverColor: '#EA580C',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#EA580C] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <Flame className="w-6 h-6 text-[#EA580C]" />
      </div>
    ),
  },
  {
    title: 'South Indian Ghee Tiffins',
    href: '/menu',
    hoverColor: '#D97706',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#D97706] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <Coffee className="w-6 h-6 text-[#D97706]" />
      </div>
    ),
  },
  {
    title: 'Coastal Malabar Seafood',
    href: '/menu',
    hoverColor: '#38BDF8',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#38BDF8] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <Fish className="w-6 h-6 text-[#38BDF8]" />
      </div>
    ),
  },
  {
    title: 'Continental Herb Steaks',
    href: '/menu',
    hoverColor: '#EAD6B4',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#EAD6B4] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <UtensilsCrossed className="w-6 h-6 text-[#EAD6B4]" />
      </div>
    ),
  },
  {
    title: 'Pure Vegetarian Rasoi',
    href: '/menu',
    hoverColor: '#34D399',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#34D399] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <Salad className="w-6 h-6 text-[#34D399]" />
      </div>
    ),
  },
  {
    title: 'Slow Handi Simmered Curries',
    href: '/menu',
    hoverColor: '#F59E0B',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#F59E0B] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <CookingPot className="w-6 h-6 text-[#F59E0B]" />
      </div>
    ),
  },
  {
    title: 'Artisanal Dolci & Gelato',
    href: '/menu',
    hoverColor: '#C084FC',
    node: (
      <div className="w-12 h-12 rounded-full bg-[#1E1410] border border-[#B8894B]/40 hover:border-[#E5B869] flex items-center justify-center text-[#C084FC] shadow-md shadow-black/50 transition-all hover:bg-[#281A14] hover:scale-105">
        <Cake className="w-6 h-6 text-[#C084FC]" />
      </div>
    ),
  },
]


export default function Home() {
  const [activeDish, setActiveDish] = useState(null)
  const signatureDishes = MENU_ITEMS.filter((i) => i.isChefPick).slice(0, 8)
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Buttery smooth Hero entrance animation
      const heroItems = heroRef.current?.querySelectorAll('.hero-anim')
      if (heroItems?.length) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative overflow-hidden bg-[#130D0B] text-[#F5E9D4]">
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 sm:px-10 overflow-hidden">
        {/* Soft Candlelit Ambient Glow (Refined & Subtle) */}
        <div className="absolute top-10 left-1/4 w-[650px] h-[550px] rounded-full bg-gradient-to-br from-amber-600/10 via-[#B8894B]/5 to-transparent blur-[140px] pointer-events-none" />

        {/* Ambient Embers with Cursor Repulsion */}
        <Embers count={28} />

        {/* Latin Luxury Watermark */}
        <div className="watermark-text text-[18vw] top-1/4 left-1/2 -translate-x-1/2 text-[#B8894B]/10">
          SAATHI
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
          {/* Left Column: Editorial Headline & Subcopy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B8894B]/35 bg-[#20140F]/85 backdrop-blur-md shadow-md shadow-black/40">
              <span className="w-2 h-2 rounded-full bg-[#E5B869] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#EAD6B4] font-medium">
                Multi-Cuisine Dining Destination
              </span>
            </div>

            <h1 className="hero-anim font-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl tracking-tight leading-[1.08] text-[#F5E9D4]">
              Where every{' '}
              <span className="italic font-normal text-[#E5B869]">
                companion
              </span>{' '}
              finds their favorite cuisine.
            </h1>

            <p className="hero-anim font-body text-base sm:text-xl text-[#F5E9D4]/80 max-w-xl leading-relaxed">
              From artisan wood-fired Neapolitan pizzas and fiery Sichuan wok noodles to royal Lucknowi dum biryanis, acacia-charred kebabs, and crisp golden dosas. One joyous table, zero compromises.
            </p>

            <div className="hero-anim flex flex-wrap items-center gap-4 pt-3">
              <Button to="/reserve" variant="ember" cursorLabel="Reserve">
                <Utensils className="w-4 h-4 text-[#F5E9D4]" />
                <span>Save Your Table</span>
              </Button>
              <Button to="/menu" variant="brass" cursorLabel="Explore">
                <span>View Full Menu</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Frameless 3D Sliding Food Carousel (No Card Box) */}
          <div className="lg:col-span-5 relative flex justify-center items-center hero-anim">
            <HeroFood3DCarousel />
          </div>
        </div>

      </section>

      {/* 2. CUISINE LOGO LOOP MARQUEE (Refined Luxury Bronze & Gold Medallions) */}
      <section className="bg-[#19110D] py-5 border-y border-[#B8894B]/20 overflow-hidden relative select-none">
        <LogoLoop
          logos={CUISINE_LOGOS}
          speed={55}
          direction="left"
          logoHeight={48}
          gap={52}
          labels="none"
          scaleOnHover={true}
          hoverSpeed={0}
          fadeOut={true}
          fadeOutWidth={0.15}
          draggable={true}
          scrollBoost={0.25}
          ariaLabel="World Cuisines of Saathi Bhojan"
        />
      </section>

      {/* 3. MANIFESTO SECTION (Scroll Scrub Word-by-Word Reveal) */}
      <section className="py-24 px-6 sm:px-12 bg-[#1B100C] relative">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <SectionHeading
            eyebrow="The Dining Manifesto"
            titlePart1="A table for the connoisseur,"
            italicPart="a feast for the family,"
            titlePart2="a seat for everyone."
            watermark="GATHER"
          />

          {/* Dynamic Scroll Scrubbing Manifesto */}
          <ManifestoScrub />

          <div className="pt-6 flex justify-center">
            <Button to="/about" variant="brass" cursorLabel="Story">
              <span>Read Our Culinary Story</span>
            </Button>
          </div>
        </div>

      </section>

      {/* 4. PINNED SIGNATURE DISHES SHOWCASE (ScrollTrigger Pin + Scrub) */}
      <PinnedDishesShowcase
        dishes={signatureDishes}
        onSelectDish={setActiveDish}
      />

      {/* 5. EXPERIENCE PILLARS (Refined Luxury Obsidian & Bronze Plaques) */}
      <section className="py-24 px-6 sm:px-10 bg-[#130D0B] relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Our Sacred Pillars"
            titlePart1="The Standards of"
            italicPart="Saathi"
            titlePart2="Dining"
            subtitle="Four guiding standards honored every day across our specialty kitchen stations."
            watermark="PILLARS"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {SITE_CONFIG.pillars.map((pillar) => (
              <TiltCard
                key={pillar.id}
                maxTilt={8}
                className="group relative bg-[#1E1410] border border-[#B8894B]/30 hover:border-[#E5B869] rounded-2xl p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B8894B]/10"
              >
                <div className="font-mono text-xs text-[#E5B869] mb-4 flex items-center justify-between">
                  <span>PILLAR {pillar.num}</span>
                  <span className="text-[#E5B869]">◆</span>
                </div>
                <h3 className="font-display text-xl text-[#F5E9D4] group-hover:text-[#E5B869] transition-colors mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#F5E9D4]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS AUTO-SLIDING CAROUSEL (Intimate Midnight Mahogany & Gold) */}
      <section className="py-20 px-6 sm:px-10 bg-[#18100C] border-t border-[#B8894B]/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeading
            eyebrow="Echoes from the Table"
            titlePart1="Words of"
            italicPart="Togetherness"
            titlePart2=""
            subtitle="Honest reflections from travelers, family gatherings, and companion dinners."
            watermark="VOICES"
          />

          <TestimonialsCarousel />
        </div>
      </section>

      {/* 7. RESERVATION CTA BAND (Deep Royal Botanical Forest Velvet & Warm Gold) */}
      <section className="relative py-20 px-6 sm:px-10 bg-gradient-to-r from-[#0C2419] via-[#123324] to-[#0E281C] text-[#F5E9D4] overflow-hidden border-t border-[#1D4A34]">
        {/* Floating Embers in Forest Night */}
        <Embers count={24} />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#E5B869] bg-[#0A1D14]/80 px-4 py-1.5 rounded-full border border-[#1D4A34]">
            <span>✦ ATITHI DEVO BHAVA ✦</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F5E9D4] tracking-tight">
            Bring your <span className="italic text-[#E5B869]">companions</span>. We have saved a seat.
          </h2>

          <p className="font-body text-base sm:text-lg text-[#F5E9D4]/80 max-w-xl mx-auto leading-relaxed">
            Whether a joyful anniversary, weekend family celebration, or an intimate dinner with world-class cuisines, our hearth is ready.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              to="/reserve"
              variant="ember"
              className="!bg-[#E5B869] !text-[#130D0B] !font-bold hover:!bg-[#F5E9D4] !shadow-xl !shadow-black/50"
              cursorLabel="Reserve"
            >
              <Utensils className="w-4 h-4 text-[#130D0B]" />
              <span>Reserve Table Online</span>
            </Button>
            <Button
              href={SITE_CONFIG.socials.whatsapp}
              variant="brass"
              className="!border-[#E5B869]/50 !text-[#F5E9D4] hover:!bg-[#E5B869]/15 !transition-all"
              cursorLabel="WhatsApp"
            >
              <span>Instant WhatsApp Booking</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Dish Details Modal */}
      {activeDish && <DishModal dish={activeDish} onClose={() => setActiveDish(null)} />}
    </div>
  )
}
