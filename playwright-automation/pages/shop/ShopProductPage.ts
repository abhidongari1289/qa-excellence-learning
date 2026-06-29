import { Page, Locator, expect } from '@playwright/test';

export class ShopProductPage {
  readonly page: Page;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly quantitySelect: Locator;

  constructor(page: Page) {
    this.page = page;
    // .detail .price scopes to the product detail container, avoiding hidden prices from other SPA pages
    this.productPrice = page.locator('.detail .price');
    this.addToCartButton = page.locator('button[aria-label="Add this item to cart"]');
    this.quantitySelect = page.locator('select#quantitySelect');
  }

  async navigate(productHref: string) {
    await this.page.goto(productHref);
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/detail\//);
    await expect(this.addToCartButton).toBeVisible();
  }

  async getPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? '';
  }

  async expectPriceVisible() {
    await expect(this.productPrice).toBeVisible();
    const price = await this.getPrice();
    expect(price).toMatch(/\$[\d.]+/);
  }

  async selectQuantity(qty: number) {
    await this.quantitySelect.selectOption(String(qty));
  }

  async addToCart() {
    await this.addToCartButton.click();
    // wait for the cart state to update
    await this.page.waitForTimeout(500);
  }

  async expectAddToCartButtonVisible() {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
  }
}
