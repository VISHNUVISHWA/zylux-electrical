import { ArrowLeft, Search, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { useSearchActions } from '../../hooks/useSearchActions';
import { useShop } from '../../store/ShopContext';
import { Dialog } from '../ui/Dialog';
import { SearchPanel } from './SearchPanel';

/** Full-screen search for touch / small screens. */
export function SearchOverlay() {
  const { panel, closePanel } = useShop();
  const [query, setQuery] = useState('');
  const listId = useId();
  const actions = useSearchActions(closePanel);
  const open = panel === 'search';

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  return (
    <Dialog open={open} onClose={closePanel} title="Search products" hideHeader variant="top" className="!h-[100dvh] sm:!h-auto sm:max-h-[85dvh]">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          actions.search(query);
        }}
        className="sticky top-0 z-10 flex items-center gap-2 border-b border-line bg-white p-3"
      >
        <button type="button" onClick={closePanel} className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-paper" aria-label="Close search">
          <ArrowLeft className="size-5" />
        </button>
        <div className="flex h-12 flex-1 items-center rounded-full border border-line bg-paper px-4 focus-within:border-gold-500">
          <Search className="size-4 text-slate" aria-hidden="true" />
          <label htmlFor="mobile-search" className="sr-only">
            Search products
          </label>
          <input
            id="mobile-search"
            data-autofocus
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lights, switches, wires…"
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-base focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="grid size-8 place-items-center rounded-full text-slate" aria-label="Clear search">
              <X className="size-4" />
            </button>
          )}
        </div>
      </form>
      <div className="mx-auto w-full max-w-4xl">
        <SearchPanel
          query={query}
          activeIndex={-1}
          listId={listId}
          onSearch={actions.search}
          onPickProduct={actions.pickProduct}
          onPickCategory={actions.pickCategory}
        />
      </div>
    </Dialog>
  );
}
