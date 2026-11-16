import { useState } from 'react'
import { BookOpen, CalendarDays, CreditCard, MapPin, Search, SearchX, UserRound } from 'lucide-react'
import { subjects } from '../data'
import type { Subject } from '../data'
import { EmptyState, IconBox, PageHeading, Progress } from '../components/ui'
import type { Icon } from '../components/ui'

function Info({ icon: I, text }: { icon: Icon; text: string }) {
  return <div className="flex items-center gap-2 text-sm text-text-muted"><I className="h-4 w-4 shrink-0 text-gold" aria-hidden />{text}</div>
}

function SubjectCard({ s, delay }: { s: Subject; delay: number }) {
  return (
    <article style={{ animationDelay: `${delay}ms` }} className="card card-hover animate-fade-up p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <IconBox icon={BookOpen} size="lg" />
        <div className="min-w-0">
          <h3 className="text-lg font-extrabold">{s.name}</h3>
          <p className="mt-1 text-sm font-semibold text-text-subtle">{s.code} · {s.credits} créditos</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Info icon={UserRound} text={s.professor} />
        <Info icon={CalendarDays} text={`${s.day} · ${s.time}`} />
        <Info icon={MapPin} text={s.room} />
        <Info icon={CreditCard} text={`${s.credits} créditos`} />
      </div>
      <div className="mt-5"><Progress value={s.progress} label="Progresso do semestre" /></div>
    </article>
  )
}

export default function Disciplinas() {
  const [search, setSearch] = useState('')
  const q = search.trim().toLowerCase()
  const list = subjects.filter(s => `${s.name} ${s.code} ${s.professor}`.toLowerCase().includes(q))
  return (
    <div>
      <PageHeading
        eyebrow="Grade curricular" title="Minhas disciplinas"
        description="Veja seus horários, professores, créditos e andamento das disciplinas."
        action={
          <div className="relative sm:w-72">
            <label htmlFor="busca" className="sr-only">Buscar disciplina</label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" aria-hidden />
            <input id="busca" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome, código ou professor" className="input pl-10" />
          </div>
        }
      />
      {list.length === 0 ? (
        <EmptyState icon={SearchX} title="Nenhuma disciplina encontrada" text={`Não achamos resultados para "${search}". Tente outro termo.`} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">{list.map((s, i) => <SubjectCard key={s.code} s={s} delay={i * 60} />)}</div>
      )}
    </div>
  )
}
