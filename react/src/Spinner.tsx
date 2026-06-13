import type { CSSProperties } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Spinner
// SVG rotativo (1s linear infinite) em brand-orange por padrão.
// Use pra ações em andamento (sincronizando, carregando, etc).
// Respeita prefers-reduced-motion (rotação desligada, opacidade reduzida).
// ════════════════════════════════════════════════════════════════════

export interface SpinnerProps {
  /** Tamanho em px. Default: 16. */
  size?: number;
  /** Cor (herda via currentColor se omitido). */
  color?: string;
  /** aria-label (default: "Carregando"). */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export function Spinner({
  size = 16,
  color,
  ariaLabel = 'Carregando',
  className,
  style,
}: SpinnerProps) {
  const cls = ['spinner', className].filter(Boolean).join(' ');
  return (
    <svg
      className={cls}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={ariaLabel}
      style={{ color, ...style }}
    >
      <circle cx="12" cy="12" r="10" className="spinner-track" strokeWidth="2.4" />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        className="spinner-head"
        strokeWidth="2.4"
        fill="none"
      />
    </svg>
  );
}
