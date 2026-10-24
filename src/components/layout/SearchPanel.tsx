import { ArrowUpRight, Clock, SearchX, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { demoRecentSearches, popularSearches } from '../../data/content';
import { departments } from '../../data/navigation';
import { products } from '../../data/products';
import type { DepartmentId } from '../../data/types';
import { cn, formatINR, searchProducts } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { Img } from '../ui/primitives';

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent font-semibold text-gold-600">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export function useSearchResults(query: string) {
  return useMemo(() => {
    const q = query.trim();
    if (!q) return { items: [], categories: [] as { id: DepartmentId; label: string; sub?: string }[] };
    const items = searchProducts(products, q).slice(0, 6);
    const lower = q.toLowerCase();
    const categories: { id: DepartmentId; label: string; sub?: string }[] = [];
    for (const d of departments) {
      if (d.label.toLowerCase().includes(lower)) categories.push({ id: d.id, label: d.label });
      for (const c of d.columns)
        for (const i of c.items) if (i.toLowerCase().includes(lower)) categories.push({ id: d.id, label: `${i} · ${d.label}`, sub: i });
    }
    return { items, categories: categories.slice(0, 5) };
  }, [query]);
}

interface Props {
  query: string;
  activeIndex: number;
  listId: string;
  onSearch: (q: string) => void;
  onPickProduct: (id: string) => void;
  onPickCategory: (dept: DepartmentId, sub?: string) => void;
}

export function SearchPanel({ query, activeIndex, listId, onSearch, onPickProduct, onPickCategory }: Props) {
  const { recentSearches } = useShop();
  const { items, categories } = useSearchResults(query);
  const recent = recentSearches.length ? recentSearches : demoRecentSearches;
  const chip =
    'inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink transition hover:border-gold-500 hover:text-gold-600';

  if (!query.trim()) {
    return (
      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <div>
            <p className="eyebrow mb-3 text-slate">{recentSearches.length ? 'Recent searches' : 'Recently searched (demo)'}</p>
            <ul className="space-y-1">
              {recent.map((r) => (
                <li key={r}>
                  <button type="button" onClick={() => onSearch(r)} className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-paper">
                    <Clock className="size-4 text-slate" aria-hidden="true" />
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2 text-slate">
              <TrendingUp className="size-3.5" aria-hidden="true" /> Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((s) => (
                <button type="button" key={s} className={chip} onClick={() => onSearch(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-3 text-slate">Suggested categories</p>
          <div className="grid grid-cols-2 gap-2">
            {departments.map((d) => (
              <button
                type="button"
                key={d.id}
                onClick={() => onPickCategory(d.id)}
                className="group flex items-center gap-3 rounded-xl border border-line p-2 text-left text-sm font-medium transition hover:border-gold-500"
              >
                <span className="size-11 shrink-0 overflow-hidden rounded-lg bg-paper">
                  <Img src={d.image} alt="" className="size-full object-cover" />
                </span>
                <span className="leading-tight">{d.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!items.length && !categories.length) {
    return (
      <div className="p-6 text-center sm:p-8">
        <SearchX className="mx-auto mb-3 size-8 text-gold-600" aria-hidden="true" />
        <p className="font-display text-lg font-bold">No matches for “{query}”</p>
        <p className="mt-1 text-sm text-slate">Check the spelling or try a broader term. Popular right now:</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {popularSearches.slice(0, 6).map((s) => (
            <button type="button" key={s} className={chip} onClick={() => onSearch(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="eyebrow mb-3 text-slate">Products</p>
        {items.length ? (
          <ul id={listId} role="listbox" aria-label="Product suggestions" className="space-y-1">
            {items.map((p, i) => (
              <li key={p.id} role="option" aria-selected={activeIndex === i} id={`${listId}-${i}`}>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => onPickProduct(p.id)}
                  className={cn('flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-paper', activeIndex === i && 'bg-paper ring-1 ring-gold-500/50')}
                >
                  <span className="size-14 shrink-0 overflow-hidden rounded-lg bg-paper">
                    <Img src={p.image} alt="" className="size-full object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-slate">{p.brand}</span>
                    <span className="block truncate text-sm font-medium">
                      <Highlight text={p.name} query={query} />
                    </span>
                    <span className="block text-xs text-slate">{p.specs.join(' · ')}</span>
                  </span>
                  <span className="text-sm font-bold">{formatINR(p.price)}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate">No products match yet — try a category on the right.</p>
        )}
      </div>
      <div className="space-y-5">
        {categories.length > 0 && (
          <div>
            <p className="eyebrow mb-3 text-slate">Categories</p>
            <ul className="space-y-1">
              {categories.map((c) => (
                <li key={c.label}>
                  <button
                    type="button"
                    onClick={() => onPickCategory(c.id, c.sub)}
                    className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-paper"
                  >
                    <span>
                      <Highlight text={c.label} query={query} />
                    </span>
                    <ArrowUpRight className="size-4 text-slate" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="button" onClick={() => onSearch(query)} className="btn btn-dark w-full">
          See all results for “{query.trim()}”
        </button>
      </div>
    </div>
  );
}
