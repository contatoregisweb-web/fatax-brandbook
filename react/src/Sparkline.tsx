import { useMemo } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Sparkline
// Linha laranja sólida + gradient fill opcional. Sem grid, sem labels.
// Apenas tendência. SVG puro, sem deps.
// ════════════════════════════════════════════════════════════════════

export interface SparklineProps {
  /** Série de valores numéricos. */
  data: number[];
  /** Largura interna do viewBox. Default: 280. */
  width?: number;
  /** Altura interna do viewBox. Default: 60. */
  height?: number;
  /** Mostra área preenchida abaixo da linha. Default: true. */
  showArea?: boolean;
  /** Label superior em label-caps mono. */
  label?: string;
  /** Wrapper em card surface. Default: true. */
  card?: boolean;
  className?: string;
}

export function Sparkline({
  data,
  width = 280,
  height = 60,
  showArea = true,
  label,
  card = true,
  className,
}: SparklineProps) {
  const gradientId = useMemo(
    () => `fx-sparkline-grad-${Math.random().toString(36).slice(2, 8)}`,
    []
  );

  if (data.length < 2) {
    return (
      <div className={card ? 'sparkline-card' : undefined}>
        {label && <div className="sparkline-label">{label}</div>}
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>Sem dados</div>
      </div>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 4;

  const stepX = (width - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (height - pad * 2) * (1 - (v - min) / range);
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const areaPath =
    `M ${points[0].x} ${height} ` +
    points.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
    ` L ${points[points.length - 1].x} ${height} Z`;

  const cls = ['sparkline', className].filter(Boolean).join(' ');

  const svg = (
    <svg className={cls} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ height: `${height}px` }}>
      {showArea && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-orange)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--brand-orange)" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {showArea && <path className="sparkline-area" d={areaPath} fill={`url(#${gradientId})`} />}
      <path className="sparkline-line" d={linePath} fill="none" stroke="var(--brand-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (!card) return label ? <><div className="sparkline-label">{label}</div>{svg}</> : svg;

  return (
    <div className="sparkline-card">
      {label && <div className="sparkline-label">{label}</div>}
      {svg}
    </div>
  );
}
