import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { DepartmentId, InfoKey } from '../../data/types';
import { scrollToId } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';

const social = [
  { label: 'Instagram', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z' },
  { label: 'Facebook', path: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8Z' },
  { label: 'LinkedIn', path: 'M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4 6h3.8v1.7h.1A4.2 4.2 0 0 1 17.7 8.7c4 0 4.3 2.6 4.3 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9Z' },
  { label: 'YouTube', path: 'M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8ZM10 15V9l5.2 3L10 15Z' },
];

const shopLinks: { label: string; dept: DepartmentId; sub?: string }[] = [
  { label: 'Lighting', dept: 'lighting' },
  { label: 'Switches', dept: 'switches' },
  { label: 'Wires & Cables', dept: 'wires' },
  { label: 'Fans', dept: 'fans' },
  { label: 'Circuit Protection', dept: 'protection' },
  { label: 'Electrical Accessories', dept: 'accessories' },
  { label: 'Smart Home', dept: 'smart' },
];

export function Footer() {
  const { runAction, openInfo, openBulk, notify } = useShop();
  const support: { label: string; run: () => void }[] = [
    { label: 'Contact Us', run: () => openInfo('contact') },
    { label: 'Bulk Enquiries', run: () => openBulk() },
    { label: 'Shipping Information', run: () => openInfo('shipping') },
    { label: 'Returns', run: () => openInfo('returns') },
    { label: 'FAQs', run: () => scrollToId('#faq') },
    { label: 'Track Order', run: () => openInfo('track') },
  ];
  const link = 'text-sm text-muted transition hover:text-gold-300 text-left';
  const legal: { label: string; key: InfoKey }[] = [
    { label: 'Privacy Policy', key: 'privacy' },
    { label: 'Terms & Conditions', key: 'terms' },
  ];

  return (
    <footer className="theme-dark bg-ink-950 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
        <div>
          <img src="/images/logo.webp" alt="ZYLUX Electrical" width={320} height={320} loading="lazy" className="size-28" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">Safe • Smart • Sustainable</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Lighting, switches, wires, cables, circuit protection and electrical accessories for residential, commercial and industrial spaces.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social media (placeholders)">
            {social.map((s) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => notify({ title: `${s.label} link coming soon`, text: 'Social profiles will be added by ZYLUX Electrical.', tone: 'neutral' })}
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-muted transition hover:border-gold-300 hover:text-gold-300"
                  aria-label={`${s.label} (placeholder)`}
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} fillRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Shop categories">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em]">Shop Categories</p>
          <ul className="mt-5 space-y-3">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <button type="button" className={link} onClick={() => runAction({ type: 'browse', department: l.dept })}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Customer support">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em]">Customer Support</p>
          <ul className="mt-5 space-y-3">
            {support.map((l) => (
              <li key={l.label}>
                <button type="button" className={link} onClick={l.run}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em]">Contact</p>
          <ul className="mt-5 space-y-4 text-sm text-muted">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
              <span>
                +91 XXXXX XXXXX <span className="block text-xs text-muted/70">Phone number placeholder</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
              <span>
                hello@your-domain.in <span className="block text-xs text-muted/70">Email placeholder</span>
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
              <span>
                Business address to be confirmed <span className="block text-xs text-muted/70">Address placeholder</span>
              </span>
            </li>
          </ul>
          <button type="button" onClick={() => openInfo('whatsapp')} className="btn btn-ghost-dark mt-6">
            <MessageCircle className="size-4 text-gold-300" aria-hidden="true" /> WhatsApp enquiry
          </button>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="container-x flex flex-col gap-5 py-6 text-xs text-muted lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} ZYLUX Electrical. All rights reserved.</span>
            {legal.map((l) => (
              <button key={l.key} type="button" onClick={() => openInfo(l.key)} className="transition hover:text-gold-300">
                {l.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2" aria-label="Payment methods (illustrative placeholders)">
            <span className="mr-1">Payments (illustrative):</span>
            {['UPI', 'VISA', 'Mastercard', 'RuPay', 'NetBanking'].map((p) => (
              <span key={p} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-semibold tracking-wide text-white/70">
                {p}
              </span>
            ))}
          </div>
        </div>
        <p className="container-x pb-8 text-[0.7rem] leading-relaxed text-muted/70">
          Interactive design demonstration. Product names, brands, prices, ratings, offers and testimonials are sample content and do not represent live stock,
          verified reviews or confirmed brand partnerships.
        </p>
      </div>
    </footer>
  );
}
