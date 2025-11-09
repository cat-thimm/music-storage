import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Erfolgreicher Login navigiert zu /home und Button ist währenddessen disabled (loading)', async ({ page }) => {
    await page.getByLabel(/name/i).fill('alice');
    await page.getByLabel(/passwort/i).fill('secret');

    const submit = page.getByRole('button', { name: /anmelden/i });
    await expect(submit).toBeEnabled();

    const navPromise = page.waitForURL('**/home');
    await submit.click();

    await expect(submit).toBeDisabled();

    await navPromise;
    await expect(page).toHaveURL(/\/home$/);
  });

  test('Fehlgeschlagener Login zeigt Alert "Login fehlgeschlagen."', async ({ page }) => {
    await page.getByLabel(/name/i).fill('bob');
    await page.getByLabel(/passwort/i).fill('wrong');

    const dialogPromise = page.waitForEvent('dialog');

    await page.getByRole('button', { name: /anmelden/i }).click();

    const dialog = await dialogPromise;
    expect(dialog.message()).toMatch(/User was not found/i);
    await dialog.accept();
  });
});
