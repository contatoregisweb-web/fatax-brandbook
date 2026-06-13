// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · PoweredBy
// Lockup oficial endossante. OBRIGATÓRIO em todo sistema powered-by-Fatax.
// Já vem embutido no <Sidebar/>; use standalone só em contextos sem
// sidebar (ex: footer de landing).
// ════════════════════════════════════════════════════════════════════

export interface PoweredByProps {
  /** URL da home Fatax. Padrão: https://fatax.com.br */
  href?: string;
  /** Caminho do mark cream SVG. Padrão: assume node_modules layout. */
  markSrc?: string;
}

export function PoweredBy({
  href = 'https://fatax.com.br',
  markSrc = '/node_modules/@fatax/design-system/assets/logo/logo-fatax-mark-cream.svg',
}: PoweredByProps = {}) {
  return (
    <a
      className="sidebar-foot poweredby"
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Powered by Fatax Growth"
    >
      <img className="poweredby-mark" src={markSrc} alt="" />
      <div className="poweredby-text">
        <span className="poweredby-eyebrow">Powered by</span>
        <span className="poweredby-title">
          Fatax <em>Growth</em>
        </span>
      </div>
    </a>
  );
}
