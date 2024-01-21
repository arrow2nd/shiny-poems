import { defineConfig, devices } from "@playwright/test";

const prodUrl = "https://shiny-poems-git-main-arrow2nd.vercel.app";
const localUrl = "http://localhost:3000";

export default defineConfig({
  reporter: "html",
  timeout: 30 * 1000,
  retries: 2,
  fullyParallel: true,
  expect: {
    timeout: 10 * 1000,
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixelRatio: 0.015
    }
  },
  use: {
    baseURL: process.env.PROD ? prodUrl : process.env.PREVIEW_URL || localUrl,
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
      grepInvert: /@desktop/,
      use: {
        ...devices["Pixel 5"]
      }
    },
    {
      name: "iphone",
      grepInvert: /@desktop/,
      use: {
        ...devices["iPhone 13"]
      }
    }
  ]
});
