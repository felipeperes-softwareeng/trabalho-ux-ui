// Dados demonstrativos (mantidos do projeto original). Pronto para ser trocado por uma API.

export type Page = 'dashboard' | 'notas' | 'disciplinas' | 'matricula' | 'perfil'

export type Tone = 'gold' | 'ok' | 'info' | 'violet' | 'danger'

export type Grade = {
  name: string; code: string; grade: number; status: 'Aprovado' | 'Em andamento'; professor: string
}

export type Subject = {
  name: string; code: string; professor: string; day: string; time: string; room: string; credits: number; progress: number
}

export type Available = {
  name: string; code: string; professor: string; day: string; time: string; credits: number; vacancies: number
}

export const grades: Grade[] = [
  { name: 'Desenvolvimento Web', code: 'WEB301', grade: 9.4, status: 'Aprovado', professor: 'Marina Costa' },
  { name: 'Banco de Dados', code: 'BD204', grade: 8.7, status: 'Aprovado', professor: 'Rafael Mendes' },
  { name: 'Engenharia de Software', code: 'ENG210', grade: 8.2, status: 'Aprovado', professor: 'Carla Nunes' },
  { name: 'UX e Design de Interfaces', code: 'UX110', grade: 9.1, status: 'Aprovado', professor: 'Lucas Alves' },
  { name: 'Estruturas de Dados', code: 'ED202', grade: 7.6, status: 'Em andamento', professor: 'João Prado' },
  { name: 'Arquitetura de Computadores', code: 'AC101', grade: 8.0, status: 'Em andamento', professor: 'Ana Lima' },
]

export const subjects: Subject[] = [
  { name: 'Desenvolvimento Web', code: 'WEB301', professor: 'Marina Costa', day: 'Seg', time: '19:00 – 21:00', room: 'Lab 03', credits: 4, progress: 82 },
  { name: 'Banco de Dados', code: 'BD204', professor: 'Rafael Mendes', day: 'Ter', time: '19:00 – 21:00', room: 'Sala 12', credits: 4, progress: 76 },
  { name: 'Engenharia de Software', code: 'ENG210', professor: 'Carla Nunes', day: 'Qua', time: '19:00 – 21:00', room: 'Sala 08', credits: 4, progress: 70 },
  { name: 'UX e Design de Interfaces', code: 'UX110', professor: 'Lucas Alves', day: 'Qui', time: '19:00 – 21:00', room: 'Lab 01', credits: 3, progress: 91 },
  { name: 'Estruturas de Dados', code: 'ED202', professor: 'João Prado', day: 'Sex', time: '19:00 – 21:00', room: 'Lab 02', credits: 4, progress: 61 },
  { name: 'Arquitetura de Computadores', code: 'AC101', professor: 'Ana Lima', day: 'Sáb', time: '08:00 – 10:00', room: 'Sala 05', credits: 5, progress: 66 },
]

export const availableSubjects: Available[] = [
  { name: 'Computação em Nuvem', code: 'CLD310', professor: 'Fernanda Reis', day: 'Seg', time: '21:00 – 23:00', credits: 4, vacancies: 12 },
  { name: 'Segurança da Informação', code: 'SEC320', professor: 'Bruno Dias', day: 'Ter', time: '21:00 – 23:00', credits: 4, vacancies: 7 },
  { name: 'Mobile Development', code: 'MOB305', professor: 'Diego Ramos', day: 'Qua', time: '21:00 – 23:00', credits: 4, vacancies: 15 },
  { name: 'Inteligência Artificial', code: 'IA401', professor: 'Patrícia Melo', day: 'Qui', time: '21:00 – 23:00', credits: 5, vacancies: 4 },
]

// Datas ajustadas para o semestre 2026.2 (no original estavam em setembro, fora do período).
export const events = [
  { day: '02', month: 'DEZ', title: 'Entrega do projeto Web', meta: 'Desenvolvimento Web', urgent: false },
  { day: '05', month: 'DEZ', title: 'Fim do período de matrícula', meta: 'Secretaria acadêmica', urgent: true },
  { day: '12', month: 'DEZ', title: 'Avaliação parcial', meta: 'Estruturas de Dados', urgent: false },
]

export const initialNotifications = [
  { id: 1, title: 'Matrícula aberta', text: 'Período 2026.2 disponível até 05/12.', tone: 'gold' as Tone, unread: true },
  { id: 2, title: 'Nota atualizada', text: 'Estruturas de Dados recebeu uma nova nota.', tone: 'ok' as Tone, unread: true },
]

export const CURRENT_CREDITS = subjects.reduce((s, x) => s + x.credits, 0) // 24, igual ao informado no original

export const formatGrade = (n: number) => n.toFixed(1).replace('.', ',')

export const average = (list: Grade[]) => list.reduce((s, g) => s + g.grade, 0) / list.length

export const profileDefaults = {
  name: 'João Silva', email: 'joao.silva@email.com', phone: '(11) 99999-8888', city: 'São Paulo', course: 'Sistemas de Informação',
}
