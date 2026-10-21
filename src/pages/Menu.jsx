import React, { useState, useMemo } from 'react'
import {
  Download,
  Flame,
  Star,
  Search,
  Check,
  UtensilsCrossed,
  LayoutGrid,
  List,
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
    <div className="min-h-screen bg-[#130D0B] text-[#F5E9D4] pt-28 pb-20 relative overflow-hidden">
      {/* Soft Candlelit Ambient Glow */}
      <div className="absolute top-20 left-1/3 w-[650px] h-[550px] rounded-full bg-amber-600/6 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
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

          {/* PDF Download Banner */}
          <div className="pt-2 flex justify-center">
            <Button
              onClick={() => alert('Downloading Saathi Bhojan Menu PDF (Placeholder)...')}
              variant="brass"
              className="!text-xs !py-2.5 !px-5"
              cursorLabel="Download"
              icon={Download}
            >
              <span>Download Full Menu (PDF)</span>
            </Button>
          </div>
        </div>

        {/* 1. CUISINE SELECTOR CHIPS */}
        <div className="relative mb-8 pb-4 border-b border-[#B8894B]/20">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CUISINES.map((c) => {
              const isSelected = selectedCuisine === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCuisine(c.id)}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 select-none border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#B45309] to-[#C2410C] text-[#FFF] font-bold shadow-lg shadow-black/40 scale-105 border-[#E5B869]'
                      : 'bg-[#1E1410] text-[#F5E9D4]/80 hover:text-[#FFF] hover:bg-[#281A14] border-[#B8894B]/25 hover:border-[#E5B869]/60'
                  }`}
                  data-cursor="Select"
                >
                  <span>{c.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. SUB-FILTERS & SEARCH BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Dietary Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all select-none ${
                activeFilter === 'all'
                  ? 'bg-[#E5B869] text-[#130D0B] font-bold shadow-md shadow-black/30'
                  : 'bg-[#1E1410] text-[#F5E9D4]/75 hover:text-[#F5E9D4] border border-[#B8894B]/30'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setActiveFilter('veg')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all select-none ${
                activeFilter === 'veg'
                  ? 'bg-emerald-700 text-white font-bold shadow-md shadow-emerald-700/30 border border-emerald-500'
                  : 'bg-[#1E1410] text-[#F5E9D4]/75 hover:text-[#F5E9D4] border border-emerald-500/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Pure Veg
            </button>
            <button
              onClick={() => setActiveFilter('non-veg')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all select-none ${
                activeFilter === 'non-veg'
                  ? 'bg-rose-800 text-white font-bold shadow-md shadow-rose-800/30 border border-rose-500'
                  : 'bg-[#1E1410] text-[#F5E9D4]/75 hover:text-[#F5E9D4] border border-rose-500/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              Non-Veg
            </button>
            <button
              onClick={() => setActiveFilter('chef')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all select-none ${
                activeFilter === 'chef'
                  ? 'bg-[#D97706] text-white font-bold shadow-md shadow-amber-500/30 border border-[#E5B869]'
                  : 'bg-[#1E1410] text-[#F5E9D4]/75 hover:text-[#F5E9D4] border border-[#B8894B]/30'
              }`}
            >
              <Star className="w-3 h-3 text-[#E5B869] fill-current" />
              Chef's Pick
            </button>
            <button
              onClick={() => setActiveFilter('spicy')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all select-none ${
                activeFilter === 'spicy'
                  ? 'bg-[#B91C1C] text-white font-bold shadow-md shadow-red-700/30 border border-red-500'
                  : 'bg-[#1E1410] text-[#F5E9D4]/75 hover:text-[#F5E9D4] border border-red-500/30'
              }`}
            >
              <Flame className="w-3 h-3 text-red-400 fill-current" />
              Spicy
            </button>
          </div>

          {/* Search Input & Grid/Row Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-[#B8894B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish or ingredient..."
                className="w-full bg-[#1E1410] border border-[#B8894B]/30 rounded-full py-1.5 pl-9 pr-4 text-xs font-mono text-[#F5E9D4] placeholder-[#F5E9D4]/40 focus:outline-none focus:border-[#E5B869]"
              />
            </div>

            <div className="flex items-center border border-[#B8894B]/30 rounded-full p-0.5 bg-[#1E1410]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full ${viewMode === 'grid' ? 'bg-[#B8894B] text-[#130D0B] font-bold' : 'text-[#F5E9D4]/60'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('row')}
                className={`p-1.5 rounded-full ${viewMode === 'row' ? 'bg-[#B8894B] text-[#1B100C]' : 'text-[#F5E9D4]/60'}`}
                aria-label="Row view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. DISHES DISPLAY */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 bg-[#2A1812]/50 border border-[#B8894B]/20 rounded-2xl max-w-md mx-auto">
            <UtensilsCrossed className="w-10 h-10 text-[#B8894B]/50 mx-auto mb-3" />
            <h4 className="font-display text-xl text-[#F5E9D4]">No dishes match your filter</h4>
            <p className="font-body text-xs text-[#F5E9D4]/60 mt-1">
              Try selecting another cuisine or clearing the search query.
            </p>
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
          <div className="bg-[#2A1812]/40 border border-[#B8894B]/25 rounded-2xl p-6 sm:p-8 space-y-1">
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

      {/* Dish Modal */}
      {activeDish && <DishModal dish={activeDish} onClose={() => setActiveDish(null)} />}
    </div>
  )
}
