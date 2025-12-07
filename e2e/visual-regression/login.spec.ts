import { test, expect } from '@playwright/test';

test.describe('Visual: Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders login page unchanged', async ({ page }) => {
    // Erstellt/vergleicht gegen Baseline: e2e/__screenshots__/visual-login-renders-login-page-unchanged-chromium.png
    await expect(page).toHaveScreenshot('visual-login.png', {
      maxDiffPixelRatio: 0.001,
      animations: 'disabled',
      fullPage: true
    });
  });

  test('error state unchanged', async ({ page }) => {
    await page.getByLabel(/name/i).fill('bob');
    await page.getByLabel(/passwort/i).fill('wrong');
    await page.getByRole('button', { name: /anmelden/i }).click();

   const alert = page.getByTestId('error');
    await expect(alert).toBeVisible({ timeout: 7000 });

    await expect(alert).toHaveText(/User was not found./i);
    await expect(page).toHaveScreenshot('visual-login-error.png', {
      maxDiffPixelRatio: 0.001,
      fullPage: false
    });

  });

});
