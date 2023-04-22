import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    command: "pnpm build && pnpm start",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  },
  reporter: "html",
  use: {
    trace: "retain-on-failure",
    launchOptions: { slowMo: 250 }
  },
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "edge",
      use: {
        ...devices["Desktop Edge"]
      }
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"]
      }
    },
    {
      name: "safari",
      use: {
        ...devices["Desktop Safari"]
      }
    },
    {
      name: "android",
      use: {
        ...devices["Pixel 5"]
      }
    },
    {
      name: "iphone",
      use: {
        ...devices["iPhone 13"]
      }
    }
  ]
};

export default config;
