import { test, expect } from '@playwright/test';

// ════════════════════════════════════════════════════════════════════
// Interactive states · snapshot dos componentes-chave em estados que
// não aparecem no full-page do brandbook (hover, focus, collapse, etc).
// Esses são os mais propensos a regredir silenciosamente.
// ════════════════════════════════════════════════════════════════════

test.describe('Sidebar states', () => {
  test('expanded · default', async ({ page }) => {
    await page.goto('/brandbook/08-logo.html');
    await page.waitForSelector('[data-sidebar-root]');
    await page.waitForFunction(() => document.fonts.ready);
    // Garante estado expandido (limpa localStorage previo)
    await page.evaluate(() => {
      localStorage.removeItem('fatax.sidebar.collapsed');
      delete document.documentElement.dataset.sidebar;
    });
    await page.waitForTimeout(300);
    await expect(page.locator('.sidebar')).toHaveScreenshot('sidebar-expanded.png');
  });

  test('collapsed · 72px', async ({ page }) => {
    await page.goto('/brandbook/08-logo.html');
    await page.waitForSelector('[data-sidebar-root]');
    await page.waitForFunction(() => document.fonts.ready);
    await page.locator('[data-sidebar-toggle]').click();
    await page.waitForTimeout(400); // espera a animação de 200ms terminar
    await expect(page.locator('.sidebar')).toHaveScreenshot('sidebar-collapsed.png');
  });

  test('collapsed · hover revela tooltip flyout', async ({ page }) => {
    await page.goto('/brandbook/08-logo.html');
    await page.waitForSelector('[data-sidebar-root]');
    await page.waitForFunction(() => document.fonts.ready);
    await page.locator('[data-sidebar-toggle]').click();
    await page.waitForTimeout(400);
    // Hover no primeiro item da nav
    const firstNavItem = page.locator('.sidebar-nav li a').first();
    await firstNavItem.hover();
    await page.waitForTimeout(200);
    await expect(page.locator('.sidebar')).toHaveScreenshot('sidebar-collapsed-tooltip.png');
  });
});

test.describe('Button states', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brandbook/18-ds-components.html');
    await page.waitForSelector('[data-sidebar-root]');
    await page.waitForFunction(() => document.fonts.ready);
  });

  test('button row · default', async ({ page }) => {
    const stage = page.locator('.cmp-row').first().locator('.stage');
    await expect(stage).toHaveScreenshot('button-row-default.png');
  });

  test('button primary · hover (laranja → hover)', async ({ page }) => {
    const btn = page.locator('button.btn-primary').first();
    await btn.hover();
    await page.waitForTimeout(150); // dur-fast = 120ms
    await expect(btn).toHaveScreenshot('button-primary-hover.png');
  });

  test('button primary · focus visible (ring laranja)', async ({ page }) => {
    const btn = page.locator('button.btn-primary').first();
    await btn.focus();
    await page.waitForTimeout(150);
    await expect(btn).toHaveScreenshot('button-primary-focus.png');
  });
});

test.describe('Components · isolated snapshots', () => {
  test('pills row · 7 variantes', async ({ page }) => {
    await page.goto('/brandbook/18-ds-components.html');
    await page.waitForSelector('[data-sidebar-root]');
    await page.waitForFunction(() => document.fonts.ready);
    const stage = page.locator('.cmp-row').filter({ hasText: 'Pills semânticos' }).locator('.stage');
    await expect(stage).toHaveScreenshot('pills-row.png');
  });

  test('powered-by lockup · expandido', async ({ page }) => {
    await page.goto('/brandbook/08-logo.html');
    await page.waitForSelector('[data-sidebar-root]');
    await page.waitForFunction(() => document.fonts.ready);
    const lockup = page.locator('.poweredby').first();
    await expect(lockup).toHaveScreenshot('poweredby-lockup.png');
  });

  test('stat block · KPI', async ({ page }) => {
    await page.goto('/examples/minimal.html');
    await page.waitForSelector('[data-sidebar-root]');
    await page.waitForFunction(() => document.fonts.ready);
    const stat = page.locator('.stat').first();
    await expect(stat).toHaveScreenshot('stat-block.png');
  });
});

test.describe('Search dropdown', () => {
  test('open · com resultados', async ({ page }) => {
    await page.goto('/brandbook/08-logo.html');
    await page.waitForSelector('[data-sidebar-root]');
    await page.waitForFunction(() => document.fonts.ready);
    const input = page.locator('[data-search-input]');
    await input.fill('logo');
    await page.waitForTimeout(200);
    await expect(page.locator('[data-search-root]')).toHaveScreenshot('search-results.png');
  });
});
