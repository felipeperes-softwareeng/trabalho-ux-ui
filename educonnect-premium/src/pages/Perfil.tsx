import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, MapPin, Pencil, Phone, Settings, ShieldCheck, User } from 'lucide-react'
import { profileDefaults } from '../data'
import { Avatar, IconBox, PageHeading } from '../components/ui'
import type { Icon } from '../components/ui'

type Form = typeof profileDefaults

function Field({ id, label, icon: I, value, onChange, error, type = 'text', autoComplete }: {
  id: string; label: string; icon: Icon; value: string; onChange: (v: string) => void; error?: string; type?: string; autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-text">{label}</label>
      <div className="relative">
        <I className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" aria-hidden />
        <input id={id} type={type} value={value} autoComplete={autoComplete} onChange={e => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-erro` : undefined} className={`input pl-10 ${error ? 'border-danger/70' : ''}`} />
      </div>
      {error && <p id={`${id}-erro`} role="alert" className="mt-1.5 text-sm font-semibold text-danger">{error}</p>}
    </div>
  )
}

const validate = (f: Form) => {
  const e: Partial<Record<keyof Form, string>> = {}
  if (f.name.trim().length < 3) e.name = 'Informe o nome completo.'
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Informe um e-mail válido, como nome@email.com.'
  if (f.phone.replace(/\D/g, '').length < 10) e.phone = 'Informe o telefone com DDD.'
  if (f.city.trim().length < 2) e.city = 'Informe a cidade.'
  return e
}

export default function Perfil({ onToast }: { onToast: (m: string) => void }) {
  const [saved, setSaved] = useState<Form>(profileDefaults)
  const [form, setForm] = useState<Form>(profileDefaults)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const dirty = JSON.stringify(form) !== JSON.stringify(saved)
  const update = (k: keyof Form, v: string) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: undefined })) }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) { onToast('Corrija os campos destacados.'); return }
    setSaved(form); onToast('Perfil atualizado com sucesso!')
  }

  return (
    <div>
      <PageHeading eyebrow="Conta acadêmica" title="Meu perfil" description="Mantenha seus dados de contato atualizados para receber comunicados importantes." />
      <form onSubmit={submit} noValidate className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <section className="card h-fit p-6 text-center">
          <div className="mx-auto w-fit rounded-full p-1 shadow-gold ring-2 ring-gold/40"><Avatar initials="JS" size="xl" /></div>
          <h3 className="mt-4 text-xl font-extrabold">{saved.name}</h3>
          <p className="mt-1 text-sm text-text-subtle">RA 20261234</p>
          <div className="mt-5 rounded-xl bg-line/[.04] p-4 text-left"><p className="text-sm font-bold">Curso</p><p className="mt-1 text-text-muted">{saved.course}</p></div>
          <button type="button" onClick={() => onToast('Seletor de foto aberto.')} className="btn-ghost focus-ring mt-4 w-full"><Pencil className="h-4 w-4" aria-hidden /> Alterar foto</button>
        </section>

        <section className="card p-5 sm:p-7">
          <div className="flex items-center gap-3 border-b border-line/10 pb-5"><IconBox icon={User} /><div><h3 className="text-lg font-extrabold">Dados pessoais</h3><p className="text-sm text-text-subtle">Informações básicas da sua conta.</p></div></div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field id="nome" label="Nome completo" icon={User} value={form.name} onChange={v => update('name', v)} error={errors.name} autoComplete="name" />
            <Field id="email" label="E-mail" icon={Mail} value={form.email} onChange={v => update('email', v)} error={errors.email} type="email" autoComplete="email" />
            <Field id="telefone" label="Telefone" icon={Phone} value={form.phone} onChange={v => update('phone', v)} error={errors.phone} type="tel" autoComplete="tel" />
            <Field id="cidade" label="Cidade" icon={MapPin} value={form.city} onChange={v => update('city', v)} error={errors.city} autoComplete="address-level2" />
          </div>
          <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-line/10 pt-5 sm:flex-row">
            <button type="button" disabled={!dirty} onClick={() => { setForm(saved); setErrors({}) }} className="btn-ghost focus-ring disabled:opacity-40">Descartar alterações</button>
            <button type="submit" disabled={!dirty} className="btn-gold focus-ring">Salvar alterações</button>
          </div>
        </section>
      </form>

      <section className="card mt-6 p-5 sm:p-6">
        <div className="flex items-center gap-3"><IconBox icon={Settings} tone="violet" /><div><h3 className="text-lg font-extrabold">Segurança</h3><p className="text-sm text-text-subtle">Gerencie as configurações de acesso.</p></div></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button onClick={() => onToast('Fluxo de troca de senha iniciado.')} className="card-hover focus-ring rounded-xl border border-line/10 bg-line/[.03] p-4 text-left"><p className="font-bold">Alterar senha</p><p className="mt-1 text-sm text-text-muted">Atualize sua senha de acesso.</p></button>
          <button onClick={() => onToast('Sua conta está protegida com autenticação segura.')} className="card-hover focus-ring rounded-xl border border-line/10 bg-line/[.03] p-4 text-left"><p className="flex items-center gap-2 font-bold"><ShieldCheck className="h-4 w-4 text-ok" aria-hidden /> Sessões ativas</p><p className="mt-1 text-sm text-text-muted">1 dispositivo conectado agora.</p></button>
        </div>
      </section>
    </div>
  )
}
