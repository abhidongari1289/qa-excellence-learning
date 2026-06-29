import { Page, Locator, expect } from '@playwright/test';

export class ShopHomePage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly shopTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('a[href="/cart"]').first();
    this.shopTitle = page.locator('a[aria-label="SHOP Home"]');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/Home - SHOP/);
    await expect(this.shopTitle).toBeVisible();
  }

  async expectAllCategoriesVisible() {
    await expect(this.page.locator('a[href="/list/mens_outerwear"]').first()).toBeVisible();
    await expect(this.page.locator('a[href="/list/ladies_outerwear"]').first()).toBeVisible();
    await expect(this.page.locator('a[href="/list/mens_tshirts"]').first()).toBeVisible();
    await expect(this.page.locator('a[href="/list/ladies_tshirts"]').first()).toBeVisible();
  }

  async clickCategory(href: string) {
    await this.page.locator(`a[href="${href}"]`).filter({ hasText: 'Shop Now' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToCart() {
    await this.cartIcon.click();
    await this.page.waitForLoadState('networkidle');
  }
}
