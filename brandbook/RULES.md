# RULES.md — Regras canônicas de tipografia & layout

> Regras transversais do Fatax Brandbook que devem ser **replicadas em qualquer novo sistema/projeto da marca**. Não são preferências — são padrão obrigatório.

---

## 1 · Altura de linha (line-height)

A altura de linha é dividida em duas categorias, sem exceções.

| Categoria       | Valor   | Token              | Aplicação                                       |
|-----------------|---------|--------------------|-------------------------------------------------|
| **Títulos**     | `1.2`   | `var(--lh-title)`  | h1–h6, display, hero, manifesto, pager, demo titles |
| **Texto corrido** | `1.5`   | `var(--lh-body)`   | parágrafos, lede, kicker, listas, captions      |

**Por quê:** 120% em títulos dá ar sem afrouxar a presença. 150% no corpo respira sem perder ritmo. Acima ou abaixo disso, o texto vira ou linha-de-ônibus (apertado) ou poesia (largo demais).

```css
/* Definido em :root */
--lh-title: 1.2;
--lh-body:  1.5;

/* Aplicado globalmente */
h1, h2, h3, h4, h5, h6 { line-height: var(--lh-title); }
body, p, li { line-height: var(--lh-body); }
```

---

## 2 · Viúvas (orphans/widows)

**Nunca deixe uma palavra sozinha no fim de um título ou parágrafo.**

| Contexto        | Propriedade            | Razão                                            |
|-----------------|------------------------|--------------------------------------------------|
| **Títulos**     | `text-wrap: balance;`  | distribui palavras igualmente entre linhas      |
| **Corpo**       | `text-wrap: pretty;`   | evita órfãs no fim, suaviza last-line raggedness |

```css
h1, h2, h3, h4, h5, h6 { text-wrap: balance; }
p, li, dd, blockquote, figcaption,
.kicker, .lede                 { text-wrap: pretty; }
body                           { text-wrap: pretty; }
```

**Aplicação manual quando necessário:** use `&nbsp;` entre a penúltima e a última palavra de um título curto para forçar a junção (`Crescer com&nbsp;método`).

---

## 3 · Espaçamento entre seções

Espaçamento é hierarquia. Quanto maior o bloco, maior o respiro acima e abaixo.

| Contexto                                | Token        | Valor   |
|-----------------------------------------|--------------|---------|
| **Padding lateral da página**           | `--pad-x`    | `80px`  (32px ≤1024) |
| **Padding vertical de section-header**  | `var(--s-4xl) / var(--s-3xl)` | `64 / 48` |
| **Padding vertical de .content**        | `var(--s-4xl)` topo · `var(--s-6xl)` base | `64 / 128` |
| **Gap entre blocos (.block)**           | `var(--s-4xl)` | `64px`  |
| **Espaçamento label ↔ body dentro do bloco** | `var(--s-4xl)` | `64px`  |
| **Gap interno de texto + heading**      | `var(--s-md)` a `var(--s-xl)` | `12–24` |

**Regra prática:** se está em dúvida, **respire mais**. O Fatax é institucional, não denso; o espaço transmite confiança.

---

## 4 · Hierarquia tipográfica vigente

Estabelecida em §10 do Brandbook (`10-typography.html`):

- **Display & títulos** → `Syne` (700–800), tracking negativo agressivo (−0.022 a −0.04em).
- **Texto corrido & UI** → `Inter` (400–600), letter-spacing próximo de zero.
- **Números & código** → `JetBrains Mono` (500–700).

Nenhuma outra família entra no sistema. Não pareie com Roboto, Helvetica, Playfair ou outros.

---

## 5 · Quando criar uma exceção

Praticamente nunca. Se o design parece pedir uma exceção, o problema é o design — re-projete o layout, não a regra. Exceções existem apenas em:

1. **Display gigante (≥120px)** — pode usar line-height 1.0–1.1 para single-line marketing.
2. **Caps tracked (label-caps)** — line-height 1.3 aceitável (já é texto curto e em maiúscula).
3. **Mono em tabela densa** — line-height 1.4 aceitável (números não têm descender).

Toda exceção deve estar documentada inline no CSS com motivo.

---

## Checklist antes de publicar uma página nova

- [ ] Todo `h1–h6` usa `var(--lh-title)`.
- [ ] Todo `p, li, .kicker, .lede` usa `var(--lh-body)`.
- [ ] Títulos têm `text-wrap: balance`.
- [ ] Corpo tem `text-wrap: pretty`.
- [ ] Padding lateral usa `var(--pad-x)`.
- [ ] Gaps entre blocos usam tokens da escala (`--s-*`), nunca valores cravados.
- [ ] Família: Syne em título, Inter em corpo, Mono em número.
- [ ] Nada quebra palavra solta no fim de uma linha.
