import { demoBrands } from '../../data/navigation';
import { cn } from '../../lib/utils';
import { Reveal, SectionHeading } from '../ui/primitives';

export function BrandCarousel() {
  const loop = [...demoBrands, ...demoBrands];
  return (
    <section id="brands" aria-labelledby="brands-title" className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="brands-title"
            align="center"
            eyebrow="Featured brands"
            title="Explore Leading Electrical Brands"
            text="Placeholder brand slots for the demo. Confirmed brand partners and official logos can be added here."
          />
        </Reveal>
      </div>
      <div className="group relative overflow-hidden motion-reduce:overflow-x-auto" aria-label="Demo brand placeholders">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" aria-hidden="true" />
        <ul className="flex w-max animate-marquee gap-4 px-2 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((b, i) => (
            <li key={`${b.name}-${i}`} aria-hidden={i >= demoBrands.length}>
              <div className="flex h-28 w-52 flex-col items-center justify-center rounded-2xl border border-line bg-paper px-4 text-ink/70 grayscale transition duration-300 hover:border-gold-500/50 hover:text-ink sm:w-60">
                <span className={cn('text-xl', b.style)}>{b.name}</span>
                <span className="mt-1 text-[0.7rem] text-slate">{b.focus}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="container-x mt-6 text-center text-xs text-slate">Fictional demo brand names. No partnership, reseller certification or authorised dealership is implied.</p>
    </section>
  );
}
