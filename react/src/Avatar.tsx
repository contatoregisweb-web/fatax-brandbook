import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Avatar + AvatarStack
// 3 tamanhos (sm 24px · md 32px · lg 48px), 3 tons (orange-soft default
// · cream · neutral). Suporta iniciais (string), número, ou <img>.
// ════════════════════════════════════════════════════════════════════

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarTone = 'orange' | 'cream' | 'neutral';

export interface AvatarProps {
  /** Iniciais (2 letras), número (+8), ou ReactNode (ex: <img/>). */
  children?: ReactNode;
  /** URL de imagem (atalho — usa <img> internamente). */
  src?: string;
  /** alt da imagem (default: ""). */
  alt?: string;
  size?: AvatarSize;
  /** Tom de fundo. Default: 'orange' (brand-orange-soft + brand-orange text). */
  tone?: AvatarTone;
  className?: string;
}

export function Avatar({
  children,
  src,
  alt = '',
  size = 'md',
  tone = 'orange',
  className,
}: AvatarProps) {
  const cls = ['avatar', className].filter(Boolean).join(' ');
  const sizeAttr = size === 'md' ? undefined : size;
  return (
    <span className={cls} data-size={sizeAttr} data-tone={tone === 'orange' ? undefined : tone}>
      {src ? <img src={src} alt={alt} /> : children}
    </span>
  );
}

export interface AvatarStackProps {
  children: ReactNode;
  className?: string;
}

/** Empilha avatares com overlap negativo (-8px) + border que combina com o pai. */
export function AvatarStack({ children, className }: AvatarStackProps) {
  const cls = ['avatar-stack', className].filter(Boolean).join(' ');
  return <span className={cls}>{children}</span>;
}
