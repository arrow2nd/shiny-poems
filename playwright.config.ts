import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  reporter: "html",
  workers: 4,
  timeout: 30 * 1000,
  retries: 2,
  fullyParallel: true,
  expect: {
    timeout: 10000,
    toMatchSnapshot: {
      threshold: 0.2,
      maxDiffPixelRatio: 0.001
    }
  },
  use: {
    trace: "retain-on-failure"
    // launchOptions: { slowMo: 200 }
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
});
