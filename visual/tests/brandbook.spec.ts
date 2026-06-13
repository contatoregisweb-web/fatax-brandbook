import { test, expect, type Page } from '@playwright/test';

// ════════════════════════════════════════════════════════════════════
// Brandbook · full-page visual regression
// 24 páginas + cover. Snapshot pixel-a-pixel a 1440×900.
// ════════════════════════════════════════════════════════════════════

const PAGES: { file: string; name: string }[] = [
  { file: 'brandbook/index.html',               name: '00-cover' },
  { file: 'brandbook/01-overview.html',         name: '01-overview' },
  { file: 'brandbook/02-foundations.html',      name: '02-foundations' },
  { file: 'brandbook/03-strategy.html',         name: '03-strategy' },
  { file: 'brandbook/04-archetypes.html',       name: '04-archetypes' },
  { file: 'brandbook/05-manifesto.html',        name: '05-manifesto' },
  { file: 'brandbook/06-voice-tone.html',       name: '06-voice-tone' },
  { file: 'brandbook/07-moodboard.html',        name: '07-moodboard' },
  { file: 'brandbook/08-logo.html',             name: '08-logo' },
  { file: 'brandbook/09-color.html',            name: '09-color' },
  { file: 'brandbook/10-typography.html',       name: '10-typography' },
  { file: 'brandbook/11-iconography.html',      name: '11-iconography' },
  { file: 'brandbook/12-imagery.html',          name: '12-imagery' },
  { file: 'brandbook/13-illustrations.html',    name: '13-illustrations' },
  { file: 'brandbook/14-motion.html',           name: '14-motion' },
  { file: 'brandbook/15-audio.html',            name: '15-audio' },
  { file: 'brandbook/16-ds-tokens.html',        name: '16-ds-tokens' },
  { file: 'brandbook/17-ds-layout.html',        name: '17-ds-layout' },
  { file: 'brandbook/18-ds-components.html',    name: '18-ds-components' },
  { file: 'brandbook/19-ds-inputs.html',        name: '19-ds-inputs' },
  { file: 'brandbook/20-ds-data-display.html',  name: '20-ds-data-display' },
  { file: 'brandbook/21-showcase-editorial.html', name: '21-showcase-editorial' },
  { file: 'brandbook/22-showcase-mockups.html', name: '22-showcase-mockups' },
  { file: 'brandbook/23-showcase-social.html',  name: '23-showcase-social' },
  { file: 'brandbook/24-accessibility.html',    name: '24-accessibility' },
];

/** Espera o sidebar carregar (include.js faz fetch async), as fontes
 *  estabilizarem e qualquer animação inicial assentar. */
async function waitForPageReady(page: Page): Promise<void> {
  // Sidebar é injetado via include.js → fetch('shared/sidebar.html')
  await page.waitForSelector('[data-sidebar-root]', { timeout: 5000 });
  // Fontes carregadas e métricas finais
  await page.waitForFunction(() => document.fonts.ready);
  // Settle de transições + classe sidebar-no-transition removida
  await page.waitForFunction(
    () => !document.documentElement.classList.contains('sidebar-no-transition'),
    { timeout: 2000 }
  );
  // Pequeno settle final para qualquer animação CSS residual
  await page.waitForTimeout(300);
}

for (const { file, name } of PAGES) {
  test(`brandbook · ${name}`, async ({ page }) => {
    await page.goto(`/${file}`, { waitUntil: 'networkidle' });
    await waitForPageReady(page);

    await expect(page).toHaveScreenshot(`brandbook-${name}.png`, {
      fullPage: true,
      // Esconde o cursor piscante se houver input focado
      mask: [],
    });
  });
}
