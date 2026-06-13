/* Fatax Brandbook — shared page boot
   - Restores sidebar collapsed/expanded state from localStorage before paint
   - Injects shared sidebar HTML and marks the active nav item
   - Wires the collapse toggle (persists)
   - Provides functional search across all pages (live filter, ⌘K, arrow nav)
   - Builds the prev/next pager
*/
(function () {
  const LS_KEY = 'fatax.sidebar.collapsed';

  // — Apply persisted state synchronously to avoid flash —
  try {
    const collapsed = localStorage.getItem(LS_KEY) === '1';
    document.documentElement.classList.add('sidebar-no-transition');
    if (collapsed) document.documentElement.dataset.sidebar = 'collapsed';
  } catch (_) {}

  // — Search index: every page in the brandbook —
  // [file, title, section, keywords]
  const PAGES = [
    ['01-overview.html',         'Overview',          'Foundations',   'brand vitals visão geral'],
    ['02-foundations.html',      'Mission & Values',  'Foundations',   'missão valores propósito'],
    ['03-strategy.html',         'Strategy',          'Foundations',   'estratégia posicionamento'],
    ['04-archetypes.html',       'Archetypes',        'Foundations',   'arquétipos personagem'],
    ['05-manifesto.html',        'Manifesto',         'Foundations',   'manifesto credo'],
    ['06-voice-tone.html',       'Voice & Tone',      'Expression',    'voz tom copy'],
    ['07-moodboard.html',        'Moodboard',         'Expression',    'moodboard referências'],
    ['08-logo.html',             'Logo',              'Expression',    'logo wordmark marca x símbolo lockup powered by'],
    ['09-color.html',            'Color',             'Expression',    'cores paleta laranja creme preto'],
    ['10-typography.html',       'Typography',        'Expression',    'tipografia fontes syne inter jetbrains'],
    ['11-iconography.html',      'Iconography',       'Expression',    'ícones iconography feather'],
    ['12-imagery.html',          'Imagery',           'Expression',    'imagens fotografia'],
    ['13-illustrations.html',    'Illustrations',     'Expression',    'ilustrações illustration'],
    ['14-motion.html',           'Motion',            'Expression',    'motion animação easing'],
    ['15-audio.html',            'Audio',             'Expression',    'audio som identidade sonora'],
    ['16-ds-tokens.html',        'Tokens',            'Design System', 'tokens variáveis css'],
    ['17-ds-layout.html',        'Layout',            'Design System', 'layout grid sidebar topbar'],
    ['18-ds-components.html',    'Components',        'Design System', 'componentes button card pager sidebar collapse'],
    ['19-ds-inputs.html',        'Inputs',            'Design System', 'inputs forms formulário'],
    ['20-ds-data-display.html',  'Data Display',      'Design System', 'tabelas gráficos data display'],
    ['21-showcase-editorial.html','Editorial',        'Showcase',      'editorial print capa relatório'],
    ['22-showcase-mockups.html', 'Mockups',           'Showcase',      'mockups produto'],
    ['23-showcase-social.html',  'Social',            'Showcase',      'social mídias redes'],
    ['24-accessibility.html',    'Accessibility',     'Practice',      'acessibilidade wcag contraste'],
  ];

  // Icon symbol for each page — matches the sidebar nav
  const ICON_BY_FILE = {
    '01-overview.html': 'i-overview', '02-foundations.html': 'i-mission',
    '03-strategy.html': 'i-strategy', '04-archetypes.html': 'i-archetypes',
    '05-manifesto.html': 'i-manifesto', '06-voice-tone.html': 'i-voice',
    '07-moodboard.html': 'i-moodboard', '08-logo.html': 'i-logo',
    '09-color.html': 'i-color', '10-typography.html': 'i-typography',
    '11-iconography.html': 'i-iconography', '12-imagery.html': 'i-imagery',
    '13-illustrations.html': 'i-illustrations', '14-motion.html': 'i-motion',
    '15-audio.html': 'i-audio', '16-ds-tokens.html': 'i-tokens',
    '17-ds-layout.html': 'i-layout', '18-ds-components.html': 'i-components',
    '19-ds-inputs.html': 'i-inputs', '20-ds-data-display.html': 'i-data',
    '21-showcase-editorial.html': 'i-editorial', '22-showcase-mockups.html': 'i-mockups',
    '23-showcase-social.html': 'i-social', '24-accessibility.html': 'i-accessibility',
  };

  function highlight(text, needle) {
    if (!needle) return text;
    const i = text.toLowerCase().indexOf(needle.toLowerCase());
    if (i < 0) return text;
    return text.slice(0, i) + '<mark>' + text.slice(i, i + needle.length) + '</mark>' + text.slice(i + needle.length);
  }

  function rankAndFilter(query) {
    const q = query.trim().toLowerCase();
    if (!q) return PAGES.slice(0, 8).map(p => ({ row: p, score: 0 }));
    const terms = q.split(/\s+/).filter(Boolean);
    return PAGES
      .map(row => {
        const [file, title, section, keywords] = row;
        const hay = (title + ' ' + section + ' ' + keywords).toLowerCase();
        let score = 0;
        for (const t of terms) {
          const ti = title.toLowerCase().indexOf(t);
          if (ti === 0) score += 50;
          else if (ti > 0) score += 30;
          if (hay.indexOf(t) >= 0) score += 10;
        }
        return { row, score };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  function renderResults(results, query, container) {
    if (!results.length) {
      container.innerHTML = `<div class="search-results-empty">Nada para <b>"${query}"</b></div>`;
      return;
    }
    container.innerHTML = results.map(({ row }, idx) => {
      const [file, title, section] = row;
      const icon = ICON_BY_FILE[file] || 'i-overview';
      return `
        <a href="${file}" class="search-result${idx === 0 ? ' is-active' : ''}" data-result-index="${idx}">
          <span class="res-ico"><svg><use href="#${icon}"/></svg></span>
          <span class="res-title">${highlight(title, query)}</span>
          <span class="res-section">${section}</span>
        </a>`;
    }).join('');
  }

  function setupSearch(root) {
    const input = root.querySelector('[data-search-input]');
    const results = root.querySelector('[data-search-results]');
    if (!input || !results) return;

    let activeIdx = 0;
    let resultEls = [];

    function refreshActive() {
      resultEls.forEach((el, i) => el.classList.toggle('is-active', i === activeIdx));
    }

    function update() {
      const q = input.value;
      const r = rankAndFilter(q);
      // When empty + not focused → hide
      if (!q && document.activeElement !== input) {
        results.hidden = true;
        return;
      }
      renderResults(r, q, results);
      results.hidden = false;
      resultEls = [...results.querySelectorAll('.search-result')];
      activeIdx = 0;
    }

    input.addEventListener('input', update);
    input.addEventListener('focus', update);
    input.addEventListener('blur', () => {
      // Delay so click on a result still fires
      setTimeout(() => {
        if (!results.contains(document.activeElement)) results.hidden = true;
      }, 150);
    });

    input.addEventListener('keydown', (e) => {
      if (results.hidden) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, resultEls.length - 1);
        refreshActive();
        resultEls[activeIdx]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        refreshActive();
        resultEls[activeIdx]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const a = resultEls[activeIdx];
        if (a) window.location.href = a.getAttribute('href');
      } else if (e.key === 'Escape') {
        input.value = '';
        results.hidden = true;
        input.blur();
      }
    });

    // ⌘K / Ctrl+K — focus search globally; expand sidebar first if collapsed
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (document.documentElement.dataset.sidebar === 'collapsed') {
          setCollapsed(false);
        }
        // Wait a tick for transition to start, then focus
        setTimeout(() => input.focus(), 60);
      }
    });

    // Click on the search bar when collapsed → expand and focus
    root.addEventListener('click', (e) => {
      if (document.documentElement.dataset.sidebar === 'collapsed') {
        setCollapsed(false);
        setTimeout(() => input.focus(), 220);
      }
    });
  }

  function setCollapsed(collapsed) {
    if (collapsed) document.documentElement.dataset.sidebar = 'collapsed';
    else delete document.documentElement.dataset.sidebar;
    try { localStorage.setItem(LS_KEY, collapsed ? '1' : '0'); } catch (_) {}
  }

  function onlyDigits(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function formatCnpj(value) {
    return onlyDigits(value).slice(0, 14)
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  function formatCurrency(value) {
    const digits = onlyDigits(value);
    if (!digits) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(digits) / 100);
  }

  function setupFormattedInputs(scope = document) {
    const inputs = [...scope.querySelectorAll('input[data-format]')];
    inputs.forEach((input) => {
      const apply = () => {
        const kind = input.dataset.format;
        if (kind === 'cnpj') input.value = formatCnpj(input.value);
        if (kind === 'currency-brl') input.value = formatCurrency(input.value);
      };
      input.setAttribute('inputmode', 'numeric');
      input.addEventListener('input', apply);
      apply();
    });
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
    // Keyboard: press "·" (the period, easy to hit) to toggle
    document.addEventListener('keydown', (e) => {
      if (e.key === '.' && !e.metaKey && !e.ctrlKey && !e.altKey
          && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        btn.click();
      }
    });
  }

  async function boot() {
    const slot = document.querySelector('[data-include="sidebar"]');
    if (!slot) return;

    try {
      const res = await fetch('shared/sidebar.html', { cache: 'no-cache' });
      if (!res.ok) throw new Error('sidebar fetch failed: ' + res.status);
      slot.outerHTML = await res.text();
    } catch (err) {
      console.error('[sidebar] include failed:', err);
      return;
    }

    // Mark active page. Vercel serves clean URLs such as /brandbook/01-overview,
    // while the sidebar uses file hrefs. Normalize both forms to the .html file.
    function normalizePage(pathname) {
      const parts = pathname.split('/').filter(Boolean);
      let leaf = parts[parts.length - 1] || 'index';
      if (leaf === 'brandbook') leaf = 'index';
      leaf = leaf.split('?')[0].split('#')[0];
      if (!leaf.endsWith('.html')) leaf += '.html';
      return leaf;
    }

    const page = normalizePage(location.pathname);
    const links = [...document.querySelectorAll('.sidebar-nav a')];
    links.forEach(a => {
      const href = normalizePage(a.getAttribute('href') || '');
      if (href === page) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });

    // Build prev/next pager if a [data-pager] slot exists
    const pagerSlot = document.querySelector('[data-pager]');
    if (pagerSlot && links.length) {
      const i = links.findIndex(a => a.classList.contains('active'));
      if (i >= 0) {
        const prev = links[i - 1];
        const next = links[i + 1];
        const labelOf = (a) => a.querySelector('.label-text')?.textContent || a.textContent.trim();
        const cell = (a, kind) => a
          ? `<a href="${a.getAttribute('href')}" class="${kind}">
               <span class="lbl">${kind === 'next' ? 'Próximo →' : '← Anterior'}</span>
               <span class="ttl">${labelOf(a)}</span>
             </a>`
          : `<div></div>`;
        pagerSlot.outerHTML = `<nav class="pager">${cell(prev, 'prev')}${cell(next, 'next')}</nav>`;
      }
    }

    const sidebarRoot = document.querySelector('[data-sidebar-root]');
    if (sidebarRoot) {
      setupCollapse(sidebarRoot);
      const searchRoot = sidebarRoot.querySelector('[data-search-root]');
      if (searchRoot) setupSearch(searchRoot);
    }
    setupFormattedInputs();

    // Re-enable transitions on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('sidebar-no-transition');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
