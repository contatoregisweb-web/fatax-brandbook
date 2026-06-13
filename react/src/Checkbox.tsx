import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Checkbox
// 18×18px, brand-orange + check branco quando ON. Componente controlado.
// ════════════════════════════════════════════════════════════════════

export interface CheckboxProps {
  /** Estado on/off (controlado). */
  checked: boolean;
  /** Callback ao alternar. */
  onChange: (next: boolean) => void;
  /** Label à direita do box. */
  label?: ReactNode;
  /** Desabilita interação. */
  disabled?: boolean;
  /** aria-label se não houver label visível. */
  ariaLabel?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  ariaLabel,
  className,
}: CheckboxProps) {
  const cls = ['checkbox', className].filter(Boolean).join(' ');
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      className={cls}
      data-on={checked}
      onClick={() => !disabled && onChange(!checked)}
    >
      <span className="checkbox-box" aria-hidden="true"></span>
      {label && <span className="checkbox-label">{label}</span>}
    </button>
  );
}
