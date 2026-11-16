import { useMemo, useState } from 'react'
import { BarChart3, BookOpen, CheckCircle2, SearchX, TrendingUp } from 'lucide-react'
import { average, formatGrade, grades } from '../data'
import { Chip, EmptyState, IconBox, PageHeading } from '../components/ui'
import type { Icon } from '../components/ui'

const filters = ['Todas', 'Aprovado', 'Em andamento'] as const

function Metric({ label, value, icon }: { label: string; value: string; icon: Icon }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <IconBox icon={icon} size="lg" />
      <div><p className="text-sm font-medium text-text-muted">{label}</p><p className="mt-0.5 text-3xl font-extrabold tabular-nums">{value}</p></div>
    </div>
  )
}

// Nota com cor + texto (nunca só cor): >= 9 destaque, < 8 atenção.
function GradeValue({ value }: { value: number }) {
  const color = value >= 9 ? 'text-gold-bright' : value < 8 ? 'text-danger' : 'text-text'
  return <span className={`text-3xl font-extrabold tabular-nums ${color}`}>{formatGrade(value)}</span>
}

export default function Notas({ semester }: { semester: string }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Todas')
  const list = useMemo(() => grades.filter(g => filter === 'Todas' || g.status === filter), [filter])
  const done = grades.filter(g => g.status === 'Aprovado').length
  return (
    <div>
      <PageHeading
        eyebrow={`Boletim · ${semester}`} title="Acompanhe seu desempenho"
        description="Consulte suas notas, situação acadêmica e professores de cada disciplina."
        action={
          <div role="group" aria-label="Filtrar por situação" className="glass flex flex-wrap gap-1 rounded-xl p-1">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f} className={`focus-ring min-h-[44px] rounded-lg px-4 text-sm font-bold transition ${filter === f ? 'bg-gold-gradient text-on-gold' : 'text-text-muted hover:text-text'}`}>{f}</button>
            ))}
          </div>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Metric label="Média do semestre" value={formatGrade(average(grades))} icon={TrendingUp} />
        <Metric label="Maior nota" value={formatGrade(Math.max(...grades.map(g => g.grade)))} icon={BarChart3} />
        <Metric label="Disciplinas concluídas" value={`${done} / ${grades.length}`} icon={CheckCircle2} />
      </div>

      {list.length === 0 ? (
        <EmptyState icon={SearchX} title="Nenhuma disciplina neste filtro" text="Escolha outra situação para ver o seu boletim." />
      ) : (
        <section className="card overflow-hidden" aria-label="Boletim">
          <div className="hidden grid-cols-[1fr_160px_180px_90px] gap-4 border-b border-line/10 bg-line/[.03] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-text-subtle md:grid">
            <span>Disciplina</span><span>Situação</span><span>Professor</span><span className="text-right">Nota</span>
          </div>
          <ul className="divide-y divide-line/10">
            {list.map((g, i) => (
              <li key={g.code} style={{ animationDelay: `${i * 50}ms` }} className="grid animate-fade-up gap-3 px-5 py-5 transition hover:bg-line/[.03] md:grid-cols-[1fr_160px_180px_90px] md:items-center md:gap-4 md:px-6">
                <div className="flex items-center gap-3">
                  <IconBox icon={BookOpen} />
                  <div className="min-w-0"><p className="font-bold">{g.name}</p><p className="mt-0.5 text-sm text-text-subtle">{g.code}</p></div>
                </div>
                <span><Chip tone={g.status === 'Aprovado' ? 'ok' : 'gold'}>{g.status}</Chip></span>
                <span className="text-text-muted"><span className="text-text-subtle md:hidden">Professor: </span>{g.professor}</span>
                <span className="md:text-right"><GradeValue value={g.grade} /></span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
