import type { ReactNode } from 'react';
import type { SemanticVariant } from './types';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Pill / Badge
// 7 variantes semânticas: neutral · orange · cream · success · warning · danger · info
// Height 22px · radius 4px · uppercase label-caps. Não tem outra opção.
// ════════════════════════════════════════════════════════════════════

export interface PillProps {
  variant?: SemanticVariant;
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASS: Record<SemanticVariant, string> = {
  neutral: '',
  orange: 'orange',
  cream: 'cream',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
};

export function Pill({ variant = 'neutral', children, className }: PillProps) {
  const cls = ['pill', VARIANT_CLASS[variant], className].filter(Boolean).join(' ');
  return <span className={cls}>{children}</span>;
}
