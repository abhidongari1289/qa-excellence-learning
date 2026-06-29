import { Page, Locator, expect } from '@playwright/test';

export class ShopCartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('a[href="/checkout"]');
    // Cart items appear as product detail links; home-page category tiles link to /list/ not /detail/
    this.cartItems = page.locator('a[href*="/detail/"]');
  }

  async navigate() {
    await this.page.goto('/cart');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async getItemCount(): Promise<number> {
    // Count only VISIBLE detail links — Playwright's isVisible() reports the rendered cart items
    const links = this.page.locator('a[href*="/detail/"]');
    const total = await links.count();
    let visible = 0;
    for (let i = 0; i < total; i++) {
      if (await links.nth(i).isVisible()) visible++;
    }
    return visible;
  }

  async expectItemCount(count: number) {
    const actual = await this.getItemCount();
    expect(actual).toBe(count);
  }

  async expectItemInCart(productName: string) {
    await expect(this.page.locator(`a:has-text("${productName}")`)).toBeVisible();
  }

  async expectCartEmpty() {
    const count = await this.cartItems.count();
    expect(count).toBe(0);
  }

  async expectCheckoutButtonVisible() {
    await expect(this.checkoutButton).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/\/checkout/);
  }
}
