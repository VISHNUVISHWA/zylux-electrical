import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { productById } from '../data/products';
import type { CatalogFilter, CtaAction, InfoKey } from '../data/types';
import { scrollToId, storage } from '../lib/utils';

export interface CartLine {
  id: string;
  qty: number;
}

export interface Toast {
  id: number;
  title: string;
  text?: string;
  tone: 'success' | 'info' | 'neutral';
}

type Panel = 'cart' | 'wishlist' | 'menu' | 'search' | null;

interface ShopState {
  cart: CartLine[];
  cartCount: number;
  cartSubtotal: number;
  wishlist: string[];
  toasts: Toast[];
  panel: Panel;
  quickViewId: string | null;
  bulkOpen: boolean;
  bulkCategory: string;
  guideId: string | null;
  info: InfoKey | null;
  catalog: CatalogFilter;
  recentSearches: string[];
}

interface ShopActions {
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  moveToCart: (id: string) => void;
  notify: (t: Omit<Toast, 'id'>) => void;
  dismissToast: (id: number) => void;
  openPanel: (p: Panel) => void;
  closePanel: () => void;
  openQuickView: (id: string | null) => void;
  openBulk: (category?: string) => void;
  closeBulk: () => void;
  openGuide: (id: string | null) => void;
  openInfo: (key: InfoKey | null) => void;
  setCatalog: (patch: Partial<CatalogFilter>) => void;
  runAction: (a: CtaAction) => void;
  addRecentSearch: (q: string) => void;
}

const ShopContext = createContext<(ShopState & ShopActions) | null>(null);

const defaultCatalog: CatalogFilter = { tab: 'featured', department: 'all', sort: 'featured' };

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() =>
    storage.get<CartLine[]>('zylux.cart', []).filter((l) => productById(l.id) && l.qty > 0),
  );
  const [wishlist, setWishlist] = useState<string[]>(() => storage.get<string[]>('zylux.wishlist', []).filter((id) => productById(id)));
  const [recentSearches, setRecent] = useState<string[]>(() => storage.get<string[]>('zylux.recent', []));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [panel, setPanel] = useState<Panel>(null);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkCategory, setBulkCategory] = useState('');
  const [guideId, setGuideId] = useState<string | null>(null);
  const [info, setInfo] = useState<InfoKey | null>(null);
  const [catalog, setCatalogState] = useState<CatalogFilter>(defaultCatalog);
  const toastId = useRef(0);

  useEffect(() => storage.set('zylux.cart', cart), [cart]);
  useEffect(() => storage.set('zylux.wishlist', wishlist), [wishlist]);
  useEffect(() => storage.set('zylux.recent', recentSearches), [recentSearches]);

  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const notify = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = ++toastId.current;
      setToasts((list) => [...list.slice(-2), { ...t, id }]);
      window.setTimeout(() => dismissToast(id), 3600);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      const product = productById(id);
      if (!product) return;
      setCart((c) => {
        const line = c.find((l) => l.id === id);
        return line ? c.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) : [...c, { id, qty }];
      });
      notify({ title: 'Added to cart', text: `${qty} × ${product.name}`, tone: 'success' });
    },
    [notify],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l))));
  }, []);

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((c) => c.filter((l) => l.id !== id));
      notify({ title: 'Removed from cart', text: productById(id)?.name, tone: 'neutral' });
    },
    [notify],
  );

  const toggleWishlist = useCallback(
    (id: string) => {
      const has = wishlist.includes(id);
      setWishlist((w) => (has ? w.filter((x) => x !== id) : w.includes(id) ? w : [...w, id]));
      notify({
        title: has ? 'Removed from wishlist' : 'Saved to wishlist',
        text: productById(id)?.name,
        tone: has ? 'neutral' : 'success',
      });
    },
    [wishlist, notify],
  );

  const moveToCart = useCallback(
    (id: string) => {
      setWishlist((w) => w.filter((x) => x !== id));
      addToCart(id);
    },
    [addToCart],
  );

  const setCatalog = useCallback((patch: Partial<CatalogFilter>) => setCatalogState((c) => ({ ...c, ...patch })), []);

  const closeAllOverlays = useCallback(() => {
    setPanel(null);
    setQuickViewId(null);
  }, []);

  const runAction = useCallback(
    (a: CtaAction) => {
      closeAllOverlays();
      if (a.type === 'scroll') {
        scrollToId(a.target);
      } else if (a.type === 'bulk') {
        setBulkCategory('');
        setBulkOpen(true);
      } else {
        setCatalogState({
          tab: a.tab ?? 'all',
          department: a.department ?? 'all',
          sub: a.sub,
          query: undefined,
          sort: 'featured',
        });
        // Wait a frame so the grid re-renders before we scroll to it.
        requestAnimationFrame(() => scrollToId('#products'));
      }
    },
    [closeAllOverlays],
  );

  const addRecentSearch = useCallback((q: string) => {
    const v = q.trim();
    if (!v) return;
    setRecent((r) => [v, ...r.filter((x) => x.toLowerCase() !== v.toLowerCase())].slice(0, 5));
  }, []);

  const value = useMemo(() => {
    const cartCount = cart.reduce((n, l) => n + l.qty, 0);
    const cartSubtotal = cart.reduce((sum, l) => sum + (productById(l.id)?.price ?? 0) * l.qty, 0);
    return {
      cart,
      cartCount,
      cartSubtotal,
      wishlist,
      toasts,
      panel,
      quickViewId,
      bulkOpen,
      bulkCategory,
      guideId,
      info,
      catalog,
      recentSearches,
      addToCart,
      setQty,
      removeFromCart,
      toggleWishlist,
      moveToCart,
      notify,
      dismissToast,
      openPanel: setPanel,
      closePanel: () => setPanel(null),
      openQuickView: setQuickViewId,
      openBulk: (category = '') => {
        setBulkCategory(category);
        setPanel(null);
        setBulkOpen(true);
      },
      closeBulk: () => setBulkOpen(false),
      openGuide: setGuideId,
      openInfo: (key: InfoKey | null) => {
        if (key) setPanel(null);
        setInfo(key);
      },
      setCatalog,
      runAction,
      addRecentSearch,
    };
  }, [
    cart,
    wishlist,
    toasts,
    panel,
    quickViewId,
    bulkOpen,
    bulkCategory,
    guideId,
    info,
    catalog,
    recentSearches,
    addToCart,
    setQty,
    removeFromCart,
    toggleWishlist,
    moveToCart,
    notify,
    dismissToast,
    setCatalog,
    runAction,
    addRecentSearch,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>');
  return ctx;
}
