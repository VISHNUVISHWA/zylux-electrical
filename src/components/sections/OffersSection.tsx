import { ArrowRight, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { products } from '../../data/products';
import { discountPct } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { ProductCard } from '../shop/ProductCard';
import { DemoTag, Img, Reveal, SectionHeading } from '../ui/primitives';

/** Simulated countdown to local midnight. Clearly labelled as demo — not a live promotion. */
function useDemoCountdown() {
  const calc = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(24, 0, 0, 0);
    const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
    return { h: Math.floor(s / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = window.setInterval(() => setT(calc()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

export function OffersSection() {
  const { runAction } = useShop();
  const t = useDemoCountdown();
  const deals = products
    .filter((p) => p.flags.deal)
    .sort((a, b) => discountPct(b) - discountPct(a))
    .slice(0, 4);
  const maxOff = Math.max(...products.filter((p) => p.flags.deal).map(discountPct));

  return (
    <section id="offers" aria-labelledby="offers-title" className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="offers-title"
            eyebrow="Offers"
            title="Deals Worth Exploring"
            text="Sample promotions to preview how seasonal offers will appear in the store."
            action={
              <button type="button" onClick={() => runAction({ type: 'browse', tab: 'deals' })} className="btn btn-dark h-12 self-start px-6 md:self-auto">
                Shop Offers <ArrowRight className="arrow size-4" aria-hidden="true" />
              </button>
            }
          />
        </Reveal>

        <Reveal>
          <div className="theme-dark relative isolate mb-6 grid overflow-hidden rounded-3xl bg-ink-950 text-white md:grid-cols-[1.25fr_1fr] lg:mb-8">
            <div className="relative z-10 p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-ink-950">Up to {maxOff}% off</span>
                <DemoTag dark>Demo offer</DemoTag>
              </div>
              <h3 className="mt-5 font-display text-3xl font-extrabold uppercase leading-[1.04] tracking-tight sm:text-4xl lg:text-5xl">
                Upgrade your space <span className="gold-text">for less.</span>
              </h3>
              <p className="mt-4 max-w-md text-muted">Sample savings across lighting, wiring, protection and smart-home essentials.</p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <div aria-label="Simulated demo countdown">
                  <p className="mb-2 flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    <Timer className="size-3.5 text-gold-300" aria-hidden="true" /> Demo countdown · simulated
                  </p>
                  <div className="flex gap-2" aria-hidden="true">
                    {[
                      ['Hrs', t.h],
                      ['Min', t.m],
                      ['Sec', t.s],
                    ].map(([label, v]) => (
                      <span key={label} className="grid w-16 place-items-center rounded-xl border border-white/10 bg-white/[0.04] py-2">
                        <span className="font-display text-2xl font-extrabold tabular-nums">{String(v).padStart(2, '0')}</span>
                        <span className="text-[0.62rem] uppercase tracking-wider text-muted">{label}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <button type="button" onClick={() => runAction({ type: 'browse', tab: 'deals' })} className="btn btn-gold h-12 px-7">
                  Shop Offers <ArrowRight className="arrow size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="relative min-h-[220px]">
              <Img src="/images/filament-bulb.webp" alt="Glowing vintage filament bulb" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-transparent md:bg-gradient-to-r" aria-hidden="true" />
            </div>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {deals.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 0.05} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
