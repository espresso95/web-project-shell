import { expect, test } from '@playwright/test';

test('renders a keyboard-accessible direct home link', async ({ page }) => {
  await page.goto('/');

  const shell = page.locator('web-project-shell');
  const link = shell.locator('a');

  await expect(shell).toBeVisible();
  await expect(link).toHaveText(/YOUR NAME/);
  await expect(link).toHaveAttribute('href', '/');

  await page.keyboard.press('Tab');
  await expect(link).toBeFocused();
});
