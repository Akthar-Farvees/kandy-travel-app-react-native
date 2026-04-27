import type {
  Attraction,
  HeroStat,
  Product,
  ProductPage,
  ProductQuery,
  PromptShortcut,
  QuickFilter,
  QuickFilterId,
} from '../types';

export const HERO_STATS: HeroStat[] = [
  { label: 'Top sights', value: '04' },
  { label: 'Local products', value: '18' },
  { label: 'Easy filters', value: 'Voice' },
];

export const FEATURED_ATTRACTIONS: Attraction[] = [
  {
    id: 'temple-tooth',
    title: 'Temple of the Tooth',
    location: 'Central Kandy',
    note: 'The city’s most iconic cultural stop with a calm, ceremonial atmosphere.',
    shoppingCue: 'Best paired with heritage craft and jewelry finds.',
    image:
      'https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'kandy-lake',
    title: 'Kandy Lake Walk',
    location: 'Lake Round',
    note: 'A gentle sightseeing route for first-time visitors who want a slower city view.',
    shoppingCue: 'Great lead-in for giftable tea, scarves, and pottery.',
    image:
      'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'bahirawakanda',
    title: 'Bahirawakanda Viewpoint',
    location: 'Hilltop stop',
    note: 'Panoramic city views and a strong golden-hour stop above the town center.',
    shoppingCue: 'Works nicely with premium gifts and statement keepsakes.',
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'peradeniya',
    title: 'Peradeniya Gardens',
    location: 'Outside the city',
    note: 'A lush botanical visit that reinforces the region’s tea, spice, and floral identity.',
    shoppingCue: 'Ideal before browsing tea and spice-based products.',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
  },
];

export const QUICK_FILTERS: QuickFilter[] = [
  { id: 'giftable', label: 'Gift-ready', hint: 'Easy souvenirs to take home' },
  { id: 'under-30', label: 'Under $30', hint: 'Budget-friendly shopping' },
  { id: 'heritage', label: 'Heritage craft', hint: 'Traditional local craft' },
  { id: 'luxury', label: 'Premium picks', hint: 'Higher-end keepsakes' },
  { id: 'culinary', label: 'Tea & spice', hint: 'Edible lifestyle products' },
];

export const PROMPT_SHORTCUTS: PromptShortcut[] = [
  {
    chipLabel: 'Show tea products',
    spokenText: 'Show tea products',
    query: 'tea',
    category: 'Tea',
    quickFilter: 'culinary',
  },
  {
    chipLabel: 'Find cheap handicrafts',
    spokenText: 'Find cheap handicrafts',
    query: 'handicraft',
    category: 'Handicraft',
    quickFilter: 'under-30',
  },
  {
    chipLabel: 'Show jewelry',
    spokenText: 'Show jewelry',
    query: 'jewelry',
    category: 'Jewelry',
    quickFilter: 'luxury',
  },
];

export const CATEGORY_ORDER = ['All', 'Tea', 'Handicraft', 'Textile', 'Jewelry', 'Spices', 'Pottery'] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'ceylon-tea-box',
    name: 'Premium Ceylon Tea Gift Box',
    category: 'Tea',
    price: 24.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Layered black, green, and floral teas packed as an easy Kandy gift.',
    fullDescription:
      'Packed as a boutique travel keepsake, this tea box brings together estate-picked leaves with a clean presentation that feels right at home in a sightseeing-led shopping app.',
    artisan: 'Hanthana Estate Co-op',
    routeNote: 'Best paired with morning tea trails near the hills above Kandy.',
    stockLabel: 'Ready to gift',
    tags: ['black tea', 'gift box', 'estate grown', 'souvenir'],
    highlights: ['Polished packaging', 'Easy gifting price point', 'Strong travel-story fit'],
    accentColor: '#4C7A65',
    giftable: true,
    heritage: false,
    luxury: false,
    culinary: true,
  },
  {
    id: 'wooden-elephant',
    name: 'Handcrafted Wooden Elephant',
    category: 'Handicraft',
    price: 29,
    rating: 4.8,
    image: 'https://media.istockphoto.com/id/649063606/photo/wooden-elephant.jpg?s=612x612&w=0&k=20&c=oRkJahF7Bd9hmZqMCgYFXIeTMmA1SYb9jYomn2-DhW0=',
    shortDescription: 'A carved mahogany keepsake with a classic heritage feel.',
    fullDescription:
      'This piece brings character to the collection with visible hand-finished detail, warm timber texture, and the kind of symbolic souvenir appeal that fits the Kandy travel narrative.',
    artisan: 'Udawatta Artisan House',
    routeNote: 'Feels strongest in the heritage-craft route with temple and museum stops.',
    stockLabel: 'Collector favorite',
    tags: ['artisan', 'woodwork', 'symbolic', 'heritage'],
    highlights: ['Statement souvenir', 'Rich material texture', 'Strong shelf presence'],
    accentColor: '#D4A45B',
    giftable: true,
    heritage: true,
    luxury: false,
    culinary: false,
  },
  {
    id: 'batik-scarf',
    name: 'Traditional Batik Silk Scarf',
    category: 'Textile',
    price: 35.5,
    rating: 4.7,
    image: 'https://everything-iwant.com/cdn/shop/products/batik_vase_scarf_Hayman_900x.jpg?v=1640171539',
    shortDescription: 'Hand-dyed silk with floral color and a softer fashion-led finish.',
    fullDescription:
      'The batik scarf adds movement and color to the product page, balancing the heavier craft items with a softer luxury product that still feels deeply local and gift-friendly.',
    artisan: 'Kandyan Dye Studio',
    routeNote: 'A strong midday discovery for shoppers leaning into fashion and texture.',
    stockLabel: 'Limited weave',
    tags: ['batik', 'silk', 'wearable', 'floral'],
    highlights: ['Fashion-led category mix', 'Excellent fold display', 'Color-rich detail'],
    accentColor: '#A85F62',
    giftable: true,
    heritage: true,
    luxury: false,
    culinary: false,
  },
  {
    id: 'moonstone-pendant',
    name: 'Kandyan Moonstone Pendant',
    category: 'Jewelry',
    price: 89.99,
    rating: 5,
    image: 'https://kindnessgems.com/cdn/shop/products/moonstonesimplenecklace.jpg?v=1669455213',
    shortDescription: 'A silver-set moonstone piece with a polished premium finish.',
    fullDescription:
      'This pendant gives the mobile product page a true hero product. It anchors the luxury end of the assortment and helps the UI feel like a curated boutique rather than a simple catalog.',
    artisan: 'Lake View Gem Atelier',
    routeNote: 'Best positioned as an evening, high-intent gift or personal keepsake.',
    stockLabel: 'High-value pick',
    tags: ['moonstone', 'silver', 'luxury', 'statement'],
    highlights: ['Hero item for modal detail', 'Premium materials', 'High perceived value'],
    accentColor: '#5B728B',
    giftable: true,
    heritage: false,
    luxury: true,
    culinary: false,
  },
  {
    id: 'cinnamon-quills',
    name: 'Organic Cinnamon Quills',
    category: 'Spices',
    price: 12.5,
    rating: 4.6,
    image: 'https://cdn.shopify.com/s/files/1/0823/0089/5553/files/Ceylon_cinnamon_-4_480x480.jpg?v=1733243216',
    shortDescription: 'An authentic kitchen staple for easy take-home cooking memories.',
    fullDescription:
      'Ceylon cinnamon introduces a lighter, everyday purchase into the set. It gives the collection price range variety while still reinforcing Kandy through spice-route storytelling.',
    artisan: 'Peradeniya Spice Collective',
    routeNote: 'Ideal for culinary travelers and budget-friendly souvenir hunting.',
    stockLabel: 'Everyday pick',
    tags: ['cinnamon', 'culinary', 'spice garden', 'budget'],
    highlights: ['Accessible price', 'Strong regional identity', 'Fast browse conversion'],
    accentColor: '#BA6C4A',
    giftable: false,
    heritage: false,
    luxury: false,
    culinary: true,
  },
  {
    id: 'pottery-set',
    name: 'Traditional Clay Pottery Set',
    category: 'Pottery',
    price: 28,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Hand-thrown terracotta bowls with an earthy, handmade finish.',
    fullDescription:
      'This pottery set introduces shape contrast and earthy tactility to the assortment. It feels grounded, handmade, and especially effective in a grid layout where material variety matters.',
    artisan: 'Mahaweli Clay Works',
    routeNote: 'Pairs nicely with food-market or spice-route storytelling inside the app.',
    stockLabel: 'Weekend batch',
    tags: ['terracotta', 'hand-thrown', 'homeware', 'earthy'],
    highlights: ['Warm editorial color', 'Handmade appeal', 'Strong lifestyle styling value'],
    accentColor: '#2A584A',
    giftable: true,
    heritage: true,
    luxury: false,
    culinary: true,
  },
  {
    id: 'silver-bangle',
    name: 'Silver Kandyan Bangle',
    category: 'Jewelry',
    price: 120,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Intricate filigree work for travelers after a collectible keepsake.',
    fullDescription:
      'The bangle expands the premium tier of the page and gives evaluators a second look at how the interface handles more expensive, higher-intent browsing moments.',
    artisan: 'Kandyan Silver Guild',
    routeNote: 'Works well as a premium upsell in the jewelry category view.',
    stockLabel: 'Signature luxury',
    tags: ['filigree', 'silver', 'collector', 'premium'],
    highlights: ['Luxury category depth', 'Excellent close-up detail', 'Strong premium storytelling'],
    accentColor: '#5B728B',
    giftable: true,
    heritage: true,
    luxury: true,
    culinary: false,
  },
  {
    id: 'spice-pack',
    name: 'Cardamom & Clove Spice Pack',
    category: 'Spices',
    price: 18.75,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Aromatic whole spices for practical edible souvenirs.',
    fullDescription:
      'This pack complements the tea and cinnamon offers with a bolder aroma story, giving the culinary route enough variation to feel intentional and complete in the mobile experience.',
    artisan: 'Asgiriya Spice Market',
    routeNote: 'A solid impulse-buy anchor for the culinary trail filter.',
    stockLabel: 'Fresh harvest',
    tags: ['cardamom', 'clove', 'aromatic', 'cooking'],
    highlights: ['Pairs with tea products', 'Strong culinary theme', 'Convenient gift basket add-on'],
    accentColor: '#BA6C4A',
    giftable: true,
    heritage: false,
    luxury: false,
    culinary: true,
  },
  {
    id: 'tea-tasting-flight',
    name: 'Kandy Tea Tasting Flight',
    category: 'Tea',
    price: 19.5,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'A sampler of hillside teas for travelers who want variety in one box.',
    fullDescription:
      'This compact tasting flight brings together several tea profiles in a format that feels easy to browse, easy to gift, and strong for culinary-focused travel storytelling.',
    artisan: 'Hillside Tasting Room',
    routeNote: 'A natural follow-up after a tea estate stop near Hanthana.',
    stockLabel: 'Freshly packed',
    tags: ['tea sampler', 'estate trail', 'gift set', 'culinary'],
    highlights: ['Quick entry price', 'Good category depth', 'Strong gift appeal'],
    accentColor: '#4C7A65',
    giftable: true,
    heritage: false,
    luxury: false,
    culinary: true,
  },
  {
    id: 'tea-estate-honey',
    name: 'Tea Estate Wildflower Honey',
    category: 'Tea',
    price: 14.25,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Golden honey with a soft floral finish that pairs well with local teas.',
    fullDescription:
      'Positioned as a companion purchase, this honey adds another warm, edible layer to the Kandy product mix and helps the app feel broader than a single-category souvenir list.',
    artisan: 'Hanthana Bee Garden',
    routeNote: 'Best discovered after botanical or hill-country sightseeing.',
    stockLabel: 'Small-batch jars',
    tags: ['honey', 'tea pairing', 'botanical', 'culinary'],
    highlights: ['Easy add-on item', 'Strong food-story fit', 'Budget friendly'],
    accentColor: '#4C7A65',
    giftable: true,
    heritage: false,
    luxury: false,
    culinary: true,
  },
  {
    id: 'lacquer-jewelry-box',
    name: 'Hand-Lacquered Jewelry Box',
    category: 'Handicraft',
    price: 27.5,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'A compact keepsake box with hand-finished lacquer and heritage detail.',
    fullDescription:
      'The lacquered box introduces a smaller craft object that still feels premium, helping the handicraft category cover both collector pieces and more accessible gift options.',
    artisan: 'Asgiriya Craft Studio',
    routeNote: 'Fits nicely after temple visits and heritage-market browsing.',
    stockLabel: 'Travel-size gift',
    tags: ['lacquer', 'keepsake', 'craft', 'heritage'],
    highlights: ['Under-$30 craft option', 'Good gifting shape', 'Strong heritage signal'],
    accentColor: '#D4A45B',
    giftable: true,
    heritage: true,
    luxury: false,
    culinary: false,
  },
  {
    id: 'brass-lotus-lamp',
    name: 'Brass Lotus Oil Lamp',
    category: 'Handicraft',
    price: 58,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'A decorative brass lamp with ceremonial influence and collector appeal.',
    fullDescription:
      'This product strengthens the higher-end craft side of the catalog, giving the travel app a more intentional mix of symbolic decor, heritage cues, and display-worthy forms.',
    artisan: 'Royal Metal Works',
    routeNote: 'Best framed after cultural landmarks and evening city walks.',
    stockLabel: 'Signature craft',
    tags: ['brass', 'lotus', 'decor', 'heritage'],
    highlights: ['Premium craft finish', 'High perceived value', 'Strong cultural identity'],
    accentColor: '#D4A45B',
    giftable: true,
    heritage: true,
    luxury: true,
    culinary: false,
  },
  {
    id: 'handloom-cotton-shawl',
    name: 'Handloom Cotton Shawl',
    category: 'Textile',
    price: 26,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'A breathable woven shawl with soft color and easy everyday styling.',
    fullDescription:
      'The handloom shawl gives the textile category another lighter-weight option, broadening the assortment with something practical, wearable, and friendly in price.',
    artisan: 'Kandy Loom House',
    routeNote: 'A good daytime find after lake walks and market browsing.',
    stockLabel: 'Easy carry',
    tags: ['handloom', 'cotton', 'wearable', 'gift'],
    highlights: ['Accessible textile pick', 'Good color softness', 'Travel-ready format'],
    accentColor: '#A85F62',
    giftable: true,
    heritage: true,
    luxury: false,
    culinary: false,
  },
  {
    id: 'batik-market-tote',
    name: 'Batik Market Tote',
    category: 'Textile',
    price: 22.5,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'A colorful fabric tote for casual city exploring and souvenir carrying.',
    fullDescription:
      'This tote adds a more relaxed textile product to the screen, helping the catalog feel more lifestyle-driven and useful for travelers browsing practical buys.',
    artisan: 'Temple Street Batik House',
    routeNote: 'Works well around market stops and casual afternoon shopping.',
    stockLabel: 'Popular carry-all',
    tags: ['tote', 'batik', 'travel', 'casual'],
    highlights: ['Useful daily item', 'Brightens the textile grid', 'Friendly price point'],
    accentColor: '#A85F62',
    giftable: true,
    heritage: false,
    luxury: false,
    culinary: false,
  },
  {
    id: 'sapphire-drop-earrings',
    name: 'Blue Sapphire Drop Earrings',
    category: 'Jewelry',
    price: 76,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Gem-toned earrings that give the jewelry range another polished hero.',
    fullDescription:
      'These earrings deepen the premium jewelry assortment with a brighter gemstone story, helping the product grid feel better balanced between silver, moonstone, and collector-led pieces.',
    artisan: 'Kandy Gem Gallery',
    routeNote: 'A strong evening browse for premium gifting or personal keepsakes.',
    stockLabel: 'Boutique favorite',
    tags: ['sapphire', 'earrings', 'premium', 'gift'],
    highlights: ['Extends premium range', 'Strong visual sparkle', 'Good modal hero candidate'],
    accentColor: '#5B728B',
    giftable: true,
    heritage: false,
    luxury: true,
    culinary: false,
  },
  {
    id: 'pepper-trio',
    name: 'Peppercorn Trio Set',
    category: 'Spices',
    price: 16.25,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1599909366507-929ab089e09e?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Three pepper varieties packed for home cooks and practical gifting.',
    fullDescription:
      'The pepper trio rounds out the edible product family with another compact culinary buy that supports quick basket building without overcomplicating the shopping flow.',
    artisan: 'Mahaweli Spice Table',
    routeNote: 'A natural pick after garden visits or cooking-focused travel plans.',
    stockLabel: 'Kitchen staple',
    tags: ['pepper', 'seasoning', 'culinary', 'souvenir'],
    highlights: ['Compact souvenir', 'Supports culinary theme', 'Easy add-to-cart item'],
    accentColor: '#BA6C4A',
    giftable: true,
    heritage: false,
    luxury: false,
    culinary: true,
  },
  {
    id: 'curry-leaf-seasoning',
    name: 'Curry Leaf Seasoning Blend',
    category: 'Spices',
    price: 13.75,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'A fragrant seasoning blend that feels local, quick, and easy to try.',
    fullDescription:
      'This blend keeps the spice category approachable by offering a lower-price entry point that still feels rooted in Kandy food culture and home-cooking memory.',
    artisan: 'Peradeniya Pantry Co.',
    routeNote: 'Best surfaced after tea and garden-inspired sightseeing.',
    stockLabel: 'Quick take-home',
    tags: ['seasoning', 'curry leaf', 'culinary', 'budget'],
    highlights: ['Budget-friendly spice buy', 'Strong regional flavor', 'Broad shopper appeal'],
    accentColor: '#BA6C4A',
    giftable: false,
    heritage: false,
    luxury: false,
    culinary: true,
  },
  {
    id: 'ceramic-incense-holder',
    name: 'Ceramic Incense Holder',
    category: 'Pottery',
    price: 21,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5b74b?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'A calm ceramic accent piece with a compact, shelf-friendly silhouette.',
    fullDescription:
      'The incense holder gives the pottery line a smaller decorative object, which helps the page feel more flexible across price bands and souvenir styles.',
    artisan: 'Udawatta Clay Studio',
    routeNote: 'Pairs well with quieter cultural stops and temple-area browsing.',
    stockLabel: 'Small studio batch',
    tags: ['ceramic', 'incense', 'home decor', 'gift'],
    highlights: ['Compact pottery choice', 'Calm travel mood', 'Easy styling piece'],
    accentColor: '#2A584A',
    giftable: true,
    heritage: false,
    luxury: false,
    culinary: false,
  },
];

export const PRODUCT_PAGE_SIZE = 6;

const PRODUCT_FETCH_DELAY_MS = 260;
const INITIAL_PRODUCT_FETCH_DELAY_MS = 420;

const filterProductByQuickFilter = (product: Product, quickFilterId: QuickFilterId | null) => {
  if (!quickFilterId) {
    return true;
  }

  switch (quickFilterId) {
    case 'giftable':
      return product.giftable;
    case 'under-30':
      return product.price <= 30;
    case 'heritage':
      return product.heritage;
    case 'luxury':
      return product.luxury;
    case 'culinary':
      return product.culinary;
    default:
      return true;
  }
};

const filterProducts = ({
  category,
  quickFilterId,
  searchQuery,
}: Pick<ProductQuery, 'category' | 'quickFilterId' | 'searchQuery'>) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return PRODUCTS.filter((product) => {
    const searchableValues = [
      product.name,
      product.category,
      product.shortDescription,
      product.fullDescription,
      product.artisan,
      product.routeNote,
      ...product.tags,
    ];

    const matchesQuery =
      normalizedQuery.length === 0 ||
      searchableValues.some((value) => value.toLowerCase().includes(normalizedQuery));
    const matchesCategory = category === 'All' || product.category === category;
    const matchesQuickFilter = filterProductByQuickFilter(product, quickFilterId);

    return matchesQuery && matchesCategory && matchesQuickFilter;
  });
};

export async function fetchProductsPage({
  category,
  cursor = 0,
  pageSize = PRODUCT_PAGE_SIZE,
  quickFilterId,
  searchQuery,
}: ProductQuery): Promise<ProductPage> {
  const filteredProducts = filterProducts({
    category,
    quickFilterId,
    searchQuery,
  });
  const items = filteredProducts.slice(cursor, cursor + pageSize);
  const nextCursor = cursor + items.length < filteredProducts.length ? cursor + items.length : null;

  await new Promise((resolve) => {
    setTimeout(resolve, cursor === 0 ? INITIAL_PRODUCT_FETCH_DELAY_MS : PRODUCT_FETCH_DELAY_MS);
  });

  return {
    items,
    nextCursor,
    total: filteredProducts.length,
  };
}
