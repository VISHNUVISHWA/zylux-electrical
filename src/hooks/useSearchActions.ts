import type { DepartmentId } from '../data/types';
import { scrollToId } from '../lib/utils';
import { useShop } from '../store/ShopContext';

export function useSearchActions(close: () => void) {
  const { setCatalog, addRecentSearch, openQuickView, runAction } = useShop();
  return {
    search(q: string) {
      const query = q.trim();
      if (!query) return;
      addRecentSearch(query);
      setCatalog({ tab: 'all', department: 'all', sub: undefined, query, sort: 'featured' });
      close();
      requestAnimationFrame(() => scrollToId('#products'));
    },
    pickProduct(id: string) {
      close();
      openQuickView(id);
    },
    pickCategory(department: DepartmentId, sub?: string) {
      close();
      runAction({ type: 'browse', department, sub });
    },
  };
}
