import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Input
// 40px height · surface-sunken bg · border vira laranja no focus.
// Suporta label, helper text e estado de erro.
// ════════════════════════════════════════════════════════════════════

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  /** Label uppercase tracked (Inter 11/700) acima do campo. */
  label?: ReactNode;
  /** Texto auxiliar abaixo do campo. */
  help?: ReactNode;
  /** Estado de erro — borda vermelha + help em danger. */
  error?: boolean | string;
  /** Classes adicionais no <input>. */
  className?: string;
  /** Classes adicionais no wrapper .input-group. */
  groupClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, help, error, className, groupClassName, id, ...rest },
  ref
) {
  const generatedId = id || `fx-input-${Math.random().toString(36).slice(2, 8)}`;
  const errorText = typeof error === 'string' ? error : undefined;
  const helpText = errorText || help;
  const inputCls = ['input', error ? 'is-error' : null, className].filter(Boolean).join(' ');
  const groupCls = ['input-group', groupClassName].filter(Boolean).join(' ');
  const helpCls = ['input-help', error ? 'is-error' : null].filter(Boolean).join(' ');

  return (
    <div className={groupCls}>
      {label && (
        <label className="input-label" htmlFor={generatedId}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={generatedId}
        className={inputCls}
        aria-invalid={error ? true : undefined}
        aria-describedby={helpText ? `${generatedId}-help` : undefined}
        {...rest}
      />
      {helpText && (
        <span id={`${generatedId}-help`} className={helpCls}>
          {helpText}
        </span>
      )}
    </div>
  );
});
