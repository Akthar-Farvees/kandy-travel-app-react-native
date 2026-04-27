export type ProductCategory =
  | 'Tea'
  | 'Handicraft'
  | 'Textile'
  | 'Jewelry'
  | 'Spices'
  | 'Pottery';

export type QuickFilterId = 'giftable' | 'under-30' | 'heritage' | 'luxury' | 'culinary';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  artisan: string;
  routeNote: string;
  stockLabel: string;
  tags: string[];
  highlights: string[];
  accentColor: string;
  giftable: boolean;
  heritage: boolean;
  luxury: boolean;
  culinary: boolean;
}

export interface ProductQuery {
  category: 'All' | ProductCategory;
  cursor?: number;
  pageSize?: number;
  quickFilterId: QuickFilterId | null;
  searchQuery: string;
}

export interface ProductPage {
  items: Product[];
  nextCursor: number | null;
  total: number;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface Attraction {
  id: string;
  image: string;
  location: string;
  note: string;
  shoppingCue: string;
  title: string;
}

export interface CollectionStory {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  accentColor: string;
}

export interface QuickFilter {
  id: QuickFilterId;
  label: string;
  hint: string;
}

export interface PromptShortcut {
  chipLabel: string;
  query: string;
  spokenText: string;
  category?: ProductCategory;
  quickFilter?: QuickFilterId | null;
}
