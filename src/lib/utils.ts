import { departments } from '../data/navigation';
import type { CatalogFilter, Product } from '../data/types';

export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
export const formatINR = (value: number) => inr.format(value);

export const discountPct = (p: Pick<Product, 'price' | 'mrp'>) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable (private mode, blocked) — demo keeps working in memory */
    }
  },
};

export function scrollToId(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

const departmentLabel = (p: Product) => departments.find((d) => d.id === p.department)?.label ?? '';

const haystack = (p: Product) =>
  [p.name, p.brand, p.subcategory, departmentLabel(p), ...p.specs, ...p.tags].join(' ').toLowerCase();

const normalise = (s: string) => s.toLowerCase().replace(/sq\.?\s?mm/g, 'sq mm').replace(/[^a-z0-9.\s]/g, ' ');

/** Simple token search across name, brand, category and specifications. */
export function searchProducts(list: Product[], query: string): Product[] {
  const tokens = normalise(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return list
    .map((p) => {
      const text = normalise(haystack(p));
      let score = 0;
      for (const t of tokens) {
        if (!text.includes(t)) return { p, score: -1 };
        score += p.name.toLowerCase().includes(t) ? 3 : 1;
      }
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

/** Subcategory names can be menu labels ("Chandeliers") or group names ("Outdoor Lighting"). */
function matchesSub(p: Product, sub: string) {
  const s = sub.toLowerCase();
  if (p.subcategory.toLowerCase() === s) return true;
  if (p.tags.some((t) => t === s)) return true;
  const dept = departments.find((d) => d.id === p.department);
  const column = dept?.columns.find((c) => c.title.toLowerCase() === s);
  if (column) return column.items.some((i) => i.toLowerCase() === p.subcategory.toLowerCase());
  return false;
}

export function applyCatalogFilter(list: Product[], f: CatalogFilter) {
  let base = list;
  switch (f.tab) {
    case 'featured':
      base = base.filter((p) => p.flags.featured);
      break;
    case 'bestsellers':
      base = base.filter((p) => p.flags.bestseller);
      break;
    case 'new':
      base = base.filter((p) => p.flags.newArrival);
      break;
    case 'deals':
      base = base.filter((p) => p.flags.deal);
      break;
    case 'lighting':
    case 'switches':
    case 'wires':
      base = base.filter((p) => p.department === f.tab);
      break;
  }
  if (f.department !== 'all') base = base.filter((p) => p.department === f.department);
  if (f.query) base = searchProducts(base, f.query);

  let subMissing = false;
  if (f.sub) {
    const narrowed = base.filter((p) => matchesSub(p, f.sub!));
    if (narrowed.length) base = narrowed;
    else subMissing = true;
  }

  const sorted = [...base];
  switch (f.sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      break;
    case 'new':
      sorted.sort((a, b) => a.newness - b.newness);
      break;
    default:
      if (!f.query) sorted.sort((a, b) => Number(!!b.flags.featured) - Number(!!a.flags.featured));
  }
  return { items: sorted, subMissing };
}
