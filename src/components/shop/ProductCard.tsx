import { Check, Eye, Heart, MessageSquareText, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Availability, Product } from '../../data/types';
import { departmentById } from '../../data/navigation';
import { cn, discountPct, formatINR } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { Img, Stars } from '../ui/primitives';

export const availabilityLabel: Record<Availability, { text: string; dot: string }> = {
  available: { text: 'Available to order', dot: 'bg-emerald-500' },
  'made-to-order': { text: 'Made to order', dot: 'bg-sky-500' },
  enquire: { text: 'Enquire for availability', dot: 'bg-gold-500' },
};

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { addToCart, toggleWishlist, wishlist, openQuickView, openBulk } = useShop();
  const [added, setAdded] = useState(false);
  const saved = wishlist.includes(product.id);
  const off = discountPct(product);
  const avail = availabilityLabel[product.availability];

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(t);
  }, [added]);

  const badge = product.flags.newArrival ? 'New' : product.flags.bestseller ? 'Bestseller' : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgb(23_25_29_/_0.4)]">
      <div className="relative aspect-square overflow-hidden bg-[#eceef1]">
        <button type="button" onClick={() => openQuickView(product.id)} className="block size-full" aria-label={`Quick view ${product.name}`} tabIndex={-1}>
          <Img
            src={product.image}
            alt={product.imageAlt}
            loading={priority ? 'eager' : 'lazy'}
            className="size-full object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
          />
        </button>
        <div className="pointer-events-none absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5 sm:left-3 sm:top-3">
          {off > 0 && <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[0.68rem] font-bold text-ink-950 sm:text-xs">−{off}%</span>}
          {badge && <span className="rounded-full bg-ink-950/85 px-2 py-0.5 text-[0.68rem] font-semibold text-white backdrop-blur sm:text-xs">{badge}</span>}
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={cn(
            'absolute right-2.5 top-2.5 grid size-9 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 sm:right-3 sm:top-3 sm:size-10',
            saved ? 'text-[#d64545]' : 'text-ink hover:text-[#d64545]',
          )}
        >
          <Heart className="size-4.5" fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="absolute bottom-2.5 right-2.5 grid size-9 place-items-center rounded-full bg-white/95 text-ink shadow-sm sm:hidden"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="size-4.5" />
        </button>
        <div className="absolute inset-x-3 bottom-3 hidden translate-y-3 opacity-0 transition duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          <button type="button" onClick={() => openQuickView(product.id)} className="btn h-10 min-h-0 w-full bg-white/95 text-sm text-ink shadow-md backdrop-blur hover:bg-white">
            <Eye className="size-4" aria-hidden="true" /> Quick View
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <p className="truncate text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[0.7rem]">
            {product.brand} <span className="font-normal normal-case tracking-normal text-slate/70">· {departmentById(product.department).label}</span>
          </p>
        </div>
        <h3 className="line-clamp-2 min-h-[2.5em] text-sm font-semibold leading-snug text-ink sm:text-[0.95rem]">
          <button type="button" onClick={() => openQuickView(product.id)} className="text-left hover:text-gold-600">
            {product.name}
          </button>
        </h3>
        <p className="mt-1 truncate text-xs text-slate">{product.specs.join(' · ')}</p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate">
          <Stars rating={product.rating} />
          <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-display text-lg font-extrabold text-ink sm:text-xl">{formatINR(product.price)}</span>
          {off > 0 && (
            <>
              <span className="text-xs text-slate line-through">
                <span className="sr-only">MRP </span>
                {formatINR(product.mrp)}
              </span>
              <span className="text-xs font-semibold text-emerald-700">{off}% off</span>
            </>
          )}
        </div>
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.7rem] text-slate sm:text-xs">
          <span className={cn('size-1.5 rounded-full', avail.dot)} aria-hidden="true" />
          {avail.text}
        </p>
        <div className="mt-auto pt-3">
          {product.availability === 'enquire' ? (
            <button type="button" onClick={() => openBulk(departmentById(product.department).label)} className="btn btn-outline h-10 min-h-0 w-full px-3 text-sm sm:h-11">
              <MessageSquareText className="size-4" aria-hidden="true" /> Enquire
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                addToCart(product.id);
                setAdded(true);
              }}
              className={cn('btn h-10 min-h-0 w-full px-3 text-sm sm:h-11', added ? 'bg-emerald-600 text-white' : 'btn-dark')}
            >
              {added ? <Check className="size-4" aria-hidden="true" /> : <ShoppingBag className="size-4" aria-hidden="true" />}
              {added ? 'Added' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
