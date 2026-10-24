import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

type Variant = 'center' | 'right' | 'left' | 'top';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Visually hide the default header (the content renders its own). */
  hideHeader?: boolean;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  dark?: boolean;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let openCount = 0;

const panelMotion: Record<Variant, object> = {
  center: { initial: { opacity: 0, y: 24, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 16, scale: 0.98 } },
  right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
  left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  top: { initial: { opacity: 0, y: -24 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } },
};

const panelClass: Record<Variant, string> = {
  center: 'relative m-auto w-[calc(100%-32px)] max-w-2xl max-h-[calc(100dvh-32px)] overflow-y-auto rounded-3xl',
  right: 'ml-auto h-full w-full max-w-md overflow-y-auto',
  left: 'mr-auto h-full w-[88vw] max-w-sm overflow-y-auto',
  top: 'w-full max-h-[100dvh] overflow-y-auto',
};

function DialogInner({ onClose, title, hideHeader, variant = 'center', className, children, dark }: Omit<DialogProps, 'open'>) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    openCount++;
    document.documentElement.style.overflow = 'hidden';

    const focusFirst = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const target = panel.querySelector<HTMLElement>('[data-autofocus]') ?? panel.querySelector<HTMLElement>(FOCUSABLE);
      (target ?? panel).focus({ preventScroll: true });
    };
    const raf = requestAnimationFrame(focusFirst);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      openCount--;
      if (openCount <= 0) document.documentElement.style.overflow = '';
      // Only hand focus back if another dialog hasn't already taken it.
      const active = document.activeElement;
      if (!active || active === document.body || panelRef.current?.contains(active)) {
        previouslyFocused?.focus?.({ preventScroll: true });
      }
    };
  }, []);

  return (
    <div className={cn('fixed inset-0 z-[80] flex', variant === 'center' && 'items-center py-4', dark && 'theme-dark')}>
      <motion.div
        className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        {...panelMotion[variant]}
        transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
        className={cn(
          'relative z-10 flex flex-col shadow-2xl outline-none',
          dark ? 'bg-ink-900 text-white' : 'bg-white text-ink',
          panelClass[variant],
          className,
        )}
      >
        <div className={cn(hideHeader ? 'sr-only' : 'flex items-center justify-between gap-4 border-b px-5 py-4 sm:px-6', dark ? 'border-white/10' : 'border-line')}>
          <h2 id={titleId} className="font-display text-lg font-bold">
            {title}
          </h2>
          {!hideHeader && (
            <button
              type="button"
              onClick={onClose}
              className={cn('grid size-10 place-items-center rounded-full transition', dark ? 'hover:bg-white/10' : 'hover:bg-paper')}
              aria-label={`Close ${title}`}
            >
              <X className="size-5" />
            </button>
          )}
        </div>
        {children}
      </motion.div>
    </div>
  );
}

export function Dialog(props: DialogProps) {
  const { open, ...rest } = props;
  return createPortal(<AnimatePresence>{open && <DialogInner key="dialog" {...rest} />}</AnimatePresence>, document.body);
}
