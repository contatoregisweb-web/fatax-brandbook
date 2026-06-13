import { defineConfig, devices } from '@playwright/test';

// ════════════════════════════════════════════════════════════════════
// Fatax Visual Regression · Playwright config
//
// Cobre:
//   · brandbook completo (24 páginas + cover)
//   · examples/minimal.html
//   · estados interativos críticos (sidebar collapsed, hover, etc)
//
// Pre-requisitos:
//   cd visual && npm install && npm run install:browsers
//
// Rodar:
//   npm test                  → roda regression contra baselines
//   npm run test:update       → atualiza baselines (use após mudanças intencionais)
//   npm run test:ui           → modo interativo do Playwright
//
// IMPORTANTE: baselines são OS-específicos. Gere via Docker (ver README)
// para garantir paridade com o runner do CI (ubuntu-latest).
// ════════════════════════════════════════════════════════════════════

export default defineConfig({
  testDir: './tests',
  snapshotDir: './snapshots',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: process.env.CI ? [['github'], ['html']] : 'html',

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  expect: {
    toHaveScreenshot: {
      // Tolera ~1% de pixels diferentes (anti-aliasing entre runners)
      maxDiffPixelRatio: 0.01,
      // Threshold por pixel: diferenças muito sutis são ignoradas
      threshold: 0.2,
      // Desabilita animações durante o snapshot
      animations: 'disabled',
    },
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
      },
    },
    // Pra adicionar mobile/tablet, descomente:
    // {
    //   name: 'chromium-tablet',
    //   use: { ...devices['Desktop Chrome'], viewport: { width: 800, height: 1024 } },
    // },
    // {
    //   name: 'chromium-mobile',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],

  webServer: {
    // Serve o repo root (../) — testes navegam para /brandbook/*, /examples/*, etc
    command: 'npx serve -l 4173 --no-clipboard',
    url: 'http://localhost:4173',
    cwd: '..',
    reuseExistingServer: !process.env.CI,
    timeout: 30 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
