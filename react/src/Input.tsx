import { forwardRef } from 'react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Input
// 40px height · surface-sunken bg · border vira laranja no focus.
// Suporta label, helper text e estado de erro.
// ════════════════════════════════════════════════════════════════════

export type InputFormat = 'cnpj' | 'currency-brl';

function onlyDigits(value: unknown) {
  return String(value ?? '').replace(/\D/g, '');
}

export function formatCNPJ(value: unknown) {
  const digits = onlyDigits(value).slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

export function formatCurrencyBRL(value: unknown) {
  const digits = onlyDigits(value);
  if (!digits) return '';
  const amount = Number(digits) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

function applyInputFormat(format: InputFormat, value: unknown) {
  if (format === 'cnpj') return formatCNPJ(value);
  return formatCurrencyBRL(value);
}

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
  /** Formatação automática de exibição. Aceita dígitos e mostra CNPJ ou BRL. */
  format?: InputFormat;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, help, error, className, groupClassName, id, format, onChange, value, defaultValue, type, inputMode, ...rest },
  ref
) {
  const generatedId = id || `fx-input-${Math.random().toString(36).slice(2, 8)}`;
  const errorText = typeof error === 'string' ? error : undefined;
  const helpText = errorText || help;
  const inputCls = ['input', error ? 'is-error' : null, className].filter(Boolean).join(' ');
  const groupCls = ['input-group', groupClassName].filter(Boolean).join(' ');
  const helpCls = ['input-help', error ? 'is-error' : null].filter(Boolean).join(' ');
  const formattedValue = value !== undefined && format ? applyInputFormat(format, value) : value;
  const formattedDefaultValue = value === undefined && defaultValue !== undefined
    ? (format ? applyInputFormat(format, defaultValue) : defaultValue)
    : undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (format) {
      event.currentTarget.value = String(applyInputFormat(format, event.currentTarget.value));
    }
    onChange?.(event);
  };

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
        type={format ? 'text' : type}
        inputMode={format ? inputMode ?? 'numeric' : inputMode}
        value={formattedValue}
        defaultValue={formattedDefaultValue}
        onChange={handleChange}
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
