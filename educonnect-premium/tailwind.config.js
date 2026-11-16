/** @type {import('tailwindcss').Config} */
// Visual premium: fundo "ink" quase preto, dourado como cor de ação, vidro e brilho.
// As cores são variáveis CSS (src/index.css) que mudam entre o modo escuro e o claro.
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        ink: { 950: c('ink-950'), 900: c('ink-900'), 800: c('ink-800'), 700: c('ink-700'), 600: c('ink-600') },
        gold: { deep: c('gold-deep'), DEFAULT: c('gold'), bright: c('gold-bright'), soft: c('gold-soft') },
        text: { DEFAULT: c('text'), muted: c('text-muted'), subtle: c('text-subtle') },
        line: c('line'),
        brand: '#f59e0b', // dourado sólido fixo (preenchimentos com texto escuro por cima)
        'on-gold': '#14141a', // texto sobre o dourado, escuro nos dois modos
        ok: c('ok'), info: c('info'), violet: c('violet'), danger: c('danger'),
      },
      boxShadow: {
        gold: 'var(--shadow-gold)',
        cinema: 'var(--shadow-cinema)',
        card: 'var(--shadow-card)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg,#fbbf24,#d97706)',
        'gold-soft': 'linear-gradient(180deg,rgba(245,158,11,.18),transparent 70%)',
      },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'pop-in': { from: { opacity: 0, transform: 'scale(.97) translateY(8px)' }, to: { opacity: 1, transform: 'scale(1) translateY(0)' } },
        shine: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.22,1,.36,1) both',
        'pop-in': 'pop-in .35s cubic-bezier(.22,1,.36,1) both',
        shine: 'shine 6s linear infinite',
      },
    },
  },
  plugins: [],
}
