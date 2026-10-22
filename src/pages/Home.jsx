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
import CurveDivider from '../components/CurveDivider'
import { SITE_CONFIG } from '../data/site'
import { MENU_ITEMS } from '../data/menu'

gsap.registerPlugin(ScrollTrigger)

const CUISINE_LOGOS = [
  {
    title: 'Wood-Fired Neapolitan',
    href: '/menu',
    hoverColor: '#7E9C7A',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--primary-dark)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <Pizza className="w-6 h-6 text-[var(--primary-dark)]" />
      </div>
    ),
  },
  {
    title: 'Pan-Asian Wok & Dim Sum',
    href: '/menu',
    hoverColor: '#2F4A3A',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--primary-dark)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <Soup className="w-6 h-6 text-[var(--primary-dark)]" />
      </div>
    ),
  },
  {
    title: 'Awadhi & Lucknowi Dum',
    href: '/menu',
    hoverColor: '#E0A030',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--accent)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <Crown className="w-6 h-6 text-[var(--accent)]" />
      </div>
    ),
  },
  {
    title: 'Acacia Charcoal Tandoor',
    href: '/menu',
    hoverColor: '#7E9C7A',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--primary-dark)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <Flame className="w-6 h-6 text-[var(--primary-dark)]" />
      </div>
    ),
  },
  {
    title: 'South Indian Ghee Tiffins',
    href: '/menu',
    hoverColor: '#E0A030',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--accent)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <Coffee className="w-6 h-6 text-[var(--accent)]" />
      </div>
    ),
  },
  {
    title: 'Coastal Malabar Seafood',
    href: '/menu',
    hoverColor: '#7E9C7A',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--primary-dark)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <Fish className="w-6 h-6 text-[var(--primary-dark)]" />
      </div>
    ),
  },
  {
    title: 'Continental Herb Steaks',
    href: '/menu',
    hoverColor: '#2F4A3A',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--primary-dark)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <UtensilsCrossed className="w-6 h-6 text-[var(--primary-dark)]" />
      </div>
    ),
  },
  {
    title: 'Pure Vegetarian Rasoi',
    href: '/menu',
    hoverColor: '#7E9C7A',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--primary)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <Salad className="w-6 h-6 text-[var(--primary)]" />
      </div>
    ),
  },
  {
    title: 'Slow Handi Simmered Curries',
    href: '/menu',
    hoverColor: '#E0A030',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--accent)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <CookingPot className="w-6 h-6 text-[var(--accent)]" />
      </div>
    ),
  },
  {
    title: 'Artisanal Dolci & Gelato',
    href: '/menu',
    hoverColor: '#2F4A3A',
    node: (
      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--primary-dark)] shadow-sm transition-all hover:bg-[var(--bg)] hover:scale-105">
        <Cake className="w-6 h-6 text-[var(--primary-dark)]" />
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
    <div className="relative overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* 1. HERO SECTION (--bg) */}
      <section ref={heroRef} className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 sm:px-10 overflow-hidden bg-[var(--bg)]">
        {/* Soft Ambient Hearth Glow */}
        <div className="absolute top-10 left-1/4 w-[650px] h-[550px] rounded-full bg-gradient-to-br from-[var(--primary)]/15 via-[var(--bg-alt)]/25 to-transparent blur-[140px] pointer-events-none" />

        {/* Ambient Embers */}
        <Embers count={28} />

        {/* Watermark */}
        <div className="watermark-text text-[18vw] top-1/4 left-1/2 -translate-x-1/2 text-[var(--primary)]/[0.07]">
          SAATHI
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
          {/* Left Column: Editorial Headline & Subcopy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary-dark)] font-medium">
                Multi-Cuisine Dining Destination
              </span>
            </div>

            <h1 className="hero-anim font-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl tracking-tight leading-[1.08] text-[var(--primary-dark)]">
              Where every{' '}
              <span className="italic font-normal text-[var(--primary)]">
                companion
              </span>{' '}
              finds their favorite cuisine.
            </h1>

            <p className="hero-anim font-body text-base sm:text-xl text-[var(--text)] max-w-xl leading-relaxed">
              From artisan wood-fired Neapolitan pizzas and fiery Sichuan wok noodles to royal Lucknowi dum biryanis, acacia-charred kebabs, and crisp golden dosas. One joyous table, zero compromises.
            </p>

            <div className="hero-anim flex flex-wrap items-center gap-4 pt-3">
              <Button to="/reserve" variant="ember" cursorLabel="Reserve">
                <Utensils className="w-4 h-4 text-[#1C2B22]" />
                <span>Save Your Table</span>
              </Button>
              <Button to="/menu" variant="brass" cursorLabel="Explore">
                <span>View Full Menu</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Frameless 3D Sliding Food Carousel */}
          <div className="lg:col-span-5 relative flex justify-center items-center hero-anim">
            <HeroFood3DCarousel />
          </div>
        </div>

      </section>

      {/* 2. CUISINE LOGO LOOP MARQUEE (--bg-alt) */}
      <section className="bg-[var(--bg-alt)] py-5 border-y border-[var(--border)] overflow-hidden relative select-none">
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

      {/* 3. MANIFESTO SECTION (--bg) */}
      <section className="py-24 px-6 sm:px-12 bg-[var(--bg)] relative">
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

      {/* CURVED SECTION DIVIDER: Manifesto (--bg) to Pinned Dishes (--bg-alt) */}
      <CurveDivider
        variant="wave"
        fromColor="var(--bg-alt)"
        toColor="var(--bg)"
        height={96}
        className="-mt-1 relative z-10"
      />

      {/* 4. PINNED SIGNATURE DISHES SHOWCASE (--bg-alt) */}
      <PinnedDishesShowcase
        dishes={signatureDishes}
        onSelectDish={setActiveDish}
      />

      {/* CURVED SECTION DIVIDER: Pinned Dishes (--bg-alt) to Experience Pillars (--bg) */}
      <CurveDivider
        variant="convex"
        fromColor="var(--bg)"
        toColor="var(--bg-alt)"
        height={96}
        className="-mt-1 relative z-10"
      />

      {/* 5. EXPERIENCE PILLARS (--bg) */}
      <section className="pt-10 sm:pt-14 pb-24 px-6 sm:px-10 bg-[var(--bg)] relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Our Sacred Standards"
            titlePart1="The Standards of"
            italicPart="Saathi"
            titlePart2="Dining"
            subtitle="Four guiding standards honored every day across our specialty kitchen stations."
            watermark="STANDARDS"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {SITE_CONFIG.pillars.map((pillar) => (
              <TiltCard
                key={pillar.id}
                maxTilt={8}
                className="group relative bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--footer)]/10 hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Glowing Shimmer Line */}
                <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="mb-4 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[var(--bg-alt)] text-[var(--primary-dark)] group-hover:bg-[var(--accent)] group-hover:text-[#1C2B22] transition-colors duration-300">
                    {pillar.num}
                  </span>
                </div>
                <h3 className="font-display text-xl text-[var(--primary-dark)] group-hover:text-[var(--primary)] transition-colors mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                  {pillar.description}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CURVED SECTION DIVIDER: Experience Pillars (--bg) to Testimonials (--bg-alt) */}
      <CurveDivider
        variant="wave"
        mirror={true}
        fromColor="var(--bg-alt)"
        toColor="var(--bg)"
        height={96}
        className="-mt-1 relative z-10"
      />

      {/* 6. TESTIMONIALS AUTO-SLIDING CAROUSEL (--bg-alt) */}
      <section className="pt-8 sm:pt-12 pb-20 px-6 sm:px-10 bg-[var(--bg-alt)] relative overflow-hidden">
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

      {/* CURVED SECTION DIVIDER: Testimonials (--bg-alt) to Reservation CTA (--footer) */}
      <CurveDivider
        variant="curve"
        fromColor="var(--footer)"
        toColor="var(--bg-alt)"
        height={96}
        className="-mt-1 relative z-10"
      />

      {/* 7. RESERVATION CTA BAND (--footer) */}
      <section className="relative pt-12 pb-20 px-6 sm:px-10 bg-[var(--footer)] text-[var(--bg)] overflow-hidden">
        {/* Floating Embers in Midnight Green Night */}
        <Embers count={24} />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)] bg-[#24352B] px-4 py-1.5 rounded-full border border-[var(--primary-dark)]">
            <span>ATITHI DEVO BHAVA</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[var(--bg)] tracking-tight">
            Bring your <span className="italic text-[var(--accent)]">companions</span>. We have saved a seat.
          </h2>

          <p className="font-body text-base sm:text-lg text-[var(--bg)]/85 max-w-xl mx-auto leading-relaxed">
            Whether a joyful anniversary, weekend family celebration, or an intimate dinner with world-class cuisines, our hearth is ready.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              to="/reserve"
              variant="ember"
              className="!bg-[var(--accent)] !text-[#1C2B22] !font-bold hover:!bg-[var(--bg)] !shadow-xl !shadow-black/25"
              cursorLabel="Reserve"
            >
              <Utensils className="w-4 h-4 text-[#1C2B22]" />
              <span>Reserve Table Online</span>
            </Button>
            <Button
              href={SITE_CONFIG.socials.whatsapp}
              variant="brass"
              className="!border-[var(--border)]/60 !text-[var(--bg)] hover:!bg-[var(--primary-dark)] hover:!text-[var(--bg)] !transition-all"
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
