import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;
  readonly burgerMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.inventoryList).toBeVisible();
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    const addBtn = product.locator('button').filter({ hasText: /Add to cart/i });
    await addBtn.click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    const removeBtn = product.locator('button').filter({ hasText: /Remove/i });
    await removeBtn.click();
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getAllProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getAllProductPrices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  async getProductImageSrc(productName: string): Promise<string | null> {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    const img = product.locator('img');
    return img.getAttribute('src');
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async logout() {
    await this.burgerMenu.click();
    await this.page.locator('#logout_sidebar_link').click();
    await expect(this.page).toHaveURL('/');
  }
}
