import { Locator, Page } from "@playwright/test";

export function getWaveMask(page: Page): Locator[] {
  const wave = page.locator("footer > div > svg");
  const lastUpdated = page.getByTestId("last-updated");
  return [wave, lastUpdated];
}
