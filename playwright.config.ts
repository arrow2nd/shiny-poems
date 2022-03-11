import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  webServer: {
    command: 'yarn build && yarn start',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'android',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'iphone',
      use: { ...devices['iPhone 13'] }
    }
  ]
}

export default config
