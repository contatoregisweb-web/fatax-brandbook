# `dist/` — arquivos consumíveis

Saída versionada do **@fatax/design-system v0.6**. Tudo aqui é gerado a partir do `DESIGN.md` da raiz — **não edite estes arquivos diretamente.** Edite o spec, regenere.

## Arquivos

| Arquivo | O que tem | Tamanho |
|---|---|---|
| `tokens.css` | `:root { --* }` — todas as variáveis CSS (cores, spacing, radius, motion, type, layout) + `@import` Google Fonts | ~3 KB |
| `base.css` | Reset, type rules globais, utility classes, document shell (`.main`, `.topbar`, `.section-header`, `.content`, `.block`) | ~4 KB |
| `components.css` | `.btn`, `.card`, `.pill`, `.spec-table`, `.pager`, `.stat`, `.manifesto`, `.swatch`, `.dodont-*`, `.hero-num` | ~8 KB |
| `sidebar.css` | `.app` grid + sidebar recolhível + brand morph + nav + tooltip flyout + `.poweredby` lockup oficial | ~9 KB |
| `fatax.css` | Bundle (`@import` dos quatro acima na ordem correta) | — |
| `sidebar.html` | Template do sidebar com sprite SVG inline (28 ícones) + estrutura canônica + lockup obrigatório | ~9 KB |
| `sidebar.js` | Comportamento: collapse persistente, `⌘K`, `·` shortcut, marca link ativo | ~3 KB |

## Ordem de carga (não negociável)

`tokens.css` → `base.css` → `components.css` → `sidebar.css`

Ou use o bundle: `fatax.css`.

## Consumo mínimo

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <!-- 1. CSS (bundle ou os 4 individuais) -->
  <link rel="stylesheet" href="./dist/fatax.css" />
  <!-- 2. JS no topo do head para evitar flash -->
  <script src="./dist/sidebar.js"></script>
</head>
<body>
  <div class="app">
    <!-- 3. Sidebar (cole o conteúdo de dist/sidebar.html) -->
    <!-- 4. Sua main app -->
    <main class="main">…</main>
  </div>
</body>
</html>
```

Ver `examples/minimal.html` na raiz para uma página completa pronta pra rodar.

## Versionamento

Versão atual: **0.6.0** — segue semver:
- `patch` (0.6.x) — fix visual, ajuste de contraste, bug
- `minor` (0.x.0) — token novo, componente novo, mudança backward-compatible
- `major` (x.0.0) — remoção, renomeação, mudança que quebra consumidores

Cada release tem entrada no `DESIGN.md §17 (changelog)`.
