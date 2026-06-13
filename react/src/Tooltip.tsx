import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Tooltip
// Cream + black, mono 11px. 4 placements (top/bottom/left/right).
// Aparece no hover/focus do trigger, esconde no mouseleave/blur.
// Distinto do tooltip flyout do Sidebar (que tem outro estilo).
// ════════════════════════════════════════════════════════════════════

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Texto do tooltip. */
  label: ReactNode;
  /** Elemento alvo (envolvido pelo wrapper). */
  children: ReactNode;
  /** Lado relativo ao trigger. Default: 'top'. */
  placement?: TooltipPlacement;
  /** Delay em ms antes de mostrar. Default: 200. */
  delay?: number;
  /** Disabilita o tooltip (mostra só os children). */
  disabled?: boolean;
  className?: string;
}

export function Tooltip({
  label,
  children,
  placement = 'top',
  delay = 200,
  disabled,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  if (disabled) return <>{children}</>;

  const show = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setVisible(false);
  };

  const cls = ['tooltip-wrap', className].filter(Boolean).join(' ');

  return (
    <span
      className={cls}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <span
        role="tooltip"
        className="tooltip"
        data-placement={placement}
        data-visible={visible}
      >
        {label}
      </span>
    </span>
  );
}
