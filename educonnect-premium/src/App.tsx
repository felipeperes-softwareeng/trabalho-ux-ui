import { useCallback, useEffect, useRef, useState } from 'react'
import { initialNotifications } from './data'
import { applyTheme, getInitialTheme } from './theme'
import type { Theme } from './theme'
import type { Page } from './data'
import { Header, MobileNav, Sidebar, Toast } from './components/Layout'
import type { Notification } from './components/Layout'
import Dashboard from './pages/Dashboard'
import Notas from './pages/Notas'
import Disciplinas from './pages/Disciplinas'
import Matricula from './pages/Matricula'
import Perfil from './pages/Perfil'

const titles: Record<Page, string> = {
  dashboard: 'Dashboard', notas: 'Minhas notas', disciplinas: 'Minhas disciplinas', matricula: 'Matrícula', perfil: 'Meu perfil',
}

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [semester, setSemester] = useState('2026.2')
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const timer = useRef<number>()

  useEffect(() => { applyTheme(theme) }, [theme])

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 3500)
  }, [])

  const navigate = (next: Page) => {
    setPage(next); setSidebarOpen(false); setProfileOpen(false); setNotifOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Esc fecha o menu lateral no celular.
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false) }
    document.addEventListener('keydown', key)
    return () => document.removeEventListener('keydown', key)
  }, [])

  const logout = () => showToast('Sessão encerrada com sucesso.')

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    showToast(next === 'light' ? 'Modo claro ativado.' : 'Modo escuro ativado.')
  }

  return (
    <div className="min-h-screen">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2 focus:font-bold focus:text-on-gold">Pular para o conteúdo</a>
      <Sidebar page={page} open={sidebarOpen} onNavigate={navigate} onClose={() => setSidebarOpen(false)} onLogout={logout} />
      <div className="lg:pl-72">
        <Header
          title={titles[page]} semester={semester} setSemester={setSemester} onMenu={() => setSidebarOpen(true)}
          theme={theme} onToggleTheme={toggleTheme}
          notifications={notifications} onReadAll={() => setNotifications(n => n.map(x => ({ ...x, unread: false })))}
          notifOpen={notifOpen} setNotifOpen={setNotifOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen}
          onProfile={() => navigate('perfil')} onLogout={logout}
        />
        <main id="conteudo" className="mx-auto max-w-[1400px] px-4 pb-32 pt-8 sm:px-6 lg:px-8 lg:pb-12">
          {page === 'dashboard' && <Dashboard onNavigate={navigate} onToast={showToast} />}
          {page === 'notas' && <Notas semester={semester} />}
          {page === 'disciplinas' && <Disciplinas />}
          {page === 'matricula' && <Matricula onToast={showToast} />}
          {page === 'perfil' && <Perfil onToast={showToast} />}
        </main>
      </div>
      <MobileNav page={page} onNavigate={navigate} />
      <Toast message={toast} />
    </div>
  )
}
