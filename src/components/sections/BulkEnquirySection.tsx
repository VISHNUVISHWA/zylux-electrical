import { ArrowRight, ClipboardList, FileCheck2, Send } from 'lucide-react';
import { useShop } from '../../store/ShopContext';
import { Img, Reveal } from '../ui/primitives';

const steps = [
  { icon: ClipboardList, title: 'Share your requirements', text: 'Categories, quantities and project details in one form.' },
  { icon: Send, title: 'The team reviews your list', text: 'Product options are matched to your specification.' },
  { icon: FileCheck2, title: 'Receive a consolidated quote', text: 'Discuss pricing and availability directly with the store.' },
];

export function BulkEnquirySection() {
  const { openBulk } = useShop();
  return (
    <section id="bulk" aria-labelledby="bulk-title" className="theme-dark relative isolate overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <Img src="/images/construction.webp" alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/60" aria-hidden="true" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3 text-gold-300">
            <span className="h-px w-8 bg-gold-300/60" aria-hidden="true" /> Bulk orders & contractors
          </p>
          <h2 id="bulk-title" className="font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Building a project? <span className="gold-text block">Let’s power it.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Explore electrical products for residential, commercial, and industrial requirements. Send us your project enquiry.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => openBulk()} className="btn btn-gold h-13 px-8 text-base">
              Request a Bulk Quote <ArrowRight className="arrow size-4" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ol className="relative space-y-3 rounded-3xl border border-white/10 bg-ink-900/60 p-5 backdrop-blur-xl sm:p-7">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4 rounded-2xl p-3">
                <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-500/10 text-gold-300 ring-1 ring-gold-500/30">
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-gold-500 text-[0.65rem] font-bold text-ink-950">{i + 1}</span>
                </span>
                <span>
                  <span className="block font-display text-lg font-bold">{title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
