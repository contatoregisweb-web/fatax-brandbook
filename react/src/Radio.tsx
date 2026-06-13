import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Radio + RadioGroup
// Seleção única, mutuamente exclusiva. Sempre use em grupo de 2+ opções.
// Para 1 opção on/off, use <Checkbox> ou <Toggle>.
// ════════════════════════════════════════════════════════════════════

export interface RadioOption<T extends string = string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string = string> {
  options: RadioOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  /** Layout. Default: column. */
  direction?: 'column' | 'row';
  /** Nome do grupo (vira `name` HTML — útil em forms). */
  name?: string;
  /** Label do grupo todo (renderiza um <fieldset>/<legend>). */
  legend?: ReactNode;
  className?: string;
}

export function RadioGroup<T extends string = string>({
  options,
  value,
  onChange,
  direction = 'column',
  name,
  legend,
  className,
}: RadioGroupProps<T>) {
  const cls = ['radio-group', className].filter(Boolean).join(' ');
  const inner = options.map((opt) => (
    <button
      key={opt.value}
      type="button"
      role="radio"
      name={name}
      aria-checked={opt.value === value}
      aria-disabled={opt.disabled}
      disabled={opt.disabled}
      className="radio"
      data-on={opt.value === value}
      onClick={() => !opt.disabled && onChange(opt.value)}
    >
      <span className="radio-box" aria-hidden="true"></span>
      <span className="radio-label">{opt.label}</span>
    </button>
  ));

  if (legend) {
    return (
      <fieldset className={cls} data-direction={direction} role="radiogroup" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="input-label" style={{ marginBottom: 'var(--s-sm)' }}>{legend}</legend>
        {inner}
      </fieldset>
    );
  }

  return (
    <div className={cls} data-direction={direction} role="radiogroup">
      {inner}
    </div>
  );
}
