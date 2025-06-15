import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  //retries: 1,
  workers: process.env.CI ? 1 : undefined,
  // reporter: [ ['allure-playwright'] ],
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1920, height: 1080 },
       }
    }],
});
