/**
 * Saathi Bhojan — World Multi-Cuisine Menu Dataset
 * Features Pan-Asian, Italian Wood-Fired, Tandoor & Grills, North Indian & Mughlai,
 * Continental & Steaks, South Indian Tiffins, Coastal Seafood, and Artisanal Desserts.
 * All prices and dishes marked with // PLACEHOLDER for owner replacement.
 */

export const CUISINES = [
  { id: 'all', label: 'All Offerings', subtitle: 'Global & Regional', icon: 'Sparkles' },
  { id: 'pan-asian', label: 'Pan-Asian & Woks', subtitle: 'Dim Sums & Noodles', icon: 'Soup' },
  { id: 'italian', label: 'Italian & Wood-Fired', subtitle: 'Artisan Pizzas & Pastas', icon: 'Pizza' },
  { id: 'tandoor', label: 'Tandoor & BBQ', subtitle: 'Charcoal Kebabs', icon: 'CookingPot' },
  { id: 'north-indian', label: 'North Indian & Mughlai', subtitle: 'Rich Curries & Biryani', icon: 'Flame' },
  { id: 'continental', label: 'Continental & Grills', subtitle: 'Steaks & Gourmet Burgers', icon: 'UtensilsCrossed' },
  { id: 'south-indian', label: 'South Indian Tiffins', subtitle: 'Ghee Dosas & Roasts', icon: 'Coffee' },
  { id: 'coastal', label: 'Coastal Seafood', subtitle: 'Fresh Catch & Malabar Curries', icon: 'Sparkles' },
  { id: 'desserts', label: 'Desserts & Beverages', subtitle: 'Dolci, Shakes & Chaa', icon: 'Heart' },
]

export const MENU_ITEMS = [
  // 1. PAN-ASIAN & WOKS
  {
    id: 'asian-1',
    name: 'Truffle Edamame & Mushroom Dim Sum', // PLACEHOLDER
    cuisine: 'pan-asian',
    price: 365, // PLACEHOLDER
    description: 'Translucent crystal dumplings filled with crushed edamame, water chestnuts, and wild forest mushrooms, drizzled with white truffle oil.',
    isVeg: true,
    isSpicy: false,
    isChefPick: true,
    tags: ['Handcrafted', 'Steamed', 'Truffle Scent'],
    image: 'https://naoasiantable.com/wp-content/uploads/2025/12/Truffle-Edamame_7_11zon-600x400.webp',
  },
  {
    id: 'asian-2',
    name: 'Wok-Smoked Sichuan Chilli Chicken', // PLACEHOLDER
    cuisine: 'pan-asian',
    price: 410, // PLACEHOLDER
    description: 'Crisp boneless chicken tossed on blazing wok fire with cracked Sichuan peppercorns, scallions, bird’s-eye chillies, and superior dark soy.',
    isVeg: false,
    isSpicy: true,
    isChefPick: true,
    tags: ['Wok Hei', 'Fiery', 'Bestseller'],
    image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/401884438/original/35a7f200ec35abda26cbcd2313519f8161a42432/design-a-perfect-youtube-thumbnail.jpg',
  },
  {
    id: 'asian-3',
    name: 'Bangkok Lemongrass Green Curry Bowl', // PLACEHOLDER
    cuisine: 'pan-asian',
    price: 395, // PLACEHOLDER
    description: 'Aromatic coconut cream broth infused with kaffir lime leaves, fresh galangal, bamboo shoots, and Thai sweet basil, served with jasmine rice.',
    isVeg: true,
    isSpicy: true,
    isChefPick: false,
    tags: ['Coconut Broth', 'Thai Herbal'],
    image: 'https://claratravels.com/wp-content/uploads/2025/12/green-curry.jpg',
  },
  {
    id: 'asian-4',
    name: 'Chilli Garlic Hand-Pulled Hakka Noodles', // PLACEHOLDER
    cuisine: 'pan-asian',
    price: 260, // PLACEHOLDER
    description: 'Fresh wheat noodles wok-tossed with julienned colorful bell peppers, bok choy, burnt garlic flakes, and toasted sesame oil.',
    isVeg: true,
    isSpicy: true,
    isChefPick: false,
    tags: ['Wok Fire', 'Crunchy Greens'],
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop',
  },

  // 2. ITALIAN & WOOD-FIRED
  {
    id: 'ita-1',
    name: 'Wood-Fired Burrata & San Marzano Pizza', // PLACEHOLDER
    cuisine: 'italian',
    price: 495, // PLACEHOLDER
    description: '48-hour slow-fermented sourdough crust topped with sweet crushed San Marzano tomatoes, fresh pugliese burrata, sweet basil, and extra virgin olive oil.',
    isVeg: true,
    isSpicy: false,
    isChefPick: true,
    tags: ['Wood Oven', 'Sourdough 48h', 'Artisan Cheese'],
    image: 'https://images.stockcake.com/public/c/a/b/cabd1026-cb20-4604-ae29-194203bdde65_large/steaming-pizza-perfection-stockcake.jpg',
  },
  {
    id: 'ita-2',
    name: 'Black Truffle & Wild Porcini Penne', // PLACEHOLDER
    cuisine: 'italian',
    price: 440, // PLACEHOLDER
    description: 'Bronze-extruded penne rigate coated in a velvety reduction of wild Italian porcini mushrooms, garlic butter confit, and aged 24-month Parmigiano Reggiano.',
    isVeg: true,
    isSpicy: false,
    isChefPick: true,
    tags: ['Handmade Pasta', 'Parmigiano 24m'],
    image: 'https://i.pinimg.com/736x/22/9a/0b/229a0be567174c61c6ce6507a9949f8d.jpg',
  },
  {
    id: 'ita-3',
    name: 'Smoked Pepperoni & Hot Honey Pizza', // PLACEHOLDER
    cuisine: 'italian',
    price: 540, // PLACEHOLDER
    description: 'Charred artisan crust topped with slow-cured spicy pepperoni, buffalo mozzarella, fresh oregano, and an aromatic drizzle of chilli-infused organic honey.',
    isVeg: false,
    isSpicy: true,
    isChefPick: false,
    tags: ['Hot Honey', 'Crispy Pepperoni'],
    image: 'https://www.sipandsanity.com/wp-content/uploads/2025/12/FI-hot-honey-pepperoni-pizza.jpg',
  },

  // 3. TANDOOR & BBQ GRILLS
  {
    id: 'tan-1',
    name: 'Bhatti Ka Murgh Tikka', // PLACEHOLDER
    cuisine: 'tandoor',
    price: 425, // PLACEHOLDER
    description: 'Tender chicken morsels double-marinated in hung yogurt, smoked degi mirch, mustard seed emulsion, and roasted coriander, charred over acacia wood coals.',
    isVeg: false,
    isSpicy: true,
    isChefPick: true,
    tags: ['Smoky Charcoal', 'Charred Edge', 'Chef Classic'],
    image: 'https://i.pinimg.com/originals/11/2f/07/112f0722a6f3fc1fa328e240c02ea9b4.jpg',
  },
  {
    id: 'tan-2',
    name: 'Royal Galouti Kebab on Ulte Tawe Ka Paratha', // PLACEHOLDER
    cuisine: 'tandoor',
    price: 480, // PLACEHOLDER
    description: 'Melt-in-mouth smoked lamb patties ground with 32 rare potli spices and saffron, served on crisp inverted-griddle saffron bread with mint dip.',
    isVeg: false,
    isSpicy: false,
    isChefPick: true,
    tags: ['Melt-in-Mouth', 'Lucknowi Royal'],
    image: 'https://birdfoods.co.in/wp-content/uploads/2024/09/Copy-of-Galawati-Kebab-With-Ulte-Tawe-Ka-Paratha-4-Pieces_11zon-1.jpg',
  },
  {
    id: 'tan-3',
    name: 'Charred Malai Paneer Shashlik', // PLACEHOLDER
    cuisine: 'tandoor',
    price: 380, // PLACEHOLDER
    description: 'Fresh farm cottage cheese blocks marinated in thick clotted cream, green cardamom, cashewnut paste, and sweet bell peppers, charred with a hint of mace.',
    isVeg: true,
    isSpicy: false,
    isChefPick: false,
    tags: ['Mild & Creamy', 'Vegetarian Star'],
    image: 'https://i.pinimg.com/originals/4d/19/71/4d1971bb7038254d0d5cc89658c63972.jpg',
  },

  // 4. NORTH INDIAN & MUGHLAI
  {
    id: 'ind-1',
    name: 'Shahi Murgh Makhanwala (Butter Chicken)', // PLACEHOLDER
    cuisine: 'north-indian',
    price: 440, // PLACEHOLDER
    description: 'Tandoor-charred chicken simmered in an 18-hour velvety tomato cream reduction, finished with churned white butter, organic honey, and hand-rubbed kasuri methi.',
    isVeg: false,
    isSpicy: false,
    isChefPick: true,
    tags: ['Velvety Butter', 'Heritage Recipe'],
    image: 'https://tse2.mm.bing.net/th/id/OIP.yE0r-EF1xJASPNu-bfsRhQHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 'ind-2',
    name: 'Slow-Simmered Dal Saathi Makhani', // PLACEHOLDER
    cuisine: 'north-indian',
    price: 310, // PLACEHOLDER
    description: 'Whole black lentils and kidney beans simmered overnight for 20 hours on low burning coals, slow-whipped with cultured butter and farm fresh cream.',
    isVeg: true,
    isSpicy: false,
    isChefPick: true,
    tags: ['20-Hour Simmer', 'Rich Comfort'],
    image: 'https://static.wixstatic.com/media/cca2e3_766f97cb373444479391d5f5f20369e1~mv2.jpg/v1/fill/w_980,h_1307,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cca2e3_766f97cb373444479391d5f5f20369e1~mv2.jpg',
  },
  {
    id: 'ind-3',
    name: 'Dum Pukht Awadhi Mutton Biryani', // PLACEHOLDER
    cuisine: 'north-indian',
    price: 495, // PLACEHOLDER
    description: 'Aged long-grain basmati layered with tender baby goat cuts, saffron milk, browned shallots, and rose water, slow-cooked in a dough-sealed handi.',
    isVeg: false,
    isSpicy: true,
    isChefPick: true,
    tags: ['Dough Sealed', 'Saffron Fragrance'],
    image: 'https://i.pinimg.com/originals/a2/bc/44/a2bc444ee33be3d7f9e804da4a6c65c9.jpg',
  },
  {
    id: 'ind-4',
    name: 'Kashmiri Rogan Josh', // PLACEHOLDER
    cuisine: 'north-indian',
    price: 490, // PLACEHOLDER
    description: 'Tender braised lamb infused with Kashmiri ratan jot bark, sun-dried ginger powder, and fennel seeds in a rich, aromatic gravy.',
    isVeg: false,
    isSpicy: true,
    isChefPick: false,
    tags: ['Aromatic Spice', 'Kashmiri Herbs'],
    image: 'https://d17df4wezm00f0.cloudfront.net/blog/kashmiri-rogan-josh-guide/hero.webp',
  },

  // 5. CONTINENTAL & GRILLS
  {
    id: 'con-1',
    name: 'Grilled Herb Butter Chicken Steak', // PLACEHOLDER
    cuisine: 'continental',
    price: 460, // PLACEHOLDER
    description: 'Seared chicken breast basted with fresh rosemary-garlic butter, served alongside creamy potato mash, charred buttered asparagus, and black peppercorn jus.',
    isVeg: false,
    isSpicy: false,
    isChefPick: true,
    tags: ['Rosemary Garlic', 'Potato Mash'],
    image: 'https://www.quickmealrecipe.com/wp-content/uploads/2024/11/image-16.jpeg',
  },
  {
    id: 'con-2',
    name: 'Artisan Brioche Smash Burger', // PLACEHOLDER
    cuisine: 'continental',
    price: 360, // PLACEHOLDER
    description: 'Double grilled patties with aged sharp cheddar cheese, house-pickled gherkins, caramelized onions, and smoked secret relish on a toasted buttered brioche bun.',
    isVeg: false,
    isSpicy: false,
    isChefPick: false,
    tags: ['Brioche Bun', 'Aged Cheddar'],
    image: 'https://schweidandsons.com/wp-content/uploads/2023/07/ABC_S_S_05-TripleSmashBurger-15low.jpg',
  },
  {
    id: 'con-3',
    name: 'Mediterranean Mezze Feast Platter', // PLACEHOLDER
    cuisine: 'continental',
    price: 420, // PLACEHOLDER
    description: 'Silky wood-smoked baba ganoush, classic chickpea hummus, crispy falafel rounds, tzatziki, marinated kalamata olives, and warm zaatar pita bread.',
    isVeg: true,
    isSpicy: false,
    isChefPick: true,
    tags: ['Mediterranean', 'Zaatar Pita', 'Sharable'],
    image: 'https://tse4.mm.bing.net/th/id/OIP.v6xY6AouFgoU_qkrkPOsGQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },

  // 6. SOUTH INDIAN TIFFINS
  {
    id: 'south-1',
    name: 'Crisp Ghee Podi Paper Roast Dosa', // PLACEHOLDER
    cuisine: 'south-indian',
    price: 195, // PLACEHOLDER
    description: 'Wafer-thin fermented crepe smeared with fragrant spiced gun powder and golden clarified butter, accompanied by trio of freshly grated chutneys and drumstick sambar.',
    isVeg: true,
    isSpicy: true,
    isChefPick: true,
    tags: ['Paper Thin', 'Pure Ghee', 'All-Day Favourite'],
    image: 'https://img.freepik.com/premium-photo/ghee-roast-dosa_1114710-4083.jpg?w=996',
  },
  {
    id: 'south-2',
    name: 'Steamed Kanchipuram Idli & Crunchy Medu Vada', // PLACEHOLDER
    cuisine: 'south-indian',
    price: 165, // PLACEHOLDER
    description: 'Feather-light steamed rice cakes spiced with peppercorns and ginger, paired with crispy golden lentil vadas and aromatic shallot-tomato sambar.',
    isVeg: true,
    isSpicy: false,
    isChefPick: false,
    tags: ['Breakfast Classic', 'Healthy Ferment'],
    image: 'https://im.whatshot.in/img/2019/Aug/shutterstock-326657696-cropped-1566550680.jpg',
  },
  {
    id: 'south-3',
    name: 'Authentic Filter Kaapi in Brass Dabarah', // PLACEHOLDER
    cuisine: 'south-indian',
    price: 90, // PLACEHOLDER
    description: 'Dark-roasted plantation peaberry decoction frothed with boiled full-cream milk, served in traditional engraved brass tableware.',
    isVeg: true,
    isSpicy: false,
    isChefPick: false,
    tags: ['Brass Tableware', 'Aromatic Decoction'],
    image: 'https://www.agoraliarecipes.com/wp-content/uploads/2022/08/AR000232JR-Indian-Kaapi-Filter-Coffee-FTR1-ph01-Shtr_SMALL.jpg',
  },

  // 7. COASTAL SEAFOOD
  {
    id: 'coast-1',
    name: 'Goan Coastal Prawn Curry with Steamed Rice', // PLACEHOLDER
    cuisine: 'coastal',
    price: 495, // PLACEHOLDER
    description: 'Juicy ocean prawns simmered in freshly squeezed coconut milk, tangy sour kokum extract, Kashmiri red chillies, and ground coriander seeds.',
    isVeg: false,
    isSpicy: true,
    isChefPick: true,
    tags: ['Fresh Prawns', 'Tangy Kokum'],
    image: 'https://www.foodiaq.com/wp-content/uploads/2026/01/Goan-Prawn-Curry-1.jpg',
  },
  {
    id: 'coast-2',
    name: 'Malabar Fish Curry with Flaky Parotta', // PLACEHOLDER
    cuisine: 'coastal',
    price: 460, // PLACEHOLDER
    description: 'Seared kingfish steaks gently braised with shallots, green chillies, curry leaves, and fenugreek in thick coconut reduction, served with layered Malabar parottas.',
    isVeg: false,
    isSpicy: true,
    isChefPick: true,
    tags: ['Kingfish', 'Layered Parotta'],
    image: 'https://static.vecteezy.com/system/resources/previews/076/961/507/large_2x/flaky-malabar-parotta-with-spicy-curry-free-photo.jpg',
  },

  // 8. DESSERTS & BEVERAGES
  {
    id: 'des-1',
    name: 'Classic Venetian Tiramisu al Mascarpone', // PLACEHOLDER
    cuisine: 'desserts',
    price: 245, // PLACEHOLDER
    description: 'Espresso-soaked savoiardi ladyfingers layered with whipped sweet mascarpone cream and dusted with bitter Valrhona cocoa.',
    isVeg: true,
    isSpicy: false,
    isChefPick: true,
    tags: ['Valrhona Cocoa', 'Espresso Infused'],
    image: 'https://tse1.explicit.bing.net/th/id/OIP.BCvLhVbM3YuJotIAtNaQnwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 'des-2',
    name: 'Sizzling Hot Fudge Walnut Brownie', // PLACEHOLDER
    cuisine: 'desserts',
    price: 220, // PLACEHOLDER
    description: 'Warm double chocolate fudge brownie served on a sizzling iron skillet with Madagascan vanilla bean ice cream and molten Belgian chocolate pour.',
    isVeg: true,
    isSpicy: false,
    isChefPick: true,
    tags: ['Sizzling Skillet', 'Belgian Chocolate'],
    image: 'https://tiffinandteaofficial.com/wp-content/uploads/2022/12/281122_7-scaled.jpg',
  },
  {
    id: 'des-3',
    name: 'Passionfruit & Mint Sparkler Mocktail', // PLACEHOLDER
    cuisine: 'desserts',
    price: 175, // PLACEHOLDER
    description: 'Fresh passionfruit pulp muddled with bruised garden mint, lime juice, elderflower cordial, and effervescent sparkling soda.',
    isVeg: true,
    isSpicy: false,
    isChefPick: false,
    tags: ['Refreshing', 'Craft Mocktail'],
    image: 'https://www.farmwifedrinks.com/wp-content/uploads/2023/06/60_PassionfruitMocktailEatLoveEat.jpg',
  },
]
