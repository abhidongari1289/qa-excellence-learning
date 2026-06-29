import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'saucedemo',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
      testMatch: ['login.spec.ts', 'checkout.spec.ts', 'user-behaviors.spec.ts'],
    },
    {
      name: 'shop',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://shop.polymer-project.org',
      },
      testMatch: 'shop/**/*.spec.ts',
    },
  ],
  outputDir: 'test-results',
});
