#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════
// @fatax/codegen · generate.mjs
//
// Lê o frontmatter YAML do DESIGN.md (raiz do repo) e gera:
//   · ../dist/tokens.css          (CSS custom properties — overwrite)
//   · ../dist/tailwind.config.js  (theme.extend pronto pra Tailwind)
//   · ../dist/tokens.dtcg.json    (W3C Design Tokens — sync com Figma via Tokens Studio)
//
// Uso:
//   cd codegen
//   npm install
//   npm run generate
//
// CI integration:
//   - Roda em cada push no main que toque DESIGN.md
//   - Se houver diff no dist/, abre PR automático
//
// Modo --check (CI):
//   - Gera em memória e compara com arquivos atuais
//   - Exit 1 se houver drift → CI vermelho
// ════════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..');
const DESIGN_MD = resolve(REPO_ROOT, 'DESIGN.md');
const DIST = resolve(REPO_ROOT, 'dist');

const CHECK_MODE = process.argv.includes('--check');

// ─────────────────────────────────────────────────────────────────
// 1. Parse frontmatter
// ─────────────────────────────────────────────────────────────────

const md = readFileSync(DESIGN_MD, 'utf-8');
const fmMatch = md.match(/^---\n([\s\S]*?)\n---/);
if (!fmMatch) {
  console.error('ERROR: DESIGN.md does not start with --- frontmatter');
  process.exit(2);
}

const spec = yaml.load(fmMatch[1]);
if (!spec || typeof spec !== 'object') {
  console.error('ERROR: frontmatter is empty or invalid');
  process.exit(2);
}

const specUpdated = spec.updated instanceof Date
  ? spec.updated.toISOString().slice(0, 10)
  : String(spec.updated);

console.log(`Loaded spec: ${spec.name} v${spec.version} (updated ${specUpdated})`);

// ─────────────────────────────────────────────────────────────────
// 2. Helpers
// ─────────────────────────────────────────────────────────────────

const banner = (target) => `/* ════════════════════════════════════════════════════════════════
   ${target}
   GENERATED FROM DESIGN.md v${spec.version} — ${specUpdated}
   DO NOT EDIT MANUALLY. Run \`cd codegen && npm run generate\`.
   ════════════════════════════════════════════════════════════════ */\n\n`;

const jsBanner = (target) => `// ════════════════════════════════════════════════════════════════
// ${target}
// GENERATED FROM DESIGN.md v${spec.version} — ${specUpdated}
// DO NOT EDIT MANUALLY. Run \`cd codegen && npm run generate\`.
// ════════════════════════════════════════════════════════════════\n\n`;

// Strip "(inline comment)" from YAML values like "#FF4800   # var(--brand-orange)"
const cleanVal = (v) => String(v).split('#var')[0].trim();

// Convert YAML group like {brand-orange: "#FF4800"} → CSS lines
function colorsToCss(group) {
  return Object.entries(group)
    .map(([k, v]) => `  --${k}: ${cleanVal(v)};`)
    .join('\n');
}

// ─────────────────────────────────────────────────────────────────
// 3. Generate dist/tokens.css
// ─────────────────────────────────────────────────────────────────

function buildTokensCss() {
  const c = spec.colors;
  const t = spec.typography;
  const s = spec.spacing;
  const r = spec.radius;
  const m = spec.motion;
  const l = spec.layout;

  return banner('@fatax/design-system · tokens.css') +
`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  /* ── Base surfaces ───────────────────────────────── */
  --background: ${c.background};
  --surface: ${c.surface};
  --surface-raised: ${c['surface-raised']};
  --surface-sunken: ${c['surface-sunken']};
  --surface-overlay: ${c['surface-overlay']};

  /* ── Bordas ──────────────────────────────────────── */
  --border: ${c.border};
  --border-soft: ${c['border-soft']};
  --border-strong: ${c['border-strong']};
  --border-cream: ${c['border-cream']};

  /* ── Texto ───────────────────────────────────────── */
  --text-primary: ${c['text-primary']};
  --text-secondary: ${c['text-secondary']};
  --text-muted: ${c['text-muted']};
  --text-disabled: ${c['text-disabled']};
  --text-inverse: ${c['text-inverse']};

  /* ── Marca ───────────────────────────────────────── */
  --brand-orange: ${c['brand-orange']};
  --brand-orange-hover: ${c['brand-orange-hover']};
  --brand-orange-pressed: ${c['brand-orange-pressed']};
  --brand-orange-soft: ${c['brand-orange-soft']};
  --brand-orange-tint: ${c['brand-orange-tint']};
  --brand-cream: ${c['brand-cream']};
  --brand-cream-dark: ${c['brand-cream-dark']};
  --brand-cream-soft: ${c['brand-cream-soft']};
  --brand-black: ${c['brand-black']};
  --on-orange: ${c['on-orange']};
  --on-cream: ${c['on-cream']};

  /* ── Semânticos ──────────────────────────────────── */
  --success: ${c.success};
  --success-soft: ${c['success-soft']};
  --warning: ${c.warning};
  --warning-soft: ${c['warning-soft']};
  --danger: ${c.danger};
  --danger-soft: ${c['danger-soft']};
  --info: ${c.info};
  --info-soft: ${c['info-soft']};

  /* ── Spacing (base 4) ────────────────────────────── */
${Object.entries(s).map(([k, v]) => `  --s-${k}: ${v};`).join('\n')}

  /* ── Radius ──────────────────────────────────────── */
${Object.entries(r).map(([k, v]) => `  --r-${k}: ${v};`).join('\n')}

  /* ── Type families ───────────────────────────────── */
  --font-sans: ${t.families.sans};
  --font-display: ${t.families.display};
  --font-serif: ${t.families.serif};
  --font-mono: ${t.families.mono};

  /* ── Layout ──────────────────────────────────────── */
  --sidebar-w: ${l['sidebar-w']};
  --sidebar-w-collapsed: ${l['sidebar-w-collapsed']};
  --content-max: ${l['content-max']};
  --pad-x: ${l['pad-x']};

  /* ── Type rhythm ─────────────────────────────────── */
  --lh-title: ${t['line-height'].title};
  --lh-body: ${t['line-height'].body};

  /* ── Motion ──────────────────────────────────────── */
  --ease-out: ${m['ease-out']};
  --ease-std: ${m['ease-std']};
  --ease-in: ${m['ease-in']};
  --dur-fast: ${m['dur-fast']};
  --dur-base: ${m['dur-base']};
  --dur-slow: ${m['dur-slow']};
  --dur-deliberate: ${m['dur-deliberate']};
}

@media (max-width: 1024px) {
  :root { --pad-x: 32px; }
}
`;
}

// ─────────────────────────────────────────────────────────────────
// 4. Generate dist/tailwind.config.js
// ─────────────────────────────────────────────────────────────────

function buildTailwindConfig() {
  const c = spec.colors;
  const t = spec.typography;
  const s = spec.spacing;
  const r = spec.radius;
  const m = spec.motion;

  // Tailwind color object — flatten the brand/text/surface naming
  const colors = {
    background: c.background,
    surface: {
      DEFAULT: c.surface,
      raised: c['surface-raised'],
      sunken: c['surface-sunken'],
      overlay: c['surface-overlay'],
    },
    border: {
      DEFAULT: c.border,
      soft: c['border-soft'],
      strong: c['border-strong'],
      cream: c['border-cream'],
    },
    text: {
      primary: c['text-primary'],
      secondary: c['text-secondary'],
      muted: c['text-muted'],
      disabled: c['text-disabled'],
      inverse: c['text-inverse'],
    },
    brand: {
      orange: {
        DEFAULT: c['brand-orange'],
        hover: c['brand-orange-hover'],
        pressed: c['brand-orange-pressed'],
        soft: c['brand-orange-soft'],
        tint: c['brand-orange-tint'],
      },
      cream: {
        DEFAULT: c['brand-cream'],
        dark: c['brand-cream-dark'],
        soft: c['brand-cream-soft'],
      },
      black: c['brand-black'],
    },
    'on-orange': c['on-orange'],
    'on-cream': c['on-cream'],
    success: { DEFAULT: c.success, soft: c['success-soft'] },
    warning: { DEFAULT: c.warning, soft: c['warning-soft'] },
    danger:  { DEFAULT: c.danger,  soft: c['danger-soft'] },
    info:    { DEFAULT: c.info,    soft: c['info-soft'] },
  };

  // Spacing scale — convert "16px" → "16px" (Tailwind accepts px directly)
  const spacing = Object.fromEntries(Object.entries(s));
  const radius = Object.fromEntries(Object.entries(r));

  // Font family
  const fontFamily = {
    sans: t.families.sans.split(',').map(s => s.trim().replace(/^["']|["']$/g, '')),
    display: t.families.display.split(',').map(s => s.trim().replace(/^["']|["']$/g, '')),
    mono: t.families.mono.split(',').map(s => s.trim().replace(/^["']|["']$/g, '')),
  };

  // Font size — derive from scale
  const fontSize = {};
  for (const [name, def] of Object.entries(t.scale)) {
    const size = String(def.size).replace('px', '');
    const lh = def['line-height'] || (name.startsWith('h') || name === 'display' ? t['line-height'].title : t['line-height'].body);
    fontSize[name] = [
      `${size}px`,
      { lineHeight: String(lh), letterSpacing: def.tracking || '0', fontWeight: String(def.weight || 400) },
    ];
  }

  // Motion
  const transitionDuration = {
    fast: m['dur-fast'],
    base: m['dur-base'],
    slow: m['dur-slow'],
    deliberate: m['dur-deliberate'],
  };
  const transitionTimingFunction = {
    out: m['ease-out'],
    std: m['ease-std'],
    in: m['ease-in'],
  };

  const theme = {
    colors,
    spacing,
    borderRadius: radius,
    fontFamily,
    fontSize,
    transitionDuration,
    transitionTimingFunction,
  };

  return jsBanner('@fatax/design-system · tailwind.config.js') +
`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Edit this to match your app's source files
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    './app/**/*.{html,js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: ${JSON.stringify(theme, null, 6).replace(/"([^"]+)":/g, '$1:')},
  },
  corePlugins: {
    // Fatax usa contraste de surface, nunca box-shadow
    boxShadow: false,
  },
};
`;
}

// ─────────────────────────────────────────────────────────────────
// 5. Generate dist/tokens.dtcg.json (W3C Design Tokens format)
//    Compatible with Figma Tokens Studio, Style Dictionary, etc.
// ─────────────────────────────────────────────────────────────────

function buildDtcg() {
  const c = spec.colors;
  const t = spec.typography;
  const s = spec.spacing;
  const r = spec.radius;
  const m = spec.motion;

  const colorTok = (val) => ({ $type: 'color', $value: cleanVal(val) });
  const dimTok = (val) => ({ $type: 'dimension', $value: String(val) });
  const durTok = (val) => ({ $type: 'duration', $value: String(val) });
  const easeTok = (val) => ({ $type: 'cubicBezier', $value: cleanVal(val) });
  const fontTok = (val) => ({ $type: 'fontFamily', $value: cleanVal(val) });

  const out = {
    $description: `${spec.name} v${spec.version} — generated ${specUpdated}`,
    color: {
      surface: {
        background: colorTok(c.background),
        DEFAULT: colorTok(c.surface),
        raised: colorTok(c['surface-raised']),
        sunken: colorTok(c['surface-sunken']),
      },
      border: {
        DEFAULT: colorTok(c.border),
        soft: colorTok(c['border-soft']),
        strong: colorTok(c['border-strong']),
      },
      text: {
        primary: colorTok(c['text-primary']),
        secondary: colorTok(c['text-secondary']),
        muted: colorTok(c['text-muted']),
        disabled: colorTok(c['text-disabled']),
        inverse: colorTok(c['text-inverse']),
      },
      brand: {
        orange: {
          DEFAULT: colorTok(c['brand-orange']),
          hover: colorTok(c['brand-orange-hover']),
          pressed: colorTok(c['brand-orange-pressed']),
          soft: colorTok(c['brand-orange-soft']),
          tint: colorTok(c['brand-orange-tint']),
        },
        cream: {
          DEFAULT: colorTok(c['brand-cream']),
          dark: colorTok(c['brand-cream-dark']),
        },
        black: colorTok(c['brand-black']),
      },
      semantic: {
        success: { DEFAULT: colorTok(c.success), soft: colorTok(c['success-soft']) },
        warning: { DEFAULT: colorTok(c.warning), soft: colorTok(c['warning-soft']) },
        danger:  { DEFAULT: colorTok(c.danger),  soft: colorTok(c['danger-soft']) },
        info:    { DEFAULT: colorTok(c.info),    soft: colorTok(c['info-soft']) },
      },
    },
    spacing: Object.fromEntries(Object.entries(s).map(([k, v]) => [k, dimTok(v)])),
    radius: Object.fromEntries(Object.entries(r).map(([k, v]) => [k, dimTok(v)])),
    font: {
      family: {
        sans: fontTok(t.families.sans),
        display: fontTok(t.families.display),
        mono: fontTok(t.families.mono),
      },
    },
    motion: {
      duration: {
        fast: durTok(m['dur-fast']),
        base: durTok(m['dur-base']),
        slow: durTok(m['dur-slow']),
        deliberate: durTok(m['dur-deliberate']),
      },
      easing: {
        out: easeTok(m['ease-out']),
        std: easeTok(m['ease-std']),
        in: easeTok(m['ease-in']),
      },
    },
  };

  return JSON.stringify(out, null, 2) + '\n';
}

// ─────────────────────────────────────────────────────────────────
// 6. Write or check
// ─────────────────────────────────────────────────────────────────

const outputs = [
  { path: resolve(DIST, 'tokens.css'), content: buildTokensCss() },
  { path: resolve(DIST, 'tailwind.config.js'), content: buildTailwindConfig() },
  { path: resolve(DIST, 'tokens.dtcg.json'), content: buildDtcg() },
];

let drift = false;
for (const { path, content } of outputs) {
  const rel = path.replace(REPO_ROOT + '/', '');
  if (CHECK_MODE) {
    if (!existsSync(path) || readFileSync(path, 'utf-8') !== content) {
      console.error(`✗ DRIFT detected in ${rel} — run \`npm run generate\` to fix.`);
      drift = true;
    } else {
      console.log(`✓ ${rel} in sync`);
    }
  } else {
    writeFileSync(path, content);
    console.log(`✓ wrote ${rel} (${content.length} bytes)`);
  }
}

if (CHECK_MODE && drift) process.exit(1);
console.log(CHECK_MODE ? '\nAll outputs in sync with DESIGN.md.' : '\nGeneration complete.');
