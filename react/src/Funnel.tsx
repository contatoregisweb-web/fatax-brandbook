import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Funnel
// Visualização canônica do pipeline. Largura proporcional ao volume —
// perda visual = perda real. Gradient laranja por estágio, percentuais
// de conversão à direita, total no rodapé.
// ════════════════════════════════════════════════════════════════════

export interface FunnelStage {
  /** Nome do estágio (Lead, MQL, SQL, Negociação, Fechado, …). */
  label: string;
  /** Volume absoluto (número de itens). */
  value: number;
  /** Texto opcional de valor monetário ou descrição. */
  meta?: string;
}

export interface FunnelProps {
  stages: FunnelStage[];
  /** Título superior do funil. */
  title?: string;
  /** Subtítulo à direita do título. */
  subtitle?: string;
  /** Label no rodapé (default: "Conversão total"). */
  totalLabel?: string;
  /** Wrapper em card surface. Default: true. */
  card?: boolean;
  /** Conteúdo opcional à direita do funil (breakdown). */
  rightPanel?: ReactNode;
  className?: string;
}

export function Funnel({
  stages,
  title,
  subtitle,
  totalLabel = 'Conversão total · primeiro → último',
  card = true,
  rightPanel,
  className,
}: FunnelProps) {
  if (stages.length < 2) {
    return (
      <div className={card ? 'funnel-card' : undefined}>
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>
          Funil precisa de ≥2 estágios.
        </div>
      </div>
    );
  }

  const totalConversion = (stages[stages.length - 1].value / stages[0].value) * 100;
  const curves = [
    { line: 'M0 80 C38 58 72 44 118 42 C170 40 218 54 280 78', wash: 'M0 84 C38 62 72 48 118 46 C170 44 218 58 280 82 L280 150 L0 150 Z' },
    { line: 'M0 54 C52 86 106 104 160 98 C208 92 238 72 280 62', wash: 'M0 58 C52 90 106 108 160 102 C208 96 238 76 280 66 L280 150 L0 150 Z' },
    { line: 'M0 88 C56 66 118 62 170 66 C218 70 248 80 280 84', wash: 'M0 92 C56 70 118 66 170 70 C218 74 248 84 280 88 L280 150 L0 150 Z' },
    { line: 'M0 62 C52 72 102 80 156 82 C204 84 242 86 280 92', wash: 'M0 66 C52 76 102 84 156 86 C204 88 242 90 280 96 L280 150 L0 150 Z' },
  ];

  const headerEl = (title || subtitle) && (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 'var(--s-lg)',
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
    }}>
      {title && <span>{title}</span>}
      {subtitle && <span style={{ color: 'var(--text-secondary)' }}>{subtitle}</span>}
    </div>
  );

  const cls = ['funnel-card', className].filter(Boolean).join(' ');
  const inner = (
    <>
      {headerEl}
      <div className="conversion-grid">
        {stages.slice(0, 4).map((stage, i) => {
          const conversion = i === 0 ? null : (stage.value / stages[i - 1].value) * 100;
          const isDown = conversion !== null && conversion < 50;
          const curve = curves[i % curves.length];
          return (
            <article className="conversion-card" key={`${stage.label}-${i}`}>
              <div className="conversion-title">{stage.label}</div>
              <div className="conversion-value">{stage.value.toLocaleString('pt-BR')}</div>
              <span className={`conversion-badge${isDown ? ' is-down' : ''}`}>
                {conversion === null ? 'Base' : `${conversion.toFixed(0)}%`}
              </span>
              {stage.meta && <span style={{ fontSize: 12, color: 'rgba(10,10,10,0.58)', fontWeight: 700 }}>{stage.meta}</span>}
              <svg className="conversion-curve" viewBox="0 0 280 150" preserveAspectRatio="none" aria-hidden="true">
                <path className="wash" d={curve.wash} />
                <path d={curve.line} />
              </svg>
            </article>
          );
        })}
      </div>
      <div style={{
        marginTop: 'var(--s-md)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>
        {totalLabel}: <span style={{ color: 'var(--brand-orange)' }}>{totalConversion.toFixed(2).replace('.', ',')}%</span>
      </div>
      {rightPanel && <div style={{ marginTop: 'var(--s-lg)' }}>{rightPanel}</div>}
    </>
  );

  if (!card) return inner;
  return <div className={cls}>{inner}</div>;
}
