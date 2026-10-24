import { ArrowUpRight } from 'lucide-react';
import { categoryTiles } from '../../data/content';
import { useShop } from '../../store/ShopContext';
import { Img, Reveal, SectionHeading } from '../ui/primitives';

export function CategoryGrid() {
  const { runAction } = useShop();
  return (
    <section id="categories" aria-labelledby="categories-title" className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="categories-title"
            eyebrow="Shop by category"
            title="Explore Our Electrical Categories"
            text="Everything you need to power, connect, protect, and illuminate."
          />
        </Reveal>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {categoryTiles.map((tile, i) => (
            <li key={tile.label}>
              <Reveal delay={(i % 4) * 0.05}>
                <button
                  type="button"
                  onClick={() => runAction(tile.action)}
                  className="group block w-full overflow-hidden rounded-2xl bg-white text-left ring-1 ring-line transition duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgb(23_25_29_/_0.35)] hover:ring-gold-500/40"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-[#eceef1]">
                    <Img
                      src={tile.image}
                      alt=""
                      className="size-full object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" aria-hidden="true" />
                  </span>
                  <span className="flex items-center justify-between gap-2 p-3.5 sm:p-5">
                    <span className="min-w-0">
                      <span className="block font-display text-[0.95rem] font-bold leading-snug text-ink sm:text-lg">{tile.label}</span>
                      <span className="mt-0.5 block truncate text-xs text-slate sm:text-sm">{tile.hint}</span>
                    </span>
                    <span className="hidden size-10 shrink-0 place-items-center rounded-full border border-line text-ink transition duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-ink-950 sm:grid">
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
