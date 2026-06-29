import { Page, Locator, expect } from '@playwright/test';

export class ShopCheckoutPage {
  readonly page: Page;
  // Account
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  // Shipping
  readonly shipAddressInput: Locator;
  readonly shipCityInput: Locator;
  readonly shipStateInput: Locator;
  readonly shipZipInput: Locator;
  readonly shipCountrySelect: Locator;
  // Payment
  readonly ccNameInput: Locator;
  readonly ccNumberInput: Locator;
  readonly ccCVVInput: Locator;
  readonly ccExpMonthSelect: Locator;
  readonly ccExpYearSelect: Locator;
  // Actions
  readonly placeOrderButton: Locator;
  readonly confirmationHeading: Locator;
  readonly errorHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input#accountEmail');
    this.phoneInput = page.locator('input#accountPhone');
    this.shipAddressInput = page.locator('input#shipAddress');
    this.shipCityInput = page.locator('input#shipCity');
    this.shipStateInput = page.locator('input#shipState');
    this.shipZipInput = page.locator('input#shipZip');
    this.shipCountrySelect = page.locator('select#shipCountry');
    this.ccNameInput = page.locator('input#ccName');
    this.ccNumberInput = page.locator('input#ccNumber');
    this.ccCVVInput = page.locator('input#ccCVV');
    this.ccExpMonthSelect = page.locator('select#ccExpMonth');
    this.ccExpYearSelect = page.locator('select#ccExpYear');
    this.placeOrderButton = page.locator('input[type="button"]');
    this.confirmationHeading = page.locator('h1:has-text("Thank you")');
    this.errorHeading = page.locator('h1:has-text("couldn")');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.emailInput).toBeVisible();
  }

  async expectAllSectionsPresent() {
    await expect(this.page.locator('h2:has-text("Account Information")')).toBeVisible();
    await expect(this.page.locator('h2:has-text("Shipping Address")')).toBeVisible();
    await expect(this.page.locator('h2:has-text("Payment Method")')).toBeVisible();
    await expect(this.page.locator('h2:has-text("Order Summary")')).toBeVisible();
  }

  async fillAccountInfo(email: string, phone: string) {
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  async fillShippingAddress(address: string, city: string, state: string, zip: string, country: string) {
    await this.shipAddressInput.fill(address);
    await this.shipCityInput.fill(city);
    await this.shipStateInput.fill(state);
    await this.shipZipInput.fill(zip);
    await this.shipCountrySelect.selectOption(country);
  }

  async fillPaymentInfo(name: string, number: string, cvv: string, month: string, year: string) {
    await this.ccNameInput.fill(name);
    await this.ccNumberInput.fill(number);
    await this.ccCVVInput.fill(cvv);
    await this.ccExpMonthSelect.selectOption(month);
    await this.ccExpYearSelect.selectOption(year);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await this.page.waitForTimeout(2000);
  }

  async expectOrderSuccess() {
    await expect(this.confirmationHeading).toBeVisible({ timeout: 10000 });
  }

  async expectOrderError() {
    await expect(this.errorHeading).toBeVisible({ timeout: 10000 });
  }

  async expectOrderSummaryContains(productName: string) {
    // #checkoutForm scopes the search to the active form, avoiding hidden page duplicates
    await expect(
      this.page.locator('#checkoutForm').getByText(productName, { exact: false }).first()
    ).toBeVisible();
  }
}
