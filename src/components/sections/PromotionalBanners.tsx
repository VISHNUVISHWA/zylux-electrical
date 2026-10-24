import { ArrowRight } from 'lucide-react';
import { promoBanners } from '../../data/content';
import { cn } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { Img, Reveal } from '../ui/primitives';

function Banner({ banner, large, className }: { banner: (typeof promoBanners)[number]; large?: boolean; className?: string }) {
  const { runAction } = useShop();
  return (
    <article className={cn('theme-dark group relative isolate flex overflow-hidden rounded-3xl bg-ink-950 text-white', className)}>
      <Img
        src={banner.image}
        alt={banner.alt}
        className={cn(
          'absolute inset-0 -z-10 size-full object-cover transition duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105',
          banner.id === 'wiring' && 'object-[85%_center]',
        )}
      />
      <div
        className={cn(
          'absolute inset-0 -z-10',
          banner.id === 'wiring'
            ? 'bg-gradient-to-r from-ink-950 from-25% via-ink-950/80 via-50% to-ink-950/0'
            : 'bg-gradient-to-t from-ink-950/95 via-ink-950/45 to-ink-950/0 md:bg-gradient-to-r md:from-ink-950/90 md:via-ink-950/40',
        )}
        aria-hidden="true"
      />
      <div className={cn('mt-auto flex flex-col p-6 sm:p-8 md:mt-0 md:justify-center', large ? 'lg:max-w-md lg:p-12' : 'max-w-sm')}>
        <p className="eyebrow text-gold-300">{banner.eyebrow}</p>
        <h3 className={cn('mt-3 font-display font-extrabold uppercase leading-[1.05] tracking-tight', large ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-[1.7rem]')}>
          {banner.title.split('. ').map((part, i, arr) => (
            <span key={i} className={cn('block', i === arr.length - 1 && 'gold-text')}>
              {part}
              {i < arr.length - 1 ? '.' : ''}
            </span>
          ))}
        </h3>
        <button type="button" onClick={() => runAction(banner.cta.action)} className={cn('btn mt-6 self-start', large ? 'btn-gold h-12 px-7' : 'btn-ghost-dark')}>
          {banner.cta.label} <ArrowRight className="arrow size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function PromotionalBanners() {
  const [a, b, c] = promoBanners;
  return (
    <section aria-label="Promotions" className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <Reveal className="container-x grid gap-4 lg:grid-cols-5 lg:grid-rows-2 lg:gap-5">
        <Banner banner={a} large className="min-h-[420px] lg:col-span-3 lg:row-span-2 lg:min-h-[600px]" />
        <Banner banner={b} className="min-h-[300px] lg:col-span-2" />
        <Banner banner={c} className="min-h-[300px] lg:col-span-2" />
      </Reveal>
    </section>
  );
}
