import { CircleCheck, Mail } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useShop } from '../../store/ShopContext';
import { Reveal } from '../ui/primitives';

export function NewsletterSection() {
  const { notify, openInfo } = useShop();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setDone(true);
    notify({ title: 'Subscribed (demo)', text: 'No email was sent or stored.', tone: 'info' });
  };

  return (
    <section aria-labelledby="newsletter-title" className="theme-dark relative overflow-hidden bg-ink-900 py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 hairline-gold" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.07] blur-[100px]" aria-hidden="true" />
      <Reveal className="container-x relative text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gold-500/10 text-gold-300 ring-1 ring-gold-500/30">
          <Mail className="size-6" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h2 id="newsletter-title" className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
          Stay connected with <span className="gold-text">ZYLUX.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted sm:text-lg">Get updates about electrical products, new arrivals, and upcoming offers.</p>

        {done ? (
          <p className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-2 rounded-2xl bg-emerald-500/10 p-4 text-emerald-300 ring-1 ring-emerald-500/30" role="status">
            <CircleCheck className="size-5 shrink-0" aria-hidden="true" />
            You’re on the list (demo). No email was sent or stored.
          </p>
        ) : (
          <form onSubmit={submit} noValidate className="mx-auto mt-8 max-w-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2 sm:rounded-full sm:border sm:border-white/12 sm:bg-ink-800 sm:p-1.5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your email address"
                aria-invalid={!!error}
                aria-describedby={error ? 'newsletter-error' : 'newsletter-note'}
                className="h-12 flex-1 rounded-full border border-white/12 bg-ink-800 px-5 text-white placeholder:text-muted focus:border-gold-500 focus:outline-none sm:border-0 sm:bg-transparent"
              />
              <button type="submit" className="btn btn-gold h-12 px-7">
                Subscribe
              </button>
            </div>
            {error && (
              <p id="newsletter-error" className="mt-2 text-sm text-[#ff8a8a]">
                {error}
              </p>
            )}
          </form>
        )}
        <p id="newsletter-note" className="mx-auto mt-4 max-w-lg text-xs text-muted">
          We’ll only use your email to send ZYLUX updates, and you can unsubscribe at any time. This demo doesn’t store your email. Read our{' '}
          <button type="button" onClick={() => openInfo('privacy')} className="underline underline-offset-2 hover:text-gold-300">
            privacy note
          </button>
          .
        </p>
      </Reveal>
    </section>
  );
}
