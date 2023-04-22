import { Page, expect } from "@playwright/test";

const prodUrl = "https://shiny-poems-git-main-arrow2nd.vercel.app";
const localUrl = "http://localhost:3000";

// アクセス先 URL
export const baseUrl = process.env.PROD
  ? prodUrl
  : process.env.PREVIEW_URL || localUrl;

/**
 * ポエムの一部から検索
 * @param page ページ
 */
export async function testSearchPoemFromText(page: Page): Promise<void> {
  // 検索ボックスに入力
  const textbox = page.getByTestId("poem-search-textbox");
  await textbox.focus();
  await textbox.fill("すまじきものは恋");

  // 検索実行
  await page.getByTestId("poem-search-submit").click();

  // 検索結果が表示されているか
  const poemText = page.locator('[data-testid="poem-card-text"] > p');
  await expect(poemText).toHaveText(["ルームウェア。", "すまじきものは恋"]);
}

/**
 * 衣装名から検索
 * @param page ページ
 */
export async function testSearchFromClotheName(page: Page): Promise<void> {
  // 検索ボックスに入力
  const inputBox = page.locator('[id="react-select-衣装名から-input"]');
  await inputBox.focus();
  await inputBox.fill("ほしあかり");

  // 検索実行
  await inputBox.press("Enter");

  // 衣装「ほしあかり」が表示されているか
  const poemCardIdol = page.getByTestId("poem-card-clothe").first();
  await expect(poemCardIdol).toHaveText("ほしあかり");
}
