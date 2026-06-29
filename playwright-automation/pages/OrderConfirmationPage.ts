import { Page, Locator, expect } from '@playwright/test';

export class OrderConfirmationPage {
  readonly page: Page;
  readonly confirmationHeader: Locator;
  readonly confirmationText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationHeader = page.locator('.complete-header');
    this.confirmationText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-complete/);
  }

  async expectOrderConfirmed() {
    await expect(this.confirmationHeader).toHaveText('Thank you for your order!');
    await expect(this.confirmationText).toContainText('Your order has been dispatched');
  }

  async backToProducts() {
    await this.backHomeButton.click();
    await expect(this.page).toHaveURL(/inventory/);
  }
}
