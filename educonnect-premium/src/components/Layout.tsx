import { useEffect, useRef } from 'react'
import {
  BarChart3, Bell, BookOpen, CalendarDays, CheckCircle2, ChevronDown, ClipboardCheck,
  Home, LogOut, Menu, Moon, ShieldCheck, Sun, User, UserRound, X,
} from 'lucide-react'
import type { Theme } from '../theme'
import type { Page } from '../data'
import Logo from './Logo'
import { Avatar, IconBox } from './ui'
import type { Icon } from './ui'
import type { Tone } from '../data'

export const navItems: { id: Page; label: string; short: string; icon: Icon }[] = [
  { id: 'dashboard', label: 'Dashboard', short: 'Início', icon: Home },
  { id: 'notas', label: 'Notas', short: 'Notas', icon: BarChart3 },
  { id: 'disciplinas', label: 'Disciplinas', short: 'Aulas', icon: BookOpen },
  { id: 'matricula', label: 'Matrícula', short: 'Matrícula', icon: ClipboardCheck },
  { id: 'perfil', label: 'Meu perfil', short: 'Perfil', icon: UserRound },
]

export type Notification = { id: number; title: string; text: string; tone: Tone; unread: boolean }

// Fecha um painel ao clicar fora ou apertar Esc.
function useDismiss(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const down = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose() }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('mousedown', down)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('keydown', key) }
  }, [open, onClose])
  return ref
}

export function Sidebar({ page, open, onNavigate, onClose, onLogout }: {
  page: Page; open: boolean; onNavigate: (p: Page) => void; onClose: () => void; onLogout: () => void
}) {
  return (
    <>
      {open && <button onClick={onClose} className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" aria-label="Fechar menu" />}
      <aside
        aria-label="Menu lateral"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line/10 bg-ink-950/95 px-5 py-6 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-2">
          <button onClick={() => onNavigate('dashboard')} className="focus-ring flex items-center gap-3 rounded-xl">
            <Logo size={48} />
            <span className="text-left">
              <span className="block text-lg font-extrabold tracking-tight">Edu<span className="gold-text">Connect</span></span>
              <span className="block text-xs text-text-subtle">Portal acadêmico</span>
            </span>
          </button>
          <button onClick={onClose} aria-label="Fechar menu" className="focus-ring grid min-h-[44px] min-w-[44px] place-items-center rounded-xl text-text-muted hover:bg-line/10 lg:hidden"><X className="h-5 w-5" aria-hidden /></button>
        </div>

        <p className="mt-9 px-2 text-xs font-bold uppercase tracking-[.18em] text-text-subtle">Menu principal</p>
        <nav aria-label="Principal" className="mt-3 space-y-1.5">
          {navItems.map(({ id, label, icon: I }) => {
            const active = page === id
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                aria-current={active ? 'page' : undefined}
                className={`focus-ring group relative flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold transition ${active ? 'bg-gold/15 text-gold-bright ring-1 ring-gold/30' : 'text-text-muted hover:bg-line/[.06] hover:text-text'}`}
              >
                {active && <span className="absolute -left-5 h-6 w-1 rounded-r-full bg-gold-gradient" aria-hidden />}
                <I className="h-5 w-5" aria-hidden />
                {label}
                {id === 'matricula' && <span className="ml-auto rounded-full bg-gold-gradient px-2 py-0.5 text-[11px] font-extrabold text-on-gold">ABERTA</span>}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto">
          <div className="glass mb-4 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Avatar initials="JS" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">João Silva</p>
                <p className="truncate text-xs text-text-subtle">RA 20261234</p>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-text-muted"><ShieldCheck className="h-4 w-4 text-ok" aria-hidden /> Conta protegida</p>
          </div>
          <button onClick={onLogout} className="focus-ring flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-text-muted transition hover:bg-danger/10 hover:text-danger">
            <LogOut className="h-5 w-5" aria-hidden /> Sair do sistema
          </button>
        </div>
      </aside>
    </>
  )
}

export function Header({ title, semester, setSemester, onMenu, theme, onToggleTheme, notifications, onReadAll, notifOpen, setNotifOpen, profileOpen, setProfileOpen, onProfile, onLogout }: {
  title: string; semester: string; setSemester: (v: string) => void; onMenu: () => void
  theme: Theme; onToggleTheme: () => void
  notifications: Notification[]; onReadAll: () => void; notifOpen: boolean; setNotifOpen: (v: boolean) => void
  profileOpen: boolean; setProfileOpen: (v: boolean) => void; onProfile: () => void; onLogout: () => void
}) {
  const unread = notifications.filter(n => n.unread).length
  const notifRef = useDismiss(notifOpen, () => setNotifOpen(false))
  const profRef = useDismiss(profileOpen, () => setProfileOpen(false))
  return (
    <header className="sticky top-0 z-30 border-b border-line/10 bg-ink-950/75 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button onClick={onMenu} className="focus-ring rounded-xl p-2.5 text-text-muted hover:bg-line/10 lg:hidden" aria-label="Abrir menu"><Menu className="h-6 w-6" aria-hidden /></button>
          <div className="min-w-0">
            <p className="hidden text-xs font-semibold uppercase tracking-wider text-text-subtle sm:block">Área do aluno</p>
            <h1 className="truncate text-lg font-extrabold tracking-tight sm:text-xl">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <label className="glass hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-text-muted sm:flex">
            <CalendarDays className="h-4 w-4 text-gold" aria-hidden />
            <span className="sr-only">Semestre</span>
            <select value={semester} onChange={e => setSemester(e.target.value)} className="cursor-pointer bg-transparent outline-none [&>option]:bg-ink-800">
              <option>2026.2</option><option>2026.1</option><option>2025.2</option>
            </select>
          </label>

          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="focus-ring flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-text-muted transition hover:bg-line/10 hover:text-text"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
            <span className="hidden md:inline">{theme === 'dark' ? 'Modo claro' : 'Modo escuro'}</span>
          </button>

          <div className="relative" ref={notifRef}>
            <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }} aria-label={`Notificações${unread ? `, ${unread} novas` : ''}`} aria-expanded={notifOpen} className="focus-ring relative grid min-h-[44px] min-w-[44px] place-items-center rounded-xl text-text-muted transition hover:bg-line/10 hover:text-text">
              <Bell className="h-5 w-5" aria-hidden />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-extrabold text-on-gold ring-2 ring-ink-950">{unread}</span>}
            </button>
            {notifOpen && (
              <div className="fixed inset-x-3 top-[84px] z-50 animate-pop-in overflow-hidden rounded-2xl border border-line/10 bg-ink-800 shadow-cinema sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-[360px]">
                <div className="flex items-center justify-between border-b border-line/10 px-4 py-3">
                  <span className="font-bold">Notificações</span>
                  <button onClick={onReadAll} disabled={!unread} className="focus-ring rounded-lg px-2 py-1 text-xs font-bold text-gold hover:bg-gold/10 disabled:text-text-subtle disabled:hover:bg-transparent">Marcar como lidas</button>
                </div>
                <ul className="divide-y divide-line/10">
                  {notifications.map(n => (
                    <li key={n.id} className="flex gap-3 p-4">
                      <IconBox icon={n.tone === 'ok' ? CheckCircle2 : ClipboardCheck} tone={n.tone} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-sm font-semibold">{n.title}{n.unread && <span className="h-2 w-2 rounded-full bg-brand" aria-label="não lida" />}</p>
                        <p className="mt-0.5 text-sm text-text-muted">{n.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative ml-1" ref={profRef}>
            <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }} aria-expanded={profileOpen} aria-label="Menu do perfil" className="focus-ring flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-line/10">
              <Avatar initials="JS" size="sm" />
              <span className="hidden text-left sm:block"><span className="block text-sm font-bold leading-4">João Silva</span><span className="block text-xs text-text-subtle">Aluno</span></span>
              <ChevronDown className="hidden h-4 w-4 text-text-subtle sm:block" aria-hidden />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 animate-pop-in overflow-hidden rounded-2xl border border-line/10 bg-ink-800 p-1.5 shadow-cinema">
                <button onClick={onProfile} className="focus-ring flex min-h-[44px] w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold hover:bg-line/[.06]"><User className="h-4 w-4" aria-hidden /> Meu perfil</button>
                <button onClick={onLogout} className="focus-ring flex min-h-[44px] w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold text-danger hover:bg-danger/10"><LogOut className="h-4 w-4" aria-hidden /> Sair</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

// As 5 telas ficam acessíveis no celular (no original o Perfil sumia).
export function MobileNav({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  return (
    <nav aria-label="Navegação inferior" className="fixed inset-x-0 bottom-0 z-40 border-t border-line/10 bg-ink-950/90 px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {navItems.map(({ id, short, icon: I }) => {
          const active = page === id
          return (
            <li key={id}>
              <button onClick={() => onNavigate(id)} aria-current={active ? 'page' : undefined} className={`focus-ring flex min-h-[56px] w-full flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-bold transition ${active ? 'text-gold-bright' : 'text-text-subtle'}`}>
                <span className={`grid h-7 w-12 place-items-center rounded-full transition ${active ? 'bg-gold/15' : ''}`}><I className="h-5 w-5" aria-hidden /></span>
                {short}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div role="status" aria-live="polite" className="fixed bottom-24 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-pop-in items-center gap-3 rounded-2xl border border-gold/30 bg-ink-800 px-4 py-3 text-sm font-semibold shadow-gold lg:bottom-6">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-ok" aria-hidden />
      {message}
    </div>
  )
}
