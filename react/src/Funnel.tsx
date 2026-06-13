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

  const maxValue = stages[0].value || 1;
  const width = 600;
  const stageHeight = 70;
  const gap = 8;
  const totalHeight = stages.length * stageHeight + (stages.length - 1) * gap + 60;

  const totalConversion = (stages[stages.length - 1].value / stages[0].value) * 100;

  // Build trapezoid points + per-stage conversion rates
  let prevWidth = width;
  const polygons = stages.map((s, i) => {
    const widthRatio = s.value / maxValue;
    const stageWidth = width * widthRatio;
    const xOffset = (width - stageWidth) / 2;
    const xOffsetPrev = (width - prevWidth) / 2;
    const y = i * (stageHeight + gap);
    const opacityTop = 0.95 - i * 0.18;
    const opacityBot = opacityTop - 0.1;
    const points = `${xOffsetPrev},${y} ${xOffsetPrev + prevWidth},${y} ${xOffset + stageWidth},${y + stageHeight} ${xOffset},${y + stageHeight}`;
    const conversion = i === 0 ? null : (s.value / stages[i - 1].value) * 100;
    const result = {
      stage: s,
      points,
      y,
      stageWidth,
      xOffset,
      opacityTop: Math.max(opacityTop, 0.18),
      opacityBot: Math.max(opacityBot, 0.12),
      conversion,
      gradientId: `fx-funnel-grad-${i}-${Math.random().toString(36).slice(2, 6)}`,
    };
    prevWidth = stageWidth;
    return result;
  });

  const svg = (
    <svg className="funnel" viewBox={`0 0 ${width + 90} ${totalHeight}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {polygons.map((p) => (
          <linearGradient key={p.gradientId} id={p.gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF4800" stopOpacity={p.opacityTop} />
            <stop offset="100%" stopColor="#FF4800" stopOpacity={p.opacityBot} />
          </linearGradient>
        ))}
      </defs>
      {polygons.map((p, i) => (
        <g key={i}>
          <polygon points={p.points} fill={`url(#${p.gradientId})`} />
          <text
            x={width / 2}
            y={p.y + stageHeight / 2 - 4}
            textAnchor="middle"
            fill={i < 3 ? '#FFFFFF' : '#F5EBDE'}
            className="funnel-stage-label"
            style={{ fontSize: Math.max(20 - i, 14) }}
          >
            {p.stage.label}
          </text>
          <text
            x={width / 2}
            y={p.y + stageHeight / 2 + 18}
            textAnchor="middle"
            fill={i < 3 ? '#FFFFFF' : '#F5EBDE'}
            className="funnel-stage-value"
            opacity={0.92}
            style={{ fontSize: Math.max(14 - Math.floor(i / 2), 11) }}
          >
            {p.stage.value.toLocaleString('pt-BR')}
            {p.stage.meta ? ` · ${p.stage.meta}` : ''}
          </text>
          {p.conversion !== null && (
            <g>
              <line x1={width - 12} y1={p.y - gap / 2 + 2} x2={width + 8} y2={p.y - gap / 2 + 2} stroke="var(--border-strong)" strokeWidth="0.75" />
              <line x1={width + 8} y1={p.y - gap / 2 + 2} x2={width + 8} y2={p.y + stageHeight / 2} stroke="var(--border-strong)" strokeWidth="0.75" />
              <line x1={width + 8} y1={p.y + stageHeight / 2} x2={width - 12} y2={p.y + stageHeight / 2} stroke="var(--border-strong)" strokeWidth="0.75" />
              <text x={width + 16} y={p.y + stageHeight / 4 + 4} className="funnel-conversion-rate">
                {p.conversion.toFixed(0)}%
              </text>
            </g>
          )}
        </g>
      ))}
      <text x={width / 2} y={totalHeight - 32} textAnchor="middle" className="funnel-total">
        {totalLabel}
      </text>
      <text x={width / 2} y={totalHeight - 8} textAnchor="middle" className="funnel-total-value">
        {totalConversion.toFixed(2).replace('.', ',')}%
      </text>
    </svg>
  );

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
      {rightPanel ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--s-xl)' }}>
          <div>{svg}</div>
          <div>{rightPanel}</div>
        </div>
      ) : svg}
    </>
  );

  if (!card) return inner;
  return <div className={cls}>{inner}</div>;
}
