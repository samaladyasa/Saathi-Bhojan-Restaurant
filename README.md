# Saathi Bhojan — Every Flavour Has a Seat
### Premier Multi-Cuisine Family & Companion Dining Restaurant Website

An award-caliber, story-led restaurant website built with React, Vite, Tailwind CSS v4, GSAP, and Lenis smooth scrolling. Designed around the concept of **"Sage Garden"** — celebrating warmth, hospitality, and a feast where companions never have to compromise on what they crave.

---

## 🌟 Architecture & Key Features

- **"Sage Garden" Aesthetic System:**
  - Warm ivory background (`#F6F4EC`), pale sage section alternation (`#E4EAD8`), clean card surfaces (`#FDFCF8`), sage green primary accents (`#7E9C7A`), deep forest headings (`#2F4A3A`), midnight green footer (`#1C2B22`), and saffron highlights (`#E0A030`).
  - Organic `<CurveDivider />` seams preventing straight horizontal lines across sections.
  - Ambient floating ember sparks canvas and subtle 4.5% SVG film-grain texture.
- **Editorial Typography:**
  - High-optical **Fraunces** serif (mixed Roman & italic contrast within headlines), **Instrument Sans** body, and **DM Mono** tracking labels.
- **Multi-Cuisine Grand Menu (`/menu`):**
  - Two-level interactive filtering across diverse world and regional cuisines:
    - **Pan-Asian & Woks** (Truffle Dim Sums, Sichuan Chilli Chicken, Thai Curries, Hakka Noodles)
    - **Italian & Wood-Fired** (48h Sourdough Burrata Pizza, Porcini Penne, Pepperoni & Hot Honey)
    - **Tandoor & BBQ** (Acacia-charred Bhatti Tikka, Royal Galouti Kebabs, Malai Paneer Shashlik)
    - **North Indian & Mughlai** (Butter Chicken, 20h Dal Makhani, Awadhi Dum Biryani, Rogan Josh)
    - **Continental & Grills** (Herb Butter Chicken Steaks, Brioche Smash Burgers, Mezze Platters)
    - **South Indian Tiffins** (Crisp Ghee Podi Roast Dosa, Medu Vada, Filter Kaapi)
    - **Coastal Seafood** (Goan Prawn Curry, Malabar Kingfish with Flaky Parotta)
    - **Desserts & Beverages** (Venetian Tiramisu, Sizzling Walnut Brownie, Craft Mocktails)
  - Dietary Filters (Pure Veg, Non-Veg, Chef's Pick, Spicy), instant search, and Grid/Row view toggles.
  - Interactive Dish Details Modal with recipe story, dietary markers, and spice levels.
- **Story & Milestones (`/about`):**
  - The philosophy of companion dining ("Saathi" = Companion, "Bhojan" = Shared Feast).
  - S-curve milestone chronicle and live fire hearths.
  - Master kitchen chef profiles (Italian Pizzaiolo, Tandoor Ustaad, Pan-Asian Wok Master).
- **Visual Archives (`/gallery`):**
  - Responsive masonry grid with category filters (Food, Ambience, Craft, Events) and fullscreen keyboard-accessible Lightbox.
- **Hospitality & Reservations (`/contact`):**
  - Live "Open Now / Closed" operational status indicator.
  - Interactive table reservation form with dynamic companion counter, occasion selector, and celebratory confirmation state.
  - Instant WhatsApp reservation fallback and embedded dark-tinted map.
  - Dining insights FAQ accordion.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + Custom CSS variables
- **Motion & Interactions:** GSAP, `@gsap/react`, Lenis smooth scrolling
- **Icons:** `lucide-react`
- **Fonts:** Fraunces, Instrument Sans, DM Mono (via Google Fonts)

---

## 📂 Content Management (Single Source of Truth)

All restaurant content is centralized in `src/data/` so the owner can customize dishes, timings, phone numbers, and addresses without touching React components:

1. **`src/data/site.js`**: Restaurant name, tagline, address, phone/WhatsApp, operating hours, testimonials, and FAQs.
2. **`src/data/menu.js`**: All cuisine categories, dish names, prices, tags, and dietary flags (`// PLACEHOLDER` markers).
3. **`src/data/gallery.js`**: Photography showcase with captions and aspect ratios.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build
npm run preview
```
