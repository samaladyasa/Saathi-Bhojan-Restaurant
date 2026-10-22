import React, { useState, useMemo, useRef, useEffect } from 'react'
import {
  Flame,
  Star,
  Search,
  Check,
  UtensilsCrossed,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import DishCard from '../components/DishCard'
import DishModal from '../components/DishModal'
import CurveDivider from '../components/CurveDivider'
import Button from '../components/Button'
import { CUISINES, MENU_ITEMS } from '../data/menu'

export default function Menu() {
  const [selectedCuisine, setSelectedCuisine] = useState('all')
  const [activeFilter, setActiveFilter] = useState('all') // 'all' | 'veg' | 'non-veg' | 'chef' | 'spicy'
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'row'
  const [activeDish, setActiveDish] = useState(null)

  const cuisineTrackRef = useRef(null)
  const isDraggingRef = useRef(false)
  const hasMovedRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  const scrollTrack = (direction) => {
    if (!cuisineTrackRef.current) return
    const offset = direction === 'left' ? -280 : 280
    cuisineTrackRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const selectCuisineAndScroll = (id, e) => {
    setSelectedCuisine(id)
    e?.currentTarget?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  // Non-passive wheel listener: vertical mouse wheel glides horizontally across the track
  useEffect(() => {
    const el = cuisineTrackRef.current
    if (!el) return

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > 0 && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const handleMouseDown = (e) => {
    if (e.button !== 0 || !cuisineTrackRef.current) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = e.pageX - cuisineTrackRef.current.offsetLeft
    scrollLeftRef.current = cuisineTrackRef.current.scrollLeft
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !cuisineTrackRef.current) return
    const x = e.pageX - cuisineTrackRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1.3
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true
    }
    cuisineTrackRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUp = () => {
    setTimeout(() => {
      isDraggingRef.current = false
      hasMovedRef.current = false
    }, 50)
  }

  const handleTouchStart = (e) => {
    if (!cuisineTrackRef.current) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = e.touches[0].pageX - cuisineTrackRef.current.offsetLeft
    scrollLeftRef.current = cuisineTrackRef.current.scrollLeft
  }

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !cuisineTrackRef.current) return
    const x = e.touches[0].pageX - cuisineTrackRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1.3
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true
    }
    cuisineTrackRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false
      hasMovedRef.current = false
    }, 50)
  }

  // Filtered Dishes
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Cuisine match
      if (selectedCuisine !== 'all' && item.cuisine !== selectedCuisine) return false

      // Dietary / Feature match
      if (activeFilter === 'veg' && !item.isVeg) return false
      if (activeFilter === 'non-veg' && item.isVeg) return false
      if (activeFilter === 'chef' && !item.isChefPick) return false
      if (activeFilter === 'spicy' && !item.isSpicy) return false

      // Search query match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesDesc = item.description.toLowerCase().includes(query)
        const matchesCuisine = item.cuisine.toLowerCase().includes(query)
        if (!matchesName && !matchesDesc && !matchesCuisine) return false
      }

      return true
    })
  }, [selectedCuisine, activeFilter, searchQuery])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pt-28 pb-0 relative overflow-hidden">
      {/* Soft Ambient Glow */}
      <div className="absolute top-20 left-1/3 w-[650px] h-[550px] rounded-full bg-[var(--primary)]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-16 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <SectionHeading
            eyebrow="The Grand Feast Ledger"
            titlePart1="Every Craving"
            italicPart="Celebrated"
            titlePart2="Across World Cuisines"
            subtitle="Explore artisan wood-fired Neapolitan pizzas, fiery Sichuan woks, succulent charcoal kebabs, Awadhi dum biryanis, and crisp southern dosas."
            watermark="MENU"
          />


        </div>

        {/* REFINED FILTER CONSOLE */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-5 sm:p-6 shadow-sm mb-8 space-y-5">
          {/* Top Row: Cuisine Selector Track */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
                Cuisine Traditions
              </span>
              <span className="font-mono text-[11px] text-[var(--primary)] font-medium hidden sm:inline">
                {CUISINES.find((c) => c.id === selectedCuisine)?.subtitle || 'Explore All Offerings'}
              </span>
            </div>

            {/* Horizontal Track flanked with smooth slide arrows */}
            <div className="relative flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack('left')}
                className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] hover:border-[var(--primary)] text-[var(--primary-dark)] flex items-center justify-center shadow-xs transition-all hover:scale-105 active:scale-95 shrink-0 z-10 cursor-pointer"
                aria-label="Slide cuisines left"
                title="Slide left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={cuisineTrackRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar pt-0.5 scroll-smooth cursor-grab active:cursor-grabbing w-full"
              >
                {CUISINES.map((c) => {
                  const isSelected = selectedCuisine === c.id
                  const count = c.id === 'all'
                    ? MENU_ITEMS.length
                    : MENU_ITEMS.filter((item) => item.cuisine === c.id).length
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={(e) => {
                        if (hasMovedRef.current) return
                        selectCuisineAndScroll(c.id, e)
                      }}
                      className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 select-none border shrink-0 ${
                        isSelected
                          ? 'bg-[var(--primary-dark)] text-[var(--bg)] font-semibold shadow-sm border-[var(--primary-dark)] scale-[1.02]'
                          : 'bg-transparent text-[var(--text)] hover:text-[var(--primary-dark)] hover:bg-[var(--bg-alt)]/60 border-[var(--border)]'
                      }`}
                    >
                      <span>{c.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                          isSelected
                            ? 'bg-[var(--accent)] text-[#1C2B22] font-bold'
                            : 'bg-[var(--bg-alt)] text-[var(--text-muted)]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollTrack('right')}
                className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] hover:border-[var(--primary)] text-[var(--primary-dark)] flex items-center justify-center shadow-xs transition-all hover:scale-105 active:scale-95 shrink-0 z-10 cursor-pointer"
                aria-label="Slide cuisines right"
                title="Slide right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-[1px] bg-[var(--border)]/70" />

          {/* Bottom Row: Dietary Preferences, Search Bar, and View Controls */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Dietary Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all select-none border ${
                  activeFilter === 'all'
                    ? 'bg-[var(--primary-dark)] text-[var(--bg)] font-semibold border-[var(--primary-dark)] shadow-sm'
                    : 'bg-transparent text-[var(--text)] hover:text-[var(--primary-dark)] border-[var(--border)] hover:bg-[var(--bg-alt)]/60'
                }`}
              >
                All Types
              </button>

              <button
                onClick={() => setActiveFilter('veg')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all select-none border ${
                  activeFilter === 'veg'
                    ? 'bg-emerald-700 text-white font-semibold border-emerald-800 shadow-sm'
                    : 'bg-transparent text-[var(--text)] hover:text-emerald-800 border-[var(--border)] hover:border-emerald-600/50 hover:bg-emerald-50/50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Pure Veg
              </button>

              <button
                onClick={() => setActiveFilter('non-veg')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all select-none border ${
                  activeFilter === 'non-veg'
                    ? 'bg-[#7C4A3A] text-white font-semibold border-[#62382A] shadow-sm'
                    : 'bg-transparent text-[var(--text)] hover:text-[#7C4A3A] border-[var(--border)] hover:border-[#7C4A3A]/50 hover:bg-[#7C4A3A]/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#9E5D4A]" />
                Non-Veg
              </button>

              <button
                onClick={() => setActiveFilter('chef')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all select-none border ${
                  activeFilter === 'chef'
                    ? 'bg-[var(--accent)] text-[#1C2B22] font-semibold border-[#C58B24] shadow-sm'
                    : 'bg-transparent text-[var(--text)] hover:text-[var(--primary-dark)] border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10'
                }`}
              >
                <Star className="w-3 h-3 text-[var(--accent)] fill-current" />
                Chef's Pick
              </button>

              <button
                onClick={() => setActiveFilter('spicy')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all select-none border ${
                  activeFilter === 'spicy'
                    ? 'bg-[#A33B26] text-white font-semibold border-[#852C1A] shadow-sm'
                    : 'bg-transparent text-[var(--text)] hover:text-[#A33B26] border-[var(--border)] hover:border-[#A33B26]/50 hover:bg-[#A33B26]/10'
                }`}
              >
                <Flame className="w-3 h-3 text-[#A33B26]" />
                Spicy
              </button>
            </div>

            {/* Right: Search, Clear Link & View Mode Toggle */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dish or ingredient..."
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-full py-1.5 pl-9 pr-7 text-xs font-mono text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--primary-dark)]"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Clear Link when active */}
              {(selectedCuisine !== 'all' || activeFilter !== 'all' || searchQuery.trim() !== '') && (
                <button
                  onClick={() => {
                    setSelectedCuisine('all')
                    setActiveFilter('all')
                    setSearchQuery('')
                  }}
                  className="text-xs font-mono text-[var(--accent)] hover:underline whitespace-nowrap px-1"
                >
                  Clear all
                </button>
              )}

              {/* Grid / Row View Toggle */}
              <div className="flex items-center border border-[var(--border)] rounded-full p-0.5 bg-[var(--bg)] shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[var(--primary-dark)] text-[var(--bg)] shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--primary-dark)]'
                  }`}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('row')}
                  className={`p-1.5 rounded-full transition-all ${
                    viewMode === 'row'
                      ? 'bg-[var(--primary-dark)] text-[var(--bg)] shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--primary-dark)]'
                  }`}
                  aria-label="Row view"
                  title="Row view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Filter Result Header */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="font-mono text-xs text-[var(--text-muted)]">
            Showing <strong className="text-[var(--primary-dark)]">{filteredDishes.length}</strong> {filteredDishes.length === 1 ? 'creation' : 'creations'}
          </div>
        </div>

        {/* 3. DISHES DISPLAY */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 bg-[var(--surface)] border border-[var(--border)] rounded-3xl max-w-md mx-auto p-8 shadow-sm">
            <UtensilsCrossed className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
            <h4 className="font-display text-xl text-[var(--primary-dark)]">No dishes match your filter</h4>
            <p className="font-body text-xs text-[var(--text-muted)] mt-1 mb-5">
              Try selecting another cuisine or clearing the search query.
            </p>
            <Button
              onClick={() => {
                setSelectedCuisine('all')
                setActiveFilter('all')
                setSearchQuery('')
              }}
              variant="brass"
              className="!text-xs !py-2"
            >
              <span>View All Offerings</span>
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                variant="card"
                onClick={setActiveDish}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-1">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                variant="row"
                onClick={setActiveDish}
              />
            ))}
          </div>
        )}
      </div>

      {/* CURVED SECTION DIVIDER: Menu Grid (--bg) to Dietary Covenant (--bg-alt) */}
      <CurveDivider
        variant="wave"
        fromColor="var(--bg-alt)"
        toColor="var(--bg)"
        height={96}
        className="-mt-1 relative z-10"
      />

      {/* Culinary Covenant & Reservation Callout (--bg-alt) */}
      <section className="pt-8 sm:pt-12 pb-20 px-6 sm:px-10 bg-[var(--bg-alt)] relative">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--primary-dark)] font-semibold">
            Dietary Integrity & Companion Care
          </span>
          <h3 className="font-display italic text-2xl sm:text-3xl text-[var(--primary-dark)]">
            Gourmet Non-Veg Delicacies & Dedicated Pure Veg / Jain Kitchen Lines
          </h3>
          <p className="font-body text-sm text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            From smoky charcoal tandoori meats, succulent seafood, and artisan poultry to strictly separated Pure Vegetarian, Jain, and Gluten-Mindful cookware stations — every single dish is prepared fresh with zero synthetic colors and uncompromising kitchen integrity.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Button to="/reserve" variant="ember" cursorLabel="Reserve">
              <span>Reserve a Table for This Feast</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Dish Modal */}
      {activeDish && <DishModal dish={activeDish} onClose={() => setActiveDish(null)} />}
    </div>
  )
}
