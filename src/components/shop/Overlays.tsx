import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CircleCheck, Heart, Info, Lock, MapPin, PackageCheck, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { infoContent } from '../../data/content';
import { departmentById } from '../../data/navigation';
import { productById } from '../../data/products';
import { cn, discountPct, formatINR, scrollToId } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { Dialog } from '../ui/Dialog';
import { DemoTag, Img, QtyStepper, Stars } from '../ui/primitives';
import { availabilityLabel } from './ProductCard';

function EmptyState({ icon: Icon, title, text, onAction }: { icon: typeof Heart; title: string; text: string; onAction: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-paper text-gold-600">
        <Icon className="size-7" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <p className="mt-5 font-display text-xl font-bold">{title}</p>
      <p className="mt-1 text-sm text-slate">{text}</p>
      <button type="button" onClick={onAction} className="btn btn-dark mt-6">
        Browse products <ArrowRight className="arrow size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { panel, closePanel, cart, cartSubtotal, cartCount, setQty, removeFromCart, openBulk, notify } = useShop();
  const savings = cart.reduce((s, l) => {
    const p = productById(l.id);
    return s + (p ? (p.mrp - p.price) * l.qty : 0);
  }, 0);
  const browse = () => {
    closePanel();
    requestAnimationFrame(() => scrollToId('#products'));
  };

  return (
    <Dialog open={panel === 'cart'} onClose={closePanel} title={`Your Cart (${cartCount})`} variant="right">
      {cart.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="Your cart is empty" text="Add lighting, switches, wires and more to see them here." onAction={browse} />
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-5 sm:px-6">
            <AnimatePresence initial={false}>
              {cart.map((line) => {
                const p = productById(line.id);
                if (!p) return null;
                return (
                  <motion.li key={line.id} layout exit={{ opacity: 0, x: 40 }} className="flex gap-4 py-5">
                    <span className="size-20 shrink-0 overflow-hidden rounded-xl bg-[#eceef1]">
                      <Img src={p.image} alt={p.imageAlt} className="size-full object-cover" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-slate">{p.brand}</p>
                      <p className="line-clamp-2 text-sm font-semibold leading-snug">{p.name}</p>
                      <p className="mt-0.5 text-xs text-slate">{formatINR(p.price)} each</p>
                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <QtyStepper value={line.qty} onChange={(v) => setQty(line.id, v)} label={p.name} />
                        <span className="font-bold tabular-nums">{formatINR(p.price * line.qty)}</span>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFromCart(line.id)} className="grid size-9 shrink-0 place-items-center self-start rounded-full text-slate transition hover:bg-paper hover:text-[#c03535]" aria-label={`Remove ${p.name} from cart`}>
                      <Trash2 className="size-4" />
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
          <div className="space-y-3 border-t border-line bg-paper/60 p-5 sm:p-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate">Subtotal</span>
              <span className="font-display text-xl font-extrabold tabular-nums">{formatINR(cartSubtotal)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate">Sample savings vs MRP</span>
                <span className="font-semibold text-emerald-700 tabular-nums">−{formatINR(savings)}</span>
              </div>
            )}
            <p className="text-xs text-slate">Delivery and taxes would be calculated at checkout. Prices are sample data.</p>
            <button
              type="button"
              onClick={() => notify({ title: 'Checkout is disabled in this demo', text: 'No order or payment can be placed.', tone: 'info' })}
              className="btn btn-dark h-12 w-full"
              aria-describedby="checkout-note"
            >
              <Lock className="size-4" aria-hidden="true" /> Checkout (demo only)
            </button>
            <p id="checkout-note" className="text-center text-[0.7rem] text-slate">
              Demonstration only — checkout and payments are not active.
            </p>
            <button type="button" onClick={() => openBulk('Multiple categories')} className="btn btn-outline w-full">
              Request a quote for this cart
            </button>
          </div>
        </>
      )}
    </Dialog>
  );
}

export function WishlistDrawer() {
  const { panel, closePanel, wishlist, toggleWishlist, moveToCart, openQuickView } = useShop();
  return (
    <Dialog open={panel === 'wishlist'} onClose={closePanel} title={`Wishlist (${wishlist.length})`} variant="right">
      {wishlist.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved items yet"
          text="Tap the heart on any product to save it for later."
          onAction={() => {
            closePanel();
            requestAnimationFrame(() => scrollToId('#products'));
          }}
        />
      ) : (
        <ul className="flex-1 divide-y divide-line overflow-y-auto px-5 sm:px-6">
          {wishlist.map((id) => {
            const p = productById(id);
            if (!p) return null;
            return (
              <li key={id} className="flex gap-4 py-5">
                <button type="button" onClick={() => { closePanel(); openQuickView(id); }} className="size-20 shrink-0 overflow-hidden rounded-xl bg-[#eceef1]" aria-label={`Quick view ${p.name}`}>
                  <Img src={p.image} alt={p.imageAlt} className="size-full object-cover" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-slate">{p.brand}</p>
                  <p className="line-clamp-2 text-sm font-semibold leading-snug">{p.name}</p>
                  <p className="mt-1 text-sm font-bold">
                    {formatINR(p.price)} <span className="text-xs font-normal text-slate line-through">{formatINR(p.mrp)}</span>
                  </p>
                  <div className="mt-2.5 flex gap-2">
                    <button type="button" onClick={() => moveToCart(id)} className="btn btn-dark h-9 min-h-0 px-4 text-xs">
                      <ShoppingBag className="size-3.5" aria-hidden="true" /> Move to cart
                    </button>
                    <button type="button" onClick={() => toggleWishlist(id)} className="btn btn-outline h-9 min-h-0 px-4 text-xs">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Dialog>
  );
}

export function ProductQuickView() {
  const { quickViewId, openQuickView, addToCart, toggleWishlist, wishlist, openBulk } = useShop();
  const p = quickViewId ? productById(quickViewId) : undefined;
  const [qty, setQty] = useState(1);
  useEffect(() => setQty(1), [quickViewId]);

  return (
    <Dialog open={!!p} onClose={() => openQuickView(null)} title={p ? `Quick view: ${p.name}` : 'Quick view'} hideHeader className="max-w-4xl">
      {p && (
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-[#eceef1] md:aspect-auto">
            <Img src={p.image} alt={p.imageAlt} className="size-full object-cover" loading="eager" />
            {discountPct(p) > 0 && <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-2.5 py-1 text-xs font-bold text-ink-950">−{discountPct(p)}%</span>}
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                {p.brand} · {departmentById(p.department).label}
              </p>
              <button type="button" onClick={() => openQuickView(null)} className="-mr-2 -mt-2 grid size-10 shrink-0 place-items-center rounded-full hover:bg-paper" aria-label="Close quick view">
                <X className="size-5" />
              </button>
            </div>
            <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight">{p.name}</h3>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate">
              <Stars rating={p.rating} size="md" />
              <span className="font-medium text-ink">{p.rating.toFixed(1)}</span>
              <span>({p.reviews} sample reviews)</span>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold">{formatINR(p.price)}</span>
              <span className="text-slate line-through">MRP {formatINR(p.mrp)}</span>
              <span className="text-sm font-semibold text-emerald-700">{discountPct(p)}% off</span>
            </div>
            <p className="mt-1 text-xs text-slate">Sample price, inclusive of taxes (illustrative).</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.specs.map((s) => (
                <li key={s} className="rounded-full bg-paper px-3 py-1 text-xs font-medium ring-1 ring-line">
                  {s}
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-2 text-sm text-ink/80">
              {p.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-2 text-sm text-slate">
              <span className={cn('size-2 rounded-full', availabilityLabel[p.availability].dot)} aria-hidden="true" />
              {availabilityLabel[p.availability].text}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
              <QtyStepper value={qty} onChange={setQty} label={p.name} />
              {p.availability === 'enquire' ? (
                <button type="button" onClick={() => { openQuickView(null); openBulk(departmentById(p.department).label); }} className="btn btn-dark h-11 flex-1">
                  Enquire about this product
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    addToCart(p.id, qty);
                    openQuickView(null);
                  }}
                  className="btn btn-gold h-11 flex-1"
                >
                  <ShoppingBag className="size-4" aria-hidden="true" /> Add to Cart · {formatINR(p.price * qty)}
                </button>
              )}
              <button
                type="button"
                onClick={() => toggleWishlist(p.id)}
                aria-pressed={wishlist.includes(p.id)}
                className={cn('grid size-11 place-items-center rounded-full border transition', wishlist.includes(p.id) ? 'border-[#d64545] text-[#d64545]' : 'border-line hover:border-ink')}
                aria-label={wishlist.includes(p.id) ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className="size-5" fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}

export function ToastNotifications() {
  const { toasts, dismissToast } = useShop();
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[90] flex flex-col items-center gap-2 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:items-start" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            className="theme-dark pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-ink-900/95 p-4 text-white shadow-[0_20px_50px_-15px_rgb(0_0_0_/_0.6)] backdrop-blur-xl"
          >
            <span className={cn('grid size-8 shrink-0 place-items-center rounded-full', t.tone === 'success' ? 'bg-emerald-500/15 text-emerald-300' : t.tone === 'info' ? 'bg-gold-500/15 text-gold-300' : 'bg-white/10 text-white/70')}>
              {t.tone === 'success' ? <CircleCheck className="size-4.5" /> : <Info className="size-4.5" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.text && <p className="mt-0.5 truncate text-xs text-muted">{t.text}</p>}
            </div>
            <button type="button" onClick={() => dismissToast(t.id)} className="grid size-7 shrink-0 place-items-center rounded-full text-muted hover:text-white" aria-label="Dismiss notification">
              <X className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function TrackOrderDemo() {
  const [order, setOrder] = useState('');
  const [shown, setShown] = useState<string | null>(null);
  const [error, setError] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (order.trim().length < 4) {
      setError('Enter an order number (any value works in this demo).');
      return;
    }
    setError('');
    setShown(order.trim().toUpperCase());
  };
  const steps = [
    { icon: PackageCheck, label: 'Order confirmed' },
    { icon: ShoppingBag, label: 'Packed' },
    { icon: Truck, label: 'In transit' },
    { icon: MapPin, label: 'Delivered' },
  ];
  return (
    <div className="mt-5">
      <form onSubmit={submit} noValidate className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="track-input" className="sr-only">
          Order number
        </label>
        <input id="track-input" className="field flex-1" value={order} onChange={(e) => setOrder(e.target.value)} placeholder="e.g. ZX-1024" aria-invalid={!!error} aria-describedby={error ? 'track-error' : undefined} />
        <button type="submit" className="btn btn-dark">
          Preview tracking
        </button>
      </form>
      {error && (
        <p id="track-error" className="mt-1.5 text-xs text-[#c03535]">
          {error}
        </p>
      )}
      {shown && (
        <div className="mt-5 rounded-2xl bg-paper p-5 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Order {shown}</p>
            <DemoTag>Simulated preview</DemoTag>
          </div>
          <ol className="mt-5 grid grid-cols-4 gap-2">
            {steps.map(({ icon: Icon, label }, i) => (
              <li key={label} className="text-center">
                <span className={cn('mx-auto grid size-10 place-items-center rounded-full', i <= 1 ? 'bg-gold-500 text-ink-950' : 'bg-white text-slate ring-1 ring-line')}>
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                <span className="mt-2 block text-[0.7rem] font-medium leading-tight">{label}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-slate">This is an illustrative timeline. Real tracking will appear once the store’s order system is connected.</p>
        </div>
      )}
    </div>
  );
}

export function InfoModal() {
  const { info, openInfo, openBulk } = useShop();
  const content = info ? infoContent[info] : undefined;
  return (
    <Dialog open={!!content} onClose={() => openInfo(null)} title={content?.title ?? 'Information'} className="max-w-lg">
      {content && info && (
        <div className="p-6 sm:p-7">
          <p className="leading-relaxed text-slate">{content.intro}</p>
          {content.points && (
            <ul className="mt-5 space-y-2.5">
              {content.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 text-sm">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
          )}
          {info === 'track' && <TrackOrderDemo />}
          <div className="mt-7 flex flex-wrap gap-3">
            {(info === 'contact' || info === 'whatsapp' || info === 'shipping') && (
              <button
                type="button"
                onClick={() => {
                  openInfo(null);
                  openBulk();
                }}
                className="btn btn-gold"
              >
                Send an enquiry instead
              </button>
            )}
            <button type="button" onClick={() => openInfo(null)} className="btn btn-outline">
              Close
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
