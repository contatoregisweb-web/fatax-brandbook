import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Toggle (switch)
// 44×24px, brand-orange quando ON. Componente controlado.
// ════════════════════════════════════════════════════════════════════

export interface ToggleProps {
  /** Estado on/off (controlado). */
  checked: boolean;
  /** Callback ao alternar. */
  onChange: (next: boolean) => void;
  /** Label à direita do track. */
  label?: ReactNode;
  /** Desabilita interação. */
  disabled?: boolean;
  /** aria-label se não houver label visível. */
  ariaLabel?: string;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
  ariaLabel,
  className,
}: ToggleProps) {
  const cls = ['toggle', className].filter(Boolean).join(' ');
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      className={cls}
      data-on={checked}
      onClick={() => !disabled && onChange(!checked)}
    >
      <span className="toggle-track" aria-hidden="true"></span>
      {label && <span className="toggle-label">{label}</span>}
    </button>
  );
}
