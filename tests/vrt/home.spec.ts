import { Locator, Page, expect, test } from "@playwright/test";

import {
  baseUrl,
  testSearchFromClotheName,
  testSearchPoemFromText
} from "../utils";

function getMaskLocations(page: Page): Locator[] {
  const wave = page.locator("footer > div > svg");
  const lastUpdated = page.getByTestId("last-updated");
  return [wave, lastUpdated];
}

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl, {
    waitUntil: "networkidle"
  });
});

test("検索結果がひとつの場合", async ({ page }) => {
  await testSearchPoemFromText(page);

  await expect(page).toHaveScreenshot("search-result-single.png", {
    fullPage: true,
    mask: getMaskLocations(page)
  });
});

test("検索結果が複数の場合", async ({ page }) => {
  await testSearchFromClotheName(page);

  await expect(page).toHaveScreenshot("search-result-multi.png", {
    fullPage: true,
    mask: getMaskLocations(page)
  });
});
