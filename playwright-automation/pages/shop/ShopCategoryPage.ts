import { Page, Locator, expect } from '@playwright/test';

export class ShopCategoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(categoryHref: string) {
    await this.page.goto(categoryHref);
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded(_categoryName: string) {
    await expect(this.page).toHaveURL(new RegExp('/list/'));
    await expect(this.page.locator('a[href*="/detail/"]').first()).toBeVisible();
  }

  async expectProductsVisible() {
    const products = this.page.locator('a[href*="/detail/"]');
    await expect(products.first()).toBeVisible();
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
    return count;
  }

  async getProductCount(): Promise<number> {
    // Each product has 2 links (image + name), so divide by 2
    const links = this.page.locator('a[href*="/detail/"]');
    const count = await links.count();
    return Math.round(count / 2);
  }

  async getFirstProductHref(): Promise<string> {
    const links = this.page.locator('a[href*="/detail/"]');
    const href = await links.first().getAttribute('href');
    return href ?? '';
  }

  async getAllProductPrices(): Promise<string[]> {
    return this.page.locator('.price').allTextContents();
  }

  async clickFirstProduct() {
    await this.page.locator('a[href*="/detail/"]').first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickProductByName(name: string) {
    await this.page.locator(`a:has-text("${name}")`).first().click();
    await this.page.waitForLoadState('networkidle');
  }
}
