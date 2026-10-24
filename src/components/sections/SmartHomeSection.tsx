import { ArrowRight, Cpu, Lightbulb, Power, ToggleRight, Wifi } from 'lucide-react';
import { useState } from 'react';
import type { CtaAction } from '../../data/types';
import { cn } from '../../lib/utils';
import { useShop } from '../../store/ShopContext';
import { DemoTag, Img, Reveal } from '../ui/primitives';

const scenes = [
  { id: 'relax', label: 'Relax', level: 70, warmth: 0.55 },
  { id: 'focus', label: 'Focus', level: 100, warmth: 0.1 },
  { id: 'movie', label: 'Movie', level: 38, warmth: 0.7 },
  { id: 'off', label: 'Off', level: 0, warmth: 0 },
] as const;

const features: { icon: typeof Lightbulb; title: string; text: string; action: CtaAction }[] = [
  { icon: Lightbulb, title: 'Smart Lighting', text: 'Tunable white and colour bulbs with schedules and scenes.', action: { type: 'browse', department: 'smart', sub: 'Smart Bulbs' } },
  { icon: ToggleRight, title: 'Smart Switches', text: 'Touch panels and retrofit modules for app and voice control.', action: { type: 'browse', department: 'switches', sub: 'Smart Switches' } },
  { icon: Cpu, title: 'Intelligent Controls', text: 'Smart plugs, sensors and automation modules that work together.', action: { type: 'browse', department: 'smart', sub: 'Smart Control' } },
];

export function SmartHomeSection() {
  const { runAction } = useShop();
  const [scene, setScene] = useState<(typeof scenes)[number]['id']>('relax');
  const [level, setLevel] = useState(70);
  const [cove, setCove] = useState(true);
  const warmth = scenes.find((s) => s.id === scene)?.warmth ?? 0.4;
  const effective = cove ? level : Math.min(level, 25);

  return (
    <section id="smart-home" aria-labelledby="smart-title" className="theme-dark relative overflow-hidden bg-ink-950 py-16 text-white sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-0 size-[520px] rounded-full bg-gold-500/10 blur-[120px]" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3 text-gold-300">
            <span className="h-px w-8 bg-gold-300/60" aria-hidden="true" /> Smart Home
          </p>
          <h2 id="smart-title" className="font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            Make every <span className="gold-text">connection smarter.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">Discover connected lighting, intelligent switching, and modern electrical controls.</p>
          <ul className="mt-9 grid gap-3">
            {features.map(({ icon: Icon, title, text, action }) => (
              <li key={title}>
                <button
                  type="button"
                  onClick={() => runAction(action)}
                  className="group flex w-full items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-left transition hover:border-gold-500/40 hover:bg-white/[0.05] sm:p-5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-300/25 to-gold-500/5 text-gold-300 ring-1 ring-gold-500/30">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-bold">{title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{text}</span>
                  </span>
                  <ArrowRight className="mt-1 size-4 text-muted transition group-hover:translate-x-1 group-hover:text-gold-300" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => runAction({ type: 'browse', department: 'smart' })} className="btn btn-gold mt-8 h-12 px-7">
            Explore Smart Home <ArrowRight className="arrow size-4" aria-hidden="true" />
          </button>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[28px] ring-1 ring-white/10">
            <div className="relative aspect-[4/3.4] sm:aspect-[4/3]">
              <Img
                src="/images/ambient-living.webp"
                alt="Living room with warm LED cove and under-furniture lighting controlled by a smart scene"
                className="absolute inset-0 size-full object-cover transition-[filter] duration-700"
                style={{ filter: `brightness(${0.25 + (effective / 100) * 0.85}) saturate(${0.7 + warmth * 0.5})` }}
              />
              <div
                className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-700"
                style={{ background: 'radial-gradient(circle at 60% 40%, #ffb347, transparent 70%)', opacity: (warmth * effective) / 100 }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30" aria-hidden="true" />
              <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 sm:left-5 sm:top-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-ink-950/60 px-3 py-1.5 text-xs font-medium backdrop-blur">
                  <span className={cn('size-2 rounded-full', effective > 0 ? 'bg-emerald-400' : 'bg-white/30')} aria-hidden="true" />
                  Living Room
                  <Wifi className="size-3.5 text-gold-300" aria-hidden="true" />
                </span>
                <DemoTag dark className="bg-ink-950/60 backdrop-blur">
                  Interactive demo
                </DemoTag>
              </div>
            </div>

            <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-ink-900/75 p-4 backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div role="radiogroup" aria-label="Lighting scene" className="flex flex-wrap gap-1.5">
                  {scenes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={scene === s.id}
                      onClick={() => {
                        setScene(s.id);
                        setLevel(s.level);
                      }}
                      className={cn(
                        'h-9 rounded-full px-3.5 text-xs font-semibold transition sm:text-sm',
                        scene === s.id ? 'bg-gold-500 text-ink-950' : 'bg-white/[0.06] text-white/80 hover:bg-white/10',
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={cove}
                  onClick={() => setCove((c) => !c)}
                  className="flex items-center gap-2 text-xs font-medium text-white/80 sm:text-sm"
                >
                  <Power className="size-4 text-gold-300" aria-hidden="true" />
                  Cove lights
                  <span className={cn('relative h-6 w-11 rounded-full transition', cove ? 'bg-gold-500' : 'bg-white/15')}>
                    <span className={cn('absolute top-0.5 size-5 rounded-full bg-white shadow transition-all', cove ? 'left-[22px]' : 'left-0.5')} />
                  </span>
                </button>
              </div>
              <label className="mt-4 flex items-center gap-4 text-xs text-muted sm:text-sm">
                <span className="w-20 shrink-0">Brightness</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-[#FFD45C]"
                  aria-valuetext={`${level} percent`}
                />
                <span className="w-10 text-right font-semibold tabular-nums text-white">{level}%</span>
              </label>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
