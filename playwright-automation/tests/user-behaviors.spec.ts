import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { USERS, CHECKOUT_INFO } from '../fixtures/users';

// Helper: login and return pages
async function loginAs(page: import('@playwright/test').Page, userKey: keyof typeof USERS) {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(USERS[userKey].username, USERS[userKey].password);
  return {
    loginPage,
    inventoryPage: new InventoryPage(page),
    cartPage: new CartPage(page),
    checkoutInfoPage: new CheckoutInfoPage(page),
    checkoutOverviewPage: new CheckoutOverviewPage(page),
    confirmationPage: new OrderConfirmationPage(page),
  };
}

test.describe('Locked Out User', () => {
  test('TC22 - Cannot access inventory after lock-out error', async ({ page }) => {
    const { loginPage } = await loginAs(page, 'locked');
    await loginPage.expectErrorMessage('Sorry, this user has been locked out');
    await expect(page).not.toHaveURL(/inventory/);
  });
});

test.describe('Problem User Behavior', () => {
  test.beforeEach(async ({ page }) => {
    const { inventoryPage } = await loginAs(page, 'problem');
    await inventoryPage.expectLoaded();
  });

  test('TC23 - Problem user product images are broken', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    // Problem user serves wrong image src for all products
    const imgs = page.locator('.inventory_item img');
    const count = await imgs.count();
    let brokenCount = 0;
    for (let i = 0; i < count; i++) {
      const src = await imgs.nth(i).getAttribute('src');
      // Problem user images all point to the same broken asset
      if (src && src.includes('sl-404')) {
        brokenCount++;
      }
    }
    expect(brokenCount).toBeGreaterThan(0);
  });

  test('TC24 - Problem user Add to Cart is broken for some products (known bug)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    // For problem_user, "Add to Cart" on Sauce Labs Bolt T-Shirt does not add to cart
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    // Known bug: cart count does NOT update — badge remains absent
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });
});

test.describe('Performance Glitch User', () => {
  test('TC25 - Performance user login is slow but succeeds', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    const start = Date.now();
    await loginPage.login(USERS.performance.username, USERS.performance.password);
    await expect(page).toHaveURL(/inventory/, { timeout: 15000 });
    const elapsed = Date.now() - start;
    // Performance glitch introduces 1-5s delay — login should take longer than normal
    expect(elapsed).toBeGreaterThan(500);
  });

  test('TC26 - Performance user can complete checkout despite slowness', async ({ page }) => {
    const { inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, confirmationPage } =
      await loginAs(page, 'performance');
    await inventoryPage.expectLoaded();

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutInfoPage.fillForm(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    await checkoutInfoPage.continue();
    await checkoutOverviewPage.finish();
    await confirmationPage.expectOrderConfirmed();
  });
});

test.describe('Error User Behavior', () => {
  test('TC27 - Error user can login and see inventory', async ({ page }) => {
    const { inventoryPage } = await loginAs(page, 'error');
    await inventoryPage.expectLoaded();
  });

  test('TC28 - Error user add to cart may trigger UI error', async ({ page }) => {
    const { inventoryPage } = await loginAs(page, 'error');
    await inventoryPage.expectLoaded();

    // error_user: some buttons reset after click — verify the cart state is checked
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    // Cart count may or may not update due to errors — we verify page doesn't crash
    await expect(page).toHaveURL(/inventory/);
  });
});

test.describe('Visual User Behavior', () => {
  test('TC29 - Visual user can login and see inventory', async ({ page }) => {
    const { inventoryPage } = await loginAs(page, 'visual');
    await inventoryPage.expectLoaded();
  });

  test('TC30 - Visual user cart icon is visible', async ({ page }) => {
    const { inventoryPage } = await loginAs(page, 'visual');
    await inventoryPage.expectLoaded();
    // Visual user has layout/icon bugs but core elements must be present
    await expect(inventoryPage.cartIcon).toBeVisible();
    await expect(inventoryPage.sortDropdown).toBeVisible();
  });
});

test.describe('Standard User - Multi-item cart', () => {
  test('TC31 - Add multiple products and verify cart count', async ({ page }) => {
    const { inventoryPage, cartPage } = await loginAs(page, 'standard');
    await inventoryPage.expectLoaded();

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    await inventoryPage.expectCartCount(3);
    await inventoryPage.goToCart();
    await cartPage.expectItemCount(3);
  });
});
