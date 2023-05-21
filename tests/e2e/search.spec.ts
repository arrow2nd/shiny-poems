import { expect, test } from "@playwright/test";

import {
  baseUrl,
  testSearchFromClotheName,
  testSearchPoemFromText
} from "../utils";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test("ポエムの一部から検索", async ({ page }) => {
  await testSearchPoemFromText(page);
});

test("衣装名から検索", async ({ page }) => {
  await testSearchFromClotheName(page);
});

test("アイドル名から検索", async ({ page }) => {
  // NOTE: react-select に data-testid を埋める手段がなさそうなので妥協
  await page
    .locator("div")
    .filter({ hasText: /^アイドル名から$/ })
    .nth(2)
    .click();

  await page.locator('[id="react-select-アイドル名から-option-0"]').click();

  // 櫻木真乃の衣装が表示されているか
  const poemCardIdol = page.getByTestId("poem-card-idol").first();
  await expect(poemCardIdol).toHaveText("櫻木真乃");
});

test("ロゴクリックでリセット", async ({ page }) => {
  // 検索実行
  const textbox = page.getByTestId("poem-search-textbox");
  await textbox.focus();
  await textbox.fill("にーちゅ");
  await page.getByTestId("poem-search-submit").click();

  // ロゴをクリック
  await page.getByTestId("logo").click();

  // ポエムがない場合の表示になっているか
  const poemCardNothing = page.getByTestId("poem-card-nothing");
  await expect(poemCardNothing).toHaveText("ポエムが見つかりません…");
});
