import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Stat (KPI block)
// Número-protagonista em mono 40px laranja + label italic + descrição.
// Para múltiplas métricas, use em grid (display:grid; gap: var(--s-md)).
// ════════════════════════════════════════════════════════════════════

export interface StatProps {
  /** Label curto em italic (ex: "MRR", "Pipeline"). */
  label: ReactNode;
  /** Valor — automaticamente em JetBrains Mono 40px laranja. */
  value: ReactNode;
  /** Descrição opcional abaixo do valor. */
  description?: ReactNode;
  className?: string;
}

export function Stat({ label, value, description, className }: StatProps) {
  const cls = ['stat', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <div className="num">{value}</div>
      <div className="label">{label}</div>
      {description && <div className="desc">{description}</div>}
    </div>
  );
}
