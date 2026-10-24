import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Gift, MapPin, MessageCircle, PackageOpen, Phone, Search, Tags, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { demoBrands, departments } from '../../data/navigation';
import type { DepartmentId } from '../../data/types';
import { cn, scrollToId } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { Dialog } from '../ui/Dialog';
import { Img } from '../ui/primitives';

type View = 'root' | 'brands' | DepartmentId;

export function MobileNavigation() {
  const { panel, closePanel, openPanel, runAction, openInfo, openBulk } = useShop();
  const [view, setView] = useState<View>('root');
  const open = panel === 'menu';

  useEffect(() => {
    if (!open) setView('root');
  }, [open]);

  const browse = (department: DepartmentId, sub?: string) => runAction({ type: 'browse', department, sub });
  const go = (target: string) => {
    closePanel();
    requestAnimationFrame(() => scrollToId(target));
  };
  const dept = departments.find((d) => d.id === view);
  const row = 'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[0.95rem] transition hover:bg-white/5';

  return (
    <Dialog open={open} onClose={closePanel} title="Menu" variant="left" dark className="!max-w-[380px] !overflow-hidden">
      <div className="border-b border-white/10 p-4">
        <button
          type="button"
          onClick={() => openPanel('search')}
          className="flex h-11 w-full items-center gap-3 rounded-full border border-white/10 bg-ink-800 px-4 text-left text-sm text-muted"
        >
          <Search className="size-4" aria-hidden="true" /> Search products
        </button>
      </div>
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {view === 'root' ? (
            <motion.div
              key="root"
              initial={{ x: '-30%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-30%', opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-3"
            >
              <p className="eyebrow px-3 pb-2 pt-2 text-muted">Shop by category</p>
              <ul>
                {departments.map((d) => {
                  const Icon = d.icon;
                  return (
                    <li key={d.id}>
                      <button type="button" className={row} onClick={() => setView(d.id)}>
                        <span className="grid size-9 place-items-center rounded-lg bg-white/5 text-gold-300">
                          <Icon className="size-4.5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 font-medium">{d.label}</span>
                        <ChevronRight className="size-4 text-muted" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button type="button" className={row} onClick={() => setView('brands')}>
                    <span className="grid size-9 place-items-center rounded-lg bg-white/5 text-gold-300">
                      <Tags className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="flex-1 font-medium">Brands</span>
                    <ChevronRight className="size-4 text-muted" aria-hidden="true" />
                  </button>
                </li>
              </ul>
              <div className="hairline-gold my-3" />
              <ul>
                <li>
                  <button type="button" className={cn(row, 'text-gold-300')} onClick={() => go('#offers')}>
                    <Gift className="size-4.5" aria-hidden="true" /> Offers
                  </button>
                </li>
                <li>
                  <button type="button" className={row} onClick={() => openBulk()}>
                    <PackageOpen className="size-4.5 text-gold-300" aria-hidden="true" /> Bulk Orders
                  </button>
                </li>
                <li>
                  <button type="button" className={row} onClick={() => openInfo('track')}>
                    <MapPin className="size-4.5 text-gold-300" aria-hidden="true" /> Track order
                  </button>
                </li>
                <li>
                  <button type="button" className={row} onClick={() => openInfo('account')}>
                    <User className="size-4.5 text-gold-300" aria-hidden="true" /> Account
                  </button>
                </li>
                <li>
                  <button type="button" className={row} onClick={() => openInfo('contact')}>
                    <Phone className="size-4.5 text-gold-300" aria-hidden="true" /> Store contact
                  </button>
                </li>
                <li>
                  <button type="button" className={row} onClick={() => openInfo('whatsapp')}>
                    <MessageCircle className="size-4.5 text-gold-300" aria-hidden="true" /> WhatsApp enquiry
                  </button>
                </li>
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key={view}
              initial={{ x: '30%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '30%', opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-3"
            >
              <button type="button" onClick={() => setView('root')} className="mb-2 flex items-center gap-1 rounded-lg px-2 py-2 text-sm text-muted hover:text-white" data-autofocus>
                <ChevronLeft className="size-4" aria-hidden="true" /> All categories
              </button>
              {dept ? (
                <>
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <Img src={dept.promo.image} alt="" className="h-32 w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 to-transparent" />
                    <div className="absolute inset-x-4 bottom-3">
                      <p className="font-display text-xl font-extrabold">{dept.label}</p>
                      <p className="line-clamp-1 text-xs text-white/70">{dept.description}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => browse(dept.id)} className="btn btn-gold mb-4 w-full">
                    Shop all {dept.label} <ArrowRight className="arrow size-4" aria-hidden="true" />
                  </button>
                  {dept.columns.map((c) => (
                    <div key={c.title} className="mb-4">
                      <p className="eyebrow px-3 pb-1 text-gold-300">{c.title}</p>
                      <ul className="grid grid-cols-1">
                        {c.items.map((i) => (
                          <li key={i}>
                            <button type="button" className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-white/85 hover:bg-white/5" onClick={() => browse(dept.id, i)}>
                              {i}
                              <ChevronRight className="size-3.5 text-muted" aria-hidden="true" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p className="px-3 pb-3 font-display text-xl font-extrabold">Brands</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {demoBrands.map((b) => (
                      <li key={b.name}>
                        <button type="button" onClick={() => go('#brands')} className="flex h-20 w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-ink-800 px-2">
                          <span className={cn('text-sm', b.style)}>{b.name}</span>
                          <span className="mt-0.5 text-[0.62rem] text-muted">{b.focus}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="px-1 pt-3 text-xs text-muted">Fictional demo brands. Confirmed brand partners can replace these slots.</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="border-t border-white/10 p-4 text-center text-xs text-muted">Safe • Smart • Sustainable</p>
    </Dialog>
  );
}
