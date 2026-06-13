import type { HTMLAttributes, ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Card
// Container surface + radius md + padding xl. Sem sombra (Fatax usa
// contraste de surface, nunca box-shadow para elevação).
// ════════════════════════════════════════════════════════════════════

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Título opcional, renderizado como h4 italic (label editorial). */
  title?: ReactNode;
  children: ReactNode;
}

export function Card({ title, children, className, ...rest }: CardProps) {
  const cls = ['card', className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {title && <h4>{title}</h4>}
      {children}
    </div>
  );
}
