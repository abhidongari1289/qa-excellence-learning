/**
 * SANITY TEST SUITE — Polymer Shop
 * Scope : Critical happy-path checks that must pass before any release.
 *         Fast, minimal setup, no side-effects outside a single test.
 * Run   : npx playwright test tests/shop/sanity.spec.ts --project=shop
 */

import { test, expect } from '@playwright/test';
import { ShopHomePage } from '../../pages/shop/ShopHomePage';
import { ShopCategoryPage } from '../../pages/shop/ShopCategoryPage';
import { ShopProductPage } from '../../pages/shop/ShopProductPage';
import { ShopCartPage } from '../../pages/shop/ShopCartPage';
import { ShopCheckoutPage } from '../../pages/shop/ShopCheckoutPage';
import { CATEGORIES, PRODUCTS, CHECKOUT_DATA } from '../../fixtures/shop-data';

// ─── Home Page ───────────────────────────────────────────────────────────────
test.describe('[SANITY] Home Page', () => {
  test('S-01 Home page loads with correct title', async ({ page }) => {
    const home = new ShopHomePage(page);
    await home.navigate();
    await home.expectLoaded();
  });

  test('S-02 All 4 category links are visible on home page', async ({ page }) => {
    const home = new ShopHomePage(page);
    await home.navigate();
    await home.expectAllCategoriesVisible();
  });

  test('S-03 Cart icon is present on home page', async ({ page }) => {
    const home = new ShopHomePage(page);
    await home.navigate();
    await expect(page.locator('a[href="/cart"]').first()).toBeVisible();
  });
});

// ─── Category Navigation ──────────────────────────────────────────────────────
test.describe("[SANITY] Category Navigation", () => {
  test("S-04 Men's Outerwear category loads with products", async ({ page }) => {
    const categoryPage = new ShopCategoryPage(page);
    await categoryPage.navigate(CATEGORIES.mensOuterwear.href);
    await categoryPage.expectLoaded(CATEGORIES.mensOuterwear.name);
    await categoryPage.expectProductsVisible();
  });

  test('S-05 Navigate to category from home via Shop Now link', async ({ page }) => {
    const home = new ShopHomePage(page);
    await home.navigate();
    await home.clickCategory(CATEGORIES.mensOuterwear.href);
    await expect(page).toHaveURL(/mens_outerwear/);
  });
});

// ─── Product Detail ───────────────────────────────────────────────────────────
test.describe('[SANITY] Product Detail', () => {
  test('S-06 Product detail page shows price and Add to Cart button', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.expectLoaded();
    await productPage.expectPriceVisible();
    await productPage.expectAddToCartButtonVisible();
  });

  test('S-07 Product price matches expected value', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.expectLoaded();
    const price = await productPage.getPrice();
    expect(price).toBe(PRODUCTS.mensJacket.expectedPrice);
  });
});

// ─── Cart ─────────────────────────────────────────────────────────────────────
test.describe('[SANITY] Cart', () => {
  test('S-08 Add product to cart and verify it appears in cart', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    const cartPage = new ShopCartPage(page);

    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.addToCart();

    await cartPage.navigate();
    await cartPage.expectLoaded();
    await cartPage.expectItemInCart(PRODUCTS.mensJacket.name);
  });

  test('S-09 Cart checkout button is visible when cart has items', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    const cartPage = new ShopCartPage(page);

    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.addToCart();

    await cartPage.navigate();
    await cartPage.expectCheckoutButtonVisible();
  });
});

// ─── Checkout ─────────────────────────────────────────────────────────────────
test.describe('[SANITY] Checkout', () => {
  test('S-10 Checkout page has all required sections', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    const cartPage = new ShopCartPage(page);
    const checkoutPage = new ShopCheckoutPage(page);

    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    await checkoutPage.expectLoaded();
    await checkoutPage.expectAllSectionsPresent();
  });

  test('S-11 Complete checkout flow shows order confirmation', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    const cartPage = new ShopCartPage(page);
    const checkoutPage = new ShopCheckoutPage(page);
    const d = CHECKOUT_DATA.valid;

    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillAccountInfo(d.email, d.phone);
    await checkoutPage.fillShippingAddress(d.address, d.city, d.state, d.zip, d.country);
    await checkoutPage.fillPaymentInfo(d.ccName, d.ccNumber, d.ccCVV, d.ccExpMonth, d.ccExpYear);
    await checkoutPage.placeOrder();
    await checkoutPage.expectOrderSuccess();
  });
});
