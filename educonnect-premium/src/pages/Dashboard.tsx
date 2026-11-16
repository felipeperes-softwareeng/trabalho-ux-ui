import { AlertCircle, ArrowRight, BarChart3, BookOpen, CalendarDays, ClipboardCheck, CircleHelp, Clock3, Sparkles, TrendingUp, UserRound } from 'lucide-react'
import { average, CURRENT_CREDITS, events, formatGrade, grades, subjects } from '../data'
import type { Page } from '../data'
import { Chip, IconBox, StatCard } from '../components/ui'
import type { Icon } from '../components/ui'

function QuickAction({ icon, title, description, onClick, badge }: { icon: Icon; title: string; description: string; onClick: () => void; badge?: string }) {
  return (
    <button onClick={onClick} className="focus-ring card-hover group flex min-h-[76px] items-center gap-4 rounded-2xl border border-line/10 bg-line/[.03] p-4 text-left">
      <IconBox icon={icon} />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 text-base font-bold">{title}{badge && <Chip tone="ok">{badge}</Chip>}</span>
        <span className="mt-0.5 block text-sm text-text-muted">{description}</span>
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 text-text-subtle transition group-hover:translate-x-1 group-hover:text-gold" aria-hidden />
    </button>
  )
}

export default function Dashboard({ onNavigate, onToast }: { onNavigate: (p: Page) => void; onToast: (m: string) => void }) {
  const avg = average(grades)
  return (
    <div className="space-y-8">
      <section className="relative isolate overflow-hidden rounded-3xl border border-gold/20 bg-ink-800 p-6 pb-44 shadow-cinema sm:p-10 sm:pb-44 xl:pb-10">
        {/* Marca d'água: foto do campus, esmaecida no lado do texto para não atrapalhar a leitura. */}
        <img src={`${import.meta.env.BASE_URL}campus-anchieta.jpg`} alt="" aria-hidden loading="eager" decoding="async" className="watermark pointer-events-none absolute inset-0 -z-10 h-full w-full select-none object-cover" />
        <div className="watermark-scrim pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-gold-deep/10 blur-3xl" aria-hidden />
        <div className="relative max-w-xl animate-fade-up">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-gold-bright"><Sparkles className="h-3.5 w-3.5" aria-hidden /> Semestre 2026.2</span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">Olá, <span className="gold-text">João</span></h2>
          <p className="mt-4 text-lg leading-8 text-text-muted">Acompanhe sua jornada acadêmica em um só lugar. Sua média está em <strong className="text-text">{formatGrade(avg)}</strong>, acima do semestre anterior.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => onNavigate('notas')} className="btn-gold focus-ring">Ver meu desempenho <ArrowRight className="h-4 w-4" aria-hidden /></button>
            <button onClick={() => onNavigate('matricula')} className="btn-ghost focus-ring !bg-ink-800/80 backdrop-blur-sm">Fazer matrícula</button>
          </div>
        </div>
      </section>

      <section aria-label="Indicadores" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Média geral" value={formatGrade(avg)} detail="+0,4 vs. semestre anterior" icon={TrendingUp} tone="gold" />
        <StatCard label="Disciplinas" value={String(subjects.length)} detail={`${CURRENT_CREDITS} créditos matriculados`} icon={BookOpen} tone="ok" delay={60} />
        <StatCard label="Frequência" value="94%" detail="Excelente aproveitamento" icon={Clock3} tone="violet" delay={120} />
        <StatCard label="Pendências" value="2" detail="1 atividade e 1 matrícula" icon={AlertCircle} tone="danger" delay={180} />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
        <section className="card animate-fade-up">
          <div className="border-b border-line/10 p-5 sm:p-6">
            <h3 className="text-xl font-extrabold">Ações rápidas</h3>
            <p className="mt-1 text-text-muted">Acesse o que você mais precisa.</p>
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
            <QuickAction icon={BarChart3} title="Consultar notas" description="Veja seu desempenho" onClick={() => onNavigate('notas')} />
            <QuickAction icon={BookOpen} title="Ver disciplinas" description="Horários e professores" onClick={() => onNavigate('disciplinas')} />
            <QuickAction icon={ClipboardCheck} title="Fazer matrícula" description="Escolha suas disciplinas" badge="Aberta" onClick={() => onNavigate('matricula')} />
            <QuickAction icon={UserRound} title="Atualizar perfil" description="Mantenha seus dados em dia" onClick={() => onNavigate('perfil')} />
          </div>
        </section>

        <section className="card animate-fade-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between p-5 sm:p-6">
            <div><h3 className="text-xl font-extrabold">Próximos eventos</h3><p className="mt-1 text-text-muted">Não perca os prazos.</p></div>
            <CalendarDays className="h-6 w-6 text-gold" aria-hidden />
          </div>
          <ul className="space-y-1 px-3 pb-4 sm:px-4">
            {events.map(e => (
              <li key={e.title} className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-line/[.04]">
                <div className={`w-16 shrink-0 rounded-xl py-2 text-center ${e.urgent ? 'bg-danger/15 text-danger' : 'bg-gold/15 text-gold-bright'}`}>
                  <span className="block text-xl font-extrabold leading-5 tabular-nums">{e.day}</span>
                  <span className="block text-xs font-bold tracking-wider">{e.month}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold">{e.title}</p>
                  <p className="mt-0.5 text-sm text-text-muted">{e.meta}{e.urgent && <span className="ml-2 font-bold text-danger">Urgente</span>}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div><h3 className="text-xl font-extrabold">Resumo das notas</h3><p className="mt-1 text-text-muted">Suas últimas avaliações.</p></div>
          <button onClick={() => onNavigate('notas')} className="focus-ring inline-flex min-h-[44px] items-center self-start rounded-lg px-3 text-sm font-bold text-gold hover:text-gold-bright">Ver todas <span aria-hidden>→</span></button>
        </div>
        <ul className="divide-y divide-line/10 border-t border-line/10">
          {grades.slice(0, 4).map(g => (
            <li key={g.code} className="flex items-center gap-4 px-5 py-4 sm:px-6">
              <span className="hidden sm:block"><IconBox icon={BookOpen} tone="gold" size="sm" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{g.name}</p>
                <p className="mt-0.5 text-sm text-text-subtle">{g.code} · {g.professor}</p>
              </div>
              <span className="hidden sm:block"><Chip tone="ok">{g.status}</Chip></span>
              <span className="text-2xl font-extrabold tabular-nums">{formatGrade(g.grade)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex gap-4">
          <IconBox icon={CircleHelp} tone="info" size="lg" />
          <div><p className="text-lg font-bold">Precisa de ajuda?</p><p className="mt-1 text-text-muted">Acesse a central de atendimento para tirar dúvidas acadêmicas.</p></div>
        </div>
        <button onClick={() => onToast('Central de ajuda: em breve você poderá abrir um chamado.')} className="btn-ghost focus-ring shrink-0">Central de ajuda</button>
      </section>
    </div>
  )
}
