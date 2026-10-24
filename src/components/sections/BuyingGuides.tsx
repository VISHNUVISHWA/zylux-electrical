import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { guides } from '../../data/content';
import { useShop } from '../../store/ShopContext';
import { Img, Reveal, SectionHeading } from '../ui/primitives';

export function BuyingGuides() {
  const { openGuide } = useShop();
  return (
    <section id="guides" aria-labelledby="guides-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="guides-title"
            eyebrow="Buying guides"
            title="Electrical Knowledge Hub"
            text="Practical, plain-language guides to help you choose with confidence."
          />
        </Reveal>
        <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {guides.map((g, i) => (
            <li key={g.id}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-paper ring-1 ring-line transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgb(23_25_29_/_0.4)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#eceef1]">
                    <Img src={g.image} alt="" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">{g.tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-1.5 text-xs text-slate">
                      <Clock className="size-3.5" aria-hidden="true" /> {g.readTime}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-snug">{g.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{g.excerpt}</p>
                    <button type="button" onClick={() => openGuide(g.id)} className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-ink transition hover:text-gold-600">
                      <BookOpen className="size-4" aria-hidden="true" /> Read Guide
                      <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
