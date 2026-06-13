import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import type { NavGroup } from './types';
import { FataxSprite } from './sprite';
import { Icon } from './Icon';
import { PoweredBy } from './PoweredBy';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Sidebar
// App shell completo com brand morph, collapse persistente, search,
// nav, tooltip flyout e o lockup "Powered by Fatax Growth" embutido
// (não dá pra remover — é obrigatório).
//
// Comportamentos prontos:
//   · Restaura estado collapsed do localStorage antes do paint
//   · "·" alterna · ⌘K / Ctrl+K foca busca (expande se preciso)
//   · Marca o link ativo via comparação de href com window.location
//   · Renderiza o sprite SVG (28 ícones) uma vez no topo
// ════════════════════════════════════════════════════════════════════

const LS_KEY = 'fatax.sidebar.collapsed';

export interface SidebarProps {
  /** Grupos de navegação. */
  groups: NavGroup[];
  /** Href do brand (clique no logo). Padrão: "/". */
  brandHref?: string;
  /** Mostrar campo de busca. Padrão: true. */
  searchEnabled?: boolean;
  /** Placeholder do campo de busca. Padrão: "Buscar…". */
  searchPlaceholder?: string;
  /** Callback ao digitar na busca (você implementa o autocomplete). */
  onSearch?: (query: string) => void;
  /** URL da Fatax no lockup. Padrão: https://fatax.com.br */
  poweredByHref?: string;
  /** Caminho do mark cream SVG. */
  markSrc?: string;
}

// Apply persisted state synchronously (before React mounts) to avoid flash.
// Call this at the top of your entry file, BEFORE ReactDOM.render.
export function applySidebarStateEarly(): void {
  try {
    const collapsed = localStorage.getItem(LS_KEY) === '1';
    document.documentElement.classList.add('sidebar-no-transition');
    if (collapsed) document.documentElement.dataset.sidebar = 'collapsed';
  } catch (_) { /* noop */ }
}

export function Sidebar({
  groups,
  brandHref = '/',
  searchEnabled = true,
  searchPlaceholder = 'Buscar…',
  onSearch,
  poweredByHref,
  markSrc,
}: SidebarProps): ReactElement {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try { return localStorage.getItem(LS_KEY) === '1'; } catch { return false; }
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Persist + apply to <html data-sidebar>
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (collapsed) document.documentElement.dataset.sidebar = 'collapsed';
    else delete document.documentElement.dataset.sidebar;
    try { localStorage.setItem(LS_KEY, collapsed ? '1' : '0'); } catch { /* noop */ }
  }, [collapsed]);

  // Re-enable transitions on next frame (avoid initial flash)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('sidebar-no-transition');
      });
    });
  }, []);

  // Keyboard: "·" toggles · ⌘K / Ctrl+K focuses search
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      const inField = tag && ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag);

      if (e.key === '.' && !e.metaKey && !e.ctrlKey && !e.altKey && !inField) {
        e.preventDefault();
        setCollapsed((c) => !c);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCollapsed(false);
        setTimeout(() => inputRef.current?.focus(), 60);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Active link detection
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const currentFile = currentPath.split('/').pop() || '';
  const isActive = (href: string) =>
    href === currentPath || (!!currentFile && href.endsWith(currentFile));

  return (
    <>
      <FataxSprite />
      <aside className="sidebar" data-sidebar-root>
        <div className="sidebar-scroll">

          <header className="sidebar-head">
            <a className="sidebar-brand" href={brandHref} aria-label="Início">
              <BrandSvg />
            </a>
            <button
              className="sidebar-collapse"
              type="button"
              aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
              title={`${collapsed ? 'Expandir' : 'Recolher'} menu (·)`}
              onClick={() => setCollapsed((c) => !c)}
            >
              <Icon name="collapse" size={16} />
            </button>
          </header>

          {searchEnabled && (
            <div
              className="sidebar-search"
              data-search-root
              onClick={() => {
                if (collapsed) {
                  setCollapsed(false);
                  setTimeout(() => inputRef.current?.focus(), 220);
                }
              }}
            >
              <div className="sidebar-search-field">
                <Icon name="search" size={13} className="search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  aria-label="Buscar"
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(e) => onSearch?.(e.target.value)}
                />
                <kbd>⌘K</kbd>
              </div>
            </div>
          )}

          <nav className="sidebar-nav" aria-label="Navegação principal">
            {groups.map((group, gi) => (
              <div className="nav-group" key={gi}>
                <h4>{group.label}</h4>
                <ul>
                  {group.items.map((item, ii) => (
                    <li key={ii}>
                      <a
                        href={item.href}
                        data-tooltip={item.label}
                        className={isActive(item.href) ? 'active' : undefined}
                      >
                        <span className="nav-ico">
                          <Icon name={item.icon} size={16} />
                        </span>
                        <span className="label-text">{item.label}</span>
                        {item.meta && <span className="meta">{item.meta}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <PoweredBy href={poweredByHref} markSrc={markSrc} />
        </div>
      </aside>
    </>
  );
}

// ── Brand wordmark SVG (FATA + X com morph no colapso) ───────────────
function BrandSvg() {
  return (
    <svg
      className="brand-svg"
      viewBox="0 0 626 84"
      preserveAspectRatio="xMinYMin meet"
      aria-hidden="true"
      focusable="false"
    >
      <g className="b-fata">
        <path d="M129.024 0V24.32H32V35.2H111.36V56.96H32V81.92H0V0H129.024Z" fill="#F5EBDE"/>
        <path d="M178.639 83.712C169.423 83.712 161.231 82.432 154.063 79.872C146.895 77.2267 141.22 73.4293 137.039 68.48C132.943 63.5306 130.895 57.5573 130.895 50.56C130.895 43.2213 132.943 37.0773 137.039 32.128C141.22 27.1786 146.895 23.4666 154.063 20.992C161.231 18.5173 169.423 17.28 178.639 17.28C188.879 17.28 197.711 18.688 205.135 21.504C212.644 24.2346 218.404 28.1173 222.415 33.152C226.511 38.1013 228.559 43.904 228.559 50.56C228.559 55.5093 227.407 60.032 225.103 64.128C222.799 68.1387 219.471 71.6373 215.119 74.624C210.767 77.5253 205.519 79.7866 199.375 81.408C193.231 82.944 186.319 83.712 178.639 83.712ZM190.159 64.256C196.644 64.256 202.575 63.872 207.951 63.104C213.412 62.2506 217.764 60.8426 221.007 58.88C224.335 56.9173 225.999 54.144 225.999 50.56C225.999 46.8906 224.335 44.0746 221.007 42.112C217.764 40.1493 213.412 38.784 207.951 38.016C202.575 37.248 196.644 36.864 190.159 36.864C181.455 36.864 174.714 38.016 169.935 40.32C165.156 42.5386 162.767 45.952 162.767 50.56C162.767 53.5466 163.834 56.064 165.967 58.112C168.1 60.16 171.215 61.696 175.311 62.72C179.407 63.744 184.356 64.256 190.159 64.256ZM225.999 19.2H256.719V81.92H227.791C227.791 81.92 227.62 80.9386 227.279 78.976C227.023 77.0133 226.724 74.1973 226.383 70.528C226.127 66.8587 225.999 62.5493 225.999 57.6V19.2Z" fill="#F5EBDE"/>
        <path d="M265.1 19.2H340.364V38.4H265.1V19.2ZM287.372 0H318.092V81.92H287.372V0Z" fill="#F5EBDE"/>
        <path d="M395.139 83.712C385.923 83.712 377.731 82.432 370.563 79.872C363.395 77.2267 357.72 73.4293 353.539 68.48C349.443 63.5306 347.395 57.5573 347.395 50.56C347.395 43.2213 349.443 37.0773 353.539 32.128C357.72 27.1786 363.395 23.4666 370.563 20.992C377.731 18.5173 385.923 17.28 395.139 17.28C405.379 17.28 414.211 18.688 421.635 21.504C429.144 24.2346 434.904 28.1173 438.915 33.152C443.011 38.1013 445.059 43.904 445.059 50.56C445.059 55.5093 443.907 60.032 441.603 64.128C439.299 68.1387 435.971 71.6373 431.619 74.624C427.267 77.5253 422.019 79.7866 415.875 81.408C409.731 82.944 402.819 83.712 395.139 83.712ZM406.659 64.256C413.144 64.256 419.075 63.872 424.451 63.104C429.912 62.2506 434.264 60.8426 437.507 58.88C440.835 56.9173 442.499 54.144 442.499 50.56C442.499 46.8906 440.835 44.0746 437.507 42.112C434.264 40.1493 429.912 38.784 424.451 38.016C419.075 37.248 413.144 36.864 406.659 36.864C397.955 36.864 391.214 38.016 386.435 40.32C381.656 42.5386 379.267 45.952 379.267 50.56C379.267 53.5466 380.334 56.064 382.467 58.112C384.6 60.16 387.715 61.696 391.811 62.72C395.907 63.744 400.856 64.256 406.659 64.256ZM442.499 19.2H473.219V81.92H444.291C444.291 81.92 444.12 80.9386 443.779 78.976C443.523 77.0133 443.224 74.1973 442.883 70.528C442.627 66.8587 442.499 62.5493 442.499 57.6V19.2Z" fill="#F5EBDE"/>
      </g>
      <g className="b-x">
        <path d="M583.04 0H596.005H609.983H624L566.4 48.64L565.12 49.664L528 81.92H487.04L536.36 40.5747L547.2 31.488L548.096 30.72L556.162 23.6292L572.455 9.30571L583.04 0ZM529.28 0L530.52 1.08993L556.162 23.6292L565.248 31.616L566.016 32.384L625.28 81.92H584.32L545.664 48.512L545.152 48L536.36 40.5747L530.457 35.5891L488.32 0H529.28Z" fill="#F5EBDE"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M487.04 81.92C499.04 72.9776 530.2 55.5991 556.2 57.6237L584.32 81.92C584.32 81.92 546.787 23.3381 609.983 0H596.005C594.063 0.797472 578.121 7.33295 572.455 9.30571L556.162 23.6292L530.52 1.08993C531.81 6.01242 536.272 25.2531 530.2 35.3521L530.457 35.5891L536.36 40.5747L487.04 81.92Z" fill="#FF4800"/>
      </g>
    </svg>
  );
}
