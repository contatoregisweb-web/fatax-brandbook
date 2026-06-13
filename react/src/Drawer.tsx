import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Drawer
// Painel lateral (right ou left) com backdrop + slide animation.
// Use pra filtros, detalhes contextuais, formulários secundários.
// Pra confirmações, prefira <Modal> (centrado).
// ════════════════════════════════════════════════════════════════════

export interface DrawerProps {
  /** Controla visibilidade. */
  open: boolean;
  /** Callback ao fechar (Escape, backdrop, close button). */
  onClose: () => void;
  /** Lado que desliza. Default: 'right'. */
  side?: 'right' | 'left';
  /** Título no header. */
  title?: ReactNode;
  /** Conteúdo do body (scrollable). */
  children: ReactNode;
  /** Ações no rodapé (geralmente botões). */
  footer?: ReactNode;
  /** Fechar ao clicar no backdrop. Default: true. */
  dismissOnBackdrop?: boolean;
  /** Largura customizada. Default: 420px (definido no CSS). */
  width?: number | string;
  className?: string;
}

export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  dismissOnBackdrop = true,
  width,
  className,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const cls = ['drawer', className].filter(Boolean).join(' ');
  const style = width ? { width: typeof width === 'number' ? `${width}px` : width } : undefined;

  return createPortal(
    <>
      <div
        className="drawer-backdrop"
        onClick={dismissOnBackdrop ? onClose : undefined}
        role="presentation"
      />
      <aside
        className={cls}
        data-side={side}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'fx-drawer-title' : undefined}
        style={style}
      >
        <header className="drawer-head">
          {title && <span id="fx-drawer-title" className="drawer-title">{title}</span>}
          <button
            type="button"
            className="drawer-close"
            aria-label="Fechar"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>
        <div className="drawer-body">{children}</div>
        {footer && <div className="drawer-foot">{footer}</div>}
      </aside>
    </>,
    document.body
  );
}
