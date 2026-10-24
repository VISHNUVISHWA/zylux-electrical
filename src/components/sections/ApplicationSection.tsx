import { ArrowUpRight } from 'lucide-react';
import { applications } from '../../data/content';
import { useShop } from '../../store/ShopContext';
import { Img, Reveal, SectionHeading } from '../ui/primitives';

export function ApplicationSection() {
  const { runAction } = useShop();
  return (
    <section id="applications" aria-labelledby="applications-title" className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="applications-title"
            eyebrow="Shop by application"
            title="Solutions for Every Space"
            text="From a single room refresh to a full industrial fit-out, find products organised around how you build."
          />
        </Reveal>
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-5">
          {applications.map((app, i) => (
            <li key={app.title} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <Reveal delay={i * 0.06} className="h-full">
                <button
                  type="button"
                  onClick={() => runAction(app.cta.action)}
                  className="theme-dark group relative isolate flex aspect-[3/4] w-full overflow-hidden rounded-3xl bg-ink-950 text-left text-white lg:aspect-[3/4.2]"
                >
                  <Img src={app.image} alt={app.alt} className="absolute inset-0 -z-10 size-full object-cover transition duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/0 transition duration-500 group-hover:via-ink-950/60" aria-hidden="true" />
                  <span className="absolute left-5 top-5 font-display text-sm font-bold text-white/50">0{i + 1}</span>
                  <span className="mt-auto block w-full p-6">
                    <span className="block font-display text-2xl font-extrabold">{app.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/75 transition-all duration-500 lg:max-h-0 lg:translate-y-2 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100">
                      {app.text}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">
                      {app.cta.label}
                      <span className="grid size-8 place-items-center rounded-full border border-gold-300/40 transition group-hover:bg-gold-300 group-hover:text-ink-950">
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
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
