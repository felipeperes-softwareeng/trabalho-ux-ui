import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { Tone } from '../data'

export type Icon = LucideIcon

// Cor semântica por tom: sempre ícone/rótulo + cor, nunca só cor.
export const toneStyles: Record<Tone, { chip: string; box: string; bar: string }> = {
  gold: { chip: 'bg-gold/15 text-gold-bright ring-1 ring-gold/30', box: 'bg-gold/15 text-gold-bright', bar: 'bg-gold-gradient' },
  ok: { chip: 'bg-ok/15 text-ok ring-1 ring-ok/30', box: 'bg-ok/15 text-ok', bar: 'bg-ok' },
  info: { chip: 'bg-info/15 text-info ring-1 ring-info/30', box: 'bg-info/15 text-info', bar: 'bg-info' },
  violet: { chip: 'bg-violet/15 text-violet ring-1 ring-violet/30', box: 'bg-violet/15 text-violet', bar: 'bg-violet' },
  danger: { chip: 'bg-danger/15 text-danger ring-1 ring-danger/30', box: 'bg-danger/15 text-danger', bar: 'bg-danger' },
}

export function IconBox({ icon: I, tone = 'gold', size = 'md' }: { icon: Icon; tone?: Tone; size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'sm' ? 'h-9 w-9 rounded-lg' : size === 'lg' ? 'h-12 w-12 rounded-2xl' : 'h-10 w-10 rounded-xl'
  const i = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  return <span className={`grid shrink-0 place-items-center ${s} ${toneStyles[tone].box}`}><I className={i} aria-hidden /></span>
}

export function Chip({ tone = 'gold', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`chip ${toneStyles[tone].chip}`}>{children}</span>
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-base leading-7 text-text-muted">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs font-semibold">
        <span className="text-text-muted">{label}</span>
        <span className="tabular-nums text-text">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line/10" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="h-full rounded-full bg-gold-gradient transition-all duration-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export function StatCard({ label, value, detail, icon, tone, delay = 0 }: { label: string; value: string; detail: string; icon: Icon; tone: Tone; delay?: number }) {
  return (
    <div style={{ animationDelay: `${delay}ms` }} className="card card-hover animate-fade-up p-5">
      <div className="flex items-center justify-between">
        <IconBox icon={icon} tone={tone} />
        <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">2026.2</span>
      </div>
      <p className="mt-5 text-sm font-medium text-text-muted">{label}</p>
      <p className="mt-1 text-4xl font-extrabold tracking-tight tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-text-subtle">{detail}</p>
    </div>
  )
}

export function Avatar({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' | 'xl' }) {
  const s = size === 'xl' ? 'h-24 w-24 text-3xl' : size === 'sm' ? 'h-9 w-9 text-xs' : 'h-10 w-10 text-sm'
  return <span aria-hidden className={`grid shrink-0 place-items-center rounded-full bg-gold-gradient font-extrabold text-on-gold ${s}`}>{initials}</span>
}

export function EmptyState({ icon: I, title, text }: { icon: Icon; title: string; text: string }) {
  return (
    <div className="card grid place-items-center px-6 py-14 text-center">
      <IconBox icon={I} size="lg" />
      <p className="mt-4 text-lg font-bold">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-text-muted">{text}</p>
    </div>
  )
}
