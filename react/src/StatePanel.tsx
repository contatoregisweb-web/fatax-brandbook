import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · EmptyState + ErrorState
// "Nada por aqui" + "Falha ao carregar". Mesma anatomia, semântica
// diferente. Use <EmptyState> quando não há dados; <ErrorState> quando
// há dados mas a operação falhou.
// ════════════════════════════════════════════════════════════════════

interface BaseProps {
  /** Ícone circular. Default depende do componente. */
  icon?: ReactNode;
  /** Título em destaque. */
  title: ReactNode;
  /** Corpo descritivo. */
  children?: ReactNode;
  /** Botão(s) de ação — geralmente <Button>. */
  actions?: ReactNode;
  className?: string;
}

const ICON_EMPTY = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const ICON_ERROR = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

export interface EmptyStateProps extends BaseProps {}

export function EmptyState({ icon, title, children, actions, className }: EmptyStateProps) {
  const cls = ['state-panel', className].filter(Boolean).join(' ');
  return (
    <div className={cls} data-variant="empty">
      <span className="state-panel-icon">{icon ?? ICON_EMPTY}</span>
      <span className="state-panel-title">{title}</span>
      {children && <span className="state-panel-body">{children}</span>}
      {actions && <div className="state-panel-actions">{actions}</div>}
    </div>
  );
}

export interface ErrorStateProps extends BaseProps {}

export function ErrorState({ icon, title, children, actions, className }: ErrorStateProps) {
  const cls = ['state-panel', className].filter(Boolean).join(' ');
  return (
    <div className={cls} data-variant="error" role="alert">
      <span className="state-panel-icon">{icon ?? ICON_ERROR}</span>
      <span className="state-panel-title">{title}</span>
      {children && <span className="state-panel-body">{children}</span>}
      {actions && <div className="state-panel-actions">{actions}</div>}
    </div>
  );
}
