/**
 * Single source of truth for Saathi Bhojan multi-cuisine restaurant details.
 * Content marked with // PLACEHOLDER can be modified directly by the owner.
 */

export const SITE_CONFIG = {
  name: 'Saathi Bhojan',
  tagline: 'Every Flavour Has a Seat',
  subTagline: 'A Premier Multi-Cuisine Family & Companion Dining Experience',
  estYear: '2021', // PLACEHOLDER
  location: 'Downtown Central Heritage Promenade',
  
  // Single Source of Contact // PLACEHOLDER
  address: {
    line1: '42 Grand Heritage Promenade',
    line2: 'Palace Avenue, Downtown Center',
    district: 'Central Metro',
    state: 'National Capital Region',
    pin: '110001',
    googleMapsUrl: 'https://maps.google.com/?q=Heritage+Promenade+Restaurant',
  },
  
  contact: {
    phone: '+91 98765 43210', // PLACEHOLDER
    phoneDisplay: '+91 98765 43210',
    whatsapp: '+919876543210', // PLACEHOLDER
    email: 'reservations@saathibhojan.com', // PLACEHOLDER
    supportEmail: 'contact@saathibhojan.com',
  },

  // Operational Timings
  hours: {
    lunch: '12:00 PM – 3:30 PM',
    dinner: '6:30 PM – 11:30 PM',
    days: 'Open all 7 days of the week',
    kitchenLastOrder: '10:45 PM',
  },

  socials: {
    instagram: 'https://instagram.com/saathibhojan',
    facebook: 'https://facebook.com/saathibhojan',
    whatsapp: 'https://wa.me/919876543210?text=Hello%20Saathi%20Bhojan,%20I%20would%20like%20to%20reserve%20a%20table',
  },

  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Our Story', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Reserve a Table', path: '/reserve' },
  ],

  // Core brand manifesto
  manifesto: {
    welcome: 'WELCOME',
    lead: 'A "Saathi" is a companion — a friend, a partner, or a beloved family member with whom every meal becomes an unforgettable memory.',
    body: 'Saathi Bhojan was founded on one liberating premise: when friends and family gather, nobody should be forced to compromise. While someone yearns for smoky charcoal tandoori kebabs and velvety butter chicken, another craves Neapolitan wood-fired pizza and truffle pasta, a youngster seeks fiery Sichuan noodles and delicate steamed dumplings, and elders cherish comforting regional curries and golden ghee dosas. Here, under warm terracotta arches and glowing brass lamps, every palate has its seat.',
  },

  // Experience Pillars
  pillars: [
    {
      id: 'cuisines',
      num: '01',
      title: 'Dedicated Specialty Kitchens',
      description: 'Authentic master chefs lead each culinary station — from wok masters and pizzaiolos to Lucknowi dum ustaads and South Indian tiffin virtuosos.',
      icon: 'UtensilsCrossed',
    },
    {
      id: 'live-hearths',
      num: '02',
      title: 'Live Hearths & Charcoal Ember',
      description: 'Acacia charcoal tandoors, fierce Asian wok fires, and Italian stone ovens searing pizzas at 450°C for unmatched depth of aroma.',
      icon: 'Flame',
    },
    {
      id: 'sourcing',
      num: '03',
      title: 'Uncompromised Purity',
      description: 'Strictly zero synthetic food coloring, premium cold-pressed oils, farm-fresh dairy butter and A2 ghee, and daily morning produce.',
      icon: 'ShieldCheck',
    },
    {
      id: 'togetherness',
      num: '04',
      title: 'Feasts Built For Companions',
      description: 'Spacious banquet tables, shared gourmet platters, 100% separated pure vegetarian and non-vegetarian preparation lines, and attentive hospitality that lets you linger.',
      icon: 'HeartHandshake',
    },
  ],

  // Testimonials // PLACEHOLDER
  testimonials: [
    {
      id: 1,
      quote: 'Finally, a multi-cuisine restaurant where every single station is top-tier. The Truffle Burrata Pizza rivaled Milan, while the Galouti Kebabs and Dum Biryani were royally authentic.',
      author: 'Vikram & Radhika Malhotra',
      role: 'Family Gathering',
      occasion: 'Milestone Birthday Feast',
      rating: 5,
    },
    {
      id: 2,
      quote: 'We were an office reunion of 18 colleagues with entirely conflicting tastes — vegans, keto diners, spicy food fanatics, and pasta purists. Everyone found their favorite dish.',
      author: 'Arjun Sen',
      role: 'Corporate Tech Lead',
      occasion: 'Annual Team Dinner',
      rating: 5,
    },
    {
      id: 3,
      quote: 'The ambience is stunning — warm dark terracotta, glowing brass details, and soft amber lighting. The Ghee Roast Dosa and Pan-Asian Dim Sums were outstanding.',
      author: 'Kavita Chawla',
      role: 'Food & Lifestyle Critic',
      occasion: 'Weekend Dining',
      rating: 5,
    },
  ],

  // FAQ Items
  faqs: [
    {
      q: 'Do you cater to different dietary preferences at the same table?',
      a: 'Yes, absolutely. Our menu features dedicated Pure Vegetarian, Vegan, Jain (No-Onion-No-Garlic), Non-Vegetarian, and Gluten-Conscious selections prepared across separated kitchen stations.',
    },
    {
      q: 'Are advance reservations recommended for large groups?',
      a: 'We warmly recommend reserving your table at least 2 hours in advance for dinner and weekends. For parties of 8 or more, we arrange dedicated long celebration tables.',
    },
    {
      q: 'Do you offer private event and banquet dining?',
      a: 'Yes, we have private dining alcoves and celebratory banquet spaces suited for family birthdays, corporate dinners, anniversaries, and reunions.',
    },
    {
      q: 'Is valet parking and wheelchair access available?',
      a: 'Yes, we provide complimentary valet parking and complete ramp access from our main entrance to the dining courtyard.',
    },
  ],
}
