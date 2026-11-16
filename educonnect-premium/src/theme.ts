export type Theme = 'dark' | 'light'

const KEY = 'educonnect-theme'

// O tema padrão é o escuro (identidade visual do redesign); a escolha do aluno fica salva no navegador.
export function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* armazenamento indisponível: segue com o padrão */ }
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4f5f9' : '#060606')
  try { localStorage.setItem(KEY, theme) } catch { /* sem armazenamento: vale só nesta sessão */ }
}
