import { test, expect } from '@playwright/test';

// ════════════════════════════════════════════════════════════════════
// Examples · full-page snapshot
// Garante que o app de exemplo (consumindo dist/) renderiza idêntico
// ao baseline. Quebra de baseline = o dist/ regrediu visualmente.
// ════════════════════════════════════════════════════════════════════

test('example · minimal.html (vanilla CSS)', async ({ page }) => {
  await page.goto('/examples/minimal.html', { waitUntil: 'networkidle' });

  await page.waitForSelector('[data-sidebar-root]', { timeout: 5000 });
  await page.waitForFunction(() => document.fonts.ready);
  await page.waitForTimeout(300);

  await expect(page).toHaveScreenshot('example-minimal.png', {
    fullPage: true,
  });
});
