import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariant, ButtonSize } from './types';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Button
// Regras inegociáveis embutidas:
//   · white-space: nowrap (via CSS .btn) — texto nunca quebra
//   · texto branco sobre laranja (variant primary)
//   · UMA primary por tela (responsabilidade do dev — não dá pra forçar)
// ════════════════════════════════════════════════════════════════════

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /** Hierarquia visual. Use 'primary' UMA vez por tela. */
  variant?: ButtonVariant;
  /** Tamanho. sm 32px · md 40px (padrão) · lg 48px (ghost: 36px). */
  size?: ButtonSize;
  /** Ícone à esquerda do label. Use <Icon/> ou SVG inline 14×14. */
  iconLeft?: ReactNode;
  /** Ícone à direita do label. */
  iconRight?: ReactNode;
  children: ReactNode;
  /** Classes adicionais (use só quando absolutamente necessário). */
  className?: string;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  outline: 'btn-light',
  light: 'btn-light',
  danger: 'btn-danger',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  iconLeft,
  iconRight,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const cls = ['btn', VARIANT_CLASS[variant], SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(' ');
  return (
    <button type={type} className={cls} {...rest}>
      {iconLeft && <span className="ico">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ico">{iconRight}</span>}
    </button>
  );
}
