import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown, Eye, LayoutGrid, Plus } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { demoBrands, departmentById, departments, navItems, plannedBrandExamples } from '../../data/navigation';
import { products } from '../../data/products';
import type { Department, DepartmentId } from '../../data/types';
import { cn, formatINR, scrollToId } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { Img } from '../ui/primitives';

type MenuId = 'all' | 'brands' | DepartmentId;

// Shorter labels keep the bar on one line; mega panels always show the full names.
const labelShort: Partial<Record<string, string>> = {
  switches: 'Switches',
  fans: 'Fans',
  protection: 'Protection',
  accessories: 'Accessories',
};
const labelMid: Partial<Record<string, string>> = { protection: 'Protection', accessories: 'Accessories' };

function HighlightProduct({ department, onDone }: { department: DepartmentId; onDone: () => void }) {
  const { addToCart, openQuickView } = useShop();
  const product = products.find((p) => p.department === department && p.flags.featured) ?? products.find((p) => p.department === department);
  if (!product) return null;
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-800 p-3">
      <span className="size-16 shrink-0 overflow-hidden rounded-xl bg-white">
        <Img src={product.image} alt={product.imageAlt} className="size-full object-cover" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-gold-300">Highlighted product</p>
        <p className="truncate text-sm font-medium text-white">{product.name}</p>
        <p className="text-sm">
          <span className="font-bold text-white">{formatINR(product.price)}</span>{' '}
          <span className="text-xs text-muted line-through">{formatINR(product.mrp)}</span>
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => {
            onDone();
            openQuickView(product.id);
          }}
          className="grid size-8 place-items-center rounded-full bg-white/8 text-white transition hover:bg-white/15"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="grid size-8 place-items-center rounded-full bg-gold-500 text-ink-950 transition hover:bg-gold-300"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

function DepartmentPanel({ dept, onBrowse, onClose }: { dept: Department; onBrowse: (d: DepartmentId, sub?: string) => void; onClose: () => void }) {
  const Icon = dept.icon;
  return (
    <div className="container-x grid grid-cols-12 gap-8 py-8">
      <div className="col-span-8 xl:col-span-9">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-2 flex items-center gap-2 text-gold-300">
              <Icon className="size-4" aria-hidden="true" /> Shop by category
            </p>
            <h3 className="font-display text-2xl font-extrabold text-white">{dept.heading}</h3>
            <p className="mt-1 max-w-xl text-sm text-muted">{dept.description}</p>
          </div>
          <button type="button" onClick={() => onBrowse(dept.id)} className="btn btn-ghost-dark h-10 min-h-0 shrink-0 text-sm">
            Shop all {dept.label} <ArrowRight className="arrow size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          {dept.columns.map((col) => (
            <div key={col.title}>
              <button
                type="button"
                onClick={() => onBrowse(dept.id, col.title)}
                className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-300 transition hover:text-gold-400"
              >
                {col.title}
              </button>
              <ul className="space-y-0.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => onBrowse(dept.id, item)}
                      className="group/link flex w-full items-center gap-2 rounded-md py-1.5 text-left text-[0.92rem] text-white/75 transition hover:text-white"
                    >
                      <span className="h-px w-0 bg-gold-300 transition-all duration-300 group-hover/link:w-3" aria-hidden="true" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-6">
          <div className="flex gap-3">
            {dept.thumbs.map((t) => (
              <button type="button" key={t.label} onClick={() => onBrowse(dept.id, t.sub)} className="group/thumb w-[104px] text-left">
                <span className="mb-2 block aspect-square overflow-hidden rounded-xl bg-white ring-1 ring-white/10 transition group-hover/thumb:ring-gold-500">
                  <Img src={t.image} alt="" className="size-full object-cover transition duration-500 group-hover/thumb:scale-105" />
                </span>
                <span className="block text-xs font-medium text-white/80 group-hover/thumb:text-white">{t.label}</span>
              </button>
            ))}
          </div>
          <div>
            <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">Popular brands (demo)</p>
            <div className="flex flex-wrap gap-2">
              {dept.brands.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => {
                    onClose();
                    scrollToId('#brands');
                  }}
                  className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-gold-300 hover:text-gold-300"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-3 xl:col-span-3">
        <button
          type="button"
          onClick={() => onBrowse(dept.id)}
          className="group/promo relative flex min-h-[290px] flex-1 overflow-hidden rounded-2xl text-left ring-1 ring-white/10"
        >
          <Img src={dept.promo.image} alt="" className="absolute inset-0 size-full object-cover transition duration-700 group-hover/promo:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" aria-hidden="true" />
          <span className="relative mt-auto block p-5">
            <span className="eyebrow block text-gold-300">{dept.promo.eyebrow}</span>
            <span className="mt-1 block font-display text-xl font-extrabold leading-tight text-white">{dept.promo.title}</span>
            <span className="mt-1 block text-sm text-white/70">{dept.promo.text}</span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
              {dept.promo.cta} <ArrowRight className="size-4 transition group-hover/promo:translate-x-1" aria-hidden="true" />
            </span>
          </span>
        </button>
        <HighlightProduct department={dept.id} onDone={onClose} />
      </div>
    </div>
  );
}

function AllCategoriesPanel({ onBrowse, onBulk }: { onBrowse: (d: DepartmentId, sub?: string) => void; onBulk: () => void }) {
  return (
    <div className="container-x py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-2 text-gold-300">All departments</p>
          <h3 className="font-display text-2xl font-extrabold text-white">Everything to power, connect, protect and illuminate</h3>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {departments.map((d) => {
          const Icon = d.icon;
          return (
            <div key={d.id} className="group/card overflow-hidden rounded-2xl border border-white/10 bg-ink-800 transition hover:border-gold-500/60">
              <button type="button" onClick={() => onBrowse(d.id)} className="block w-full text-left">
                <span className="block aspect-[16/8] overflow-hidden bg-white">
                  <Img src={d.image} alt="" className="size-full object-cover transition duration-700 group-hover/card:scale-105" />
                </span>
                <span className="flex items-center gap-2 px-4 pt-3 font-display font-bold text-white">
                  <Icon className="size-4 text-gold-300" aria-hidden="true" />
                  {d.label}
                </span>
              </button>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 px-4 pb-4 pt-2">
                {d.columns
                  .flatMap((c) => c.items)
                  .slice(0, 4)
                  .map((i) => (
                    <li key={i}>
                      <button type="button" onClick={() => onBrowse(d.id, i)} className="text-xs text-muted transition hover:text-white">
                        {i}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          );
        })}
        <button
          type="button"
          onClick={onBulk}
          className="flex flex-col justify-between rounded-2xl border border-gold-500/40 bg-gradient-to-br from-gold-500/15 to-transparent p-5 text-left transition hover:border-gold-300"
        >
          <span>
            <span className="eyebrow block text-gold-300">Projects & trade</span>
            <span className="mt-2 block font-display text-xl font-extrabold text-white">Bulk & Project Supply</span>
            <span className="mt-2 block text-sm text-muted">Share a material list and receive a consolidated quote.</span>
          </span>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
            Request a quote <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  );
}

function BrandsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="container-x grid grid-cols-12 gap-8 py-8">
      <div className="col-span-8">
        <p className="eyebrow mb-2 text-gold-300">Brands</p>
        <h3 className="font-display text-2xl font-extrabold text-white">Shop by brand</h3>
        <p className="mt-1 text-sm text-muted">Placeholder slots for brand logos. The names below are fictional demo brands.</p>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {demoBrands.map((b) => (
            <button
              type="button"
              key={b.name}
              onClick={() => {
                onClose();
                scrollToId('#brands');
              }}
              className="flex h-24 flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-ink-800 px-3 text-white/85 transition hover:border-gold-500/60 hover:text-white"
            >
              <span className={cn('text-lg', b.style)}>{b.name}</span>
              <span className="text-[0.68rem] text-muted">{b.focus}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-4 rounded-2xl border border-dashed border-white/15 p-6">
        <p className="eyebrow text-gold-300">Planned brand slots</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Commonly requested brands such as {plannedBrandExamples.join(', ')} can be featured here once supply relationships are confirmed by ZYLUX
          Electrical.
        </p>
        <p className="mt-3 text-xs text-muted/80">No partnership, authorised dealership or availability is implied in this demo.</p>
        <button
          type="button"
          onClick={() => {
            onClose();
            scrollToId('#brands');
          }}
          className="btn btn-ghost-dark mt-5 h-10 min-h-0 text-sm"
        >
          View featured brands <ArrowRight className="arrow size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function CategoryNav() {
  const { runAction, openBulk } = useShop();
  const [active, setActive] = useState<MenuId | null>(null);
  const openTimer = useRef<number>(0);
  const closeTimer = useRef<number>(0);
  const pointerType = useRef<string>('mouse');
  const navRef = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };
  const close = useCallback(() => {
    clearTimers();
    setActive(null);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const btn = navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${active}"]`);
        close();
        btn?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [active, close]);

  const hoverOpen = (id: MenuId) => {
    if (pointerType.current !== 'mouse') return;
    clearTimers();
    if (active) setActive(id);
    else openTimer.current = window.setTimeout(() => setActive(id), 90);
  };
  const scheduleClose = () => {
    if (pointerType.current !== 'mouse') return;
    clearTimers();
    closeTimer.current = window.setTimeout(() => setActive(null), 180);
  };

  const browse = (department: DepartmentId, sub?: string) => {
    close();
    runAction({ type: 'browse', department, sub });
  };

  return (
    <div
      ref={navRef}
      className="relative hidden border-t border-white/[0.06] lg:block"
      onPointerMove={(e) => (pointerType.current = e.pointerType)}
      onPointerDown={(e) => (pointerType.current = e.pointerType)}
      onMouseLeave={scheduleClose}
      onMouseEnter={() => window.clearTimeout(closeTimer.current)}
    >
      <nav aria-label="Product categories" className="container-x">
        <ul className="flex items-center justify-between gap-0.5">
          {navItems.map((item) => {
            if (item.kind === 'link') {
              return (
                <li key={item.id} onMouseEnter={() => active && scheduleClose()}>
                  <button
                    type="button"
                    onFocus={() => active && close()}
                    onClick={() => {
                      close();
                      scrollToId(item.target);
                    }}
                    className={cn(
                      'flex h-12 items-center whitespace-nowrap px-2 text-[0.84rem] font-medium transition',
                      item.id === 'offers' ? 'text-gold-300 hover:text-gold-400' : 'text-white/75 hover:text-white',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            }
            const isActive = active === item.id;
            const panelId = `mega-${item.id}`;
            return (
              <li
                key={item.id}
                onMouseEnter={() => hoverOpen(item.id)}
                onBlur={(e) => {
                  if (isActive && !e.currentTarget.contains(e.relatedTarget as Node)) setActive(null);
                }}
              >
                <button
                  type="button"
                  data-menu={item.id}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onFocus={(e) => {
                    // Open on keyboard focus only (mouse clicks also focus the button).
                    if (e.currentTarget.matches(':focus-visible')) setActive(item.id);
                  }}
                  onKeyDown={(e) => {
                    // Tab moves between top-level items; ArrowDown / Enter enters the open panel.
                    if (e.key === 'Tab' && !e.shiftKey && isActive) {
                      const triggers = Array.from(navRef.current?.querySelectorAll<HTMLElement>('nav > ul > li > button') ?? []);
                      const next = triggers[triggers.indexOf(e.currentTarget) + 1];
                      if (next) {
                        e.preventDefault();
                        next.focus();
                      }
                      return;
                    }
                    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActive(item.id);
                      requestAnimationFrame(() =>
                        document.getElementById(panelId)?.querySelector<HTMLElement>('button, a')?.focus(),
                      );
                    }
                  }}
                  onClick={(e) => {
                    // Keyboard activation is handled in onKeyDown; mouse keeps open; touch toggles.
                    if (e.detail === 0) return;
                    if (pointerType.current === 'mouse') setActive(item.id);
                    else setActive(isActive ? null : item.id);
                  }}
                  className={cn(
                    'relative flex h-12 items-center gap-1.5 whitespace-nowrap px-2 text-[0.84rem] font-medium transition',
                    item.id === 'all' && 'pl-0 xl:pl-0',
                    isActive ? 'text-gold-300' : 'text-white/75 hover:text-white',
                  )}
                >
                  {item.id === 'all' && (
                    <span className="mr-1 grid size-7 place-items-center rounded-full bg-gold-500 text-ink-950">
                      <LayoutGrid className="size-3.5" aria-hidden="true" />
                    </span>
                  )}
                  <span className="min-[1440px]:hidden">{labelShort[item.id] ?? item.label}</span>
                  <span className="hidden min-[1440px]:inline">{labelMid[item.id] ?? item.label}</span>
                  <ChevronDown className={cn('hidden size-3.5 opacity-60 transition-transform duration-300 xl:block', isActive && 'rotate-180')} aria-hidden="true" />
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gold-300" aria-hidden="true" />
                  )}
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-label={`${item.label} menu`}
                      initial={{ opacity: 0, y: -10, clipPath: 'inset(0 0 100% 0)' }}
                      animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                      exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-140px)] overflow-y-auto border-t border-gold-500/25 bg-ink-900 shadow-[0_40px_80px_-20px_rgb(0_0_0_/_0.8)]"
                    >
                      {item.id === 'all' ? (
                        <AllCategoriesPanel
                          onBrowse={browse}
                          onBulk={() => {
                            close();
                            openBulk();
                          }}
                        />
                      ) : item.id === 'brands' ? (
                        <BrandsPanel onClose={close} />
                      ) : (
                        <DepartmentPanel dept={departmentById(item.id)} onBrowse={browse} onClose={close} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
