import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Topbar
// Barra superior 48px sticky com crumbs + meta opcional à direita.
// ════════════════════════════════════════════════════════════════════

export interface TopbarProps {
  /**
   * Sequência de crumbs (último vira .here em cream).
   * Ex: ['App', 'Clientes', 'Almeida & Cia']
   */
  crumbs: string[];
  /** Conteúdo opcional à direita (período, status, etc). */
  meta?: ReactNode;
}

export function Topbar({ crumbs, meta }: TopbarProps) {
  const lastIdx = crumbs.length - 1;
  return (
    <div className="topbar">
      <span className="crumbs">
        {crumbs.map((c, i) => (
          <span key={i}>
            <span className={i === lastIdx ? 'here' : undefined}>{c}</span>
            {i < lastIdx && <span className="sep" style={{ margin: '0 8px' }}>/</span>}
          </span>
        ))}
      </span>
      <span className="spacer"></span>
      {meta && <span className="meta">{meta}</span>}
    </div>
  );
}
