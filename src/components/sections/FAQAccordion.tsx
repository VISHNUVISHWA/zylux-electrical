import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Headset, Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { faqs } from '../../data/content';
import { cn } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { Reveal, SectionHeading } from '../ui/primitives';

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const { openInfo } = useShop();
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Frequently Asked Questions" text="Quick answers about products, enquiries and support." />
          <div className="theme-dark rounded-3xl bg-ink-950 p-7 text-white">
            <Headset className="size-7 text-gold-300" strokeWidth={1.6} aria-hidden="true" />
            <p className="mt-4 font-display text-xl font-bold">Still have a question?</p>
            <p className="mt-1 text-sm text-muted">Reach out for product recommendations or availability.</p>
            <button type="button" onClick={() => openInfo('contact')} className="btn btn-gold mt-5">
              Contact the store <ArrowRight className="arrow size-4" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="divide-y divide-line rounded-3xl bg-white px-5 ring-1 ring-line sm:px-8">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      type="button"
                      id={`${uid}-q${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${uid}-a${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-base font-bold text-ink sm:text-lg"
                    >
                      {f.q}
                      <span className={cn('grid size-9 shrink-0 place-items-center rounded-full border transition duration-300', isOpen ? 'rotate-45 border-gold-500 bg-gold-500 text-ink-950' : 'border-line')}>
                        <Plus className="size-4" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${uid}-a${i}`}
                        role="region"
                        aria-labelledby={`${uid}-q${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 leading-relaxed text-slate">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
