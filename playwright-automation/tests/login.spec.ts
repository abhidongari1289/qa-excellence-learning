import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../fixtures/users';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC01 - Page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
  });

  test('TC02 - Standard user can login successfully', async ({ page }) => {
    const { username, password } = USERS.standard;
    await loginPage.login(username, password);
    await loginPage.expectLoginSuccess();

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
  });

  test('TC03 - Locked out user sees error message', async () => {
    const { username, password } = USERS.locked;
    await loginPage.login(username, password);
    await loginPage.expectErrorMessage('Sorry, this user has been locked out');
  });

  test('TC04 - Problem user can login', async ({ page }) => {
    const { username, password } = USERS.problem;
    await loginPage.login(username, password);
    await loginPage.expectLoginSuccess();
  });

  test('TC05 - Performance glitch user can login (with slow load)', async ({ page }) => {
    const { username, password } = USERS.performance;
    await loginPage.login(username, password);
    // Performance glitch user has a delayed login — use a higher timeout
    await expect(page).toHaveURL(/inventory/, { timeout: 15000 });
  });

  test('TC06 - Error user can login', async ({ page }) => {
    const { username, password } = USERS.error;
    await loginPage.login(username, password);
    await loginPage.expectLoginSuccess();
  });

  test('TC07 - Visual user can login', async ({ page }) => {
    const { username, password } = USERS.visual;
    await loginPage.login(username, password);
    await loginPage.expectLoginSuccess();
  });

  test('TC08 - Login fails with empty credentials', async () => {
    await loginPage.login('', '');
    await loginPage.expectErrorMessage('Username is required');
  });

  test('TC09 - Login fails with missing password', async () => {
    await loginPage.login(USERS.standard.username, '');
    await loginPage.expectErrorMessage('Password is required');
  });

  test('TC10 - Login fails with wrong credentials', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('TC11 - Standard user can logout', async ({ page }) => {
    const { username, password } = USERS.standard;
    await loginPage.login(username, password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
  });
});
