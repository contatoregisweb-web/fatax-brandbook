import type { CSSProperties } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Skeleton
// Placeholder shimmer (1.4s linear) pra estados de loading.
// 3 shapes: rect (default) · text · circle.
// Respeita prefers-reduced-motion (animação desligada).
// ════════════════════════════════════════════════════════════════════

export interface SkeletonProps {
  /** Largura (CSS units). Default: 100%. */
  width?: number | string;
  /** Altura (CSS units). Default: depende do shape. */
  height?: number | string;
  /** Forma. Default: 'rect' (radius xs). */
  shape?: 'rect' | 'text' | 'circle';
  /** Quantas linhas (para shape="text"). Default: 1. */
  lines?: number;
  className?: string;
  style?: CSSProperties;
}

const toCss = (v: number | string | undefined): string | undefined =>
  v === undefined ? undefined : (typeof v === 'number' ? `${v}px` : v);

export function Skeleton({
  width,
  height,
  shape = 'rect',
  lines = 1,
  className,
  style,
}: SkeletonProps) {
  const cls = ['skeleton', className].filter(Boolean).join(' ');

  // shape="text" + lines > 1: gera N skeletons com larguras variadas
  if (shape === 'text' && lines > 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Array.from({ length: lines }).map((_, i) => {
          const isLast = i === lines - 1;
          const w = isLast ? '60%' : '90%';
          return (
            <span
              key={i}
              className={cls}
              data-shape="text"
              style={{ width: w, ...style }}
              aria-hidden="true"
            />
          );
        })}
      </div>
    );
  }

  return (
    <span
      className={cls}
      data-shape={shape}
      aria-hidden="true"
      style={{
        width: toCss(width) ?? '100%',
        height: toCss(height) ?? (shape === 'text' ? '14px' : shape === 'circle' ? '40px' : '20px'),
        ...style,
      }}
    />
  );
}
