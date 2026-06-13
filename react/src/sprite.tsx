import type { ReactElement } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · FataxSprite
// SVG sprite com os 28 ícones oficiais Fatax (Feather-inspired, custom).
// Renderize UMA VEZ no topo da árvore (o <Sidebar/> já faz isso pra você).
// Depois, qualquer <Icon name="overview"/> ou <svg><use href="#i-overview"/></svg>
// referencia os símbolos por ID.
// ════════════════════════════════════════════════════════════════════

const COMMON = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/**
 * Sprite SVG contendo os 28 símbolos canônicos do Fatax.
 * Renderiza tamanho 0 e position absolute — não afeta layout.
 * O <Sidebar/> inclui automaticamente; use standalone só se for renderizar
 * ícones fora de um Sidebar.
 */
export function FataxSprite(): ReactElement {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="i-overview" viewBox="0 0 24 24" {...COMMON}>
          <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
        </symbol>
        <symbol id="i-mission" viewBox="0 0 24 24" {...COMMON}>
          <path d="M4 22V4" />
          <path d="M4 4h12l-2 4 2 4H4" />
        </symbol>
        <symbol id="i-strategy" viewBox="0 0 24 24" {...COMMON}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        </symbol>
        <symbol id="i-archetypes" viewBox="0 0 24 24" {...COMMON}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2 20a7 7 0 0 1 14 0" />
          <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
          <path d="M16 13a7 7 0 0 1 6 7" />
        </symbol>
        <symbol id="i-manifesto" viewBox="0 0 24 24" {...COMMON}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z" />
          <path d="M4 19.5V21h16" />
        </symbol>
        <symbol id="i-voice" viewBox="0 0 24 24" {...COMMON}>
          <path d="M11 5L6 9H3v6h3l5 4z" />
          <path d="M15.5 9a4 4 0 0 1 0 6" />
          <path d="M18.5 6a8 8 0 0 1 0 12" />
        </symbol>
        <symbol id="i-moodboard" viewBox="0 0 24 24" {...COMMON}>
          <rect x="3" y="7" width="14" height="14" rx="1.5" />
          <path d="M7 3h14v14" />
          <circle cx="8.5" cy="12" r="1.2" />
          <path d="M17 17l-4-4-4 4" />
        </symbol>
        <symbol id="i-logo" viewBox="0 0 24 24" {...COMMON}>
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <path d="M5.5 5.5l13 13" />
          <path d="M18.5 5.5l-13 13" />
        </symbol>
        <symbol id="i-color" viewBox="0 0 24 24" {...COMMON}>
          <path d="M12 3l6 8.5a6 6 0 1 1-12 0z" />
        </symbol>
        <symbol id="i-typography" viewBox="0 0 24 24" {...COMMON}>
          <path d="M4 20l6-16 6 16" />
          <path d="M6.5 14h7" />
          <path d="M17 20v-9" />
          <circle cx="20" cy="11" r="1.2" />
        </symbol>
        <symbol id="i-iconography" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <circle cx="5" cy="5" r="1.4" />
          <circle cx="12" cy="5" r="1.4" />
          <circle cx="19" cy="5" r="1.4" />
          <circle cx="5" cy="12" r="1.4" />
          <circle cx="12" cy="12" r="1.4" />
          <circle cx="19" cy="12" r="1.4" />
          <circle cx="5" cy="19" r="1.4" />
          <circle cx="12" cy="19" r="1.4" />
          <circle cx="19" cy="19" r="1.4" />
        </symbol>
        <symbol id="i-imagery" viewBox="0 0 24 24" {...COMMON}>
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <circle cx="8.5" cy="10" r="1.5" />
          <path d="M21 16l-5.5-5.5L7 19" />
        </symbol>
        <symbol id="i-illustrations" viewBox="0 0 24 24" {...COMMON}>
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="1.3" />
        </symbol>
        <symbol id="i-motion" viewBox="0 0 24 24" {...COMMON}>
          <path d="M3 12h3l3 8 6-16 3 8h3" />
        </symbol>
        <symbol id="i-audio" viewBox="0 0 24 24" {...COMMON}>
          <path d="M3 18v-6a9 9 0 1 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2z" />
          <path d="M3 19a2 2 0 0 0 2 2h1v-7H5a2 2 0 0 0-2 2z" />
        </symbol>
        <symbol id="i-tokens" viewBox="0 0 24 24" {...COMMON}>
          <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
          <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
        </symbol>
        <symbol id="i-layout" viewBox="0 0 24 24" {...COMMON}>
          <rect x="3" y="3" width="18" height="18" rx="1.5" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
        </symbol>
        <symbol id="i-components" viewBox="0 0 24 24" {...COMMON}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M3.3 7L12 12l8.7-5" />
          <path d="M12 22V12" />
        </symbol>
        <symbol id="i-inputs" viewBox="0 0 24 24" {...COMMON}>
          <rect x="3" y="7" width="18" height="10" rx="1.5" />
          <path d="M8 11v2" />
          <path d="M8 12h1.5" />
        </symbol>
        <symbol id="i-data" viewBox="0 0 24 24" {...COMMON}>
          <path d="M3 3v18h18" />
          <rect x="7" y="11" width="3" height="7" />
          <rect x="12.5" y="7" width="3" height="11" />
          <rect x="18" y="14" width="3" height="4" />
        </symbol>
        <symbol id="i-editorial" viewBox="0 0 24 24" {...COMMON}>
          <path d="M3 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H3z" />
          <path d="M21 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z" />
        </symbol>
        <symbol id="i-mockups" viewBox="0 0 24 24" {...COMMON}>
          <rect x="2" y="4" width="20" height="13" rx="1.5" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </symbol>
        <symbol id="i-social" viewBox="0 0 24 24" {...COMMON}>
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="M8.2 10.8l7.6-4.6" />
          <path d="M8.2 13.2l7.6 4.6" />
        </symbol>
        <symbol id="i-accessibility" viewBox="0 0 24 24" {...COMMON}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="7.5" r="1.2" fill="currentColor" />
          <path d="M8 11h8" />
          <path d="M12 11v3" />
          <path d="M9 18l3-4 3 4" />
        </symbol>
        <symbol id="i-external" viewBox="0 0 24 24" {...COMMON}>
          <path d="M14 3h7v7" />
          <path d="M10 14L21 3" />
          <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
        </symbol>
        <symbol id="i-search" viewBox="0 0 24 24" {...COMMON}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </symbol>
        <symbol id="i-collapse" viewBox="0 0 24 24" {...COMMON}>
          <path d="M15 6l-6 6 6 6" />
          <path d="M19 6v12" />
        </symbol>
      </defs>
    </svg>
  );
}
