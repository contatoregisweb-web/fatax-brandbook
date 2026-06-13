import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { Button } from './Button';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Modal
// Overlay surface-overlay (preto 85%) + dialog surface radius-lg.
// Focus trap básico, Escape fecha, click no backdrop fecha (opcional).
// Renderiza via portal no <body>.
// ════════════════════════════════════════════════════════════════════

export interface ModalProps {
  /** Controla visibilidade. */
  open: boolean;
  /** Callback ao fechar (Escape, backdrop click, ou close action). */
  onClose: () => void;
  /** Título — renderizado em Syne 20px. */
  title?: ReactNode;
  /** Conteúdo do body. */
  children: ReactNode;
  /** Ações (botões) no rodapé. Geralmente <Button> components. */
  actions?: ReactNode;
  /** Fechar ao clicar no backdrop. Default: true. */
  dismissOnBackdrop?: boolean;
  /** Fechar ao pressionar Escape. Default: true. */
  dismissOnEscape?: boolean;
  /** Para modais destrutivos: passa um pill no header. */
  badge?: ReactNode;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  dismissOnBackdrop = true,
  dismissOnEscape = true,
  badge,
  className,
}: ModalProps) {
  // Escape handler
  useEffect(() => {
    if (!open || !dismissOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, dismissOnEscape, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const cls = ['modal', className].filter(Boolean).join(' ');

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={dismissOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <div
        className={cls}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'fx-modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {badge && <div style={{ alignSelf: 'flex-start' }}>{badge}</div>}
        {title && <h4 id="fx-modal-title" className="modal-title">{title}</h4>}
        <div className="modal-body">{children}</div>
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>,
    document.body
  );
}

// Convenience: confirmation modal preset
export interface ConfirmModalProps extends Omit<ModalProps, 'children' | 'actions'> {
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  /** Variante do botão de confirmação. Default: 'danger'. */
  confirmVariant?: 'primary' | 'danger';
}

export function ConfirmModal({
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  confirmVariant = 'danger',
  onClose,
  ...modalProps
}: ConfirmModalProps) {
  return (
    <Modal
      onClose={onClose}
      {...modalProps}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>{cancelLabel}</Button>
          <Button variant={confirmVariant} onClick={() => { onConfirm(); onClose(); }}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {message}
    </Modal>
  );
}
