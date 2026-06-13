# @fatax/visual-regression

Visual regression pixel-a-pixel com Playwright. **Quebra de baseline = drift visual no design system.** PR vermelho → não merga.

## O que ele cobre

| Suíte | Snapshots | O que pega |
|---|---|---|
| `brandbook.spec.ts` | 25 (24 páginas + cover) | Qualquer mudança visual em qualquer página do brandbook |
| `example.spec.ts` | 1 (`examples/minimal.html`) | Regressão no `dist/` (o app de exemplo consome o pacote como faria uma app real) |
| `states.spec.ts` | ~10 (sidebar collapsed/expanded/tooltip, button hover/focus, pills, lockup, stat, search) | Estados interativos que **não** aparecem no full-page do brandbook |

Total: ~36 snapshots por run.

## Setup

```bash
cd visual
npm install
npm run install:browsers   # baixa chromium (~150MB, uma vez)
```

## Gerar baselines pela primeira vez

⚠️ **Baselines são OS-específicos** — anti-aliasing de fonte renderiza diferente entre macOS / Ubuntu / Windows. O CI roda em `ubuntu-latest`, então os baselines **precisam** ser gerados em Ubuntu pra bater.

### Opção A · Docker (recomendado — paridade com CI)

```bash
docker run --rm --network host \
  -v "$(pwd):/work" -w /work/visual \
  mcr.microsoft.com/playwright:v1.40.0-jammy \
  bash -c "npm install && npm run test:update"
```

Isso roda o Playwright no mesmo container do CI, gera snapshots em Ubuntu, e salva em `visual/snapshots/`. Commit esses arquivos.

### Opção B · Ubuntu nativo

Se você já está em Ubuntu (WSL conta):
```bash
cd visual
npm run test:update
```

### Opção C · Rodar localmente em Mac/Windows pra debug

```bash
npm test
```

Vai gerar diffs gigantes contra os baselines do Ubuntu — **não use pra CI**, só pra inspecionar mudanças visualmente via `npm run test:report`.

## Workflow do dia-a-dia

```bash
# 1. Você mexeu em algum CSS / componente
cd visual && npm test

# Tests passando? Tudo certo, nada visualmente mudou. 

# Tests falhando? Inspecione o diff:
npm run test:report
# Abre o HTML report mostrando: baseline | actual | diff

# Se a mudança foi INTENCIONAL (você queria que ficasse diferente):
npm run test:update   # via Docker se rodando localmente
git add snapshots/
git commit -m "visual: update baselines (mudei .btn-primary hover)"

# Se a mudança foi ACIDENTAL: corrija o CSS até o test passar.
```

## Threshold

Configurado em `playwright.config.ts`:
- `maxDiffPixelRatio: 0.01` — tolera 1% dos pixels diferentes
- `threshold: 0.2` — cada pixel precisa estar 20% diferente do baseline pra contar

Isso absorve micro-variações de anti-aliasing entre runs sem deixar passar regressões reais.

## Adicionar novos snapshots

### Página nova no brandbook

Adicione ao array `PAGES` em `tests/brandbook.spec.ts`:
```ts
{ file: 'brandbook/25-nova.html', name: '25-nova' },
```
Rode `npm run test:update`, commit os baselines.

### Estado interativo novo

Adicione em `tests/states.spec.ts`:
```ts
test('drawer · open', async ({ page }) => {
  await page.goto('/brandbook/18-ds-components.html');
  // ... ações ...
  await expect(page.locator('.drawer')).toHaveScreenshot('drawer-open.png');
});
```

### Viewport novo (mobile/tablet)

Descomente os projetos em `playwright.config.ts`:
```ts
{
  name: 'chromium-mobile',
  use: { ...devices['Pixel 5'] },
},
```
Cada projeto gera seu próprio set de baselines em `snapshots/<test>-<projectName>/`.

## CI

`.github/workflows/visual.yml` roda em todo PR. Falha → bloqueia merge + uploa o `playwright-report/` como artifact (você baixa, abre o HTML e vê os diffs).

## Tamanho do repo

Cada snapshot full-page a 1440×900 é ~150–400 KB. 36 snapshots ≈ 8–12 MB de baselines commitados. Aceitável sem Git LFS. Se passar de 50 MB, considere LFS.

## Debug — modo interativo

```bash
npm run test:ui
```

Abre o Playwright UI: você navega pelos testes, vê screenshots side-by-side, replay de cada step. Indispensável quando algo está falhando e você não entende por quê.
