# Fatax AI Brand Guide

Use este arquivo antes de pedir a qualquer IA para criar tela, redesign, imagem, deck, post ou componente da Fatax. Ele resume as regras que não podem ser inventadas fora do brandbook.

## Essência

- Marca principal: **Fatax**.
- Descrição curta: assessoria operacional de crescimento.
- Promessa: previsibilidade.
- Campo de atuação: gestão, marketing e vendas como uma só operação.
- Inimigo: fragmentação que faz o empresário virar integrador de fornecedores.
- Personalidade: direta, operacional, sóbria e aliada.

## Voz

- Fale com empresário inteligente, sem infantilizar.
- Use verbos concretos: operar, medir, corrigir, conectar, decidir, vender.
- Prefira número, data, responsável e consequência.
- Evite hype: "revolucionário", "disruptivo", "mágico", "game changer", "fácil", "mindset".
- Frases podem ser curtas. O tom é convicto, não agressivo.

Exemplo de voz:

> Crescer não é sorte. É operação.

> O pipeline tem nome, CNPJ, prazo e responsável.

## Visual

- Modo base: **Dark Cockpit**.
- Use preto como estrutura, creme como voz e laranja como ação.
- Não crie novas cores de marca.
- Não use gradientes coloridos, orbs, bokeh, neon, 3D decorativo ou paleta pastel.
- Não use stock photo genérica de equipe sorrindo para laptop.
- Não use mascote ou personagem ilustrado.

## Tokens

| Token | Valor | Uso |
|---|---:|---|
| `--brand-black` | `#0A0A0A` | fundo principal |
| `--brand-cream` | `#F5EBDE` | texto primário, wordmark, títulos |
| `--brand-orange` | `#FF4800` | CTA, estado ativo, acento crítico |
| `--surface` | `#141414` | cards e painéis |
| `--surface-raised` | `#1C1C1C` | hover, camada elevada |
| `--text-secondary` | `#9C9489` | texto secundário |
| `--border-soft` | `#1A1A1A` | divisórias discretas |

Importe os tokens:

```html
<link rel="stylesheet" href="/dist/fatax.css" />
```

ou, em app bundler:

```ts
import '@fatax/design-system';
```

## Tipografia

- Display e títulos: `Syne`.
- Corpo e UI: `Inter`.
- Números, IDs e código: `JetBrains Mono`.
- Títulos usam `line-height: 1.2`.
- Texto corrido usa `line-height: 1.5`.
- Não usar Roboto, Helvetica, Poppins, Montserrat, Playfair ou fontes decorativas.

## Componentes

Preferir componentes/tokens existentes:

- `Button`, `Card`, `Pill`, `Stat`, `Sidebar`, `Topbar`, `SectionHeader`.
- Inputs seguem fundo escuro, borda tokenizada e foco laranja.
- Tabelas são densas, com cabeçalho escuro e números em mono.
- Sidebar deve manter o lockup **Powered by Fatax Growth** quando usada como produto endossado.

React:

```tsx
import '@fatax/design-system';
import { Button, Card, Sidebar } from '@fatax/design-system-react';
```

## Layout

- Base 4px para spacing.
- Use `--pad-x`, `--content-max`, `--s-*`, `--r-*`.
- Cards só para itens, painéis ou ferramentas reais. Não transformar cada seção da página em card decorativo.
- Interfaces operacionais devem ser densas, escaneáveis e previsíveis.
- Landing pages, quando existirem, devem mostrar a marca/produto no primeiro viewport.

## Imagens e aplicações

- Fotografia: pessoas reais, ambientes reais, luz natural, grade quente levemente dessaturada.
- Ilustrações: lineares, técnicas, bicolor creme + laranja, sem personagem.
- Mockups: browser/device/documento realista, sem tela flutuante 3D.
- Social: dark + cream + orange; headline forte; uma ideia por peça.
- Motion: curto, funcional, respeitando `prefers-reduced-motion`.
- Áudio: opcional e desligado por padrão; som é confirmação, não decoração.

## Checklist para IA

Antes de entregar qualquer coisa Fatax, confira:

- Usei apenas as cores/tokens oficiais?
- Usei Syne, Inter e JetBrains Mono nos papéis corretos?
- O laranja aparece como ação ou sinal, não como textura?
- A voz está direta, operacional, sóbria e aliada?
- Evitei hype e visual genérico de startup?
- O resultado ajuda gestão, marketing ou vendas a ficarem mais previsíveis?
