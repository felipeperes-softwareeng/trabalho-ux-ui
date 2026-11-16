import { useId } from 'react'

// Logo 3D do EduConnect: capelo de formatura dourado (com espessura, base e borla) sobre uma placa escura com aro metálico.
// Todo o volume vem de gradientes e camadas, sem imagem externa; o mesmo desenho está em public/favicon.svg.
export default function Logo({ size = 44, className = '' }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, '')
  const u = (n: string) => `${n}-${id}`
  return (
    <svg
      width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Logo EduConnect"
      className={className} style={{ filter: 'drop-shadow(0 6px 10px rgba(217,119,6,.35))' }}
    >
      <defs>
        <linearGradient id={u('tile')} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#30303c" /><stop offset="1" stopColor="#09090c" />
        </linearGradient>
        <linearGradient id={u('rim')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde68a" /><stop offset=".5" stopColor="#f59e0b" /><stop offset="1" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id={u('shine')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={u('top')} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#fff6c2" /><stop offset=".45" stopColor="#fbbf24" /><stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id={u('left')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e08a0b" /><stop offset="1" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id={u('right')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b45309" /><stop offset="1" stopColor="#6b2f0a" />
        </linearGradient>
        <linearGradient id={u('base')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d97706" /><stop offset="1" stopColor="#7c3a0c" />
        </linearGradient>
        <filter id={u('shadow')} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="2.2" stdDeviation="1.6" floodColor="#000" floodOpacity=".55" />
        </filter>
      </defs>

      {/* Placa */}
      <rect x="2" y="2" width="60" height="60" rx="16" fill={`url(#${u('tile')})`} />
      <rect x="2" y="2" width="60" height="30" rx="16" fill={`url(#${u('shine')})`} />
      <rect x="2.8" y="2.8" width="58.4" height="58.4" rx="15.2" fill="none" stroke={`url(#${u('rim')})`} strokeWidth="1.6" />

      {/* Capelo */}
      <g filter={`url(#${u('shadow')})`}>
        <path d="M19 35.5 L32 42 L45 35.5 V46 C45 51 19 51 19 46 Z" fill={`url(#${u('base')})`} />
        <path d="M7 29.5 L32 42 V47 L7 34.5 Z" fill={`url(#${u('left')})`} />
        <path d="M57 29.5 L32 42 V47 L57 34.5 Z" fill={`url(#${u('right')})`} />
        <path d="M32 12 L57 24.5 L32 37 L7 24.5 Z" fill={`url(#${u('top')})`} />
        <path d="M7 24.5 L32 12 L57 24.5" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth=".9" strokeLinejoin="round" />
        <ellipse cx="32" cy="24.5" rx="2.4" ry="1.2" fill="#92400e" />
        <path d="M32 24.5 L50 28.2 V41" fill="none" stroke="#fff3b0" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="48.5" y="40" width="3" height="7.5" rx="1.3" fill={`url(#${u('top')})`} />
      </g>
    </svg>
  )
}
