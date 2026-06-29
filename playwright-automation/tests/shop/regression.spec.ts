/**
 * REGRESSION TEST SUITE — Polymer Shop
 * Scope : Broader coverage across all features to catch regressions.
 *         Includes edge cases, all categories, multi-item cart, and error paths.
 * Run   : npx playwright test tests/shop/regression.spec.ts --project=shop
 */

import { test, expect } from '@playwright/test';
import { ShopHomePage } from '../../pages/shop/ShopHomePage';
import { ShopCategoryPage } from '../../pages/shop/ShopCategoryPage';
import { ShopProductPage } from '../../pages/shop/ShopProductPage';
import { ShopCartPage } from '../../pages/shop/ShopCartPage';
import { ShopCheckoutPage } from '../../pages/shop/ShopCheckoutPage';
import { CATEGORIES, PRODUCTS, CHECKOUT_DATA } from '../../fixtures/shop-data';

// ─── Home Page ────────────────────────────────────────────────────────────────
test.describe('[REGRESSION] Home Page', () => {
  test('R-01 Page title is "Home - SHOP"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Home - SHOP');
  });

  test('R-02 SHOP logo navigates back to home from another page', async ({ page }) => {
    const category = new ShopCategoryPage(page);
    await category.navigate(CATEGORIES.mensOuterwear.href);
    await page.locator('a[aria-label="SHOP Home"]').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/');
  });

  test('R-03 All 4 categories have visible "Shop Now" links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const shopNowLinks = page.locator('a:has-text("Shop Now")');
    await expect(shopNowLinks).toHaveCount(4);
  });
});

// ─── All Categories ───────────────────────────────────────────────────────────
test.describe('[REGRESSION] All Categories Load', () => {
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    test(`R-04 Category: ${cat.name} loads with products`, async ({ page }) => {
      const categoryPage = new ShopCategoryPage(page);
      await categoryPage.navigate(cat.href);
      await categoryPage.expectLoaded(cat.name);
      const count = await categoryPage.expectProductsVisible();
      expect(count).toBeGreaterThan(0);
    });
  }
});

// ─── Category Page Behaviour ─────────────────────────────────────────────────
test.describe('[REGRESSION] Category Page', () => {
  test('R-05 Each product in category has a price', async ({ page }) => {
    const categoryPage = new ShopCategoryPage(page);
    await categoryPage.navigate(CATEGORIES.mensOuterwear.href);
    const prices = await categoryPage.getAllProductPrices();
    expect(prices.length).toBeGreaterThan(0);
    prices.forEach(price => expect(price).toMatch(/\$[\d.]+/));
  });

  test('R-06 Clicking a product navigates to detail page', async ({ page }) => {
    const categoryPage = new ShopCategoryPage(page);
    await categoryPage.navigate(CATEGORIES.ladiesOuterwear.href);
    await categoryPage.clickFirstProduct();
    await expect(page).toHaveURL(/\/detail\/ladies_outerwear\//);
  });

  test('R-07 Ladies T-Shirts category has products with prices', async ({ page }) => {
    const categoryPage = new ShopCategoryPage(page);
    await categoryPage.navigate(CATEGORIES.ladiesTshirts.href);
    const prices = await categoryPage.getAllProductPrices();
    prices.forEach(price => expect(price).toMatch(/\$[\d.]+/));
    expect(prices.length).toBeGreaterThan(0);
  });
});

// ─── Product Detail Page ──────────────────────────────────────────────────────
test.describe('[REGRESSION] Product Detail', () => {
  test('R-08 Product price is a valid dollar amount', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    await productPage.navigate(PRODUCTS.mensJacket.href);
    const price = await productPage.getPrice();
    expect(price).toMatch(/^\$[\d]+\.[\d]{2}$/);
  });

  test('R-09 Quantity selector is visible on product page', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    await productPage.navigate(PRODUCTS.mensJacket.href);
    await expect(productPage.quantitySelect).toBeVisible();
  });

  test('R-10 Quantity can be changed to 2', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.selectQuantity(2);
    await expect(productPage.quantitySelect).toHaveValue('2');
  });

  test('R-11 Add to Cart button is enabled on product page', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    await productPage.navigate(PRODUCTS.mensJacket.href);
    await expect(productPage.addToCartButton).toBeEnabled();
  });
});

// ─── Cart ─────────────────────────────────────────────────────────────────────
test.describe('[REGRESSION] Cart', () => {
  test('R-12 Cart page loads at /cart URL', async ({ page }) => {
    const cartPage = new ShopCartPage(page);
    await cartPage.navigate();
    await cartPage.expectLoaded();
  });

  test('R-13 Cart is initially empty (no cart items)', async ({ page }) => {
    const cartPage = new ShopCartPage(page);
    await cartPage.navigate();
    await cartPage.expectLoaded();
    // No checkout button when cart is empty
    const count = await cartPage.getItemCount();
    expect(count).toBe(0);
  });

  test('R-14 Adding a product shows it in cart with checkout enabled', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    const cartPage = new ShopCartPage(page);

    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.addToCart();

    await cartPage.navigate();
    // Checkout button appears only when cart has items
    await cartPage.expectCheckoutButtonVisible();
    // Verify the specific product is visible in the cart
    await cartPage.expectItemInCart(PRODUCTS.mensJacket.name);
  });

  test('R-15 Cart shows correct product name', async ({ page }) => {
    const productPage = new ShopProductPage(page);
    const cartPage = new ShopCartPage(page);

    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.addToCart();

    await cartPage.navigate();
    await cartPage.expectItemInCart(PRODUCTS.mensJacket.name);
  });

  test('R-16 Cart icon on header links to /cart', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const cartHref = await page.locator('a[href="/cart"]').first().getAttribute('href');
    expect(cartHref).toBe('/cart');
  });

  test('R-17 Navigate back to home from cart', async ({ page }) => {
    const cartPage = new ShopCartPage(page);
    await cartPage.navigate();
    await page.locator('a[aria-label="SHOP Home"]').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/');
  });
});

// ─── Checkout Form ────────────────────────────────────────────────────────────
test.describe('[REGRESSION] Checkout Form', () => {
  test.beforeEach(async ({ page }) => {
    const productPage = new ShopProductPage(page);
    const cartPage = new ShopCartPage(page);
    await productPage.navigate(PRODUCTS.mensJacket.href);
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.proceedToCheckout();
  });

  test('R-18 Checkout page URL is /checkout', async ({ page }) => {
    await expect(page).toHaveURL(/\/checkout/);
  });

  test('R-19 Checkout has Account Information section', async ({ page }) => {
    await expect(page.locator('h2:has-text("Account Information")')).toBeVisible();
  });

  test('R-20 Checkout has Shipping Address section', async ({ page }) => {
    await expect(page.locator('h2:has-text("Shipping Address")')).toBeVisible();
  });

  test('R-21 Checkout has Payment Method section', async ({ page }) => {
    await expect(page.locator('h2:has-text("Payment Method")')).toBeVisible();
  });

  test('R-22 Checkout has Order Summary section', async ({ page }) => {
    await expect(page.locator('h2:has-text("Order Summary")')).toBeVisible();
  });

  test('R-23 Order summary shows correct product', async ({ page }) => {
    const checkoutPage = new ShopCheckoutPage(page);
    await checkoutPage.expectOrderSummaryContains(PRODUCTS.mensJacket.name);
  });

  test('R-24 All required input fields are present', async ({ page }) => {
    const checkoutPage = new ShopCheckoutPage(page);
    await expect(checkoutPage.emailInput).toBeVisible();
    await expect(checkoutPage.phoneInput).toBeVisible();
    await expect(checkoutPage.shipAddressInput).toBeVisible();
    await expect(checkoutPage.shipCityInput).toBeVisible();
    await expect(checkoutPage.shipStateInput).toBeVisible();
    await expect(checkoutPage.shipZipInput).toBeVisible();
    await expect(checkoutPage.ccNameInput).toBeVisible();
    await expect(checkoutPage.ccNumberInput).toBeVisible();
    await expect(checkoutPage.ccCVVInput).toBeVisible();
  });

  test('R-25 Country dropdown has US and CA options', async ({ page }) => {
    const checkoutPage = new ShopCheckoutPage(page);
    await expect(checkoutPage.shipCountrySelect.locator('option[value="US"]')).toHaveCount(1);
    await expect(checkoutPage.shipCountrySelect.locator('option[value="CA"]')).toHaveCount(1);
  });

  test('R-26 Expiry month dropdown has 12 options', async ({ page }) => {
    const checkoutPage = new ShopCheckoutPage(page);
    // Use evaluate on the located element — Playwright's CSS engine finds it through shadow DOM
    const count = await checkoutPage.ccExpMonthSelect.evaluate(
      (el: HTMLSelectElement) => el.options.length
    );
    expect(count).toBe(12);
  });
});

// ─── End-to-End ───────────────────────────────────────────────────────────────
test.describe('[REGRESSION] End-to-End Checkout', () => {
  test('R-27 Full checkout flow: Home → Category → Product → Cart → Checkout → Confirm', async ({ page }) => {
    const home = new ShopHomePage(page);
    const categoryPage = new ShopCategoryPage(page);
    const productPage = new ShopProductPage(page);
    const cartPage = new ShopCartPage(page);
    const checkoutPage = new ShopCheckoutPage(page);
    const d = CHECKOUT_DATA.valid;

    // Navigate from home → category
    await home.navigate();
    await home.expectLoaded();
    await home.clickCategory(CATEGORIES.mensOuterwear.href);

    // Pick first product
    await categoryPage.expectLoaded(CATEGORIES.mensOuterwear.name);
    await categoryPage.clickFirstProduct();

    // Verify product detail and add to cart
    await productPage.expectLoaded();
    await productPage.expectPriceVisible();
    await productPage.addToCart();

    // Verify cart
    await cartPage.navigate();
    await cartPage.expectLoaded();
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBeGreaterThan(0);

    // Checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.expectLoaded();
    await checkoutPage.fillAccountInfo(d.email, d.phone);
    await checkoutPage.fillShippingAddress(d.address, d.city, d.state, d.zip, d.country);
    await checkoutPage.fillPaymentInfo(d.ccName, d.ccNumber, d.ccCVV, d.ccExpMonth, d.ccExpYear);
    await checkoutPage.placeOrder();
    await checkoutPage.expectOrderSuccess();
  });

  test('R-28 Direct URL navigation: /list, /cart, /checkout all resolve correctly', async ({ page }) => {
    await page.goto('/list/mens_outerwear');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/mens_outerwear/);

    await page.goto('/cart');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/cart/);

    // Add to cart before accessing checkout
    await page.goto(PRODUCTS.mensJacket.href);
    await page.waitForLoadState('networkidle');
    await page.locator('button[aria-label="Add this item to cart"]').click();
    await page.waitForTimeout(500);

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/checkout/);
  });
});
