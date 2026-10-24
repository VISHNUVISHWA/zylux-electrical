import { motion } from 'motion/react';
import { ImageOff, Minus, Plus, Star } from 'lucide-react';
import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** Image with graceful fallback so a missing asset never shows a broken icon. */
export function Img({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className={cn('grid place-items-center bg-gradient-to-br from-paper to-line text-slate', className)} role="img" aria-label={alt}>
        <ImageOff className="size-6 opacity-50" aria-hidden="true" />
      </div>
    );
  return <img loading="lazy" decoding="async" alt={alt} onError={() => setFailed(true)} className={className} {...props} />;
}

export function Stars({ rating, size = 'sm', className }: { rating: number; size?: 'sm' | 'md'; className?: string }) {
  const px = size === 'sm' ? 'size-3.5' : 'size-4';
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`Sample rating ${rating} out of 5`} role="img">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className={cn('relative', px)} aria-hidden="true">
            <Star className={cn('absolute inset-0 text-line', px)} fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={cn('text-gold-500', px)} fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function QtyStepper({
  value,
  onChange,
  label,
  dark,
  min = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  dark?: boolean;
  min?: number;
}) {
  return (
    <div className={cn('inline-flex h-10 items-center rounded-full border', dark ? 'border-white/15' : 'border-line bg-white')} role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        className="grid size-10 place-items-center rounded-full transition hover:text-gold-500 disabled:opacity-40"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="grid size-10 place-items-center rounded-full transition hover:text-gold-500 disabled:opacity-40"
        onClick={() => onChange(value + 1)}
        disabled={value >= 99}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

/** Fades content in as it scrolls into view. Motion respects prefers-reduced-motion via MotionConfig. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark,
  align = 'left',
  action,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className={cn('mb-10 flex flex-col gap-6 md:mb-12', align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between')}>
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p className={cn('eyebrow mb-3 flex items-center gap-3', dark ? 'text-gold-300' : 'text-gold-600', align === 'center' && 'justify-center')}>
            <span className={cn('h-px w-8', dark ? 'bg-gold-300/60' : 'bg-gold-600/60')} aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 id={id} className={cn('text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.75rem]', dark ? 'text-white' : 'text-ink')}>
          {title}
        </h2>
        {text && <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', dark ? 'text-muted' : 'text-slate')}>{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function DemoTag({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider',
        dark ? 'bg-white/8 text-muted ring-1 ring-white/10' : 'bg-paper text-slate ring-1 ring-line',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-gold-500" aria-hidden="true" />
      {children}
    </span>
  );
}
