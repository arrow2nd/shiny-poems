import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  reporter: "html",
  timeout: 30 * 1000,
  retries: 2,
  fullyParallel: true,
  expect: {
    timeout: 10 * 1000,
    toMatchSnapshot: {
      threshold: 0.2,
      maxDiffPixelRatio: 0.01
    }
  },
  use: {
    trace: "retain-on-failure"
  },
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"]
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
