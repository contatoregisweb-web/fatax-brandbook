/* ═══════════════════════════════════════════════════════════════
   @fatax/design-system · sidebar.js
   v0.6 · Dark Cockpit
   ───────────────────────────────────────────────────────────────
   Comportamento do sidebar recolhível:
     · Persiste estado em localStorage["fatax.sidebar.collapsed"]
     · Aplica estado antes do primeiro paint (sem flash)
     · Atalhos: "·" alterna · ⌘K / Ctrl+K foca busca
     · Marca automaticamente o link da página atual com .active
     · Hook opcional: window.FataxSidebar.search(query) para apps
       que querem implementar busca própria

   Uso:
     <script src="path/to/dist/sidebar.js"></script>
   Carregue NO TOPO do <head> (não async, não defer) para evitar
   flash de troca quando a página abrir já recolhida.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const LS_KEY = 'fatax.sidebar.collapsed';

  // — Apply persisted state synchronously to avoid flash —
  try {
    const collapsed = localStorage.getItem(LS_KEY) === '1';
    document.documentElement.classList.add('sidebar-no-transition');
    if (collapsed) document.documentElement.dataset.sidebar = 'collapsed';
  } catch (_) {}

  function setCollapsed(collapsed) {
    if (collapsed) document.documentElement.dataset.sidebar = 'collapsed';
    else delete document.documentElement.dataset.sidebar;
    try { localStorage.setItem(LS_KEY, collapsed ? '1' : '0'); } catch (_) {}
  }

  function setupCollapse(root) {
    const btn = root.querySelector('[data-sidebar-toggle]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isCollapsed = document.documentElement.dataset.sidebar === 'collapsed';
      setCollapsed(!isCollapsed);
      btn.setAttribute('aria-label', isCollapsed ? 'Recolher menu' : 'Expandir menu');
      btn.setAttribute('title', isCollapsed ? 'Recolher menu (·)' : 'Expandir menu (·)');
    });
    // Keyboard: "·" alterna globalmente (exceto dentro de campos de texto)
    document.addEventListener('keydown', (e) => {
      if (e.key === '.' && !e.metaKey && !e.ctrlKey && !e.altKey
          && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        btn.click();
      }
    });
  }

  function setupSearch(root) {
    const input = root.querySelector('[data-search-input]');
    if (!input) return;
    // ⌘K / Ctrl+K — foca busca; expande sidebar primeiro se preciso
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (document.documentElement.dataset.sidebar === 'collapsed') {
          setCollapsed(false);
        }
        setTimeout(() => input.focus(), 60);
      }
    });
    // Click on collapsed search bar → expand and focus
    root.addEventListener('click', () => {
      if (document.documentElement.dataset.sidebar === 'collapsed') {
        setCollapsed(false);
        setTimeout(() => input.focus(), 220);
      }
    });
  }

  function markActive() {
    function normalizePage(pathname) {
      const parts = pathname.split('/').filter(Boolean);
      let leaf = parts[parts.length - 1] || 'index';
      if (leaf === 'brandbook') leaf = 'index';
      leaf = leaf.split('?')[0].split('#')[0];
      if (!leaf.endsWith('.html')) leaf += '.html';
      return leaf;
    }
    const page = normalizePage(location.pathname);
    const links = document.querySelectorAll('.sidebar-nav a[href]');
    links.forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (normalizePage(href) === page) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });
  }

  function boot() {
    const root = document.querySelector('[data-sidebar-root]');
    if (!root) return;
    setupCollapse(root);
    const searchRoot = root.querySelector('[data-search-root]');
    if (searchRoot) setupSearch(searchRoot);
    markActive();

    // Re-enable transitions on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('sidebar-no-transition');
      });
    });
  }

  // Expose helpers for consumers who want custom search/behavior
  window.FataxSidebar = {
    setCollapsed,
    isCollapsed: () => document.documentElement.dataset.sidebar === 'collapsed',
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
