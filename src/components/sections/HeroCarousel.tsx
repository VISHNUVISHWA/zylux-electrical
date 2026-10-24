import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { heroSlides } from '../../data/content';
import { productById } from '../../data/products';
import { cn, formatINR } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';

const DURATION = 7000;
const spotlight: Record<string, string> = { brand: 'cob-12-blk', lighting: 'pn-18-sq', cables: 'hw-25-yel', smart: 'tp-3g-noir' };

export function HeroCarousel() {
  const { runAction, addToCart, openQuickView } = useShop();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const count = heroSlides.length;
  const slide = heroSlides[index];
  const running = !paused && !hovering && !reduce;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(index + 1), DURATION);
    return () => window.clearTimeout(t);
  }, [index, running, go]);

  const product = productById(spotlight[slide.id]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      className="theme-dark relative isolate h-[clamp(540px,calc(100svh-150px),660px)] overflow-hidden bg-ink-950 text-white lg:h-[680px] 2xl:h-[720px]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      <h1 className="sr-only">ZYLUX Electrical — Lighting, Switches, Wires &amp; Electrical Essentials</h1>

      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${count}`}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={slide.imageSm} />
            <motion.img
              src={slide.image}
              alt={slide.alt}
              className={cn('absolute inset-0 size-full object-cover', slide.position)}
              initial={reduce ? false : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: 'easeOut' }}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10 md:bg-gradient-to-r md:from-ink-950/95 md:via-ink-950/60 md:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950/90 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container-x relative flex h-full flex-col justify-end pb-28 md:justify-center md:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="max-w-[44rem]"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
              exit: { opacity: 0, transition: { duration: 0.25 } },
            }}
            aria-live={running ? 'off' : 'polite'}
          >
            {[
              <p key="e" className="eyebrow mb-5 flex items-center gap-3 text-gold-300">
                <span className="h-px w-10 bg-gold-300/70" aria-hidden="true" />
                {slide.eyebrow}
              </p>,
              <h2 key="h" className="font-display text-[2.15rem] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-[4.1rem]">
                <span className="block">{slide.title[0]}</span>
                <span className="gold-text block">{slide.title[1]}</span>
              </h2>,
              <p key="t" className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {slide.text}
              </p>,
              <div key="c" className="mt-8 flex flex-col gap-3 sm:flex-row">
                {slide.ctas.map((cta, i) => (
                  <button
                    type="button"
                    key={cta.label}
                    onClick={() => runAction(cta.action)}
                    className={cn('btn h-12 px-7', i === 0 ? 'btn-gold' : 'btn-ghost-dark')}
                  >
                    {cta.label}
                    <ArrowRight className="arrow size-4" aria-hidden="true" />
                  </button>
                ))}
              </div>,
            ].map((child, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {product && (
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.6 } }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-28 right-10 hidden w-[300px] items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/70 p-3 backdrop-blur-xl xl:flex 2xl:right-[max(40px,calc((100vw-1400px)/2+40px))]"
          >
            <button type="button" onClick={() => openQuickView(product.id)} className="size-16 shrink-0 overflow-hidden rounded-xl bg-white" aria-label={`Quick view ${product.name}`}>
              <img src={product.image} alt="" className="size-full object-cover" loading="lazy" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-gold-300">Trending now</p>
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="text-sm font-bold">
                {formatINR(product.price)} <span className="text-xs font-normal text-muted line-through">{formatINR(product.mrp)}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product.id)}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-500 text-ink-950 transition hover:bg-gold-300"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="size-4" />
            </button>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-x flex items-center justify-between gap-4 pb-7">
          <div className="flex flex-1 items-center gap-2 sm:max-w-lg sm:gap-3" role="tablist" aria-label="Choose slide">
            {heroSlides.map((s, i) => (
              <button
                type="button"
                key={s.id}
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                onClick={() => go(i)}
                className="group flex-1 py-3 text-left"
              >
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/20">
                  {i === index ? (
                    <span
                      key={`${index}-${running}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-gold-300"
                      style={
                        running
                          ? { animation: `hero-progress ${DURATION}ms linear forwards` }
                          : { width: '100%' }
                      }
                    />
                  ) : (
                    <span className={cn('absolute inset-0 rounded-full bg-white/0 transition group-hover:bg-white/40', i < index && 'bg-white/50')} />
                  )}
                </span>
                <span className={cn('mt-2 hidden text-[0.7rem] font-medium uppercase tracking-wider transition md:block', i === index ? 'text-white' : 'text-white/45 group-hover:text-white/80')}>
                  0{i + 1} · {s.id === 'brand' ? 'Zylux' : s.eyebrow.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-2 hidden text-sm tabular-nums text-white/60 sm:block">
              <span className="text-white">0{index + 1}</span> / 0{count}
            </span>
            <button type="button" onClick={() => setPaused((p) => !p)} className="grid size-11 place-items-center rounded-full border border-white/15 bg-ink-950/40 backdrop-blur transition hover:border-gold-300 hover:text-gold-300" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
            <button type="button" onClick={() => go(index - 1)} className="grid size-11 place-items-center rounded-full border border-white/15 bg-ink-950/40 backdrop-blur transition hover:border-gold-300 hover:text-gold-300" aria-label="Previous slide">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => go(index + 1)} className="grid size-11 place-items-center rounded-full border border-white/15 bg-ink-950/40 backdrop-blur transition hover:border-gold-300 hover:text-gold-300" aria-label="Next slide">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
