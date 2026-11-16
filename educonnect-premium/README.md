# EduConnect Premium

Redesign completo do portal acadêmico EduConnect, em um **visual premium**: fundo escuro profundo, dourado como cor de ação, vidro e brilho, com layout responsivo (computador, tablet e celular) e foco em acessibilidade.

O documento com a análise do site original, os problemas encontrados e as justificativas de cada mudança está em `../documento/Documento-Redesign-EduConnect.pdf`.

## Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Lucide React (ícones)

## Executar
Requer Node.js 18 ou superior.

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # checagem de tipos + versão final em dist/
npm run preview    # visualizar a versão final
```

## Telas
Dashboard, Notas, Disciplinas, Matrícula e Meu perfil, todas com as funcionalidades do projeto original.

### Melhorias em relação ao original
- Contraste do texto secundário de 2,56:1 para no mínimo 6,32:1.
- Navegação do celular com as 5 telas (o Perfil não aparecia).
- Matrícula com revisão e confirmação, limite de 32 créditos e alerta de choque de horário.
- Perfil com validação por campo e botões que só ativam quando há alteração.
- Notificações que realmente marcam como lidas e se ajustam ao celular.
- Dados corrigidos (média calculada a partir das notas, disciplina faltante, datas do semestre).
- **Modo claro e modo escuro:** botão no cabeçalho; tema padrão escuro, escolha salva no navegador (`src/theme.ts`) e cores de texto adaptadas a cada modo (tokens em `src/index.css`).
- Teclado e leitor de tela: foco visível, link "Pular para o conteúdo", Esc fecha menus e janelas.
- Correção do `npm run build` (faltavam `@types/react` e `@types/react-dom`).

## Estrutura
```
src/
  App.tsx                 estado geral e navegação
  data.ts                 dados de demonstração e cálculos
  components/Layout.tsx   menu lateral, cabeçalho, notificações, navegação do celular, aviso
  components/ui.tsx       componentes reutilizáveis
  pages/                  Dashboard, Notas, Disciplinas, Matrícula, Perfil
  index.css               utilitários do tema
tailwind.config.js        tokens de cor, sombra e animação
```

Os dados são fictícios (demonstração) e ficam em `src/data.ts`, prontos para serem trocados por uma API.
