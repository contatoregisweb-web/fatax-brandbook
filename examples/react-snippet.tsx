// ════════════════════════════════════════════════════════════════════
// examples/react-snippet.tsx
//
// Snippet de referência mostrando como consumir @fatax/design-system-react
// em uma app real (Next.js, Vite, CRA). Não é runnable standalone — copie
// para seu projeto que já tenha React + bundler configurados.
//
// Setup mínimo no app consumer:
//   1. npm install @fatax/design-system @fatax/design-system-react
//   2. Importar o CSS bundle uma vez no entry:  import '@fatax/design-system';
//   3. Chamar applySidebarStateEarly() ANTES do ReactDOM.render (anti-flash)
//   4. Usar os componentes — eles encapsulam todas as regras da marca
// ════════════════════════════════════════════════════════════════════

import '@fatax/design-system';
import {
  Sidebar,
  Topbar,
  SectionHeader,
  Stat,
  Button,
  Pill,
  Card,
  Icon,
  applySidebarStateEarly,
  type NavGroup,
} from '@fatax/design-system-react';

// Aplicar estado do sidebar ANTES do mount para evitar flash.
// Em Next.js: chame em pages/_app.tsx ou app/layout.tsx no top level.
// Em Vite: chame em main.tsx antes do ReactDOM.createRoot.
if (typeof window !== 'undefined') applySidebarStateEarly();

// ── Estrutura de navegação ──────────────────────────────────────────
const NAV: NavGroup[] = [
  {
    label: 'Operação',
    items: [
      { href: '/dashboard',  label: 'Dashboard',  icon: 'overview' },
      { href: '/pipeline',   label: 'Pipeline',   icon: 'strategy', meta: '12' },
      { href: '/clientes',   label: 'Clientes',   icon: 'archetypes' },
      { href: '/financeiro', label: 'Financeiro', icon: 'data' },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { href: '/campanhas', label: 'Campanhas', icon: 'motion' },
      { href: '/conteudo',  label: 'Conteúdo',  icon: 'editorial' },
    ],
  },
];

// ── App shell ───────────────────────────────────────────────────────
export function App({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <Sidebar
        brandHref="/"
        groups={NAV}
        onSearch={(q) => {
          // Implemente sua busca aqui. Pode ser um callback que abre
          // um modal, dispara fetch, etc. O DS não impõe estratégia.
          console.log('search:', q);
        }}
      />
      <main className="main">{children}</main>
    </div>
  );
}

// ── Página exemplo: Dashboard ───────────────────────────────────────
export function DashboardPage() {
  return (
    <>
      <Topbar
        crumbs={['App', 'Dashboard']}
        meta={<>Q2 / <b>2026</b></>}
      />

      <SectionHeader
        eyebrow="Visão geral"
        title={
          <>
            <span className="accent">Receita</span>{' '}
            <span className="dim">do trimestre.</span>
          </>
        }
        kicker="Fechamento previsto até 30/06. Pipeline em 64% da meta."
        index="01"
        rightLabel={
          <>
            Q2<br />
            2026
          </>
        }
      />

      <div className="content">

        {/* ── BLOCK 1 — KPIs ───────────────────────────────────────── */}
        <section className="block">
          <div className="label">
            <span className="num">01</span>Métricas
          </div>
          <div className="body">
            <h2>Indicadores-âncora.</h2>
            <p>Três métricas que medem o trimestre. Atualizadas a cada 15 min.</p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--s-md)',
                marginTop: 'var(--s-lg)',
              }}
            >
              <Stat label="MRR · Recorrente" value="R$ 248K" description="+12,4% MoM" />
              <Stat label="Pipeline aberto"  value="R$ 1,2M" description="64% da meta trimestral" />
              <Stat label="Churn 30d"        value="2,4%"    description="3 contratos cancelados" />
            </div>
          </div>
        </section>

        {/* ── BLOCK 2 — Ações ──────────────────────────────────────── */}
        <section className="block">
          <div className="label">
            <span className="num">02</span>Ações
          </div>
          <div className="body">
            <h2>Hierarquia de decisão.</h2>
            <p>
              Apenas <strong>uma</strong> ação primária por tela — laranja é o
              ativo mais caro da marca.
            </p>

            <div style={{ display: 'flex', gap: 'var(--s-md)', flexWrap: 'wrap', marginTop: 'var(--s-md)' }}>
              <Button variant="primary" iconLeft={<Icon name="data" size={14} />}>
                Aprovar fechamento
              </Button>
              <Button variant="secondary">Exportar CSV</Button>
              <Button variant="ghost">Ver histórico</Button>
              <Button variant="danger" size="sm">Cancelar pendentes</Button>
            </div>
          </div>
        </section>

        {/* ── BLOCK 3 — Status ────────────────────────────────────── */}
        <section className="block">
          <div className="label">
            <span className="num">03</span>Status
          </div>
          <div className="body">
            <h2>Pills semânticos.</h2>
            <div style={{ display: 'flex', gap: 'var(--s-sm)', flexWrap: 'wrap', marginTop: 'var(--s-md)' }}>
              <Pill>Rascunho</Pill>
              <Pill variant="orange">Prioridade</Pill>
              <Pill variant="cream">Premium</Pill>
              <Pill variant="success">Pago</Pill>
              <Pill variant="warning">Vencendo</Pill>
              <Pill variant="danger">Vencido</Pill>
              <Pill variant="info">Sistema</Pill>
            </div>
          </div>
        </section>

        {/* ── BLOCK 4 — Card ──────────────────────────────────────── */}
        <section className="block">
          <div className="label">
            <span className="num">04</span>Detalhes
          </div>
          <div className="body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-md)' }}>
              <Card title="Próximas reuniões">
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  3 reuniões agendadas para hoje. Próxima: <strong style={{ color: 'var(--brand-cream)' }}>14:30 — Almeida & Cia</strong>.
                </p>
              </Card>
              <Card title="Pendências do dia">
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  5 propostas aguardando revisão. Vencimento até <strong style={{ color: 'var(--brand-cream)' }}>18:00</strong>.
                </p>
              </Card>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

// ── Entry (Vite-style) ──────────────────────────────────────────────
//
// import React from 'react';
// import ReactDOM from 'react-dom/client';
//
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <App>
//     <DashboardPage />
//   </App>
// );
