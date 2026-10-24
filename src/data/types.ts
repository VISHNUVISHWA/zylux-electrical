import type { LucideIcon } from 'lucide-react';

export type DepartmentId = 'lighting' | 'switches' | 'wires' | 'fans' | 'protection' | 'accessories' | 'smart';

export type Availability = 'available' | 'enquire' | 'made-to-order';

export interface Product {
  id: string;
  name: string;
  brand: string;
  department: DepartmentId;
  subcategory: string;
  /** Short spec line shown on cards, e.g. "9W · B22 · 6500K" */
  specs: string[];
  /** Longer bullet points shown in Quick View */
  details: string[];
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  imageAlt: string;
  flags: { featured?: boolean; bestseller?: boolean; newArrival?: boolean; deal?: boolean };
  availability: Availability;
  tags: string[];
  /** Lower = newer. Used for the "New Arrivals" sort. */
  newness: number;
}

export interface MegaColumn {
  title: string;
  items: string[];
}

export interface MegaThumb {
  label: string;
  image: string;
  sub: string;
}

export interface Department {
  id: DepartmentId;
  label: string;
  heading: string;
  description: string;
  icon: LucideIcon;
  image: string;
  columns: MegaColumn[];
  thumbs: MegaThumb[];
  promo: { eyebrow: string; title: string; text: string; image: string; cta: string };
  brands: string[];
}

export type CtaAction =
  | { type: 'scroll'; target: string }
  | { type: 'browse'; department?: DepartmentId; sub?: string; tab?: TabId }
  | { type: 'bulk' };

export interface Cta {
  label: string;
  action: CtaAction;
}

export type TabId = 'all' | 'featured' | 'bestsellers' | 'new' | 'lighting' | 'switches' | 'wires' | 'deals';
export type SortId = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'new';

export interface CatalogFilter {
  tab: TabId;
  department: DepartmentId | 'all';
  sub?: string;
  query?: string;
  sort: SortId;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: [string, string];
  text: string;
  image: string;
  imageSm: string;
  alt: string;
  ctas: Cta[];
  /** Tailwind object-position classes */
  position: string;
}

export interface CategoryTile {
  label: string;
  image: string;
  hint: string;
  action: CtaAction;
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
}

export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  tag: string;
  body: GuideBlock[];
}

export type GuideBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'note'; text: string };

export type InfoKey = 'track' | 'contact' | 'whatsapp' | 'shipping' | 'returns' | 'privacy' | 'terms' | 'account';
