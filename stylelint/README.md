# @fatax/stylelint-config

Config Stylelint compartilhável que **bloqueia merge** de PR com CSS fora das regras Fatax.

Versão: **0.6.0** · Requer Stylelint 16+

---

## O que ele pega

| Regra | Bloqueia | Permite |
|---|---|---|
| **Hex literal** | qualquer `#FF4800`, `#0A0A0A` em código de produto | apenas `dist/tokens.css` e `brandbook/shared/style.css` (a "gráfica oficial") |
| **Cinzas frios** | `#000`, `#888`, `#444`, `#333`, `#222`, `#ccc`, `gray`, `grey` em color/bg/border | warm-grays via `var(--text-*)` |
| **Fontes fora da dupla** | Roboto, Helvetica, Arial, Playfair, Open Sans, Lato, Nunito, Poppins, Montserrat | `var(--font-display)`, `var(--font-sans)`, `var(--font-mono)`, `system-ui`, fallbacks |
| **Duration não-tokenizada** | `transition-duration: 250ms` | `var(--dur-fast/base/slow/deliberate)`, `0` |
| **Easing não-tokenizado** | `ease-in-out`, curvas custom | `var(--ease-out/std/in)`, `linear` |
| **Gradiente na marca** | `linear-gradient(..., #FF4800, ...)` em background | nada — laranja é sólido **sempre** |
| **Box-shadow para elevação** | `box-shadow: 0 4px 12px ...` | `none`, sombras com offset menor que 1px (uso interno como divisor) |
| **Unit pt/vmin/vmax** | em qualquer lugar | px, rem, em, %, fr |
| **ID selector** | `#meu-id` em CSS | só classes |
| **Custom property** fora de kebab-case | `--MyColor`, `--my_color` | `--my-color` |

---

## Como usar em outra app Fatax

```bash
npm install --save-dev @fatax/stylelint-config stylelint
```

`.stylelintrc.json` na raiz do seu app:

```json
{
  "extends": ["@fatax/stylelint-config"]
}
```

`package.json` do seu app:

```json
{
  "scripts": {
    "lint:css": "stylelint \"src/**/*.css\"",
    "lint:css:fix": "stylelint \"src/**/*.css\" --fix"
  }
}
```

Rode:

```bash
npm run lint:css
```

---

## Pre-commit hook (Husky)

```bash
npm install --save-dev husky lint-staged
npx husky init
```

`.husky/pre-commit`:
```sh
npx lint-staged
```

`package.json`:
```json
{
  "lint-staged": {
    "**/*.css": "stylelint --fix"
  }
}
```

Agora todo commit que tocar CSS passa pelo lint antes de virar commit.

---

## CI (GitHub Actions)

`.github/workflows/lint.yml`:
```yaml
name: Lint CSS
on: [pull_request, push]
jobs:
  stylelint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint:css
```

PR vermelho → não merga.

---

## Customizar

Se uma regra atrapalha em um arquivo específico, **desabilite localmente, não globalmente**:

```css
/* stylelint-disable color-no-hex */
.legacy-component {
  color: #ABC123; /* legado de integração com biblioteca externa */
}
/* stylelint-enable color-no-hex */
```

Se você precisa relaxar uma regra **para o projeto inteiro**, prefira PR no `@fatax/stylelint-config` discutindo o caso — assim toda Fatax decide junto, não cada app pula a regra.

---

## Por que essas regras

São a tradução **executável** das regras do `DESIGN.md`:

| Regra do DESIGN.md | Stylelint pega |
|---|---|
| §3.1 "Não use preto puro (#000)" | `declaration-property-value-disallowed-list` em `color/background/border` |
| §3.2 "Toda neutra é warm-gray" | bloqueia `#888`, `#444`, `gray`, etc |
| §4.1 "Três famílias, sem exceções" | `font-family` allow-list + deny-list |
| §7 "Não invente curvas ou durations" | `transition-*` allow-list |
| §3.3 "Laranja é sólido sempre" | bloqueia `linear-gradient` com `#FF4800` |
| §11.3 "Sem sombra — elevação por contraste" | bloqueia `box-shadow` com offset |

O `DESIGN.md` é a constituição; este pacote é a polícia.
