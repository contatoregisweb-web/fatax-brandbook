# @fatax/design-system-react

Componentes React tipados sobre `@fatax/design-system`. **Wrappers que tornam impossível quebrar as regras da marca.**

Versão: **0.6.0** · Requer React 18+ · TypeScript

---

## Por que usar (em vez de só CSS)

Sem isso, o dev pode:
- `<button class="btn btn-primary" style="font-size: 16px">` ← drift
- esquecer `white-space: nowrap`
- copiar markup do sidebar e remover o lockup
- usar peso 600 num botão (canônico é 700)

Com isso:
- `<Button variant="primary">Aprovar</Button>` — não tem `style`, não tem `fontSize`, não tem como errar.
- `<Sidebar groups={...} />` — lockup **embutido**, sem opção de remover.

---

## Instalação

```bash
npm install @fatax/design-system @fatax/design-system-react
```

Importe o CSS uma vez no entry da app:

```ts
// app/main.tsx (Vite) ou pages/_app.tsx (Next)
import '@fatax/design-system';   // ou os 4 arquivos individuais
```

Para evitar flash no carregamento (sidebar abre expandida e depois recolhe), chame `applySidebarStateEarly()` antes do `ReactDOM.render`:

```tsx
import { applySidebarStateEarly } from '@fatax/design-system-react';
applySidebarStateEarly();

// agora monta o React
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

---

## Componentes

### `<Sidebar/>` — app shell completo

```tsx
import { Sidebar } from '@fatax/design-system-react';

<Sidebar
  brandHref="/"
  groups={[
    {
      label: 'Operação',
      items: [
        { href: '/dashboard', label: 'Dashboard', icon: 'overview' },
        { href: '/pipeline',  label: 'Pipeline',  icon: 'strategy', meta: '12' },
        { href: '/clientes',  label: 'Clientes',  icon: 'archetypes' },
      ],
    },
    {
      label: 'Análise',
      items: [
        { href: '/dados',     label: 'Dados',     icon: 'data' },
      ],
    },
  ]}
  onSearch={(q) => console.log('search:', q)}
/>
```

Já inclui: sprite SVG, brand morph, collapse persistente (`localStorage`), atalhos `·` e `⌘K`, marcação automática de link ativo, e o lockup **Powered by Fatax Growth** no rodapé (obrigatório, não dá pra remover).

### `<SectionHeader/>` — cabeçalho editorial

```tsx
<SectionHeader
  eyebrow="Visão geral"
  title={<><span className="accent">Receita</span> <span className="dim">do trimestre.</span></>}
  kicker="Pipeline comercial executivo — fechamento previsto até 30/06."
  index="01"
  rightLabel={<>Q2<br/>2026</>}
/>
```

### `<Topbar/>` — breadcrumbs + meta

```tsx
<Topbar
  crumbs={['App', 'Clientes', 'Almeida & Cia']}
  meta={<>Q2 / <b>2026</b></>}
/>
```

### `<Button/>` — 5 variantes × 3 tamanhos

```tsx
<Button variant="primary">Aprovar fechamento</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost">Ver detalhes</Button>
<Button variant="outline">Editar</Button>
<Button variant="danger" size="sm">Excluir</Button>

<Button
  variant="primary"
  iconLeft={<Icon name="data" size={14} />}
>
  Adicionar cliente
</Button>
```

**Regras embutidas:** `white-space: nowrap`, texto branco sobre laranja, weight 700. Sem `style`, `fontSize` ou `color` configuráveis.

### `<Pill/>` — 7 variantes semânticas

```tsx
<Pill>Rascunho</Pill>
<Pill variant="orange">Prioridade</Pill>
<Pill variant="success">Pago</Pill>
<Pill variant="warning">Vencendo</Pill>
<Pill variant="danger">Vencido</Pill>
```

### `<Card/>` — container surface

```tsx
<Card title="Próximas reuniões">
  <p>Conteúdo do card.</p>
</Card>
```

### `<Stat/>` — KPI block

```tsx
<Stat
  label="MRR · Recorrente"
  value="R$ 248.713"
  description="+12,4% vs mês anterior"
/>
```

### `<Icon/>` — qualquer um dos 28 ícones do sprite

```tsx
<Icon name="overview" size={16} />
<Icon name="strategy" size={20} className="ml-2" />
```

Lista completa: `overview`, `mission`, `strategy`, `archetypes`, `manifesto`, `voice`, `moodboard`, `logo`, `color`, `typography`, `iconography`, `imagery`, `illustrations`, `motion`, `audio`, `tokens`, `layout`, `components`, `inputs`, `data`, `editorial`, `mockups`, `social`, `accessibility`, `external`, `search`, `collapse`.

Para ícones fora dessa lista, use **Lucide inline** (regra híbrida — `DESIGN.md §5`).

### `<PoweredBy/>` — lockup standalone

Use só em contextos **sem** sidebar (footer de landing, etc). Dentro de sidebar, já vem embutido.

```tsx
<PoweredBy />
```

---

## Form components

### `<Input/>` — textbox 40px com label + helper

```tsx
import { Input } from '@fatax/design-system-react';

<Input
  label="CNPJ"
  placeholder="00.000.000/0000-00"
  help="Apenas dígitos. Validação automática."
/>

// Estado de erro
<Input
  label="Meta mensal"
  defaultValue="R$ -"
  error="Valor obrigatório."
/>

// Email
<Input type="email" label="E-mail comercial" defaultValue="contato@fatax.com.br" />
```

### `<Toggle/>` — switch 36×20, laranja quando ON

```tsx
import { Toggle } from '@fatax/design-system-react';
const [on, setOn] = useState(true);

<Toggle checked={on} onChange={setOn} label="Notificações por e-mail" />
```

### `<Checkbox/>` — box 18×18 com check branco

```tsx
import { Checkbox } from '@fatax/design-system-react';

<Checkbox checked={accepted} onChange={setAccepted} label="Aceito os termos" />
```

### `<Select/>` — dropdown com search inline (>8 opt)

```tsx
import { Select } from '@fatax/design-system-react';

<Select
  value={segment}
  onChange={setSegment}
  placeholder="Selecionar segmento…"
  options={[
    { value: 'industria', label: 'Indústria' },
    { value: 'servicos', label: 'Serviços' },
    { value: 'varejo', label: 'Varejo' },
  ]}
/>
```

### `<Datepicker/>` — BR (DD/MM/AAAA), single date

```tsx
import { Datepicker, formatDateBR } from '@fatax/design-system-react';
const [date, setDate] = useState<Date | null>(null);

<Datepicker value={date} onChange={setDate} />
<span>{formatDateBR(date)}</span>
```

---

## Disclosure / Overlay

### `<Tabs/>` — underline laranja, keyboard-nav

```tsx
import { Tabs } from '@fatax/design-system-react';
const [tab, setTab] = useState('visao');

<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'visao',      label: 'Visão geral' },
    { id: 'pipeline',   label: 'Pipeline' },
    { id: 'clientes',   label: 'Clientes' },
    { id: 'financeiro', label: 'Financeiro' },
  ]}
/>
```

Keyboard: ←/→ navega, Home/End vai pra primeira/última.

### `<Modal/>` + `<ConfirmModal/>` — dialog canônico

```tsx
import { Modal, ConfirmModal, Button, Pill } from '@fatax/design-system-react';
const [open, setOpen] = useState(false);

<Button variant="danger" onClick={() => setOpen(true)}>Excluir</Button>

<ConfirmModal
  open={open}
  onClose={() => setOpen(false)}
  title="Excluir cliente Almeida & Cia?"
  badge={<Pill variant="danger">Ação destrutiva</Pill>}
  message="Essa ação remove permanentemente o histórico. Não pode ser desfeita."
  confirmLabel="Excluir"
  cancelLabel="Manter"
  onConfirm={() => deleteCliente()}
/>
```

Features: Escape fecha, click no backdrop fecha (opcional), body scroll lock, renderiza via portal.

---

## Data Viz

### `<Sparkline/>` — linha laranja sem grid

```tsx
import { Sparkline } from '@fatax/design-system-react';

<Sparkline
  label="MRR · 90 dias"
  data={[120, 124, 119, 132, 138, 145, 152, 161, 178, 195, 210, 220, 248]}
/>
```

Opções: `showArea={false}` para só a linha, `card={false}` para SVG puro sem wrapper.

### `<Funnel/>` — pipeline canônico

```tsx
import { Funnel } from '@fatax/design-system-react';

<Funnel
  title="Pipeline · Q2 / 2026"
  subtitle="5 estágios · 30 dias"
  stages={[
    { label: 'Lead',       value: 2481, meta: 'R$ 4,2M' },
    { label: 'MQL',        value: 1538, meta: 'R$ 2,6M' },
    { label: 'SQL',        value: 943,  meta: 'R$ 1,8M' },
    { label: 'Negociação', value: 546,  meta: 'R$ 1,2M' },
    { label: 'Fechado',    value: 347,  meta: 'R$ 768K' },
  ]}
/>
```

Largura dos trapézios é proporcional ao volume — perda visual = perda real. Taxas de conversão automaticamente calculadas à direita.

---

## Feedback & overlays

### `<Alert/>` — 5 variantes semânticas

```tsx
import { Alert } from '@fatax/design-system-react';

<Alert variant="info" title="Integração CRM atualizada">
  Sincroniza a cada 15 min. Próxima rodada às 14:30.
</Alert>
<Alert variant="success" title="Relatório exportado">
  relatorio-pipeline-mai-2026.csv enviado.
</Alert>
<Alert variant="warning" title="3 contratos vencendo">
  Renovações pendentes — abra o financeiro.
</Alert>
<Alert variant="danger" title="Falha na conexão ERP">
  Reconectando em 12s.
</Alert>
<Alert variant="brand">Beta privada — algumas features podem mudar.</Alert>
```

Variantes: `info` · `success` · `warning` · `danger` · `brand`. Ícone default por variante; passe `icon={...}` ou `hideIcon` para customizar.

### `<Tooltip/>` — cream + black, 4 placements

```tsx
import { Tooltip, Button } from '@fatax/design-system-react';

<Tooltip label="⌘K · Buscar" placement="top">
  <Button variant="secondary">Hover me</Button>
</Tooltip>
```

Placements: `top` (default) · `bottom` · `left` · `right`. Delay 200ms.

### `<Drawer/>` — painel lateral com slide

```tsx
import { Drawer, Button } from '@fatax/design-system-react';
const [open, setOpen] = useState(false);

<Button variant="secondary" onClick={() => setOpen(true)}>Filtros</Button>

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  side="right"
  title="Filtros avançados"
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="primary">Aplicar</Button>
  </>}
>
  Conteúdo do drawer aqui.
</Drawer>
```

Use pra filtros, detalhes contextuais, formulários secundários. Para confirmações centradas, prefira `<Modal>`.

### `<Avatar/>` + `<AvatarStack/>`

```tsx
import { Avatar, AvatarStack } from '@fatax/design-system-react';

<Avatar size="lg">FG</Avatar>
<Avatar size="md" tone="cream">JP</Avatar>
<Avatar size="sm" tone="neutral">+8</Avatar>
<Avatar src="/foto-cliente.jpg" alt="Almeida" />

<AvatarStack>
  <Avatar size="lg">FG</Avatar>
  <Avatar size="lg">DR</Avatar>
  <Avatar size="lg">BM</Avatar>
  <Avatar size="lg" tone="neutral">+8</Avatar>
</AvatarStack>
```

Tamanhos: `sm 24px` · `md 32px` · `lg 48px`. Tons: `orange` (default) · `cream` · `neutral`.

### `<Radio/>` + `<RadioGroup/>` — seleção única

```tsx
import { RadioGroup } from '@fatax/design-system-react';
const [segment, setSegment] = useState<'industria' | 'servicos' | 'varejo'>('industria');

<RadioGroup
  legend="Segmento"
  value={segment}
  onChange={setSegment}
  direction="column"
  options={[
    { value: 'industria', label: 'Indústria' },
    { value: 'servicos', label: 'Serviços' },
    { value: 'varejo', label: 'Varejo' },
  ]}
/>
```

---

## Loading states

### `<Skeleton/>` — shimmer placeholder

```tsx
import { Skeleton } from '@fatax/design-system-react';

<Skeleton width="60%" height={14} />
<Skeleton shape="text" lines={3} />
<Skeleton shape="circle" width={48} height={48} />
```

Shimmer 1.4s linear. Respeita `prefers-reduced-motion` (desliga animação).

### `<Spinner/>` — indicador rotativo

```tsx
import { Spinner } from '@fatax/design-system-react';

<Spinner size={16} />
<div style={{display:'flex',alignItems:'center',gap:'var(--s-sm)'}}>
  <Spinner size={14} /> Sincronizando dados…
</div>
```

### `<EmptyState/>` — "nada por aqui"

```tsx
import { EmptyState, Button } from '@fatax/design-system-react';

<EmptyState
  title="Nenhum cliente ainda"
  actions={<Button variant="primary" size="sm">+ Adicionar cliente</Button>}
>
  Comece adicionando seu primeiro cliente.
</EmptyState>
```

### `<ErrorState/>` — falha de carregamento

```tsx
import { ErrorState, Button } from '@fatax/design-system-react';

<ErrorState
  title="Falha ao carregar"
  actions={<Button variant="secondary" size="sm" onClick={refetch}>Tentar novamente</Button>}
>
  Conexão com o ERP indisponível.
</ErrorState>
```

---

## Exemplo completo (Next.js)

```tsx
// app/layout.tsx
import '@fatax/design-system';
import { Sidebar, applySidebarStateEarly } from '@fatax/design-system-react';

if (typeof window !== 'undefined') applySidebarStateEarly();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app">
          <Sidebar
            groups={[
              {
                label: 'Operação',
                items: [
                  { href: '/dashboard', label: 'Dashboard', icon: 'overview' },
                  { href: '/pipeline',  label: 'Pipeline',  icon: 'strategy' },
                ],
              },
            ]}
          />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

```tsx
// app/dashboard/page.tsx
import { Topbar, SectionHeader, Stat, Button, Pill } from '@fatax/design-system-react';

export default function Dashboard() {
  return (
    <>
      <Topbar crumbs={['App', 'Dashboard']} />
      <SectionHeader
        eyebrow="Visão geral"
        title={<><span className="accent">Receita.</span> <span className="dim">Q2/2026.</span></>}
        index="01"
        rightLabel={<>Dashboard<br/>Principal</>}
      />
      <div className="content">
        <section className="block">
          <div className="label"><span className="num">01</span>Métricas</div>
          <div className="body">
            <h2>Indicadores-âncora.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s-md)' }}>
              <Stat label="MRR" value="R$ 248K" description="+12,4% MoM" />
              <Stat label="Pipeline" value="R$ 1,2M" description="64% da meta" />
              <Stat label="Churn 30d" value="2,4%" description="3 cancelados" />
            </div>
            <div style={{ display: 'flex', gap: 'var(--s-md)', marginTop: 'var(--s-lg)' }}>
              <Button variant="primary">Aprovar fechamento</Button>
              <Button variant="ghost">Ver detalhes</Button>
            </div>
            <div style={{ display: 'flex', gap: 'var(--s-sm)', marginTop: 'var(--s-md)' }}>
              <Pill variant="success">Pago</Pill>
              <Pill variant="warning">Vencendo</Pill>
              <Pill variant="danger">Vencido</Pill>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
```

---

## API de cada componente

Todos os tipos são exportados:

```ts
import type {
  // Layout
  SidebarProps, NavGroup, NavItem,
  PoweredByProps,
  TopbarProps,
  SectionHeaderProps,
  // Atoms
  ButtonProps, ButtonVariant, ButtonSize,
  PillProps, SemanticVariant,
  CardProps, StatProps,
  IconProps, IconName,
  AvatarProps, AvatarStackProps, AvatarSize, AvatarTone,
  // Form
  InputProps,
  ToggleProps, CheckboxProps,
  RadioOption, RadioGroupProps,
  SelectProps, SelectOption,
  DatepickerProps,
  // Disclosure / Overlay
  TabsProps, TabItem,
  ModalProps, ConfirmModalProps,
  DrawerProps,
  TooltipProps, TooltipPlacement,
  // Feedback
  AlertProps, AlertVariant,
  SkeletonProps, SpinnerProps,
  EmptyStateProps, ErrorStateProps,
  // Data Viz
  SparklineProps,
  FunnelProps, FunnelStage,
} from '@fatax/design-system-react';
```

---

## Inventory — 26 componentes totais

| Camada | Componentes |
|---|---|
| **Layout** | Sidebar · PoweredBy · Topbar · SectionHeader |
| **Atoms** | Button · Pill · Card · Stat · Icon · FataxSprite · Avatar · AvatarStack |
| **Form** | Input · Toggle · Checkbox · Radio + RadioGroup · Select · Datepicker |
| **Disclosure / Overlay** | Tabs · Modal + ConfirmModal · Drawer · Tooltip |
| **Feedback** | Alert · Skeleton · Spinner · EmptyState · ErrorState |
| **Data Viz** | Sparkline · Funnel |

**Cobertura:** dá pra construir qualquer tela de produto Fatax sem escrever uma única regra de CSS própria.

---

## Roadmap

**Próximos componentes** (baixa prioridade):
- `Breadcrumbs` standalone (atualmente embutido via classes `.crumbs`)
- `Toast` / notification system (push notifications efeito snackbar)
- `Popover` genérico (Tooltip + content arbitrário)
- `Combobox` (Select + input livre)

A imensa maioria do brandbook já está coberta. Próxima prioridade do projeto: scaffolding (`create-fatax-app`).
