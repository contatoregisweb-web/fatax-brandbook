# AGENTS.md — Fatax Brandbook

Este repositório é a fonte oficial da marca Fatax para humanos, aplicações e agentes de IA.

## Objetivo do repo

- Documentar quem é a Fatax e como ela se expressa.
- Distribuir tokens, CSS, assets SVG e componentes React.
- Impedir que futuras IAs inventem padrões visuais ou verbais fora da marca.
- Hospedar o brandbook como site estático na Vercel.

## Antes de editar

1. Leia `AI_BRAND_GUIDE.md`.
2. Consulte `DESIGN.md` para tokens e regras canônicas.
3. Use `brandbook/index.html` como entrada visual.
4. Preserve os assets em `assets/logo/` e `brandbook/shared/`.

## Regras de marca

- Marca principal: Fatax.
- Categoria: assessoria operacional de crescimento.
- Paleta: preto `#0A0A0A`, creme `#F5EBDE`, laranja `#FF4800`.
- Tipografia: Syne para títulos, Inter para UI/corpo, JetBrains Mono para número/código.
- Voz: direta, operacional, sóbria e aliada.
- Cards usam `.card`, `.card-grid`, `.card-title`, `.card-body` e `.card-meta`; não crie estilos inline divergentes.
- Botão utilitário de edição usa `variant="light"` ou `.btn-light`: branco no repouso, creme no hover.
- Nunca use checkbox. Use `Toggle` para qualquer booleano.
- Inputs de CNPJ e dinheiro devem usar formatação automática (`format="cnpj"` e `format="currency-brl"` no React ou `data-format` no brandbook).
- Select, autocomplete e combobox devem usar o visual do design system; não deixe controles com aparência nativa do navegador.
- Tooltips são dark surface com texto creme.
- Nunca use gradiente de marca, mascote, stock photo genérica, 3D decorativo ou cores inventadas.

## Estrutura

- `brandbook/`: site estático navegável.
- `brandbook/shared/`: CSS, sidebar, include JS e logos usados pelo brandbook.
- `dist/`: pacote CSS consumível por aplicações.
- `react/`: wrappers React tipados sobre o CSS.
- `codegen/`: gera tokens CSS, Tailwind e DTCG a partir de `DESIGN.md`.
- `visual/`: suíte Playwright para regressão visual.
- `AI_BRAND_GUIDE.md`: resumo canônico para IA.

## Desenvolvimento

- Não edite `dist/tokens.css`, `dist/tailwind.config.js` ou `dist/tokens.dtcg.json` manualmente quando forem gerados; edite `DESIGN.md` e rode codegen.
- Se alterar tokens, rode:

```bash
npm run tokens:generate
npm run check
```

- Se alterar visual do brandbook, rode os testes visuais quando Playwright estiver instalado:

```bash
cd visual
npm test
```

## Vercel

O projeto é estático. `vercel.json` redireciona `/` para `/brandbook/`. Ao conectar o repositório na Vercel:

- Framework preset: Other.
- Build command: vazio.
- Output directory: raiz do repositório.

## Critério de aceite

- Nenhuma página pública deve conter marcador de rascunho, bloco aberto ou aviso de seção incompleta.
- O brandbook deve abrir em `/brandbook/`.
- A sidebar, busca e navegação anterior/próxima devem funcionar.
- Tokens, README e guias devem continuar coerentes entre si.
