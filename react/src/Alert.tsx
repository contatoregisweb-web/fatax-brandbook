import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Alert
// 5 variantes: info · success · warning · danger · brand
// Padrão: fundo *-soft + texto na cor da variante.
// Ícone à esquerda, título opcional, body em texto menor.
// ════════════════════════════════════════════════════════════════════

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'brand';

export interface AlertProps {
  variant?: AlertVariant;
  /** Título opcional em bold. */
  title?: ReactNode;
  /** Corpo (mensagem principal). */
  children: ReactNode;
  /** Ícone à esquerda. Se omitido, usa o ícone default da variante. */
  icon?: ReactNode;
  /** Esconde o ícone default. */
  hideIcon?: boolean;
  className?: string;
}

// SVG paths dos ícones default por variante (Feather-style)
const DEFAULT_ICONS: Record<AlertVariant, ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  danger: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </svg>
  ),
  brand: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
};

export function Alert({
  variant = 'info',
  title,
  children,
  icon,
  hideIcon,
  className,
}: AlertProps) {
  const cls = ['alert', `alert-${variant}`, className].filter(Boolean).join(' ');
  return (
    <div className={cls} role={variant === 'danger' || variant === 'warning' ? 'alert' : 'status'}>
      {!hideIcon && <span className="alert-icon">{icon ?? DEFAULT_ICONS[variant]}</span>}
      <div className="alert-content">
        {title && <strong className="alert-title">{title}</strong>}
        <span className="alert-body">{children}</span>
      </div>
    </div>
  );
}
