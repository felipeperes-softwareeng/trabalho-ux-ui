import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, ArrowRight, Check, ClipboardCheck, Trash2, X } from 'lucide-react'
import { availableSubjects, CURRENT_CREDITS, subjects } from '../data'
import { Chip, IconBox, PageHeading } from '../components/ui'

const MAX_CREDITS = 32

// Choque de horário: mesma dia e mesmo intervalo entre uma nova disciplina e as atuais.
const clashes = (day: string, time: string) => subjects.some(s => s.day === day && s.time === time)

function ConfirmDialog({ items, credits, onCancel, onConfirm }: {
  items: typeof availableSubjects; credits: number; onCancel: () => void; onConfirm: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    ref.current?.focus()
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', key)
    return () => document.removeEventListener('keydown', key)
  }, [onCancel])
  return (
    <div className="fixed inset-0 z-[70] grid place-items-end bg-black/70 p-3 backdrop-blur-sm sm:place-items-center" onClick={onCancel}>
      <div role="dialog" aria-modal="true" aria-labelledby="confirma-titulo" onClick={e => e.stopPropagation()} className="w-full max-w-lg animate-pop-in rounded-3xl border border-gold/30 bg-ink-800 p-6 shadow-gold">
        <div className="flex items-start justify-between gap-4">
          <div><p className="eyebrow">Última etapa</p><h3 id="confirma-titulo" className="mt-1 text-2xl font-extrabold">Confirmar pré-matrícula</h3></div>
          <button onClick={onCancel} aria-label="Fechar" className="focus-ring grid min-h-[44px] min-w-[44px] place-items-center rounded-xl text-text-muted hover:bg-line/10"><X className="h-5 w-5" aria-hidden /></button>
        </div>
        <p className="mt-3 text-text-muted">Revise as disciplinas escolhidas antes de confirmar.</p>
        <ul className="mt-4 space-y-2">
          {items.map(s => (
            <li key={s.code} className="flex items-center justify-between rounded-xl bg-line/[.04] px-4 py-3">
              <span><span className="block font-bold">{s.name}</span><span className="text-sm text-text-subtle">{s.day} · {s.time}</span></span>
              <span className="text-sm font-bold text-gold-bright">{s.credits} créd.</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-text-muted">Total após a matrícula: <strong className="text-text">{credits} créditos</strong></p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button onClick={onCancel} className="btn-ghost focus-ring">Voltar e editar</button>
          <button ref={ref} onClick={onConfirm} className="btn-gold focus-ring"><Check className="h-4 w-4" aria-hidden /> Confirmar matrícula</button>
        </div>
      </div>
    </div>
  )
}

export default function Matricula({ onToast }: { onToast: (m: string) => void }) {
  const [selected, setSelected] = useState<string[]>([])
  const [confirming, setConfirming] = useState(false)

  const chosen = availableSubjects.filter(s => selected.includes(s.code))
  const credits = chosen.reduce((sum, s) => sum + s.credits, CURRENT_CREDITS)
  const overLimit = credits > MAX_CREDITS
  const toggle = (code: string) => setSelected(s => (s.includes(code) ? s.filter(x => x !== code) : [...s, code]))

  const confirm = () => {
    setConfirming(false); setSelected([])
    onToast(`Pré-matrícula confirmada em ${chosen.length} nova(s) disciplina(s).`)
  }

  return (
    <div>
      <PageHeading
        eyebrow="Período 2026.2" title="Monte sua grade"
        description="Selecione as disciplinas desejadas. Você poderá revisar tudo antes de confirmar."
        action={<Chip tone="ok"><span className="h-2 w-2 rounded-full bg-ok" aria-hidden /> Matrículas abertas</Chip>}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section aria-label="Disciplinas disponíveis" className="space-y-3">
          {availableSubjects.map((s, i) => {
            const on = selected.includes(s.code)
            const clash = clashes(s.day, s.time)
            return (
              <label key={s.code} style={{ animationDelay: `${i * 50}ms` }} className={`card flex animate-fade-up cursor-pointer items-center gap-4 p-4 transition duration-200 hover:border-gold/40 sm:p-5 ${on ? 'border-gold/60 bg-gold/[.06] shadow-gold' : ''}`}>
                <input type="checkbox" checked={on} onChange={() => toggle(s.code)} className="peer sr-only" />
                <span aria-hidden className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 transition peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink-900 ${on ? 'border-gold bg-brand text-on-gold' : 'border-line/30'}`}>{on && <Check className="h-4 w-4" />}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold">{s.name}</span>
                  <span className="mt-1 block text-sm text-text-muted">{s.code} · {s.professor} · {s.day} {s.time}</span>
                  <span className="mt-1.5 block text-sm font-bold text-gold-bright sm:hidden">{s.credits} créditos <span className={s.vacancies <= 5 ? 'text-danger' : 'font-medium text-text-subtle'}>· {s.vacancies} vagas{s.vacancies <= 5 ? ' (últimas)' : ''}</span></span>
                  {clash && <span className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-danger"><AlertTriangle className="h-4 w-4" aria-hidden /> Choque de horário com uma disciplina atual</span>}
                </span>
                <span className="hidden shrink-0 text-right sm:block">
                  <span className="block text-sm font-bold text-gold-bright">{s.credits} créditos</span>
                  <span className={`block text-xs ${s.vacancies <= 5 ? 'font-bold text-danger' : 'text-text-subtle'}`}>{s.vacancies} vagas{s.vacancies <= 5 ? ' (últimas)' : ''}</span>
                </span>
              </label>
            )
          })}
        </section>

        <aside aria-label="Resumo da matrícula" className="card h-fit p-5 xl:sticky xl:top-28">
          <div className="flex items-center gap-3"><IconBox icon={ClipboardCheck} /><div><h3 className="text-lg font-extrabold">Resumo</h3><p className="text-sm text-text-subtle">Sua seleção atual</p></div></div>
          <dl className="my-5 space-y-3 border-y border-line/10 py-5 text-sm">
            <div className="flex justify-between"><dt className="text-text-muted">Disciplinas atuais</dt><dd className="font-bold tabular-nums">{subjects.length}</dd></div>
            <div className="flex justify-between"><dt className="text-text-muted">Novas disciplinas</dt><dd className="font-bold tabular-nums">{selected.length}</dd></div>
            <div className="flex justify-between"><dt className="text-text-muted">Total de créditos</dt><dd className={`font-bold tabular-nums ${overLimit ? 'text-danger' : ''}`}>{credits} / {MAX_CREDITS}</dd></div>
          </dl>
          {chosen.length > 0 && (
            <ul className="mb-4 space-y-2">
              {chosen.map(s => (
                <li key={s.code} className="flex items-center justify-between rounded-lg bg-line/[.04] px-3 py-2 text-sm">
                  <span className="truncate font-semibold">{s.name}</span>
                  <button onClick={() => toggle(s.code)} aria-label={`Remover ${s.name}`} className="focus-ring ml-2 grid min-h-[44px] min-w-[44px] place-items-center rounded-md text-text-subtle hover:text-danger"><Trash2 className="h-4 w-4" aria-hidden /></button>
                </li>
              ))}
            </ul>
          )}
          {overLimit && <p className="mb-3 flex items-start gap-2 rounded-xl bg-danger/10 p-3 text-sm font-semibold text-danger"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> O limite é de {MAX_CREDITS} créditos. Remova uma disciplina.</p>}
          <button onClick={() => setConfirming(true)} disabled={!selected.length || overLimit} className="btn-gold focus-ring w-full">Revisar e confirmar <ArrowRight className="h-4 w-4" aria-hidden /></button>
          <p className="mt-3 text-center text-sm text-text-subtle">{selected.length ? 'Você poderá revisar antes de confirmar.' : 'Escolha ao menos uma disciplina.'}</p>
        </aside>
      </div>
      {confirming && <ConfirmDialog items={chosen} credits={credits} onCancel={() => setConfirming(false)} onConfirm={confirm} />}
    </div>
  )
}
