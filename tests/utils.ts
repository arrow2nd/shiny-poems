import { Page, expect } from "@playwright/test";

/**
 * ポエムの一部から検索
 * @param page ページ
 */
export async function testSearchPoemFromText(page: Page): Promise<void> {
  // 検索ボックスに入力
  const textbox = page.getByTestId("poem-search-textbox");
  await textbox.fill("すまじきものは恋");

  // 検索実行
  const submitButton = page.getByTestId("poem-search-submit");
  await submitButton.click();

  // 検索結果が表示されているか
  const poemText = page.locator('[data-testid="poem-card-text"] > p');
  await expect(poemText).toHaveText(["ルームウェア。", "すまじきものは恋"]);
}

/**
 * 衣装名から検索
 * @param page ページ
 */
export async function testSearchFromClotheName(page: Page): Promise<void> {
  // NOTE: react-select に data-testid を埋める手段がなさそうなので妥協
  await page
    .locator("div")
    .filter({ hasText: /^衣装名から$/ })
    .nth(2)
    .click();

  await page.locator('[id="react-select-衣装名から-option-0"]').click();

  // 衣装「ほしあかり」が表示されているか
  const poemCardIdol = page.getByTestId("poem-card-clothe").first();
  await expect(poemCardIdol).toHaveText("ほしあかり");
}
