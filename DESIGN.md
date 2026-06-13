---
version: 0.6
name: Fatax Design System
codename: Dark Cockpit
description: >
  Sistema de design da Fatax — braço direito do empresário em gestão,
  marketing e vendas. Bicolor por princípio (creme + laranja sobre preto),
  editorial na tipografia (Syne + Inter), denso na UI, institucional na voz.
  Esta é a constituição visual: dela derivam todos os produtos, dashboards,
  decks, peças de marketing e parcerias powered-by-Fatax.
updated: 2026-06-13
stylesheet: brandbook/shared/style.css
brandbook: brandbook/index.html

# ─────────────────────────────────────────────────────────────────────────
# TOKENS — fonte da verdade. Toda regra `var(--*)` no CSS é definida aqui.
# Os nomes batem 1:1 com as custom properties em brandbook/shared/style.css.
# ─────────────────────────────────────────────────────────────────────────

colors:
  # Estrutura — preto absoluto + escala neutra warm-gray
  background:       "#0A0A0A"   # var(--background) — fundo de todas as páginas
  surface:          "#141414"   # var(--surface)
  surface-raised:   "#1C1C1C"   # var(--surface-raised) — hover, active row, modal
  surface-sunken:   "#050506"   # var(--surface-sunken) — sidebar, table header
  surface-overlay:  "rgba(0,0,0,0.85)" # var(--surface-overlay) — modal backdrop

  # Bordas — três pesos
  border:           "#262626"   # var(--border) — padrão de inputs, cards definidos
  border-soft:      "#1A1A1A"   # var(--border-soft) — divisões discretas
  border-strong:    "#363636"   # var(--border-strong) — hover de cards/botões
  border-cream:     "rgba(245,235,222,0.12)" # var(--border-cream) — borda discreta sobre cream

  # Texto — cream-led, warm grays (NUNCA cinzas frios)
  text-primary:     "#F5EBDE"   # var(--text-primary) — manchetes, valores; é o brand-cream
  text-secondary:   "#9C9489"   # var(--text-secondary) — labels, descrições
  text-muted:       "#6B655D"   # var(--text-muted) — timestamps, helper text
  text-disabled:    "#3A3631"   # var(--text-disabled) — estados off
  text-inverse:     "#0A0A0A"   # var(--text-inverse) — texto sobre fundos claros

  # MARCA — Fatax Orange (combustível)
  brand-orange:           "#FF4800"  # var(--brand-orange)
  brand-orange-hover:     "#FF6A2E"  # var(--brand-orange-hover)
  brand-orange-pressed:   "#D63D00"  # var(--brand-orange-pressed)
  brand-orange-soft:      "#2E1408"  # var(--brand-orange-soft) — alerts, badges, tints
  brand-orange-tint:      "#3A1A0C"  # var(--brand-orange-tint) — bordas de alerts

  # MARCA — Fatax Cream (tinta)
  brand-cream:        "#F5EBDE"      # var(--brand-cream)
  brand-cream-dark:   "#C9C0B4"      # var(--brand-cream-dark)
  brand-cream-soft:   "rgba(245,235,222,0.08)" # var(--brand-cream-soft)

  # MARCA — Fatax Black (estrutura)
  brand-black:        "#0A0A0A"      # var(--brand-black)

  # Pares de contraste obrigatórios — não invente alternativas
  on-orange:  "#FFFFFF"   # var(--on-orange) — texto SEMPRE branco sobre laranja
  on-cream:   "#0A0A0A"   # var(--on-cream)  — texto SEMPRE preto sobre creme

  # Semânticos — calibrados para coexistir com a marca, nunca disputar
  success:      "#3FB76E"
  success-soft: "#0F2A1C"
  warning:      "#F2B33B"
  warning-soft: "#2E2110"
  danger:       "#E5484D"
  danger-soft:  "#2E1214"
  info:         "#5B8DEF"
  info-soft:    "#101A2E"

# ─────────────────────────────────────────────────────────────────────────
# TIPOGRAFIA
# Três famílias, três funções: display, corpo, mono. Sem exceções.
# ─────────────────────────────────────────────────────────────────────────

typography:
  families:
    display:    "Syne, 'Inter', system-ui, sans-serif"          # var(--font-display) — h1, h2, hero
    sans:       "'Inter', system-ui, sans-serif"                # var(--font-sans) — corpo, UI, default
    serif:      "'Inter', system-ui, sans-serif"                # var(--font-serif) — italic editorial (alias Inter italic)
    mono:       "'JetBrains Mono', ui-monospace, monospace"     # var(--font-mono) — números, código, IDs

  weights:
    syne:           [500, 600, 700, 800]
    inter:          [400, 500, 600, 700]   # + italics 400/500/600
    jetbrains-mono: [400, 500, 600, 700]

  line-height:
    title: 1.2   # var(--lh-title) — todos os títulos h1–h6, display, hero
    body:  1.5   # var(--lh-body)  — parágrafos, lede, kicker, listas, captions

  # Escala — em px. Aplicada via classes utilitárias e estilos componenciais.
  scale:
    display:    { size: 80px, weight: 700, family: display, tracking: "-0.035em" }
    h1:         { size: 42px, weight: 700, family: display, tracking: "-0.028em" }
    h2:         { size: 32px, weight: 700, family: display, tracking: "-0.024em" }
    h3:         { size: 22px, weight: 600, family: display, tracking: "-0.018em" }
    h4:         { size: 18px, weight: 600, family: display, tracking: "-0.014em" }
    h5:         { size: 14px, weight: 400, family: serif,   style: italic        }
    lede:       { size: 17px, weight: 400, family: sans,    line-height: 1.5     }
    body:       { size: 15px, weight: 400, family: sans,    line-height: 1.5     }
    body-sm:    { size: 13px, weight: 500, family: sans                          }
    caption:    { size: 12px, weight: 500, family: sans                          }
    label-caps: { size: 12px, weight: 700, family: sans, tracking: "0.14em", transform: uppercase }
    eyebrow:    { size: 11px, weight: 700, family: sans, tracking: "0.16em", transform: uppercase, color: brand-orange }
    mono:       { size: 12px, weight: 500, family: mono                          }
    mono-big:   { size: 40px, weight: 700, family: mono, tracking: "-0.02em"     }

  text-wrap:
    titles: balance  # h1–h6 — distribui palavras igualmente entre linhas
    body:   pretty   # p, li, dd, blockquote, figcaption, .kicker, .lede

  font-feature-settings: "'cv11', 'ss01', 'ss03'"  # Inter alternates desenhados pra UI

# ─────────────────────────────────────────────────────────────────────────
# SPACING — escala base-4 (cada step é múltiplo de 4px)
# ─────────────────────────────────────────────────────────────────────────

spacing:
  "2xs":  "2px"    # var(--s-2xs)
  xs:     "4px"    # var(--s-xs)
  sm:     "8px"    # var(--s-sm)
  md:     "12px"   # var(--s-md)
  lg:     "16px"   # var(--s-lg)
  xl:     "24px"   # var(--s-xl)
  "2xl":  "32px"   # var(--s-2xl)
  "3xl":  "48px"   # var(--s-3xl)
  "4xl":  "64px"   # var(--s-4xl)
  "5xl":  "96px"   # var(--s-5xl)
  "6xl":  "128px"  # var(--s-6xl)

# ─────────────────────────────────────────────────────────────────────────
# RADIUS
# ─────────────────────────────────────────────────────────────────────────

radius:
  xs:   "4px"      # var(--r-xs) — badges, indicadores, swatch chips
  sm:   "8px"      # var(--r-sm) — botões, inputs, linhas de tabela
  md:   "12px"    # var(--r-md) — cards, spec-tables, painéis
  lg:   "16px"    # var(--r-lg) — modais, drawers
  xl:   "24px"    # var(--r-xl) — brand-plates, hero containers
  full: "9999px" # var(--r-full) — avatares, pills, indicadores circulares

# ─────────────────────────────────────────────────────────────────────────
# MOTION — durations + easings unificados
# ─────────────────────────────────────────────────────────────────────────

motion:
  ease-out:         "cubic-bezier(0.16, 1, 0.3, 1)"   # var(--ease-out) — entrada, expand
  ease-std:         "cubic-bezier(0.4, 0, 0.2, 1)"    # var(--ease-std) — standard material
  ease-in:          "cubic-bezier(0.7, 0, 0.84, 0)"   # var(--ease-in)  — exit, dismiss
  dur-fast:         "120ms"                           # var(--dur-fast) — hover, focus, swap
  dur-base:         "200ms"                           # var(--dur-base) — layout, sidebar, drawer
  dur-slow:         "320ms"                           # var(--dur-slow) — page-level
  dur-deliberate:   "560ms"                           # var(--dur-deliberate) — hero reveal, brand morph, KPI count

# ─────────────────────────────────────────────────────────────────────────
# LAYOUT — grid, breakpoints, containers
# ─────────────────────────────────────────────────────────────────────────

layout:
  sidebar-w:           "280px"  # var(--sidebar-w) — sidebar expandido
  sidebar-w-collapsed: "72px"   # var(--sidebar-w-collapsed) — sidebar recolhido (icons-only)
  content-max:         "1080px" # var(--content-max) — largura máxima de documentação
  pad-x:               "80px"   # var(--pad-x) — padding lateral de páginas (32px ≤1024)
  topbar-h:            "48px"   # altura padrão de topbar interno
  header-h:            "64px"   # altura padrão de header de produto

breakpoints:
  mobile:  "≤ 640px"
  tablet:  "641–1023px"
  desktop: "1024–1439px"
  wide:    "≥ 1440px"

z-index:
  z-base:     0
  z-sticky:   10     # topbar, header fixo
  z-dropdown: 100    # menus, autocomplete, tooltip flyout do sidebar
  z-overlay:  500    # modal backdrop
  z-modal:    501    # modal content
  z-toast:    1000   # notificações
  z-tooltip:  2000   # sempre por cima

max-widths:
  text-long:    "680px"  # ~70 caracteres por linha
  documentation: "1080px"
  dashboard:    "1280px"
  hero:         "1440px"
  full-bleed:   "100vw"

# ─────────────────────────────────────────────────────────────────────────
# COMPONENTES — tokens declarativos. Implementação detalhada em style.css.
# Cada componente referencia tokens de cor/spacing/radius/typography acima.
# ─────────────────────────────────────────────────────────────────────────

components:

  # ── Botões ─────────────────────────────────────────────
  # Regras inegociáveis: white-space:nowrap, texto branco sobre laranja,
  # 1 primary por tela. Altura 40px, ghost 36px, lg 48px, sm 32px.
  button:
    base:
      height: 40px
      padding: "0 18px"
      radius: "{radius.sm}"
      font: "{typography.scale.body-sm}"
      font-weight: 700
      white-space: nowrap
      transition: "background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast)"
    primary:
      bg: "{colors.brand-orange}"
      text: "{colors.on-orange}"    # SEMPRE #FFFFFF
      hover-bg: "{colors.brand-orange-hover}"
      pressed-bg: "{colors.brand-orange-pressed}"
    secondary:
      bg: "{colors.surface-raised}"
      text: "{colors.brand-cream}"
      border: "{colors.border}"
      hover-bg: "{colors.border}"
    ghost:
      bg: transparent
      text: "{colors.text-secondary}"
      height: 36px
      padding: "0 12px"
      hover-bg: "{colors.surface-raised}"
      hover-text: "{colors.brand-cream}"
    outline:
      bg: transparent
      text: "{colors.brand-cream}"
      border: "{colors.brand-cream}"
      hover-bg: "{colors.brand-cream}"
      hover-text: "{colors.on-cream}"
    danger:
      bg: "{colors.danger}"
      text: "#FFFFFF"
    disabled:
      bg: "{colors.surface-raised}"
      text: "{colors.text-disabled}"
      border: "{colors.border-soft}"

  # ── Inputs ─────────────────────────────────────────────
  input-text:
    bg: "{colors.surface-sunken}"
    text: "{colors.brand-cream}"
    border: "{colors.border}"
    placeholder: "{colors.text-muted}"
    radius: "{radius.sm}"
    height: 40px
    padding: "0 14px"
    focus-border: "{colors.brand-orange}"   # 1px sólido, sem glow

  # ── Card ───────────────────────────────────────────────
  card:
    bg: "{colors.surface}"
    text: "{colors.brand-cream}"
    border: "{colors.border-soft}"
    radius: "{radius.md}"
    padding: "{spacing.xl}"
    # NUNCA sombra — elevação por contraste de superfície

  # ── Badge / Pill ───────────────────────────────────────
  pill:
    height: 22px
    padding: "0 8px"
    radius: "{radius.xs}"
    font: "{typography.scale.label-caps}"
    variants:
      neutral: { bg: surface-raised, text: text-secondary, border: border-soft }
      orange:  { bg: brand-orange-soft, text: brand-orange }
      cream:   { bg: brand-cream-soft, text: brand-cream }
      success: { bg: success-soft, text: success }
      warning: { bg: warning-soft, text: warning }
      danger:  { bg: danger-soft, text: danger }
      info:    { bg: info-soft, text: info }

  # ── Tabela ─────────────────────────────────────────────
  spec-table:
    header:
      bg: "{colors.surface-sunken}"
      text: "{colors.text-secondary}"
      font: "{typography.scale.h5}"   # Inter italic 14px
      padding: "12px 16px"
      border-bottom: "{colors.border-soft}"
    cell:
      bg: "{colors.surface}"
      text: "{colors.brand-cream}"
      font: "{typography.scale.body-sm}"
      padding: "14px 16px"
      hover-bg: "{colors.surface-raised}"
    mono-cell:
      family: "{typography.families.mono}"
      color: "{colors.text-secondary}"
      size: 12px
    token-cell:
      color: "{colors.brand-orange}"
      family: "{typography.families.mono}"
      weight: 600

  # ── Alert / Stub banner ───────────────────────────────
  alert:
    radius: "{radius.md}"
    padding: "16px 24px"
    variants:
      info:    { bg: info-soft, border: "border-soft", text: brand-cream }
      success: { bg: success-soft, border: "border-soft", text: brand-cream }
      warning: { bg: warning-soft, border: "border-soft", text: brand-cream }
      danger:  { bg: danger-soft, border: "border-soft", text: brand-cream }
      brand:   { bg: brand-orange-soft, border: brand-orange-tint, text: brand-cream }

  # ── Modal ──────────────────────────────────────────────
  modal:
    bg: "{colors.surface}"
    text: "{colors.brand-cream}"
    radius: "{radius.lg}"
    padding: "28px"
    backdrop: "{colors.surface-overlay}"

  # ── Topbar (dentro do .main) ───────────────────────────
  topbar:
    height: 48px
    bg: "{colors.background}"
    border-bottom: "{colors.border-soft}"
    text: "{colors.text-muted}"
    font: "{typography.scale.body-sm}"
    blur: "8px backdrop-filter"
    sticky: true

  # ── Sidebar ────────────────────────────────────────────
  # DOIS ESTADOS canônicos. Recolhível em todo sistema Fatax.
  sidebar:
    bg: "{colors.surface-sunken}"
    border-right: "{colors.border-soft}"
    width:
      expanded:  "{layout.sidebar-w}"            # 280px
      collapsed: "{layout.sidebar-w-collapsed}"   # 72px
    persistence: "localStorage['fatax.sidebar.collapsed']"  # "0" | "1"
    toggle-key:  "."   # tecla "·" expande/recolhe globalmente
    search-key:  "⌘K"  # Ctrl/Cmd+K foca busca (expande sidebar se preciso)
    brand:
      height: 24px
      morph:  "translate-x both groups; FATA fades, X slides left"
    powered-by-lockup: required   # rodapé OBRIGATÓRIO em qualquer sistema

  # ── Pager (prev/next entre páginas) ────────────────────
  pager:
    bg: "{colors.surface}"
    border: "{colors.border-soft}"
    hover-border: "{colors.border-strong}"
    radius: "{radius.md}"
    padding: "16px 24px"

  # ── Search dropdown ────────────────────────────────────
  search:
    field:
      height: 32px
      bg: "{colors.surface}"
      border: "{colors.border}"
      radius: "{radius.sm}"
      focus-bg: "{colors.surface-raised}"
    results:
      bg: "{colors.surface-raised}"
      border: "{colors.border}"
      radius: "{radius.sm}"
      shadow: "0 12px 40px rgba(0,0,0,0.55)"
      max-height: 360px
    highlight-color: "{colors.brand-orange}"
    keyboard: "ArrowUp/Down navega, Enter abre, Esc fecha"

  # ── Powered by Fatax Growth — lockup oficial ───────────
  powered-by-lockup:
    placement: "rodapé do menu lateral · obrigatório em sistemas powered-by-Fatax"
    components:
      mark: { size: "26px", color: "{colors.brand-cream} + {colors.brand-orange}" }
      eyebrow: { text: "Powered by", font: "Inter italic 11px", color: "{colors.text-muted}" }
      title:   { text: "Fatax Growth", font: "Inter 700 13px", color: "{colors.brand-cream}", italic-orange: "Growth" }
    gap: "{spacing.md}"        # entre mark e bloco de texto
    padding: "16px 12px"
    border-top: "1px solid {colors.border-soft}"
    collapsed: { mark-only: true, tooltip: "Powered by Fatax Growth" }
---

# FATAX — DESIGN SYSTEM

> **Disciplined Energy.** Sistema de design para empresários que medem o sucesso pelo que o produto *entrega*, não pelo que *parece*. Bicolor por princípio, denso por escolha, institucional por dever.

Este documento é a **constituição visual** da Fatax. O brandbook interativo em `brandbook/index.html` é a versão navegável. Esta versão `.md` é o **machine-readable spec** — `colors`, `typography`, `components` no frontmatter YAML são a fonte de verdade para qualquer ferramenta que precise consumir os tokens (gerador de Tailwind config, plugin de Figma, lint de design, etc).

---

## 1 · Princípios

Quatro tensões intencionais sustentam o sistema. Tudo o que segue deriva delas.

1. **Bicolor por princípio.** Toda peça precisa exibir creme + laranja (ou os dois juntos). Sem isso, a marca dissolve no preto. O sistema é arquitetonicamente preto, mas a *identidade* é creme + laranja.
2. **Um único acento.** O laranja é o motor de TODA interação primária. Uma cor de acento por tela. Multiplicar dissolve foco e valor.
3. **Densidade respeita o tempo.** O usuário está trabalhando, não passeando. Padding compacto, tabelas densas, 15px no corpo. Espaço onde tem hierarquia, denso onde tem dado.
4. **Preto, não cinza escuro.** `#0A0A0A`, não `#000` puro. Base profunda mas com hierarquia de elevação possível.

---

## 2 · Marca (Brand)

### 2.1 Identidade verbal — "Fatax Growth"

Marca-mãe é "Fatax". O sufixo "Growth" só aparece no lockup endossante "Powered by Fatax Growth" (ver §6) e em contextos editoriais formais. Em UI cotidiana use apenas "Fatax".

### 2.2 Arquétipo

**Mix Ruler 55 · Sage 30 · Caregiver 15.** Não é um arquétipo único — é uma combinação calibrada:

- **Ruler 55% — O Operador.** Controle, estrutura, responsabilidade. A Fatax devolve o controle ao empresário ao tirar a fragmentação do meio. É o arquétipo dominante — puxa a estética (preto, denso, institucional) e a postura (não pede licença, executa).
- **Sage 30% — O Conselheiro.** Sabedoria aplicada, método codificado, ensina enquanto entrega. Aparece na voz técnica do produto e no tom didat-mas-curto da documentação.
- **Caregiver 15% — O Braço Direito.** Cuidado operacional. Não toma decisão pelo empresário, mas garante que as engrenagens girem. É a tonalidade humana — evita o gelo total que Ruler+Sage produziriam sozinhos.

Personalidade resultante: *"um **consigliere** que entende o negócio melhor que o dono — sem nunca tirar a coroa."* O cliente é sempre o herói; a Fatax é a infraestrutura por trás.

Ver `brandbook/04-archetypes.html` para o detalhamento + filtros narrativos (cenário → resposta Fatax → o que Fatax nunca faz).

### 2.3 Voz & tom

- **Direta.** Verbos curtos. "Faça", "Pague", "Renove", "Veja". Não "Você poderia eventualmente considerar...".
- **Institucional na narrativa.** Em marketing e onboarding, tom de declaração ("A Fatax cuida da operação que ninguém quer cuidar.").
- **Técnico no produto.** Em microcopy, factual. "3 vendas pendentes." Não "Você tem 3 vendinhas esperando! 🎉".
- **Português brasileiro.** Sem anglicismos desnecessários. "Pago" não "Paid". "Vencido" não "Overdue". Exceções: termos técnicos consagrados (dashboard, lead).
- **Sem hype.** Sem "incrível", "revolucionário", "transforme". A marca convence pelo resultado.

### 2.4 Logo

#### Anatomia

O logo Fatax é um wordmark de 4 letras + 1 símbolo X integrado. **Viewbox: 626 × 84.**

- **Wordmark "FATA"** — 4 paths (F, A, T, A), sans condensado, peso black.
- **Symbol X** — 2 fitas diagonais que se cruzam. Uma fita é a "principal" (cor de marca), outra é o "acento" (geralmente laranja, aparece nas pontas e na interseção central).

O X compõe a última letra da palavra. Nunca é destacado por gap. Nunca aparece com cor uniforme — sempre duas fitas em cores diferentes.

#### Variantes oficiais (3, escolhidas pelo fundo)

| Fundo            | Arquivo                                | FATA  | X — fita principal | X — fita acento |
| ---------------- | -------------------------------------- | ----- | ------------------ | --------------- |
| Escuro (default) | `logo-fatax-wordmark-cream.svg`        | Creme | Creme              | Laranja         |
| Claro / creme    | `logo-fatax-wordmark-black.svg`        | Preto | Laranja            | Preto           |
| Laranja Fatax    | `logo-fatax-wordmark-onorange.svg`     | Creme | Creme              | Preto           |

Para o **mark solo** (só o X), mesma matriz de cores em arquivos `logo-fatax-mark-{cream,black,onorange}.svg`. O mono em `logo-fatax-mono.svg` herda `currentColor` — usar APENAS quando uma cor é restrição física (gravação, embossing).

#### Espaço livre & tamanho mínimo

| Aplicação                  | Altura mínima | Observação           |
| -------------------------- | ------------- | -------------------- |
| Wordmark · print           | ≥ 16 mm       | cartão de visita     |
| Wordmark · digital         | ≥ 24 px       | header, e-mail       |
| Mark X · favicon           | ≥ 16 px       | manter as duas cores |
| Mark X · app icon          | ≥ 48 px       | iOS/Android          |

Clearspace = **1× a altura do X** em todas as direções. Nada (texto, ícone, borda, imagem) entra nessa zona.

#### Misuse — proibido

Rotacionar, esticar (scaleY/scaleX), trocar cor por hue-rotate, aplicar gradiente, sombra ou efeitos, usar versão errada para o fundo (cream em fundo claro etc).

### 2.5 Lockup oficial — "Powered by Fatax Growth"

**Há UM ÚNICO lockup canônico:** a assinatura *Powered by Fatax Growth* — mark à esquerda, duas linhas de texto à direita. É um **endossante**, não a marca-mãe — usado quando a Fatax é a plataforma por trás de um produto ou parceiro.

Anatomia:

- **A · Mark X** — 26 px, cream + orange (ou cream-only sobre laranja). Sempre à esquerda.
- **B · "Powered by"** — Inter italic 11 px, cor `text-muted`. Eyebrow.
- **C · "Fatax Growth"** — Inter bold 13 px, cream. "Growth" em italic laranja (única emoção permitida).
- **D · Gap interno:** 12 px. **Padding:** 16 × 12 px. **Top:** 1 px border separando da nav acima.
- **E · Posição:** rodapé do menu lateral — sempre. Nunca no header, nunca solto.

**Regra:** todo sistema, painel, dashboard ou produto interno que use este design system **DEVE** incluir o lockup no rodapé do sidebar. É institucional, não decorativo. Quando o sidebar está recolhido, mostre apenas o mark com tooltip "Powered by Fatax Growth".

---

## 3 · Cores

A paleta vive em **três camadas que nunca se misturam**.

### 3.1 Estrutura — preto + neutros warm-gray

| Token             | Hex       | Uso                                                 |
| ----------------- | --------- | --------------------------------------------------- |
| `background`      | `#0A0A0A` | Fundo de toda página                                |
| `surface`         | `#141414` | Cards, table rows, container padrão                 |
| `surface-raised`  | `#1C1C1C` | Hover, active row, modal, search results            |
| `surface-sunken`  | `#050506` | Sidebar, table header, áreas "rebaixadas"           |
| `border`          | `#262626` | Padrão de inputs e cards definidos                  |
| `border-soft`     | `#1A1A1A` | Divisões discretas                                  |
| `border-strong`   | `#363636` | Hover de cards/botões                               |

### 3.2 Texto

Quatro níveis. **Não invente um quinto.**

| Token            | Hex       | Uso                                |
| ---------------- | --------- | ---------------------------------- |
| `text-primary`   | `#F5EBDE` | Manchetes, valores (= brand-cream) |
| `text-secondary` | `#9C9489` | Labels, descrições, metadata       |
| `text-muted`     | `#6B655D` | Timestamps, helper text            |
| `text-disabled`  | `#3A3631` | Estados inativos                   |

### 3.3 Marca

| Token                     | Hex       | Uso                                                           |
| ------------------------- | --------- | ------------------------------------------------------------- |
| `brand-orange`            | `#FF4800` | **Motor único** de interação primária                         |
| `brand-orange-hover`      | `#FF6A2E` | Hover de botão primário                                       |
| `brand-orange-pressed`    | `#D63D00` | Estado pressed                                                |
| `brand-orange-soft`       | `#2E1408` | Alerts, badges, fills discretos                               |
| `brand-orange-tint`       | `#3A1A0C` | Bordas de alerts brand                                        |
| `brand-cream`             | `#F5EBDE` | Wordmark, manchetes, texto primário                           |
| `brand-cream-dark`        | `#C9C0B4` | Versão dimmed para hierarquia secundária                      |
| `brand-cream-soft`        | `rgba(245,235,222,0.08)` | Backgrounds translúcidos        |
| `brand-black`             | `#0A0A0A` | Estrutura                                                     |

### 3.4 Pares de contraste obrigatórios

- **`on-orange: #FFFFFF`** — texto sobre laranja é SEMPRE branco. Preto+laranja passa contraste (6.42:1) mas dissolve a marca e apaga o CTA. Branco+laranja é assinatura visual.
- **`on-cream: #0A0A0A`** — texto sobre creme é preto.
- **Sobre preto: `#F5EBDE`** (creme) — nunca branco puro, que parece clínico.

### 3.5 Semânticos

Calibrados pra **coexistir** com o laranja sem disputar atenção. Cada um tem `*-soft` para fundos.

| Token     | Hex       | Token soft     | Hex soft  |
| --------- | --------- | -------------- | --------- |
| `success` | `#3FB76E` | `success-soft` | `#0F2A1C` |
| `warning` | `#F2B33B` | `warning-soft` | `#2E2110` |
| `danger`  | `#E5484D` | `danger-soft`  | `#2E1214` |
| `info`    | `#5B8DEF` | `info-soft`    | `#101A2E` |

---

## 4 · Tipografia

**Três famílias, três funções:** Syne (display), Inter (corpo + italic editorial), JetBrains Mono (números + código). Sem exceções.

### 4.1 Famílias

| Família             | Função                                      | Token                |
| ------------------- | ------------------------------------------- | -------------------- |
| **Syne**            | Títulos display (h1, h2, hero, pager title) | `var(--font-display)` |
| **Inter**           | Texto corrido, UI, body                     | `var(--font-sans)`    |
| **Inter (italic)**  | Eyebrow, captions editorial, "italic editorial" | `var(--font-serif)` |
| **JetBrains Mono**  | Números, IDs, código, valores em tabela     | `var(--font-mono)`   |

Carregadas via Google Fonts em `style.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

### 4.2 Line-height — duas categorias, sem exceções

| Categoria      | Valor | Token              | Aplicação                                 |
| -------------- | ----- | ------------------ | ----------------------------------------- |
| Títulos        | `1.2` | `var(--lh-title)`  | h1–h6, display, hero, manifesto, pager   |
| Texto corrido  | `1.5` | `var(--lh-body)`   | parágrafos, lede, kicker, listas         |

```css
:root { --lh-title: 1.2; --lh-body: 1.5; }
h1, h2, h3, h4, h5, h6 { line-height: var(--lh-title); text-wrap: balance; }
p, li, dd, blockquote, figcaption, .kicker, .lede { text-wrap: pretty; }
body { line-height: var(--lh-body); }
```

### 4.3 Escala tipográfica

| Estilo       | Família     | Tamanho | Peso | Tracking      | Uso                              |
| ------------ | ----------- | ------- | ---- | ------------- | -------------------------------- |
| `display`    | Syne        | 80 px   | 700  | −0.035em      | Section header hero              |
| `h1`         | Syne        | 42 px   | 700  | −0.028em      | Block heading principal          |
| `h2`         | Syne        | 32 px   | 700  | −0.024em      | Section heading                  |
| `h3`         | Syne        | 22 px   | 600  | −0.018em      | Subsection                       |
| `h4`         | Syne        | 18 px   | 600  | −0.014em      | Card title                       |
| `h5/italic`  | Inter italic | 14 px  | 400  | 0             | Eyebrow editorial, card label    |
| `lede`       | Inter       | 17 px   | 400  | 0             | Primeiro parágrafo, kicker       |
| `body`       | Inter       | 15 px   | 400  | 0             | Texto corrido padrão             |
| `body-sm`    | Inter       | 13 px   | 500  | 0             | Botões, nav, badges              |
| `caption`    | Inter       | 12 px   | 500  | 0             | Captions, helper text            |
| `label-caps` | Inter       | 12 px   | 700  | 0.14em        | Section labels, eyebrow caps     |
| `eyebrow`    | Inter       | 11 px   | 700  | 0.16em        | Page eyebrow (orange)            |
| `mono`       | JetBrains   | 12 px   | 500  | 0             | Spec values, IDs, tokens         |
| `mono-big`   | JetBrains   | 40 px   | 700  | −0.02em       | Stat numbers, big metrics        |

### 4.4 Viúvas (orphans/widows) — proibidas

Nunca deixe uma palavra solitária no fim de um título ou parágrafo.

- **Títulos:** `text-wrap: balance` — distribui igualmente.
- **Corpo:** `text-wrap: pretty` — evita órfãs no fim, suaviza last-line raggedness.
- **Manual:** `&nbsp;` entre penúltima e última palavra (`Crescer com&nbsp;método`).

### 4.5 Casos especiais

- **Display gigante (≥120 px):** line-height 1.0–1.1 aceitável (single-line marketing).
- **`label-caps`:** line-height 1.3 aceitável (texto curto em maiúscula).
- **Mono em tabela densa:** line-height 1.4 aceitável (números sem descender).

Toda exceção deve estar **documentada inline** no CSS com motivo.

---

## 5 · Iconografia

**Sistema híbrido com regra clara.** Duas fontes de ícones, mesma anatomia, contextos diferentes:

1. **Sprite custom Fatax** (`<symbol id="i-*">` definido no topo de `brandbook/shared/sidebar.html`) — desenhados manualmente em estilo Feather. Cobre **navegação, brand e utility críticos** (overview, mission, strategy, archetypes, manifesto, voice, moodboard, logo, color, typography, iconography, imagery, illustrations, motion, audio, tokens, layout, components, inputs, data, editorial, mockups, social, accessibility, external, search, collapse). Uso: `<svg><use href="#i-overview"/></svg>`.
2. **Lucide inline** (https://lucide.dev) — fonte secundária para todos os outros contextos: botões de UI, alerts, tooltips, KPIs, datepickers, estados vazios, microcopy. Inline no markup, não como dependency. Sempre via `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">…</svg>`.

**Regra:** se o ícone representa uma seção de produto, navegação, ou um conceito Fatax recorrente → sprite. Se é uma indicação pontual de UI (close, plus, check, upload, alert, etc) → Lucide inline. Quando um ícone Lucide vira recorrente, promova-o ao sprite.

### 5.1 Especificação (única para ambos)

| Atributo            | Valor                                                     |
| ------------------- | --------------------------------------------------------- |
| viewBox             | `0 0 24 24`                                               |
| stroke              | `currentColor`                                            |
| stroke-width        | `1.75` (UI densa, sidebar) · `2` (botões) · `2.4` (CTA grande) |
| stroke-linecap      | `round`                                                   |
| stroke-linejoin     | `round`                                                   |
| fill                | `none` (exceto pontos sólidos, ex. crosshair, dots)       |

### 5.2 Cores de ícone

- Padrão: `var(--text-muted)` (#6B655D).
- Hover: `var(--brand-cream)`.
- Active / selected: `var(--brand-orange)`.
- Sempre herda via `currentColor` — nunca hard-code hex no path.

### 5.3 Tamanhos canônicos

| Contexto                  | Tamanho |
| ------------------------- | ------- |
| Sidebar nav, botões small | 14 px   |
| UI default, botão padrão  | 16 px   |
| Inline com h3, botão lg   | 18–20 px |
| Hero, empty/error state   | 20–24 px |

### 5.4 Proibições

- Não misture mais de **duas** fontes (sprite + Lucide). Nada de Material, Heroicons, Feather "oficial", Phosphor.
- Não use ícones **filled** (sólidos) em UI — stroke sempre.
- Não use ícones coloridos brilhantes — cor vem do contexto via `currentColor`.
- Não use emoji decorativo no lugar de ícone funcional.

---

## 6 · Imagens (Imagery)

A imagem Fatax é documental-premium: mostra operação real, não cenário genérico.

- Pessoas reais em ambientes reais: escritório, fábrica, loja, reunião, operação comercial.
- Tratamento warm grade leve, saturação reduzida, contraste médio e sem black-crush.
- Produto sempre em frame realista de browser, device, e-mail ou documento.
- Evitar texto embutido na imagem; texto deve ser HTML/design system sempre que possível.
- Texto sobre imagem requer overlay sólido ou faixa escura com contraste AA.
- Nunca usar stock photo de equipe sorrindo para laptop, 3D flutuante ou render de tela sem contexto.

---

## 7 · Motion

**Quatro tokens motion** — duas durações + dois easings. Usar APENAS estes.

| Token        | Valor                                     | Uso                                  |
| ------------ | ----------------------------------------- | ------------------------------------ |
| `dur-fast`   | `120ms`                                   | hover, focus, swap, fade             |
| `dur-base`   | `200ms`                                   | layout, sidebar collapse, drawer     |
| `dur-slow`   | `320ms`                                   | page-level, hero entrance            |
| `ease-out`   | `cubic-bezier(0.16, 1, 0.3, 1)`           | entrada, expand (acelera depois)     |
| `ease-std`   | `cubic-bezier(0.4, 0, 0.2, 1)`            | standard material — default          |

### 7.1 Regras

- **Não invente curvas** — `ease-in`, `ease-in-out`, `linear` são proibidos exceto em casos cravados (loading spinner).
- **Hover é sempre `dur-fast`**. Hover de 200ms+ parece lento.
- **Mudanças de layout** (sidebar, drawer) é `dur-base` com `ease-std`.
- **`prefers-reduced-motion`:** desligar todas as transições.

---

## 8 · Audio

Áudio Fatax é opcional, curto e funcional. Som nunca é decoração.

- Sound logo: 1.5–3s, percussivo, limpo, não-melodioso, com terminação aberta.
- UI sounds: desligados por padrão; usar apenas para confirmação, erro, notificação solicitada ou acessibilidade.
- Voice-over: voz brasileira adulta, ritmo médio, tom assertivo e calmo.
- Não usar jingle, locução promocional acelerada, trilha épica ou feedback sonoro em hover/clique trivial.

---

## 9 · Layout & Grid

### 9.1 Grid

- **Desktop (≥1024 px):** 12 colunas, gutter 16 px, max-width 1080 px (docs) ou 1280 px (dashboard).
- **Tablet (641–1023 px):** 8 colunas, gutter 12 px, padding 24 px.
- **Mobile (≤640 px):** 4 colunas, gutter 8 px, padding 16 px.

### 9.2 App shell

```
.app { display: grid; grid-template-columns: var(--sidebar-w) 1fr; }
[data-sidebar="collapsed"] .app { grid-template-columns: var(--sidebar-w-collapsed) 1fr; }
```

Transição `200ms ease-std` em `grid-template-columns`. Suprimida no primeiro paint via classe `sidebar-no-transition` para evitar flash.

### 9.3 Padding & breathing

| Contexto                              | Token                                                 | Valor          |
| ------------------------------------- | ----------------------------------------------------- | -------------- |
| Padding lateral da página             | `--pad-x`                                             | `80px` (32px ≤1024) |
| Section-header vertical               | `var(--s-4xl) / var(--s-3xl)`                         | 64 / 48        |
| Content vertical (topo / base)        | `var(--s-4xl) / var(--s-6xl)`                         | 64 / 128       |
| Gap entre blocos                      | `var(--s-4xl)`                                        | 64 px          |
| Label ↔ body dentro do bloco          | `var(--s-4xl)`                                        | 64 px          |
| Texto + heading intra-bloco           | `var(--s-md)` a `var(--s-xl)`                         | 12–24 px       |

**Regra prática:** em dúvida, **respire mais**. Fatax é institucional, não denso na narrativa.

### 9.4 Z-index scale

```
z-base:     0
z-sticky:  10    # topbar, header fixo
z-dropdown: 100  # menus, autocomplete, tooltip flyout
z-overlay:  500  # modal backdrop
z-modal:    501  # modal content
z-toast:   1000  # notificações
z-tooltip: 2000  # sempre por cima
```

---

## 10 · Sidebar (recolhível)

**Componente crítico** — recolhível em todo sistema Fatax. Tem dois estados canônicos.

### 10.1 Estados

| Estado     | Largura | Comportamento                                                                |
| ---------- | ------- | ---------------------------------------------------------------------------- |
| Expandido  | 280 px  | Wordmark completo, busca com placeholder + ⌘K, nav com ícone+label+meta, footer lockup completo |
| Recolhido  | 72 px   | Só o mark X, busca vira ícone (click expande+foca), nav só ícone (tooltip no hover), footer só o mark (tooltip) |

### 10.2 Transição

- **Width:** `200ms ease-std` em `.sidebar` e em `grid-template-columns` do `.app`.
- **Brand morph:** o wordmark é inline SVG com dois grupos (`.b-fata` e `.b-x`). No colapso, ambos translam −487 user units (viewBox); o X aterrissa em x=0 (visível na janela de 40 px), o FATA sai pela esquerda fadeando. A "F" some primeiro porque é a mais à esquerda — efeito "X correndo pra esquerda, FATA sumindo da esquerda pra direita atrás dele". Reversível.
- **Brand container:** width transiciona de 179 px → 40 px com `overflow: hidden`. O SVG interno é `width: 179px; max-width: none` (defeat the global `img,svg { max-width: 100% }` reset).

### 10.3 Toggle

- **Botão chevron** no topo do header, à direita do brand quando expandido.
- **No estado recolhido:** chevron é posicionado absoluto, centralizado sobre o brand (`top: calc(50% − 12px); left: 50%; transform: translate(−50%, −50%) rotate(180deg)`), invisível por padrão (`opacity: 0`).
- **Hover no header:** cross-fade — brand vai a `opacity: 0`, chevron vai a `opacity: 1` (usa `var(--dur-fast)`).
- **Atalhos de teclado:** `.` (ponto) alterna; `⌘K` / `Ctrl+K` foca a busca (expande primeiro se preciso).

### 10.4 Persistência

- `localStorage["fatax.sidebar.collapsed"]` armazena `"0"` ou `"1"`.
- Aplicado **antes do primeiro paint** via classe `sidebar-no-transition` no `<html>` para evitar flash de troca.

### 10.5 Tooltip flyout (estado recolhido)

Para cada nav item, `data-tooltip="Label"`. No hover, pseudo-element `::after` renderiza:

- `position: absolute; left: calc(100% + 14px); top: 50%; transform: translateY(−50%) translateX(−4px)`
- `bg: surface-raised; color: brand-cream; border: 1px solid border; padding: 6px 10px; radius: r-xs`
- Fade `dur-fast` + slide 4 px da esquerda.
- `box-shadow: 0 6px 20px rgba(0,0,0,0.5)`.
- `z-index: 100`.

O `.sidebar` precisa de `overflow: visible` e o scroll vive em `.sidebar-scroll` interno — caso contrário tooltips são clipados.

### 10.6 Lockup obrigatório no rodapé

**SEMPRE incluir** o "Powered by Fatax Growth" (§2.5) no rodapé do menu. Nunca esconder, nunca trocar texto, nunca duplicar wordmark em header se já há lockup em footer.

---

## 11 · Componentes

### 11.1 Botão — regras inegociáveis

1. **`white-space: nowrap` SEMPRE.** Botões não quebram linha. Se não cabe, reescreva o copy.
2. **Texto branco (`#FFFFFF`) sobre laranja SEMPRE.** Preto sobre laranja passa contraste (6.42:1) mas apaga o CTA.
3. **Uma ação primária por tela.**

Hierarquia: `primary` (laranja) · `secondary` (surface-raised) · `ghost` (transparent) · `outline` (border cream) · `danger` (vermelho).

Tamanhos: `sm` 32 px · `default` 40 px · `lg` 48 px. Ghost: 36 px. Padding lateral: 18 px padrão, 12 px ghost, 24 px lg. Radius `sm` (8 px). Weight 700. Tracking 0.

### 11.2 Input

`surface-sunken` + border `border-soft` em repouso. Focus: bg sobe pra `surface`, border vira `brand-orange` (1 px sólido, sem glow). 40 px altura — alinha com botões. Placeholder em `text-muted`. Padding 14 px horizontal.

### 11.3 Card

`surface` + radius `md` (12 px) + padding `xl` (24 px). **Sem sombra** — elevação por contraste de superfície (`surface` → `surface-raised`). Border `border-soft` opcional. Title em `h4` italic.

### 11.4 Pill / Badge

22 px altura · radius `xs` (4 px) · padding 0 8 px · `label-caps`. Variantes neutra · orange · cream · success · warning · danger · info.

### 11.5 Tabela (`.spec-table`)

```css
.spec-table { border: 1px solid var(--border-soft); border-radius: var(--r-md); overflow: hidden; }
.spec-table th { bg: surface-sunken; text: text-secondary; font: Inter italic 14px; padding: 12 16; }
.spec-table td { bg: surface; text: brand-cream; font: Inter 13 500; padding: 14 16; }
.spec-table tr:hover td { bg: surface-raised; }
.spec-table .mono { family: mono; color: text-secondary; size: 12; }
.spec-table .token { color: brand-orange; family: mono; weight: 600; }
```

Header italic é assinatura visual. Linhas hover sutilmente. Última linha sem border-bottom.

### 11.6 Alert

Alertas usam `surface` ou `*-soft`, border semântico e ícone de 20 px no canto esquerdo. Texto principal em cream; detalhes e helper em `text-secondary`. Variante brand usa `brand-orange-soft` + `brand-orange-tint`.

### 11.7 Modal

`surface` + radius `lg` (16 px) + padding 28 px. Overlay `surface-overlay` (preto 85%). Botão primário à direita, secundário à esquerda.

### 11.8 Pager (prev/next)

Grid 2 colunas, gap 12 px, margin-top 48 px, padding-top 32 px, border-top `border-soft`. Cada célula: `surface` + border `border-soft` + radius `md` + padding 16 24. Hover: border vira `border-strong`, bg `surface-raised`. Label em Inter italic 13 px muted ("← Anterior" / "Próximo →"), título em Syne 20 px 600 cream.

### 11.9 Topbar

48 px altura · sticky top 0 · `bg: background` com `backdrop-filter: blur(8px)` · padding `var(--pad-x)`. Conteúdo: crumbs à esquerda (Inter 13 500, separator `text-disabled`), `here` em `text-primary`. Spacer. Slot opcional à direita.

### 11.10 Section header

Padding `var(--s-4xl) var(--pad-x) var(--s-3xl)` · border-bottom `border-soft` · grid 1fr auto · gap 32 · align end.

- **Eyebrow:** Inter 12 700 caps tracked 0.14em em `brand-orange`, com pip 8×8 quadrado.
- **h1:** Syne 80 700 tracking −0.035em cream, max 18ch, balance.
- **.dim:** muted weight 600. **.accent:** brand-orange weight 800. **em:** Inter italic 500.
- **kicker:** Inter 17 400 secondary, max 62ch, pretty. **strong:** cream 600.
- **right:** italic 14 muted. **.big:** Syne 140 800 border-color, tracking −0.04em (número gigante "watermark").

### 11.11 Block

Grid `220px 1fr` · gap 64. Label: `label-caps` em text-secondary com `.num` em Syne 40 700 brand-orange. Body: h2 + p + tabelas/grids.

### 11.12 Manifesto / Quote

`bg: brand-black` + `border-left: 4px solid brand-orange` + padding `s-3xl s-2xl` (48 32). Quote: Syne 44 600 cream, max 22ch, balance. Attribution: Inter italic 15 muted.

### 11.13 Stat

Border `border` + padding `xl` + radius `md` + bg `surface`. Num: mono 40 700 brand-orange. Label: Inter italic 14 secondary. Desc: 13 secondary 1.5.

### 11.14 Do/Don't grid

Grid 2 colunas gap 12. Card border-top 2 px (success ou danger), radius `0 0 md md`, bg `surface`, padding `xl`. Head: Inter italic 18, cor da variante. Li: text-secondary com bullet (• success / ─ danger) à esquerda.

### 11.15 Search

Field: 32 px altura, `surface` + border `border` + radius `sm` + padding 0 10. Focus: bg sobe pra `surface-raised`, border vira `border-strong`. Input transparent, cream, Inter 12 500. Kbd: mono 10, `surface-raised` + border 1 5 px.

Results dropdown: posicionado absoluto abaixo, `surface-raised` + border + radius `sm` + shadow `0 12px 40px rgba(0,0,0,0.55)`, max-height 360, scroll. Cada result: padding 8 10, radius `xs`, ícone 14 + título + section pill à direita. Active/hover: bg `surface`, ícone brand-orange. Match highlight: `<mark>` em brand-orange peso 700.

Empty state: Inter italic 13 muted, "Nada para **{query}**".

### 11.16 Powered-by lockup

Ver §2.5. Componente CSS:

```css
.poweredby { display: flex; align-items: center; gap: s-md; padding: 16 12; border-top: 1px solid border-soft; }
.poweredby:hover { bg: surface; }
.poweredby-mark { width: 26; transition: transform dur-base ease-out; }
.poweredby:hover .poweredby-mark { transform: translateX(-2px) rotate(-4deg); }
.poweredby-eyebrow { font: Inter italic 11 muted; }
.poweredby-title { font: Inter 13 700 cream; }
.poweredby-title em { font: Inter italic, color: brand-orange; weight: 400; margin-left: 2; }
```

Quando sidebar recolhido: oculta texto, centraliza mark (22 px), tooltip flyout idêntico ao dos nav items.

---

## 12 · Data Display

### 12.1 Tabelas

Cabeçalho em italic editorial (Inter italic 14), corpo em Inter 13 500. Números à direita, em mono. Hover linha. Ver §11.5.

### 12.2 Stats

Stat blocks (§11.13) para um número-protagonista. Para múltiplas métricas, grid de stats com gap `md`.

### 12.3 Gráficos

Linhas em `brand-orange` para série principal, `text-muted` para secundárias e semânticos apenas para status. Grid em `border-soft`. Eixos em `text-muted` Inter 11. Sem 3D, sem sombra, sem gradiente e sem paleta inventada. Todo gráfico deve responder a uma decisão: risco, tendência, comparação ou conversão.

---

## 13 · Padrões (Patterns)

### 13.1 Cabeçalho de página (`.section-header`)

Eyebrow + h1 (com .accent + .dim) + kicker à esquerda; número watermark + label à direita. Ver §11.10.

### 13.2 Bloco numerado (`.block`)

Label "01 Anatomy" à esquerda · body à direita (h2 + p + componentes). Para documentação técnica densa.

### 13.3 Spec table (key/value)

Tabela 3–4 colunas: Property · Function · Default · Notes. Última coluna sempre em `mono` muted.

### 13.4 Construction canvas

Container `bg: brand-cream` + radius `md` + padding `s-3xl` + `display: grid; place-items: center; overflow: hidden`. Legend posicionado absoluto top-left em mono 10 caps. Para mostrar logo, anatomy, construções vetoriais — fundo invertido pra contraste máximo.

### 13.5 Variant grid

Grid 3 colunas gap `s-md`. Cada cell: `bg: variant-bg` + min-height 180 + padding `s-2xl` + display grid place-items center. Foot: padding `s-md s-lg` + border-top `border-soft` + bg `surface` + mono 10 caps. Para mostrar componente em múltiplos contextos (fundos, estados).

### 13.6 Misuse grid

Idêntico ao variant grid mas com `border: 1px solid danger-soft` no cell e gradiente diagonal vermelho sobre o stage (`background: linear-gradient(135deg, transparent calc(50% - 1px), danger calc(50% - 1px)...)`) — riscando a peça. Foot em `bg: danger-soft; color: danger; font-weight: 700`.

### 13.7 Atalhos de teclado

| Tecla         | Ação                                           |
| ------------- | ---------------------------------------------- |
| `⌘K` / `Ctrl+K` | Foca busca (expande sidebar se preciso)     |
| `.` (ponto)   | Alterna sidebar expandido/recolhido            |
| `↑` `↓`       | Navega resultados de busca                     |
| `Enter`       | Abre resultado de busca focado                 |
| `Esc`         | Fecha busca, limpa input                       |

---

## 14 · Acessibilidade

Alvo: **WCAG 2.2 AA, mínimo**.

### 14.1 Contraste (testado)

| Par                                    | Razão     | Status |
| -------------------------------------- | --------- | ------ |
| `brand-cream` sobre `background`       | 14.8:1    | AAA    |
| `text-secondary` sobre `background`    | 6.8:1     | AA     |
| `text-muted` sobre `background`        | 4.6:1     | AA     |
| `on-orange` (#FFF) sobre `brand-orange`| 3.2:1     | AA Large |
| `brand-orange` sobre `background`      | 4.5:1     | AA     |

`text-disabled` (#3A3631) NÃO passa AA — uso intencional para estados off, nunca para texto crítico.

### 14.2 Foco visível

Todo elemento interativo deve ter `:focus-visible` claro. Padrão: `outline: 2px solid var(--brand-orange); outline-offset: 2px`.

### 14.3 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

### 14.4 Tamanho mínimo de hit target

44 × 44 px em mobile (touch). Em desktop, 32 px aceitável para densidade.

### 14.5 Semântica

- `<nav aria-label="...">` em toda navegação.
- `<button>` para ações, `<a>` para navegação.
- `aria-label` em ícones-only (collapse, search).
- `aria-hidden="true"` em decorações puras (SVG sprite definitions).

---

## 15 · Implementation checklist

Antes de publicar uma página nova:

- [ ] Todo `h1–h6` usa `var(--lh-title)`.
- [ ] Todo `p, li, .kicker, .lede` herda `var(--lh-body)`.
- [ ] Títulos têm `text-wrap: balance`. Corpo tem `text-wrap: pretty`.
- [ ] Padding lateral usa `var(--pad-x)`.
- [ ] Gaps entre blocos usam tokens (`--s-*`), nunca valores cravados.
- [ ] Família: Syne em título, Inter em corpo, JetBrains Mono em número.
- [ ] Nenhuma palavra solitária no fim de linha (use `&nbsp;` se necessário).
- [ ] Botões: `white-space: nowrap` + texto **branco** sobre laranja.
- [ ] Sidebar inclui o lockup "Powered by Fatax Growth" no rodapé.
- [ ] Sidebar é recolhível e respeita `localStorage` state.
- [ ] Foco visível em todo elemento interativo.
- [ ] Nenhuma cor inventada — toda cor é token de `style.css`.
- [ ] Nenhum cinza frio (#888, #444). Toda neutra é warm-gray.
- [ ] Apenas 1 acento laranja (1 ação primária) por tela.
- [ ] Nada de `box-shadow` para elevação — use contraste de surface.
- [ ] Nada de gradiente, sombra ou efeito no logo.

---

## 16 · Do's & Don'ts (síntese)

### ✅ Faça

- Use `brand-orange` em **uma** ação por tela.
- Botões: `white-space: nowrap` + texto **branco** sobre laranja.
- Trate números como protagonistas: JetBrains Mono, peso 700, tamanho maior que o texto vizinho.
- Mantenha padding compacto onde tem dado, generoso onde tem hierarquia.
- Empilhe superfícies por contraste de cor (`background` → `surface` → `surface-raised`), nunca por sombra.
- Use `label-caps` ou `eyebrow` para rotular seções.
- Use as três famílias (Syne · Inter · JetBrains) em todos os contextos.
- A marca é bicolor — toda peça exibe creme + laranja.
- Inclua "Powered by Fatax Growth" no rodapé do sidebar — sempre.
- Sidebar é recolhível — persista o estado.

### ❌ Não faça

- Botões nunca quebram linha. Sem exceção. Reescreva o copy.
- Não use preto sobre laranja em botões. Apenas branco.
- Não use preto puro (`#000`). Use `#0A0A0A`.
- Não use gradientes na cor da marca — laranja é sólido sempre.
- Não adicione um segundo accent color. Repense hierarquia.
- Não use `border-radius` ≥ 24 px em UI funcional. Reservado a brand plates.
- Não use emoji decorativo. Ícones (Feather custom) substituem.
- Não use cinzas frios (`#888`, `#444`). Toda neutra é warm-gray.
- Não use `font-weight: 700` no corpo — reservado a títulos e ações.
- Não invente nova família tipográfica. Syne + Inter + Mono.
- Não rotacione, estique, gradiente, sombra ou efeite o logo.
- Não esconda o lockup "Powered by Fatax Growth". É obrigatório.
- Não invente nova duração ou easing — use os 5 tokens motion.
- Não use `box-shadow` para elevação — use contraste de surface.

---

## 17 · Versão & changelog

| Versão | Data       | Mudanças                                                                              |
| ------ | ---------- | ------------------------------------------------------------------------------------- |
| 0.6    | 2026-06-13 | **Brandbook completo.** Marca principal consolidada como Fatax; páginas de imagery, ilustração, áudio, editorial, mockups e social finalizadas; guias `AI_BRAND_GUIDE.md` e `AGENTS.md`; preparo para Vercel e consumo por agentes de IA. |
| 0.5    | 2026-05-25 | **Auditoria de fidelidade.** Reconciliação: arquétipo → mix Ruler 55 / Sage 30 / Caregiver 15; iconografia → sistema híbrido (sprite custom + Lucide inline); motion +2 tokens (`--ease-in` + `--dur-deliberate 560ms`). Bump consistente em `style.css` (v0.5) e `index.html`. |
| 0.4    | 2026-05-20 | Novo logo (2 fitas cruzadas), sidebar recolhível com morph, busca funcional, lockup obrigatório, números removidos do menu, topbar meta limpa, doc completa do design system |
| 0.3    | 2026-05-17 | Dark Cockpit edition — Syne + Inter, paleta bicolor, brandbook em 24 seções           |
| 0.2    | 2026-05    | Iteração âmbar/cobre (abandonada — ver `DESIGN v1.md`)                                |
| 0.1    | 2026-04    | Iteração Nunito + laranja (abandonada — ver `DESIGN v2.md`)                           |

---

**Stylesheet de referência:** `brandbook/shared/style.css` — toda regra `var(--*)` neste documento corresponde a uma custom property declarada lá. Em caso de conflito, **a stylesheet ganha** — atualize este documento.

**Brandbook navegável:** `brandbook/index.html` — versão interativa, com exemplos vivos de cada componente, anatomia visual do logo, swatches de cor copy-paste, e teste de busca/colapso do sidebar.

**Rules complementares:** `brandbook/RULES.md` — regras canônicas de tipografia & layout que devem ser replicadas em todo projeto Fatax.
