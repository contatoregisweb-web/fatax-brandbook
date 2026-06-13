# @fatax/codegen

Gera artefatos a partir do `DESIGN.md` (raiz do repo). **Uma fonte de verdade → múltiplas saídas sincronizadas.**

```
DESIGN.md (YAML frontmatter)
   ├─→ dist/tokens.css         (CSS custom properties — overwrite)
   ├─→ dist/tailwind.config.js (theme.extend pronto pra Tailwind)
   └─→ dist/tokens.dtcg.json   (W3C Design Tokens — sync com Figma)
```

## Uso

```bash
cd codegen
npm install
npm run generate     # gera e escreve
npm run check        # CI: falha se houver drift entre DESIGN.md e dist/
```

## Quando rodar

- Sempre que você editar tokens no `DESIGN.md` (cores, spacing, motion, etc).
- No CI: hook que roda em cada push no `main`. Se `npm run check` falhar, abre PR automático com o diff.

## Outputs detalhados

### `dist/tokens.css`
CSS custom properties. **Sobrescreve** o arquivo existente — não edite à mão. Importe via `@import './tokens.css'` ou link.

### `dist/tailwind.config.js`
Tailwind v3+ config com `theme.extend` populado. Use no seu app:

```js
// tailwind.config.js do seu app
import fataxConfig from '@fatax/design-system/dist/tailwind.config.js';
export default {
  ...fataxConfig,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

Classes geradas:
- `bg-brand-orange`, `text-brand-cream`, `border-border-soft`
- `font-display`, `font-sans`, `font-mono`
- `p-md`, `p-xl`, `gap-2xl`, `rounded-md`
- `duration-fast`, `ease-out`, `ease-std`, `ease-in`

`boxShadow` está **desabilitado** — Fatax usa contraste de surface, nunca sombra para elevação.

### `dist/tokens.dtcg.json`
[W3C Design Tokens Community Group](https://www.designtokens.org) format. Compatível com:
- **Figma Tokens Studio** plugin (sync bidirectional Figma ↔ código)
- **Style Dictionary** (gera outputs adicionais: Swift, Kotlin, etc)
- **Specify**, **Tokens.json**, qualquer ferramenta DTCG-compliant

Estrutura:
```json
{
  "color": {
    "brand": {
      "orange": { "DEFAULT": { "$type": "color", "$value": "#FF4800" } }
    }
  }
}
```

## Integração com GitHub Actions

```yaml
# .github/workflows/tokens-check.yml
name: Tokens check
on:
  pull_request:
    paths: ['DESIGN.md', 'codegen/**', 'dist/tokens.*']
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: cd codegen && npm ci && npm run check
```

Se o YAML mudou mas `dist/` não foi regenerado → CI vermelho → bloqueia merge.

## Estendendo

Pra adicionar um novo output (SCSS, Swift, Kotlin):
1. Crie uma função `buildXxx()` em `generate.mjs`
2. Adicione ao array `outputs`
3. PR no `@fatax/codegen` passa pela revisão do dono do DS
