import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · SectionHeader
// Cabeçalho editorial: eyebrow + h1 (com .accent + .dim opcional) +
// kicker + número-watermark gigante à direita.
// ════════════════════════════════════════════════════════════════════

export interface SectionHeaderProps {
  /** Eyebrow laranja em caps tracked (ex: "Logo System", "Color"). */
  eyebrow: string;
  /**
   * Título principal. Aceita ReactNode para permitir
   * <span className="accent">…</span> e <span className="dim">…</span>:
   *
   * @example
   * <SectionHeader title={<><span className="accent">Cor.</span> <span className="dim">Três camadas.</span></>} />
   */
  title: ReactNode;
  /** Parágrafo lede opcional abaixo do título. */
  kicker?: ReactNode;
  /** Número gigante "watermark" (ex: "08"). Renderiza à direita. */
  index?: string | number;
  /** Label de duas linhas abaixo do número (ex: "Logo\nSystem"). */
  rightLabel?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  kicker,
  index,
  rightLabel,
}: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div className="left">
        <div className="eyebrow">
          <span className="pip"></span>
          {eyebrow}
        </div>
        <h1>{title}</h1>
        {kicker && <p className="kicker">{kicker}</p>}
      </div>
      {(index !== undefined || rightLabel) && (
        <div className="right">
          {index !== undefined && <div className="big">{index}</div>}
          {rightLabel}
        </div>
      )}
    </header>
  );
}
