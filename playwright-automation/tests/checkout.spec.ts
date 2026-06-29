import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { USERS, CHECKOUT_INFO, PRODUCT } from '../fixtures/users';

test.describe('End-to-End Checkout Flow - Standard User', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutInfoPage: CheckoutInfoPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let confirmationPage: OrderConfirmationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutInfoPage = new CheckoutInfoPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    confirmationPage = new OrderConfirmationPage(page);

    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('TC12 - Products are displayed on inventory page', async () => {
    const names = await inventoryPage.getAllProductNames();
    expect(names.length).toBeGreaterThan(0);
  });

  test('TC13 - Sort products A to Z', async () => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getAllProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('TC14 - Sort products Z to A', async () => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getAllProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('TC15 - Sort products price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getAllProductPrices();
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  test('TC16 - Add product to cart and verify badge updates', async () => {
    await inventoryPage.addProductToCart(PRODUCT.name);
    await inventoryPage.expectCartCount(1);
  });

  test('TC17 - Remove product from cart via inventory page', async () => {
    await inventoryPage.addProductToCart(PRODUCT.name);
    await inventoryPage.expectCartCount(1);
    await inventoryPage.removeProductFromCart(PRODUCT.name);
    await inventoryPage.expectCartCount(0);
  });

  test('TC18 - Cart shows correct items', async () => {
    await inventoryPage.addProductToCart(PRODUCT.name);
    await inventoryPage.goToCart();

    await cartPage.expectLoaded();
    await cartPage.expectItemInCart(PRODUCT.name);
    await cartPage.expectItemCount(1);
  });

  test('TC19 - Checkout info form validation (empty fields)', async () => {
    await inventoryPage.addProductToCart(PRODUCT.name);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutInfoPage.expectLoaded();
    await checkoutInfoPage.continueExpectingError();
    await checkoutInfoPage.expectErrorMessage('First Name is required');
  });

  test('TC20 - Complete full checkout flow successfully', async () => {
    // Step 1: Add product to cart
    await inventoryPage.addProductToCart(PRODUCT.name);
    await inventoryPage.expectCartCount(1);

    // Step 2: Go to cart and verify
    await inventoryPage.goToCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemInCart(PRODUCT.name);

    // Step 3: Proceed to checkout info
    await cartPage.proceedToCheckout();
    await checkoutInfoPage.expectLoaded();
    await checkoutInfoPage.fillForm(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    await checkoutInfoPage.continue();

    // Step 4: Verify overview
    await checkoutOverviewPage.expectLoaded();
    await checkoutOverviewPage.expectItemInSummary(PRODUCT.name);
    const total = await checkoutOverviewPage.getTotal();
    expect(total).toContain('Total:');

    // Step 5: Finish and confirm
    await checkoutOverviewPage.finish();
    await confirmationPage.expectLoaded();
    await confirmationPage.expectOrderConfirmed();
  });

  test('TC21 - Back to products from confirmation page', async () => {
    await inventoryPage.addProductToCart(PRODUCT.name);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutInfoPage.fillForm(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    await checkoutInfoPage.continue();
    await checkoutOverviewPage.finish();
    await confirmationPage.expectLoaded();
    await confirmationPage.backToProducts();
  });
});
