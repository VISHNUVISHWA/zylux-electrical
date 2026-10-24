import { trustItems } from '../../data/content';
import { cn } from '../../lib/utils';

export function TrustStrip() {
  return (
    <section aria-label="Why shop with ZYLUX" className="theme-dark border-y border-white/5 bg-ink-900 text-white">
      <ul className="container-x grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {trustItems.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            className={cn(
              'flex items-center gap-3.5 py-5 sm:py-6 lg:justify-center lg:px-4',
              i > 0 && 'lg:border-l lg:border-white/[0.07]',
              i === trustItems.length - 1 && 'col-span-2 sm:col-span-1',
            )}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.07] text-gold-300">
              <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-tight">{title}</span>
              <span className="mt-0.5 hidden text-xs text-muted sm:block">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
