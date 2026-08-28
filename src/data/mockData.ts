import { MenuItem, StorySlide } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Persian Appetizers (Mazzeh & Starters)
  {
    id: 'item-1',
    name: 'Kashk-e Bademjan with Warm Sangak Bread',
    category: 'small-plates',
    categoryLabel: 'Persian Starters & Mazzeh',
    description: 'Charred smoked baby eggplants, rich fermented kashk whey cream, caramelized mint oil, crispy golden garlic, fried onions, and toasted Persian flatbread.',
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Signature', 'Popular'],
    pairing: 'Chilled Persian Doogh with Mint',
    availableInMode: 'both'
  },
  {
    id: 'item-2',
    name: 'Mast-o Khiar & Sabzi Khordan Platter',
    category: 'small-plates',
    categoryLabel: 'Persian Starters & Mazzeh',
    description: 'Strained Persian yogurt with diced Persian cucumbers, fragrant wild rose petals, crushed walnuts, fresh mint, tarragon, radish, and imported French sheep feta.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free', 'Chef Special'],
    pairing: 'Damask Rose Sparkling Spritz',
    availableInMode: 'both'
  },
  {
    id: 'item-3',
    name: 'Zeytoon Parvardeh & Mirza Ghassemi',
    category: 'small-plates',
    categoryLabel: 'Persian Starters & Mazzeh',
    description: 'Northern Persian green olives marinated in pomegranate molasses, crushed walnuts and mountain angelica (golpar), paired with smoked tomato garlic eggplant dip.',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Vegan', 'Chef Special'],
    pairing: 'Pomegranate Saffron Sangria',
    availableInMode: 'night'
  },

  // Persian Flame Kababs & Iconic Khoresht Stews
  {
    id: 'item-4',
    name: 'Flame Chelo Kabab Koobideh (Twin Skewers)',
    category: 'pasta-mains',
    categoryLabel: 'Charbroiled Kababs & Stews',
    description: 'Prime minced lamb and Angus beef seasoned with Persian spices and grated onion, charbroiled over open flames. Served on fluffy saffron basmati rice with sumac, grilled tomatoes, and butter.',
    price: 27.50,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Popular', 'Gluten-Free'],
    pairing: 'Full-Bodied Shiraz Reserve',
    availableInMode: 'both'
  },
  {
    id: 'item-5',
    name: 'Soltani Combo: Tender Barg & Saffron Joojeh',
    category: 'pasta-mains',
    categoryLabel: 'Charbroiled Kababs & Stews',
    description: 'The Royal Platter: Thinly tenderized filet mignon barg skewer paired with saffron and lemon marinated chicken breast joojeh skewer, blistered Persian peppers and basmati rice.',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=80',
    tags: ['Popular', 'Chef Special', 'Gluten-Free'],
    pairing: 'Napa Valley Cabernet Sauvignon',
    availableInMode: 'both'
  },
  {
    id: 'item-6',
    name: 'Slow-Simmered Ghormeh Sabzi with Lamb Tenderloin',
    category: 'pasta-mains',
    categoryLabel: 'Charbroiled Kababs & Stews',
    description: 'Persia’s national heritage dish: Slow-braised lamb simmered for hours with finely chopped sauteed herbs, fenugreek, red kidney beans, and sun-dried black Persian limes (limoo amani).',
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    tags: ['Gluten-Free', 'Chef Special'],
    pairing: 'Oaky Pinot Noir',
    availableInMode: 'both'
  },

  // Lunch Hub Express
  {
    id: 'item-7',
    name: 'Zereshk Polo ba Morgh (Saffron Barberry Rice)',
    category: 'lunch',
    categoryLabel: 'Lunch Hub & Afternoon Bistro',
    description: 'Tender braised bone-in chicken cooked in a fragrant saffron and tomato reduction, blanketed with aromatic basmati rice crowned with tart Persian barberries and slivered pistachios.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80',
    tags: ['Popular', 'Gluten-Free'],
    pairing: 'Persian Iced Chai with Saffron Rock Sugar',
    availableInMode: 'lunch'
  },
  {
    id: 'item-8',
    name: 'Flame Express Persian Lunch Platter',
    category: 'lunch',
    categoryLabel: 'Lunch Hub & Afternoon Bistro',
    description: 'Single skewer of Kabab Koobideh or Saffron Chicken, miniature Persian Shirazi cucumber-tomato salad, crispy golden tahdig rice, and refreshing Mast-o Khiar yogurt dip.',
    price: 19.50,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    tags: ['Chef Special', 'Quick Lunch'],
    pairing: 'Fresh Mint Lemonade',
    availableInMode: 'lunch'
  },

  // Cabaret & Late Night Bites
  {
    id: 'item-9',
    name: 'Khoresht Fesenjan with Duck & Saffron Tahdig',
    category: 'night',
    categoryLabel: 'Cabaret & Night Bites',
    description: 'Silky, rich Persian stew crafted from slow-roasted ground walnuts and tart pomegranate molasses, served over braised duck breast with crispy golden saffron tahdig.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Chef Special', 'Gluten-Free'],
    pairing: 'Vintage Merlot 2021',
    availableInMode: 'night'
  },
  {
    id: 'item-10',
    name: 'Royal Saffron Tahchin with Barberry Jewels',
    category: 'night',
    categoryLabel: 'Cabaret & Night Bites',
    description: 'Crisp, golden-crusted Persian baked rice cake enriched with saffron, egg yolks, and thick yogurt, layered with shredded spiced chicken and jeweled barberries.',
    price: 24.50,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80',
    tags: ['Popular', 'Chef Special'],
    pairing: 'Dry Saffron Champagne',
    availableInMode: 'night'
  },

  // Desserts
  {
    id: 'item-11',
    name: 'Bastani Sonnati (Persian Saffron Ice Cream)',
    category: 'desserts',
    categoryLabel: 'Artisan Persian Desserts',
    description: 'Traditional Persian frozen custard infused with organic saffron, pure rosewater, toasted pistachio slivers, and thick frozen clotted cream chunks between crispy wafers.',
    price: 13.50,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Signature', 'Chef Special'],
    pairing: 'Hot Cardamom Persian Tea (Chai)',
    availableInMode: 'both'
  },
  {
    id: 'item-12',
    name: 'Faloodeh Shirazi & Pomegranate Reduction',
    category: 'desserts',
    categoryLabel: 'Artisan Persian Desserts',
    description: 'Traditional chilled Persian glass starch noodles steeped in iced rosewater syrup, fresh sour lime juice, and tart pomegranate reduction with sour cherry drizzle.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    pairing: 'Sour Cherry Liqueur',
    availableInMode: 'both'
  },

  // Cocktails & Persian Beverages
  {
    id: 'item-13',
    name: 'Tehran Nightfall Cardamom Old Fashioned',
    category: 'cocktails',
    categoryLabel: 'Craft Cocktails & Elixirs',
    description: 'Small-batch bourbon, house-made Persian saffron simple syrup, crushed green cardamom bitters, smoked orange peel, and gold leaf flake.',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Popular'],
    availableInMode: 'both'
  },
  {
    id: 'item-14',
    name: 'Damask Rose & Persian Pomegranate Spritz',
    category: 'cocktails',
    categoryLabel: 'Craft Cocktails & Elixirs',
    description: 'Artisanal gin, Kashan damask rosewater, cold-pressed tart pomegranate juice, elderflower liqueur, and Prosecco mist.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    tags: ['Popular'],
    availableInMode: 'both'
  },
  {
    id: 'item-15',
    name: 'Persian Damask Rose & Saffron Cardamom Chai',
    category: 'cocktails',
    categoryLabel: 'Artisan Persian Beverages',
    description: 'Brewed black Ceylon tea infused with Persian saffron strands, green cardamom pods, pure Kashan rosewater, and saffron rock candy crystal sticks.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Popular'],
    availableInMode: 'both'
  }
];

export const STORY_SLIDES: StorySlide[] = [
  {
    id: 'story-1',
    title: 'Flame Charbroiled Kababs',
    subtitle: 'Koobideh & Saffron Joojeh over real hardwood charcoal',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    category: 'PERSIAN FLAME GRILL',
    tagline: 'Prime lamb & beef ground fresh daily and charbroiled over open live hardwood embers.',
    actionText: 'Taste Kababs',
    dishId: 'item-4'
  },
  {
    id: 'story-2',
    title: 'Jeweled Saffron Rice & Tahdig',
    subtitle: 'Golden crispy crust with tart Persian barberries & pistachios',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80',
    category: 'HERITAGE KITCHEN',
    tagline: 'Fluffy steamed basmati infused with pure saffron essence and crunchy golden tahdig.',
    actionText: 'Taste Tahdig',
    dishId: 'item-7'
  },
  {
    id: 'story-3',
    title: 'Slow-Simmered Khoresht & Mazzeh',
    subtitle: 'Ghormeh Sabzi, Kashk-e Bademjan & Warm Sangak Bread',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    category: 'ROYAL PERSIAN DISHES',
    tagline: 'Centuries-old slow-braised herb stews with sun-dried Persian limes and roasted eggplant.',
    actionText: 'Explore Stews',
    dishId: 'item-6'
  },
  {
    id: 'story-4',
    title: 'Live Persian Stage & Cabaret',
    subtitle: 'Live acoustic Persian melodies, Santur & late night dining',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
    category: 'NIGHT LIFE & CABARET',
    tagline: 'Every weekend: Live legendary Persian musicians, santur, and curated night dining.',
    actionText: 'Book Night Table'
  }
];

