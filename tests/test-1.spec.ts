import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://shgrid.dev/');
  await page.getByRole('link', { name: 'Examples' }).click();
  await page.getByRole('link', { name: 'Contacts Fake contacts module' }).click();
  await page.getByRole('button', { name: 'Email' }).click();

  await expect(page).toHaveTitle("");
});