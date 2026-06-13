import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Select / Dropdown
// Popover custom (não usa <select> nativo) com search inline quando >8
// itens. Single-value, controlled.
// ════════════════════════════════════════════════════════════════════

export interface SelectOption {
  value: string;
  label: ReactNode;
  /** Texto usado pela busca (default: label.toString()). */
  searchText?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Mostra search inline. Default: true se >8 opções, false caso contrário. */
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Selecionar…',
  searchable,
  searchPlaceholder = 'Buscar…',
  disabled,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const showSearch = searchable ?? options.length > 8;
  const selected = options.find((o) => o.value === value);

  const filtered = query
    ? options.filter((o) => {
        const txt = o.searchText ?? (typeof o.label === 'string' ? o.label : '');
        return txt.toLowerCase().includes(query.toLowerCase());
      })
    : options;

  // Click outside fecha popover
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Foca busca quando abre
  useEffect(() => {
    if (open && showSearch) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open, showSearch]);

  const handleSelect = (v: string) => {
    onChange(v);
    setOpen(false);
    setQuery('');
  };

  const cls = ['select', className].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={cls}>
      <button
        type="button"
        className="select-trigger"
        data-open={open}
        data-placeholder={!selected}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span>{selected?.label ?? placeholder}</span>
        <svg className="select-trigger-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="select-popover" role="listbox">
          {showSearch && (
            <div className="select-search">
              <input
                ref={searchRef}
                type="text"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setOpen(false);
                    setQuery('');
                  }
                }}
              />
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="select-option" style={{ opacity: 0.6 }}>
              Nada encontrado
            </div>
          ) : (
            filtered.map((opt) => (
              <div
                key={opt.value}
                className="select-option"
                role="option"
                aria-selected={opt.value === value}
                data-selected={opt.value === value}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
                style={opt.disabled ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
