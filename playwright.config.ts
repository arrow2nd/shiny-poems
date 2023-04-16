import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  webServer: {
    command: "pnpm build && pnpm start",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  },
  reporter: "html",
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: { slowMo: 250 },
        video: "retain-on-failure"
      }
    },
    {
      name: "edge",
      use: {
        ...devices["Desktop Edge"],
        launchOptions: { slowMo: 250 },
        video: "retain-on-failure"
      }
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        launchOptions: { slowMo: 250 },
        video: "retain-on-failure"
      }
    },
    {
      name: "safari",
      use: {
        ...devices["Desktop Safari"],
        launchOptions: { slowMo: 250 },
        video: "retain-on-failure"
      }
    },
    {
      name: "android",
      use: {
        ...devices["Pixel 5"],
        launchOptions: { slowMo: 250 },
        video: "retain-on-failure"
      }
    },
    {
      name: "iphone",
      use: {
        ...devices["iPhone 13"],
        launchOptions: { slowMo: 250 },
        video: "retain-on-failure"
      }
    }
  ]
};

export default config;
