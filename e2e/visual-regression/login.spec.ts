import { test, expect } from '@playwright/test';

test.describe('Visual: Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders login page unchanged', async ({ page }) => {
    // Erstellt/vergleicht gegen Baseline: e2e/__screenshots__/visual-login-renders-login-page-unchanged-chromium.png
    await expect(page).toHaveScreenshot('visual-login.png', {
      // Pixel-basierte Toleranz für kleine Anti-Aliasing-Differenzen
      maxDiffPixelRatio: 0.001,      // 0.1%
      animations: 'disabled',        // zusätzliche Absicherung
      fullPage: true
    });
  });

  test('error state unchanged', async ({ page }) => {
    await page.getByLabel(/name/i).fill('alice');
    await page.getByLabel(/passwort/i).fill('wrong');
    await page.getByRole('button', { name: /anmelden/i }).click();
    // Warte auf Fehlermeldung
    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText(/ungültige zugangsdaten/i);

    await expect(page).toHaveScreenshot('visual-login-error.png', {
      maxDiffPixelRatio: 0.001,
      fullPage: false
    });
  });

});
