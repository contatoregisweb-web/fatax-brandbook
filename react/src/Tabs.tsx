import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Tabs
// Underline laranja, transição 200ms. Modo controlado ou uncontrolled.
// ════════════════════════════════════════════════════════════════════

export interface TabItem {
  /** ID único da tab — usado como value. */
  id: string;
  /** Label visível. */
  label: ReactNode;
  /** Conteúdo opcional do painel (se você quer que Tabs renderize). */
  content?: ReactNode;
  /** Desabilita a tab. */
  disabled?: boolean;
}

export interface TabsProps {
  /** Tabs disponíveis. */
  items: TabItem[];
  /** ID da tab ativa (modo controlado). */
  value?: string;
  /** Callback ao trocar (modo controlado). */
  onChange?: (id: string) => void;
  /** ID inicial (modo uncontrolled). Default: primeira tab. */
  defaultValue?: string;
  /** Se true, renderiza o `.content` da tab ativa abaixo das tabs. Default: false. */
  renderContent?: boolean;
  className?: string;
}

export function Tabs({
  items,
  value: controlledValue,
  onChange,
  defaultValue,
  renderContent = false,
  className,
}: TabsProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items[0]?.id ?? ''
  );
  const value = isControlled ? controlledValue : internalValue;

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleClick = (id: string) => {
    if (!isControlled) setInternalValue(id);
    onChange?.(id);
  };

  // Keyboard nav: ←/→ entre tabs, Home/End
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const enabled = items
      .map((it, i) => ({ it, i }))
      .filter(({ it }) => !it.disabled);
    const currentIdx = enabled.findIndex(({ i }) => i === idx);
    let nextIdx = currentIdx;
    if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % enabled.length;
    else if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = enabled.length - 1;
    else return;
    e.preventDefault();
    const targetIdx = enabled[nextIdx].i;
    tabRefs.current[targetIdx]?.focus();
    handleClick(items[targetIdx].id);
  };

  useEffect(() => {
    // Reset tab ref array on items change
    tabRefs.current = tabRefs.current.slice(0, items.length);
  }, [items.length]);

  const activeItem = items.find((it) => it.id === value);

  return (
    <div className={className}>
      <div className="tabs" role="tablist">
        {items.map((item, idx) => {
          const isActive = item.id === value;
          return (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[idx] = el; }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`fx-tabpanel-${item.id}`}
              id={`fx-tab-${item.id}`}
              type="button"
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              className={isActive ? 'tab is-active' : 'tab'}
              onClick={() => !item.disabled && handleClick(item.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {renderContent && activeItem?.content && (
        <div
          role="tabpanel"
          id={`fx-tabpanel-${activeItem.id}`}
          aria-labelledby={`fx-tab-${activeItem.id}`}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
