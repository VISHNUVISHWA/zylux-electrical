import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Info, PackageSearch, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { departments } from '../../data/navigation';
import { products } from '../../data/products';
import type { DepartmentId, SortId, TabId } from '../../data/types';
import { applyCatalogFilter, cn } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { ProductCard } from '../shop/ProductCard';
import { DemoTag, Reveal, SectionHeading } from '../ui/primitives';

const tabs: { id: TabId; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'bestsellers', label: 'Best Sellers' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'switches', label: 'Switches' },
  { id: 'wires', label: 'Wires & Cables' },
  { id: 'deals', label: 'Deals' },
  { id: 'all', label: 'All Products' },
];

const sorts: { id: SortId; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Rating' },
  { id: 'new', label: 'New Arrivals' },
];

const PAGE = 8;

function Select<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { id: T; label: string }[] }) {
  return (
    <label className="relative flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-11 appearance-none rounded-full border border-line bg-white pl-4 pr-10 text-sm font-medium text-ink transition hover:border-ink/40 focus:border-gold-500 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {label}: {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 size-4 text-slate" aria-hidden="true" />
    </label>
  );
}

export function ProductGrid() {
  const { catalog, setCatalog } = useShop();
  const [limit, setLimit] = useState(PAGE);
  const { items, subMissing } = useMemo(() => applyCatalogFilter(products, catalog), [catalog]);

  useEffect(() => setLimit(PAGE), [catalog]);

  const visible = items.slice(0, limit);
  const deptLabel = catalog.department !== 'all' ? departments.find((d) => d.id === catalog.department)?.label : undefined;
  const chips = [
    catalog.query && { key: 'query', label: `“${catalog.query}”`, clear: () => setCatalog({ query: undefined }) },
    deptLabel && { key: 'dept', label: deptLabel, clear: () => setCatalog({ department: 'all', sub: undefined }) },
    catalog.sub && !subMissing && { key: 'sub', label: catalog.sub.replace(/^./, (c) => c.toUpperCase()), clear: () => setCatalog({ sub: undefined }) },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  return (
    <section id="products" aria-labelledby="products-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="products-title"
            eyebrow="Shop the range"
            title="Featured Electrical Essentials"
            text="Discover everyday essentials and modern electrical innovations."
            action={<DemoTag>Sample prices & ratings</DemoTag>}
          />
        </Reveal>

        {/* Tabs */}
        <div className="-mx-4 mb-6 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Product collections" className="inline-flex min-w-max gap-1 rounded-full bg-paper p-1.5 ring-1 ring-line">
            {tabs.map((t) => {
              const selected = catalog.tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="product-results"
                  onClick={() => setCatalog({ tab: t.id, department: 'all', sub: undefined, query: undefined })}
                  className={cn('relative h-10 rounded-full px-4 text-sm font-semibold transition sm:px-5', selected ? 'text-white' : 'text-slate hover:text-ink')}
                >
                  {selected && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink-950" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <SlidersHorizontal className="size-4 text-slate" aria-hidden="true" />
            <span className="font-medium text-ink" aria-live="polite">
              {items.length} {items.length === 1 ? 'product' : 'products'}
            </span>
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={c.clear}
                className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/12 px-3 py-1 text-sm font-medium text-ink ring-1 ring-gold-500/30 transition hover:bg-gold-500/20"
                aria-label={`Remove filter ${c.label}`}
              >
                {c.label} <X className="size-3.5" aria-hidden="true" />
              </button>
            ))}
            {chips.length > 1 && (
              <button type="button" onClick={() => setCatalog({ tab: 'all', department: 'all', sub: undefined, query: undefined })} className="text-sm text-slate underline-offset-2 hover:underline">
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Select<DepartmentId | 'all'>
              label="Category"
              value={catalog.department}
              onChange={(v) => setCatalog({ department: v, sub: undefined })}
              options={[{ id: 'all', label: 'All' }, ...departments.map((d) => ({ id: d.id, label: d.label }))]}
            />
            <Select<SortId> label="Sort" value={catalog.sort} onChange={(v) => setCatalog({ sort: v })} options={sorts} />
          </div>
        </div>

        {subMissing && catalog.sub && (
          <p className="mb-6 flex items-start gap-2 rounded-xl bg-paper p-3.5 text-sm text-slate ring-1 ring-line">
            <Info className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
            <span>
              No demo products are listed under <strong className="text-ink">{catalog.sub}</strong> yet — showing related {deptLabel ?? ''} products instead.
            </span>
          </p>
        )}

        <div id="product-results" role="tabpanel">
          {items.length === 0 ? (
            <div className="rounded-2xl bg-paper px-6 py-16 text-center ring-1 ring-line">
              <PackageSearch className="mx-auto mb-3 size-9 text-gold-600" aria-hidden="true" />
              <p className="font-display text-xl font-bold">No products match these filters</p>
              <p className="mt-1 text-sm text-slate">Try a different category or clear your search.</p>
              <button type="button" onClick={() => setCatalog({ tab: 'all', department: 'all', sub: undefined, query: undefined })} className="btn btn-dark mt-5">
                Show all products
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((p, i) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: Math.min(i, 8) * 0.03 } }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  >
                    <ProductCard product={p} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {items.length > limit && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="btn btn-outline h-12 w-full whitespace-normal px-8 sm:w-auto">
              Show more products ({items.length - limit} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
