import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { testimonials } from '../../data/content';
import { cn } from '../../lib/utils';
import { DemoTag, Reveal, SectionHeading, Stars } from '../ui/primitives';

export function TestimonialCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const p = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
      setPages(p);
      setPage(Math.min(p - 1, Math.round(el.scrollLeft / el.clientWidth)));
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollTo = (p: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: p * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="testimonials-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            eyebrow="Testimonials"
            title="Trusted for Everyday Electrical Needs"
            text="Placeholder testimonials to preview this section — not real or verified customer reviews."
            action={
              <div className="flex items-center gap-3">
                <DemoTag>Sample content</DemoTag>
                <button type="button" onClick={() => scrollTo(page - 1)} disabled={page === 0} className="grid size-11 place-items-center rounded-full border border-line transition hover:border-ink disabled:opacity-40" aria-label="Previous testimonials">
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={() => scrollTo(page + 1)} disabled={page >= pages - 1} className="grid size-11 place-items-center rounded-full border border-line transition hover:border-ink disabled:opacity-40" aria-label="Next testimonials">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            }
          />
        </Reveal>
        <ul ref={trackRef} className="-mx-2 flex snap-x snap-mandatory overflow-x-auto scroll-smooth no-scrollbar" aria-label="Sample testimonials">
          {testimonials.map((t) => (
            <li key={t.name} className="w-full shrink-0 snap-start px-2 md:w-1/2 lg:w-1/3">
              <figure className="flex h-full flex-col rounded-3xl bg-paper p-6 ring-1 ring-line sm:p-8">
                <div className="flex items-center justify-between">
                  <Quote className="size-8 text-gold-500" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  <Stars rating={t.rating} size="md" />
                </div>
                <blockquote className="mt-5 flex-1 text-[1.02rem] leading-relaxed text-ink">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 font-display font-extrabold text-ink-950" aria-hidden="true">
                    {t.name[0]}
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-slate">{t.role}</span>
                  </span>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate">Sample</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} type="button" tabIndex={-1} onClick={() => scrollTo(i)} className={cn('h-1.5 rounded-full transition-all', i === page ? 'w-8 bg-gold-500' : 'w-3 bg-line')} />
          ))}
        </div>
      </div>
    </section>
  );
}
