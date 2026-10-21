import React, { useState, useEffect } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Plus,
  Minus,
  CheckCircle,
  Calendar,
  Send,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Accordion from '../components/Accordion'
import TiltCard from '../components/TiltCard'
import Button from '../components/Button'
import { SITE_CONFIG } from '../data/site'

export default function Contact() {
  // Live Open / Closed state
  const [isOpenNow, setIsOpenNow] = useState(true)

  useEffect(() => {
    // Current Indian Standard Time calculation
    const now = new Date()
    const hours = now.getHours()
    // Open lunch 12-15:30 (12-15) & dinner 18:30-23 (18-23)
    const isLunch = hours >= 12 && hours < 16
    const isDinner = hours >= 18 && hours < 23
    setIsOpenNow(isLunch || isDinner)
  }, [])

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '19:30',
    guests: 4,
    occasion: 'Family Dinner',
    message: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleGuestChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.max(1, Math.min(30, prev.guests + delta)),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#1B100C] text-[#F5E9D4] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHeading
          eyebrow="Table Reservations & Coordinates"
          titlePart1="Come,"
          italicPart="Sit With Us"
          titlePart2="This Evening"
          subtitle="Reserve your family table in advance or drop by our lantern-lit courtyard."
          watermark="RESERVE"
        />

        {/* Split Layout: Coordinates Left, Reservation Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* LEFT: Coordinates, Live Status, Hours, Map */}
          <div className="lg:col-span-5 space-y-8">
            {/* Live Open / Closed Pulse Badge */}
            <TiltCard
              maxTilt={6}
              className="p-6 rounded-2xl bg-[#2A1812] border border-[#B8894B]/30 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#B8894B]">
                  Hearth Status
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                    }`}
                  />
                  <span className="font-mono text-xs uppercase font-medium text-[#F5E9D4]">
                    {isOpenNow ? 'Open Now (Welcoming Guests)' : 'Kitchen Closed Now'}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#B8894B]/20 pt-4 space-y-2 text-sm font-body">
                <p className="flex items-center justify-between">
                  <span className="text-[#F5E9D4]/70">Lunch Service:</span>
                  <span className="font-mono text-[#E8A317]">{SITE_CONFIG.hours.lunch}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-[#F5E9D4]/70">Dinner Service:</span>
                  <span className="font-mono text-[#E8A317]">{SITE_CONFIG.hours.dinner}</span>
                </p>
                <p className="flex items-center justify-between text-xs text-[#B8894B]">
                  <span>Operational Days:</span>
                  <span>{SITE_CONFIG.hours.days}</span>
                </p>
              </div>
            </TiltCard>

            {/* Address & Quick WhatsApp */}
            <TiltCard
              maxTilt={6}
              className="p-6 rounded-2xl bg-[#2A1812] border border-[#B8894B]/30 space-y-4 shadow-xl"
            >
              <h3 className="font-display text-xl text-[#F5E9D4] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#E8A317]" />
                Main Dining Sanctuary
              </h3>
              <p className="text-sm font-body text-[#F5E9D4]/80 leading-relaxed">
                {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2}, {SITE_CONFIG.address.district}, {SITE_CONFIG.address.state} — {SITE_CONFIG.address.pin}
              </p>

              <div className="pt-2 flex flex-col gap-2 font-mono text-xs">
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="flex items-center gap-2 text-[#EAD6B4] hover:text-[#E8A317] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#B8894B]" />
                  <span>Call Us: {SITE_CONFIG.contact.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-2 text-[#EAD6B4] hover:text-[#E8A317] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#B8894B]" />
                  <span>Email: {SITE_CONFIG.contact.email}</span>
                </a>
              </div>

              <div className="pt-3">
                <Button
                  href={SITE_CONFIG.socials.whatsapp}
                  variant="brass"
                  className="w-full justify-center !py-2.5 text-xs font-mono"
                  cursorLabel="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Instant WhatsApp Reservation</span>
                </Button>
              </div>
            </TiltCard>

            {/* Arch-Framed Google Maps Preview */}
            <div className="relative h-56 rounded-2xl overflow-hidden border border-[#B8894B]/30 mask-arch bg-[#2A1812]">
              <iframe
                title="Saathi Bhojan Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114838639598!2d77.2167!3d28.6289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b027d109%3A0x10344d21e06c28f5!2sCentral%20Promenade!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
              />
              <div className="absolute bottom-3 right-3">
                <a
                  href={SITE_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-[#1B100C]/90 text-[11px] font-mono text-[#E8A317] border border-[#B8894B]/40 hover:bg-[#E8A317] hover:text-[#1B100C] transition-colors"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Table Reservation Form */}
          <div className="lg:col-span-7 bg-[#2A1812] border border-[#B8894B]/35 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            {isSubmitted ? (
              /* Success State with Lamp Glow */
              <div className="text-center py-16 space-y-6 animate-scaleUp">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#C4532B]/20 border border-[#E8A317] flex items-center justify-center text-[#E8A317] shadow-[0_0_30px_rgba(232,163,23,0.4)]">
                  <Sparkles className="w-10 h-10 animate-pulse" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#F5E9D4]">
                  Your Table Awaits, Companion.
                </h3>
                <p className="font-body text-base text-[#F5E9D4]/80 max-w-md mx-auto leading-relaxed">
                  Namaste, <strong className="text-[#E8A317]">{formData.name}</strong>! We have reserved your seat for <strong className="text-[#E8A317]">{formData.guests} guests</strong> on <strong className="text-[#E8A317]">{formData.date || 'Today'}</strong> at <strong className="text-[#E8A317]">{formData.time}</strong>.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="brass"
                    className="!text-xs"
                  >
                    Modify Reservation
                  </Button>
                  <Button
                    href={`https://wa.me/919876543210?text=Hello%20Saathi%20Bhojan,%20I%20have%20booked%20for%20${formData.name}%20(${formData.guests}%20guests)%20on%20${formData.date}%20at%20${formData.time}`}
                    variant="ember"
                    className="!text-xs"
                    cursorLabel="WhatsApp"
                  >
                    Confirm via WhatsApp
                  </Button>
                </div>
              </div>
            ) : (
              /* Reservation Input Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E8A317]">
                    Atithi Seva Form
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#F5E9D4] mt-1">
                    Save Your Seat At The Hearth
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#B8894B]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra Malhotra"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-[#1B100C] border border-[#B8894B]/30 rounded-xl py-2.5 px-4 text-sm font-body text-[#F5E9D4] focus:outline-none focus:border-[#E8A317]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#B8894B]">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-[#1B100C] border border-[#B8894B]/30 rounded-xl py-2.5 px-4 text-sm font-body text-[#F5E9D4] focus:outline-none focus:border-[#E8A317]"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#B8894B]">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-[#1B100C] border border-[#B8894B]/30 rounded-xl py-2.5 px-4 text-sm font-body text-[#F5E9D4] focus:outline-none focus:border-[#E8A317]"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-1">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#B8894B]">
                      Seating Time *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-[#1B100C] border border-[#B8894B]/30 rounded-xl py-2.5 px-4 text-sm font-body text-[#F5E9D4] focus:outline-none focus:border-[#E8A317]"
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="14:30">02:30 PM (Lunch)</option>
                      <option value="19:00">07:00 PM (Dinner)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Dinner)</option>
                    </select>
                  </div>
                </div>

                {/* Guest Count Stepper */}
                <div className="p-4 rounded-xl bg-[#1B100C] border border-[#B8894B]/30 flex items-center justify-between">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#B8894B] block">
                      Number of Companions
                    </label>
                    <span className="text-xs text-[#F5E9D4]/60">
                      Including children & elders
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleGuestChange(-1)}
                      className="w-8 h-8 rounded-full border border-[#B8894B]/40 flex items-center justify-center hover:bg-[#E8A317] hover:text-[#1B100C] transition-colors"
                      aria-label="Decrease guests"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xl font-bold text-[#E8A317] w-6 text-center">
                      {formData.guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleGuestChange(1)}
                      className="w-8 h-8 rounded-full border border-[#B8894B]/40 flex items-center justify-center hover:bg-[#E8A317] hover:text-[#1B100C] transition-colors"
                      aria-label="Increase guests"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Occasion */}
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#B8894B]">
                    Occasion / Gathering
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData((prev) => ({ ...prev, occasion: e.target.value }))}
                    className="w-full bg-[#1B100C] border border-[#B8894B]/30 rounded-xl py-2.5 px-4 text-sm font-body text-[#F5E9D4] focus:outline-none focus:border-[#E8A317]"
                  >
                    <option value="Family Dinner">Family Dinner / Reunion</option>
                    <option value="Birthday or Anniversary">Birthday or Anniversary Celebration</option>
                    <option value="Office Gathering">Corporate / Office Team Meal</option>
                    <option value="Grand Multi-Cuisine Feast">Grand Multi-Cuisine Celebration Feast</option>
                    <option value="Casual Companions">Casual Meal with Friends</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#B8894B]">
                    Dietary Notes / Table Preference (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Jain preparation required, high chair needed for toddler, quiet courtyard corner..."
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-[#1B100C] border border-[#B8894B]/30 rounded-xl py-2 px-4 text-sm font-body text-[#F5E9D4] focus:outline-none focus:border-[#E8A317]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="ember"
                  className="w-full justify-center !py-3.5 text-center"
                  icon={Send}
                  cursorLabel="Book Table"
                >
                  <span>Confirm Table Booking</span>
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-28">
          <SectionHeading
            eyebrow="Dining Insights"
            titlePart1="Frequently"
            italicPart="Asked"
            titlePart2="Questions"
            subtitle="Everything you need to know before joining us at Saathi Bhojan."
          />

          <div className="mt-10">
            <Accordion items={SITE_CONFIG.faqs} />
          </div>
        </div>
      </div>
    </div>
  )
}
