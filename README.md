# Fatax Brandbook & Design System

Repositório fonte da marca **Fatax**: brandbook navegável, tokens, assets, CSS distribuível, componentes React e guias para agentes de IA.

A Fatax é uma assessoria operacional de crescimento. A marca existe para operar gestão, marketing e vendas como uma só operação para empresários brasileiros.

## O que há aqui

```txt
.
├── brandbook/          # site estático do brandbook
├── assets/logo/        # logos oficiais em SVG
├── dist/               # CSS consumível por aplicações
├── react/              # componentes React tipados
├── codegen/            # DESIGN.md -> tokens CSS/Tailwind/DTCG
├── stylelint/          # regras CSS Fatax
├── visual/             # regressão visual com Playwright
├── DESIGN.md           # spec canônico da marca e tokens
├── AI_BRAND_GUIDE.md   # resumo para futuras IAs
├── AGENTS.md           # instruções para agentes de código
└── vercel.json         # deploy estático na Vercel
```

O arquivo `Design system-handoff.zip` foi preservado como origem do handoff.

## Brandbook

Abra localmente:

```bash
npm install
npm run dev
```

Depois acesse `http://127.0.0.1:4173/brandbook/`.

O projeto é estático; `pnpm run dev` também funciona se o `pnpm` estiver instalado. O comando `pnm` não existe.

Na Vercel, a raiz `/` redireciona para:

```txt
/brandbook/
```

Capítulos principais:

- Fundamentos: overview, missão/valores, estratégia, arquétipos e manifesto.
- Expressão: tom e voz, moodboard, logo, cores, tipografia, iconografia, imagens, ilustrações, motion e áudio.
- Sistema: tokens, layout, componentes, inputs e data display.
- Aplicações: editorial, mockups e social.
- Prática: acessibilidade WCAG 2.2 AA.

## Vercel

Ao conectar este repositório na Vercel:

- Framework preset: **Other**.
- Build command: vazio.
- Output directory: raiz do repositório.

O `vercel.json` já cuida do redirecionamento da raiz e de headers básicos.

## Consumir em aplicações

HTML:

```html
<link rel="stylesheet" href="/dist/fatax.css" />
```

Bundler:

```ts
import '@fatax/design-system';
```

React:

```tsx
import '@fatax/design-system';
import { Button, Card, Sidebar, SectionHeader } from '@fatax/design-system-react';
```

Campos formatados:

```tsx
import { Input, Toggle } from '@fatax/design-system-react';

<Input label="CNPJ" format="cnpj" defaultValue="12345678000190" />
<Input label="Meta mensal" format="currency-brl" defaultValue="24800000" />
<Toggle checked={true} onChange={() => {}} label="Ativo" />
```

Checkbox não é padrão Fatax. Use `Toggle` para estados booleanos em todos os produtos.

Exports do pacote:

- `@fatax/design-system`
- `@fatax/design-system/tokens`
- `@fatax/design-system/base`
- `@fatax/design-system/components`
- `@fatax/design-system/sidebar.css`
- `@fatax/design-system/sidebar.html`
- `@fatax/design-system/sidebar.js`
- `@fatax/design-system/logo/*`
- `@fatax/design-system/spec`

## Tokens

Fonte de verdade: `DESIGN.md`.

Saídas consumíveis:

- `dist/tokens.css`
- `dist/tailwind.config.js`
- `dist/tokens.dtcg.json`

Quando alterar tokens:

```bash
npm run tokens:generate
npm run check
```

## Regras rápidas de marca

- Marca principal: **Fatax**.
- Categoria: assessoria operacional de crescimento.
- Promessa: previsibilidade.
- Paleta: preto `#0A0A0A`, creme `#F5EBDE`, laranja `#FF4800`.
- Tipografia: Syne para display, Inter para UI/corpo, JetBrains Mono para números.
- Voz: direta, operacional, sóbria e aliada.
- Botão de edição/ação utilitária: branco no estado normal, creme no hover.
- Tooltip: dark surface, texto creme e borda sutil.
- Não usar gradiente de marca, mascote, 3D decorativo, stock photo genérica ou cores inventadas.

Leia `AI_BRAND_GUIDE.md` antes de pedir a uma IA para criar qualquer tela, post, deck, imagem ou redesign da Fatax.

## Scripts

```bash
npm run dev             # servidor local estático em :4173
npm start               # alias do servidor local
npm run tokens:generate  # gera tokens a partir de DESIGN.md
npm run tokens:check     # valida drift de tokens
npm run lint:css         # valida CSS/HTML com stylelint
npm run check            # tokens + lint
```

## Testes visuais

Quando Playwright estiver instalado:

```bash
cd visual
npm install
npm run install:browsers
npm test
```

Os testes cobrem páginas do brandbook, exemplo mínimo e estados interativos.
