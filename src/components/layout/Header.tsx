import { AnimatePresence, motion } from 'motion/react';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { useSearchActions } from '../../hooks/useSearchActions';
import { cn, formatINR } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { CategoryNav } from './MegaMenu';
import { SearchPanel, useSearchResults } from './SearchPanel';

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn('block shrink-0 rounded-full', className)} aria-label="ZYLUX Electrical — back to top">
      <img src="/images/logo.webp" alt="ZYLUX Electrical" width={320} height={320} className="size-full object-contain" fetchPriority="high" />
    </a>
  );
}

function DesktopSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const { items } = useSearchResults(query);
  const close = () => {
    setOpen(false);
    setActive(-1);
    inputRef.current?.blur();
  };
  const actions = useSearchActions(close);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  useEffect(() => setActive(-1), [query]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(items.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(-1, i - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (active >= 0 && items[active]) actions.pickProduct(items[active].id);
      else if (query.trim()) {
        actions.search(query);
        setQuery('');
      }
    }
  };

  return (
    <div ref={wrapRef} className="relative hidden w-full max-w-[720px] flex-1 lg:block">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          actions.search(query);
          setQuery('');
        }}
        className={cn(
          'group flex h-12 items-center rounded-full border bg-ink-800/80 pl-5 pr-1.5 transition-all',
          open ? 'border-gold-500/70 bg-ink-800 shadow-[0_0_0_4px_rgb(215_165_42_/_0.12)]' : 'border-white/10 hover:border-white/25',
        )}
      >
        <Search className="size-4.5 shrink-0 text-muted" aria-hidden="true" />
        <label htmlFor="desktop-search" className="sr-only">
          Search products
        </label>
        <input
          ref={inputRef}
          id="desktop-search"
          type="search"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          placeholder="Search for lights, switches, wires, cables and more..."
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-[0.95rem] text-white placeholder:text-muted/80 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} className="mr-1 grid size-8 place-items-center rounded-full text-muted hover:text-white" aria-label="Clear search">
            <X className="size-4" />
          </button>
        )}
        <button type="submit" className="btn btn-gold h-9 min-h-0 px-4 text-sm" aria-label="Search">
          <Search className="size-4" aria-hidden="true" />
          <span className="hidden xl:inline">Search</span>
        </button>
      </form>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-[calc(100%+10px)] z-[60] max-h-[70vh] overflow-y-auto rounded-2xl bg-white text-ink shadow-[0_30px_80px_-20px_rgb(0_0_0_/_0.55)] ring-1 ring-black/5"
          >
            <SearchPanel
              query={query}
              activeIndex={active}
              listId={listId}
              onSearch={(q) => {
                actions.search(q);
                setQuery('');
              }}
              onPickProduct={actions.pickProduct}
              onPickCategory={actions.pickCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CountBadge({ value, className = '-right-0.5 -top-0.5' }: { value: number; className?: string }) {
  return (
    <AnimatePresence>
      {value > 0 && (
        <motion.span
          key={value}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          className={cn('absolute grid h-[18px]',className, ' min-w-[18px] place-items-center rounded-full bg-gold-500 px-1 text-[0.65rem] font-bold text-ink-950')}
          aria-hidden="true"
        >
          {value > 99 ? '99+' : value}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const { cartCount, cartSubtotal, wishlist, openPanel, openInfo } = useShop();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const iconBtn = 'relative grid size-11 place-items-center rounded-full text-white/85 transition hover:bg-white/8 hover:text-gold-300';

  return (
    <header
      className={cn(
        'theme-dark sticky top-0 z-50 text-white transition-[background-color,box-shadow] duration-300',
        scrolled ? 'bg-ink-950/92 shadow-[0_12px_40px_-12px_rgb(0_0_0_/_0.7)] backdrop-blur-xl' : 'bg-ink-900',
      )}
    >
      <div className={cn('container-x flex items-center gap-3 transition-[padding] duration-300 sm:gap-5', scrolled ? 'py-2' : 'py-2.5 lg:py-3')}>
        <button type="button" className={cn(iconBtn, '-ml-2 lg:hidden')} onClick={() => openPanel('menu')} aria-label="Open menu">
          <Menu className="size-6" />
        </button>

        <Logo className={cn('transition-all duration-300', scrolled ? 'size-12 lg:size-14' : 'size-14 lg:size-[68px]')} />

        <DesktopSearch />

        <nav aria-label="Account and cart" className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <button type="button" className={cn(iconBtn, 'lg:hidden')} onClick={() => openPanel('search')} aria-label="Search products">
            <Search className="size-5.5" />
          </button>
          <button type="button" className={cn(iconBtn, 'hidden sm:grid')} onClick={() => openInfo('account')} aria-label="Account">
            <User className="size-5.5" />
          </button>
          <button type="button" className={iconBtn} onClick={() => openPanel('wishlist')} aria-label={`Wishlist, ${wishlist.length} items`}>
            <Heart className="size-5.5" />
            <CountBadge value={wishlist.length} />
          </button>
          <button
            type="button"
            className="group relative flex h-11 items-center gap-3 rounded-full pl-2.5 pr-2.5 text-white/85 transition hover:bg-white/8 hover:text-gold-300 xl:pr-4"
            onClick={() => openPanel('cart')}
            aria-label={`Cart, ${cartCount} items, subtotal ${formatINR(cartSubtotal)}`}
          >
            <span className="relative grid size-6 place-items-center">
              <ShoppingBag className="size-5.5" />
              <CountBadge value={cartCount} className="-right-2.5 -top-2" />
            </span>
            <span className="hidden text-left leading-tight xl:block" aria-hidden="true">
              <span className="block text-[0.68rem] uppercase tracking-wider text-muted">Cart</span>
              <span className="block text-sm font-semibold tabular-nums text-white">{formatINR(cartSubtotal)}</span>
            </span>
          </button>
        </nav>
      </div>

      {/* Compact mobile search trigger */}
      <div className={cn('container-x overflow-hidden transition-all duration-300 lg:hidden', scrolled ? 'max-h-0 pb-0 opacity-0' : 'max-h-20 pb-3 opacity-100')}>
        <button
          type="button"
          onClick={() => openPanel('search')}
          tabIndex={scrolled ? -1 : 0}
          className="flex h-11 w-full items-center gap-3 rounded-full border border-white/10 bg-ink-800/80 px-4 text-left text-sm text-muted"
        >
          <Search className="size-4" aria-hidden="true" />
          <span className="truncate">Search for lights, switches, wires, cables and more...</span>
        </button>
      </div>

      <CategoryNav />
    </header>
  );
}
