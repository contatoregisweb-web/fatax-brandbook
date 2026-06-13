import type { CSSProperties, ReactElement } from 'react';
import type { IconName } from './types';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Icon
// Renderiza um ícone do sprite Fatax. Requer <FataxSprite/> em algum
// lugar acima na árvore (o <Sidebar/> já inclui).
// Para ícones fora dos 28 do sprite, use <svg> inline com Lucide
// (ver DESIGN.md §5 — regra híbrida).
// ════════════════════════════════════════════════════════════════════

export interface IconProps {
  /** Nome do ícone (um dos 28 disponíveis no sprite). */
  name: IconName;
  /** Tamanho em px. Padrão: 16. Canônicos: 14 (sm), 16 (default), 18-20 (lg), 20-24 (hero). */
  size?: number;
  /** Classe adicional. Cor herda via `currentColor` — controle via cor do pai. */
  className?: string;
  /** Style inline (use com moderação). */
  style?: CSSProperties;
  /** aria-label se o ícone for standalone (sem texto adjacente). */
  ariaLabel?: string;
}

export function Icon({
  name,
  size = 16,
  className,
  style,
  ariaLabel,
}: IconProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      style={style}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
    >
      <use href={`#i-${name}`} />
    </svg>
  );
}
