// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · types
// Tipos compartilhados — IconName + variants
// ════════════════════════════════════════════════════════════════════

/**
 * Os 28 ícones do sprite oficial Fatax (Feather-inspired, custom).
 * Use via <Icon name="overview" /> ou diretamente <use href="#i-overview"/>.
 * Para qualquer ícone fora desta lista, use Lucide inline (regra híbrida — ver DESIGN.md §5).
 */
export type IconName =
  | 'overview' | 'mission' | 'strategy' | 'archetypes' | 'manifesto'
  | 'voice' | 'moodboard' | 'logo' | 'color' | 'typography'
  | 'iconography' | 'imagery' | 'illustrations' | 'motion' | 'audio'
  | 'tokens' | 'layout' | 'components' | 'inputs' | 'data'
  | 'editorial' | 'mockups' | 'social' | 'accessibility'
  | 'external' | 'search' | 'collapse';

/** Variantes semânticas de Pill, Alert, etc. */
export type SemanticVariant =
  | 'neutral' | 'orange' | 'cream'
  | 'success' | 'warning' | 'danger' | 'info';

/** Hierarquia de botão — uma primary por tela. Outline é mantido como alias light, sem estado vazado. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'light' | 'danger';

/** Tamanhos canônicos — sm 32px · md 40px · lg 48px (ghost 36px). */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Item de navegação no Sidebar. */
export interface NavItem {
  /** URL relativa ou absoluta. */
  href: string;
  /** Label visível. */
  label: string;
  /** Nome do ícone do sprite (28 disponíveis). */
  icon: IconName;
  /** Texto italic discreto à direita — ex: "wip", "novo", contador. */
  meta?: string;
}

/** Grupo de navegação no Sidebar. */
export interface NavGroup {
  /** Título do grupo (Inter italic 14, com linha à direita). */
  label: string;
  items: NavItem[];
}
